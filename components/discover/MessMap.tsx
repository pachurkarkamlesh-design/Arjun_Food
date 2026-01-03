'use client'

import { useEffect, useRef, useState } from 'react'
import type { Mess } from '@/types'

interface MessMapProps {
  messes: Mess[]
  center?: [number, number]
  zoom?: number
  onMessClick?: (mess: Mess) => void
  selectedMessId?: string
}

export function MessMap({
  messes,
  center = [18.5204, 73.8567], // Pune coordinates
  zoom = 13,
  onMessClick,
  selectedMessId,
}: MessMapProps) {
  const mapRef = useRef<any>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    // Dynamically import Leaflet only on client side
    import('leaflet').then((L) => {
      import('leaflet/dist/leaflet.css')

      // Initialize map
      mapRef.current = L.map(mapContainerRef.current!).setView(center, zoom)

      // Add tile layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current)
    })

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  // Update markers when messes change
  useEffect(() => {
    if (!mapRef.current) return

    // Dynamically import Leaflet for markers
    import('leaflet').then((L) => {
      // Clear existing markers
      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []

      // Add new markers
      messes.forEach((mess) => {
        const isSelected = mess.id === selectedMessId

        const icon = L.divIcon({
          className: '',
          html: `
            <div class="relative">
              <div class="w-10 h-10 ${isSelected ? 'bg-primary-500 scale-125' : 'bg-primary-500'} rounded-full border-3 border-white shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-transform cursor-pointer hover:scale-110">
                <span class="text-white text-lg">🍛</span>
              </div>
              ${isSelected ? `
                <div class="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white rounded-lg shadow-lg p-2 whitespace-nowrap z-50">
                  <p class="font-semibold text-sm text-dark-900">${mess.name}</p>
                  <p class="text-xs text-dark-500">${mess.locality}</p>
                </div>
              ` : ''}
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        })

        const marker = L.marker([mess.latitude, mess.longitude], { icon })
          .addTo(mapRef.current!)

        // Add popup
        const popupContent = `
          <div class="p-2 min-w-[200px]">
            <h3 class="font-semibold text-dark-900">${mess.name}</h3>
            <p class="text-sm text-dark-500">${mess.locality}</p>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-yellow-500">★</span>
              <span class="text-sm font-medium">${mess.avgRating.toFixed(1)}</span>
              <span class="text-dark-400 text-sm">(${mess.totalReviews})</span>
            </div>
            ${mess.monthlyPrice ? `<p class="text-sm text-primary-500 font-semibold mt-1">₹${mess.monthlyPrice}/month</p>` : ''}
          </div>
        `

        marker.bindPopup(popupContent, {
          closeButton: false,
          className: 'custom-popup',
        })

        marker.on('click', () => {
          onMessClick?.(mess)
        })

        markersRef.current.push(marker)
      })

      // Fit bounds to show all markers
      if (messes.length > 0) {
        const bounds = L.latLngBounds(
          messes.map((m) => [m.latitude, m.longitude])
        )
        mapRef.current!.fitBounds(bounds, { padding: [50, 50] })
      }
    })
  }, [messes, selectedMessId, onMessClick])

  // Update center when it changes
  useEffect(() => {
    if (mapRef.current && center) {
      mapRef.current.setView(center, zoom)
    }
  }, [center, zoom])

  return (
    <div ref={mapContainerRef} className="w-full h-full rounded-2xl overflow-hidden" />
  )
}

// Map placeholder for SSR
export function MessMapPlaceholder() {
  return (
    <div className="w-full h-full rounded-2xl bg-dark-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dark-200 flex items-center justify-center">
          <span className="text-3xl">🗺️</span>
        </div>
        <p className="text-dark-500">Loading map...</p>
      </div>
    </div>
  )
}
