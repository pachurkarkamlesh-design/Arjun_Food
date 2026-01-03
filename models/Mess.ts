import mongoose, { Schema, Model } from 'mongoose'
import type { PriceRange } from '@/types'

export interface IMess {
  _id: string
  name: string
  description?: string
  address: string
  locality: string
  city: string
  latitude: number
  longitude: number
  phone: string
  cuisineTypes: string[]
  isVeg: boolean
  isNonVeg: boolean
  priceRange: PriceRange
  monthlyPrice?: number
  perMealPrice?: number
  photos: string[]
  openTime: string
  closeTime: string
  avgRating: number
  totalReviews: number
  isVerified: boolean
  isActive: boolean
  isFeatured: boolean
  totalViews: number
  ownerId: string
  createdAt: Date
  updatedAt: Date
}

const MessSchema = new Schema<IMess>(
  {
    name: {
      type: String,
      required: [true, 'Mess name is required'],
    },
    description: String,
    address: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      default: 'Pune',
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    cuisineTypes: {
      type: [String],
      default: [],
    },
    isVeg: {
      type: Boolean,
      default: true,
    },
    isNonVeg: {
      type: Boolean,
      default: false,
    },
    priceRange: {
      type: String,
      enum: ['BUDGET', 'MODERATE', 'PREMIUM'],
      default: 'MODERATE',
    },
    monthlyPrice: Number,
    perMealPrice: Number,
    photos: {
      type: [String],
      default: [],
    },
    openTime: {
      type: String,
      default: '08:00',
    },
    closeTime: {
      type: String,
      default: '22:00',
    },
    avgRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    totalViews: {
      type: Number,
      default: 0,
    },
    ownerId: {
      type: String,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

// Indexes for better query performance
MessSchema.index({ city: 1, locality: 1 })
MessSchema.index({ avgRating: -1 })
MessSchema.index({ isFeatured: 1, isActive: 1 })
MessSchema.index({ ownerId: 1 })
MessSchema.index({ location: '2dsphere' })

// Virtual field for location
MessSchema.virtual('location').get(function() {
  return {
    type: 'Point',
    coordinates: [this.longitude, this.latitude],
  }
})

const Mess: Model<IMess> = mongoose.models.Mess || mongoose.model<IMess>('Mess', MessSchema)

export default Mess
