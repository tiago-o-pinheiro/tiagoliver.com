import { type Locale, type TranslationKey } from '@/i18n'

export const RESUME_SECTION_IDS = [
  'experience',
  'projects',
  'skills',
  'education',
  'about',
  'contact',
] as const
export type ResumeSectionId = (typeof RESUME_SECTION_IDS)[number]

export const isResumeSectionId = (value: string): value is ResumeSectionId =>
  RESUME_SECTION_IDS.some((id) => id === value)

export const SECTION_TITLE_KEYS: Readonly<Record<ResumeSectionId, TranslationKey>> = {
  experience: 'section.experience',
  projects: 'section.projects',
  skills: 'section.skills',
  education: 'section.education',
  about: 'section.about',
  contact: 'section.contact',
}

export const PAGE_PATHS = { home: '', resume: '/resume' } as const
export type PagePath = (typeof PAGE_PATHS)[keyof typeof PAGE_PATHS]

export const localizedHref = (locale: Locale, path: PagePath): string => `/${locale}${path}`

export const cvHref = (locale: string): string => `/${locale}/cv.pdf`

export const PROMPT_HOST = 'tiago@oliver'

export const SOURCE_URL = 'https://github.com/tiago-o-pinheiro/tiagoliver.com'
