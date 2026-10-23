type BulletListProps = {
  items: readonly string[]
}

export const BulletList = ({ items }: BulletListProps) => (
  <ul className="flex max-w-prose flex-col gap-1.5">
    {items.map((item) => (
      <li key={item} className="flex gap-2 text-pretty">
        <span aria-hidden="true" className="text-muted-foreground">
          ›
        </span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
)
