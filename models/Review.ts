import mongoose, { Schema, Model } from 'mongoose'

export interface IReview {
  _id: string
  messId: string
  userId: string
  rating: number
  comment?: string
  foodQuality?: number
  service?: number
  cleanliness?: number
  valueForMoney?: number
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

const ReviewSchema = new Schema<IReview>(
  {
    messId: {
      type: String,
      required: true,
      ref: 'Mess',
    },
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: String,
    foodQuality: {
      type: Number,
      min: 1,
      max: 5,
    },
    service: {
      type: Number,
      min: 1,
      max: 5,
    },
    cleanliness: {
      type: Number,
      min: 1,
      max: 5,
    },
    valueForMoney: {
      type: Number,
      min: 1,
      max: 5,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes
ReviewSchema.index({ messId: 1, createdAt: -1 })
ReviewSchema.index({ userId: 1 })
ReviewSchema.index({ messId: 1, userId: 1 }, { unique: true }) // One review per user per mess

const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema)

export default Review
