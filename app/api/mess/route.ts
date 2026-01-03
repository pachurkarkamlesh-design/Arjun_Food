import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import connectDB from '@/lib/mongodb'
import Mess from '@/models/Mess'
import { authOptions } from '../auth/[...nextauth]/route'

// GET - Fetch all mess with filters
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const locality = searchParams.get('locality')
    const cuisineType = searchParams.get('cuisineType')
    const isVeg = searchParams.get('isVeg')
    const priceRange = searchParams.get('priceRange')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '20')
    const page = parseInt(searchParams.get('page') || '1')

    // Build query
    const query: any = { isActive: true }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { locality: { $regex: search, $options: 'i' } },
      ]
    }

    if (locality) {
      query.locality = locality
    }

    if (cuisineType) {
      query.cuisineTypes = { $in: [cuisineType] }
    }

    if (isVeg === 'true') {
      query.isVeg = true
      query.isNonVeg = false
    }

    if (priceRange) {
      query.priceRange = priceRange
    }

    if (featured === 'true') {
      query.isFeatured = true
    }

    // Execute query with pagination
    const skip = (page - 1) * limit
    const [mess, total] = await Promise.all([
      Mess.find(query)
        .sort({ isFeatured: -1, avgRating: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Mess.countDocuments(query),
    ])

    return NextResponse.json({
      mess,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    console.error('Error fetching mess:', error)
    return NextResponse.json(
      { error: 'Failed to fetch mess' },
      { status: 500 }
    )
  }
}

// POST - Create new mess (Owner or Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !['MESS_OWNER', 'ADMIN'].includes((session.user as any).role)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    await connectDB()

    // Create mess with owner ID from session
    const mess = await Mess.create({
      ...body,
      ownerId: (session.user as any).id,
      isVerified: (session.user as any).role === 'ADMIN', // Auto-verify if admin
    })

    return NextResponse.json(
      { message: 'Mess created successfully', mess },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating mess:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create mess' },
      { status: 500 }
    )
  }
}
