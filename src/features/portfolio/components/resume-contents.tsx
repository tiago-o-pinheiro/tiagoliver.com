import { textLinkVariants } from '@/design-system/ui/text-link'
import { type Translator } from '@/i18n'

import { RESUME_SECTION_IDS, SECTION_TITLE_KEYS } from '../navigation'

type ResumeContentsProps = {
  t: Translator
}

export const ResumeContents = ({ t }: ResumeContentsProps) => (
  <nav
    aria-label={t('resume.contents')}
    className="flex flex-col gap-2 border-y border-dashed border-border py-4"
  >
    <p aria-hidden="true" className="text-sm text-muted-foreground lowercase">
      {t('resume.contents')}
    </p>
    <ol className="flex flex-wrap gap-x-6">
      {RESUME_SECTION_IDS.map((id, index) => (
        <li key={id}>
          <a href={`#${id}`} className={textLinkVariants({ target: 'touch' })}>
            <span aria-hidden="true" className="tabular-nums">
              {String(index + 1).padStart(2, '0')}&nbsp;
            </span>
            {t(SECTION_TITLE_KEYS[id])}
          </a>
        </li>
      ))}
    </ol>
  </nav>
)
