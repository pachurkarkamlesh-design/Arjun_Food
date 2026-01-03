'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  SlidersHorizontal,
  X,
  Star,
  MapPin,
  ChevronDown,
  RotateCcw,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import type { CuisineType, PriceRange, MessFilters } from '@/types'

const CUISINES: { id: CuisineType; label: string; emoji: string }[] = [
  { id: 'NORTH_INDIAN', label: 'North Indian', emoji: '🍛' },
  { id: 'SOUTH_INDIAN', label: 'South Indian', emoji: '🥘' },
  { id: 'MAHARASHTRIAN', label: 'Maharashtrian', emoji: '🍲' },
  { id: 'CHINESE', label: 'Chinese', emoji: '🥡' },
  { id: 'GUJARATI', label: 'Gujarati', emoji: '🥙' },
  { id: 'PUNJABI', label: 'Punjabi', emoji: '🧈' },
  { id: 'MULTI_CUISINE', label: 'Multi Cuisine', emoji: '🍽️' },
]

const PRICE_RANGES: { id: PriceRange; label: string; desc: string }[] = [
  { id: 'BUDGET', label: '₹', desc: 'Under ₹2500' },
  { id: 'MODERATE', label: '₹₹', desc: '₹2500 - ₹3500' },
  { id: 'PREMIUM', label: '₹₹₹', desc: 'Above ₹3500' },
]

const RATING_OPTIONS = [4, 3, 2]

const SORT_OPTIONS = [
  { id: 'distance', label: 'Nearest First' },
  { id: 'rating', label: 'Top Rated' },
  { id: 'price_low', label: 'Price: Low to High' },
  { id: 'price_high', label: 'Price: High to Low' },
]

interface FilterSidebarProps {
  filters: MessFilters
  onFilterChange: (filters: MessFilters) => void
  onReset: () => void
  isOpen?: boolean
  onClose?: () => void
}

