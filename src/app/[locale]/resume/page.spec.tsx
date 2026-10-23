import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import ResumePage, { generateMetadata } from './page'

const renderResume = async (locale: string) =>
  render(await ResumePage({ params: Promise.resolve({ locale }) }))

describe('ResumePage', () => {
  it('Given the spanish CV, should render every section in order and in spanish', async () => {
    await renderResume('es')

    expect(
      screen
        .getAllByRole('heading', { level: 2 })
        .map((heading) => heading.querySelector('span:not([aria-hidden])')?.textContent),
    ).toEqual([
      'Experiencia',
      'Proyectos',
      'Conocimientos técnicos',
      'Formación e idiomas',
      'Sobre mí',
      'Contacto',
    ])
  })

  it('Given the english CV, should offer the PDF and a way back to the terminal', async () => {
    await renderResume('en')

    expect(screen.getAllByRole('link', { name: /Download CV/ })[0]).toHaveAttribute(
      'href',
      '/en/cv.pdf',
    )
    expect(screen.getByRole('link', { name: 'Back to the terminal' })).toHaveAttribute(
      'href',
      '/en',
    )
  })

  it('Given the about section, should show the portrait there and nowhere else', async () => {
    await renderResume('en')

    const portrait = screen.getByRole('img', { name: 'Portrait of Tiago Oliver' })

    expect(portrait.closest('section')).toHaveAttribute('id', 'about')
  })

  it('Given the spanish CV, should declare its own canonical address', async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ locale: 'es' }) })

    expect(metadata.alternates?.canonical).toBe('/es/resume')
    expect(metadata.title).toBe('Currículum completo — Tiago Oliver')
  })
})
