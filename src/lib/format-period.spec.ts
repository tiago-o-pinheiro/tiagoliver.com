import { describe, expect, it } from 'vitest'

import { formatPeriod, startYearOf } from './format-period'

describe('formatPeriod', () => {
  it('Given the year style, should show only years', () => {
    const period = formatPeriod({
      start: '2019-06',
      end: '2022-02',
      locale: 'en',
      presentLabel: '::present::',
      style: 'year',
    })

    expect(period).toBe('2019 — 2022')
  })

  it('Given an open-ended role, should end with the present label', () => {
    const period = formatPeriod({
      start: '2023-03',
      end: null,
      locale: 'en',
      presentLabel: '::present::',
      style: 'year',
    })

    expect(period).toBe('2023 — ::present::')
  })

  it.each([
    ['en', 'Mar 2023'],
    ['es', 'mar 2023'],
  ] as const)('Given the month style in %s, should show a short month', (locale, expected) => {
    const period = formatPeriod({
      start: '2023-03',
      end: null,
      locale,
      presentLabel: '::present::',
      style: 'month',
    })

    expect(period).toBe(`${expected} — ::present::`)
  })

  it('Given a year-only date in month style, should keep the year', () => {
    const period = formatPeriod({
      start: '2013',
      end: '2017',
      locale: 'en',
      presentLabel: '::present::',
      style: 'month',
    })

    expect(period).toBe('2013 — 2017')
  })
})

describe('startYearOf', () => {
  it('Given a year and month, should return the year', () => {
    expect(startYearOf('2023-03')).toBe('2023')
  })
})
