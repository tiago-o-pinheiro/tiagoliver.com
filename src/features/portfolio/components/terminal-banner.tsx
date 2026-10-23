import { buttonVariants } from '@/design-system/ui/button'
import { type Locale, type Translator } from '@/i18n'
import { type Models } from '@/models'

import { PixelMonogram } from './pixel-monogram'
import { ProfileFacts } from './profile-facts'
import { localizedHref, PAGE_PATHS } from '../navigation'

type TerminalBannerProps = {
  resume: Models.Resume
  locale: Locale
  t: Translator
}

export const TerminalBanner = ({ resume, locale, t }: TerminalBannerProps) => (
  <section aria-labelledby="profile-title" className="flex flex-col gap-6 py-8">
    <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
      <PixelMonogram />
      <div className="flex min-w-0 flex-col gap-4">
        <h1 id="profile-title" className="font-display text-5xl leading-display sm:text-6xl">
          {resume.profile.name}
        </h1>
        <ProfileFacts resume={resume} locale={locale} t={t} />
      </div>
    </div>
    <p className="max-w-prose text-pretty">{resume.profile.summary}</p>
    <a
      href={localizedHref(locale, PAGE_PATHS.resume)}
      className={buttonVariants({ variant: 'primary', size: 'lg', className: 'self-start' })}
    >
      {t('resume.view')}
      <span aria-hidden="true">→</span>
    </a>
  </section>
)
