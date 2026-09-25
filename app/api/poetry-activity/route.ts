import { NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { poemId, poet, title, action, channel } = body

    if (!poemId || !action) {
      return NextResponse.json({ error: 'Missing poemId or action' }, { status: 400 })
    }

    try {
      const db = getAdminDb()

      if (action === 'delete_stats' || action === 'reset_stats') {
        await db.collection('poetry_stats').doc(poemId).delete().catch(() => {})
        return NextResponse.json({ success: true, poemId, action: 'reset' })
      }

      // 1. Update Global Aggregate Summary
      const summaryRef = db.collection('poetry_stats').doc('summary')
      await summaryRef.set(
        {
          totalInteractions: action === 'unlike' ? FieldValue.increment(-1) : FieldValue.increment(1),
          totalViews: action === 'view' ? FieldValue.increment(1) : FieldValue.increment(0),
          totalCopies: action === 'copy' ? FieldValue.increment(1) : FieldValue.increment(0),
          totalShares: action === 'share' ? FieldValue.increment(1) : FieldValue.increment(0),
          totalFlyers: action === 'flyer' ? FieldValue.increment(1) : FieldValue.increment(0),
          totalCardCreations: action === 'card_bridge' ? FieldValue.increment(1) : FieldValue.increment(0),
          totalLikes: action === 'like' ? FieldValue.increment(1) : action === 'unlike' ? FieldValue.increment(-1) : FieldValue.increment(0),
          lastActivityAt: Date.now(),
        },
        { merge: true }
      )

      // 2. Update Poem-Specific Stats
      const poemRef = db.collection('poetry_stats').doc(poemId)
      await poemRef.set(
        {
          poemId,
          poet: poet || 'Classical Poet',
          title: title || poemId,
          views: action === 'view' ? FieldValue.increment(1) : FieldValue.increment(0),
          copies: action === 'copy' ? FieldValue.increment(1) : FieldValue.increment(0),
          shares: action === 'share' ? FieldValue.increment(1) : FieldValue.increment(0),
          flyers: action === 'flyer' ? FieldValue.increment(1) : FieldValue.increment(0),
          cardCreations: action === 'card_bridge' ? FieldValue.increment(1) : FieldValue.increment(0),
          likes: action === 'like' ? FieldValue.increment(1) : action === 'unlike' ? FieldValue.increment(-1) : FieldValue.increment(0),
          lastInteractedAt: Date.now(),
        },
        { merge: true }
      )

      // 3. Activity Log entry (capped by Firestore)
      const activityRef = db.collection('poetry_activity').doc()
      await activityRef.set({
        poemId,
        poet: poet || '',
        title: title || '',
        action,
        channel: channel || 'web',
        timestamp: Date.now(),
      })

      return NextResponse.json({ success: true, poemId, action })
    } catch (dbErr: any) {
      console.warn('Firebase Admin poetry activity logging warning:', dbErr?.message || dbErr)
      return NextResponse.json({ success: true, offline: true })
    }
  } catch (error: any) {
    console.error('Error in /api/poetry-activity:', error)
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 })
  }
}
