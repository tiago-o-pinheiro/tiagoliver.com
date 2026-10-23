import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps } from 'react'

import { cn } from '../lib/cn'

export const buttonVariants = cva(
  [
    'inline-flex min-w-11 cursor-pointer items-center justify-center gap-2 border font-mono font-medium transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    'disabled:cursor-not-allowed disabled:opacity-60',
  ],
  {
    variants: {
      variant: {
        primary:
          'border-foreground bg-foreground text-background hover:bg-background hover:text-foreground',
        secondary:
          'border-border bg-secondary text-secondary-foreground hover:border-foreground hover:bg-foreground hover:text-background',
        outline:
          'border-border-strong bg-transparent text-foreground hover:bg-foreground hover:text-background',
        ghost:
          'border-transparent bg-transparent text-foreground hover:bg-foreground hover:text-background',
        destructive:
          'border-danger bg-danger text-danger-foreground hover:bg-background hover:text-foreground',
      },
      size: {
        sm: 'min-h-11 px-3 text-sm',
        md: 'min-h-12 px-4 text-sm',
        lg: 'min-h-12 px-5 text-base',
        icon: 'size-11 p-0',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean
    loadingLabel?: string
  }

export const Button = ({
  variant,
  size,
  isLoading = false,
  loadingLabel = 'Loading',
  type = 'button',
  className,
  disabled,
  children,
  ...props
}: ButtonProps) => (
  <button
    type={type}
    disabled={disabled || isLoading}
    aria-busy={isLoading || undefined}
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
  >
    {isLoading ? (
      <span
        aria-hidden="true"
        className="size-4 animate-spin border-2 border-current border-t-transparent motion-reduce:animate-none"
      />
    ) : null}
    {children}
    {isLoading ? <span className="sr-only">{loadingLabel}</span> : null}
  </button>
)
