import { type Models } from '@/models'

export const resumeEs: Models.Resume = {
  profile: {
    name: 'Tiago Oliver',
    role: 'Frontend Engineer — React / TypeScript',
    summary:
      'Seis años construyendo interfaces en producción con React y TypeScript. Convierto diseños de Figma en librerías de componentes reutilizables, modernizo código heredado y trabajo con diseño de producto del wireframe al lanzamiento. También creo flujos multiagente con LLM que aceleran el trabajo sin rebajar la calidad.',
    location: 'Barcelona, España',
    availability: 'Disponible para remoto en horario CET',
    citizenship: 'Ciudadanía UE',
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
      location: 'Barcelona, España',
      context: 'Productos de entretenimiento a bordo para pasajeros de aerolíneas',
      start: '2023-03',
      end: null,
      highlights: [
        'Convierto diseños de Figma en componentes reutilizables de React y TypeScript, junto a diseño y backend.',
        'Migré un código CSS heredado a Tailwind CSS y a un sistema coherente de tokens de diseño.',
        'Migré código JavaScript a TypeScript con comprobaciones estrictas que detectan errores antes de cada release.',
        'Cubro los flujos críticos con tests unitarios y de componentes en Jest para evitar regresiones.',
        'Entrego interfaces responsive y mobile-first en squads ágiles, con code review en GitHub.',
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'styled-components', 'SCSS', 'Jest'],
    },
    {
      id: 'qida',
      role: 'Frontend Developer',
      company: 'Qida Home Care',
      location: 'Barcelona, España',
      context: 'Plataforma de servicios de cuidado a domicilio',
      start: '2019-06',
      end: '2022-02',
      highlights: [
        'Construí componentes reutilizables en React a partir de diseños de Figma con styled-components.',
        'Implementé formularios complejos de varios pasos con React Hook Form y gestioné el estado con MobX State Tree.',
        'Escribí tests con Jest y participé en code review dentro de un equipo ágil.',
        'Amplié herramientas internas de Odoo con plantillas en Python (QWeb, Jinja) cuando el frontend tocaba el ERP.',
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
        'Coordiné un equipo de 12 personas en atención al cliente: turnos, reuniones individuales y reparto de tickets.',
    },
  ],
  projects: [
    {
      id: 'tides',
      name: 'Tides',
      category: 'Producto · Android · Código cerrado',
      status: 'Publicada en Google Play',
      tagline: 'App de diario reflexivo, hecha sin equipo',
      summary:
        'Una app de diario reflexivo que diseñé, desarrollé y publiqué en Google Play sin equipo.',
      highlights: [
        'React Native (Expo) y TypeScript con almacenamiento local-first en SQLite.',
        'Diseño completo de la interfaz, la escala tipográfica y el sistema de componentes.',
        'Relaciona las entradas con datos ambientales y temporales para recuperar entradas pasadas que encajan con el momento presente.',
        'Llevada desde el diseño y la implementación hasta las pruebas cerradas y la publicación en la tienda.',
      ],
      technologies: ['React Native', 'Expo', 'TypeScript', 'SQLite'],
      link: { label: 'tidesjournal.app', href: 'https://tidesjournal.app' },
    },
    {
      id: 'agents-workflow',
      name: 'agents-workflow',
      category: 'Herramientas · Plugin de Claude Code · Código abierto',
      status: 'Código abierto en GitHub',
      tagline: 'Pipeline multiagente para Claude Code',
      summary: 'Un pipeline de desarrollo multiagente para Claude Code. Esta web se creó con él.',
      highlights: [
        'Agentes especializados en planificación, código, tests, QA, revisión senior y caza de bugs, según el tamaño de la tarea.',
        'Enrutado de modelos por agente para controlar coste y latencia.',
        'Skills reutilizables y reglas de convenciones para que los agentes respeten los estándares del proyecto entre sesiones.',
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
      label: 'Lenguajes',
      items: ['TypeScript', 'JavaScript (ESNext)', 'HTML', 'CSS', 'Python (básico)'],
    },
    {
      id: 'styling',
      label: 'Estilos y sistemas de diseño',
      items: [
        'Tailwind CSS',
        'styled-components',
        'SCSS',
        'Tokens de diseño',
        'Responsive, mobile-first',
      ],
    },
    {
      id: 'testing',
      label: 'Testing',
      items: ['Jest', 'React Testing Library', 'Tests unitarios y de componentes'],
    },
    {
      id: 'tooling',
      label: 'Build y herramientas',
      items: ['Vite', 'Webpack', 'Turborepo', 'Git', 'GitHub Actions'],
    },
    {
      id: 'ai',
      label: 'IA y LLM',
      items: [
        'Claude Code',
        'Anthropic API',
        'Orquestación multiagente',
        'Skills de agentes',
        'Diseño de prompts',
      ],
    },
    {
      id: 'backend',
      label: 'Backend',
      items: ['Node.js', 'Express', 'Fastify', 'APIs REST', 'Prisma', 'MongoDB', 'SQLite'],
    },
    {
      id: 'workflow',
      label: 'Forma de trabajo',
      items: ['Agile / Scrum', 'Figma', 'Prototipado', 'Code review', 'Jira'],
    },
  ],
  education: [
    {
      id: 'psychology',
      title: 'Grado en Psicología',
      status: 'en curso',
      institution: 'Universitat Oberta de Catalunya',
      period: 'previsto 2030',
    },
    {
      id: 'react',
      title: 'Desarrollo Full Stack con React',
      institution: 'Fundació Esplai',
      period: '2019',
    },
    {
      id: 'environmental',
      title: 'Ciencias ambientales',
      institution: 'Institut la Guineueta',
      period: '2010 — 2012',
    },
  ],
  languages: [
    { id: 'es', name: 'Español', level: 'Nativo' },
    { id: 'pt', name: 'Portugués', level: 'Nativo' },
    { id: 'en', name: 'Inglés', level: 'Profesional, fluido' },
    { id: 'ca', name: 'Catalán', level: 'Fluido' },
  ],
}
