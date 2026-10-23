import { type Models } from '@/models'

type SkillGroupsProps = {
  skills: readonly Models.SkillGroup[]
}

export const SkillGroups = ({ skills }: SkillGroupsProps) => (
  <dl className="flex flex-col gap-4 sm:gap-2">
    {skills.map((group) => (
      <div key={group.id} className="flex flex-col gap-0.5 sm:flex-row sm:gap-6">
        <dt className="text-muted-foreground lowercase sm:w-64 sm:shrink-0">{group.label}</dt>
        <dd className="text-pretty">{group.items.join(', ')}</dd>
      </div>
    ))}
  </dl>
)
