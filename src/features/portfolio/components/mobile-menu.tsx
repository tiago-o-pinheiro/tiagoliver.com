'use client'

import { Menu } from 'lucide-react'
import { type ReactNode } from 'react'

import { Button } from '@/design-system/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/design-system/ui/dialog'

import { type NavItem } from '../navigation'

type MobileMenuProps = {
  items: readonly NavItem[]
  title: string
  openLabel: string
  closeLabel: string
  children: ReactNode
}

export const MobileMenu = ({ items, title, openLabel, closeLabel, children }: MobileMenuProps) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" size="icon" aria-label={openLabel}>
        <Menu aria-hidden="true" className="size-5" />
      </Button>
    </DialogTrigger>
    <DialogContent
      closeLabel={closeLabel}
      aria-describedby={undefined}
      className="top-0 left-0 max-w-none translate-x-0 translate-y-0 gap-6 rounded-none rounded-b-xl border-x-0 border-t-0 px-4 pt-4 pb-6 sm:px-6"
    >
      <DialogTitle className="flex min-h-11 items-center font-mono text-xs font-medium tracking-label text-muted-foreground uppercase">
        {title}
      </DialogTitle>
      <nav aria-label={title}>
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.href}>
              <DialogClose asChild>
                <a
                  href={item.href}
                  className="flex min-h-12 items-center border-b border-border text-2xl font-semibold tracking-heading transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {item.label}
                </a>
              </DialogClose>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-wrap items-center justify-between gap-3">{children}</div>
    </DialogContent>
  </Dialog>
)
