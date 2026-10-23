import Link from 'next/link'

import { textLinkVariants } from '@/design-system/ui/text-link'
import { type Locale, type Translator } from '@/i18n'
import { type Models } from '@/models'

import { CvDownloadLink } from './cv-download-link'
import { ProfileFacts } from './profile-facts'
import { localizedHref, PAGE_PATHS } from '../navigation'

type ResumeHeaderProps = {
  resume: Models.Resume
  locale: Locale
  t: Translator
}

export const ResumeHeader = ({ resume, locale, t }: ResumeHeaderProps) => (
  <header className="flex flex-col gap-6 pt-4 pb-8">
    <Link
      href={localizedHref(locale, PAGE_PATHS.home)}
      className={textLinkVariants({ tone: 'muted', target: 'touch', className: 'self-start' })}
    >
      <span aria-hidden="true">←&nbsp;</span>
      {t('nav.back')}
    </Link>
    <h1 className="font-display text-5xl leading-display sm:text-7xl">{resume.profile.name}</h1>
    <ProfileFacts resume={resume} locale={locale} t={t} />
    <p className="max-w-prose text-pretty">{resume.profile.summary}</p>
    <CvDownloadLink locale={locale} t={t} size="lg" className="self-start" />
  </header>
)
