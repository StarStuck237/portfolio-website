import { Injectable, OnDestroy, signal } from '@angular/core';

/**
 * How far down the viewport a section has to reach before it counts as current,
 * as a fraction of viewport height. Kept well above the halfway mark so a short
 * opening section still wins at the top of the page on tall windows.
 */
const ACTIVATION_LINE = 0.2;

@Injectable({ providedIn: 'root' })
export class ActiveSectionService implements OnDestroy {
  private readonly activeId = signal<string | null>(null);
  readonly active = this.activeId.asReadonly();

  private readonly sections: HTMLElement[] = [];

  /**
   * Section the user explicitly navigated to. The last sections of a short page
   * all bottom out at the same scroll position, so scroll position alone cannot
   * tell "clicked Projects" from "clicked Contact" — the click itself is the only
   * signal. Held until the user scrolls under their own steam.
   */
  private pinnedId: string | null = null;

  private frame = 0;

  private readonly onScroll = () => this.schedule();

  /** Genuine user input. A nav click's smooth scroll never fires these. */
  private readonly onUserScroll = () => {
    if (this.pinnedId === null) return;
    this.pinnedId = null;
    this.schedule();
  };

  constructor() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll, { passive: true });
    window.addEventListener('wheel', this.onUserScroll, { passive: true });
    window.addEventListener('touchmove', this.onUserScroll, { passive: true });
    window.addEventListener('keydown', this.onUserScroll);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
    window.removeEventListener('wheel', this.onUserScroll);
    window.removeEventListener('touchmove', this.onUserScroll);
    window.removeEventListener('keydown', this.onUserScroll);
    if (this.frame) cancelAnimationFrame(this.frame);
  }

  register(element: HTMLElement): void {
    this.sections.push(element);
    this.update();
  }

  unregister(element: HTMLElement): void {
    const index = this.sections.indexOf(element);
    if (index !== -1) this.sections.splice(index, 1);
    if (this.pinnedId === element.id) this.pinnedId = null;
    this.update();
  }

  /** Called when a nav link is clicked, to honour where the user asked to go. */
  pin(id: string): void {
    this.pinnedId = id;
    this.update();
  }

  private schedule(): void {
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.update();
    });
  }

  private update(): void {
    if (this.sections.length === 0) return;

    const pinned = this.sections.find((section) => section.id === this.pinnedId);
    if (pinned) {
      this.activeId.set(pinned.id);
      return;
    }

    if (this.isAtBottom()) {
      this.activeId.set(this.sections[this.sections.length - 1].id);
      return;
    }

    const lineY = window.innerHeight * ACTIVATION_LINE;
    let closest = this.sections[0];
    let closestDistance = Infinity;
    for (const section of this.sections) {
      const rect = section.getBoundingClientRect();
      const distance =
        lineY < rect.top ? rect.top - lineY : lineY > rect.bottom ? lineY - rect.bottom : 0;
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = section;
      }
    }
    this.activeId.set(closest.id);
  }

  private isAtBottom(): boolean {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight > window.innerHeight;
    return scrollable && window.scrollY + window.innerHeight >= doc.scrollHeight - 2;
  }
}
