import { type Locale, type Translator } from '@/i18n'
import { type Models } from '@/models'

import { formatPeriod } from '@/lib/format-period'

import { SectionFrame } from './section-frame'
import { TechList } from './tech-list'
import { SECTION_IDS } from '../navigation'

type ExperienceSectionProps = {
  index: number
  locale: Locale
  positions: readonly Models.Position[]
  earlier: readonly Models.EarlierPosition[]
  t: Translator
}

export const ExperienceSection = ({
  index,
  locale,
  positions,
  earlier,
  t,
}: ExperienceSectionProps) => {
  const periodOf = (start: Models.YearMonth, end: Models.YearMonth | null) =>
    formatPeriod({ start, end, locale, presentLabel: t('experience.present'), style: 'month' })

  return (
    <SectionFrame id={SECTION_IDS.experience} index={index} title={t('section.experience')}>
      <ol className="flex flex-col gap-14">
        {positions.map((position) => (
          <li key={position.id}>
            <article className="flex flex-col gap-4">
              <header className="flex flex-col gap-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-heading">
                    {position.role}
                    <span className="text-muted-foreground"> · </span>
                    <span className="text-primary">{position.company}</span>
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground tabular-nums">
                    {periodOf(position.start, position.end)}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {position.context} · {position.location}
                </p>
              </header>
              <ul className="flex list-disc flex-col gap-2 pl-5 text-pretty marker:text-border-strong">
                {position.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <TechList items={position.technologies} label={t('experience.technologies')} />
            </article>
          </li>
        ))}
      </ol>

      {earlier.length > 0 ? (
        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8">
          <h3 className="font-mono text-xs tracking-label text-muted-foreground uppercase">
            {t('experience.earlier')}
          </h3>
          <ul className="flex flex-col gap-6">
            {earlier.map((position) => (
              <li key={position.id} className="flex flex-col gap-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <p className="font-medium">
                    {position.role}
                    <span className="text-muted-foreground"> · {position.company}</span>
                  </p>
                  <p className="font-mono text-xs text-muted-foreground tabular-nums">
                    {periodOf(position.start, position.end)}
                  </p>
                </div>
                <p className="text-pretty text-muted-foreground">{position.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </SectionFrame>
  )
}
