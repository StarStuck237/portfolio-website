import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SlotRule } from '../../shared/slot-rule/slot-rule';
import { HERO_CREDIT, HERO_PHOTOS } from '../../data/dance-photos';
import { SITE } from '../../data/site';

@Component({
  selector: 'app-hero',
  imports: [SlotRule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly site = SITE;
  protected readonly photos = HERO_PHOTOS;
  protected readonly credit = HERO_CREDIT;
}
