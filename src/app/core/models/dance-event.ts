/**
 * A competition weekend on the calendar. Dates are plain `YYYY-MM-DD` strings
 * rather than Date objects so the data file stays readable and no timezone
 * creeps in — the component parses them as local dates.
 */
export interface DanceEvent {
  readonly id: string;
  readonly name: string;
  /** City and state as the event's own site gives it. */
  readonly city: string;
  readonly start: string;
  readonly end: string;
  readonly url: string;
}
