import { StatusCodes } from 'http-status-codes'
import { Type } from 'typebox'

import { Models } from '@/models'

export const getCvApiSchema = {
  params: Type.Object({ locale: Models.Locale }),
  response: {
    [StatusCodes.OK]: Type.Unsafe<Uint8Array>({
      type: 'string',
      contentMediaType: 'application/pdf',
    }),
  },
}
export type GetCvApiSchema = typeof getCvApiSchema
