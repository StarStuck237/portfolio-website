import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ObserveSectionDirective } from '../../core/directives/observe-section.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { EDUCATION, EXPERIENCE } from '../../data/experience';
import { ExperienceItem } from './experience-item/experience-item';

@Component({
  selector: 'app-experience',
  imports: [SectionHeading, ObserveSectionDirective, ExperienceItem],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  protected readonly jobs = EXPERIENCE;
  protected readonly education = EDUCATION;
}
