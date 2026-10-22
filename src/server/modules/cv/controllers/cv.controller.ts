import { StatusCodes } from 'http-status-codes'

import { readParams, type RouteHandler } from '@/server/lib/handler'
import { getCvApiSchema } from '@/server/modules/cv/schemas/cv.api-schema'
import { type CvService, cvService } from '@/server/modules/cv/services/cv.service'

export class CvController {
  constructor(private readonly cvService: CvService) {}

  getCv: RouteHandler = async (_request, context) => {
    const { locale } = await readParams(getCvApiSchema.params, context)
    const { file, fileName } = await this.cvService.renderCv(locale)
    return new Response(file, {
      status: StatusCodes.OK,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    })
  }
}

export const cvController = new CvController(cvService)
