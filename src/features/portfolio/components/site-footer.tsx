import { type Translator } from '@/i18n'

import { SOURCE_URL } from '../navigation'

type SiteFooterProps = {
  year: number
  t: Translator
}

export const SiteFooter = ({ year, t }: SiteFooterProps) => (
  <footer className="border-t border-border">
    <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p>{t('footer.rights', { year })}</p>
      <a
        href={SOURCE_URL}
        target="_blank"
        rel="noopener"
        className="inline-flex min-h-11 items-center self-start transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:self-auto"
      >
        {t('footer.source')}
      </a>
    </div>
  </footer>
)
