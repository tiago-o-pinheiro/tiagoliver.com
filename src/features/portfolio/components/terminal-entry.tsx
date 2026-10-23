import { type ReactNode } from 'react'

import { textLinkVariants } from '@/design-system/ui/text-link'
import { type Locale, type Translator } from '@/i18n'

import { SectionFrame } from './section-frame'
import {
  cvHref,
  PROMPT_HOST,
  RESUME_SECTION_IDS,
  type ResumeSectionId,
  SECTION_TITLE_KEYS,
} from '../navigation'
import { COMMANDS } from '../terminal-commands'
import { describeResult, type TerminalRecord } from '../terminal-messages'

type TerminalEntryProps = {
  record: TerminalRecord
  sections: Readonly<Record<ResumeSectionId, ReactNode>>
  locale: Locale
  idPrefix: string
  t: Translator
  onRun: (input: string) => void
}

type EntryOutputProps = Omit<TerminalEntryProps, 'idPrefix'> & {
  anchor: string
}

type HelpOutputProps = {
  anchor: string
  t: Translator
  onRun: (input: string) => void
}

const HelpOutput = ({ anchor, t, onRun }: HelpOutputProps) => (
  <SectionFrame id={anchor} title={t('terminal.help')}>
    <dl className="flex flex-col">
      {COMMANDS.map((command) => (
        <div key={command.name} className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
          <dt className="sm:w-48 sm:shrink-0">
            {command.takesArgument ? (
              <span className="inline-flex min-h-11 items-center">{command.usage}</span>
            ) : (
              <button
                type="button"
                onClick={() => onRun(command.usage)}
                className={textLinkVariants({ target: 'touch', className: 'cursor-pointer' })}
              >
                {command.usage}
              </button>
            )}
          </dt>
          <dd className="pb-2 text-muted-foreground sm:pb-0">
            {t(`terminal.command.${command.name}`)}
          </dd>
        </div>
      ))}
    </dl>
  </SectionFrame>
)

const EntryOutput = ({ record, sections, locale, anchor, t, onRun }: EntryOutputProps) => {
  const { result } = record
  switch (result.kind) {
    case 'help':
      return <HelpOutput anchor={anchor} t={t} onRun={onRun} />
    case 'section':
      return (
        <SectionFrame
          id={`${anchor}-${result.section}`}
          title={t(SECTION_TITLE_KEYS[result.section])}
        >
          {sections[result.section]}
        </SectionFrame>
      )
    case 'all':
      return RESUME_SECTION_IDS.map((section) => (
        <SectionFrame
          key={section}
          id={`${anchor}-${section}`}
          title={t(SECTION_TITLE_KEYS[section])}
        >
          {sections[section]}
        </SectionFrame>
      ))
    case 'download':
      return (
        <div className="flex flex-col">
          <p>{describeResult(result, t)}</p>
          <a
            href={cvHref(locale)}
            download={t('cv.fileName')}
            type="application/pdf"
            className={textLinkVariants({
              tone: 'muted',
              target: 'touch',
              className: 'self-start',
            })}
          >
            {t('terminal.downloadRetry')}
          </a>
        </div>
      )
    default:
      return <p className="text-pretty">{describeResult(result, t)}</p>
  }
}

export const TerminalEntry = ({ record, idPrefix, ...props }: TerminalEntryProps) => (
  <div className="flex scroll-mt-4 flex-col gap-2 pt-6">
    <p className="break-all">
      <span aria-hidden="true" className="text-muted-foreground">
        <span className="hidden sm:inline">{PROMPT_HOST}:</span>~$&nbsp;
      </span>
      <span className="font-semibold">{record.input}</span>
    </p>
    <EntryOutput record={record} anchor={`${idPrefix}-${record.id}`} {...props} />
  </div>
)
