import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

type ButtonShape = 'oval' | 'rectangle'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-bold uppercase tracking-wide transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pokedex-red focus-visible:ring-offset-2 focus-visible:ring-offset-pokedex-bg disabled:pointer-events-none disabled:opacity-50 border-[3px] border-pokedex-card-border',
  {
    variants: {
      variant: {
        default:
          'text-white [color:#ffffff] shadow-brutal hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-0.5 [background-color:#E53A3B] hover:opacity-95',
        secondary:
          'bg-pokedex-charcoal text-white shadow-brutal hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-0.5 [color:#fff]',
        outline:
          'bg-pokedex-bezel text-pokedex-text border-pokedex-charcoal shadow-brutal hover:shadow-brutal-lg',
        ghost:
          'bg-transparent border-transparent shadow-none hover:bg-pokedex-card hover:border-pokedex-card-border text-pokedex-text',
        destructive:
          'bg-red-600 text-white shadow-brutal hover:shadow-brutal-lg',
      },
      shape: {
        oval: 'rounded-[9999px]',
        rectangle: 'rounded-lg',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        default: 'h-12 px-6 text-sm',
        lg: 'h-14 px-8 text-base',
        xl: 'h-16 px-10 text-lg',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      shape: 'oval',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  shape?: ButtonShape
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, shape, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, shape, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
