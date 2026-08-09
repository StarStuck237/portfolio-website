import { Job } from '../core/models/job';

export const EXPERIENCE: readonly Job[] = [
  {
    id: 'job-1',
    company: 'Volgistics',
    role: 'Software Engineer',
    dateRange: '2023 — Present',
    url: 'https://www.volgistics.com/',
    highlights: [
      'Built the Volunteer Import Utility end-to-end (Angular + Delphi, ~330 commits) — upload → field mapping → validation/preview → import execution.',
      'Built and grew DB-Interactor (Delphi API + Angular + Tauri desktop tool), including a major live in-place database-editing feature.',
      'Achieved WCAG 2.0 compliance across multiple shared UI libraries.',
      'Shipped 2FA and Cloudflare Turnstile CAPTCHA for VicNet/VBO.',
      'Developed internal tools utilizing Python scripts to increase workflow efficiency',
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
      "SME for PCR-360's Service Desk, API, Crystal Reports, Charges, Inventory, and Dashboard modules.",
      'Built application-wide search wizards and automated workflow-based technician scheduling.',
      'Redeveloped the product API as REST.',
      'Built customer Crystal Reports and dashboard widgets for SLA/call metrics.',
      'Maintained SLA compliance via code review and PHPUnit testing.',
    ],
    techStack: ['PHP', 'Zend Framework', 'JavaScript', 'MySQL', 'Oracle', 'Crystal Reports', 'PHPUnit'],
  },
  {
    id: 'job-3',
    company: 'Kinetic Technology Solutions',
    role: 'Owner / President',
    dateRange: '2011 — 2015',
    highlights: [
      'Ran an independent web-dev consultancy.',
      'Designed and built an online auction website for weekly item bidding.',
    ],
    techStack: ['PHP', 'MySQL', 'Web Development'],
  },
  {
    id: 'job-4',
    company: 'Silas Media Consultants',
    role: 'Director of IT and Development',
    dateRange: '2010 — 2011',
    highlights: [
      'Managed all IT operations (network, vendors).',
      'Expanded the web-dev division across Concrete5/Joomla/WordPress.',
      'Ran Linux hosting for customer sites.',
    ],
    techStack: ['Web Development', 'Linux', 'WordPress'],
  },
];
