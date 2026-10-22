import { type Locale, type Translator } from '@/i18n'
import { type Models } from '@/models'

import { CvDownloadLink } from './cv-download-link'
import { ProfileLinks } from './profile-links'
import { SectionFrame } from './section-frame'
import { SECTION_IDS } from '../navigation'

type ContactSectionProps = {
  index: number
  locale: Locale
  profile: Models.Profile
  t: Translator
}

export const ContactSection = ({ index, locale, profile, t }: ContactSectionProps) => (
  <SectionFrame id={SECTION_IDS.contact} index={index} title={t('section.contact')}>
    <div className="flex flex-col gap-8">
      <p className="max-w-2xl text-3xl leading-tight font-semibold tracking-heading text-balance sm:text-4xl">
        {t('contact.title')}
      </p>
      <a
        href={profile.email.href}
        className="self-start text-xl font-medium break-all text-primary underline decoration-border-strong underline-offset-8 transition-colors hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:text-2xl"
      >
        {profile.email.label}
      </a>
      <div className="flex flex-wrap items-center gap-3">
        <CvDownloadLink locale={locale} t={t} />
        <ProfileLinks
          links={[
            { label: 'LinkedIn', href: profile.linkedin.href },
            { label: 'GitHub', href: profile.github.href },
          ]}
        />
      </div>
    </div>
  </SectionFrame>
)
