import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import connectDB from '@/lib/mongodb'
import Mess from '@/models/Mess'
import { authOptions } from '../../auth/[...nextauth]/route'

// GET - Fetch single mess by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const mess = await Mess.findById(params.id)

    if (!mess) {
      return NextResponse.json(
        { error: 'Mess not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await Mess.findByIdAndUpdate(params.id, { $inc: { totalViews: 1 } })

    return NextResponse.json(mess)
  } catch (error: any) {
    console.error('Error fetching mess:', error)
    return NextResponse.json(
      { error: 'Failed to fetch mess' },
      { status: 500 }
    )
  }
}

// PUT - Update mess (Owner or Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()

    const mess = await Mess.findById(params.id)

    if (!mess) {
      return NextResponse.json(
        { error: 'Mess not found' },
        { status: 404 }
      )
    }

    // Check if user is owner or admin
    const isOwner = mess.ownerId === (session.user as any).id
    const isAdmin = (session.user as any).role === 'ADMIN'

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const updatedMess = await Mess.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    )

    return NextResponse.json({
      message: 'Mess updated successfully',
      mess: updatedMess,
    })
  } catch (error: any) {
    console.error('Error updating mess:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update mess' },
      { status: 500 }
    )
  }
}

// DELETE - Delete mess (Owner or Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()

    const mess = await Mess.findById(params.id)

    if (!mess) {
      return NextResponse.json(
        { error: 'Mess not found' },
        { status: 404 }
      )
    }

    // Check if user is owner or admin
    const isOwner = mess.ownerId === (session.user as any).id
    const isAdmin = (session.user as any).role === 'ADMIN'

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    await Mess.findByIdAndDelete(params.id)

    return NextResponse.json({
      message: 'Mess deleted successfully',
    })
  } catch (error: any) {
    console.error('Error deleting mess:', error)
    return NextResponse.json(
      { error: 'Failed to delete mess' },
      { status: 500 }
    )
  }
}
