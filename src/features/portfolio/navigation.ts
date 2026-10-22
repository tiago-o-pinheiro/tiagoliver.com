import { type TranslationKey } from '@/i18n'

export const SECTION_IDS = {
  experience: 'experience',
  work: 'work',
  skills: 'skills',
  background: 'background',
  about: 'about',
  contact: 'contact',
} as const

export type NavItem = {
  href: string
  label: string
}

export const NAV_ENTRIES: readonly { id: string; labelKey: TranslationKey }[] = [
  { id: SECTION_IDS.experience, labelKey: 'nav.experience' },
  { id: SECTION_IDS.work, labelKey: 'nav.work' },
  { id: SECTION_IDS.about, labelKey: 'nav.about' },
  { id: SECTION_IDS.contact, labelKey: 'nav.contact' },
]

export const cvHref = (locale: string): string => `/${locale}/cv.pdf`

export const SOURCE_URL = 'https://github.com/tiago-o-pinheiro/tiagoliver.com'
