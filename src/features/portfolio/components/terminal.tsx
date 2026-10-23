'use client'

import {
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useReducer,
  useRef,
  useState,
} from 'react'

import { buttonVariants } from '@/design-system/ui/button'
import { cn } from '@/design-system/ui/lib/cn'
import { getTranslator, type Locale, type Translator } from '@/i18n'

import { applyTheme, isDarkTheme } from '@/lib/theme'

import { TerminalEntry } from './terminal-entry'
import { cvHref, localizedHref, PAGE_PATHS, PROMPT_HOST, type ResumeSectionId } from '../navigation'
import {
  type CommandSpec,
  type ParsedCommand,
  parseCommand,
  QUICK_COMMANDS,
  suggestCommands,
} from '../terminal-commands'
import { describeResult, type TerminalRecord, type TerminalResult } from '../terminal-messages'
import { INITIAL_PROMPT, promptReducer } from '../terminal-prompt'

type TerminalProps = {
  locale: Locale
  banner: ReactNode
  sections: Readonly<Record<ResumeSectionId, ReactNode>>
}

type SuggestionsProps = {
  id: string
  label: string
  suggestions: readonly CommandSpec[]
  highlighted: number
  optionId: (command: CommandSpec) => string
  t: Translator
  onChoose: (command: CommandSpec) => void
}

type QuickCommandsProps = {
  label: string
  onRun: (input: string) => void
}

