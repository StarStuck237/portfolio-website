import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ObserveSectionDirective } from '../../core/directives/observe-section.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { PROJECTS } from '../../data/projects';
import { ProjectCard } from './project-card/project-card';

@Component({
  selector: 'app-projects',
  imports: [SectionHeading, ObserveSectionDirective, ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  protected readonly projects = PROJECTS;
}
