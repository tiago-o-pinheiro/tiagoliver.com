import { type MetadataRoute } from 'next'

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/i18n'

import { env } from '@/server/config/env'

const localeUrl = (locale: string) => `${env.SITE_URL}/${locale}`

const sitemap = (): MetadataRoute.Sitemap =>
  SUPPORTED_LOCALES.map((locale) => ({
    url: localeUrl(locale),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: locale === DEFAULT_LOCALE ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(SUPPORTED_LOCALES.map((code) => [code, localeUrl(code)])),
    },
  }))

export default sitemap
