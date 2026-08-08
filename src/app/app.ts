import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Sidebar } from './layout/sidebar/sidebar';
import { About } from './sections/about/about';
import { Experience } from './sections/experience/experience';
import { Projects } from './sections/projects/projects';
import { Contact } from './sections/contact/contact';

@Component({
  selector: 'app-root',
  imports: [Sidebar, About, Experience, Projects, Contact],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
