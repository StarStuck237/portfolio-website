import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../data/site';

@Component({
  selector: 'app-site-footer',
  imports: [],
  templateUrl: './site-footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {
  protected readonly site = SITE;
}
