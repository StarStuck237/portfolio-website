import { Interest } from '../core/models/interest';

export const OFF_THE_CLOCK: readonly Interest[] = [
  {
    id: 'running',
    title: 'Exercising',
    body: 'It is important to stay fit and active, running and exercising at least a few days each week.',
    icon: 'running',
  },
  {
    id: 'reading',
    title: 'Reading',
    // Set `current` to the book you are on; the sentence drops out when empty.
    body: "Looking for recommendations! I enjoy science fiction/fantasy",
    icon: 'reading',
  },
  {
    id: 'keeping-up',
    title: 'Keeping up',
    body: 'This industry moves quickly, keeping up with work and hobbies is something I enjoy.',
    icon: 'keeping-up',
  },
];

/** The book currently on the nightstand. Empty hides the sentence entirely. */
export const CURRENT_BOOK = 'Dune';
