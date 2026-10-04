export const profile = {
  name: 'Rahul Taritla',
  role: 'Full-Stack Engineer',
  location: 'Bangalore, India',
  email: 'rahultaritla@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rahultaritla/',
  github: 'https://github.com/Rahulbunny07',
  resume: `${import.meta.env.BASE_URL}Rahul_Taritla_Resume.pdf`,
  avatar: `${import.meta.env.BASE_URL}avatar.jpg`,
}

export const stats = [
  { value: '4+', label: 'Years building production software' },
  { value: '100+', label: 'Pull requests merged across UI & backend' },
  { value: '40+', label: 'Production issues investigated & resolved' },
  { value: '2', label: 'Stacks: React/TypeScript and Java/Spring Boot' },
]

export type CaseStudy = {
  id: string
  kicker: string
  title: string
  summary: string
  role: string
  stack: string[]
  problem: string
  approach: string[]
  outcome: string
  diagram: 'pipeline' | 'export' | 'claim' | 'handshake'
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'realtime',
    kicker: 'Real-time systems',
    title: 'Live backup progress, from worker process to browser',
    summary:
      'How progress from long-running VM backups reaches the admin console in real time over a single WebSocket connection.',
    role: 'Contributed',
    stack: ['React', 'Redux', 'WebSockets', 'Spring Boot', 'Java'],
    problem:
      'VM backups run for minutes to hours inside separate worker processes. Admins need to see progress, speed and status live, without polling and without losing updates when the connection drops.',
    approach: [
      'Workers stream JSON progress lines; the Spring Boot service relays each one to subscribed browser sessions.',
      'A Redux middleware owns the single WebSocket: it serializes outgoing actions, queues messages while disconnected and routes incoming events to state slices.',
      'Worked on reconnect handling and keep-alive behaviour so sessions survive service restarts and network blips.',
    ],
    outcome:
      'Admins follow every backup live in the console, and sessions stay stable across restarts instead of logging users out.',
    diagram: 'pipeline',
  },
  {
    id: 'export',
    kicker: 'Full-stack feature',
    title: 'Multi-format log export: CSV, Excel and PDF',
    summary:
      'An export flow that turns whatever the admin is looking at (tab, filters, date range, search) into a downloadable report.',
    role: 'Built',
    stack: ['React', 'Redux-Saga', 'Java', 'Apache POI', 'PDFBox'],
    problem:
      'Admins and support teams had no way to take backup, restore and system logs out of the appliance for audits or troubleshooting.',
    approach: [
      'On the UI, request builders map the active view and filters into a single export request, with a saga tracking progress until the file is ready.',
      'On the backend, an export engine converts log data into Excel (Apache POI) and branded PDF reports (PDFBox).',
      'Later refactored ~1,000 lines of export logic out of a large WebSocket endpoint into a reusable module, then extended it with date ranges and new log types.',
    ],
    outcome:
      'Exports for 4 log types in 3 formats, built on a module that is still in production and easy to extend.',
    diagram: 'export',
  },
  {
    id: 'concurrency',
    kicker: 'Concurrency & data integrity',
    title: 'Making parallel backups safe with atomic job claiming',
    summary:
      'A fix for a race where two threads could start the same VM backup, leaving storage and database records out of sync.',
    role: 'Fixed',
    stack: ['Java', 'Multithreading', 'SQL', 'Transactions'],
    problem:
      'When many VMs were backed up in parallel, two threads could both see a job as pending and start it. That led to orphaned storage and incorrect recovery-point counts.',
    approach: [
      'Introduced an atomic compare-and-set claim: a job moves from PENDING to IN PROGRESS only if it is still pending, checked by rows affected.',
      'Ran the claim inside a transaction under the existing write lock, before any storage side effects happen.',
      'Fixed a related cleanup bug so failed backups no longer leave data behind.',
    ],
    outcome:
      'Exactly one thread can start a given backup, keeping storage and job records consistent under load.',
    diagram: 'claim',
  },
  {
    id: 'security',
    kicker: 'Application security',
    title: 'Hardening WebSocket security across UI and backend',
    summary:
      'Removing a static signing key from the shipped frontend and protecting critical actions end to end.',
    role: 'Contributed',
    stack: ['TypeScript', 'Redux middleware', 'Java', 'HMAC', '2FA'],
    problem:
      'Critical actions over the WebSocket (2FA changes, deletes, trusted devices) were signed with a key that shipped inside the frontend bundle.',
    approach: [
      'Worked on a per-session key handshake on every connection, so the key no longer lives in the bundle.',
      'Critical messages wait in a queue until the key arrives, are then signed and sent, and are never sent unsigned.',
      'Aligned the list of critical actions between the React UI and the Java backend across release branches.',
    ],
    outcome:
      'No static secret in the shipped UI, and sensitive actions are verified on both sides of the connection.',
    diagram: 'handshake',
  },
]

