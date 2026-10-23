import { type Translator } from '@/i18n'

import { DitheredPortrait } from './dithered-portrait'

type AboutEntryProps = {
  t: Translator
}

export const AboutEntry = ({ t }: AboutEntryProps) => (
  <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
    <DitheredPortrait alt={t('about.photoAlt')} />
    <div className="flex max-w-prose flex-col gap-4 text-pretty">
      <p>{t('about.paragraph1')}</p>
      <p className="text-muted-foreground">{t('about.paragraph2')}</p>
      <p className="text-muted-foreground">{t('about.paragraph3')}</p>
    </div>
  </div>
)
