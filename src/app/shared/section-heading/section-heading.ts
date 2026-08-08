import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  imports: [],
  templateUrl: './section-heading.html',
  styleUrl: './section-heading.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeading {
  index = input.required<string>();
  title = input.required<string>();
  headingId = input.required<string>();
}
