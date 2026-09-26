import { NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'
import type { TestimonialItem } from '@/lib/jashn/testimonials'

export const dynamic = 'force-dynamic'

function parseClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  const realIp = req.headers.get('x-real-ip')
  if (realIp) return realIp.trim()
  return '127.0.0.1'
}

// GET: Fetch testimonials from Firestore collection 'testimonials'
export async function GET() {
  try {
    const db = getAdminDb()
    const snap = await db.collection('testimonials').orderBy('createdAt', 'desc').limit(100).get().catch(() => null)

    if (!snap || snap.empty) {
      return NextResponse.json({
        success: true,
        count: 0,
        testimonials: [],
        isSeed: false,
      })
    }

    const testimonials: TestimonialItem[] = snap.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        name: data.name || 'Anonymous Sender',
        role: data.role || 'Happy Sender',
        comment: data.comment || '',
        stars: Number(data.stars ?? data.rating ?? 5),
        color: data.color || 'emerald',
        createdAt: data.createdAt || Date.now(),
        location: data.location || '',
        country: data.country || '',
        city: data.city || '',
        isApproved: data.isApproved !== false,
      }
    })

    return NextResponse.json({
      success: true,
      count: testimonials.length,
      testimonials,
      isSeed: false,
    })
  } catch (error: any) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json({
      success: true,
      count: 0,
      testimonials: [],
      isSeed: false,
    })
  }
}

// POST: Add new customer review / testimonial
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, role, comment, stars = 5, color } = body

    if (!name?.trim() || !comment?.trim()) {
      return NextResponse.json({ error: 'Name and comment are required fields.' }, { status: 400 })
    }

    const db = getAdminDb()

    // Extract geo details from headers or body
    const rawCity = req.headers.get('x-vercel-ip-city') || req.headers.get('x-city') || body.city || ''
    let headerCity = ''
    if (rawCity) {
      try {
        headerCity = decodeURIComponent(rawCity)
      } catch {
        headerCity = rawCity
      }
    }
    const country = body.country || req.headers.get('x-vercel-ip-country') || 'Pakistan'
    const finalLocation = body.location || (headerCity ? `${headerCity}, ${country}` : country)

    const colors = ['emerald', 'amber', 'rose', 'purple', 'blue', 'teal']
    const assignedColor = color || colors[Math.floor(Math.random() * colors.length)]

    const newDocRef = db.collection('testimonials').doc()
    const newTestimonial: TestimonialItem = {
      id: newDocRef.id,
      name: name.trim().slice(0, 60),
      role: (role?.trim() || 'Digital Card Sender').slice(0, 50),
      comment: comment.trim().slice(0, 500),
      stars: Math.max(1, Math.min(5, Number(stars) || 5)),
      color: assignedColor,
      createdAt: Date.now(),
      location: finalLocation,
      country,
      city: headerCity,
      isApproved: true,
    }

    await newDocRef.set(newTestimonial)

    return NextResponse.json({
      success: true,
      testimonial: newTestimonial,
      message: 'Thank you! Your testimonial has been posted.',
    })
  } catch (error: any) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json({ error: error?.message || 'Failed to submit review' }, { status: 500 })
  }
}

// DELETE: Delete a testimonial from Firestore
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing testimonial id' }, { status: 400 })
    }

    const db = getAdminDb()
    await db.collection('testimonials').doc(id).delete()

    return NextResponse.json({
      success: true,
      id,
      message: 'Testimonial deleted from database.',
    })
  } catch (error: any) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json({ error: error?.message || 'Failed to delete review' }, { status: 500 })
  }
}
