import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useParams } from 'next/navigation'
import { describe, expect, it, vi } from 'vitest'

import ErrorPage from './error'

vi.mock('next/navigation', () => ({ useParams: vi.fn() }))

describe('ErrorPage', () => {
  it('Given a failure on the english site, should explain it in plain language and offer a retry', async () => {
    vi.mocked(useParams).mockReturnValue({ locale: 'en' })
    const user = userEvent.setup()
    const reset = vi.fn()
    render(<ErrorPage reset={reset} />)

    await user.click(screen.getByRole('button', { name: 'Retry' }))

    expect(screen.getByRole('heading', { name: "This page couldn't load" })).toBeVisible()
    expect(reset).toHaveBeenCalledOnce()
  })

  it('Given a failure on the spanish site, should explain it in spanish', () => {
    vi.mocked(useParams).mockReturnValue({ locale: 'es' })
    render(<ErrorPage reset={vi.fn()} />)

    expect(screen.getByRole('heading', { name: 'No se ha podido cargar la página' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Reintentar' })).toBeVisible()
  })

  it('Given an unknown locale, should fall back to english', () => {
    vi.mocked(useParams).mockReturnValue({ locale: '::locale::' })
    render(<ErrorPage reset={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'Retry' })).toBeVisible()
  })
})
