import { textLinkVariants } from '@/design-system/ui/text-link'
import { type Locale, type Translator } from '@/i18n'
import { type Models } from '@/models'

import { CvDownloadLink } from './cv-download-link'
import { ProfileLinks } from './profile-links'

type ContactEntryProps = {
  profile: Models.Profile
  locale: Locale
  t: Translator
}

export const ContactEntry = ({ profile, locale, t }: ContactEntryProps) => (
  <div className="flex flex-col gap-5">
    <p className="max-w-prose text-pretty">{t('contact.title')}</p>
    <a
      href={profile.email.href}
      className={textLinkVariants({ className: 'self-start text-lg break-all sm:text-xl' })}
    >
      {profile.email.label}
    </a>
    <ProfileLinks
      links={[
        { label: 'LinkedIn', href: profile.linkedin.href },
        { label: 'GitHub', href: profile.github.href },
      ]}
    />
    <CvDownloadLink locale={locale} t={t} variant="outline" className="self-start" />
  </div>
)
