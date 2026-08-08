export interface Job {
  readonly id: string;
  readonly company: string;
  readonly role: string;
  readonly dateRange: string;
  readonly highlights: readonly string[];
  readonly techStack: readonly string[];
}
