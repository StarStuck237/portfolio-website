import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  imports: [],
  templateUrl: './section-heading.html',
  styleUrl: './section-heading.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeading {
  /** A dance count — the six- and eight-count basics — rather than 01, 02, 03. */
  count = input.required<string>();
  title = input.required<string>();
  headingId = input.required<string>();
}
