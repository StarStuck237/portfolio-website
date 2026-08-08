import { Project } from '../core/models/project';

export const PROJECTS: readonly Project[] = [
  {
    id: 'project-1',
    name: 'Volunteer Import Utility',
    highlights: [
      'End-to-end Angular + Delphi app letting nonprofits bulk-import volunteer data.',
      'Full data-model field mapping with a validation/preview layer before import execution.',
    ],
    techStack: ['Angular', 'TypeScript', 'RxJS', 'Delphi'],
  },
  {
    id: 'project-2',
    name: 'DB-Interactor',
    highlights: [
      'Internal Delphi API + Angular tool, packaged as a Tauri desktop app, for browsing/managing Volgistics databases.',
      'Includes a live in-place field-editing feature.',
    ],
    techStack: ['Angular', 'Delphi', 'Tauri'],
  },
  {
    id: 'project-3',
    name: 'PCR-360 Service Desk & Reporting',
    highlights: [
      'Application-wide search wizards and automated technician scheduling.',
      'REST API redevelopment and custom Crystal Reports/dashboards for SLA metrics.',
    ],
    techStack: ['PHP', 'Zend Framework', 'Crystal Reports'],
  },
];
