import { type ReactNode } from 'react'

import { textLinkVariants } from '@/design-system/ui/text-link'
import { type Locale, type Translator } from '@/i18n'
import { type Models } from '@/models'

import { startYearOf } from '@/lib/format-period'

import { cvHref } from '../navigation'

type ProfileFactsProps = {
  resume: Models.Resume
  locale: Locale
  t: Translator
}

type FactProps = {
  label: string
  children: ReactNode
}

const LINK = textLinkVariants()

const Fact = ({ label, children }: FactProps) => (
  <div className="flex gap-3">
    <dt className="w-24 shrink-0 text-muted-foreground">{label}</dt>
    <dd className="min-w-0 text-pretty">{children}</dd>
  </div>
)

const Separator = () => <span aria-hidden="true"> · </span>

export const ProfileFacts = ({ resume, locale, t }: ProfileFactsProps) => {
  const { profile, positions, projects } = resume
  const [current] = positions

  return (
    <dl className="flex flex-col gap-1.5 text-sm sm:text-base">
      <Fact label={t('profile.role')}>{profile.role}</Fact>
      {current ? (
        <Fact label={t('profile.now')}>
          {t('profile.current', {
            role: current.role,
            company: current.company,
            year: startYearOf(current.start),
          })}
        </Fact>
      ) : null}
      <Fact label={t('profile.based')}>
        {profile.location}
        <Separator />
        {profile.citizenship}
      </Fact>
      <Fact label={t('profile.status')}>{profile.availability}</Fact>
      {projects.length > 0 ? (
        <Fact label={t('profile.projects')}>
          {projects.map((project, index) => (
            <span key={project.id}>
              {index > 0 ? <Separator /> : null}
              <a href={project.link.href} target="_blank" rel="noopener" className={LINK}>
                {project.name}
              </a>
              <span className="text-muted-foreground"> ({project.status})</span>
            </span>
          ))}
        </Fact>
      ) : null}
      <Fact label={t('profile.links')}>
        <a href={profile.github.href} target="_blank" rel="me noopener" className={LINK}>
          github
        </a>
        <Separator />
        <a href={profile.linkedin.href} target="_blank" rel="me noopener" className={LINK}>
          linkedin
        </a>
        <Separator />
        <a href={profile.email.href} className={LINK}>
          {t('profile.email')}
        </a>
        <Separator />
        <a
          href={cvHref(locale)}
          download={t('cv.fileName')}
          type="application/pdf"
          className={LINK}
        >
          cv.pdf
        </a>
      </Fact>
    </dl>
  )
}
