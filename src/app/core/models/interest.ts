export type InterestIcon = 'running' | 'reading' | 'keeping-up';

export interface Interest {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly icon: InterestIcon;
}
