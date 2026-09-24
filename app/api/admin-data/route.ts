import { NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'

export const dynamic = 'force-dynamic'

function normalizeFirestoreData(data: any): any {
  if (!data || typeof data !== 'object') return data
  if (Array.isArray(data)) return data.map(normalizeFirestoreData)
  const result: any = {}
  for (const [key, val] of Object.entries(data)) {
    if (val && typeof val === 'object' && ('_seconds' in (val as any) || 'seconds' in (val as any))) {
      const s = (val as any)._seconds ?? (val as any).seconds ?? 0
      const ns = (val as any)._nanoseconds ?? (val as any).nanoseconds ?? 0
      result[key] = s * 1000 + Math.floor(ns / 1000000)
    } else if (val && typeof val === 'object') {
      result[key] = normalizeFirestoreData(val)
    } else {
      result[key] = val
    }
  }

  // Ensure all 6 share channels exist for legacy records created prior to tracking
  if (!result.shares || typeof result.shares !== 'object') {
    result.shares = { whatsapp: 0, sms: 0, copy: 0, qr: 0, image: 0, video: 0 }
  } else {
    result.shares = {
      whatsapp: Number(result.shares.whatsapp || 0),
      sms: Number(result.shares.sms || 0),
      copy: Number(result.shares.copy || 0),
      qr: Number(result.shares.qr || 0),
      image: Number(result.shares.image || 0),
      video: Number(result.shares.video || 0),
    }
  }

  return result
}

export async function GET() {
  try {
    const db = getAdminDb()

    const [
      usersSnap,
      invitationsSnap,
      wishesSnap,
      vCardsSnap,
      rsvpsSnap,
      magicLinksSnap,
    ] = await Promise.all([
      db.collection('users').get().catch(() => ({ docs: [] } as any)),
      db.collection('invitations').get().catch(() => ({ docs: [] } as any)),
      db.collection('wishes').get().catch(() => ({ docs: [] } as any)),
      db.collection('visitingCards').get().catch(() => ({ docs: [] } as any)),
      db.collection('rsvps').get().catch(() => ({ docs: [] } as any)),
      db.collection('magic_links').get().catch(() => ({ docs: [] } as any)),
    ])

    const users = usersSnap.docs.map((doc: any) => ({
      uid: doc.id,
      ...normalizeFirestoreData(doc.data()),
    }))

    const invitations = invitationsSnap.docs.map((doc: any) => ({
      id: doc.id,
      slug: doc.id,
      ...normalizeFirestoreData(doc.data()),
    }))

    const wishes = wishesSnap.docs.map((doc: any) => ({
      id: doc.id,
      slug: doc.id,
      ...normalizeFirestoreData(doc.data()),
    }))

    const visitingCards = vCardsSnap.docs.map((doc: any) => ({
      id: doc.id,
      slug: doc.id,
      ...normalizeFirestoreData(doc.data()),
    }))

    const rsvps = rsvpsSnap.docs.map((doc: any) => ({
      id: doc.id,
      ...normalizeFirestoreData(doc.data()),
    }))

    const magicLinks = magicLinksSnap.docs.map((doc: any) => ({
      id: doc.id,
      slug: doc.id,
      ...normalizeFirestoreData(doc.data()),
    }))

    return NextResponse.json({
      success: true,
      users,
      invitations,
      wishes,
      visitingCards,
      rsvps,
      magicLinks,
      timestamp: Date.now(),
    })
  } catch (error: any) {
    console.error('Error in /api/admin-data:', error)
    return NextResponse.json({ error: error?.message || 'Server error loading admin data' }, { status: 500 })
  }
}
