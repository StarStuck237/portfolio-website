/**
 * Regenerates `src/app/data/dance-videos.ts` from the YouTube playlist.
 *
 * Runs before every build. Needs a YouTube Data API v3 key in YOUTUBE_API_KEY
 * (env var, or a line in a local .env file). Without one it leaves the
 * committed data file alone and lets the build carry on, so a clone with no key
 * — or an offline build — still works off whatever was last committed.
 *
 *   node scripts/sync-dance-videos.mjs           refresh, warn and skip on failure
 *   node scripts/sync-dance-videos.mjs --strict  refresh, fail the build on failure
 *
 * Quota cost is 3 units per run against a daily allowance of 10,000.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT = resolve(ROOT, 'src/app/data/dance-videos.ts');

/** The band renders one featured video and three in the reel. */
const WANTED = 4;
/** Fetch a few extra so private or deleted entries don't leave a short list. */
const CANDIDATES = 12;

const PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID ?? 'PLvxoEaj3Hd_6jp2FZXoNtdNnjYsWRs6aV';

/**
 * Titles that read better on a card than they do on YouTube. Applied to the
 * round only, longest key first, so 'Jack and Jill' can't half-match.
 */
const DISPLAY_NAMES = [
  ['Jack and Jill', 'Jack & Jill'],
  ['J&J', 'Jack & Jill'],
];

const strict = process.argv.includes('--strict');

class SyncError extends Error {}

