export type SocialIcon = 'github' | 'linkedin' | 'email' | 'instagram';

export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly icon: SocialIcon;
}
