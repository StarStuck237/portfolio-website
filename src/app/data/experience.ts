import { Job } from '../core/models/job';

export const EXPERIENCE: readonly Job[] = [
  {
    id: 'job-1',
    company: 'Volgistics',
    role: 'Software Developer',
    dateRange: '2023 — Present',
    url: 'https://www.volgistics.com/',
    summary:
      'Build and maintain features across the front-end, back-end and mobile apps in the Volgistics product line, and work with a small team to pick the solution the customer actually needs, not the one that is quickest to write.',
    techStack: ['Angular', 'TypeScript', 'Delphi', 'Python', 'Tauri', 'JWT', 'WCAG 2.0'],
  },
  {
    id: 'job-2',
    company: 'Professional Computing Resources',
    role: 'Application Developer',
    dateRange: '2012 — 2023',
    url: 'https://www.pcr.com/',
    summary:
      "Subject matter expert for reporting, API, billing and inventory. Built search that worked across the whole application, automated technician scheduling, and rebuilt the product's API as a proper REST API — plus the reports and dashboards customers used to track their own support metrics.",
    techStack: [
      'PHP',
      'Zend Framework',
      'JavaScript',
      'MySQL',
      'Oracle',
      'Crystal Reports',
      'PHPUnit',
    ],
  },
  // {
  //   id: 'job-3',
  //   company: 'Kinetic Technology Solutions',
  //   role: 'Owner & President',
  //   dateRange: '2011 — 2015',
  //   summary:
  //     'Ran a small web development consultancy, taking client projects start to finish — including an online auction site where people bid on a fresh set of items every week.',
  //   techStack: ['PHP', 'MySQL', 'Web Development'],
  // },
  // {
  //   id: 'job-4',
  //   company: 'Silas Media Consultants',
  //   role: 'Director of IT & Development',
  //   dateRange: '2010 — 2011',
  //   summary:
  //     'Ran IT operations, from the network to vendor relationships, grew the web development side across several platforms, and kept the Linux servers hosting client sites running.',
  //   techStack: ['Linux', 'WordPress', 'Web Development'],
  // },
];

export const EDUCATION = {
  degree: 'B.S. Computer Information Systems',
  school: 'Ferris State University',
  // honors: 'Magna Cum Laude',
} as const;