export function FilterSidebar({
  filters,
  onFilterChange,
  onReset,
  isOpen = true,
  onClose,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    cuisine: true,
    price: true,
    rating: true,
    dietary: true,
    sort: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleCuisineToggle = (cuisine: CuisineType) => {
    const current = filters.cuisine || []
    const updated = current.includes(cuisine)
      ? current.filter((c) => c !== cuisine)
      : [...current, cuisine]
    onFilterChange({ ...filters, cuisine: updated })
  }

  const handlePriceToggle = (price: PriceRange) => {
    const current = filters.priceRange || []
    const updated = current.includes(price)
      ? current.filter((p) => p !== price)
      : [...current, price]
    onFilterChange({ ...filters, priceRange: updated })
  }

  const activeFilterCount =
    (filters.cuisine?.length || 0) +
    (filters.priceRange?.length || 0) +
    (filters.rating ? 1 : 0) +
    (filters.isVeg ? 1 : 0) +
    (filters.isNonVeg ? 1 : 0) +
    (filters.isOpen ? 1 : 0)

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-primary-500" />
          <h2 className="font-display font-semibold text-lg">Filters</h2>
          {activeFilterCount > 0 && (
            <Badge variant="primary" size="sm">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={onReset}
              className="text-sm text-dark-500 hover:text-primary-500 flex items-center gap-1"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-lg hover:bg-dark-100"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Sort */}
      <FilterSection
        title="Sort By"
        isExpanded={expandedSections.sort}
        onToggle={() => toggleSection('sort')}
      >
        <div className="space-y-2">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => onFilterChange({ ...filters, sortBy: option.id as MessFilters['sortBy'] })}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                filters.sortBy === option.id
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'hover:bg-dark-50 text-dark-600'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Cuisine */}
      <FilterSection
        title="Cuisine"
        isExpanded={expandedSections.cuisine}
        onToggle={() => toggleSection('cuisine')}
      >
        <div className="flex flex-wrap gap-2">
          {CUISINES.map((cuisine) => (
            <button
              key={cuisine.id}
              onClick={() => handleCuisineToggle(cuisine.id)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm transition-all flex items-center gap-1',
                filters.cuisine?.includes(cuisine.id)
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-100 text-dark-600 hover:bg-dark-200'
              )}
            >
              <span>{cuisine.emoji}</span>
              <span>{cuisine.label}</span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection
        title="Price Range"
        isExpanded={expandedSections.price}
        onToggle={() => toggleSection('price')}
      >
        <div className="space-y-2">
          {PRICE_RANGES.map((price) => (
            <button
              key={price.id}
              onClick={() => handlePriceToggle(price.id)}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors',
                filters.priceRange?.includes(price.id)
                  ? 'bg-primary-50 text-primary-600'
                  : 'hover:bg-dark-50 text-dark-600'
              )}
            >
              <span className="font-medium">{price.label}</span>
              <span className="text-sm text-dark-400">{price.desc}</span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection
        title="Minimum Rating"
        isExpanded={expandedSections.rating}
        onToggle={() => toggleSection('rating')}
      >
        <div className="flex gap-2">
          {RATING_OPTIONS.map((rating) => (
            <button
              key={rating}
              onClick={() =>
                onFilterChange({
                  ...filters,
                  rating: filters.rating === rating ? undefined : rating,
                })
              }
              className={cn(
                'flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors',
                filters.rating === rating
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-100 text-dark-600 hover:bg-dark-200'
              )}
            >
              <Star className="h-4 w-4 fill-current" />
              <span>{rating}+</span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Dietary */}
      <FilterSection
        title="Dietary"
        isExpanded={expandedSections.dietary}
        onToggle={() => toggleSection('dietary')}
      >
        <div className="space-y-2">
          <button
            onClick={() => onFilterChange({ ...filters, isVeg: !filters.isVeg })}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
              filters.isVeg
                ? 'bg-green-50 text-green-700'
                : 'hover:bg-dark-50 text-dark-600'
            )}
          >
            <span className="w-4 h-4 rounded-sm border-2 border-green-600 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-green-600" />
            </span>
            <span>Pure Veg</span>
          </button>
          <button
            onClick={() => onFilterChange({ ...filters, isNonVeg: !filters.isNonVeg })}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
              filters.isNonVeg
                ? 'bg-red-50 text-red-700'
                : 'hover:bg-dark-50 text-dark-600'
            )}
          >
            <span className="w-4 h-4 rounded-sm border-2 border-red-600 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-red-600" />
            </span>
            <span>Non-Veg Available</span>
          </button>
          <button
            onClick={() => onFilterChange({ ...filters, isOpen: !filters.isOpen })}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
              filters.isOpen
                ? 'bg-primary-50 text-primary-600'
                : 'hover:bg-dark-50 text-dark-600'
            )}
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Open Now</span>
          </button>
        </div>
      </FilterSection>
    </div>
  )

  // Mobile drawer
  if (!isOpen && onClose) {
    return null
  }

  if (onClose) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 overflow-y-auto p-6 lg:hidden"
            >
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }

  return <div className="bg-white rounded-2xl p-6 shadow-card">{content}</div>
}

// Filter Section Component
function FilterSection({
  title,
  isExpanded,
  onToggle,
  children,
}: {
  title: string
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-t border-dark-100 pt-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between mb-3"
      >
        <span className="font-medium text-dark-900">{title}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-dark-400 transition-transform',
            isExpanded && 'rotate-180'
          )}
        />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Search Bar Component
interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onLocationClick?: () => void
  placeholder?: string
}

export function SearchBar({
  value,
  onChange,
  onLocationClick,
  placeholder = 'Search by name, area, or cuisine...',
}: SearchBarProps) {
  return (
    <div className="relative flex gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          leftIcon={<Search className="h-5 w-5" />}
          className="h-12 pl-12 pr-4"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-dark-100"
          >
            <X className="h-4 w-4 text-dark-400" />
          </button>
        )}
      </div>
      {onLocationClick && (
        <Button
          variant="outline"
          size="icon"
          onClick={onLocationClick}
          className="h-12 w-12"
        >
          <MapPin className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
