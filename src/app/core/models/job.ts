export interface Job {
  readonly id: string;
  readonly company: string;
  readonly role: string;
  readonly dateRange: string;
  readonly url?: string;
  /** One paragraph. The work rows are prose, not bullets. */
  readonly summary: string;
  readonly techStack: readonly string[];
}
