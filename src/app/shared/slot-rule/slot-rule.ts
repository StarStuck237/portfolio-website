import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * The slot: the straight line a West Coast Swing dance travels, with the lead
 * as a filled dot at one end and the follow as an open dot at the other. Used
 * as the page's divider and anchor motif.
 */
@Component({
  selector: 'app-slot-rule',
  imports: [],
  templateUrl: './slot-rule.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class SlotRule {}
