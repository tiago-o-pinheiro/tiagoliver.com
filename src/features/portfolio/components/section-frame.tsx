import { type ReactNode } from 'react'

type SectionFrameProps = {
  id: string
  title: string
  index?: number
  children: ReactNode
}

export const SectionFrame = ({ id, title, index, children }: SectionFrameProps) => (
  <section id={id} aria-labelledby={`${id}-title`} className="flex scroll-mt-6 flex-col gap-6 py-8">
    <h2
      id={`${id}-title`}
      className="flex items-center gap-3 font-display text-3xl leading-display uppercase sm:text-4xl"
    >
      {index === undefined ? null : (
        <span aria-hidden="true" className="text-muted-foreground tabular-nums">
          {String(index).padStart(2, '0')}
        </span>
      )}
      <span>{title}</span>
      <span aria-hidden="true" className="h-px min-w-6 flex-1 bg-foreground" />
    </h2>
    {children}
  </section>
)
