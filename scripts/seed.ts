import { config } from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local FIRST
config({ path: path.join(process.cwd(), '.env.local') })

import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import User from '../models/User'
import Mess from '../models/Mess'
import Review from '../models/Review'

async function seed() {
  console.log('🌱 Starting database seeding...')

  try {
    await connectDB()

    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    await User.deleteMany({})
    await Mess.deleteMany({})
    await Review.deleteMany({})

    // Create users
    console.log('👤 Creating users...')
    const hashedPassword = await bcrypt.hash('demo123', 12)

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@arjunfoodlink.com',
      password: hashedPassword,
      role: 'ADMIN',
      isVerified: true,
    })

    const owner1 = await User.create({
      name: 'Rajesh Kumar',
      email: 'owner@demo.com',
      password: hashedPassword,
      role: 'MESS_OWNER',
      phone: '+91 98765 43210',
      isVerified: true,
    })

    const owner2 = await User.create({
      name: 'Sagar Patil',
      email: 'sagar@mess.com',
      password: hashedPassword,
      role: 'MESS_OWNER',
      phone: '+91 98234 56789',
      isVerified: true,
    })

    const owner3 = await User.create({
      name: 'Harpreet Singh',
      email: 'harpreet@punjabda.com',
      password: hashedPassword,
      role: 'MESS_OWNER',
      phone: '+91 98456 12345',
      isVerified: true,
    })

    const student1 = await User.create({
      name: 'Priya Sharma',
      email: 'student@demo.com',
      password: hashedPassword,
      role: 'STUDENT',
      phone: '+91 97654 32100',
      isVerified: true,
    })

    const student2 = await User.create({
      name: 'Arjun Mehta',
      email: 'arjun@student.com',
      password: hashedPassword,
      role: 'STUDENT',
      isVerified: true,
    })

    console.log('✅ Users created successfully')

    // Create mess listings
    console.log('🍽️  Creating mess listings...')

    const mess1 = await Mess.create({
      name: 'Shree Annapurna Mess',
      description: 'Authentic Maharashtrian home-style cooking with unlimited thali. Daily fresh vegetables from local markets.',
      address: 'Lane 5, Dahanukar Colony',
      locality: 'Kothrud',
      city: 'Pune',
      latitude: 18.5074,
      longitude: 73.8077,
      phone: '+91 98765 43210',
      cuisineTypes: ['MAHARASHTRIAN', 'NORTH_INDIAN'],
      isVeg: true,
      isNonVeg: false,
      priceRange: 'BUDGET',
      monthlyPrice: 3500,
      perMealPrice: 60,
      photos: ['https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800'],
      openTime: '07:30',
      closeTime: '22:00',
      avgRating: 4.6,
      totalReviews: 234,
      isVerified: true,
      isActive: true,
      isFeatured: true,
      totalViews: 1250,
      ownerId: owner1._id.toString(),
    })

    const mess2 = await Mess.create({
      name: 'Sagar Ratna Tiffins',
      description: 'South Indian breakfast specialists with authentic filter coffee. Famous for crispy dosas and soft idlis.',
      address: 'Phoenix Market City Road',
      locality: 'Viman Nagar',
      city: 'Pune',
      latitude: 18.5679,
      longitude: 73.9143,
      phone: '+91 98234 56789',
      cuisineTypes: ['SOUTH_INDIAN'],
      isVeg: true,
      isNonVeg: false,
      priceRange: 'MODERATE',
      monthlyPrice: 4200,
      perMealPrice: 70,
      photos: ['https://images.unsplash.com/photo-1630383249896-424e482df921?w=800'],
      openTime: '06:30',
      closeTime: '21:30',
      avgRating: 4.4,
      totalReviews: 189,
      isVerified: true,
      isActive: true,
      isFeatured: true,
      totalViews: 980,
      ownerId: owner2._id.toString(),
    })

    const mess3 = await Mess.create({
      name: 'Punjab Da Dhaba',
      description: 'Hearty Punjabi food with generous portions and fresh rotis. Non-veg specialties available.',
      address: 'DP Road, Near Bremen',
      locality: 'Aundh',
      city: 'Pune',
      latitude: 18.5590,
      longitude: 73.8070,
      phone: '+91 98456 12345',
      cuisineTypes: ['PUNJABI', 'NORTH_INDIAN'],
      isVeg: false,
      isNonVeg: true,
      priceRange: 'MODERATE',
      monthlyPrice: 4500,
      perMealPrice: 80,
      photos: ['https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800'],
      openTime: '08:00',
      closeTime: '22:30',
      avgRating: 4.5,
      totalReviews: 312,
      isVerified: true,
      isActive: true,
      isFeatured: true,
      totalViews: 1540,
      ownerId: owner3._id.toString(),
    })

    const mess4 = await Mess.create({
      name: "Amma's Kitchen",
      description: 'Homely North Indian meals prepared with love and care. Budget-friendly options for students.',
      address: 'Magarpatta City',
      locality: 'Hadapsar',
      city: 'Pune',
      latitude: 18.5089,
      longitude: 73.9260,
      phone: '+91 97654 32100',
      cuisineTypes: ['NORTH_INDIAN', 'GUJARATI'],
      isVeg: true,
      isNonVeg: false,
      priceRange: 'BUDGET',
      monthlyPrice: 3200,
      perMealPrice: 55,
      photos: ['https://images.unsplash.com/photo-1567337710282-00832b415979?w=800'],
      openTime: '07:00',
      closeTime: '21:00',
      avgRating: 4.3,
      totalReviews: 156,
      isVerified: true,
      isActive: true,
      isFeatured: false,
      totalViews: 720,
      ownerId: owner1._id.toString(),
    })

    const mess5 = await Mess.create({
      name: 'Spice Route',
      description: 'Multi-cuisine mess offering variety. North Indian, Chinese, and Continental dishes.',
      address: 'Baner Road',
      locality: 'Baner',
      city: 'Pune',
      latitude: 18.5598,
      longitude: 73.7854,
      phone: '+91 98123 45678',
      cuisineTypes: ['MULTI_CUISINE', 'NORTH_INDIAN', 'CHINESE'],
      isVeg: false,
      isNonVeg: true,
      priceRange: 'PREMIUM',
      monthlyPrice: 5500,
      perMealPrice: 95,
      photos: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800'],
      openTime: '08:00',
      closeTime: '23:00',
      avgRating: 4.7,
      totalReviews: 421,
      isVerified: true,
      isActive: true,
      isFeatured: true,
      totalViews: 2100,
      ownerId: owner2._id.toString(),
    })

    console.log('✅ Mess listings created successfully')

    // Create reviews
    console.log('⭐ Creating reviews...')

    await Review.create([
      {
        messId: mess1._id.toString(),
        userId: student1._id.toString(),
        rating: 5,
        comment: 'Excellent homely food! The unlimited thali is amazing value for money.',
        foodQuality: 5,
        service: 4,
        cleanliness: 5,
        valueForMoney: 5,
        isVerified: true,
      },
      {
        messId: mess1._id.toString(),
        userId: student2._id.toString(),
        rating: 4,
        comment: 'Great taste but sometimes the service can be slow during peak hours.',
        foodQuality: 5,
        service: 3,
        cleanliness: 4,
        valueForMoney: 5,
        isVerified: true,
      },
      {
        messId: mess2._id.toString(),
        userId: student1._id.toString(),
        rating: 4,
        comment: 'Best dosas in Viman Nagar! The coffee is authentic too.',
        foodQuality: 5,
        service: 4,
        cleanliness: 4,
        valueForMoney: 4,
        isVerified: true,
      },
      {
        messId: mess3._id.toString(),
        userId: student2._id.toString(),
        rating: 5,
        comment: 'If you love Punjabi food, this is the place! Generous portions.',
        foodQuality: 5,
        service: 5,
        cleanliness: 4,
        valueForMoney: 4,
        isVerified: true,
      },
    ])

    console.log('✅ Reviews created successfully')

    console.log('\n🎉 Database seeded successfully!')
    console.log('\n📝 Sample credentials:')
    console.log('Admin: admin@arjunfoodlink.com / demo123')
    console.log('Owner: owner@demo.com / demo123')
    console.log('Student: student@demo.com / demo123')
    console.log(`\nCreated:`)
    console.log(`- ${await User.countDocuments()} users`)
    console.log(`- ${await Mess.countDocuments()} mess listings`)
    console.log(`- ${await Review.countDocuments()} reviews`)

    await mongoose.connection.close()
    console.log('\n✅ Database connection closed')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seed()
