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

  // Extract and normalize all 7 share channels from nested map or flat Firestore fields
  const s = (result.shares && typeof result.shares === 'object') ? result.shares : {}
  result.shares = {
    whatsapp: Math.max(Number(s.whatsapp || 0), Number((data as any)['shares.whatsapp'] || 0)),
    sms: Math.max(Number(s.sms || 0), Number((data as any)['shares.sms'] || 0)),
    copy: Math.max(Number(s.copy || 0), Number((data as any)['shares.copy'] || 0)),
    qr: Math.max(Number(s.qr || 0), Number((data as any)['shares.qr'] || 0)),
    image: Math.max(Number(s.image || 0), Number((data as any)['shares.image'] || 0)),
    video: Math.max(Number(s.video || 0), Number((data as any)['shares.video'] || 0)),
    app: Math.max(Number(s.app || 0), Number((data as any)['shares.app'] || 0)),
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
