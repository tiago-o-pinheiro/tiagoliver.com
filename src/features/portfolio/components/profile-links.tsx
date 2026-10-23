import { textLinkVariants } from '@/design-system/ui/text-link'
import { type Models } from '@/models'

type ProfileLinksProps = {
  links: readonly Models.ResumeLink[]
}

export const ProfileLinks = ({ links }: ProfileLinksProps) => (
  <ul className="flex flex-wrap items-center gap-x-4">
    {links.map((link) => (
      <li key={link.href}>
        <a
          href={link.href}
          rel="me noopener"
          target="_blank"
          className={textLinkVariants({ target: 'touch' })}
        >
          {link.label}
          <span aria-hidden="true">&nbsp;↗</span>
        </a>
      </li>
    ))}
  </ul>
)
