import { isLocale, type Locale, SUPPORTED_LOCALES } from '@/i18n'

import { isResumeSectionId, type ResumeSectionId } from './navigation'

export const COMMAND_NAMES = [
  'help',
  'about',
  'experience',
  'projects',
  'skills',
  'education',
  'contact',
  'all',
  'download',
  'lang',
  'theme',
  'clear',
] as const
export type CommandName = (typeof COMMAND_NAMES)[number]

export type CommandSpec = {
  readonly name: CommandName
  readonly usage: string
  readonly takesArgument: boolean
}

export const LANG_USAGE = `/lang ${SUPPORTED_LOCALES.join('|')}`

export const COMMANDS: readonly CommandSpec[] = COMMAND_NAMES.map((name) => ({
  name,
  usage: name === 'lang' ? LANG_USAGE : `/${name}`,
  takesArgument: name === 'lang',
}))

export const QUICK_COMMANDS = [
  'experience',
  'projects',
  'skills',
  'all',
  'download',
] as const satisfies readonly CommandName[]

const ALIASES = new Map<string, CommandName>([
  ['', 'help'],
  ['?', 'help'],
  ['ls', 'help'],
  ['cls', 'clear'],
])

export type ParsedCommand =
  | { readonly kind: 'empty' }
  | { readonly kind: 'help' }
  | { readonly kind: 'section'; readonly section: ResumeSectionId }
  | { readonly kind: 'all' }
  | { readonly kind: 'download' }
  | { readonly kind: 'lang'; readonly locale: Locale }
  | { readonly kind: 'usage'; readonly usage: string }
  | { readonly kind: 'theme' }
  | { readonly kind: 'clear' }
  | { readonly kind: 'unknown'; readonly command: string }

const resolveName = (word: string): CommandName | undefined =>
  ALIASES.get(word) ?? COMMAND_NAMES.find((name) => name === word)

const toCommand = (name: CommandName, args: readonly string[]): ParsedCommand => {
  if (isResumeSectionId(name)) {
    return { kind: 'section', section: name }
  }
  switch (name) {
    case 'help':
    case 'all':
    case 'download':
    case 'theme':
    case 'clear':
      return { kind: name }
    case 'lang': {
      const code = args[0]?.toLowerCase()
      return isLocale(code) ? { kind: 'lang', locale: code } : { kind: 'usage', usage: LANG_USAGE }
    }
    default:
      return name satisfies never
  }
}

export const parseCommand = (raw: string): ParsedCommand => {
  const [head, ...args] = raw.trim().split(/\s+/)
  if (!head) {
    return { kind: 'empty' }
  }
  const name = resolveName(head.replace(/^\//, '').toLowerCase())
  if (!name) {
    return { kind: 'unknown', command: head }
  }
  return toCommand(name, args)
}

export const suggestCommands = (input: string): readonly CommandSpec[] => {
  if (!input.startsWith('/') || /\s/.test(input)) {
    return []
  }
  const query = input.slice(1).toLowerCase()
  return COMMANDS.filter((command) => command.name.startsWith(query))
}
