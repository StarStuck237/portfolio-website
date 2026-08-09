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

  it('picks the bottommost DOM-registered section when multiple intersect', () => {
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

    expect(service.active()).toBe('experience');
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

  it('forces the last section active once a scrollable page is scrolled to the bottom', () => {
    const service = TestBed.inject(ActiveSectionService);
    const observer = MockIntersectionObserver.instances[0];
    const about = makeSection('about');
    const experience = makeSection('experience');

    service.register(about);
    service.register(experience);
    observer.emit([{ target: about, isIntersecting: true }]);
    expect(service.active()).toBe('about');

    const innerHeightDescriptor = Object.getOwnPropertyDescriptor(window, 'innerHeight');
    const scrollYDescriptor = Object.getOwnPropertyDescriptor(window, 'scrollY');
    const scrollHeightDescriptor = Object.getOwnPropertyDescriptor(
      Element.prototype,
      'scrollHeight',
    );

    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
    Object.defineProperty(window, 'scrollY', { value: 2089, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2889,
      configurable: true,
    });

    try {
      window.dispatchEvent(new Event('scroll'));
      expect(service.active()).toBe('experience');
    } finally {
      if (innerHeightDescriptor) Object.defineProperty(window, 'innerHeight', innerHeightDescriptor);
      if (scrollYDescriptor) Object.defineProperty(window, 'scrollY', scrollYDescriptor);
      if (scrollHeightDescriptor) {
        Object.defineProperty(document.documentElement, 'scrollHeight', scrollHeightDescriptor);
      } else {
        delete (document.documentElement as unknown as Record<string, unknown>)['scrollHeight'];
      }
    }
  });
});
