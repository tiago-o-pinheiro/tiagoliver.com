export type PromptState = {
  readonly input: string
  readonly highlighted: number
  readonly isSuggesting: boolean
  readonly historyIndex: number | null
}

export type HistoryStep = -1 | 1

export type PromptAction =
  | { readonly type: 'typed'; readonly input: string }
  | { readonly type: 'highlight-moved'; readonly step: HistoryStep; readonly total: number }
  | { readonly type: 'dismissed' }
  | { readonly type: 'completed'; readonly input: string }
  | {
      readonly type: 'history-moved'
      readonly step: HistoryStep
      readonly history: readonly string[]
    }
  | { readonly type: 'submitted' }

export const INITIAL_PROMPT: PromptState = {
  input: '',
  highlighted: 0,
  isSuggesting: false,
  historyIndex: null,
}

const recall = (state: PromptState, step: HistoryStep, history: readonly string[]): PromptState => {
  if (step === -1) {
    const index = Math.max((state.historyIndex ?? history.length) - 1, 0)
    const input = history[index]
    return input === undefined ? state : { ...INITIAL_PROMPT, input, historyIndex: index }
  }
  if (state.historyIndex === null) {
    return state
  }
  const index = state.historyIndex + 1
  const input = history[index]
  return input === undefined ? INITIAL_PROMPT : { ...INITIAL_PROMPT, input, historyIndex: index }
}

export const promptReducer = (state: PromptState, action: PromptAction): PromptState => {
  switch (action.type) {
    case 'typed':
      return { ...INITIAL_PROMPT, input: action.input, isSuggesting: action.input.startsWith('/') }
    case 'highlight-moved':
      return action.total === 0
        ? state
        : { ...state, highlighted: (state.highlighted + action.step + action.total) % action.total }
    case 'dismissed':
      return { ...state, isSuggesting: false }
    case 'completed':
      return { ...INITIAL_PROMPT, input: action.input }
    case 'history-moved':
      return recall(state, action.step, action.history)
    case 'submitted':
      return INITIAL_PROMPT
    default:
      return action satisfies never
  }
}
