import { renderToBuffer } from '@react-pdf/renderer'

import { getTranslator } from '@/i18n'
import { type Models } from '@/models'

import { CvDocument } from '@/server/modules/cv/templates/cv-document'
import { type ResumeService, resumeService } from '@/server/modules/resume/services/resume.service'

export type RenderedCv = {
  file: Uint8Array<ArrayBuffer>
  fileName: string
}

export class CvService {
  constructor(private readonly resumeService: ResumeService) {}

  renderCv = async (locale: Models.Locale): Promise<RenderedCv> => {
    const t = getTranslator(locale)
    const resume = this.resumeService.getResume(locale)
    const buffer = await renderToBuffer(CvDocument({ resume, locale, t }))
    return { file: new Uint8Array(buffer), fileName: t('cv.fileName') }
  }
}

export const cvService = new CvService(resumeService)
