import { type Metadata } from 'next'
import { type ReactNode } from 'react'

import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Tiago Oliver', template: '%s | Tiago Oliver' },
  description: 'Tiago Oliver, frontend developer in Barcelona. I build thoughtful digital products with React, TypeScript, and a little intelligence.',
}

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
      {children}
    </body>
  </html>
)

export default RootLayout
