import { ArrowUpRight } from 'lucide-react'
import { type ReactNode } from 'react'

import { type Translator } from '@/i18n'
import { type Models } from '@/models'

import { startYearOf } from '@/lib/format-period'

type ProofSectionProps = {
  resume: Models.Resume
  t: Translator
}

type ProofItemProps = {
  label: string
  children: ReactNode
}

const ProofItem = ({ label, children }: ProofItemProps) => (
  <div className="flex flex-col gap-2 border-t border-border pt-4">
    <dt className="font-mono text-xs tracking-label text-muted-foreground uppercase">{label}</dt>
    <dd className="flex flex-col gap-1">{children}</dd>
  </div>
)

export const ProofSection = ({ resume, t }: ProofSectionProps) => {
  const { profile, positions, projects } = resume
  const [current] = positions

  return (
    <section aria-label={t('proof.label')} className="pb-10 sm:pb-14">
      <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        {current ? (
          <ProofItem label={t('proof.current')}>
            <span className="font-medium">
              {current.role} · {current.company}
            </span>
            <span className="text-sm text-muted-foreground">
              {t('proof.since', { year: startYearOf(current.start) })}
            </span>
          </ProofItem>
        ) : null}
        {projects.map((project) => (
          <ProofItem key={project.id} label={project.status}>
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-1 self-start font-medium transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {project.name}
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </a>
            <span className="text-sm text-muted-foreground">{project.tagline}</span>
          </ProofItem>
        ))}
        <ProofItem label={t('proof.base')}>
          <span className="font-medium">{profile.location}</span>
          <span className="text-sm text-muted-foreground">
            {profile.citizenship} · {profile.availability}
          </span>
        </ProofItem>
      </dl>
    </section>
  )
}
