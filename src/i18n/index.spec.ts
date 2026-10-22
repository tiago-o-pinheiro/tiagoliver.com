import { describe, expect, it } from 'vitest'

import en from './en.json'
import es from './es.json'
import { getTranslator, isLocale, t } from './index'

describe('i18n', () => {
  it('Given a known key, should return the english message', () => {
    expect(t('common.retry')).toBe('Retry')
  })

  it('Given the spanish locale, should return the spanish message', () => {
    expect(getTranslator('es')('common.retry')).toBe('Reintentar')
  })

  it('Given both message files, should define exactly the same keys', () => {
    expect(Object.keys(es).sort()).toEqual(Object.keys(en).sort())
  })

  it.each(['en', 'es'])('Given the supported locale %s, should accept it', (locale) => {
    expect(isLocale(locale)).toBe(true)
  })

  it('Given an unsupported value, should reject it', () => {
    expect(isLocale('xx')).toBe(false)
    expect(isLocale(undefined)).toBe(false)
  })
})