const Suggestions = ({
  id,
  label,
  suggestions,
  highlighted,
  optionId,
  t,
  onChoose,
}: SuggestionsProps) => {
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    listRef.current?.children.item(highlighted)?.scrollIntoView({ block: 'nearest' })
  }, [highlighted])

  return (
    <ul
      ref={listRef}
      id={id}
      role="listbox"
      aria-label={label}
      className="flex max-h-64 flex-col overflow-y-auto border border-foreground"
    >
      {suggestions.map((command, index) => {
        const isHighlighted = index === highlighted
        return (
          <li
            key={command.name}
            id={optionId(command)}
            role="option"
            aria-selected={isHighlighted}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => onChoose(command)}
            className={cn(
              'flex min-h-11 shrink-0 cursor-pointer flex-col justify-center px-3 py-1 text-sm sm:flex-row sm:items-center sm:justify-start sm:gap-6',
              isHighlighted ? 'bg-foreground text-background' : 'hover:bg-muted',
            )}
          >
            <span className="sm:w-40 sm:shrink-0">{command.usage}</span>
            <span className={isHighlighted ? undefined : 'text-muted-foreground'}>
              {t(`terminal.command.${command.name}`)}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

const QuickCommands = ({ label, onRun }: QuickCommandsProps) => (
  <ul aria-label={label} className="flex flex-wrap gap-2">
    {QUICK_COMMANDS.map((name) => (
      <li key={name}>
        <button
          type="button"
          onClick={() => onRun(`/${name}`)}
          className={buttonVariants({ variant: 'outline', size: 'sm' })}
        >
          /{name}
        </button>
      </li>
    ))}
  </ul>
)

const followLink = (href: string, fileName?: string) => {
  const link = document.createElement('a')
  link.href = href
  if (fileName) {
    link.download = fileName
  }
  link.click()
}

export const Terminal = ({ locale, banner, sections }: TerminalProps) => {
  const t = getTranslator(locale)
  const baseId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const [records, setRecords] = useState<readonly TerminalRecord[]>([])
  const [history, setHistory] = useState<readonly string[]>([])
  const [prompt, dispatch] = useReducer(promptReducer, INITIAL_PROMPT)

  const suggestions = prompt.isSuggesting ? suggestCommands(prompt.input) : []
  const highlighted = suggestions[prompt.highlighted]
  const latest = records.at(-1)
  const latestId = latest?.id

  const inputId = `${baseId}-input`
  const hintId = `${baseId}-hint`
  const listId = `${baseId}-list`
  const optionId = (command: CommandSpec) => `${baseId}-option-${command.name}`

  useEffect(() => {
    if (latestId === undefined) {
      return
    }
    outputRef.current?.lastElementChild?.scrollIntoView({ block: 'start' })
  }, [latestId])

  const execute = (
    command: Exclude<ParsedCommand, { kind: 'empty' | 'clear' }>,
  ): TerminalResult => {
    switch (command.kind) {
      case 'download':
        followLink(cvHref(locale), t('cv.fileName'))
        return command
      case 'theme': {
        const theme = isDarkTheme() ? 'light' : 'dark'
        applyTheme(theme)
        return { kind: 'theme', theme }
      }
      case 'lang':
        followLink(localizedHref(command.locale, PAGE_PATHS.home))
        return command
      default:
        return command
    }
  }

  const run = (raw: string) => {
    const input = raw.trim()
    const command = parseCommand(input)
    dispatch({ type: 'submitted' })
    if (command.kind === 'empty') {
      return
    }
    setHistory((current) => [...current, input])
    if (command.kind === 'clear') {
      setRecords([])
      return
    }
    const result = execute(command)
    setRecords((current) => [...current, { id: (current.at(-1)?.id ?? 0) + 1, input, result }])
  }

  const choose = (command: CommandSpec) => {
    if (command.takesArgument) {
      dispatch({ type: 'completed', input: `/${command.name} ` })
      inputRef.current?.focus()
      return
    }
    run(`/${command.name}`)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    run(prompt.input)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      const step = event.key === 'ArrowDown' ? 1 : -1
      if (highlighted) {
        event.preventDefault()
        dispatch({ type: 'highlight-moved', step, total: suggestions.length })
        return
      }
      if (prompt.input === '' || prompt.historyIndex !== null) {
        event.preventDefault()
        dispatch({ type: 'history-moved', step, history })
      }
      return
    }
    if (event.key === 'Escape' && highlighted) {
      event.preventDefault()
      dispatch({ type: 'dismissed' })
      return
    }
    if (event.key === 'Enter' && highlighted) {
      event.preventDefault()
      choose(highlighted)
    }
  }

  return (
    <section aria-label={t('terminal.label')} className="flex flex-1 flex-col">
      {banner}
      <div ref={outputRef} className="flex flex-col">
        {records.map((record) => (
          <TerminalEntry
            key={record.id}
            record={record}
            sections={sections}
            locale={locale}
            idPrefix={baseId}
            t={t}
            onRun={run}
          />
        ))}
      </div>

      <p role="status" className="sr-only">
        {latest ? describeResult(latest.result, t) : ''}
      </p>

      <div
        className={cn(
          'z-10 -mx-4 flex flex-col gap-2 border-t border-foreground bg-background px-4 py-3 sm:-mx-6 sm:px-6',
          records.length > 0 && 'sticky bottom-0',
        )}
      >
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring"
        >
          <label htmlFor={inputId} className="shrink-0 text-base text-muted-foreground">
            <span aria-hidden="true">
              <span className="hidden sm:inline">{PROMPT_HOST}:</span>~$
            </span>
            <span className="sr-only">{t('terminal.input')}</span>
          </label>
          <div className="group grid min-w-0 flex-1">
            <input
              ref={inputRef}
              id={inputId}
              type="text"
              role="combobox"
              value={prompt.input}
              onChange={(event) => dispatch({ type: 'typed', input: event.target.value })}
              onKeyDown={handleKeyDown}
              aria-expanded={highlighted !== undefined}
              aria-controls={highlighted ? listId : undefined}
              aria-activedescendant={highlighted ? optionId(highlighted) : undefined}
              aria-autocomplete="list"
              aria-describedby={prompt.input === '' ? hintId : undefined}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="go"
              className="col-start-1 row-start-1 min-h-11 w-full min-w-0 bg-transparent text-base caret-foreground outline-none caret-block"
            />
            {prompt.input === '' ? (
              <span className="pointer-events-none col-start-1 row-start-1 flex min-w-0 items-center gap-2 overflow-hidden text-base text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="bg-foreground group-focus-within:invisible motion-safe:animate-blink"
                >
                  &nbsp;
                </span>
                <span id={hintId} className="min-w-0 truncate">
                  {t('terminal.placeholder')}
                </span>
              </span>
            ) : null}
          </div>
        </form>
        {highlighted ? (
          <Suggestions
            id={listId}
            label={t('terminal.suggestions')}
            suggestions={suggestions}
            highlighted={prompt.highlighted}
            optionId={optionId}
            t={t}
            onChoose={choose}
          />
        ) : (
          <QuickCommands label={t('terminal.quick')} onRun={run} />
        )}
      </div>
    </section>
  )
}
