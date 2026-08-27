import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TopNav } from './layout/top-nav/top-nav';
import { SiteFooter } from './layout/site-footer/site-footer';
import { Marquee } from './shared/marquee/marquee';
import { Hero } from './sections/hero/hero';
import { Dance } from './sections/dance/dance';
import { Experience } from './sections/experience/experience';
import { OffTheClock } from './sections/off-the-clock/off-the-clock';
import { Contact } from './sections/contact/contact';

@Component({
  selector: 'app-root',
  imports: [TopNav, SiteFooter, Marquee, Hero, Dance, Experience, OffTheClock, Contact],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
