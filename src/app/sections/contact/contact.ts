import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ObserveSectionDirective } from '../../core/directives/observe-section.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { SocialLinksList } from '../../shared/social-links-list/social-links-list';
import { SOCIAL_LINKS } from '../../data/social-links';

@Component({
  selector: 'app-contact',
  imports: [SectionHeading, ObserveSectionDirective, SocialLinksList],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly socialLinks = SOCIAL_LINKS;
}
