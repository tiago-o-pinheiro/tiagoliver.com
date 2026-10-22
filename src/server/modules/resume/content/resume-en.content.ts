import { type Models } from '@/models'

export const resumeEn: Models.Resume = {
  profile: {
    name: 'Tiago Oliver',
    role: 'Frontend Engineer — React / TypeScript',
    summary:
      'Frontend engineer with six years building production React and TypeScript interfaces. I turn Figma designs into reusable component libraries, move legacy codebases onto modern toolchains and work with product designers from wireframe to release. I also build multi-agent LLM workflows that speed this up without lowering code quality.',
    location: 'Barcelona, Spain',
    availability: 'Open to remote roles in CET',
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
      context: 'Inflight entertainment products used by airline passengers',
      start: '2023-03',
      end: null,
      highlights: [
        'Turn Figma designs into reusable React and TypeScript components, working closely with design and backend.',
        'Migrated a legacy CSS codebase to Tailwind CSS and a consistent design-token system.',
        'Moved JavaScript codebases to TypeScript with strict compiler checks that catch errors before release.',
        'Cover critical user flows with Jest unit and component tests to prevent regressions.',
        'Ship responsive, mobile-first interfaces in Agile squads, with code review on GitHub.',
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
        'Built reusable React components from Figma designs with styled-components.',
        'Implemented complex multi-step forms with React Hook Form and managed application state with MobX State Tree.',
        'Wrote Jest tests and took part in code review within an Agile team.',
        'Extended internal Odoo tooling with Python templating (QWeb, Jinja) where frontend work touched the ERP.',
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
        'Led a team of 12 in customer support: scheduling, one-to-ones and routing tickets by expertise.',
    },
  ],
  projects: [
    {
      id: 'tides',
      name: 'Tides',
      category: 'Product · Android · Closed source',
      status: 'Live on Google Play',
      tagline: 'Reflective journaling app, built solo',
      summary:
        'A reflective journaling app I designed, built and published on Google Play without a team.',
      highlights: [
        'React Native (Expo) and TypeScript with local-first SQLite storage.',
        'Designed the full interface, type scale and component system from scratch.',
        'Correlates entries with environmental and time-based data to resurface past entries that match present conditions.',
        'Took it through design, implementation, closed testing and store release.',
      ],
      technologies: ['React Native', 'Expo', 'TypeScript', 'SQLite'],
      link: { label: 'tidesjournal.app', href: 'https://tidesjournal.app' },
    },
    {
      id: 'agents-workflow',
      name: 'agents-workflow',
      category: 'Tooling · Claude Code plugin · Open source',
      status: 'Open source on GitHub',
      tagline: 'Multi-agent pipeline for Claude Code',
      summary:
        'A multi-agent development pipeline for Claude Code. This site was scaffolded with it.',
      highlights: [
        'Specialised agents for planning, coding, testing, QA, senior review and bug hunting, gated by task size.',
        'Per-agent model routing to control cost and latency.',
        'Reusable skills and convention rulesets keep agents on project standards across sessions.',
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
        'Responsive, mobile-first',
      ],
    },
    {
      id: 'testing',
      label: 'Testing',
      items: ['Jest', 'React Testing Library', 'Component and unit testing'],
    },
    {
      id: 'tooling',
      label: 'Build & tooling',
      items: ['Vite', 'Webpack', 'Turborepo', 'Git', 'GitHub Actions'],
    },
    {
      id: 'ai',
      label: 'AI & LLM tooling',
      items: [
        'Claude Code',
        'Anthropic API',
        'Multi-agent orchestration',
        'Agent skills',
        'Prompt design',
      ],
    },
    {
      id: 'backend',
      label: 'Backend',
      items: ['Node.js', 'Express', 'Fastify', 'REST APIs', 'Prisma', 'MongoDB', 'SQLite'],
    },
    {
      id: 'workflow',
      label: 'Workflow',
      items: ['Agile / Scrum', 'Figma', 'Prototyping', 'Code review', 'Jira'],
    },
  ],
  education: [
    {
      id: 'psychology',
      title: 'BSc Psychology',
      status: 'in progress',
      institution: 'Universitat Oberta de Catalunya',
      period: 'expected 2030',
    },
    {
      id: 'react',
      title: 'Full Stack React Developer',
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
    { id: 'en', name: 'English', level: 'Professional, fluent' },
    { id: 'ca', name: 'Catalan', level: 'Fluent' },
  ],
}
