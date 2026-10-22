import { afterEach, describe, expect, it } from 'vitest'

import { applyTheme, isDarkTheme, subscribeToTheme } from './theme'

afterEach(() => {
  document.documentElement.className = ''
  localStorage.clear()
})

describe('theme', () => {
  it('Given the dark theme is applied, should mark the document and remember the choice', () => {
    applyTheme('dark')

    expect(isDarkTheme()).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('Given the light theme is applied after the dark one, should clear the dark marker', () => {
    applyTheme('dark')
    applyTheme('light')

    expect(isDarkTheme()).toBe(false)
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('Given a subscriber, should notify it when the theme changes', async () => {
    const changes: boolean[] = []
    const unsubscribe = subscribeToTheme(() => changes.push(isDarkTheme()))

    applyTheme('dark')
    await Promise.resolve()
    unsubscribe()

    expect(changes).toEqual([true])
  })
})
