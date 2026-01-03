'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Engineering Student, COEP',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    content: 'FoodLink made finding a good mess so easy! I found Annapurna Mess within minutes and the food quality is amazing. Saved me so much time!',
    rating: 5,
    messName: 'Shree Annapurna Mess',
  },
  {
    id: 2,
    name: 'Rahul Patil',
    role: 'MBA Student, SIBM',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    content: 'As someone from South India, finding good South Indian food was tough. FoodLink helped me discover Sagar Ratna - best dosas in Pune!',
    rating: 5,
    messName: 'Sagar Ratna Tiffins',
  },
  {
    id: 3,
    name: 'Anjali Deshmukh',
    role: 'IT Professional, Hinjewadi',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    content: 'The filter options are super helpful. I could easily find veg-only mess near my PG. Monthly subscription is affordable and hassle-free.',
    rating: 4,
    messName: 'Amma\'s Kitchen',
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mt-2">
            What Students Say
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Join thousands of students who found their perfect mess through FoodLink
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 lg:p-8 relative"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-primary/10">
                <Quote className="w-12 h-12" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 relative z-10">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Mess name */}
              <div className="text-sm text-primary font-medium mb-4">
                Found: {testimonial.messName}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-dark">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
