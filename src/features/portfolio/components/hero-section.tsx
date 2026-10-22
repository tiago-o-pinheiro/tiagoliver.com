import { Mail } from 'lucide-react'

import { buttonVariants } from '@/design-system/ui/button'
import { type Locale, type Translator } from '@/i18n'
import { type Models } from '@/models'

import { CvDownloadLink } from './cv-download-link'
import { ProfileLinks } from './profile-links'

type HeroSectionProps = {
  locale: Locale
  profile: Models.Profile
  t: Translator
}

export const HeroSection = ({ locale, profile, t }: HeroSectionProps) => (
  <section aria-labelledby="hero-title" className="pt-16 pb-14 sm:pt-24 sm:pb-20">
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-label uppercase">
      <span className="text-foreground">{profile.name}</span>
      <span aria-hidden="true" className="h-px w-6 bg-border-strong" />
      <span className="text-muted-foreground">{t('hero.eyebrow')}</span>
    </p>
    <h1
      id="hero-title"
      className="mt-6 max-w-4xl text-4xl leading-display font-semibold tracking-display text-balance sm:text-5xl lg:text-6xl"
    >
      {t('hero.title')}
    </h1>
    <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">{t('hero.lead')}</p>
    <div className="mt-10 flex flex-wrap items-center gap-3">
      <CvDownloadLink locale={locale} t={t} size="lg" />
      <a href={profile.email.href} className={buttonVariants({ variant: 'outline', size: 'lg' })}>
        <Mail aria-hidden="true" className="size-4" />
        {t('hero.email')}
      </a>
      <ProfileLinks
        links={[
          { label: 'LinkedIn', href: profile.linkedin.href },
          { label: 'GitHub', href: profile.github.href },
        ]}
      />
    </div>
  </section>
)
