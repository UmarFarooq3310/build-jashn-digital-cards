import { NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { action, cardType, slug, metric, operation, value } = body

    if (!action || !cardType || !slug) {
      return NextResponse.json({ error: 'Missing required parameters: action, cardType, slug' }, { status: 400 })
    }

    const cleanSlug = String(slug).replace(/^\/?(i|w|v|m)\//, '').trim()
    const db = getAdminDb()

    const collectionName =
      cardType === 'invite' || cardType === 'invitation'
        ? 'invitations'
        : cardType === 'wish'
        ? 'wishes'
        : cardType === 'vcard' || cardType === 'visitingCard'
        ? 'visitingCards'
        : cardType === 'magic' || cardType === 'magic_link'
        ? 'magic_links'
        : cardType === 'poetry'
        ? 'custom_poetry'
        : ''

    if (!collectionName) {
      return NextResponse.json({ error: `Invalid cardType: ${cardType}` }, { status: 400 })
    }

    // ─────────────────────────────────────────────────────────────
    // 1. ACTION: DELETE CARD & ALL LINKED DATA
    // ─────────────────────────────────────────────────────────────
    if (action === 'delete_card') {
      let docRef = db.collection(collectionName).doc(cleanSlug)
      let docSnap = await docRef.get()

      if (!docSnap.exists) {
        // Fallback by slug property
        let q = await db.collection(collectionName).where('slug', '==', cleanSlug).limit(1).get()
        if (q.empty) {
          q = await db.collection(collectionName).where('id', '==', cleanSlug).limit(1).get()
        }
        if (!q.empty) {
          docRef = q.docs[0].ref
          docSnap = q.docs[0]
        }
      }

      // Delete main document
      if (docSnap.exists) {
        await docRef.delete()
      }

      // Cascade delete linked data
      let deletedRsvps = 0
      let deletedWishes = 0

      // If invitation, delete all linked RSVPs
      if (cardType === 'invite' || cardType === 'invitation') {
        const rsvpsSnap = await db.collection('rsvps').where('invitationSlug', '==', cleanSlug).get().catch(() => ({ docs: [] } as any))
        for (const doc of rsvpsSnap.docs) {
          await doc.ref.delete().catch(() => {})
          deletedRsvps++
        }
        // Also check by invitationId
        const rsvpsById = await db.collection('rsvps').where('invitationId', '==', cleanSlug).get().catch(() => ({ docs: [] } as any))
        for (const doc of rsvpsById.docs) {
          await doc.ref.delete().catch(() => {})
          deletedRsvps++
        }
      }

      // If wish card, delete all linked guestbook wishes
      if (cardType === 'wish') {
        const gwSnap = await db.collection('guestbook_wishes').where('cardSlug', '==', cleanSlug).get().catch(() => ({ docs: [] } as any))
        for (const doc of gwSnap.docs) {
          await doc.ref.delete().catch(() => {})
          deletedWishes++
        }
      }

      // If poetry, clean up from poetry_stats
      if (cardType === 'poetry') {
        await db.collection('poetry_stats').doc(cleanSlug).delete().catch(() => {})
      }

      return NextResponse.json({
        success: true,
        action: 'delete_card',
        cardType,
        slug: cleanSlug,
        deletedRsvps,
        deletedWishes,
        message: `Card ${cleanSlug} and all linked records permanently deleted from Firestore.`,
      })
    }

    // ─────────────────────────────────────────────────────────────
    // 2. ACTION: ADJUST METRICS (Likes, Views, Shares)
    // ─────────────────────────────────────────────────────────────
    if (action === 'adjust_metric') {
      let docRef = db.collection(collectionName).doc(cleanSlug)
      let docSnap = await docRef.get()

      if (!docSnap.exists) {
        let q = await db.collection(collectionName).where('slug', '==', cleanSlug).limit(1).get()
        if (q.empty) {
          q = await db.collection(collectionName).where('id', '==', cleanSlug).limit(1).get()
        }
        if (!q.empty) {
          docRef = q.docs[0].ref
          docSnap = q.docs[0]
        }
      }

      // For poetry, metrics live in poetry_stats
      let poetryStatsRef = cardType === 'poetry' ? db.collection('poetry_stats').doc(cleanSlug) : null

      const currentData = docSnap.exists ? docSnap.data() || {} : {}

      let updatedFields: Record<string, any> = {}

      if (metric === 'likes') {
        const curLikes = Number(currentData.likesCount ?? currentData.likes ?? currentData.reactionsCount ?? 0)
        let newLikes = curLikes

        if (operation === 'decrement') {
          newLikes = Math.max(0, curLikes - 1)
        } else if (operation === 'increment') {
          newLikes = curLikes + 1
        } else if (operation === 'reset') {
          newLikes = 0
        } else if (operation === 'set' && typeof value === 'number') {
          newLikes = Math.max(0, value)
        }

        updatedFields = {
          likesCount: newLikes,
          likes: newLikes,
          reactionsCount: newLikes,
          lastAdjustedAt: Date.now(),
        }

        if (docSnap.exists) {
          await docRef.set(updatedFields, { merge: true })
        }

        if (poetryStatsRef) {
          await poetryStatsRef.set({ likes: newLikes, lastInteractedAt: Date.now() }, { merge: true })
          // Adjust global summary
          const diff = newLikes - curLikes
          if (diff !== 0) {
            await db.collection('poetry_stats').doc('summary').set({
              totalLikes: FieldValue.increment(diff),
              lastActivityAt: Date.now()
            }, { merge: true }).catch(() => {})
          }
        }

        return NextResponse.json({
          success: true,
          action: 'adjust_metric',
          cardType,
          slug: cleanSlug,
          metric: 'likes',
          oldValue: curLikes,
          newValue: newLikes,
        })
      }

      if (metric === 'views') {
        const curViews = Number(currentData.viewCount ?? currentData.viewsCount ?? currentData.views ?? 0)
        let newViews = curViews

        if (operation === 'decrement') {
          newViews = Math.max(0, curViews - 1)
        } else if (operation === 'increment') {
          newViews = curViews + 1
        } else if (operation === 'reset') {
          newViews = 0
        } else if (operation === 'set' && typeof value === 'number') {
          newViews = Math.max(0, value)
        }

        updatedFields = {
          viewCount: newViews,
          viewsCount: newViews,
          views: newViews,
          lastAdjustedAt: Date.now(),
        }

        if (docSnap.exists) {
          await docRef.set(updatedFields, { merge: true })
        }

        if (poetryStatsRef) {
          await poetryStatsRef.set({ views: newViews, lastInteractedAt: Date.now() }, { merge: true })
        }

        return NextResponse.json({
          success: true,
          action: 'adjust_metric',
          cardType,
          slug: cleanSlug,
          metric: 'views',
          oldValue: curViews,
          newValue: newViews,
        })
      }

      if (metric === 'shares') {
        const s = currentData.shares && typeof currentData.shares === 'object' ? currentData.shares : {}
        const totalShares = Object.values(s).reduce((a: number, b: any) => a + (Number(b) || 0), 0)

        let newShares = { ...s }
        if (operation === 'reset') {
          newShares = { whatsapp: 0, sms: 0, copy: 0, qr: 0, image: 0, video: 0, app: 0 }
        } else if (operation === 'decrement') {
          // Decrement highest channel or whatsapp
          const channels = ['whatsapp', 'copy', 'sms', 'qr', 'image', 'video', 'app']
          for (const ch of channels) {
            if ((newShares[ch] || 0) > 0) {
              newShares[ch] = Math.max(0, (newShares[ch] || 0) - 1)
              break
            }
          }
        }

        updatedFields = {
          shares: newShares,
          lastAdjustedAt: Date.now(),
        }

        if (docSnap.exists) {
          await docRef.set(updatedFields, { merge: true })
        }

        if (poetryStatsRef) {
          const newTotal = Object.values(newShares).reduce((a: number, b: any) => a + (Number(b) || 0), 0)
          await poetryStatsRef.set({ shares: newTotal, lastInteractedAt: Date.now() }, { merge: true })
        }

        return NextResponse.json({
          success: true,
          action: 'adjust_metric',
          cardType,
          slug: cleanSlug,
          metric: 'shares',
          oldValue: totalShares,
          newShares,
        })
      }

      return NextResponse.json({ error: `Unknown metric: ${metric}` }, { status: 400 })
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 })
  } catch (error: any) {
    console.error('Error in /api/admin-card-action:', error)
    return NextResponse.json({ error: error?.message || 'Server error in admin-card-action' }, { status: 500 })
  }
}
