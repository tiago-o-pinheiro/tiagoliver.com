import { type Metadata } from 'next'
import { IBM_Plex_Mono, VT323 } from 'next/font/google'
import { notFound } from 'next/navigation'
import { type ReactNode } from 'react'

import { getTranslator, isLocale, OPEN_GRAPH_LOCALES, SUPPORTED_LOCALES } from '@/i18n'

import { THEME_INIT_SCRIPT } from '@/lib/theme'
import { env } from '@/server/config/env'

import '../globals.css'

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
})
const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-vt323',
  display: 'swap',
})

type LocaleParams = {
  params: Promise<{ locale: string }>
}

type LocaleLayoutProps = LocaleParams & {
  children: ReactNode
}

export const dynamicParams = false

export const generateStaticParams = () => SUPPORTED_LOCALES.map((locale) => ({ locale }))

export const generateMetadata = async ({ params }: LocaleParams): Promise<Metadata> => {
  const { locale } = await params
  if (!isLocale(locale)) {
    return {}
  }
  const t = getTranslator(locale)
  const title = t('meta.title')
  const description = t('meta.description')
  return {
    metadataBase: new URL(env.SITE_URL),
    title,
    description,
    authors: [{ name: 'Tiago Oliver', url: env.SITE_URL }],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(SUPPORTED_LOCALES.map((code) => [code, `/${code}`])),
        'x-default': '/en',
      },
    },
    openGraph: {
      type: 'profile',
      url: `/${locale}`,
      siteName: 'Tiago Oliver',
      title,
      description,
      locale: OPEN_GRAPH_LOCALES[locale],
      firstName: 'Tiago',
      lastName: 'Oliver',
    },
    twitter: { card: 'summary', title, description },
  }
}

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params
  if (!isLocale(locale)) {
    notFound()
  }

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${plexMono.variable} ${vt323.variable} motion-safe:scroll-smooth`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-dvh bg-background font-mono text-foreground antialiased selection:bg-foreground selection:text-background">
        <a
          href="#main"
          className="sr-only border border-background bg-foreground px-4 py-3 font-medium text-background focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
        >
          {getTranslator(locale)('nav.skip')}
        </a>
        {children}
      </body>
    </html>
  )
}

export default LocaleLayout
