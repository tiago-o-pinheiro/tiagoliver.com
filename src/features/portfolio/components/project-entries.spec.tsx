import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { getTranslator } from '@/i18n'
import { type Models } from '@/models'

import { ProjectEntries } from './project-entries'

const project: Models.Project = {
  id: 'journal',
  name: 'Journal',
  category: 'Web app',
  status: 'Live',
  tagline: 'A journal',
  summary: 'A journal you host yourself.',
  highlights: ['Publishes posts.'],
  technologies: ['Next.js'],
  link: { label: 'journal.example.com', href: 'https://journal.example.com' },
}

const source = { label: 'github.com/someone/journal', href: 'https://github.com/someone/journal' }

describe('ProjectEntries', () => {
  it('Given a project with public source code, should link to its site and its source', () => {
    render(<ProjectEntries projects={[{ ...project, source }]} t={getTranslator('en')} />)

    expect(screen.getByRole('link', { name: 'journal.example.com' })).toHaveAttribute(
      'href',
      'https://journal.example.com',
    )
    expect(screen.getByRole('link', { name: 'github.com/someone/journal' })).toHaveAttribute(
      'href',
      'https://github.com/someone/journal',
    )
    expect(screen.getByText('source')).toBeInTheDocument()
  })

  it('Given a project without public source code, should show only its link', () => {
    render(<ProjectEntries projects={[project]} t={getTranslator('es')} />)

    expect(screen.getAllByRole('link')).toHaveLength(1)
    expect(screen.queryByText('código')).not.toBeInTheDocument()
  })
})
