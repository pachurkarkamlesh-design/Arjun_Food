'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'

interface RatingProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  showCount?: boolean
  count?: number
  readonly?: boolean
  onChange?: (value: number) => void
}

export default function Rating({
  value,
  max = 5,
  size = 'md',
  showValue = false,
  showCount = false,
  count = 0,
  readonly = true,
  onChange,
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState(0)

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  const displayValue = hoverValue || value

  const handleClick = (index: number) => {
    if (!readonly && onChange) {
      onChange(index)
    }
  }

  return (
    <div className="inline-flex items-center gap-1.5">
      <div
        className={cn('flex items-center gap-0.5', !readonly && 'cursor-pointer')}
        onMouseLeave={() => setHoverValue(0)}
      >
        {Array.from({ length: max }).map((_, index) => {
          const starValue = index + 1
          const isFilled = starValue <= displayValue
          const isPartial =
            starValue > displayValue && starValue - 1 < displayValue

          return (
            <button
              key={index}
              type="button"
              disabled={readonly}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => !readonly && setHoverValue(starValue)}
              className={cn(
                'transition-transform',
                !readonly && 'hover:scale-110 focus:outline-none'
              )}
            >
              <div className="relative">
                <Star
                  className={cn(
                    sizes[size],
                    'text-dark-200',
                    isFilled && 'text-yellow-400 fill-yellow-400',
                    !readonly && hoverValue >= starValue && 'text-yellow-400 fill-yellow-400'
                  )}
                />
                {isPartial && (
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${(displayValue % 1) * 100}%` }}
                  >
                    <Star
                      className={cn(sizes[size], 'text-yellow-400 fill-yellow-400')}
                    />
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {showValue && (
        <span className={cn('font-semibold text-dark-900', textSizes[size])}>
          {value.toFixed(1)}
        </span>
      )}

      {showCount && count > 0 && (
        <span className={cn('text-dark-500', textSizes[size])}>
          ({count})
        </span>
      )}
    </div>
  )
}

// Compact Rating Display (like Zomato)
export function RatingBadge({
  value,
  size = 'md',
}: {
  value: number
  size?: 'sm' | 'md' | 'lg'
}) {
  const getColor = (rating: number) => {
    if (rating >= 4) return 'bg-green-500'
    if (rating >= 3) return 'bg-yellow-500'
    if (rating >= 2) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const sizes = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-semibold text-white rounded-lg',
        getColor(value),
        sizes[size]
      )}
    >
      {value.toFixed(1)}
      <Star className="w-3 h-3 fill-current" />
    </span>
  )
}

// Detailed Rating Display
export function DetailedRating({
  foodRating,
  hygieneRating,
}: {
  foodRating: number
  hygieneRating: number
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-dark-600">Food Quality</span>
        <Rating value={foodRating} size="sm" showValue />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-dark-600">Hygiene</span>
        <Rating value={hygieneRating} size="sm" showValue />
      </div>
    </div>
  )
}
