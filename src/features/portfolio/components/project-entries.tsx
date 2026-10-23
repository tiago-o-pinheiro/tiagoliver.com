import { textLinkVariants } from '@/design-system/ui/text-link'
import { type Translator } from '@/i18n'
import { type Models } from '@/models'

import { BulletList } from './bullet-list'
import { FieldLine } from './field-line'
import { TechList } from './tech-list'

type ProjectEntriesProps = {
  projects: readonly Models.Project[]
  t: Translator
}

export const ProjectEntries = ({ projects, t }: ProjectEntriesProps) => (
  <ul className="flex flex-col gap-10">
    {projects.map((project) => (
      <li key={project.id}>
        <article className="flex flex-col gap-3">
          <header className="flex flex-col gap-1">
            <div className="flex flex-col gap-x-6 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-semibold">{project.name}</h3>
              <p className="text-sm text-muted-foreground">{project.status}</p>
            </div>
            <p className="text-sm text-muted-foreground">{project.category}</p>
          </header>
          <p className="max-w-prose text-pretty">{project.summary}</p>
          <BulletList items={project.highlights} />
          <TechList items={project.technologies} label={t('experience.stack')} />
          <FieldLine label={t('project.link')}>
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener"
              className={textLinkVariants({ className: 'break-words' })}
            >
              {project.link.label}
              <span aria-hidden="true">&nbsp;↗</span>
            </a>
          </FieldLine>
        </article>
      </li>
    ))}
  </ul>
)
