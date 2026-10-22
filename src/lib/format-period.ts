import { type Models } from '@/models'

export const PERIOD_STYLES = ['year', 'month'] as const
export type PeriodStyle = (typeof PERIOD_STYLES)[number]

type FormatPeriodOptions = {
  start: Models.YearMonth
  end: Models.YearMonth | null
  locale: Models.Locale
  presentLabel: string
  style: PeriodStyle
}

const PERIOD_SEPARATOR = ' — '

const formatYearMonth = (value: Models.YearMonth, locale: Models.Locale, style: PeriodStyle) => {
  const [year, month] = value.split('-')
  if (style === 'year' || !month) {
    return year ?? value
  }
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1))
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(date)
    .replace('.', '')
}

export const formatPeriod = ({ start, end, locale, presentLabel, style }: FormatPeriodOptions) =>
  [
    formatYearMonth(start, locale, style),
    end === null ? presentLabel : formatYearMonth(end, locale, style),
  ].join(PERIOD_SEPARATOR)

export const startYearOf = (value: Models.YearMonth) => value.slice(0, 4)
