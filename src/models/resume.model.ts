import { Type, type Static } from 'typebox'
import { Value } from 'typebox/value'

const Text = Type.String({ minLength: 1 })

export const YearMonth = Type.String({ pattern: '^\\d{4}(-(0[1-9]|1[0-2]))?$' })
export type YearMonth = Static<typeof YearMonth>

export const ResumeLink = Type.Object({
  label: Text,
  href: Type.String({ pattern: '^(https://|mailto:)' }),
})
export type ResumeLink = Static<typeof ResumeLink>

export const Profile = Type.Object({
  name: Text,
  role: Text,
  summary: Text,
  location: Text,
  availability: Text,
  citizenship: Text,
  email: ResumeLink,
  website: ResumeLink,
  linkedin: ResumeLink,
  github: ResumeLink,
})
export type Profile = Static<typeof Profile>

export const Position = Type.Object({
  id: Text,
  role: Text,
  company: Text,
  location: Text,
  context: Text,
  start: YearMonth,
  end: Type.Union([YearMonth, Type.Null()]),
  highlights: Type.Array(Text, { minItems: 1 }),
  technologies: Type.Array(Text),
})
export type Position = Static<typeof Position>

export const EarlierPosition = Type.Object({
  id: Text,
  role: Text,
  company: Text,
  start: YearMonth,
  end: YearMonth,
  summary: Text,
})
export type EarlierPosition = Static<typeof EarlierPosition>

export const Project = Type.Object({
  id: Text,
  name: Text,
  category: Text,
  status: Text,
  tagline: Text,
  summary: Text,
  highlights: Type.Array(Text, { minItems: 1 }),
  technologies: Type.Array(Text),
  link: ResumeLink,
})
export type Project = Static<typeof Project>

export const SkillGroup = Type.Object({
  id: Text,
  label: Text,
  items: Type.Array(Text, { minItems: 1 }),
})
export type SkillGroup = Static<typeof SkillGroup>

export const Education = Type.Object({
  id: Text,
  title: Text,
  status: Type.Optional(Text),
  institution: Text,
  period: Text,
})
export type Education = Static<typeof Education>

export const SpokenLanguage = Type.Object({
  id: Text,
  name: Text,
  level: Text,
})
export type SpokenLanguage = Static<typeof SpokenLanguage>

export const Resume = Type.Object({
  profile: Profile,
  positions: Type.Array(Position, { minItems: 1 }),
  earlier: Type.Array(EarlierPosition),
  projects: Type.Array(Project),
  skills: Type.Array(SkillGroup),
  education: Type.Array(Education),
  languages: Type.Array(SpokenLanguage),
})
export type Resume = Static<typeof Resume>

export const isResume = (value: unknown): value is Resume => Value.Check(Resume, value)
