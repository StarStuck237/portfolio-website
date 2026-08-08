import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ActiveSectionService {
  private readonly activeId = signal<string | null>(null);
  readonly active = this.activeId.asReadonly();

  private readonly sections: HTMLElement[] = [];
  private readonly intersecting = new Set<HTMLElement>();

  private readonly observer = new IntersectionObserver((entries) => this.onIntersect(entries), {
    root: null,
    rootMargin: '0px 0px -60% 0px',
    threshold: 0,
  });

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
    const current = this.sections.find((el) => this.intersecting.has(el));
    if (current) this.activeId.set(current.id);
  }
}
