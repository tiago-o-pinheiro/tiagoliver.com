import { notFound } from 'next/navigation'

import { getTranslator, isLocale } from '@/i18n'

import { ResumeSectionBody } from '@/features/portfolio/components/resume-section-body'
import { Terminal } from '@/features/portfolio/components/terminal'
import { TerminalBanner } from '@/features/portfolio/components/terminal-banner'
import { TerminalWindow } from '@/features/portfolio/components/terminal-window'
import { PAGE_PATHS, type ResumeSectionId } from '@/features/portfolio/navigation'
import { resumeService } from '@/server/modules/resume/services/resume.service'

type HomePageProps = {
  params: Promise<{ locale: string }>
}

const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = await params
  if (!isLocale(locale)) {
    notFound()
  }
  const t = getTranslator(locale)
  const resume = resumeService.getResume(locale)
  const body = (id: ResumeSectionId) => (
    <ResumeSectionBody id={id} resume={resume} locale={locale} t={t} />
  )

  return (
    <TerminalWindow locale={locale} path={PAGE_PATHS.home} t={t}>
      <Terminal
        locale={locale}
        banner={<TerminalBanner resume={resume} locale={locale} t={t} />}
        sections={{
          experience: body('experience'),
          projects: body('projects'),
          skills: body('skills'),
          education: body('education'),
          about: body('about'),
          contact: body('contact'),
        }}
      />
    </TerminalWindow>
  )
}

export default HomePage
