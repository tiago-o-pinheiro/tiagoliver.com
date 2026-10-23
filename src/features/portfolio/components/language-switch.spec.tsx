import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LanguageSwitch } from './language-switch'

describe('LanguageSwitch', () => {
  it('Given the spanish site, should mark spanish as current and link to english', () => {
    render(<LanguageSwitch locale="es" label="::language::" path="" />)

    expect(screen.getByRole('link', { name: 'Español' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'English' })).toHaveAttribute('href', '/en')
    expect(screen.getByRole('link', { name: 'English' })).not.toHaveAttribute('aria-current')
  })

  it('Given the full CV page, should keep the visitor on the CV in the other language', () => {
    render(<LanguageSwitch locale="en" label="::language::" path="/resume" />)

    expect(screen.getByRole('link', { name: 'Español' })).toHaveAttribute('href', '/es/resume')
  })
})
