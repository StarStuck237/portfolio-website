import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ObserveSectionDirective } from '../../core/directives/observe-section.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { CURRENT_BOOK, OFF_THE_CLOCK } from '../../data/off-the-clock';

@Component({
  selector: 'app-off-the-clock',
  imports: [SectionHeading, ObserveSectionDirective],
  templateUrl: './off-the-clock.html',
  styleUrl: './off-the-clock.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffTheClock {
  protected readonly interests = OFF_THE_CLOCK;
  protected readonly currentBook = CURRENT_BOOK;
}
