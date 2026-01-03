'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { formatDistance, formatPrice, isMessOpen, parseStringArray } from '@/lib/utils'
import { CUISINE_ICONS } from '@/lib/constants'
import { RatingBadge } from '@/components/ui/Rating'
import { DietBadge, StatusBadge, PriceBadge } from '@/components/ui/Badge'
import type { Mess } from '@/types'
import {
  Heart,
  MapPin,
  Clock,
  Phone,
  ChevronRight,
  Utensils,
} from 'lucide-react'

interface MessCardProps {
  mess: Mess
  distance?: number
  todayMenu?: string
  variant?: 'default' | 'compact' | 'horizontal'
  showFavorite?: boolean
  isFavorite?: boolean
  onFavoriteToggle?: () => void
}

export function MessCard({
  mess,
  distance,
  todayMenu,
  variant = 'default',
  showFavorite = true,
  isFavorite = false,
  onFavoriteToggle,
}: MessCardProps) {
  const [imageError, setImageError] = useState(false)
  const photos = parseStringArray(mess.photos)
  const cuisines = parseStringArray(mess.cuisineTypes)
  const isOpen = isMessOpen(mess.openTime, mess.closeTime)

  const mainImage = photos[0] || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800'

  if (variant === 'horizontal') {
    return (
      <Link href={`/mess/${mess.id}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
        >
          {/* Image */}
          <div className="relative w-32 sm:w-40 flex-shrink-0">
            <Image
              src={imageError ? 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800' : mainImage}
              alt={mess.name}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-dark-900 line-clamp-1">
                  {mess.name}
                </h3>
                <p className="text-sm text-dark-500 line-clamp-1">
                  {cuisines.map(c => CUISINE_ICONS[c] || '🍽️').join(' ')} {cuisines.join(', ')}
                </p>
              </div>
              <RatingBadge value={mess.avgRating || 4.0} size="sm" />
            </div>

            <div className="flex items-center gap-3 mt-2 text-xs text-dark-500">
              {distance !== undefined && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {formatDistance(distance)}
                </span>
              )}
              <span className="flex items-center gap-1">
                {formatPrice(mess.monthlyPrice || 0)}/month
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={`/mess/${mess.id}`}>
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
        >
          <div className="relative h-32">
            <Image
              src={imageError ? 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800' : mainImage}
              alt={mess.name}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
            <div className="absolute top-2 right-2">
              <RatingBadge value={mess.avgRating || 4.0} size="sm" />
            </div>
          </div>
          <div className="p-3">
            <h3 className="font-semibold text-dark-900 text-sm line-clamp-1">
              {mess.name}
            </h3>
            <p className="text-xs text-dark-500 mt-1">
              {formatPrice(mess.monthlyPrice || 0)}/month
            </p>
          </div>
        </motion.div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link href={`/mess/${mess.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group"
      >
        {/* Image Section */}
        <div className="relative aspect-[16/10]">
          <Image
            src={imageError ? 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800' : mainImage}
            alt={mess.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
            <div className="flex gap-2">
              {mess.isFeatured && (
                <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-semibold rounded-lg">
                  Featured
                </span>
              )}
              <StatusBadge isOpen={isOpen} />
            </div>
            
            {showFavorite && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onFavoriteToggle?.()
                }}
                className={cn(
                  'p-2 rounded-full backdrop-blur-sm transition-all',
                  isFavorite
                    ? 'bg-primary-500 text-white'
                    : 'bg-white/80 text-dark-600 hover:bg-white hover:text-primary-500'
                )}
              >
                <Heart
                  className={cn('w-5 h-5', isFavorite && 'fill-current')}
                />
              </button>
            )}
          </div>

          {/* Bottom info on image */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-white font-bold text-lg line-clamp-1 drop-shadow-lg">
                  {mess.name}
                </h3>
                <p className="text-white/80 text-sm line-clamp-1">
                  {mess.locality}
                </p>
              </div>
              <RatingBadge value={mess.avgRating || 4.0} />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Cuisine & Diet */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            {cuisines.slice(0, 2).map((cuisine) => (
              <span
                key={cuisine}
                className="inline-flex items-center gap-1 px-2 py-1 bg-dark-50 rounded-lg text-xs text-dark-600"
              >
                {CUISINE_ICONS[cuisine] || '🍽️'} {cuisine.replace('_', ' ')}
              </span>
            ))}
            {mess.isVeg && <DietBadge isVeg={true} />}
            {mess.isNonVeg && !mess.isVeg && <DietBadge isVeg={false} />}
          </div>

          {/* Quick Info */}
          <div className="flex items-center gap-4 text-sm text-dark-500 mb-3">
            {distance !== undefined && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-primary-500" />
                {formatDistance(distance)}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-primary-500" />
              {mess.openTime} - {mess.closeTime}
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-center justify-between pt-3 border-t border-dark-100">
            <div>
              <p className="text-xs text-dark-500">Starting from</p>
              <p className="text-lg font-bold text-dark-900">
                {formatPrice(mess.monthlyPrice || 0)}
                <span className="text-sm font-normal text-dark-500">/month</span>
              </p>
            </div>
            {mess.perMealPrice && (
              <div className="text-right">
                <p className="text-xs text-dark-500">Per meal</p>
                <p className="text-sm font-semibold text-dark-700">
                  {formatPrice(mess.perMealPrice)}
                </p>
              </div>
            )}
          </div>

          {/* Today's Menu Teaser */}
          {todayMenu && (
            <div className="mt-3 pt-3 border-t border-dark-100">
              <div className="flex items-center gap-2 text-sm">
                <Utensils className="w-4 h-4 text-primary-500" />
                <span className="text-dark-500">Today:</span>
                <span className="text-dark-700 line-clamp-1 flex-1">
                  {todayMenu}
                </span>
              </div>
            </div>
          )}

          {/* View Details */}
          <div className="mt-4 flex items-center justify-center gap-1 text-primary-500 text-sm font-medium group-hover:gap-2 transition-all">
            View Details
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

// Compact version for list views
export function MessCardCompact({
  mess,
  distance,
}: {
  mess: Mess
  distance?: number
}) {
  return <MessCard mess={mess} distance={distance} variant="horizontal" />
}

export default MessCard
