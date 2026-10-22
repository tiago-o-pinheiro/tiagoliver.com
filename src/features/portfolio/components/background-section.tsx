import { type Translator } from '@/i18n'
import { type Models } from '@/models'

import { SectionFrame } from './section-frame'
import { SECTION_IDS } from '../navigation'

type BackgroundSectionProps = {
  index: number
  education: readonly Models.Education[]
  languages: readonly Models.SpokenLanguage[]
  t: Translator
}

const SUBHEADING = 'font-mono text-xs tracking-label text-muted-foreground uppercase'

export const BackgroundSection = ({ index, education, languages, t }: BackgroundSectionProps) => (
  <SectionFrame id={SECTION_IDS.background} index={index} title={t('section.background')}>
    <div className="grid gap-12 sm:grid-cols-2">
      <div className="flex flex-col gap-5">
        <h3 className={SUBHEADING}>{t('background.education')}</h3>
        <ul className="flex flex-col gap-5">
          {education.map((item) => (
            <li key={item.id} className="flex flex-col gap-1">
              <p className="font-medium">
                {item.title}
                {item.status ? (
                  <span className="text-muted-foreground"> ({item.status})</span>
                ) : null}
              </p>
              <p className="text-sm text-muted-foreground">
                {item.institution} ·{' '}
                <span className="font-mono text-xs tabular-nums">{item.period}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-5">
        <h3 className={SUBHEADING}>{t('background.languages')}</h3>
        <dl className="flex flex-col">
          {languages.map((language) => (
            <div
              key={language.id}
              className="flex items-baseline justify-between gap-4 border-b border-border py-3 first:pt-0"
            >
              <dt className="font-medium">{language.name}</dt>
              <dd className="text-sm text-muted-foreground">{language.level}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </SectionFrame>
)
