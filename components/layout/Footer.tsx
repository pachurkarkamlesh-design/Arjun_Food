'use client'

import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'

const footerLinks = {
  discover: {
    title: 'Discover',
    links: [
      { label: 'Find Mess Near Me', href: '/discover' },
      { label: 'Popular Localities', href: '/discover?popular=true' },
      { label: 'Top Rated', href: '/discover?sort=rating' },
      { label: 'Budget Friendly', href: '/discover?price=BUDGET' },
    ],
  },
  forOwners: {
    title: 'For Mess Owners',
    links: [
      { label: 'List Your Mess', href: '/owner/register' },
      { label: 'Owner Dashboard', href: '/owner/dashboard' },
      { label: 'Pricing Plans', href: '/owner/subscription' },
      { label: 'Success Stories', href: '/success-stories' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Refund Policy', href: '/refund' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
}

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="mb-6">
              <Logo size="md" />
            </div>
            <p className="text-dark-300 text-sm mb-6 max-w-sm">
              Discover the best campus mess near you. Find daily menus, compare
              prices, read reviews, and never miss a good meal again.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:hello@arjunfoodlink.com"
                className="flex items-center gap-3 text-sm text-dark-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@arjunfoodlink.com
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-sm text-dark-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </a>
              <div className="flex items-center gap-3 text-sm text-dark-300">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                Pune, Maharashtra, India
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-dark-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-dark-400">
              © {new Date().getFullYear()} Arjun FoodLink. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 text-dark-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Made with love */}
            <p className="text-sm text-dark-400">
              Made with ❤️ in Pune
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
