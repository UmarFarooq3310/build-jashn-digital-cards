import { NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'
import { notifyUserById } from '@/lib/push-admin-notify'

export async function POST(req: Request) {
  try {
    const { cardSlug, cardType, title, body, url } = await req.json()

    if (!cardSlug || !title || !body) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Look up the card to find its creatorId
    const db = getAdminDb()
    const collectionName =
      cardType === 'invite' ? 'invitations'
      : cardType === 'wish' ? 'wishes'
      : cardType === 'vcard' ? 'visitingCards'
      : 'magic_links'

    let creatorId: string | null = null

    // Try direct doc lookup first
    const directDoc = await db.collection(collectionName).doc(cardSlug).get().catch(() => null)
    if (directDoc?.exists) {
      creatorId = (directDoc.data() as any)?.creatorId || null
    }

    // Fallback: query by slug field
    if (!creatorId) {
      const q = await db.collection(collectionName).where('slug', '==', cardSlug).limit(1).get().catch(() => null)
      if (q && !q.empty) {
        creatorId = (q.docs[0].data() as any)?.creatorId || null
      }
    }

    if (!creatorId) {
      return NextResponse.json({ warning: 'Card or creator not found' })
    }

    await notifyUserById(creatorId, title, body, url || '/dashboard')

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('/api/push/notify-creator error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
