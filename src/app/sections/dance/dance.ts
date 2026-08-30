import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ObserveSectionDirective } from '../../core/directives/observe-section.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { DanceVideos } from './dance-videos/dance-videos';
import { DanceEvents } from './dance-events/dance-events';
import { DANCE_FEATURE, DANCE_STRIP } from '../../data/dance-photos';
import { DANCE_STORY, SITE } from '../../data/site';

@Component({
  selector: 'app-dance',
  imports: [SectionHeading, ObserveSectionDirective, DanceVideos, DanceEvents],
  templateUrl: './dance.html',
  styleUrl: './dance.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dance {
  protected readonly site = SITE;
  protected readonly feature = DANCE_FEATURE;
  protected readonly strip = DANCE_STRIP;
  protected readonly story = DANCE_STORY;
}
