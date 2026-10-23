import { describe, expect, it } from 'vitest'

import { parseCommand, suggestCommands } from './terminal-commands'

describe('parseCommand', () => {
  it.each([
    ['/experience', { kind: 'section', section: 'experience' }],
    ['experience', { kind: 'section', section: 'experience' }],
    ['  /SKILLS  ', { kind: 'section', section: 'skills' }],
    ['/all', { kind: 'all' }],
    ['/download', { kind: 'download' }],
    ['/theme', { kind: 'theme' }],
    ['/clear', { kind: 'clear' }],
  ])('Given %j, should resolve the matching command', (input, command) => {
    expect(parseCommand(input)).toEqual(command)
  })

  it.each(['/', '/help', 'help', 'ls', '?'])(
    'Given the help alias %j, should list the commands',
    (input) => {
      expect(parseCommand(input)).toEqual({ kind: 'help' })
    },
  )

  it.each(['clear', 'cls'])('Given the clear alias %j, should clear the screen', (input) => {
    expect(parseCommand(input)).toEqual({ kind: 'clear' })
  })

  it('Given blank input, should do nothing', () => {
    expect(parseCommand('   ')).toEqual({ kind: 'empty' })
  })

  it('Given an unknown command, should echo it back as typed', () => {
    expect(parseCommand('/sudo rm')).toEqual({ kind: 'unknown', command: '/sudo' })
  })

  it('Given words inherited from objects, should treat them as unknown', () => {
    expect(parseCommand('constructor')).toEqual({ kind: 'unknown', command: 'constructor' })
  })

  it('Given a supported language, should switch to it', () => {
    expect(parseCommand('/lang ES')).toEqual({ kind: 'lang', locale: 'es' })
  })

  it.each(['/lang', '/lang fr'])('Given %j, should explain how to use lang', (input) => {
    expect(parseCommand(input)).toEqual({ kind: 'usage', usage: '/lang en|es' })
  })
})

describe('suggestCommands', () => {
  it('Given a lone slash, should offer every command', () => {
    expect(suggestCommands('/')).toHaveLength(12)
  })

  it('Given a prefix, should offer the commands that start with it', () => {
    expect(suggestCommands('/s').map((command) => command.name)).toEqual(['skills'])
  })

  it('Given the lang prefix, should flag that it needs a language', () => {
    expect(suggestCommands('/la')).toEqual([
      { name: 'lang', usage: '/lang en|es', takesArgument: true },
    ])
  })

  it.each(['experience', '/lang ', ''])('Given %j, should offer nothing', (input) => {
    expect(suggestCommands(input)).toEqual([])
  })
})
