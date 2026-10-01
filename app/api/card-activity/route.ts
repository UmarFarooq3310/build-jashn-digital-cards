import { NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'
import { notifyAdmins, notifyUserById } from '@/lib/push-admin-notify'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { cardType, slug, action, channel, rsvp, reactionEmoji, reactionLabel } = body

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
        const cookieHeader = req.headers.get('cookie') || ''
        const isAdminDevice =
          body.isAdmin === true ||
          cookieHeader.includes('cardzy_admin_device=1') ||
          cookieHeader.includes('cardzy_is_admin=1')

        if (isAdminDevice) {
          return NextResponse.json({ success: true, action: 'view', ignored: 'admin_device' })
        }

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

      if (action === 'reaction' || action === 'like') {
        const reactionId = channel || 'love'
        await targetRef.set(
          {
            [`reactions.${reactionId}`]: FieldValue.increment(1),
            reactionsCount: FieldValue.increment(1),
            likesCount: FieldValue.increment(1),
            likes: FieldValue.increment(1),
            lastReactedAt: Date.now(),
          },
          { merge: true }
        )

        // Notify Admin and Card Creator
        if (rsvp) {
          const status = rsvp.attending ? `Attending (${rsvp.guests || 1} guest/s)` : 'Not attending'
          const rsvpBody = `${rsvp.name || 'A guest'} responded: ${status}`
          notifyAdmins('New RSVP Received! 💌', rsvpBody, '/admin_portal').catch(() => {})
          const creatorId = docSnap.exists ? (docSnap.data() as any)?.creatorId : null
          if (creatorId) {
            notifyUserById(creatorId, 'New RSVP on your card! 💌', rsvpBody, `/dashboard`).catch(() => {})
          }
        } else {
          const emoji = reactionEmoji || (reactionId === 'love' ? '❤️' : reactionId === 'dua' ? '🤲' : reactionId === 'mubarak' ? '🎉' : reactionId === 'congrats' ? '💐' : reactionId === 'cheer' ? '👏' : '😂')
          const label = reactionLabel || reactionId
          const cardTitle = docSnap.exists ? ((docSnap.data() as any)?.title || (docSnap.data() as any)?.name || cleanSlug) : cleanSlug
          const reactionBody = `Someone sent a ${emoji} ${label} reaction on your card!`
          notifyAdmins(`New Reaction on "${cardTitle}" ${emoji}`, `Someone reacted to "${cardTitle}"`, '/admin_portal').catch(() => {})
          const creatorId = docSnap.exists ? (docSnap.data() as any)?.creatorId : null
          if (creatorId) {
            notifyUserById(creatorId, `New reaction on your card! ${emoji}`, reactionBody, `/dashboard`).catch(() => {})
          }
        }

        return NextResponse.json({ success: true, action: 'reaction', channel: reactionId })
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
