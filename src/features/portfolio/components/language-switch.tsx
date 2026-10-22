import Link from 'next/link'

import { cn } from '@/design-system/ui/lib/cn'
import { type Locale, LOCALE_NAMES, SUPPORTED_LOCALES } from '@/i18n'

type LanguageSwitchProps = {
  locale: Locale
  label: string
}

export const LanguageSwitch = ({ locale, label }: LanguageSwitchProps) => (
  <nav aria-label={label}>
    <ul className="flex items-center">
      {SUPPORTED_LOCALES.map((code) => {
        const isCurrent = code === locale
        return (
          <li key={code}>
            <Link
              href={`/${code}`}
              hrefLang={code}
              lang={code}
              aria-current={isCurrent ? 'page' : undefined}
              className={cn(
                'inline-flex min-h-11 min-w-11 items-center justify-center rounded-full font-mono text-xs tracking-label uppercase transition-colors',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                isCurrent ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <span aria-hidden="true">{code}</span>
              <span className="sr-only">{LOCALE_NAMES[code]}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  </nav>
)
