import { ArrowUpRight } from 'lucide-react'

import { type Translator } from '@/i18n'
import { type Models } from '@/models'

import { SectionFrame } from './section-frame'
import { TechList } from './tech-list'
import { SECTION_IDS } from '../navigation'

type WorkSectionProps = {
  index: number
  projects: readonly Models.Project[]
  t: Translator
}

export const WorkSection = ({ index, projects, t }: WorkSectionProps) => (
  <SectionFrame id={SECTION_IDS.work} index={index} title={t('section.work')}>
    <ul className="flex flex-col gap-6">
      {projects.map((project) => (
        <li key={project.id}>
          <article className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 sm:p-8">
            <header className="flex flex-col gap-3">
              <p className="font-mono text-xs tracking-label text-muted-foreground uppercase">
                {project.category}
              </p>
              <h3 className="text-2xl font-semibold tracking-heading">{project.name}</h3>
              <p className="text-pretty text-muted-foreground">{project.summary}</p>
            </header>
            <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-pretty marker:text-border-strong">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <TechList items={project.technologies} label={t('experience.technologies')} />
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener"
              className="group inline-flex min-h-11 items-center gap-1 self-start text-sm font-medium break-words text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {project.link.label}
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </a>
          </article>
        </li>
      ))}
    </ul>
  </SectionFrame>
)
