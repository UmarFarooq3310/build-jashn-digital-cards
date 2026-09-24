import { NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'

export const dynamic = 'force-dynamic'

function cleanObjectForFirestore(obj: any): any {
  if (obj === null || obj === undefined) return null
  if (typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(cleanObjectForFirestore)
  
  const clean: Record<string, any> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      clean[key] = typeof value === 'object' && value !== null ? cleanObjectForFirestore(value) : value
    }
  }
  return clean
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { action, data } = body

    if (!action || !data) {
      return NextResponse.json({ error: 'Missing action or data' }, { status: 400 })
    }

    const db = getAdminDb()
    const cleaned = cleanObjectForFirestore(data)

    if (action === 'sync_user') {
      const uid = cleaned.uid || cleaned.id
      if (!uid) {
        return NextResponse.json({ error: 'Missing user uid' }, { status: 400 })
      }
      const userRef = db.collection('users').doc(uid)
      await userRef.set(
        {
          ...cleaned,
          updatedAt: Date.now(),
        },
        { merge: true }
      )
      return NextResponse.json({ success: true, action, id: uid })
    }

    if (action === 'sync_wish') {
      const slug = cleaned.slug || cleaned.id
      if (!slug) {
        return NextResponse.json({ error: 'Missing wish slug' }, { status: 400 })
      }
      const wishRef = db.collection('wishes').doc(slug)
      await wishRef.set(
        {
          ...cleaned,
          updatedAt: Date.now(),
        },
        { merge: true }
      )
      return NextResponse.json({ success: true, action, slug })
    }

    if (action === 'sync_invitation') {
      const slug = cleaned.slug || cleaned.id
      if (!slug) {
        return NextResponse.json({ error: 'Missing invitation slug' }, { status: 400 })
      }
      const invRef = db.collection('invitations').doc(slug)
      await invRef.set(
        {
          ...cleaned,
          updatedAt: Date.now(),
        },
        { merge: true }
      )
      return NextResponse.json({ success: true, action, slug })
    }

    if (action === 'sync_vcard') {
      const slug = cleaned.slug || cleaned.id
      if (!slug) {
        return NextResponse.json({ error: 'Missing vcard slug' }, { status: 400 })
      }
      const vcardRef = db.collection('visitingCards').doc(slug)
      await vcardRef.set(
        {
          ...cleaned,
          updatedAt: Date.now(),
        },
        { merge: true }
      )
      return NextResponse.json({ success: true, action, slug })
    }

    if (action === 'sync_magic') {
      const slug = cleaned.slug || cleaned.id
      if (!slug) {
        return NextResponse.json({ error: 'Missing magic link slug' }, { status: 400 })
      }
      const magicRef = db.collection('magic_links').doc(slug)
      await magicRef.set(
        {
          ...cleaned,
          updatedAt: Date.now(),
        },
        { merge: true }
      )
      return NextResponse.json({ success: true, action, slug })
    }

    if (action === 'sync_rsvp') {
      const id = cleaned.id || `rsvp_${Date.now()}`
      const rsvpRef = db.collection('rsvps').doc(id)
      await rsvpRef.set(
        {
          ...cleaned,
          createdAt: cleaned.createdAt || Date.now(),
        },
        { merge: true }
      )
      return NextResponse.json({ success: true, action, id })
    }

    if (action === 'sync_magic_response') {
      const id = cleaned.id || `magic_resp_${Date.now()}`
      const respRef = db.collection('magic_link_responses').doc(id)
      await respRef.set(
        {
          ...cleaned,
          createdAt: cleaned.createdAt || Date.now(),
        },
        { merge: true }
      )
      return NextResponse.json({ success: true, action, id })
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 })
  } catch (error: any) {
    console.error('Error in /api/firestore-sync:', error)
    return NextResponse.json({ error: error?.message || 'Server error syncing to Firestore' }, { status: 500 })
  }
}
