import { DanceEvent } from '../core/models/dance-event';

/**
 * Events still to come. Dates, cities and links were taken from each event's
 * own site rather than from a schedule that can drift.
 *
 * Order here doesn't matter — the band sorts by start date and drops anything
 * that has already finished, so a past event stops rendering on its own. Add
 * next year's weekends whenever they're announced.
 */
export const DANCE_EVENTS: readonly DanceEvent[] = [
  {
    id: 'swing-city-chicago-2026',
    name: 'Swing City Chicago',
    city: 'Schaumburg, IL',
    start: '2026-10-22',
    end: '2026-10-25',
    url: 'https://swingcitychicago.com/',
  },
  {
    id: 'groovetopia-2026',
    name: 'Groovetopia',
    city: 'Cincinnati, OH',
    start: '2026-11-06',
    end: '2026-11-08',
    url: 'https://jasonandsophy.com/groovetopia-dance-party',
  },
  {
    id: 'cash-bash-2026',
    name: 'Cash Bash',
    city: 'Cleveland, OH',
    start: '2026-11-26',
    end: '2026-11-29',
    url: 'https://cashdanceclub.org/cash-bash/',
  },
  {
    id: 'the-after-party-2026',
    name: 'The After Party',
    city: 'Irvine, CA',
    start: '2026-12-03',
    end: '2026-12-06',
    url: 'https://tapwcs.com/',
  },
  {
    id: 'spotlight-2027',
    name: 'Spotlight',
    city: 'Nashville, TN',
    start: '2026-12-30',
    end: '2027-01-03',
    url: 'https://www.spotlightnewyears.com/',
  },
];
