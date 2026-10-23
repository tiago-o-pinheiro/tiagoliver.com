'use client'

import { useSyncExternalStore } from 'react'

import { cn } from '@/design-system/ui/lib/cn'

import { applyTheme, isDarkTheme, isDarkThemeOnServer, subscribeToTheme } from '@/lib/theme'

type ThemeToggleProps = {
  label: string
  lightLabel: string
  darkLabel: string
}

const SEGMENT = [
  'inline-flex min-h-11 w-18 cursor-pointer items-center justify-center text-sm transition-colors',
  'focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ring',
  'hover:bg-foreground hover:text-background',
]

export const ThemeToggle = ({ label, lightLabel, darkLabel }: ThemeToggleProps) => {
  const isDark = useSyncExternalStore(subscribeToTheme, isDarkTheme, isDarkThemeOnServer)

  return (
    <div role="group" aria-label={label} className="flex border border-foreground">
      <button
        type="button"
        aria-pressed={!isDark}
        onClick={() => applyTheme('light')}
        className={cn(
          SEGMENT,
          'bg-foreground text-background focus-visible:outline-background',
          'dark:bg-transparent dark:text-foreground dark:focus-visible:outline-ring',
          'dark:hover:bg-foreground dark:hover:text-background',
        )}
      >
        {lightLabel}
      </button>
      <button
        type="button"
        aria-pressed={isDark}
        onClick={() => applyTheme('dark')}
        className={cn(
          SEGMENT,
          'dark:bg-foreground dark:text-background dark:focus-visible:outline-background',
        )}
      >
        {darkLabel}
      </button>
    </div>
  )
}
