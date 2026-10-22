import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'

import { ThemeToggle } from './theme-toggle'

afterEach(() => {
  document.documentElement.className = ''
  localStorage.clear()
})

const renderToggle = () =>
  render(<ThemeToggle toDarkLabel="::to-dark::" toLightLabel="::to-light::" />)

describe('ThemeToggle', () => {
  it('Given the light theme, should switch to dark and offer to switch back', async () => {
    const user = userEvent.setup()
    renderToggle()

    await user.click(screen.getByRole('button', { name: '::to-dark::' }))

    expect(document.documentElement).toHaveClass('dark')
    expect(await screen.findByRole('button', { name: '::to-light::' })).toBeVisible()
  })

  it('Given the dark theme, should switch back to light and remember it', async () => {
    document.documentElement.classList.add('dark')
    const user = userEvent.setup()
    renderToggle()

    await user.click(screen.getByRole('button', { name: '::to-light::' }))

    expect(document.documentElement).not.toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('light')
  })
})
