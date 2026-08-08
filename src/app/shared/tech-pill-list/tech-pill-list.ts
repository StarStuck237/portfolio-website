import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tech-pill-list',
  imports: [],
  templateUrl: './tech-pill-list.html',
  styleUrl: './tech-pill-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechPillList {
  items = input.required<readonly string[]>();
}
