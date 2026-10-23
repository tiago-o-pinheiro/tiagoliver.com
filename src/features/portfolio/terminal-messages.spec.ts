import { describe, expect, it } from 'vitest'

import { getTranslator } from '@/i18n'

import { describeResult } from './terminal-messages'

const en = getTranslator('en')
const es = getTranslator('es')

describe('describeResult', () => {
  it('Given an unknown command in spanish, should explain it naturally', () => {
    expect(describeResult({ kind: 'unknown', command: 'foo' }, es)).toBe(
      'No conozco el comando «foo». Escribe / para ver los comandos.',
    )
  })

  it('Given a section, should name it in the visitor language', () => {
    expect(describeResult({ kind: 'section', section: 'education' }, es)).toBe(
      'Se muestra: Formación e idiomas.',
    )
  })

  it('Given a theme change, should name the new theme', () => {
    expect(describeResult({ kind: 'theme', theme: 'dark' }, en)).toBe('Theme set to dark.')
  })

  it('Given a language change, should name the target language', () => {
    expect(describeResult({ kind: 'lang', locale: 'es' }, en)).toBe('Switching to Español…')
  })

  it('Given a download, should name the file that is downloading', () => {
    expect(describeResult({ kind: 'download' }, en)).toBe('Downloading Tiago-Oliver-CV-EN.pdf.')
  })
})
