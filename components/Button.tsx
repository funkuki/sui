import type { ComponentPropsWithoutRef, ElementType } from 'react'

type Variant = 'primary' | 'secondary'
type Size = 'sm' | 'md'

type ButtonOwnProps<T extends ElementType> = {
  as?: T
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

type ButtonProps<T extends ElementType> = ButtonOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>

const base =
  'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0'

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white border border-primary hover:bg-fg',
  secondary: 'bg-transparent text-fg border border-fg hover:bg-fg hover:text-white',
}

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-7 py-3 text-sm',
}

export default function Button<T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: ButtonProps<T>) {
  const Tag = (as ?? 'button') as ElementType
  return (
    <Tag
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
