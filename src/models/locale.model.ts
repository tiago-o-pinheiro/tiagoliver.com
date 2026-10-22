import { Type, type Static } from 'typebox'
import { Value } from 'typebox/value'

export const LOCALES = ['en', 'es'] as const

export const Locale = Type.Union([Type.Literal('en'), Type.Literal('es')])
export type Locale = Static<typeof Locale>

export const isLocale = (value: unknown): value is Locale => Value.Check(Locale, value)
