import { cn } from '@/design-system/ui/lib/cn'
import { type Locale, LOCALE_NAMES, SUPPORTED_LOCALES } from '@/i18n'

import { localizedHref, type PagePath } from '../navigation'

type LanguageSwitchProps = {
  locale: Locale
  label: string
  path: PagePath
}

export const LanguageSwitch = ({ locale, label, path }: LanguageSwitchProps) => (
  <nav aria-label={label}>
    <ul className="flex border border-foreground">
      {SUPPORTED_LOCALES.map((code) => {
        const isCurrent = code === locale
        return (
          <li key={code}>
            <a
              href={localizedHref(code, path)}
              hrefLang={code}
              lang={code}
              aria-current={isCurrent ? 'page' : undefined}
              className={cn(
                'inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-sm lowercase transition-colors',
                'focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ring',
                isCurrent
                  ? 'bg-foreground text-background focus-visible:outline-background'
                  : 'hover:bg-foreground hover:text-background',
              )}
            >
              <span aria-hidden="true">{code}</span>
              <span className="sr-only">{LOCALE_NAMES[code]}</span>
            </a>
          </li>
        )
      })}
    </ul>
  </nav>
)
