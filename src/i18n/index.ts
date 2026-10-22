import { Models } from '@/models'

import en from './en.json'
import es from './es.json'
import { createTranslator } from './translator'

export type TranslationKey = keyof typeof en

export type Locale = Models.Locale

export const SUPPORTED_LOCALES = Models.LOCALES

export const DEFAULT_LOCALE: Locale = 'en'

export const isLocale = Models.isLocale

export const LOCALE_NAMES: Readonly<Record<Locale, string>> = { en: 'English', es: 'Español' }

export const OPEN_GRAPH_LOCALES: Readonly<Record<Locale, string>> = { en: 'en_US', es: 'es_ES' }

const MESSAGES = { en, es } satisfies Record<Locale, Readonly<Record<TranslationKey, string>>>

export type Translator = ReturnType<typeof createTranslator<TranslationKey>>

export const getTranslator = (locale: Locale): Translator =>
  createTranslator<TranslationKey>(MESSAGES[locale])

export const t = getTranslator(DEFAULT_LOCALE)

export { createTranslator } from './translator'
export type { Variables } from './translator'
