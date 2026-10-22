import { type Translator } from '@/i18n'
import { type Models } from '@/models'

import { SectionFrame } from './section-frame'
import { SECTION_IDS } from '../navigation'

type SkillsSectionProps = {
  index: number
  skills: readonly Models.SkillGroup[]
  t: Translator
}

export const SkillsSection = ({ index, skills, t }: SkillsSectionProps) => (
  <SectionFrame id={SECTION_IDS.skills} index={index} title={t('section.skills')}>
    <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
      {skills.map((group) => (
        <div key={group.id} className="flex flex-col gap-2 border-t border-border pt-4">
          <dt className="font-mono text-xs tracking-label text-muted-foreground uppercase">
            {group.label}
          </dt>
          <dd className="text-pretty">{group.items.join(', ')}</dd>
        </div>
      ))}
    </dl>
  </SectionFrame>
)
