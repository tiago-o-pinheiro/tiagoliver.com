import { type Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { type ReactNode } from 'react'

import { getTranslator, isLocale, OPEN_GRAPH_LOCALES, SUPPORTED_LOCALES } from '@/i18n'

import { THEME_INIT_SCRIPT } from '@/lib/theme'
import { env } from '@/server/config/env'

import '../globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

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
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} motion-safe:scroll-smooth`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <a
          href="#main"
          className="sr-only rounded-full bg-primary px-4 py-3 font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
        >
          {getTranslator(locale)('nav.skip')}
        </a>
        {children}
      </body>
    </html>
  )
}

export default LocaleLayout
