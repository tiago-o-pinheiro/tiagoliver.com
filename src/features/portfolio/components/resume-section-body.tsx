import { type Locale, type Translator } from '@/i18n'
import { type Models } from '@/models'

import { AboutEntry } from './about-entry'
import { ContactEntry } from './contact-entry'
import { EducationEntries } from './education-entries'
import { ExperienceEntries } from './experience-entries'
import { ProjectEntries } from './project-entries'
import { SkillGroups } from './skill-groups'
import { type ResumeSectionId } from '../navigation'

type ResumeSectionBodyProps = {
  id: ResumeSectionId
  resume: Models.Resume
  locale: Locale
  t: Translator
}

export const ResumeSectionBody = ({ id, resume, locale, t }: ResumeSectionBodyProps) => {
  switch (id) {
    case 'experience':
      return (
        <ExperienceEntries
          positions={resume.positions}
          earlier={resume.earlier}
          locale={locale}
          t={t}
        />
      )
    case 'projects':
      return <ProjectEntries projects={resume.projects} t={t} />
    case 'skills':
      return <SkillGroups skills={resume.skills} />
    case 'education':
      return <EducationEntries education={resume.education} languages={resume.languages} t={t} />
    case 'about':
      return <AboutEntry t={t} />
    case 'contact':
      return <ContactEntry profile={resume.profile} locale={locale} t={t} />
    default:
      return id satisfies never
  }
}
