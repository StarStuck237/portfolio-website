import { Job } from '../core/models/job';

export const EXPERIENCE: readonly Job[] = [
  {
    id: 'job-1',
    company: 'Volgistics',
    role: 'Software Developer',
    dateRange: '2023 — Present',
    url: 'https://www.volgistics.com/',
    highlights: [
      "Build and maintain new features for front-end, back-end and mobile apps across Vogistic's product line.",
      "Work closely with a team of developers to provide the best solutions for our customers.",
    ],
    techStack: ['Angular', 'TypeScript', 'Delphi', 'Python', 'Tauri', 'JWT', 'WCAG 2.0'],
  },
  {
    id: 'job-2',
    company: 'Professional Computing Resources',
    role: 'Application Developer',
    dateRange: '2012 — 2023',
    url: 'https://www.pcr.com/',
    highlights: [
      'Subject matter expert for reporting, API, billing, and inventory systems.',
      'Built search tools that worked across the whole application, automated how technician schedules got assigned, and rebuilt the product’s API as a proper REST API.',
      'Built the reports and dashboards customers used to track their own support metrics, and helped keep the product reliable through code review and automated testing.',
    ],
    techStack: ['PHP', 'Zend Framework', 'JavaScript', 'MySQL', 'Oracle', 'Crystal Reports', 'PHPUnit'],
  },
  {
    id: 'job-3',
    company: 'Kinetic Technology Solutions',
    role: 'Owner / President',
    dateRange: '2011 — 2015',
    highlights: [
      'Ran a small web development consultancy, taking on client projects from start to finish.',
      'Designed and built an online auction site where people could bid on new items each week.',
    ],
    techStack: ['PHP', 'MySQL', 'Web Development'],
  },
  {
    id: 'job-4',
    company: 'Silas Media Consultants',
    role: 'Director of IT and Development',
    dateRange: '2010 — 2011',
    highlights: [
      'Managed the company’s IT operations, from the network to vendor relationships.',
      'Grew web development work across a few different platforms and ran the Linux servers that hosted client sites.',
    ],
    techStack: ['Web Development', 'Linux', 'WordPress'],
  },
];
