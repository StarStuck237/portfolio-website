import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActiveSectionService } from '../../core/services/active-section.service';
import { NAV_LINKS } from '../../data/nav-links';
import { SITE } from '../../data/site';

@Component({
  selector: 'app-top-nav',
  imports: [],
  templateUrl: './top-nav.html',
  styleUrl: './top-nav.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNav {
  protected readonly activeSection = inject(ActiveSectionService);
  protected readonly navLinks = NAV_LINKS;
  protected readonly site = SITE;

  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  /** A nav click both closes the panel and tells the service where we meant to go. */
  protected go(id: string): void {
    this.activeSection.pin(id);
    this.menuOpen.set(false);
  }
}
