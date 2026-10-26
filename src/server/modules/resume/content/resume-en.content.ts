import { type Models } from '@/models'

export const resumeEn: Models.Resume = {
  profile: {
    name: 'Tiago Oliver',
    role: 'Frontend Engineer — React & TypeScript',
    summary:
      'Frontend engineer with six years of experience in React and TypeScript. I work with designers and backend developers to build web interfaces, create reusable components and update older codebases. Alongside my day-to-day work, I build my own apps and tools for working with AI agents.',
    location: 'Barcelona, Spain',
    availability: 'Open to remote work, European hours',
    citizenship: 'EU citizen',
    email: { label: 'tiagoliver@protonmail.com', href: 'mailto:tiagoliver@protonmail.com' },
    website: { label: 'tiagoliver.com', href: 'https://tiagoliver.com' },
    linkedin: {
      label: 'linkedin.com/in/tiago-pinheiro-oliveira',
      href: 'https://www.linkedin.com/in/tiago-pinheiro-oliveira',
    },
    github: { label: 'github.com/tiago-o-pinheiro', href: 'https://github.com/tiago-o-pinheiro' },
  },
  positions: [
    {
      id: 'immfly',
      role: 'Frontend Developer',
      company: 'Immfly',
      location: 'Barcelona, Spain',
      context: 'In-flight entertainment systems',
      start: '2023-03',
      end: null,
      highlights: [
        'Build reusable React and TypeScript components from Figma designs, working with designers and backend developers.',
        'Replaced legacy CSS with Tailwind CSS and shared design tokens for colours, spacing and typography.',
        'Migrated JavaScript code to TypeScript, using strict compiler checks to catch errors before release.',
        'Write Jest unit and component tests for the main user journeys.',
        'Build layouts for mobile first, then adapt them to larger screens. Review code with the team on GitHub.',
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'styled-components', 'SCSS', 'Jest'],
    },
    {
      id: 'qida',
      role: 'Frontend Developer',
      company: 'Qida Home Care',
      location: 'Barcelona, Spain',
      context: 'Home care services platform',
      start: '2019-06',
      end: '2022-02',
      highlights: [
        'Built a set of reusable React components with styled-components, based on Figma designs.',
        'Developed multi-step forms with React Hook Form and managed app state with MobX State Tree.',
        'Wrote tests with Jest and reviewed code with the team.',
        'Extended internal Odoo tools using QWeb and Jinja templates in a Python environment.',
      ],
      technologies: ['React', 'styled-components', 'React Hook Form', 'MobX State Tree', 'Jest'],
    },
  ],
  earlier: [
    {
      id: 'sellbytel',
      role: 'Team Manager',
      company: 'Sellbytel Group',
      start: '2013',
      end: '2017',
      summary:
        'Managed a customer support team of twelve, organising shifts, holding one-to-ones and assigning customer enquiries.',
    },
  ],
  projects: [
    {
      id: 'blogram',
      name: 'Blogram',
      category: 'Web app · Open source',
      status: 'Open source on GitHub',
      tagline: 'A self-hosted journal for photos, videos and links',
      summary:
        'A personal journal you host on your own server and domain. Anyone can read, like and share posts without an account.',
      highlights: [
        'Built with Next.js, TypeScript, PostgreSQL and Drizzle, with sign-in through Better Auth.',
        'Supports photos, uploaded videos, YouTube, links and news, with drafts, previews and an optional place on each post.',
        'Stores media on the server or in S3-compatible storage such as Cloudflare R2, and runs on Railway or Docker Compose.',
        'Includes search, a monthly archive, a map of places, an RSS feed, share images and an English and Spanish interface.',
      ],
      technologies: [
        'Next.js',
        'TypeScript',
        'PostgreSQL',
        'Drizzle',
        'Better Auth',
        'Tailwind CSS',
        'Docker',
      ],
      link: {
        label: 'github.com/tiago-o-pinheiro/blogram',
        href: 'https://github.com/tiago-o-pinheiro/blogram',
      },
    },
    {
      id: 'tides',
      name: 'Tides',
      category: 'Android app · Closed source',
      status: 'Available on Google Play',
      tagline: 'A journal app I designed and built myself',
      summary:
        'A personal journal for writing and revisiting past entries. I designed the app, built it and published it on Google Play.',
      highlights: [
        'Built with React Native, Expo and TypeScript. Entries are stored on the device using SQLite.',
        'Designed the interface, typography and reusable components.',
        'Suggests past entries based on when they were written and the conditions around you.',
        'Handled closed testing and the Google Play release.',
      ],
      technologies: ['React Native', 'Expo', 'TypeScript', 'SQLite'],
      link: { label: 'tidesjournal.app', href: 'https://tidesjournal.app' },
    },
    {
      id: 'agents-workflow',
      name: 'agents-workflow',
      category: 'Claude Code plugin · Open source',
      status: 'Open source on GitHub',
      tagline: 'AI agents that plan, build and review code',
      summary:
        'A Claude Code plugin that splits development tasks between AI agents. I used it to build the starting point for this site.',
      highlights: [
        'Assigns agents to planning, coding, testing and review depending on the size of the task.',
        'Lets you choose a model for each agent to balance cost and response time.',
        'Stores reusable instructions and project rules for agents to follow across sessions.',
      ],
      technologies: ['Claude Code', 'Node.js'],
      link: {
        label: 'github.com/tiago-o-pinheiro/agents-workflow',
        href: 'https://github.com/tiago-o-pinheiro/agents-workflow',
      },
    },
  ],
  skills: [
    {
      id: 'frontend',
      label: 'Frontend',
      items: [
        'React',
        'Next.js',
        'React Native (Expo)',
        'React Hook Form',
        'Zustand',
        'MobX State Tree',
      ],
    },
    {
      id: 'languages',
      label: 'Languages',
      items: ['TypeScript', 'JavaScript (ESNext)', 'HTML', 'CSS', 'Python (basic)'],
    },
    {
      id: 'styling',
      label: 'Styling & design systems',
      items: [
        'Tailwind CSS',
        'styled-components',
        'SCSS',
        'Design tokens',
        'Responsive layouts, mobile first',
      ],
    },
    {
      id: 'testing',
      label: 'Testing',
      items: ['Jest', 'React Testing Library', 'Unit and component tests'],
    },
    {
      id: 'tooling',
      label: 'Development tools',
      items: ['Vite', 'Webpack', 'Turborepo', 'Git', 'GitHub Actions'],
    },
    {
      id: 'ai',
      label: 'AI tools',
      items: [
        'Claude Code',
        'Anthropic API',
        'Coordinating AI agents',
        'Reusable agent instructions',
        'Writing prompts',
      ],
    },
    {
      id: 'backend',
      label: 'Backend',
      items: ['Node.js', 'Express', 'Fastify', 'REST APIs', 'Prisma', 'MongoDB', 'SQLite'],
    },
    {
      id: 'workflow',
      label: 'Teamwork & design',
      items: ['Agile / Scrum', 'Figma', 'Prototyping', 'Code review', 'Jira'],
    },
  ],
  education: [
    {
      id: 'psychology',
      title: 'BSc in Psychology',
      status: 'in progress',
      institution: 'Universitat Oberta de Catalunya',
      period: 'expected 2030',
    },
    {
      id: 'react',
      title: 'Full-stack development with React',
      institution: 'Fundació Esplai',
      period: '2019',
    },
    {
      id: 'environmental',
      title: 'Environmental Science',
      institution: 'Institut la Guineueta',
      period: '2010 — 2012',
    },
  ],
  languages: [
    { id: 'es', name: 'Spanish', level: 'Native' },
    { id: 'pt', name: 'Portuguese', level: 'Native' },
    { id: 'en', name: 'English', level: 'Fluent, professional use' },
    { id: 'ca', name: 'Catalan', level: 'Fluent' },
  ],
}
