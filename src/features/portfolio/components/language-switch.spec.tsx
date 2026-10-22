import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LanguageSwitch } from './language-switch'

describe('LanguageSwitch', () => {
  it('Given the spanish site, should mark spanish as current and link to english', () => {
    render(<LanguageSwitch locale="es" label="::language::" />)

    expect(screen.getByRole('link', { name: 'Español' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'English' })).toHaveAttribute('href', '/en')
    expect(screen.getByRole('link', { name: 'English' })).not.toHaveAttribute('aria-current')
  })
})
