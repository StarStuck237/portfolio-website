import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  signal,
} from '@angular/core';
import { DANCE_EVENTS } from '../../../data/dance-events';
import { startOfDay, upcomingEvents } from './event-schedule';

@Component({
  selector: 'app-dance-events',
  imports: [],
  templateUrl: './dance-events.html',
  styleUrl: './dance-events.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DanceEvents {
  /**
   * The page is prerendered, so on the server this is the build date and every
   * countdown would be frozen at whatever it was when the site last deployed.
   * Refreshing it once in the browser is what keeps the numbers honest.
   */
  private readonly today = signal(startOfDay(new Date()));

  constructor() {
    afterNextRender(() => this.today.set(startOfDay(new Date())));
  }

  protected readonly events = computed(() => upcomingEvents(DANCE_EVENTS, this.today()));
}
