import Image from 'next/image'

type DitheredPortraitProps = {
  alt: string
}

const PORTRAIT = {
  size: 144,
  light: '/images/tiago-oliver-dither-light.png',
  dark: '/images/tiago-oliver-dither-dark.png',
} as const

export const DitheredPortrait = ({ alt }: DitheredPortraitProps) => (
  <span role="img" aria-label={alt} className="block size-72 shrink-0 border border-foreground">
    <Image
      src={PORTRAIT.light}
      alt=""
      width={PORTRAIT.size}
      height={PORTRAIT.size}
      unoptimized
      className="size-full render-pixelated dark:hidden"
    />
    <Image
      src={PORTRAIT.dark}
      alt=""
      width={PORTRAIT.size}
      height={PORTRAIT.size}
      unoptimized
      className="hidden size-full render-pixelated dark:block"
    />
  </span>
)
