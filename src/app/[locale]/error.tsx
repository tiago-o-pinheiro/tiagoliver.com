'use client'

import { useParams } from 'next/navigation'

import { Button } from '@/design-system/ui/button'
import { DEFAULT_LOCALE, getTranslator, isLocale } from '@/i18n'

type ErrorPageProps = {
  reset: () => void
}

const ErrorPage = ({ reset }: ErrorPageProps) => {
  const locale = useParams<{ locale?: string }>()?.locale
  const t = getTranslator(isLocale(locale) ? locale : DEFAULT_LOCALE)

  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col items-start justify-center gap-4 p-6">
      <h1 className="text-2xl font-semibold tracking-heading">{t('errors.title')}</h1>
      <p className="text-muted-foreground">{t('errors.body')}</p>
      <Button onClick={reset}>{t('common.retry')}</Button>
    </main>
  )
}

export default ErrorPage
