// Type definitions for Arjun FoodLink

export type Role = 'STUDENT' | 'MESS_OWNER' | 'ADMIN'
export type PriceRange = 'BUDGET' | 'MODERATE' | 'PREMIUM'
export type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER'
export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'
export type PlanType = 'BASIC' | 'PRO' | 'PREMIUM'

export type CuisineType = 
  | 'NORTH_INDIAN'
  | 'SOUTH_INDIAN'
  | 'CHINESE'
  | 'MAHARASHTRIAN'
  | 'GUJARATI'
  | 'BENGALI'
  | 'PUNJABI'
  | 'MULTI_CUISINE'

export interface User {
  id: string
  name: string | null
  email: string
  image: string | null
  phone: string | null
  role: Role
  createdAt: Date
  updatedAt: Date
}

export interface MessOwner {
  id: string
  name: string
  phone: string
  email: string | null
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Mess {
  id: string
  _id?: string  // MongoDB ObjectId
  name: string
  description: string | null
  address: string
  locality: string
  city: string
  latitude: number
  longitude: number
  phone: string
  cuisineTypes: string
  isVeg: boolean
  isNonVeg: boolean
  priceRange: PriceRange
  monthlyPrice: number | null
  perMealPrice: number | null
  openTime: string
  closeTime: string
  photos: string
  isVerified: boolean
  isActive: boolean
  isFeatured: boolean
  totalViews: number
  avgRating: number
  totalReviews: number
  createdAt: Date
  updatedAt: Date
  ownerId: string
  owner?: MessOwner
  menus?: Menu[]
  reviews?: Review[]
  // Computed at runtime
  distance?: number
}

export interface Menu {
  id: string
  dayOfWeek: DayOfWeek
  mealType: MealType
  items: string
  specialItem: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  messId: string
}

export interface Review {
  id: string
  rating: number
  foodRating: number
  hygieneRating: number
  comment: string | null
  createdAt: Date
  updatedAt: Date
  userId: string
  user?: User
  messId: string
}

export interface Favorite {
  id: string
  createdAt: Date
  userId: string
  messId: string
  mess?: Mess
}

export interface Subscription {
  id: string
  plan: PlanType
  startDate: Date
  endDate: Date
  isActive: boolean
  amount: number
  paymentId: string | null
  ownerId: string
}

// UI Types
export interface MessCardProps {
  mess: Mess
  distance?: number
  showFavorite?: boolean
  isFavorite?: boolean
  onFavoriteToggle?: () => void
}

export interface FilterState {
  cuisine: CuisineType[]
  priceRange: PriceRange[]
  dietary: ('veg' | 'nonveg')[]
  rating: number
  sortBy: 'distance' | 'rating' | 'price_low' | 'price_high'
}

export interface MessFilters {
  search?: string
  cuisine?: CuisineType[]
  priceRange?: PriceRange[]
  rating?: number
  isVeg?: boolean
  isNonVeg?: boolean
  isOpen?: boolean
  sortBy?: 'distance' | 'rating' | 'price_low' | 'price_high'
}

export interface Location {
  latitude: number
  longitude: number
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Form Types
export interface MessFormData {
  name: string
  description: string
  address: string
  locality: string
  phone: string
  cuisineTypes: CuisineType[]
  isVeg: boolean
  isNonVeg: boolean
  priceRange: PriceRange
  monthlyPrice: number
  perMealPrice: number
  openTime: string
  closeTime: string
  photos: string[]
  latitude: number
  longitude: number
}

export interface MenuFormData {
  dayOfWeek: DayOfWeek
  mealType: MealType
  items: string[]
  specialItem?: string
}

export interface ReviewFormData {
  rating: number
  foodRating: number
  hygieneRating: number
  comment: string
}

// Utility Types
export const CUISINE_LABELS: Record<CuisineType, string> = {
  NORTH_INDIAN: 'North Indian',
  SOUTH_INDIAN: 'South Indian',
  CHINESE: 'Chinese',
  MAHARASHTRIAN: 'Maharashtrian',
  GUJARATI: 'Gujarati',
  BENGALI: 'Bengali',
  PUNJABI: 'Punjabi',
  MULTI_CUISINE: 'Multi Cuisine',
}

export const PRICE_LABELS: Record<PriceRange, string> = {
  BUDGET: 'Budget (< ₹2,000)',
  MODERATE: 'Moderate (₹2,000 - ₹3,500)',
  PREMIUM: 'Premium (> ₹3,500)',
}

export const DAY_LABELS: Record<DayOfWeek, string> = {
  MONDAY: 'Monday',
  TUESDAY: 'Tuesday',
  WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday',
  FRIDAY: 'Friday',
  SATURDAY: 'Saturday',
  SUNDAY: 'Sunday',
}

export const MEAL_LABELS: Record<MealType, string> = {
  BREAKFAST: 'Breakfast',
  LUNCH: 'Lunch',
  DINNER: 'Dinner',
}

export const PLAN_DETAILS: Record<PlanType, { name: string; price: number; features: string[] }> = {
  BASIC: {
    name: 'Basic',
    price: 299,
    features: ['Listing on platform', 'Menu updates', 'Basic analytics'],
  },
  PRO: {
    name: 'Pro',
    price: 499,
    features: ['Everything in Basic', 'Featured listing', 'Advanced analytics', 'Priority support'],
  },
  PREMIUM: {
    name: 'Premium',
    price: 799,
    features: ['Everything in Pro', 'Top placement', 'Promotional banners', 'Dedicated manager'],
  },
}
