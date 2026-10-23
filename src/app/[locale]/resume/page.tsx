import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getTranslator, isLocale, SUPPORTED_LOCALES } from '@/i18n'

import { ResumeContents } from '@/features/portfolio/components/resume-contents'
import { ResumeHeader } from '@/features/portfolio/components/resume-header'
import { ResumeSectionBody } from '@/features/portfolio/components/resume-section-body'
import { SectionFrame } from '@/features/portfolio/components/section-frame'
import { TerminalWindow } from '@/features/portfolio/components/terminal-window'
import {
  localizedHref,
  PAGE_PATHS,
  RESUME_SECTION_IDS,
  SECTION_TITLE_KEYS,
} from '@/features/portfolio/navigation'
import { resumeService } from '@/server/modules/resume/services/resume.service'

type ResumePageProps = {
  params: Promise<{ locale: string }>
}

export const generateMetadata = async ({ params }: ResumePageProps): Promise<Metadata> => {
  const { locale } = await params
  if (!isLocale(locale)) {
    return {}
  }
  const t = getTranslator(locale)
  const url = localizedHref(locale, PAGE_PATHS.resume)
  return {
    title: t('meta.resumeTitle'),
    description: t('meta.resumeDescription'),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          SUPPORTED_LOCALES.map((code) => [code, localizedHref(code, PAGE_PATHS.resume)]),
        ),
        'x-default': localizedHref('en', PAGE_PATHS.resume),
      },
    },
    openGraph: { url, title: t('meta.resumeTitle'), description: t('meta.resumeDescription') },
  }
}

const ResumePage = async ({ params }: ResumePageProps) => {
  const { locale } = await params
  if (!isLocale(locale)) {
    notFound()
  }
  const t = getTranslator(locale)
  const resume = resumeService.getResume(locale)

  return (
    <TerminalWindow locale={locale} path={PAGE_PATHS.resume} t={t}>
      <ResumeHeader resume={resume} locale={locale} t={t} />
      <ResumeContents t={t} />
      {RESUME_SECTION_IDS.map((id, index) => (
        <SectionFrame key={id} id={id} index={index + 1} title={t(SECTION_TITLE_KEYS[id])}>
          <ResumeSectionBody id={id} resume={resume} locale={locale} t={t} />
        </SectionFrame>
      ))}
    </TerminalWindow>
  )
}

export default ResumePage
