import { textLinkVariants } from '@/design-system/ui/text-link'
import { type Translator } from '@/i18n'

import { SOURCE_URL } from '../navigation'

type SiteFooterProps = {
  year: number
  t: Translator
}

export const SiteFooter = ({ year, t }: SiteFooterProps) => (
  <footer className="flex flex-col gap-1 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
    <p>{t('footer.rights', { year })}</p>
    <a
      href={SOURCE_URL}
      target="_blank"
      rel="noopener"
      className={textLinkVariants({ tone: 'muted', target: 'touch', className: 'self-start' })}
    >
      {t('footer.source')}
    </a>
  </footer>
)
