import { Paragraph } from '../core/models/prose';

/**
 * Facts about the site owner that more than one section needs, plus the few
 * values that are deliberately left blank until Ben supplies them. Anything
 * optional here renders as nothing rather than as a placeholder, so an unset
 * value never ships as visible filler.
 */
export const SITE = {
  name: 'Ben Cok',
  initials: 'BC',
  role: 'Software Developer',
  /** Shown in the hero eyebrow and the footer. Leave empty to omit both. */
  location: 'Grand Rapids, Michigan',
  email: 'bencok@gmail.com',
  resumeUrl: '/resume.pdf',
  instagramUrl: 'https://www.instagram.com/bendancinalittle/',
  employer: { name: 'Volgistics', url: 'https://www.volgistics.com/' },
  /** Primer linked from the dance section's secondary button. */
  wcsPrimerUrl: 'https://en.wikipedia.org/wiki/West_Coast_Swing',
} as const;

/**
 * The marquee alternates dance vocabulary and work vocabulary — the whole
 * conceit of the page in one line. Rendered twice to loop seamlessly.
 */
export const MARQUEE_WORDS: readonly string[] = [
  'Sugar push',
  'Angular',
  'Anchor step',
  'Delphi',
  'Whip',
  'TypeScript',
  'Trail miles',
  'Code review',
];

/**
 * Ben's own account of how he came to the dance, in his words. Split in two so
 * it keeps the rhythm of the paragraphs above it rather than landing as one
 * long block, and broken into runs so the WSDC number can link to his registry
 * entry. An empty array skips the copy entirely.
 */
export const DANCE_STORY: readonly Paragraph[] = [
  [
    {
      text: "I've been dancing almost three years now, starting at GROSS, the Grand Rapids Original Swing Society, where hundreds of us gather to dance every Tuesday. After trying other styles I settled on West Coast Swing fast. The music can be blues, hip-hop, pop or contemporary, the dance takes all of it.",
    },
  ],
  [
    {
      text: "The community and the events hooked me, I can't get enough. I travel to events and compete regularly - Novice division, ",
    },
    { text: '24780', href: 'https://worldsdc.com/registry/?wsdc=24780' },
    { text: '.' },
  ],
];
