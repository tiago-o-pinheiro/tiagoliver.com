type TechListProps = {
  items: readonly string[]
  label: string
}

export const TechList = ({ items, label }: TechListProps) => (
  <ul aria-label={label} className="flex flex-wrap gap-2">
    {items.map((item) => (
      <li
        key={item}
        className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground"
      >
        {item}
      </li>
    ))}
  </ul>
)
