import { NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { cardType, slug, action, channel } = body

    if (!slug || !cardType) {
      return NextResponse.json({ error: 'Missing slug or cardType' }, { status: 400 })
    }

    const collectionName =
      cardType === 'invite'
        ? 'invitations'
        : cardType === 'wish'
        ? 'wishes'
        : cardType === 'vcard'
        ? 'visitingCards'
        : 'magic_links'

    try {
      const db = getAdminDb()
      const docRef = db.collection(collectionName).doc(slug)

      if (action === 'view') {
        const viewField = cardType === 'magic' ? 'viewsCount' : 'viewCount'
        await docRef.set(
          {
            [viewField]: FieldValue.increment(1),
            lastViewedAt: Date.now(),
          },
          { merge: true }
        )
        return NextResponse.json({ success: true, action: 'view' })
      }

      if (action === 'share' && channel) {
        await docRef.set(
          {
            shares: {
              [channel]: FieldValue.increment(1),
            },
            lastSharedAt: Date.now(),
          },
          { merge: true }
        )
        return NextResponse.json({ success: true, action: 'share', channel })
      }
    } catch (dbErr: any) {
      console.warn('Firebase Admin activity logging warning:', dbErr?.message || dbErr)
      return NextResponse.json({ error: dbErr?.message || 'Database activity write error' }, { status: 500 })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    console.error('Error in /api/card-activity:', error)
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 })
  }
}
