'use client';

import { motion } from 'framer-motion';
import { Search, MapPin, Utensils, Star } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Search',
    description: 'Enter your location or college to find mess options nearby',
    color: 'bg-blue-500',
  },
  {
    icon: MapPin,
    title: 'Compare',
    description: 'View menus, prices, ratings, and photos to make the best choice',
    color: 'bg-primary',
  },
  {
    icon: Utensils,
    title: 'Visit',
    description: 'Try a meal or sign up for a monthly subscription plan',
    color: 'bg-secondary',
  },
  {
    icon: Star,
    title: 'Review',
    description: 'Share your experience to help fellow students find great food',
    color: 'bg-success',
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mt-2">
            How FoodLink Works
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Finding your perfect mess is just four simple steps away
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line - hidden on mobile */}
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-500 via-primary to-success" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-center"
              >
                {/* Step number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 lg:hidden">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`relative w-32 h-32 mx-auto mb-6 rounded-full ${step.color} flex items-center justify-center shadow-lg`}>
                  <step.icon className="w-12 h-12 text-white" />
                  
                  {/* Step number on desktop */}
                  <div className="hidden lg:flex absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-gray-200 items-center justify-center text-sm font-bold text-dark shadow">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold text-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
