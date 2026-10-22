import { type ReactNode } from 'react'

type SectionFrameProps = {
  id: string
  index: number
  title: string
  children: ReactNode
}

export const SectionFrame = ({ id, index, title, children }: SectionFrameProps) => (
  <section
    id={id}
    aria-labelledby={`${id}-title`}
    className="grid scroll-mt-16 gap-8 border-t border-border py-16 sm:py-20 md:grid-cols-4"
  >
    <header className="flex items-baseline gap-3 md:sticky md:top-24 md:flex-col md:gap-2 md:self-start">
      <span aria-hidden="true" className="font-mono text-xs text-muted-foreground tabular-nums">
        {String(index).padStart(2, '0')}
      </span>
      <h2 id={`${id}-title`} className="text-xl font-semibold tracking-heading">
        {title}
      </h2>
    </header>
    <div className="md:col-span-3">{children}</div>
  </section>
)
