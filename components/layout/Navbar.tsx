'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import Logo from '@/components/ui/Logo'
import Button from '@/components/ui/Button'
import {
  Menu,
  X,
  Search,
  MapPin,
  Heart,
  User,
  LogIn,
  Store,
  ChevronDown,
} from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/discover', label: 'Discover Mess' },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const isLoggedIn = status === 'authenticated'
  const user = session?.user

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-dark-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors relative py-2',
                  pathname === link.href
                    ? 'text-primary-500'
                    : 'text-dark-600 hover:text-primary-500'
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Location */}
            <button className="flex items-center gap-2 text-sm text-dark-600 hover:text-primary-500 transition-colors">
              <MapPin className="w-4 h-4" />
              <span>Pune</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Search */}
            <Link
              href="/discover"
              className="p-2 text-dark-600 hover:text-primary-500 hover:bg-dark-50 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>

            {isLoggedIn ? (
              <>
                {/* Favorites */}
                <Link
                  href="/favorites"
                  className="p-2 text-dark-600 hover:text-primary-500 hover:bg-dark-50 rounded-lg transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-2 text-dark-600 hover:text-primary-500 hover:bg-dark-50 rounded-lg transition-colors"
                  >
                    <User className="w-5 h-5" />
                    {user?.name && <span className="text-sm font-medium">{user.name}</span>}
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-dark-100 overflow-hidden"
                      >
                        {(session?.user as any)?.role === 'MESS_OWNER' && (
                          <>
                            <Link
                              href="/owner/dashboard"
                              className="block px-4 py-3 text-sm text-dark-700 hover:bg-dark-50"
                            >
                              Dashboard
                            </Link>
                            <Link
                              href="/owner/register"
                              className="block px-4 py-3 text-sm text-dark-700 hover:bg-dark-50"
                            >
                              Register Mess
                            </Link>
                            <hr className="border-dark-100" />
                          </>
                        )}
                        <Link
                          href="/profile"
                          className="block px-4 py-3 text-sm text-dark-700 hover:bg-dark-50"
                        >
                          My Profile
                        </Link>
                        <Link
                          href="/favorites"
                          className="block px-4 py-3 text-sm text-dark-700 hover:bg-dark-50"
                        >
                          My Favorites
                        </Link>
                        <Link
                          href="/reviews"
                          className="block px-4 py-3 text-sm text-dark-700 hover:bg-dark-50"
                        >
                          My Reviews
                        </Link>
                        <hr className="border-dark-100" />
                        <button
                          onClick={() => signOut({ callbackUrl: '/' })}
                          className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => window.location.href = '/login'}
                  className="inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-transparent text-dark-700 hover:bg-dark-100 focus:ring-dark-300 px-4 py-2 text-sm gap-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => window.location.href = '/owner/register'}
                  className="inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 focus:ring-primary-500 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 px-4 py-2 text-sm gap-1.5"
                >
                  <Store className="w-4 h-4" />
                  <span>List Your Mess</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-dark-600 hover:text-primary-500 hover:bg-dark-50 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-dark-100 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
              {/* Location */}
              <button className="flex items-center gap-2 w-full p-3 bg-dark-50 rounded-xl text-sm">
                <MapPin className="w-5 h-5 text-primary-500" />
                <span className="text-dark-700">Pune, Maharashtra</span>
                <ChevronDown className="w-4 h-4 ml-auto text-dark-400" />
              </button>

              {/* Nav Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'block p-3 rounded-xl text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-primary-50 text-primary-500'
                      : 'text-dark-600 hover:bg-dark-50'
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <hr className="border-dark-100" />

              {/* Auth Buttons */}
              {isLoggedIn ? (
                <>
                  <Link
                    href="/favorites"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl text-sm text-dark-600 hover:bg-dark-50"
                  >
                    <Heart className="w-5 h-5" />
                    My Favorites
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl text-sm text-dark-600 hover:bg-dark-50"
                  >
                    <User className="w-5 h-5" />
                    My Profile
                  </Link>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      window.location.href = '/login'
                    }}
                    className="w-full inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-white text-primary-500 border-2 border-primary-500 hover:bg-primary-50 focus:ring-primary-500 px-4 py-2 text-sm gap-1.5"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      window.location.href = '/owner/register'
                    }}
                    className="w-full inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 focus:ring-primary-500 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 px-4 py-2 text-sm gap-1.5"
                  >
                    List Mess
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
