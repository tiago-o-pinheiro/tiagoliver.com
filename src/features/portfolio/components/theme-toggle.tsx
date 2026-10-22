'use client'

import { Moon, Sun } from 'lucide-react'
import { useSyncExternalStore } from 'react'

import { Button } from '@/design-system/ui/button'

import { applyTheme, isDarkTheme, isDarkThemeOnServer, subscribeToTheme } from '@/lib/theme'

type ThemeToggleProps = {
  toDarkLabel: string
  toLightLabel: string
}

export const ThemeToggle = ({ toDarkLabel, toLightLabel }: ThemeToggleProps) => {
  const isDark = useSyncExternalStore(subscribeToTheme, isDarkTheme, isDarkThemeOnServer)

  const handleToggle = () => {
    applyTheme(isDark ? 'light' : 'dark')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      aria-label={isDark ? toLightLabel : toDarkLabel}
    >
      <Sun aria-hidden="true" className="hidden size-4 dark:block" />
      <Moon aria-hidden="true" className="size-4 dark:hidden" />
    </Button>
  )
}
