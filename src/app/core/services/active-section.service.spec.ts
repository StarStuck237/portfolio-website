import { TestBed } from '@angular/core/testing';
import { ActiveSectionService } from './active-section.service';

class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: readonly number[] = [];
  readonly observed = new Set<Element>();

  constructor(readonly callback: IntersectionObserverCallback) {
    MockIntersectionObserver.instances.push(this);
  }

  observe(target: Element): void {
    this.observed.add(target);
  }

  unobserve(target: Element): void {
    this.observed.delete(target);
  }

  disconnect(): void {
    this.observed.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  emit(entries: Array<{ target: Element; isIntersecting: boolean }>): void {
    this.callback(entries as IntersectionObserverEntry[], this);
  }
}

function makeSection(id: string): HTMLElement {
  const el = document.createElement('section');
  el.id = id;
  return el;
}

describe('ActiveSectionService', () => {
  const originalIntersectionObserver = globalThis.IntersectionObserver;

  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    globalThis.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    globalThis.IntersectionObserver = originalIntersectionObserver;
  });

  it('sets active to the id of the intersecting section', () => {
    const service = TestBed.inject(ActiveSectionService);
    const observer = MockIntersectionObserver.instances[0];
    const about = makeSection('about');

    service.register(about);
    observer.emit([{ target: about, isIntersecting: true }]);

    expect(service.active()).toBe('about');
  });

  it('picks the topmost DOM-registered section when multiple intersect', () => {
    const service = TestBed.inject(ActiveSectionService);
    const observer = MockIntersectionObserver.instances[0];
    const about = makeSection('about');
    const experience = makeSection('experience');

    service.register(about);
    service.register(experience);
    observer.emit([
      { target: about, isIntersecting: true },
      { target: experience, isIntersecting: true },
    ]);

    expect(service.active()).toBe('about');
  });

  it('does not clear active when nothing is intersecting (avoids nav flicker)', () => {
    const service = TestBed.inject(ActiveSectionService);
    const observer = MockIntersectionObserver.instances[0];
    const about = makeSection('about');
    const experience = makeSection('experience');

    service.register(about);
    service.register(experience);
    observer.emit([{ target: about, isIntersecting: true }]);
    observer.emit([{ target: about, isIntersecting: false }]);

    expect(service.active()).toBe('about');
  });

  it('switches active section as scroll progresses', () => {
    const service = TestBed.inject(ActiveSectionService);
    const observer = MockIntersectionObserver.instances[0];
    const about = makeSection('about');
    const experience = makeSection('experience');

    service.register(about);
    service.register(experience);
    observer.emit([{ target: about, isIntersecting: true }]);
    expect(service.active()).toBe('about');

    observer.emit([
      { target: about, isIntersecting: false },
      { target: experience, isIntersecting: true },
    ]);
    expect(service.active()).toBe('experience');
  });

  it('stops tracking a section after unregister', () => {
    const service = TestBed.inject(ActiveSectionService);
    const observer = MockIntersectionObserver.instances[0];
    const about = makeSection('about');
    const experience = makeSection('experience');

    service.register(about);
    service.register(experience);
    service.unregister(about);

    observer.emit([
      { target: about, isIntersecting: true },
      { target: experience, isIntersecting: true },
    ]);

    expect(service.active()).toBe('experience');
  });
});
