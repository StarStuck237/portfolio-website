import { TestBed } from '@angular/core/testing';
import { ActiveSectionService } from './active-section.service';

function makeSection(
  id: string,
  rect: { top: number; bottom: number },
): HTMLElement & { setRect: (rect: { top: number; bottom: number }) => void } {
  let current = rect;
  const el = document.createElement('section') as HTMLElement & {
    setRect: (rect: { top: number; bottom: number }) => void;
  };
  el.id = id;
  el.getBoundingClientRect = () =>
    ({
      top: current.top,
      bottom: current.bottom,
      height: current.bottom - current.top,
      left: 0,
      right: 0,
      width: 0,
      x: 0,
      y: current.top,
      toJSON() {},
    }) as DOMRect;
  el.setRect = (next) => {
    current = next;
  };
  return el;
}

describe('ActiveSectionService', () => {
  const restoreFns: Array<() => void> = [];

  function stub<T extends object>(obj: T, prop: keyof T, value: unknown): void {
    const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
    Object.defineProperty(obj, prop, { value, configurable: true });
    restoreFns.push(() => {
      if (descriptor) Object.defineProperty(obj, prop, descriptor);
      else delete (obj as Record<string, unknown>)[prop as string];
    });
  }

  /** The service coalesces scroll work into a frame; run it synchronously. */
  function stubAnimationFrame(): void {
    stub(globalThis, 'requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0);
      return 1;
    });
  }

  beforeEach(() => {
    stubAnimationFrame();
    stub(window, 'innerHeight', 1000);
  });

  afterEach(() => {
    while (restoreFns.length) restoreFns.pop()!();
  });

  it('activates the short opening section at the top of the page', () => {
    const service = TestBed.inject(ActiveSectionService);
    const about = makeSection('about', { top: 96, bottom: 343 });
    const experience = makeSection('experience', { top: 407, bottom: 1457 });

    service.register(about);
    service.register(experience);

    expect(service.active()).toBe('about');
  });

  it('keeps the opening section active at the top of very tall viewports', () => {
    stub(window, 'innerHeight', 1800);
    const service = TestBed.inject(ActiveSectionService);
    const about = makeSection('about', { top: 96, bottom: 343 });
    const experience = makeSection('experience', { top: 407, bottom: 1457 });

    service.register(about);
    service.register(experience);

    expect(service.active()).toBe('about');
  });

  it('activates a section once it reaches the activation line', () => {
    const service = TestBed.inject(ActiveSectionService);
    const about = makeSection('about', { top: 96, bottom: 343 });
    const experience = makeSection('experience', { top: 407, bottom: 1457 });

    service.register(about);
    service.register(experience);
    expect(service.active()).toBe('about');

    // Scrolled far enough that Experience now straddles the line at 20% of 1000px.
    about.setRect({ top: -300, bottom: -53 });
    experience.setRect({ top: 11, bottom: 1061 });
    window.dispatchEvent(new Event('scroll'));

    expect(service.active()).toBe('experience');
  });

  it('is not biased toward whichever section was registered last', () => {
    const service = TestBed.inject(ActiveSectionService);
    const experience = makeSection('experience', { top: 407, bottom: 1457 });
    const about = makeSection('about', { top: 96, bottom: 343 });

    service.register(experience);
    service.register(about);

    expect(service.active()).toBe('about');
  });

  it('picks the nearest section when the line falls in a gap between sections', () => {
    const service = TestBed.inject(ActiveSectionService);
    const about = makeSection('about', { top: -300, bottom: 190 });
    const experience = makeSection('experience', { top: 260, bottom: 1200 });

    service.register(about);
    service.register(experience);

    expect(service.active()).toBe('about');
  });

  it('honours a clicked section that the page is too short to scroll to the top', () => {
    const service = TestBed.inject(ActiveSectionService);
    const projects = makeSection('projects', { top: 57, bottom: 668 });
    const contact = makeSection('contact', { top: 732, bottom: 904 });

    service.register(projects);
    service.register(contact);

    // Clicking Projects bottoms the page out, which would otherwise select Contact.
    stub(window, 'scrollY', 1448);
    stub(document.documentElement, 'scrollHeight', 2448);
    service.pin('projects');
    window.dispatchEvent(new Event('scroll'));

    expect(service.active()).toBe('projects');
  });

  it('releases a clicked section once the user scrolls themselves', () => {
    const service = TestBed.inject(ActiveSectionService);
    const projects = makeSection('projects', { top: 57, bottom: 668 });
    const contact = makeSection('contact', { top: 732, bottom: 904 });

    service.register(projects);
    service.register(contact);

    stub(window, 'scrollY', 1448);
    stub(document.documentElement, 'scrollHeight', 2448);
    service.pin('projects');
    expect(service.active()).toBe('projects');

    window.dispatchEvent(new Event('wheel'));

    expect(service.active()).toBe('contact');
  });

  it('forces the last section active at the bottom of a scrollable page', () => {
    const service = TestBed.inject(ActiveSectionService);
    const projects = makeSection('projects', { top: 57, bottom: 668 });
    const contact = makeSection('contact', { top: 732, bottom: 904 });

    service.register(projects);
    service.register(contact);
    expect(service.active()).toBe('projects');

    stub(window, 'scrollY', 1448);
    stub(document.documentElement, 'scrollHeight', 2448);
    window.dispatchEvent(new Event('scroll'));

    expect(service.active()).toBe('contact');
  });

  it('stops tracking a section after unregister', () => {
    const service = TestBed.inject(ActiveSectionService);
    const about = makeSection('about', { top: -300, bottom: 900 });
    const experience = makeSection('experience', { top: 960, bottom: 2000 });

    service.register(about);
    service.register(experience);
    expect(service.active()).toBe('about');

    service.unregister(about);
    window.dispatchEvent(new Event('scroll'));

    expect(service.active()).toBe('experience');
  });

  it('recomputes on resize', () => {
    // At 500px the activation line sits at 100px, inside About; at 2000px it
    // drops to 400px, inside Experience — same scroll position, different answer.
    stub(window, 'innerHeight', 500);
    const service = TestBed.inject(ActiveSectionService);
    const about = makeSection('about', { top: -700, bottom: 150 });
    const experience = makeSection('experience', { top: 210, bottom: 1200 });

    service.register(about);
    service.register(experience);
    expect(service.active()).toBe('about');

    stub(window, 'innerHeight', 2000);
    window.dispatchEvent(new Event('resize'));

    expect(service.active()).toBe('experience');
  });
});