/** Minimal .env reader — a build script shouldn't pull in a dependency for this. */
async function loadApiKey() {
  if (process.env.YOUTUBE_API_KEY) return process.env.YOUTUBE_API_KEY.trim();

  const envFile = resolve(ROOT, '.env');
  if (!existsSync(envFile)) return null;

  const line = (await readFile(envFile, 'utf8'))
    .split('\n')
    .map((l) => l.trim())
    .find((l) => l.startsWith('YOUTUBE_API_KEY='));

  if (!line) return null;
  return line
    .slice('YOUTUBE_API_KEY='.length)
    .trim()
    .replace(/^["']|["']$/g, '');
}

async function api(path, params, key) {
  const url = new URL(`https://www.googleapis.com/youtube/v3/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  url.searchParams.set('key', key);

  const response = await fetch(url);
  if (!response.ok) {
    const body = await response.text().catch(() => '');
    const reason = body.match(/"reason":\s*"([^"]+)"/)?.[1] ?? response.statusText;
    // Never surface the URL: it carries the key.
    throw new SyncError(`YouTube ${path} returned ${response.status} (${reason})`);
  }
  return response.json();
}

/** Every item in the playlist, oldest page first. Two pages at 58 videos. */
async function fetchPlaylist(key) {
  const items = [];
  let pageToken;

  for (let page = 0; page < 10; page++) {
    const data = await api(
      'playlistItems',
      {
        part: 'snippet,contentDetails',
        playlistId: PLAYLIST_ID,
        maxResults: '50',
        ...(pageToken ? { pageToken } : {}),
      },
      key,
    );

    for (const item of data.items ?? []) {
      const id = item.contentDetails?.videoId;
      const title = item.snippet?.title ?? '';
      // Entries whose video went away keep a placeholder title and no date.
      const published = item.contentDetails?.videoPublishedAt;
      if (!id || !published) continue;
      if (title === 'Private video' || title === 'Deleted video') continue;
      items.push({ id, title, published });
    }

    pageToken = data.nextPageToken;
    if (!pageToken) break;
  }

  if (items.length === 0) throw new SyncError('the playlist came back empty');
  return items;
}

/** Durations and privacy for a batch of ids, in one call. */
async function fetchDetails(ids, key) {
  const data = await api(
    'videos',
    { part: 'contentDetails,status', id: ids.join(','), maxResults: '50' },
    key,
  );

  const byId = new Map();
  for (const video of data.items ?? []) {
    byId.set(video.id, {
      duration: formatDuration(video.contentDetails?.duration),
      privacy: video.status?.privacyStatus,
      embeddable: video.status?.embeddable,
    });
  }
  return byId;
}

/** `PT1H2M3S` to `1:02:03`, `PT5M34S` to `5:34`. */
function formatDuration(iso) {
  const match = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso ?? '');
  if (!match) return null;

  const [h, m, s] = [match[1], match[2], match[3]].map((v) => Number(v ?? 0));
  const pad = (n) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

/**
 * Splits a channel title into the pieces a card shows. The convention is
 * `<round> - <event> <year>`, with an optional `Ben and <partner>` in front:
 *
 *   Novice Jack and Jill - Chicagoland 2026
 *   Ben and Sara O’Toole - Novice Strictly - Michigan Classic 2026
 *
 * Anything that doesn't end in `<event> <year>` — including the older
 * `Chicagoland 2024 - J&J Prelims - Newcomer` order — is left whole as the
 * round with no event, so a renamed video degrades to a plain title rather
 * than to nonsense.
 */
export function parseTitle(raw) {
  const parts = raw
    .split(' - ')
    .map((part) => part.trim())
    .filter(Boolean);

  const trailing = /^(.*\S)\s+(\d{4})$/.exec(parts.at(-1) ?? '');
  if (parts.length < 2 || !trailing) {
    return { title: display(raw.trim()), event: null, year: null, partner: undefined };
  }

  const [, event, year] = trailing;
  const middle = parts.slice(0, -1);

  let partner;
  const named = /^Ben(?:\s+Cok)?\s+and\s+(.+)$/i.exec(middle[0] ?? '');
  if (named && middle.length > 1) {
    partner = named[1].trim();
    middle.shift();
  }

  return { title: display(middle.join(' - ')), event, year: Number(year), partner };
}

function display(round) {
  let out = round;
  for (const [from, to] of DISPLAY_NAMES) out = out.split(from).join(to);
  return out;
}

function render(videos) {
  const entries = videos
    .map((video) => {
      const fields = [
        `    id: ${JSON.stringify(video.id)},`,
        `    title: ${JSON.stringify(video.title)},`,
        `    event: ${JSON.stringify(video.event)},`,
        `    year: ${video.year},`,
        `    duration: ${JSON.stringify(video.duration)},`,
        `    published: ${JSON.stringify(video.published)},`,
      ];
      if (video.partner) fields.push(`    partner: ${JSON.stringify(video.partner)},`);
      return `  {\n${fields.join('\n')}\n  },`;
    })
    .join('\n');

  return `import { Video } from '../core/models/video';

/**
 * GENERATED FILE — do not edit by hand.
 *
 * Written by \`scripts/sync-dance-videos.mjs\` from the YouTube playlist, newest
 * upload first, and committed so the site still builds without an API key. To
 * change what appears here, change the playlist and rebuild.
 *
 * Last synced ${new Date().toISOString().slice(0, 10)}.
 */
export const DANCE_VIDEOS: readonly Video[] = [
${entries}
];
`;
}

/** Prettier is a devDependency; format with it when it's there, skip when it isn't. */
async function format(source) {
  try {
    const prettier = await import('prettier');
    const config = (await prettier.resolveConfig(OUTPUT)) ?? {};
    return await prettier.format(source, { ...config, filepath: OUTPUT });
  } catch {
    return source;
  }
}

async function main() {
  const key = await loadApiKey();
  if (!key) {
    throw new SyncError('no YOUTUBE_API_KEY set — see the "Dance videos" section of the README');
  }

  const playlist = await fetchPlaylist(key);
  playlist.sort((a, b) => b.published.localeCompare(a.published));

  const shortlist = playlist.slice(0, CANDIDATES);
  const details = await fetchDetails(
    shortlist.map((video) => video.id),
    key,
  );

  const chosen = [];
  const skipped = [];
  for (const video of shortlist) {
    const detail = details.get(video.id);
    // A video the key can't see, or one with no duration, would render a broken card.
    if (!detail || detail.privacy === 'private' || !detail.duration) {
      skipped.push(`${video.title} (not readable with this key)`);
      continue;
    }

    // A title off-convention would land on the card as-is with an invented
    // event, so pass it over and say so rather than print something made up.
    const parsed = parseTitle(video.title);
    if (!parsed.event) {
      skipped.push(`${video.title} (title isn't "<round> - <event> <year>")`);
      continue;
    }

    chosen.push({
      id: video.id,
      title: parsed.title,
      event: parsed.event,
      year: parsed.year,
      duration: detail.duration,
      published: video.published.slice(0, 10),
      partner: parsed.partner,
    });

    if (chosen.length === WANTED) break;
  }

  for (const note of skipped) console.warn(`dance videos: skipped ${note}`);

  if (chosen.length < WANTED) {
    throw new SyncError(
      `only ${chosen.length} of ${WANTED} videos were usable — leaving the committed list alone`,
    );
  }

  await writeFile(OUTPUT, await format(render(chosen)), 'utf8');

  console.log(`dance videos: synced ${chosen.length} from the playlist`);
  for (const video of chosen) {
    console.log(`  ${video.published}  ${video.title} — ${video.event} ${video.year}`);
  }
}

/** Only run when invoked directly, so the parser can be imported and tested. */
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch((error) => {
    const message = error instanceof SyncError ? error.message : (error?.message ?? String(error));

    if (strict) {
      console.error(`dance videos: ${message}`);
      process.exit(1);
    }

    console.warn(`dance videos: ${message}`);
    console.warn('dance videos: building with the committed list instead.');
  });
}
