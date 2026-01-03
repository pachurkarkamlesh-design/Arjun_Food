'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Search, MapPin, ArrowRight, Sparkles } from 'lucide-react'

const stats = [
  { value: '100+', label: 'Mess Listed' },
  { value: '5000+', label: 'Happy Students' },
  { value: '50+', label: 'Localities' },
  { value: '4.5★', label: 'Avg Rating' },
]

const cuisineIcons = ['🍛', '🥘', '🥡', '🍲', '🫓', '🥗']

export default function Hero() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('Pune')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/discover?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-mesh-pattern opacity-50" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50" />

      {/* Floating Food Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {cuisineIcons.map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              #1 Campus Food Discovery Platform
            </motion.div>

            {/* Heading */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-900 leading-tight mb-6">
              Discover the{' '}
              <span className="gradient-text">Perfect Mess</span>{' '}
              for Every Meal
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-dark-600 mb-8 max-w-lg">
              Find daily menus, compare prices, read reviews, and never miss a 
              good meal on campus again. Your food journey starts here!
            </p>

            {/* Search Box */}
            <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-2 flex flex-col sm:flex-row gap-2"
            >
              {/* Location */}
              <div className="flex items-center gap-2 px-4 py-3 bg-dark-50 rounded-xl sm:w-40">
                <MapPin className="w-5 h-5 text-primary-500" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent text-dark-700 text-sm font-medium outline-none cursor-pointer"
                >
                  <option value="Pune">Pune</option>
                  <option value="Hinjewadi">Hinjewadi</option>
                  <option value="Wakad">Wakad</option>
                  <option value="Baner">Baner</option>
                </select>
              </div>

              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input
                  type="text"
                  placeholder="Search mess by name, cuisine..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl text-dark-700 placeholder:text-dark-400 outline-none"
                />
              </div>

              {/* Search Button */}
              <Button type="submit" className="sm:w-auto">
                <Search className="w-5 h-5 sm:hidden" />
                <span className="hidden sm:inline">Search</span>
              </Button>
            </motion.form>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 mt-6"
            >
              <span className="text-sm text-dark-500">Popular:</span>
              {['North Indian', 'South Indian', 'Budget Mess', 'Pure Veg'].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => router.push(`/discover?q=${tag}`)}
                    className="text-sm text-primary-500 hover:text-primary-600 hover:underline"
                  >
                    {tag}
                  </button>
                )
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-dark-100"
            >
              {stats.map((stat, index) => (
                <div key={stat.label}>
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="text-2xl sm:text-3xl font-bold text-primary-500"
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-sm text-dark-500">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main Image */}
            <div className="relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <div className="relative w-full aspect-square max-w-lg mx-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800"
                    alt="Delicious Indian Food"
                    fill
                    className="object-cover rounded-3xl shadow-2xl"
                    priority
                  />
                  
                  {/* Floating Card 1 - Rating */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl">
                        ⭐
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-dark-900">4.8</p>
                        <p className="text-xs text-dark-500">2.5k reviews</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating Card 2 - Today's Special */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 max-w-[200px]"
                  >
                    <p className="text-xs text-primary-500 font-semibold mb-1">
                      🔥 Today's Special
                    </p>
                    <p className="text-sm font-medium text-dark-900">
                      Paneer Butter Masala + Dal + Rice + Roti
                    </p>
                    <p className="text-xs text-dark-500 mt-1">
                      @ Sharma's Kitchen
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Background Decoration */}
              <div className="absolute -inset-4 bg-gradient-warm rounded-3xl -z-10 opacity-20 blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-dark-300 flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-dark-300 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
