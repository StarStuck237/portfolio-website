import { describe, expect, it } from 'vitest';
import { DanceEvent } from '../../../core/models/dance-event';
import { toLocalDate, upcomingEvents } from './event-schedule';

const event = (id: string, start: string, end: string): DanceEvent => ({
  id,
  name: id,
  city: 'Somewhere, XX',
  start,
  end,
  url: `https://example.test/${id}`,
});

describe('toLocalDate', () => {
  it('reads the date in the local zone, not UTC', () => {
    const parsed = toLocalDate('2026-10-22');
    expect(parsed.getFullYear()).toBe(2026);
    expect(parsed.getMonth()).toBe(9);
    expect(parsed.getDate()).toBe(22);
  });
});

describe('upcomingEvents', () => {
  const oct = event('oct', '2026-10-22', '2026-10-25');
  const nov = event('nov', '2026-11-06', '2026-11-08');
  const newYear = event('new-year', '2026-12-30', '2027-01-03');

  it('sorts soonest first regardless of the order in the data file', () => {
    const result = upcomingEvents([newYear, oct, nov], new Date(2026, 7, 30));
    expect(result.map((e) => e.id)).toEqual(['oct', 'nov', 'new-year']);
    expect(result.map((e) => e.next)).toEqual([true, false, false]);
  });

  it('counts whole days to the start', () => {
    const result = upcomingEvents([oct], new Date(2026, 7, 30));
    expect(result[0].countdownValue).toBe('53');
    expect(result[0].countdownLabel).toBe('days away');
  });

  it('keeps an event listed through its final day, then drops it', () => {
    const lastDay = upcomingEvents([oct], new Date(2026, 9, 25));
    expect(lastDay).toHaveLength(1);
    expect(lastDay[0].countdownLabel).toBe('happening now');

    expect(upcomingEvents([oct], new Date(2026, 9, 26))).toHaveLength(0);
  });

  it('reads naturally on the days either side of the start', () => {
    expect(upcomingEvents([oct], new Date(2026, 9, 21))[0].countdownLabel).toBe('day away');
    expect(upcomingEvents([oct], new Date(2026, 9, 21))[0].countdownValue).toBe('1');
    expect(upcomingEvents([oct], new Date(2026, 9, 22))[0].countdownLabel).toBe('happening now');
  });

  it('is unaffected by the time of day', () => {
    const morning = upcomingEvents([oct], new Date(2026, 7, 30, 6, 0));
    const midnightish = upcomingEvents([oct], new Date(2026, 7, 30, 23, 59));
    expect(morning[0].countdownValue).toBe(midnightish[0].countdownValue);
  });

  it('names the month only once inside a month, and twice across one', () => {
    const [same] = upcomingEvents([oct], new Date(2026, 7, 30));
    const [across] = upcomingEvents([newYear], new Date(2026, 7, 30));
    expect(same.when).toBe('Oct 22 – 25');
    expect(across.when).toBe('Dec 30 – Jan 3');
  });

  it('counts correctly across a daylight-saving change', () => {
    // US clocks spring forward 14 Mar 2027 — a 23-hour day, which a naive
    // floor of the millisecond difference would round down by one.
    const spring = upcomingEvents(
      [event('spring', '2027-03-20', '2027-03-22')],
      new Date(2027, 2, 1),
    );
    expect(spring[0].countdownValue).toBe('19');

    // And fall back 1 Nov 2026, a 25-hour day.
    const fall = upcomingEvents([nov], new Date(2026, 9, 25));
    expect(fall[0].countdownValue).toBe('12');
  });

  it('renders nothing once every event has passed', () => {
    expect(upcomingEvents([oct, nov, newYear], new Date(2027, 5, 1))).toHaveLength(0);
  });
});
