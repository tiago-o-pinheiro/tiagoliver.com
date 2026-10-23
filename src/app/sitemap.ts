import { type MetadataRoute } from 'next'

import { DEFAULT_LOCALE, type Locale, SUPPORTED_LOCALES } from '@/i18n'

import { localizedHref, PAGE_PATHS, type PagePath } from '@/features/portfolio/navigation'
import { env } from '@/server/config/env'

const pageUrl = (locale: Locale, path: PagePath) => `${env.SITE_URL}${localizedHref(locale, path)}`

const sitemap = (): MetadataRoute.Sitemap =>
  Object.values(PAGE_PATHS).flatMap((path) =>
    SUPPORTED_LOCALES.map((locale) => ({
      url: pageUrl(locale, path),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: locale === DEFAULT_LOCALE && path === PAGE_PATHS.home ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(SUPPORTED_LOCALES.map((code) => [code, pageUrl(code, path)])),
      },
    })),
  )

export default sitemap
