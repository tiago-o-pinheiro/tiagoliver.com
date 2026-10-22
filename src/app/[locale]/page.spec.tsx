import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import HomePage from './page'

const renderHome = async (locale: string) =>
  render(await HomePage({ params: Promise.resolve({ locale }) }))

describe('HomePage', () => {
  it('Given the english site, should lead with the role statement and offer the english CV', async () => {
    await renderHome('en')

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'I build product interfaces with React and TypeScript',
    )
    for (const link of screen.getAllByRole('link', { name: /Download CV/ })) {
      expect(link).toHaveAttribute('href', '/en/cv.pdf')
    }
  })

  it('Given the spanish site, should render every section in order and in spanish', async () => {
    await renderHome('es')

    expect(
      screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent),
    ).toEqual([
      'Experiencia',
      'Proyectos',
      'Habilidades',
      'Formación e idiomas',
      'Sobre mí',
      'Contacto',
    ])
    expect(screen.getAllByRole('link', { name: /Descargar CV/ })[0]).toHaveAttribute(
      'href',
      '/es/cv.pdf',
    )
  })

  it('Given the about section, should show the portrait outside the hero', async () => {
    await renderHome('en')

    const portrait = screen.getByRole('img', { name: 'Portrait of Tiago Oliver' })

    expect(portrait.closest('section')).toHaveAttribute('id', 'about')
  })
})
