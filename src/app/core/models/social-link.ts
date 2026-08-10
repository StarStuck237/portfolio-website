export type SocialIcon = 'github' | 'linkedin' | 'email' | 'instagram' | 'resume';

export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly icon: SocialIcon;
}
