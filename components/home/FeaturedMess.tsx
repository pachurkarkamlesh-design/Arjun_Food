'use client';

import { motion } from 'framer-motion';
import { MessCard } from '@/components/mess/MessCard';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { Mess } from '@/types';

// Mock data for featured mess listings (matching Mess type)
const featuredMessData = [
  {
    id: '1',
    name: 'Shree Annapurna Mess',
    description: 'Authentic Maharashtrian home-style cooking with unlimited thali.',
    address: 'Lane 5, Dahanukar Colony',
    locality: 'Kothrud',
    city: 'Pune',
    latitude: 18.5074,
    longitude: 73.8077,
    cuisineTypes: 'MAHARASHTRIAN',
    isVeg: true,
    isNonVeg: false,
    priceRange: 'BUDGET' as const,
    monthlyPrice: 3500,
    perMealPrice: 60,
    avgRating: 4.6,
    totalReviews: 234,
    isVerified: true,
    isActive: true,
    isFeatured: true,
    totalViews: 1250,
    photos: JSON.stringify(['https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800']),
    openTime: '07:30',
    closeTime: '22:00',
    phone: '+91 98765 43210',
    ownerId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Sagar Ratna Tiffins',
    description: 'South Indian breakfast specialists with authentic filter coffee.',
    address: 'Phoenix Market City Road',
    locality: 'Viman Nagar',
    city: 'Pune',
    latitude: 18.5679,
    longitude: 73.9143,
    cuisineTypes: 'SOUTH_INDIAN',
    isVeg: true,
    isNonVeg: false,
    priceRange: 'MODERATE' as const,
    monthlyPrice: 4200,
    perMealPrice: 70,
    avgRating: 4.4,
    totalReviews: 189,
    isVerified: true,
    isActive: true,
    isFeatured: true,
    totalViews: 980,
    photos: JSON.stringify(['https://images.unsplash.com/photo-1630383249896-424e482df921?w=800']),
    openTime: '06:30',
    closeTime: '21:30',
    phone: '+91 98234 56789',
    ownerId: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Punjab Da Dhaba',
    description: 'Hearty Punjabi food with generous portions and fresh rotis.',
    address: 'DP Road, Near Bremen',
    locality: 'Aundh',
    city: 'Pune',
    latitude: 18.5590,
    longitude: 73.8070,
    cuisineTypes: 'PUNJABI',
    isVeg: false,
    isNonVeg: true,
    priceRange: 'MODERATE' as const,
    monthlyPrice: 4500,
    perMealPrice: 80,
    avgRating: 4.5,
    totalReviews: 312,
    isVerified: true,
    isActive: true,
    isFeatured: true,
    totalViews: 1540,
    photos: JSON.stringify(['https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800']),
    openTime: '08:00',
    closeTime: '22:30',
    phone: '+91 98456 12345',
    ownerId: '3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: "Amma's Kitchen",
    description: 'Homely North Indian meals prepared with love and care.',
    address: 'Magarpatta City',
    locality: 'Hadapsar',
    city: 'Pune',
    latitude: 18.5089,
    longitude: 73.9260,
    cuisineTypes: 'NORTH_INDIAN',
    isVeg: true,
    isNonVeg: false,
    priceRange: 'BUDGET' as const,
    monthlyPrice: 3200,
    perMealPrice: 55,
    avgRating: 4.3,
    totalReviews: 156,
    isVerified: true,
    isActive: true,
    isFeatured: false,
    totalViews: 720,
    photos: JSON.stringify(['https://images.unsplash.com/photo-1567337710282-00832b415979?w=800']),
    openTime: '07:00',
    closeTime: '21:00',
    phone: '+91 97654 32100',
    ownerId: '4',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function FeaturedMess() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-10"
        >
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Top Rated
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mt-2">
              Featured Mess Near You
            </h2>
            <p className="text-gray-600 mt-3 max-w-xl">
              Discover the most loved mess options in Pune, handpicked based on ratings, 
              hygiene standards, and student reviews.
            </p>
          </div>
          <Link
            href="/discover"
            className="inline-flex items-center gap-1 text-primary font-semibold mt-4 md:mt-0 hover:gap-2 transition-all"
          >
            View all mess
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMessData.map((mess, index) => (
            <motion.div
              key={mess.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <MessCard mess={mess as Mess} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
