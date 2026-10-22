import { describe, expect, it } from 'vitest'

import { Models } from '@/models'

import { resumeService } from './resume.service'

const PHONE_NUMBER = /tel:|(?:\+|\b)\d(?:[\s.-]?\d){8,}/

const idsOf = (items: readonly { id: string }[]) => items.map((item) => item.id)

describe('ResumeService', () => {
  it.each(Models.LOCALES)('Given the %s locale, should return a valid resume', (locale) => {
    const resume = resumeService.getResume(locale)

    expect(Models.isResume(resume)).toBe(true)
  })

  it('Given both locales, should describe the same entries in the same order', () => {
    const english = resumeService.getResume('en')
    const spanish = resumeService.getResume('es')

    expect(idsOf(spanish.positions)).toEqual(idsOf(english.positions))
    expect(idsOf(spanish.earlier)).toEqual(idsOf(english.earlier))
    expect(idsOf(spanish.projects)).toEqual(idsOf(english.projects))
    expect(idsOf(spanish.skills)).toEqual(idsOf(english.skills))
    expect(idsOf(spanish.education)).toEqual(idsOf(english.education))
    expect(idsOf(spanish.languages)).toEqual(idsOf(english.languages))
  })

  it('Given both locales, should keep dates identical so the CVs never disagree', () => {
    const english = resumeService.getResume('en')
    const spanish = resumeService.getResume('es')

    expect(spanish.positions.map(({ start, end }) => [start, end])).toEqual(
      english.positions.map(({ start, end }) => [start, end]),
    )
  })

  it.each(Models.LOCALES)('Given the %s locale, should never publish a phone number', (locale) => {
    const resume = resumeService.getResume(locale)

    expect(JSON.stringify(resume)).not.toMatch(PHONE_NUMBER)
  })
})
