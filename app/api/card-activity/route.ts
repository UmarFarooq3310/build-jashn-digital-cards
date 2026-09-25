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

    const cleanSlug = String(slug).replace(/^\/?(i|w|v|m)\//, '').trim()

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
      let targetRef = db.collection(collectionName).doc(cleanSlug)
      let docSnap = await targetRef.get()

      // Fallback: If doc does not exist by direct ID, search by slug or id property
      if (!docSnap.exists) {
        let qSnap = await db.collection(collectionName).where('slug', '==', cleanSlug).limit(1).get()
        if (qSnap.empty) {
          qSnap = await db.collection(collectionName).where('id', '==', cleanSlug).limit(1).get()
        }
        if (qSnap.empty && slug !== cleanSlug) {
          qSnap = await db.collection(collectionName).where('slug', '==', slug).limit(1).get()
        }
        if (!qSnap.empty) {
          targetRef = qSnap.docs[0].ref
          docSnap = qSnap.docs[0]
        }
      }

      if (action === 'view') {
        const viewField = cardType === 'magic' ? 'viewsCount' : 'viewCount'
        await targetRef.set(
          {
            [viewField]: FieldValue.increment(1),
            viewCount: FieldValue.increment(1),
            viewsCount: FieldValue.increment(1),
            lastViewedAt: Date.now(),
          },
          { merge: true }
        )
        return NextResponse.json({ success: true, action: 'view' })
      }

      if (action === 'share' && channel) {
        const allowedChannels = ['whatsapp', 'sms', 'copy', 'qr', 'image', 'video', 'app']
        const ch = allowedChannels.includes(channel) ? channel : 'whatsapp'

        try {
          await targetRef.update({
            [`shares.${ch}`]: FieldValue.increment(1),
            lastSharedAt: Date.now(),
          })
        } catch {
          await targetRef.set(
            {
              shares: {
                [ch]: FieldValue.increment(1),
              },
              lastSharedAt: Date.now(),
            },
            { merge: true }
          )
        }
        return NextResponse.json({ success: true, action: 'share', channel: ch })
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
