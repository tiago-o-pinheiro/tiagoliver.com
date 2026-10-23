import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { type Locale } from '@/i18n'

import { Terminal } from './terminal'

afterEach(() => {
  document.documentElement.className = ''
  localStorage.clear()
})

const SECTIONS = {
  experience: <p>::experience::</p>,
  projects: <p>::projects::</p>,
  skills: <p>::skills::</p>,
  education: <p>::education::</p>,
  about: <p>::about::</p>,
  contact: <p>::contact::</p>,
}

const renderTerminal = (locale: Locale = 'en') =>
  render(<Terminal locale={locale} banner={<p>::banner::</p>} sections={SECTIONS} />)

const prompt = () => screen.getByRole('combobox', { name: 'Command' })

const printed = (text: string) =>
  screen.getByText(text, { ignore: 'script, style, [role="status"]' })

describe('Terminal', () => {
  it('Given a quick command clicked, should print that section and announce it', async () => {
    const user = userEvent.setup()
    renderTerminal()

    await user.click(screen.getByRole('button', { name: '/experience' }))

    expect(screen.getByRole('heading', { level: 2, name: 'Experience' })).toBeVisible()
    expect(screen.getByText('::experience::')).toBeVisible()
    expect(screen.getByRole('status')).toHaveTextContent('Showing Experience.')
  })

  it('Given an unknown command, should explain how to see the commands', async () => {
    const user = userEvent.setup()
    renderTerminal()

    await user.type(prompt(), 'sudo{Enter}')

    expect(printed('Unknown command: sudo. Type / to see commands.')).toBeVisible()
    expect(screen.getByRole('status')).toHaveTextContent('Unknown command: sudo.')
  })

  it('Given a slash, should suggest every command and run the highlighted one', async () => {
    const user = userEvent.setup()
    renderTerminal()

    await user.type(prompt(), '/')
    expect(within(screen.getByRole('listbox')).getAllByRole('option')).toHaveLength(12)
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('option', { selected: true })).toHaveTextContent('/about')
    await user.keyboard('{Enter}')

    expect(screen.getByRole('heading', { level: 2, name: 'About me' })).toBeVisible()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('Given escape, should close the suggestions and keep what was typed', async () => {
    const user = userEvent.setup()
    renderTerminal()

    await user.type(prompt(), '/s{Escape}')

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(prompt()).toHaveValue('/s')
  })

  it('Given the lang suggestion, should wait for the language and then load that page in full', async () => {
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined)
    const user = userEvent.setup()
    renderTerminal()

    await user.type(prompt(), '/la{Enter}')
    expect(prompt()).toHaveValue('/lang ')
    await user.type(prompt(), 'es{Enter}')

    expect(click.mock.contexts[0]).toHaveAttribute('href', '/es')
    expect(printed('Switching to Español…')).toBeVisible()
  })

  it('Given clear, should remove the previous output', async () => {
    const user = userEvent.setup()
    renderTerminal()

    await user.click(screen.getByRole('button', { name: '/skills' }))
    await user.type(prompt(), 'clear{Enter}')

    expect(screen.queryByText('::skills::')).not.toBeInTheDocument()
  })

  it('Given download, should start the PDF download and offer a fallback link', async () => {
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined)
    const user = userEvent.setup()
    renderTerminal()

    await user.click(screen.getByRole('button', { name: '/download' }))

    expect(click).toHaveBeenCalledOnce()
    expect(printed('Downloading Tiago-Oliver-CV-EN.pdf.')).toBeVisible()
    expect(screen.getByRole('link', { name: "Didn't start? Open the PDF" })).toHaveAttribute(
      'href',
      '/en/cv.pdf',
    )
  })

  it('Given theme, should switch to the dark theme and say so', async () => {
    const user = userEvent.setup()
    renderTerminal()

    await user.type(prompt(), '/theme{Enter}')

    expect(document.documentElement).toHaveClass('dark')
    expect(printed('Theme set to dark.')).toBeVisible()
  })

  it('Given arrow up on an empty prompt, should recall the previous command', async () => {
    const user = userEvent.setup()
    renderTerminal()

    await user.type(prompt(), 'skills{Enter}{ArrowUp}')

    expect(prompt()).toHaveValue('skills')
  })

  it('Given the help output, should run a command clicked in the list', async () => {
    const user = userEvent.setup()
    renderTerminal()

    await user.type(prompt(), 'help{Enter}')
    const help = screen.getByRole('region', { name: 'Commands' })
    await user.click(within(help).getByRole('button', { name: '/contact' }))

    expect(screen.getByRole('heading', { level: 2, name: 'Contact' })).toBeVisible()
  })

  it('Given the spanish site, should prompt and reply in spanish', async () => {
    const user = userEvent.setup()
    renderTerminal('es')

    await user.type(screen.getByRole('combobox', { name: 'Comando' }), 'xyz{Enter}')

    expect(printed('No conozco el comando «xyz». Escribe / para ver los comandos.')).toBeVisible()
  })
})
