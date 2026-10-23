import { type Locale, type Translator } from '@/i18n'
import { type Models } from '@/models'

import { formatPeriod } from '@/lib/format-period'

import { BulletList } from './bullet-list'
import { TechList } from './tech-list'

type ExperienceEntriesProps = {
  positions: readonly Models.Position[]
  earlier: readonly Models.EarlierPosition[]
  locale: Locale
  t: Translator
}

const HEADLINE = 'flex flex-col gap-x-6 sm:flex-row sm:items-baseline sm:justify-between'

export const ExperienceEntries = ({ positions, earlier, locale, t }: ExperienceEntriesProps) => {
  const periodOf = (start: Models.YearMonth, end: Models.YearMonth | null) =>
    formatPeriod({ start, end, locale, presentLabel: t('experience.present'), style: 'month' })

  return (
    <div className="flex flex-col gap-10">
      <ol className="flex flex-col gap-10">
        {positions.map((position) => (
          <li key={position.id}>
            <article className="flex flex-col gap-3">
              <header className="flex flex-col gap-1">
                <div className={HEADLINE}>
                  <h3 className="font-semibold">
                    {position.role}
                    <span className="font-normal text-muted-foreground"> @ </span>
                    {position.company}
                  </h3>
                  <p className="text-sm text-muted-foreground tabular-nums">
                    {periodOf(position.start, position.end)}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {position.context} · {position.location}
                </p>
              </header>
              <BulletList items={position.highlights} />
              <TechList items={position.technologies} label={t('experience.stack')} />
            </article>
          </li>
        ))}
      </ol>

      {earlier.length > 0 ? (
        <div className="flex flex-col gap-4 border-t border-dashed border-border pt-6">
          <h3 className="text-sm text-muted-foreground lowercase">{t('experience.earlier')}</h3>
          <ul className="flex flex-col gap-6">
            {earlier.map((position) => (
              <li key={position.id} className="flex flex-col gap-1">
                <div className={HEADLINE}>
                  <p className="font-semibold">
                    {position.role}
                    <span className="font-normal text-muted-foreground"> @ </span>
                    {position.company}
                  </p>
                  <p className="text-sm text-muted-foreground tabular-nums">
                    {periodOf(position.start, position.end)}
                  </p>
                </div>
                <p className="max-w-prose text-pretty text-muted-foreground">{position.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
