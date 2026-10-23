import { type ReactNode } from 'react'

import { type Locale, type Translator } from '@/i18n'

import { LanguageSwitch } from './language-switch'
import { SiteFooter } from './site-footer'
import { ThemeToggle } from './theme-toggle'
import { PAGE_PATHS, type PagePath, PROMPT_HOST } from '../navigation'

type TerminalWindowProps = {
  locale: Locale
  path: PagePath
  t: Translator
  children: ReactNode
}

export const TerminalWindow = ({ locale, path, t, children }: TerminalWindowProps) => (
  <div className="mx-auto flex min-h-dvh max-w-5xl flex-col px-4 pt-4 sm:px-6 sm:pt-8">
    <div className="flex flex-1 flex-col border border-foreground">
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-foreground px-4 py-2 sm:px-6">
        <p className="text-sm">
          <span className="hidden sm:inline">{PROMPT_HOST}:</span>~
          {path === PAGE_PATHS.home ? '' : path}
        </p>
        <div className="flex items-center gap-2">
          <LanguageSwitch locale={locale} label={t('language.label')} path={path} />
          <ThemeToggle
            label={t('theme.label')}
            lightLabel={t('theme.light')}
            darkLabel={t('theme.dark')}
          />
        </div>
      </header>
      <main
        id="main"
        tabIndex={-1}
        className="flex flex-1 flex-col px-4 text-sm outline-none sm:px-6 sm:text-base"
      >
        {children}
      </main>
    </div>
    <SiteFooter year={new Date().getFullYear()} t={t} />
  </div>
)
