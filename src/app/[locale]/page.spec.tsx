import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import HomePage from './page'

const renderHome = async (locale: string) =>
  render(await HomePage({ params: Promise.resolve({ locale }) }))

describe('HomePage', () => {
  it('Given the english site, should introduce Tiago and link the full CV and the PDF', async () => {
    await renderHome('en')

    expect(screen.getByRole('heading', { level: 1, name: 'Tiago Oliver' })).toBeVisible()
    expect(screen.getByRole('link', { name: /View full CV/ })).toHaveAttribute('href', '/en/resume')
    expect(screen.getByRole('link', { name: 'cv.pdf' })).toHaveAttribute('href', '/en/cv.pdf')
  })

  it('Given the spanish site, should label the terminal and the CV link in spanish', async () => {
    await renderHome('es')

    expect(screen.getByRole('combobox', { name: 'Comando' })).toBeVisible()
    expect(screen.getByText('Escribe / para ver los comandos')).toBeVisible()
    expect(screen.getByRole('link', { name: /Ver currículum completo/ })).toHaveAttribute(
      'href',
      '/es/resume',
    )
  })

  it('Given the first screen, should keep the portrait for the about output only', async () => {
    const user = userEvent.setup()
    await renderHome('en')

    expect(screen.queryByRole('img', { name: 'Portrait of Tiago Oliver' })).not.toBeInTheDocument()

    await user.type(screen.getByRole('combobox', { name: 'Command' }), 'about{Enter}')

    const about = screen.getByRole('region', { name: 'About me' })
    expect(within(about).getByRole('img', { name: 'Portrait of Tiago Oliver' })).toBeVisible()
  })
})
