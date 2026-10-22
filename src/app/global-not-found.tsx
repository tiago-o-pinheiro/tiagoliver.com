import { type Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'

import { getTranslator, SUPPORTED_LOCALES } from '@/i18n'

import { THEME_INIT_SCRIPT } from '@/lib/theme'

import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

export const metadata: Metadata = {
  title: 'Tiago Oliver — 404',
  robots: { index: false },
}

const GlobalNotFound = () => (
  <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable}`}>
    <head>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
    </head>
    <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
      <main className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center gap-12 px-4 py-16 sm:px-6">
        <p className="font-mono text-xs tracking-label text-muted-foreground uppercase">404</p>
        <div className="grid gap-12 sm:grid-cols-2">
          {SUPPORTED_LOCALES.map((locale) => {
            const t = getTranslator(locale)
            return (
              <section
                key={locale}
                lang={locale}
                className="flex flex-col items-start gap-4 border-t border-border pt-6"
              >
                <h1 className="text-2xl font-semibold tracking-heading text-balance">
                  {t('notFound.title')}
                </h1>
                <p className="text-muted-foreground">{t('notFound.body')}</p>
                <Link
                  href={`/${locale}`}
                  hrefLang={locale}
                  className="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {t('notFound.home')}
                </Link>
              </section>
            )
          })}
        </div>
      </main>
    </body>
  </html>
)

export default GlobalNotFound
