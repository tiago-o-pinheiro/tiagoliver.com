import { type Translator } from '@/i18n'
import { type Models } from '@/models'

type EducationEntriesProps = {
  education: readonly Models.Education[]
  languages: readonly Models.SpokenLanguage[]
  t: Translator
}

const SUBHEADING = 'text-sm text-muted-foreground lowercase'

export const EducationEntries = ({ education, languages, t }: EducationEntriesProps) => (
  <div className="grid gap-10 md:grid-cols-2">
    <div className="flex flex-col gap-4">
      <h3 className={SUBHEADING}>{t('background.education')}</h3>
      <ul className="flex flex-col gap-4">
        {education.map((item) => (
          <li key={item.id} className="flex flex-col gap-0.5">
            <p className="font-semibold">
              {item.title}
              {item.status ? (
                <span className="font-normal text-muted-foreground"> ({item.status})</span>
              ) : null}
            </p>
            <p className="text-sm text-muted-foreground">
              {item.institution} · <span className="tabular-nums">{item.period}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
    <div className="flex flex-col gap-4">
      <h3 className={SUBHEADING}>{t('background.languages')}</h3>
      <dl className="flex flex-col gap-2">
        {languages.map((language) => (
          <div key={language.id} className="flex gap-3">
            <dt className="w-28 shrink-0 font-semibold">{language.name}</dt>
            <dd className="text-muted-foreground">{language.level}</dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
)
