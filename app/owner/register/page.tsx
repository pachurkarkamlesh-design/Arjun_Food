'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { MapPin, Phone, DollarSign, Clock, Camera, ArrowLeft } from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import type { MessFormData, CuisineType, PriceRange } from '@/types'
import { CUISINE_LABELS } from '@/types'

export default function RegisterMessPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<MessFormData>({
    name: '',
    description: '',
    address: '',
    locality: '',
    phone: '',
    cuisineTypes: [],
    isVeg: true,
    isNonVeg: false,
    priceRange: 'MODERATE',
    monthlyPrice: 0,
    perMealPrice: 0,
    openTime: '08:00',
    closeTime: '22:00',
    photos: [],
    latitude: 18.5204,
    longitude: 73.8567,
  })

  // Redirect if not authenticated or not a mess owner
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  if (session?.user && (session.user as any).role !== 'MESS_OWNER') {
    toast.error('Only mess owners can register a mess')
    router.push('/discover')
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }))
  }

  const handleCuisineToggle = (cuisine: CuisineType) => {
    setFormData((prev) => ({
      ...prev,
      cuisineTypes: prev.cuisineTypes.includes(cuisine)
        ? prev.cuisineTypes.filter((c) => c !== cuisine)
        : [...prev.cuisineTypes, cuisine],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.address || !formData.locality || !formData.phone) {
      toast.error('Please fill in all required fields')
      return
    }

    if (formData.cuisineTypes.length === 0) {
      toast.error('Please select at least one cuisine type')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/mess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register mess')
      }

      toast.success('Mess registered successfully!')
      router.push('/owner/dashboard')
    } catch (error) {
      console.error('Registration error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to register mess')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-dark-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-dark-600 hover:text-dark-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-dark-900">
            Register Your Mess
          </h1>
          <p className="text-dark-500 mt-2">
            Add your mess to Arjun FoodLink and reach thousands of students
          </p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm p-6 md:p-8 space-y-8"
        >
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-dark-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input
                  label="Mess Name *"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Shree Ganesh Mess"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors resize-none"
                  placeholder="Tell students about your mess..."
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h2 className="text-xl font-semibold text-dark-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-500" />
              Location
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input
                  label="Address *"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Full address"
                  required
                />
              </div>
              <Input
                label="Locality *"
                name="locality"
                value={formData.locality}
                onChange={handleInputChange}
                placeholder="e.g., Kothrud, Shivajinagar"
                required
              />
              <Input
                label="City"
                name="city"
                value="Pune"
                disabled
              />
              <Input
                label="Latitude *"
                name="latitude"
                type="number"
                step="any"
                value={formData.latitude}
                onChange={handleInputChange}
                placeholder="18.5204"
                required
              />
              <Input
                label="Longitude *"
                name="longitude"
                type="number"
                step="any"
                value={formData.longitude}
                onChange={handleInputChange}
                placeholder="73.8567"
                required
              />
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xl font-semibold text-dark-900 mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary-500" />
              Contact
            </h2>
            <Input
              label="Phone Number *"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="e.g., +91 9876543210"
              required
            />
          </div>

          {/* Cuisine Types */}
          <div>
            <h2 className="text-xl font-semibold text-dark-900 mb-4">Cuisine Types *</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(Object.keys(CUISINE_LABELS) as CuisineType[]).map((cuisine) => (
                <button
                  key={cuisine}
                  type="button"
                  onClick={() => handleCuisineToggle(cuisine)}
                  className={`px-4 py-3 rounded-xl border-2 transition-all ${
                    formData.cuisineTypes.includes(cuisine)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-dark-200 hover:border-dark-300'
                  }`}
                >
                  {CUISINE_LABELS[cuisine]}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Options */}
          <div>
            <h2 className="text-xl font-semibold text-dark-900 mb-4">Dietary Options</h2>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isVeg}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isVeg: e.target.checked }))}
                  className="w-5 h-5 rounded border-dark-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-dark-700">Vegetarian</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isNonVeg}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isNonVeg: e.target.checked }))}
                  className="w-5 h-5 rounded border-dark-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-dark-700">Non-Vegetarian</span>
              </label>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h2 className="text-xl font-semibold text-dark-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary-500" />
              Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Price Range *
                </label>
                <select
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={(e) => setFormData((prev) => ({ ...prev, priceRange: e.target.value as PriceRange }))}
                  className="w-full px-4 py-3 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors"
                  required
                >
                  <option value="BUDGET">Budget (&lt; ₹2,000)</option>
                  <option value="MODERATE">Moderate (₹2,000 - ₹3,500)</option>
                  <option value="PREMIUM">Premium (&gt; ₹3,500)</option>
                </select>
              </div>
              <Input
                label="Monthly Price (₹)"
                name="monthlyPrice"
                type="number"
                value={formData.monthlyPrice}
                onChange={handleInputChange}
                placeholder="e.g., 3000"
              />
              <Input
                label="Per Meal Price (₹)"
                name="perMealPrice"
                type="number"
                value={formData.perMealPrice}
                onChange={handleInputChange}
                placeholder="e.g., 50"
              />
            </div>
          </div>

          {/* Timings */}
          <div>
            <h2 className="text-xl font-semibold text-dark-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-500" />
              Operating Hours
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Opening Time"
                name="openTime"
                type="time"
                value={formData.openTime}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Closing Time"
                name="closeTime"
                type="time"
                value={formData.closeTime}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Registering...</span>
                </div>
              ) : (
                'Register Mess'
              )}
            </Button>
          </div>
        </motion.form>
      </div>

      <Footer />
    </main>
  )
}
