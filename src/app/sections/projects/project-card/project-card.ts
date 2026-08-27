import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project } from '../../../core/models/project';
import { TechPillList } from '../../../shared/tech-pill-list/tech-pill-list';

@Component({
  selector: 'app-project-card',
  imports: [TechPillList],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ProjectCard {
  project = input.required<Project>();
}
