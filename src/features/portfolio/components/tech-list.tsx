import { FieldLine } from './field-line'

type TechListProps = {
  items: readonly string[]
  label: string
}

export const TechList = ({ items, label }: TechListProps) =>
  items.length > 0 ? <FieldLine label={label}>{items.join(' · ')}</FieldLine> : null
