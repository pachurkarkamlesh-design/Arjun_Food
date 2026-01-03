'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/components/layout';
import Button from '@/components/ui/Button';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Star,
  Users,
  TrendingUp,
  Eye,
  MessageSquare,
  Calendar,
  Settings,
  PlusCircle,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';

// Mock data
const dashboardStats = {
  totalViews: 1250,
  viewsChange: 12.5,
  totalReviews: 234,
  reviewsChange: 8.3,
  avgRating: 4.6,
  ratingChange: 0.2,
  activeSubscribers: 45,
  subscribersChange: -2.1,
};

const recentReviews = [
  {
    id: '1',
    userName: 'Priya Sharma',
    rating: 5,
    comment: 'Best mess in Kothrud! The food tastes exactly like home.',
    date: '2 hours ago',
  },
  {
    id: '2',
    userName: 'Rahul Patil',
    rating: 4,
    comment: 'Good food with consistent quality. Very clean place.',
    date: '1 day ago',
  },
  {
    id: '3',
    userName: 'Anjali Deshmukh',
    rating: 5,
    comment: 'Been eating here for 2 years. Never disappointed!',
    date: '3 days ago',
  },
];

const todaysMenu = {
  breakfast: ['Poha', 'Upma', 'Tea'],
  lunch: ['Varan Bhaat', 'Pitla Bhakri', 'Usal', 'Papad'],
  dinner: ['Chapati', 'Bhaji', 'Dal Rice', 'Salad'],
};

const quickActions = [
  { label: 'Update Menu', icon: UtensilsCrossed, href: '/owner/menu', color: 'bg-blue-500' },
  { label: 'View Reviews', icon: MessageSquare, href: '/owner/reviews', color: 'bg-yellow-500' },
  { label: 'Edit Profile', icon: Settings, href: '/owner/profile', color: 'bg-purple-500' },
  { label: 'Subscription', icon: Star, href: '/owner/subscription', color: 'bg-green-500' },
];

export default function OwnerDashboard() {
  const [greeting, setGreeting] = useState('Hello');
  const [messName] = useState('Shree Annapurna Mess'); // From API

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    prefix = '',
    suffix = '',
  }: {
    title: string;
    value: number | string;
    change: number;
    icon: any;
    prefix?: string;
    suffix?: string;
  }) => (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">{title}</p>
            <p className="text-2xl font-bold text-dark">
              {prefix}
              {value}
              {suffix}
            </p>
            <div
              className={cn(
                'flex items-center gap-1 mt-2 text-sm',
                change >= 0 ? 'text-green-600' : 'text-red-600'
              )}
            >
              {change >= 0 ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{Math.abs(change)}%</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-dark">
              {greeting}! 👋
            </h1>
            <p className="text-gray-600 mt-1">{messName}</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Link href="/owner/menu">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Update Menu
              </Button>
            </Link>
            <Link href={`/mess/1`}>
              <Button>
                <Eye className="w-4 h-4 mr-2" />
                View Listing
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
          >
            <StatCard
              title="Total Views"
              value={dashboardStats.totalViews.toLocaleString()}
              change={dashboardStats.viewsChange}
              icon={Eye}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatCard
              title="Total Reviews"
              value={dashboardStats.totalReviews}
              change={dashboardStats.reviewsChange}
              icon={MessageSquare}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatCard
              title="Average Rating"
              value={dashboardStats.avgRating}
              change={dashboardStats.ratingChange}
              icon={Star}
              suffix="/5"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatCard
              title="Active Subscribers"
              value={dashboardStats.activeSubscribers}
              change={dashboardStats.subscribersChange}
              icon={Users}
            />
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Menu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <UtensilsCrossed className="w-5 h-5 text-primary" />
                    Today&apos;s Menu
                  </CardTitle>
                  <Link href="/owner/menu">
                    <Button variant="ghost" size="sm">
                      Edit <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(todaysMenu).map(([meal, items]) => (
                    <div key={meal} className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-dark capitalize mb-2">{meal}</h4>
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <Badge key={item} className="bg-white border">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Recent Reviews
                  </CardTitle>
                  <Link href="/owner/reviews">
                    <Button variant="ghost" size="sm">
                      View All <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-dark">{review.userName}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                'w-4 h-4',
                                i < review.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                      <p className="text-gray-400 text-xs mt-2">{review.date}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action) => (
                    <Link key={action.label} href={action.href}>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div
                          className={cn(
                            'w-10 h-10 rounded-lg flex items-center justify-center',
                            action.color
                          )}
                        >
                          <action.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium text-dark">{action.label}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Subscription Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="bg-gradient-to-br from-primary to-secondary text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5" />
                    <span className="font-semibold">Pro Plan</span>
                  </div>
                  <p className="text-white/80 text-sm mb-4">
                    Your subscription renews on Jan 15, 2025
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{formatPrice(499)}/mo</span>
                    <Link href="/owner/subscription">
                      <Button
                        size="sm"
                        className="bg-white text-primary hover:bg-gray-100"
                      >
                        Manage
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tips Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h3>
                  <p className="text-blue-800 text-sm">
                    Messes with daily updated menus get 3x more views! Keep your menu
                    fresh to attract more students.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
