import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'

describe('Card', () => {
  it('Given a composed card, should render heading, description, content and footer', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Plan</CardTitle>
          <CardDescription>Monthly billing</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Actions</CardFooter>
      </Card>,
    )

    expect(screen.getByRole('heading', { name: 'Plan' })).toBeInTheDocument()
    expect(screen.getByText('Monthly billing')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('Given a passed class, should merge it over the defaults', () => {
    render(<Card data-testid="card" className="custom p-2" />)

    expect(screen.getByTestId('card')).toHaveClass('p-2', 'custom', 'bg-card')
    expect(screen.getByTestId('card')).not.toHaveClass('p-6')
  })
})
