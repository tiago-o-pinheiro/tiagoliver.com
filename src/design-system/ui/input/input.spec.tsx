import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Input } from './input'

describe('Input', () => {
  it('Given typing, should keep the typed value', async () => {
    const user = userEvent.setup()
    render(<Input aria-label="Email" />)

    await user.type(screen.getByLabelText('Email'), '::value::')

    expect(screen.getByLabelText('Email')).toHaveValue('::value::')
  })

  it('Given the disabled prop, should reject typing', async () => {
    const user = userEvent.setup()
    render(<Input aria-label="Email" disabled />)

    await user.type(screen.getByLabelText('Email'), '::value::')

    expect(screen.getByLabelText('Email')).toHaveValue('')
  })

  it('Given no type, should default to text', () => {
    render(<Input aria-label="Email" />)

    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'text')
  })

  it('Given a type, should apply it', () => {
    render(<Input aria-label="Email" type="email" />)

    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')
  })
})
