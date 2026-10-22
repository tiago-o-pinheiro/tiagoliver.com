import { ArrowDown } from 'lucide-react'
import Image from 'next/image'

import { buttonVariants } from '@/design-system/ui/button'
import { type Translator } from '@/i18n'

import { SectionFrame } from './section-frame'
import { SECTION_IDS } from '../navigation'

type AboutSectionProps = {
  index: number
  t: Translator
}

const PORTRAIT = { src: '/images/tiago-oliver.jpg', width: 1254, height: 1254 } as const

export const AboutSection = ({ index, t }: AboutSectionProps) => (
  <SectionFrame id={SECTION_IDS.about} index={index} title={t('section.about')}>
    <div className="grid items-start gap-10 sm:grid-cols-3">
      <Image
        src={PORTRAIT.src}
        width={PORTRAIT.width}
        height={PORTRAIT.height}
        alt={t('about.photoAlt')}
        sizes="(min-width: 1024px) 15rem, (min-width: 640px) 30vw, 12rem"
        className="aspect-square w-48 rounded-xl border border-border object-cover sm:w-full"
      />
      <div className="flex flex-col gap-5 text-lg text-pretty sm:col-span-2">
        <p>{t('about.paragraph1')}</p>
        <p className="text-muted-foreground">{t('about.paragraph2')}</p>
        <p className="text-muted-foreground">{t('about.paragraph3')}</p>
        <a
          href={`#${SECTION_IDS.contact}`}
          className={buttonVariants({ variant: 'outline', className: 'mt-3 self-start' })}
        >
          {t('about.cta')}
          <ArrowDown aria-hidden="true" className="size-4" />
        </a>
      </div>
    </div>
  </SectionFrame>
)
