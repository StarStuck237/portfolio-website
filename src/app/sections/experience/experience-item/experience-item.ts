import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Job } from '../../../core/models/job';
import { TechPillList } from '../../../shared/tech-pill-list/tech-pill-list';

@Component({
  selector: 'app-experience-item',
  imports: [TechPillList],
  templateUrl: './experience-item.html',
  styleUrl: './experience-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ExperienceItem {
  job = input.required<Job>();
  /** The current role carries the lit left edge; the rest are ruled off. */
  current = input(false);
}
