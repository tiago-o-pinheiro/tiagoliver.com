import { type Models } from '@/models'

import { resumeEn } from '@/server/modules/resume/content/resume-en.content'
import { resumeEs } from '@/server/modules/resume/content/resume-es.content'

const RESUMES: Readonly<Record<Models.Locale, Models.Resume>> = { en: resumeEn, es: resumeEs }

export class ResumeService {
  getResume = (locale: Models.Locale): Models.Resume => RESUMES[locale]
}

export const resumeService = new ResumeService()
