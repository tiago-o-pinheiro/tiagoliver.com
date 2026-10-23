import { type ReactNode } from 'react'

type FieldLineProps = {
  label: string
  children: ReactNode
}

export const FieldLine = ({ label, children }: FieldLineProps) => (
  <p className="flex gap-3 text-sm">
    <span className="w-24 shrink-0 text-muted-foreground">{label}</span>
    <span className="min-w-0 text-pretty">{children}</span>
  </p>
)
