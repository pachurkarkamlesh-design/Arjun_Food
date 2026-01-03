'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const cuisines = [
  {
    id: 'north-indian',
    name: 'North Indian',
    emoji: '🍛',
    color: 'from-orange-400 to-red-500',
    count: 45,
  },
  {
    id: 'south-indian',
    name: 'South Indian',
    emoji: '🥘',
    color: 'from-yellow-400 to-orange-500',
    count: 32,
  },
  {
    id: 'maharashtrian',
    name: 'Maharashtrian',
    emoji: '🍲',
    color: 'from-amber-400 to-orange-500',
    count: 58,
  },
  {
    id: 'gujarati',
    name: 'Gujarati',
    emoji: '🥗',
    color: 'from-green-400 to-emerald-500',
    count: 24,
  },
  {
    id: 'punjabi',
    name: 'Punjabi',
    emoji: '🫓',
    color: 'from-red-400 to-pink-500',
    count: 38,
  },
  {
    id: 'chinese',
    name: 'Chinese',
    emoji: '🥡',
    color: 'from-rose-400 to-red-500',
    count: 18,
  },
  {
    id: 'multi-cuisine',
    name: 'Multi Cuisine',
    emoji: '🍽️',
    color: 'from-purple-400 to-indigo-500',
    count: 67,
  },
];

export function CuisineFilter() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Explore by Taste
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mt-2">
            What&apos;s Your Craving?
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            From authentic regional flavors to multi-cuisine options, find the perfect mess 
            that matches your taste preferences.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {cuisines.map((cuisine, index) => (
            <motion.div
              key={cuisine.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={`/discover?cuisine=${cuisine.id}`}
                className="group block"
              >
                <div className="relative bg-white border-2 border-gray-100 rounded-2xl p-4 text-center transition-all duration-300 hover:border-primary/20 hover:shadow-card-hover">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cuisine.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                  
                  {/* Emoji */}
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {cuisine.emoji}
                  </div>
                  
                  {/* Name */}
                  <h3 className="font-semibold text-dark text-sm md:text-base group-hover:text-primary transition-colors">
                    {cuisine.name}
                  </h3>
                  
                  {/* Count */}
                  <p className="text-xs text-gray-500 mt-1">
                    {cuisine.count} options
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
