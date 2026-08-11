import { Project } from '../core/models/project';

export const PROJECTS: readonly Project[] = [
  {
    id: 'project-1',
    name: 'Volunteer Import Utility',
    highlights: [
      'An Angular and Delphi app that lets users bulk-import their volunteer data, with field mapping and a preview step so nothing imports until it’s been checked.',
    ],
    techStack: ['Angular', 'TypeScript', 'RxJS', 'Delphi'],
  },
  {
    id: 'project-2',
    name: 'Database Interactor',
    highlights: [
      'An internal desktop tool, built with Delphi, Angular, and Tauri, for browsing and managing Volgistics databases — including editing records live, in place.',
    ],
    techStack: ['Angular', 'Delphi', 'Tauri'],
  },
];
