import { Injectable, OnDestroy, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ActiveSectionService implements OnDestroy {
  private readonly activeId = signal<string | null>(null);
  readonly active = this.activeId.asReadonly();

  private readonly sections: HTMLElement[] = [];
  private readonly intersecting = new Set<HTMLElement>();

  private readonly observer = new IntersectionObserver((entries) => this.onIntersect(entries), {
    root: null,
    rootMargin: '0px 0px -60% 0px',
    threshold: 0,
  });

  private readonly onScroll = () => this.checkBottom();

  constructor() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
  }

  register(element: HTMLElement): void {
    this.sections.push(element);
    this.observer.observe(element);
  }

  unregister(element: HTMLElement): void {
    this.observer.unobserve(element);
    this.intersecting.delete(element);
    const index = this.sections.indexOf(element);
    if (index !== -1) this.sections.splice(index, 1);
  }

  private onIntersect(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      const el = entry.target as HTMLElement;
      if (entry.isIntersecting) {
        this.intersecting.add(el);
      } else {
        this.intersecting.delete(el);
      }
    }
    if (this.isAtBottom()) return;
    for (let i = this.sections.length - 1; i >= 0; i--) {
      if (this.intersecting.has(this.sections[i])) {
        this.activeId.set(this.sections[i].id);
        break;
      }
    }
  }

  private isAtBottom(): boolean {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight > window.innerHeight;
    return scrollable && window.scrollY + window.innerHeight >= doc.scrollHeight - 2;
  }

  private checkBottom(): void {
    if (!this.isAtBottom() || this.sections.length === 0) return;
    this.activeId.set(this.sections[this.sections.length - 1].id);
  }
}
