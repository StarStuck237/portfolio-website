import { DanceEvent } from '../../../core/models/dance-event';

export interface ScheduledEvent extends DanceEvent {
  /** `Oct 22 – 25`, or `Dec 30 – Jan 3` when the weekend crosses a month. */
  readonly when: string;
  /** The figure the count colour picks out, or null when there isn't one. */
  readonly countdownValue: string | null;
  /** `days away`, `day away`, `today`, `happening now`. */
  readonly countdownLabel: string;
  /** The soonest one, which wears the accent. */
  readonly next: boolean;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MS_PER_DAY = 86_400_000;

/**
 * Parses `YYYY-MM-DD` as local midnight. `new Date('2026-10-22')` is read as
 * UTC and lands on the 21st for anyone west of Greenwich, which would show the
 * wrong date and an off-by-one countdown for every visitor in the Americas.
 */
export function toLocalDate(date: string): Date {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatRange(start: Date, end: Date): string {
  const head = `${MONTHS[start.getMonth()]} ${start.getDate()}`;
  const tail =
    start.getMonth() === end.getMonth()
      ? `${end.getDate()}`
      : `${MONTHS[end.getMonth()]} ${end.getDate()}`;
  return `${head} – ${tail}`;
}

function formatCountdown(
  days: number,
  started: boolean,
): Pick<ScheduledEvent, 'countdownValue' | 'countdownLabel'> {
  if (started) return { countdownValue: null, countdownLabel: 'happening now' };
  if (days <= 0) return { countdownValue: null, countdownLabel: 'today' };
  return { countdownValue: String(days), countdownLabel: days === 1 ? 'day away' : 'days away' };
}

/**
 * Everything that hasn't finished yet, soonest first. An event stays listed
 * through its final day and then drops off on its own, so the band empties
 * itself rather than needing the data file pruned.
 */
export function upcomingEvents(
  events: readonly DanceEvent[],
  today: Date,
): readonly ScheduledEvent[] {
  const now = startOfDay(today).getTime();

  return events
    .map((event) => ({ event, start: toLocalDate(event.start), end: toLocalDate(event.end) }))
    .filter(({ end }) => end.getTime() >= now)
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .map(({ event, start, end }, index) => ({
      ...event,
      when: formatRange(start, end),
      ...formatCountdown(Math.round((start.getTime() - now) / MS_PER_DAY), start.getTime() <= now),
      next: index === 0,
    }));
}
