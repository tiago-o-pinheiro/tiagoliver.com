import { type Metadata } from 'next'
import { IBM_Plex_Mono, VT323 } from 'next/font/google'
import Link from 'next/link'

import { textLinkVariants } from '@/design-system/ui/text-link'
import { getTranslator, SUPPORTED_LOCALES } from '@/i18n'

import { THEME_INIT_SCRIPT } from '@/lib/theme'

import './globals.css'

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

export const metadata: Metadata = {
  title: 'Tiago Oliver — 404',
  robots: { index: false },
}

const GlobalNotFound = () => (
  <html lang="en" suppressHydrationWarning className={`${plexMono.variable} ${vt323.variable}`}>
    <head>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
    </head>
    <body className="min-h-dvh bg-background font-mono text-foreground antialiased selection:bg-foreground selection:text-background">
      <main className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center gap-12 px-4 py-16 sm:px-6">
        <p className="font-display text-7xl leading-display">404</p>
        <div className="grid gap-12 sm:grid-cols-2">
          {SUPPORTED_LOCALES.map((locale) => {
            const t = getTranslator(locale)
            return (
              <section
                key={locale}
                lang={locale}
                className="flex flex-col items-start gap-4 border-t border-foreground pt-6"
              >
                <h1 className="font-display text-4xl leading-display text-balance uppercase">
                  {t('notFound.title')}
                </h1>
                <p className="text-muted-foreground">{t('notFound.body')}</p>
                <Link
                  href={`/${locale}`}
                  hrefLang={locale}
                  className={textLinkVariants({ target: 'touch' })}
                >
                  <span aria-hidden="true">←&nbsp;</span>
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
