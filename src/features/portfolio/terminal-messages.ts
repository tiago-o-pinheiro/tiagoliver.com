import { LOCALE_NAMES, type Translator } from '@/i18n'

import { type Theme } from '@/lib/theme'

import { SECTION_TITLE_KEYS } from './navigation'
import { type ParsedCommand } from './terminal-commands'

export type TerminalResult =
  | Exclude<ParsedCommand, { readonly kind: 'empty' | 'clear' | 'theme' }>
  | { readonly kind: 'theme'; readonly theme: Theme }

export type TerminalRecord = {
  readonly id: number
  readonly input: string
  readonly result: TerminalResult
}

export const describeResult = (result: TerminalResult, t: Translator): string => {
  switch (result.kind) {
    case 'help':
      return t('terminal.status.help')
    case 'section':
      return t('terminal.status.section', { section: t(SECTION_TITLE_KEYS[result.section]) })
    case 'all':
      return t('terminal.status.all')
    case 'download':
      return t('terminal.download', { file: t('cv.fileName') })
    case 'lang':
      return t('terminal.lang', { language: LOCALE_NAMES[result.locale] })
    case 'theme':
      return t('terminal.theme', { theme: t(`theme.${result.theme}`) })
    case 'usage':
      return t('terminal.usage', { usage: result.usage })
    case 'unknown':
      return t('terminal.unknown', { command: result.command })
    default:
      return result satisfies never
  }
}
