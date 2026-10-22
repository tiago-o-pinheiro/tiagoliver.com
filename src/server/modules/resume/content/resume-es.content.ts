import { type Models } from '@/models'

export const resumeEs: Models.Resume = {
  profile: {
    name: 'Tiago Oliver',
    role: 'Desarrollador frontend — React y TypeScript',
    summary:
      'Soy desarrollador frontend con seis años de experiencia en React y TypeScript. Trabajo con equipos de diseño y backend para convertir diseños de Figma en interfaces web, crear componentes reutilizables y actualizar código antiguo. También desarrollo aplicaciones propias y herramientas con agentes de IA.',
    location: 'Barcelona, España',
    availability: 'Disponible en remoto, horario europeo',
    citizenship: 'Ciudadano de la UE',
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
      role: 'Desarrollador frontend',
      company: 'Immfly',
      location: 'Barcelona, España',
      context: 'Sistemas de entretenimiento a bordo de aviones',
      start: '2023-03',
      end: null,
      highlights: [
        'Creo componentes reutilizables de React y TypeScript a partir de Figma, junto con los equipos de diseño y backend.',
        'Sustituí los estilos CSS antiguos por Tailwind CSS, con colores, espaciados y tipografía definidos en tokens de diseño.',
        'Migré código de JavaScript a TypeScript con comprobaciones estrictas para detectar errores antes de publicar.',
        'Escribo pruebas unitarias y de componentes con Jest para comprobar los recorridos más importantes de la aplicación.',
        'Desarrollo las interfaces primero para móvil y las adapto a pantallas más grandes. Reviso código con el equipo en GitHub.',
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'styled-components', 'SCSS', 'Jest'],
    },
    {
      id: 'qida',
      role: 'Desarrollador frontend',
      company: 'Qida Home Care',
      location: 'Barcelona, España',
      context: 'Plataforma de atención domiciliaria',
      start: '2019-06',
      end: '2022-02',
      highlights: [
        'Creé componentes reutilizables de React con styled-components a partir de los diseños de Figma.',
        'Desarrollé formularios de varios pasos con React Hook Form y gestioné el estado de la aplicación con MobX State Tree.',
        'Escribí pruebas con Jest y participé en las revisiones de código del equipo.',
        'Amplié herramientas internas de Odoo con plantillas QWeb y Jinja en el entorno de Python.',
      ],
      technologies: ['React', 'styled-components', 'React Hook Form', 'MobX State Tree', 'Jest'],
    },
  ],
  earlier: [
    {
      id: 'sellbytel',
      role: 'Responsable de equipo',
      company: 'Sellbytel Group',
      start: '2013',
      end: '2017',
      summary:
        'Coordiné un equipo de doce personas en atención al cliente: turnos, seguimiento individual y reparto de consultas.',
    },
  ],
  projects: [
    {
      id: 'tides',
      name: 'Tides',
      category: 'Aplicación para Android · Código cerrado',
      status: 'Disponible en Google Play',
      tagline: 'Un diario que diseñé y desarrollé por mi cuenta',
      summary:
        'Un diario para escribir y volver a tus recuerdos. Me encargué del diseño, el desarrollo y la publicación en Google Play.',
      highlights: [
        'Desarrollada con React Native, Expo y TypeScript. Las entradas se guardan en el dispositivo con SQLite.',
        'Diseñé la interfaz, la tipografía y los componentes de la aplicación.',
        'Sugiere entradas anteriores según cuándo se escribieron y las condiciones del entorno.',
        'Preparé las pruebas cerradas y la publicación en Google Play.',
      ],
      technologies: ['React Native', 'Expo', 'TypeScript', 'SQLite'],
      link: { label: 'tidesjournal.app', href: 'https://tidesjournal.app' },
    },
    {
      id: 'agents-workflow',
      name: 'agents-workflow',
      category: 'Plugin para Claude Code · Código abierto',
      status: 'Código abierto en GitHub',
      tagline: 'Agentes de IA para organizar el desarrollo',
      summary:
        'Plugin de Claude Code que organiza tareas entre agentes de IA. Lo usé para crear la base de esta web.',
      highlights: [
        'Asigna agentes para planificar, programar, probar y revisar el código según el tamaño de la tarea.',
        'Permite elegir el modelo de cada agente para ajustar el coste y el tiempo de respuesta.',
        'Guarda instrucciones y reglas del proyecto para que los agentes puedan seguirlas en cada sesión.',
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
        'Diseño adaptable, primero para móvil',
      ],
    },
    {
      id: 'testing',
      label: 'Pruebas',
      items: ['Jest', 'React Testing Library', 'Pruebas unitarias y de componentes'],
    },
    {
      id: 'tooling',
      label: 'Herramientas de desarrollo',
      items: ['Vite', 'Webpack', 'Turborepo', 'Git', 'GitHub Actions'],
    },
    {
      id: 'ai',
      label: 'Herramientas de IA',
      items: [
        'Claude Code',
        'Anthropic API',
        'Coordinación de agentes',
        'Instrucciones reutilizables para agentes',
        'Redacción de prompts',
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
      items: ['Agile / Scrum', 'Figma', 'Prototipado', 'Revisión de código', 'Jira'],
    },
  ],
  education: [
    {
      id: 'psychology',
      title: 'Grado en Psicología',
      status: 'en curso',
      institution: 'Universitat Oberta de Catalunya',
      period: 'finalización prevista en 2030',
    },
    {
      id: 'react',
      title: 'Desarrollo full stack con React',
      institution: 'Fundació Esplai',
      period: '2019',
    },
    {
      id: 'environmental',
      title: 'Ciencias Ambientales',
      institution: 'Institut la Guineueta',
      period: '2010 — 2012',
    },
  ],
  languages: [
    { id: 'es', name: 'Español', level: 'Nativo' },
    { id: 'pt', name: 'Portugués', level: 'Nativo' },
    { id: 'en', name: 'Inglés', level: 'Fluido, uso profesional' },
    { id: 'ca', name: 'Catalán', level: 'Fluido' },
  ],
}
