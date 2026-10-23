const MONOGRAM = [
  '#####..###.',
  '..#...#...#',
  '..#...#...#',
  '..#...#...#',
  '..#...#...#',
  '..#...#...#',
  '..#....###.',
] as const

const CELLS = MONOGRAM.flatMap((row, y) =>
  [...row].map((pixel, x) => ({ key: `${x}-${y}`, isInk: pixel === '#' })),
)

export const PixelMonogram = () => (
  <div aria-hidden="true" className="grid w-fit shrink-0 grid-cols-11 self-start">
    {CELLS.map((cell) => (
      <span
        key={cell.key}
        className={cell.isInk ? 'size-2 bg-foreground sm:size-3' : 'size-2 sm:size-3'}
      />
    ))}
  </div>
)
