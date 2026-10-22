import { SUPPORTED_LOCALES } from '@/i18n'

import { withErrorHandler } from '@/server/errors/with-error-handler'
import { cvController } from '@/server/modules/cv/controllers/cv.controller'

export const dynamic = 'force-static'
export const dynamicParams = false

export const generateStaticParams = () => SUPPORTED_LOCALES.map((locale) => ({ locale }))

export const GET = withErrorHandler(cvController.getCv)
