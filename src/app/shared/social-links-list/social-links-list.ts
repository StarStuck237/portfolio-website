import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SocialLink } from '../../core/models/social-link';

@Component({
  selector: 'app-social-links-list',
  imports: [],
  templateUrl: './social-links-list.html',
  styleUrl: './social-links-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinksList {
  links = input.required<readonly SocialLink[]>();
}
