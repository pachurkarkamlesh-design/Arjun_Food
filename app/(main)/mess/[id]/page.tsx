'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/components/layout';
import Button from '@/components/ui/Button';
import Badge, { DietBadge, StatusBadge } from '@/components/ui/Badge';
import { RatingBadge } from '@/components/ui/Rating';
import { Modal } from '@/components/ui/Modal';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  Star,
  Heart,
  Share2,
  Navigation,
  Calendar,
  Users,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { cn, formatPrice, isMessOpen, parseStringArray } from '@/lib/utils';
import { CUISINE_LABELS, DAY_LABELS, MEAL_LABELS } from '@/types';
import type { Mess, Review, Menu, DayOfWeek, MealType } from '@/types';

// Mock data for the mess detail
const mockMess: Mess & { menus: Menu[]; reviews: Review[] } = {
  id: '1',
  name: 'Shree Annapurna Mess',
  description:
    'Authentic Maharashtrian home-style cooking with unlimited thali. Known for our special pitla bhakri and authentic misal pav. Family-run mess serving students for over 15 years with love and care. We use fresh ingredients daily and prepare food with traditional recipes passed down through generations.',
  address: 'Lane 5, Dahanukar Colony, Near MIT College',
  locality: 'Kothrud',
  city: 'Pune',
  latitude: 18.5074,
  longitude: 73.8077,
  cuisineTypes: 'MAHARASHTRIAN',
  isVeg: true,
  isNonVeg: false,
  priceRange: 'BUDGET',
  monthlyPrice: 3500,
  perMealPrice: 60,
  avgRating: 4.6,
  totalReviews: 234,
  isVerified: true,
  isActive: true,
  isFeatured: true,
  totalViews: 1250,
  photos: JSON.stringify([
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800',
    'https://images.unsplash.com/photo-1567337710282-00832b415979?w=800',
    'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
  ]),
  openTime: '07:30',
  closeTime: '22:00',
  phone: '+91 98765 43210',
  ownerId: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
  menus: [
    {
      id: '1',
      dayOfWeek: 'MONDAY',
      mealType: 'LUNCH',
      items: JSON.stringify(['Varan Bhaat', 'Pitla Bhakri', 'Usal', 'Koshimbir', 'Papad', 'Pickle']),
      specialItem: 'Puran Poli',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      messId: '1',
    },
    {
      id: '2',
      dayOfWeek: 'MONDAY',
      mealType: 'DINNER',
      items: JSON.stringify(['Chapati', 'Bhaji', 'Dal Rice', 'Salad']),
      specialItem: null,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      messId: '1',
    },
    {
      id: '3',
      dayOfWeek: 'TUESDAY',
      mealType: 'LUNCH',
      items: JSON.stringify(['Masale Bhaat', 'Kadhi', 'Aloo Gobi', 'Chapati', 'Pickle']),
      specialItem: 'Shrikhand',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      messId: '1',
    },
    {
      id: '4',
      dayOfWeek: 'WEDNESDAY',
      mealType: 'LUNCH',
      items: JSON.stringify(['Plain Rice', 'Amti', 'Batata Bhaji', 'Chapati', 'Papad']),
      specialItem: 'Modak',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      messId: '1',
    },
  ],
  reviews: [
    {
      id: '1',
      rating: 5,
      foodRating: 5,
      hygieneRating: 5,
      comment:
        'Best mess in Kothrud! The food tastes exactly like home-cooked meals. Pitla bhakri is amazing. Highly recommended for all students.',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      userId: '1',
      messId: '1',
      user: {
        id: '1',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        phone: null,
        role: 'STUDENT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
    {
      id: '2',
      rating: 4,
      foodRating: 4,
      hygieneRating: 5,
      comment:
        'Good food with consistent quality. The place is very clean. Sometimes the food can be a bit spicy for my taste.',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10'),
      userId: '2',
      messId: '1',
      user: {
        id: '2',
        name: 'Rahul Patil',
        email: 'rahul@example.com',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        phone: null,
        role: 'STUDENT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
    {
      id: '3',
      rating: 5,
      foodRating: 5,
      hygieneRating: 4,
      comment:
        'Been eating here for 2 years. Never disappointed. The aunty makes food with so much love. Monthly subscription is value for money!',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05'),
      userId: '3',
      messId: '1',
      user: {
        id: '3',
        name: 'Anjali Deshmukh',
        email: 'anjali@example.com',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        phone: null,
        role: 'STUDENT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  ],
};

const days: DayOfWeek[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
const meals: MealType[] = ['BREAKFAST', 'LUNCH', 'DINNER'];

export default function MessDetailPage({ params }: { params: { id: string } }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('MONDAY');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const mess = mockMess; // In real app, fetch from API
  const photos = parseStringArray(mess.photos);
  const isOpen = isMessOpen(mess.openTime, mess.closeTime);

  const dayMenus = mess.menus.filter((m) => m.dayOfWeek === selectedDay);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % photos.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleCall = () => {
    window.location.href = `tel:${mess.phone}`;
  };

  const handleDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${mess.latitude},${mess.longitude}`,
      '_blank'
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: mess.name,
        text: `Check out ${mess.name} on FoodLink!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Back button */}
      <div className="container mx-auto px-4 py-4">
        <Link
          href="/discover"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Discover
        </Link>
      </div>

      {/* Hero Image Gallery */}
      <section className="container mx-auto px-4 mb-8">
        <div className="relative rounded-2xl overflow-hidden bg-gray-200">
          {/* Main Image */}
          <div className="relative aspect-[21/9]">
            <Image
              src={photos[currentImageIndex] || '/placeholder.jpg'}
              alt={mess.name}
              fill
              className="object-cover cursor-pointer"
              onClick={() => setShowGallery(true)}
            />

            {/* Image navigation */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 rounded-full text-white text-sm">
              {currentImageIndex + 1} / {photos.length}
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {mess.isFeatured && (
                <Badge className="bg-yellow-400 text-yellow-900">⭐ Featured</Badge>
              )}
              {mess.isVerified && (
                <Badge className="bg-green-500 text-white">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>

            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all',
                  isFavorite ? 'bg-primary text-white' : 'bg-white/90 text-gray-700 hover:bg-white'
                )}
              >
                <Heart className={cn('w-5 h-5', isFavorite && 'fill-current')} />
              </button>
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm hover:bg-white transition-colors"
              >
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 p-3 bg-white">
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={cn(
                  'relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0',
                  index === currentImageIndex && 'ring-2 ring-primary'
                )}
              >
                <Image src={photo} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-display font-bold text-dark">
                    {mess.name}
                  </h1>
                  <p className="text-gray-600 mt-1 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {mess.locality}, {mess.city}
                  </p>
                </div>
                <RatingBadge value={mess.avgRating} showCount count={mess.totalReviews} />
              </div>

              {/* Quick info */}
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge className="bg-gray-100 text-gray-700">
                  {CUISINE_LABELS[mess.cuisineTypes as keyof typeof CUISINE_LABELS] || mess.cuisineTypes}
                </Badge>
                {mess.isVeg && <DietBadge isVeg={true} />}
                <StatusBadge isOpen={isOpen} />
                <Badge className="bg-gray-100 text-gray-700">
                  <Clock className="w-3 h-3 mr-1" />
                  {mess.openTime} - {mess.closeTime}
                </Badge>
              </div>

              <p className="text-gray-700 leading-relaxed">{mess.description}</p>
            </div>

            {/* Menu Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-display font-bold text-dark mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Weekly Menu
              </h2>

              {/* Day selector */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={cn(
                      'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
                      selectedDay === day
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    {DAY_LABELS[day]}
                  </button>
                ))}
              </div>

              {/* Menu items */}
              <div className="space-y-4">
                {dayMenus.length > 0 ? (
                  dayMenus.map((menu) => (
                    <div key={menu.id} className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-semibold text-dark mb-2">
                        {MEAL_LABELS[menu.mealType]}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {parseStringArray(menu.items).map((item, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      {menu.specialItem && (
                        <div className="mt-3 flex items-center gap-2 text-primary">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-medium">Special: {menu.specialItem}</span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Menu not available for {DAY_LABELS[selectedDay]}
                  </p>
                )}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold text-dark flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Reviews ({mess.totalReviews})
                </h2>
                <Button variant="outline" size="sm">
                  Write a Review
                </Button>
              </div>

              {/* Reviews list */}
              <div className="space-y-6">
                {mess.reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-b last:border-0 pb-6 last:pb-0"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        {review.user?.image ? (
                          <Image
                            src={review.user.image}
                            alt={review.user.name || ''}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            {review.user?.name?.charAt(0) || '?'}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-dark">
                            {review.user?.name || 'Anonymous'}
                          </span>
                          <span className="text-gray-400 text-sm">•</span>
                          <span className="text-gray-500 text-sm">
                            {new Date(review.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="flex gap-1 mb-2">
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
                        <p className="text-gray-700">{review.comment}</p>
                        <div className="flex gap-4 mt-2 text-sm text-gray-500">
                          <span>Food: {review.foodRating}/5</span>
                          <span>Hygiene: {review.hygieneRating}/5</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="font-display font-bold text-dark mb-4">Pricing</h3>

              {/* Monthly price */}
              <div className="bg-primary/5 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-600">Monthly Subscription</p>
                <p className="text-3xl font-bold text-primary">
                  {formatPrice(mess.monthlyPrice || 0)}
                  <span className="text-base font-normal text-gray-500">/month</span>
                </p>
              </div>

              {/* Per meal price */}
              {mess.perMealPrice && (
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-600">Per Meal</p>
                  <p className="text-xl font-bold text-dark">
                    {formatPrice(mess.perMealPrice)}
                  </p>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Button className="w-full" onClick={handleCall}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button variant="outline" className="w-full" onClick={handleDirections}>
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </div>

              {/* Location */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-dark mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Location
                </h4>
                <p className="text-gray-600 text-sm">{mess.address}</p>
                <div className="mt-3 rounded-xl overflow-hidden bg-gray-100 aspect-video">
                  {/* Map placeholder */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <MapPin className="w-8 h-8" />
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-dark">{mess.totalViews}</p>
                  <p className="text-sm text-gray-500">Views</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-dark">{mess.totalReviews}</p>
                  <p className="text-sm text-gray-500">Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-5xl aspect-video mx-4">
            <Image
              src={photos[currentImageIndex]}
              alt={mess.name}
              fill
              className="object-contain"
            />
          </div>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
            {currentImageIndex + 1} / {photos.length}
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
