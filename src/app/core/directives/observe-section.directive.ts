import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';
import { ActiveSectionService } from '../services/active-section.service';

@Directive({ selector: '[appObserveSection]' })
export class ObserveSectionDirective implements OnInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly activeSection = inject(ActiveSectionService);

  ngOnInit(): void {
    this.activeSection.register(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.activeSection.unregister(this.elementRef.nativeElement);
  }
}
