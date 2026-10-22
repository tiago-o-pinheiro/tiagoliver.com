// @vitest-environment node
import { StatusCodes } from 'http-status-codes'
import { describe, expect, it } from 'vitest'

import { GET } from './route'

const requestCv = (locale: string) =>
  GET(new Request(`http://test/api/cv/${locale}`), { params: Promise.resolve({ locale }) })

const PDF_SIGNATURE = '%PDF-'
const SINGLE_PAGE_TREE = /\/Type \/Pages\b[^>]*\/Count 1\b/

const readPdf = async (response: Response) =>
  new TextDecoder('latin1').decode(await response.arrayBuffer())

describe('GET /api/cv/[locale]', () => {
  it.each(['en', 'es'])('Given the %s locale, should download a PDF CV', async (locale) => {
    const response = await requestCv(locale)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.headers.get('content-type')).toBe('application/pdf')
    expect(response.headers.get('content-disposition')).toContain(
      `Tiago-Oliver-CV-${locale.toUpperCase()}.pdf`,
    )
    expect((await readPdf(response)).startsWith(PDF_SIGNATURE)).toBe(true)
  })

  it.each(['en', 'es'])(
    'Given the %s resume, should fit the CV on a single A4 page',
    async (locale) => {
      const pdf = await readPdf(await requestCv(locale))

      expect(pdf).toMatch(SINGLE_PAGE_TREE)
    },
  )

  it('Given an unsupported locale, should reject the request as invalid', async () => {
    const response = await requestCv('xx')

    expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY)
  })
})
