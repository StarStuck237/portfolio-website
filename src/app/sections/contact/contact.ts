import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ObserveSectionDirective } from '../../core/directives/observe-section.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-contact',
  imports: [SectionHeading, ObserveSectionDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {}
