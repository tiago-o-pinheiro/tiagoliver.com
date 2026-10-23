import { describe, expect, it } from 'vitest'

import { INITIAL_PROMPT, type PromptState, promptReducer } from './terminal-prompt'

const mockPrompt = (overrides: Partial<PromptState> = {}): PromptState => ({
  ...INITIAL_PROMPT,
  ...overrides,
})

const HISTORY = ['::first::', '::second::']

describe('promptReducer', () => {
  it('Given a slash typed, should open the suggestions on the first one', () => {
    const prompt = promptReducer(mockPrompt({ highlighted: 3 }), { type: 'typed', input: '/' })

    expect(prompt).toEqual(mockPrompt({ input: '/', isSuggesting: true }))
  })

  it('Given plain text typed, should keep the suggestions closed', () => {
    const prompt = promptReducer(mockPrompt(), { type: 'typed', input: 'help' })

    expect(prompt.isSuggesting).toBe(false)
  })

  it('Given the last suggestion highlighted, should wrap to the first one', () => {
    const prompt = promptReducer(mockPrompt({ highlighted: 2 }), {
      type: 'highlight-moved',
      step: 1,
      total: 3,
    })

    expect(prompt.highlighted).toBe(0)
  })

  it('Given the first suggestion highlighted, should wrap up to the last one', () => {
    const prompt = promptReducer(mockPrompt(), { type: 'highlight-moved', step: -1, total: 3 })

    expect(prompt.highlighted).toBe(2)
  })

  it('Given escape, should close the suggestions and keep the input', () => {
    const prompt = promptReducer(mockPrompt({ input: '/s', isSuggesting: true }), {
      type: 'dismissed',
    })

    expect(prompt).toEqual(mockPrompt({ input: '/s' }))
  })

  it('Given a command that needs a language, should fill it in and wait', () => {
    const prompt = promptReducer(mockPrompt({ input: '/la', isSuggesting: true }), {
      type: 'completed',
      input: '/lang ',
    })

    expect(prompt).toEqual(mockPrompt({ input: '/lang ' }))
  })

  it('Given arrow up on an empty prompt, should recall the latest command', () => {
    const prompt = promptReducer(mockPrompt(), {
      type: 'history-moved',
      step: -1,
      history: HISTORY,
    })

    expect(prompt).toEqual(mockPrompt({ input: '::second::', historyIndex: 1 }))
  })

  it('Given the oldest command recalled, should stay on it', () => {
    const prompt = promptReducer(mockPrompt({ input: '::first::', historyIndex: 0 }), {
      type: 'history-moved',
      step: -1,
      history: HISTORY,
    })

    expect(prompt).toEqual(mockPrompt({ input: '::first::', historyIndex: 0 }))
  })

  it('Given arrow down past the latest command, should return to an empty prompt', () => {
    const prompt = promptReducer(mockPrompt({ input: '::second::', historyIndex: 1 }), {
      type: 'history-moved',
      step: 1,
      history: HISTORY,
    })

    expect(prompt).toEqual(INITIAL_PROMPT)
  })

  it('Given no history, should leave the prompt untouched', () => {
    const prompt = promptReducer(mockPrompt(), { type: 'history-moved', step: -1, history: [] })

    expect(prompt).toEqual(INITIAL_PROMPT)
  })

  it('Given a submitted command, should reset the prompt', () => {
    const prompt = promptReducer(mockPrompt({ input: '/all', isSuggesting: true }), {
      type: 'submitted',
    })

    expect(prompt).toEqual(INITIAL_PROMPT)
  })
})
