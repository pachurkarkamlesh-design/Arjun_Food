'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { Map, List, SlidersHorizontal, Loader2 } from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'
import Button from '@/components/ui/Button'
import { MessCardSkeleton } from '@/components/ui/Skeleton'
import { MessCard, MessCardCompact } from '@/components/mess/MessCard'
import { FilterSidebar, SearchBar, MessMapPlaceholder } from '@/components/discover'
import { cn, calculateDistance } from '@/lib/utils'
import type { Mess, MessFilters } from '@/types'

// Dynamic import for map (client-side only)
const MessMap = dynamic(
  () => import('@/components/discover/MessMap').then((mod) => mod.MessMap),
  { ssr: false, loading: () => <MessMapPlaceholder /> }
)

function DiscoverContent() {
  const searchParams = useSearchParams()
  
  const [messes, setMesses] = useState<Mess[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedMess, setSelectedMess] = useState<Mess | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  
  const [filters, setFilters] = useState<MessFilters>({
    search: searchParams.get('search') || '',
    cuisine: searchParams.get('cuisine')?.split(',').filter(Boolean) as MessFilters['cuisine'],
    sortBy: 'rating',
  })

  // Get user location
  useEffect(() => {
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    
    if (lat && lng) {
      setUserLocation({ lat: parseFloat(lat), lng: parseFloat(lng) })
    } else if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          })
        },
        () => {
          // Default to Pune center
          setUserLocation({ lat: 18.5204, lng: 73.8567 })
        }
      )
    }
  }, [searchParams])

  // Fetch messes
  const fetchMesses = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.search) params.set('search', filters.search)
      if (filters.cuisine?.length) params.set('cuisine', filters.cuisine.join(','))
      if (filters.priceRange?.length) params.set('priceRange', filters.priceRange.join(','))
      if (filters.rating) params.set('rating', filters.rating.toString())
      if (filters.isVeg) params.set('isVeg', 'true')
      if (filters.isNonVeg) params.set('isNonVeg', 'true')
      if (filters.isOpen) params.set('isOpen', 'true')
      if (filters.sortBy) params.set('sortBy', filters.sortBy)
      if (userLocation) {
        params.set('lat', userLocation.lat.toString())
        params.set('lng', userLocation.lng.toString())
      }

      const res = await fetch(`/api/mess?${params.toString()}`)
      const data = await res.json()

      if (data.mess) {
        // Calculate distance for each mess
        let messesWithDistance = data.mess.map((mess: Mess) => ({
          ...mess,
          id: mess._id || mess.id,
          distance: userLocation
            ? calculateDistance(
                userLocation.lat,
                userLocation.lng,
                mess.latitude,
                mess.longitude
              )
            : undefined,
        }))

        // Sort by distance if that's the selected sort option
        if (filters.sortBy === 'distance' && userLocation) {
          messesWithDistance.sort((a: Mess, b: Mess) => (a.distance || 0) - (b.distance || 0))
        }

        setMesses(messesWithDistance)
      }
    } catch (error) {
      console.error('Failed to fetch messes:', error)
    } finally {
      setLoading(false)
    }
  }, [filters, userLocation])

  useEffect(() => {
    fetchMesses()
  }, [fetchMesses])

  const handleFilterChange = (newFilters: MessFilters) => {
    setFilters(newFilters)
  }

  const handleResetFilters = () => {
    setFilters({
      search: '',
      sortBy: 'rating',
    })
  }

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }))
  }

  return (
    <main className="min-h-screen bg-dark-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-dark-900">
              Discover Mess
            </h1>
            <p className="text-dark-500 mt-1">
              {loading ? 'Searching...' : `${messes.length} mess found`}
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <div className="flex bg-white rounded-xl p-1 shadow-sm">
              {[
                { id: 'grid', icon: List, label: 'Grid' },
                { id: 'list', icon: List, label: 'List' },
                { id: 'map', icon: Map, label: 'Map' },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id as typeof viewMode)}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5',
                    viewMode === mode.id
                      ? 'bg-primary-500 text-white'
                      : 'text-dark-600 hover:bg-dark-100'
                  )}
                >
                  <mode.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{mode.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Filter Button */}
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsFilterOpen(true)}
            >
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            value={filters.search || ''}
            onChange={handleSearchChange}
            onLocationClick={() => {
              if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition((pos) => {
                  setUserLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                  })
                  setFilters((prev) => ({ ...prev, sortBy: 'distance' }))
                })
              }
            }}
          />
        </div>

        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
              />
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className={cn(
                'grid gap-6',
                viewMode === 'grid' && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
                viewMode === 'list' && 'grid-cols-1'
              )}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <MessCardSkeleton key={i} />
                ))}
              </div>
            ) : viewMode === 'map' ? (
              <div className="h-[calc(100vh-200px)] rounded-2xl overflow-hidden">
                <MessMap
                  messes={messes}
                  center={userLocation ? [userLocation.lat, userLocation.lng] : undefined}
                  onMessClick={(mess) => setSelectedMess(mess)}
                  selectedMessId={selectedMess?.id}
                />
              </div>
            ) : messes.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-dark-100 flex items-center justify-center">
                  <span className="text-5xl">🍽️</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-dark-900 mb-2">
                  No mess found
                </h3>
                <p className="text-dark-500 mb-6">
                  Try adjusting your filters or search for a different area
                </p>
                <Button variant="primary" onClick={handleResetFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <motion.div
                layout
                className={cn(
                  'grid gap-6',
                  viewMode === 'grid' && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
                  viewMode === 'list' && 'grid-cols-1'
                )}
              >
                <AnimatePresence mode="popLayout">
                  {messes.map((mess, index) => (
                    <motion.div
                      key={mess.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {viewMode === 'list' ? (
                        <MessCardCompact mess={mess} distance={mess.distance} />
                      ) : (
                        <MessCard mess={mess} distance={mess.distance} />
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    }>
      <DiscoverContent />
    </Suspense>
  )
}
