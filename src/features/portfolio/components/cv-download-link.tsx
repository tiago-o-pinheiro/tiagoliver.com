import { type VariantProps } from 'class-variance-authority'

import { buttonVariants } from '@/design-system/ui/button'
import { cn } from '@/design-system/ui/lib/cn'
import { type Locale, type Translator } from '@/i18n'

import { cvHref } from '../navigation'

type CvDownloadLinkProps = VariantProps<typeof buttonVariants> & {
  locale: Locale
  t: Translator
  className?: string
}

export const CvDownloadLink = ({ locale, t, variant, size, className }: CvDownloadLinkProps) => (
  <a
    href={cvHref(locale)}
    download={t('cv.fileName')}
    type="application/pdf"
    className={cn(buttonVariants({ variant, size }), className)}
  >
    <span aria-hidden="true">↓</span>
    {t('cv.download')}
    <span className="text-xs opacity-70">{t('cv.format')}</span>
  </a>
)
