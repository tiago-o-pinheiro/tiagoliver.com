import Link from 'next/link'

import { type Locale, type Translator } from '@/i18n'

import { CvDownloadLink } from './cv-download-link'
import { LanguageSwitch } from './language-switch'
import { MobileMenu } from './mobile-menu'
import { ThemeToggle } from './theme-toggle'
import { NAV_ENTRIES, type NavItem } from '../navigation'

type SiteHeaderProps = {
  locale: Locale
  name: string
  t: Translator
}

export const SiteHeader = ({ locale, name, t }: SiteHeaderProps) => {
  const items: readonly NavItem[] = NAV_ENTRIES.map((entry) => ({
    href: `#${entry.id}`,
    label: t(entry.labelKey),
  }))

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-2 px-4 sm:px-6">
        <Link
          href={`/${locale}`}
          aria-label={t('nav.home')}
          className="-ml-2 inline-flex min-h-11 items-center rounded-full px-2 font-semibold tracking-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {name}
        </Link>

        <nav aria-label={t('nav.label')} className="ml-6 hidden md:block">
          <ul className="flex items-center">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-full px-3 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <div className="hidden sm:block">
            <LanguageSwitch locale={locale} label={t('language.label')} />
          </div>
          <ThemeToggle toDarkLabel={t('theme.toDark')} toLightLabel={t('theme.toLight')} />
          <CvDownloadLink
            locale={locale}
            t={t}
            variant="outline"
            size="sm"
            className="ml-2 hidden md:inline-flex"
          />
          <div className="md:hidden">
            <MobileMenu
              items={items}
              title={t('menu.title')}
              openLabel={t('menu.open')}
              closeLabel={t('menu.close')}
            >
              <LanguageSwitch locale={locale} label={t('language.label')} />
              <CvDownloadLink locale={locale} t={t} />
            </MobileMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
