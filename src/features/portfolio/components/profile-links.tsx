import { ArrowUpRight } from 'lucide-react'

import { buttonVariants } from '@/design-system/ui/button'
import { type Models } from '@/models'

type ProfileLinksProps = {
  links: readonly Models.ResumeLink[]
}

export const ProfileLinks = ({ links }: ProfileLinksProps) => (
  <ul className="flex flex-wrap items-center gap-1">
    {links.map((link) => (
      <li key={link.href}>
        <a
          href={link.href}
          rel="me noopener"
          target="_blank"
          className={buttonVariants({ variant: 'ghost' })}
        >
          {link.label}
          <ArrowUpRight aria-hidden="true" className="size-4 text-muted-foreground" />
        </a>
      </li>
    ))}
  </ul>
)
