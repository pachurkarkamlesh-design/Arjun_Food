import mongoose, { Schema, Model } from 'mongoose'
import type { Role } from '@/types'

export interface IUser {
  _id: string
  name: string
  email: string
  password?: string
  image?: string
  phone?: string
  role: Role
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      select: false, // Don't return password by default
    },
    image: String,
    phone: String,
    role: {
      type: String,
      enum: ['STUDENT', 'MESS_OWNER', 'ADMIN'],
      default: 'STUDENT',
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
UserSchema.index({ email: 1 })
UserSchema.index({ role: 1 })

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User
