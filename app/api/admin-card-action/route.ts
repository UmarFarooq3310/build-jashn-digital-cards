import { NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { action, cardType, slug, metric, operation, value } = body

    if (!action) {
      return NextResponse.json({ error: 'Missing required parameter: action' }, { status: 400 })
    }

    const db = getAdminDb()

    // ─────────────────────────────────────────────────────────────
    // 0. ACTION: PURGE ADMIN & LOCAL DEVICE ACTIVE/OFFLINE SESSIONS
    // ─────────────────────────────────────────────────────────────
    if (action === 'purge_admin_sessions') {
      const targetDeviceId = String(body.deviceId || '').trim()
      const targetSessionId = String(body.sessionId || '').trim()
      const targetIp = String(body.ip || '').trim()
      const host = req.headers.get('host') || ''
      const isLocalhost = Boolean(body.isLocalhost) || host.includes('localhost') || host.includes('127.0.0.1')

      const snap = await db.collection('active_sessions').limit(300).get().catch(() => ({ docs: [] } as any))
      const batch = db.batch()
      let deletedCount = 0

      snap.docs.forEach((doc: any) => {
        const d = doc.data()
        const email = String(d.userEmail || '').toLowerCase().trim()
        const page = String(d.page || '')
        const docDevId = String(d.deviceId || '')
        const docIp = String(d.ip || '')
        const docRef = String(d.referrer || '')

        const isAdminDoc =
          page.startsWith('/admin_portal') ||
          email === 'cardzyonline@gmail.com' ||
          (targetDeviceId && docDevId && docDevId === targetDeviceId) ||
          (targetSessionId && doc.id === targetSessionId) ||
          (targetIp && docIp && docIp === targetIp) ||
          (isLocalhost && (
            docIp === '127.0.0.1' ||
            docIp === '::1' ||
            docIp === 'localhost' ||
            docRef.includes('localhost') ||
            docRef.includes('127.0.0.1')
          ))

        if (isAdminDoc) {
          batch.delete(doc.ref)
          deletedCount++
        }
      })

      if (deletedCount > 0) {
        await batch.commit().catch(() => {})
      }

      return NextResponse.json({
        success: true,
        action: 'purge_admin_sessions',
        deletedCount,
        message: `Purged ${deletedCount} admin/device sessions from database.`,
      })
    }

    // ─────────────────────────────────────────────────────────────
    // 0.1 ACTION: RESET ALL POETRY STATS & ACTIVITY LOGS
    // ─────────────────────────────────────────────────────────────
    if (action === 'reset_all_poetry_stats') {
      const statsSnap = await db.collection('poetry_stats').get().catch(() => ({ docs: [] } as any))
      const actSnap = await db.collection('poetry_activity').get().catch(() => ({ docs: [] } as any))

      const batch = db.batch()
      statsSnap.docs.forEach((d: any) => batch.delete(d.ref))
      actSnap.docs.forEach((d: any) => batch.delete(d.ref))
      await batch.commit().catch(() => {})

      return NextResponse.json({
        success: true,
        action: 'reset_all_poetry_stats',
        deletedStats: statsSnap.docs.length,
        deletedActivities: actSnap.docs.length,
        message: 'All poetry engagement metrics and activity records reset to 0.',
      })
    }

    if (!cardType || !slug) {
      return NextResponse.json({ error: 'Missing required parameters: cardType, slug' }, { status: 400 })
    }

    const cleanSlug = String(slug).replace(/^\/?(i|w|v|m)\//, '').trim()

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
      if (cardType === 'poetry') {
        // Fast parallel execution for poetry deletion
        await Promise.allSettled([
          // Direct delete custom poem doc & poetry doc
          db.collection('custom_poetry').doc(cleanSlug).delete().catch(() => {}),
          db.collection('poetry').doc(cleanSlug).delete().catch(() => {}),
          // Direct delete poetry stats doc
          db.collection('poetry_stats').doc(cleanSlug).delete().catch(() => {}),
          // Purge poetry activity matching poemId in one batch
          db.collection('poetry_activity').where('poemId', '==', cleanSlug).limit(100).get().then(async (snap) => {
            if (!snap || snap.empty) return
            const batch = db.batch()
            snap.docs.forEach((doc) => batch.delete(doc.ref))
            await batch.commit().catch(() => {})
          }).catch(() => {}),
          // Purge poetry activity matching title in one batch
          db.collection('poetry_activity').where('title', '==', cleanSlug).limit(100).get().then(async (snap) => {
            if (!snap || snap.empty) return
            const batch = db.batch()
            snap.docs.forEach((doc) => batch.delete(doc.ref))
            await batch.commit().catch(() => {})
          }).catch(() => {})
        ])

        return NextResponse.json({
          success: true,
          action: 'delete_card',
          cardType,
          slug: cleanSlug,
          deletedRsvps: 0,
          deletedWishes: 0,
          message: `Poetry card ${cleanSlug} and all linked records permanently deleted from Firestore.`,
        })
      }

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

      // Cascade delete linked data in parallel
      let deletedRsvps = 0
      let deletedWishes = 0

      const cleanupTasks: Promise<any>[] = []

      // Delete main document
      if (docSnap.exists) {
        cleanupTasks.push(docRef.delete().catch(() => {}))
      }

      // If invitation, delete all linked RSVPs via batch
      if (cardType === 'invite' || cardType === 'invitation') {
        cleanupTasks.push(
          (async () => {
            const [rsvpsSnap, rsvpsById] = await Promise.all([
              db.collection('rsvps').where('invitationSlug', '==', cleanSlug).get().catch(() => ({ docs: [] } as any)),
              db.collection('rsvps').where('invitationId', '==', cleanSlug).get().catch(() => ({ docs: [] } as any)),
            ])
            const allRsvpDocs = [...(rsvpsSnap.docs || []), ...(rsvpsById.docs || [])]
            if (allRsvpDocs.length > 0) {
              const batch = db.batch()
              allRsvpDocs.forEach((d) => batch.delete(d.ref))
              await batch.commit().catch(() => {})
              deletedRsvps = allRsvpDocs.length
            }
          })()
        )
      }

      // If wish card, delete all linked guestbook wishes via batch
      if (cardType === 'wish') {
        cleanupTasks.push(
          (async () => {
            const gwSnap = await db.collection('guestbook_wishes').where('cardSlug', '==', cleanSlug).get().catch(() => ({ docs: [] } as any))
            if (gwSnap.docs && gwSnap.docs.length > 0) {
              const batch = db.batch()
              gwSnap.docs.forEach((d: any) => batch.delete(d.ref))
              await batch.commit().catch(() => {})
              deletedWishes = gwSnap.docs.length
            }
          })()
        )
      }

      await Promise.allSettled(cleanupTasks)

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
          db.collection('poetry_stats').doc('summary').delete().catch(() => {})
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
