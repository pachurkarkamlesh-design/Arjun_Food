'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { ArrowRight, TrendingUp, Users, Star, Shield } from 'lucide-react';
import Link from 'next/link';

const benefits = [
  {
    icon: Users,
    title: '5000+ Students',
    description: 'Reach thousands of hungry students looking for mess',
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Business',
    description: 'Increase visibility and get more subscriptions',
  },
  {
    icon: Star,
    title: 'Build Reputation',
    description: 'Collect reviews and showcase your quality',
  },
  {
    icon: Shield,
    title: 'Verified Badge',
    description: 'Get verified and stand out from competition',
  },
];

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white/20 rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-white/10 rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-white text-sm font-medium mb-4">
              For Mess Owners
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              List Your Mess & <br />
              <span className="text-yellow-300">Grow Your Business</span>
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-lg">
              Join Pune&apos;s largest student food platform. Reach thousands of students, 
              manage subscriptions, and build your reputation with genuine reviews.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/owner/register">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 font-semibold shadow-lg"
                >
                  Register Your Mess
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/owner/learn-more">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              <div>
                <div className="text-3xl font-bold text-white">100+</div>
                <div className="text-white/70 text-sm">Mess Partners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">₹2L+</div>
                <div className="text-white/70 text-sm">Monthly Revenue</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">Free</div>
                <div className="text-white/70 text-sm">To List</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Benefits grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                <p className="text-white/70 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
