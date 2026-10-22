import { notFound } from 'next/navigation'

import { getTranslator, isLocale } from '@/i18n'

import { AboutSection } from '@/features/portfolio/components/about-section'
import { BackgroundSection } from '@/features/portfolio/components/background-section'
import { ContactSection } from '@/features/portfolio/components/contact-section'
import { ExperienceSection } from '@/features/portfolio/components/experience-section'
import { HeroSection } from '@/features/portfolio/components/hero-section'
import { ProofSection } from '@/features/portfolio/components/proof-section'
import { SiteFooter } from '@/features/portfolio/components/site-footer'
import { SiteHeader } from '@/features/portfolio/components/site-header'
import { SkillsSection } from '@/features/portfolio/components/skills-section'
import { WorkSection } from '@/features/portfolio/components/work-section'
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

  return (
    <>
      <SiteHeader locale={locale} name={resume.profile.name} t={t} />
      <main id="main" tabIndex={-1} className="mx-auto max-w-5xl px-4 outline-none sm:px-6">
        <HeroSection locale={locale} profile={resume.profile} t={t} />
        <ProofSection resume={resume} t={t} />
        <ExperienceSection
          index={1}
          locale={locale}
          positions={resume.positions}
          earlier={resume.earlier}
          t={t}
        />
        <WorkSection index={2} projects={resume.projects} t={t} />
        <SkillsSection index={3} skills={resume.skills} t={t} />
        <BackgroundSection
          index={4}
          education={resume.education}
          languages={resume.languages}
          t={t}
        />
        <AboutSection index={5} t={t} />
        <ContactSection index={6} locale={locale} profile={resume.profile} t={t} />
      </main>
      <SiteFooter year={new Date().getFullYear()} t={t} />
    </>
  )
}

export default HomePage
