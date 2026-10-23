import { cva, type VariantProps } from 'class-variance-authority'

export const textLinkVariants = cva(
  [
    'underline decoration-1 underline-offset-4 transition-colors',
    'hover:bg-foreground hover:text-background hover:no-underline',
    'focus-visible:bg-foreground focus-visible:text-background focus-visible:no-underline',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
  ],
  {
    variants: {
      tone: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
      },
      target: {
        inline: '',
        touch: 'inline-flex min-h-11 items-center',
      },
    },
    defaultVariants: { tone: 'default', target: 'inline' },
  },
)

export type TextLinkVariants = VariantProps<typeof textLinkVariants>
