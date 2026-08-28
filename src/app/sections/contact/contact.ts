import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ObserveSectionDirective } from '../../core/directives/observe-section.directive';
import { SlotRule } from '../../shared/slot-rule/slot-rule';
import { SocialLinksList } from '../../shared/social-links-list/social-links-list';
import { SOCIAL_LINKS } from '../../data/social-links';
import { SITE } from '../../data/site';

@Component({
  selector: 'app-contact',
  imports: [SlotRule, SocialLinksList, ObserveSectionDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly site = SITE;
  protected readonly socialLinks = SOCIAL_LINKS;
  protected readonly emailLocal = SITE.email.slice(0, SITE.email.indexOf('@'));
  protected readonly emailDomain = SITE.email.slice(SITE.email.indexOf('@') + 1);
}
