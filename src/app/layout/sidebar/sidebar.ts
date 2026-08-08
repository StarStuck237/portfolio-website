import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActiveSectionService } from '../../core/services/active-section.service';
import { SocialLinksList } from '../../shared/social-links-list/social-links-list';
import { NAV_LINKS } from '../../data/nav-links';
import { SOCIAL_LINKS } from '../../data/social-links';

@Component({
  selector: 'app-sidebar',
  imports: [SocialLinksList],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  protected readonly activeSection = inject(ActiveSectionService);
  protected readonly navLinks = NAV_LINKS;
  protected readonly socialLinks = SOCIAL_LINKS;
}
