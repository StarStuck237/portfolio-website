import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MARQUEE_WORDS } from '../../data/site';

/**
 * The coral band between the hero and the dance section. The word list is
 * rendered twice so the track can loop on a -50% translate with no seam.
 */
@Component({
  selector: 'app-marquee',
  imports: [],
  templateUrl: './marquee.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // The band is wider than the page and tilted, so the overflow is clipped here.
  host: { class: 'block overflow-hidden' },
})
export class Marquee {
  protected readonly words = MARQUEE_WORDS;
  protected readonly halves = [0, 1];
}
