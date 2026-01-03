// App-wide constants for Arjun FoodLink

export const APP_NAME = 'Arjun FoodLink'
export const APP_TAGLINE = 'Your Campus. Your Food. Your Way.'
export const APP_DESCRIPTION = 'Discover the best campus mess near you. Find daily menus, compare prices, and read reviews.'

// Default location (Pune - Hinjewadi)
export const DEFAULT_LOCATION = {
  latitude: 18.5912,
  longitude: 73.7380,
  name: 'Hinjewadi, Pune',
}

// Map settings
export const MAP_CONFIG = {
  defaultZoom: 14,
  minZoom: 12,
  maxZoom: 18,
  tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}

// Cuisine type icons (emoji)
export const CUISINE_ICONS: Record<string, string> = {
  NORTH_INDIAN: '🍛',
  SOUTH_INDIAN: '🥘',
  CHINESE: '🥡',
  MAHARASHTRIAN: '🍲',
  GUJARATI: '🥗',
  BENGALI: '🐟',
  PUNJABI: '🫓',
  MULTI_CUISINE: '🍽️',
}

// Price range details
export const PRICE_RANGES = {
  BUDGET: { min: 0, max: 2000, label: 'Budget', icon: '💰' },
  MODERATE: { min: 2000, max: 3500, label: 'Moderate', icon: '💵' },
  PREMIUM: { min: 3500, max: 10000, label: 'Premium', icon: '💎' },
}

// Subscription plans
export const SUBSCRIPTION_PLANS = {
  BASIC: {
    name: 'Basic',
    price: 299,
    period: 'month',
    features: [
      'Platform listing',
      'Daily menu updates',
      'Customer reviews',
      'Basic analytics',
    ],
    popular: false,
  },
  PRO: {
    name: 'Pro',
    price: 499,
    period: 'month',
    features: [
      'Everything in Basic',
      'Featured listing badge',
      'Advanced analytics',
      'Priority support',
      'Photo gallery (10 images)',
    ],
    popular: true,
  },
  PREMIUM: {
    name: 'Premium',
    price: 799,
    period: 'month',
    features: [
      'Everything in Pro',
      'Top search placement',
      'Promotional banners',
      'Dedicated account manager',
      'Unlimited photos',
      'Special offers feature',
    ],
    popular: false,
  },
}

// Sample food images from Unsplash
export const FOOD_IMAGES = {
  thali: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800',
  northIndian: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
  southIndian: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800',
  chinese: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800',
  biryani: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
  dal: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800',
  roti: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=800',
  rice: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=800',
  paneer: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800',
  mess1: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
  mess2: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
  mess3: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
}

// Sample mess photos
export const MESS_PHOTOS = [
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
  'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
  'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800',
  'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800',
]

// Pune localities for sample data
export const PUNE_LOCALITIES = [
  { name: 'Hinjewadi', lat: 18.5912, lng: 73.7380 },
  { name: 'Wakad', lat: 18.5984, lng: 73.7620 },
  { name: 'Baner', lat: 18.5590, lng: 73.7868 },
  { name: 'Kothrud', lat: 18.5074, lng: 73.8077 },
  { name: 'Viman Nagar', lat: 18.5679, lng: 73.9143 },
  { name: 'Koregaon Park', lat: 18.5362, lng: 73.8939 },
  { name: 'Aundh', lat: 18.5580, lng: 73.8073 },
  { name: 'Pimpri', lat: 18.6298, lng: 73.7997 },
  { name: 'Chinchwad', lat: 18.6271, lng: 73.7558 },
  { name: 'Hadapsar', lat: 18.5089, lng: 73.9260 },
]

// API endpoints
export const API_ROUTES = {
  mess: '/api/mess',
  menu: '/api/menu',
  reviews: '/api/reviews',
  favorites: '/api/favorites',
  auth: '/api/auth',
}

// Form validation
export const VALIDATION = {
  phone: /^[6-9]\d{9}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  minNameLength: 2,
  maxNameLength: 100,
  minDescLength: 10,
  maxDescLength: 500,
  minCommentLength: 10,
  maxCommentLength: 500,
}

// Toast messages
export const TOAST_MESSAGES = {
  loginSuccess: 'Welcome back!',
  loginError: 'Login failed. Please try again.',
  logoutSuccess: 'You have been logged out.',
  favoriteAdded: 'Added to favorites!',
  favoriteRemoved: 'Removed from favorites.',
  reviewSubmitted: 'Review submitted successfully!',
  reviewError: 'Failed to submit review.',
  menuUpdated: 'Menu updated successfully!',
  profileUpdated: 'Profile updated successfully!',
  error: 'Something went wrong. Please try again.',
}

// Animation variants for Framer Motion
export const ANIMATIONS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
}
