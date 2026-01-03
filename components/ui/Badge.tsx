'use client'

import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'veg' | 'nonveg'
  size?: 'sm' | 'md' | 'lg'
}

export default function Badge({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full'

  const variants = {
    default: 'bg-dark-100 text-dark-700',
    primary: 'bg-primary-100 text-primary-600',
    success: 'bg-success-100 text-success-600',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-600',
    veg: 'bg-green-100 text-green-700 border border-green-300',
    nonveg: 'bg-red-100 text-red-700 border border-red-300',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  }

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </span>
  )
}

// Veg/Non-Veg Badge with icon
export function DietBadge({ isVeg }: { isVeg: boolean }) {
  return (
    <Badge variant={isVeg ? 'veg' : 'nonveg'} size="sm">
      <span
        className={cn(
          'w-3 h-3 rounded-sm border-2 mr-1.5 flex items-center justify-center',
          isVeg ? 'border-green-600' : 'border-red-600'
        )}
      >
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            isVeg ? 'bg-green-600' : 'bg-red-600'
          )}
        />
      </span>
      {isVeg ? 'Veg' : 'Non-Veg'}
    </Badge>
  )
}

// Price Range Badge
export function PriceBadge({
  priceRange,
}: {
  priceRange: 'BUDGET' | 'MODERATE' | 'PREMIUM'
}) {
  const config = {
    BUDGET: { label: 'Budget', variant: 'success' as const },
    MODERATE: { label: 'Moderate', variant: 'warning' as const },
    PREMIUM: { label: 'Premium', variant: 'primary' as const },
  }

  return (
    <Badge variant={config[priceRange].variant} size="sm">
      {config[priceRange].label}
    </Badge>
  )
}

// Open/Closed Status Badge
export function StatusBadge({ isOpen }: { isOpen: boolean }) {
  return (
    <Badge variant={isOpen ? 'success' : 'danger'} size="sm">
      <span
        className={cn(
          'w-2 h-2 rounded-full mr-1.5',
          isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'
        )}
      />
      {isOpen ? 'Open Now' : 'Closed'}
    </Badge>
  )
}