export const experience = [
  {
    company: 'IDrive Software India Pvt. Ltd.',
    role: 'Programmer Analyst',
    period: 'Aug 2022 – Present',
    location: 'Bangalore, India',
    product:
      'IDrive BMR: an on-prem backup and disaster-recovery appliance for SMBs and MSPs, protecting VMware, Hyper-V, physical machines and NAS.',
    phases: [
      {
        period: '2022 – 2023',
        title: 'Frontend foundations',
        points: [
          'Delivered fixes and enhancements across Backups, Restore, Virtualization, Cloud Replication and Settings in a large React + TypeScript console.',
          'Added validation, loaders and UX improvements to VMware ESXi/vCenter onboarding.',
        ],
      },
      {
        period: '2023 – 2025',
        title: 'Full-stack features & integrations',
        points: [
          'Built the multi-format log export feature across React and Java.',
          'Worked on MSP alerting and the ConnectWise PSA integration; supported release integration with 28 release PRs merged.',
        ],
      },
      {
        period: '2026 – Now',
        title: 'Core services & reliability',
        points: [
          'Contributed to Spring Boot services for backup orchestration, scheduling and job tracking.',
          'Fixed concurrency and session-reliability issues, helped strengthen WebSocket security and performed code reviews.',
        ],
      },
    ],
  },
  {
    company: 'BDFL Technologies (The10xAcademy)',
    role: 'Full-Stack Developer (Apprenticeship)',
    period: 'Mar 2022 – Aug 2022',
    location: '',
    product: '',
    phases: [],
  },
]

export const skills = [
  { group: 'Frontend', items: ['TypeScript', 'JavaScript', 'React', 'Redux', 'HTML', 'CSS'] },
  { group: 'Backend', items: ['Java', 'Spring Boot', 'Microservices', 'REST APIs', 'WebSockets', 'Multithreading', 'JDBC', 'Node.js', 'Express'] },
  { group: 'Databases', items: ['SQL', 'SQLite', 'MySQL', 'MongoDB'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'Maven', 'Postman', 'Jira'] },
  { group: 'Practices', items: ['Agile/Scrum', 'Unit Testing', 'Code Reviews', 'CI/CD', 'OOP', 'Design Patterns'] },
]

export const education = {
  school: 'National Institute of Technology, Calicut',
  degree: 'B.Tech, Computer Science and Engineering',
  period: '2016 – 2020',
}

export type SideProject = {
  name: string
  tagline: string
  description: string
  badge: string
  image: string
  stack: string[]
  highlights: string[]
  links: { label: string; href: string; kind: 'live' | 'code' }[]
  note?: string
}

export const sideProjects: SideProject[] = [
  {
    name: 'Jenji',
    tagline: 'Lead generation & email outreach automation for agencies',
    description:
      'A product I’m building to launch: agencies manage many clients from one admin panel, find and score leads, and run personalised multi-step email campaigns that run themselves.',
    badge: 'Founder · sole developer',
    image: `${import.meta.env.BASE_URL}projects/jenji.jpg`,
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'OpenAI API', 'Nodemailer', 'IMAP'],
    highlights: [
      'Admin and client portals with role-based access',
      'Lead import, Google Maps prospecting and opportunity scoring',
      'AI-written outreach, multi-step sequences and a send scheduler',
      'SMTP account rotation with daily limits, open tracking and reply sync',
    ],
    links: [],
    note: 'Private codebase · walkthrough available on request',
  },
  {
    name: 'Ask the Lecture',
    tagline: 'An AI study partner grounded in one lecture',
    description:
      'Ask questions about a recorded lecture and get answers only from what the teacher said, each with a clickable timestamp that jumps the video to that second.',
    badge: 'Personal project',
    image: `${import.meta.env.BASE_URL}projects/ask-the-lecture.jpg`,
    stack: ['React', 'TypeScript', 'Express', 'MongoDB', 'Claude API'],
    highlights: [
      'Streaming answers with timestamp citations',
      'Says plainly when the lecture doesn’t cover a question',
      'Auto chapters, synced transcript and lecture notes',
    ],
    links: [
      { label: 'Live demo', href: 'https://ask-the-lecture-beta.vercel.app/', kind: 'live' },
      { label: 'Code', href: 'https://github.com/Rahulbunny07/ask-the-lecture', kind: 'code' },
    ],
  },
  {
    name: 'FreshFold',
    tagline: 'Doorstep laundry ordering, end to end',
    description:
      'Customers build an order item by item, pick a store and follow it from pickup to delivery. Rebuilt from a bootcamp team project into a production-quality app.',
    badge: 'Personal rebuild',
    image: `${import.meta.env.BASE_URL}projects/freshfold.jpg`,
    stack: ['React', 'TypeScript', 'Express', 'MongoDB', 'Zod', 'TanStack Query'],
    highlights: [
      'Server-side pricing and owner-scoped, JWT-protected APIs',
      'Order status timeline with safe cancel-before-pickup',
      'Integration tests and one-command demo data',
    ],
    links: [{ label: 'Code', href: 'https://github.com/Rahulbunny07/freshfold', kind: 'code' }],
  },
]
