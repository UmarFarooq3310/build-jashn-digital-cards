import { NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

export const dynamic = 'force-dynamic'

function parseClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0].trim()
    if (first && first !== '::1' && first !== '127.0.0.1') return first
  }
  const realIp = req.headers.get('x-real-ip')
  if (realIp && realIp !== '::1' && realIp !== '127.0.0.1') return realIp
  return '127.0.0.1'
}

function parseDevice(userAgent?: string): { device: string; browser: string } {
  const ua = userAgent || ''
  if (!ua) return { device: 'Web Client', browser: 'Browser' }

  let os = 'OS'
  if (/windows/i.test(ua)) os = 'Windows'
  else if (/ipad/i.test(ua)) os = 'iPadOS'
  else if (/iphone/i.test(ua)) os = 'iOS'
  else if (/android/i.test(ua)) os = 'Android'
  else if (/mac/i.test(ua)) os = 'macOS'
  else if (/linux/i.test(ua)) os = 'Linux'

  let device = 'Desktop'
  if (/tablet|ipad/i.test(ua)) device = `Tablet (${os})`
  else if (/mobile|iphone|android/i.test(ua)) device = `Mobile (${os})`
  else device = `Desktop (${os})`

  let browser = 'Browser'
  if (/edg/i.test(ua)) browser = 'Edge'
  else if (/chrome/i.test(ua)) browser = 'Chrome'
  else if (/safari/i.test(ua)) browser = 'Safari'
  else if (/firefox/i.test(ua)) browser = 'Firefox'

  return { device, browser }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { poemId, poet, title, action, channel } = body

    if (!poemId || !action) {
      return NextResponse.json({ error: 'Missing poemId or action' }, { status: 400 })
    }

    const userEmail = String(body.userEmail || '').toLowerCase().trim()
    const isAdmin = body.isAdmin || userEmail === 'cardzyonline@gmail.com'

    // Allow testing & live actions, only skip if explicitly requested
    if (body.skipTracking) {
      return NextResponse.json({ success: true, ignored: true, reason: 'skip_requested' })
    }

    try {
      const db = getAdminDb()

      if (action === 'delete_stats' || action === 'reset_stats') {
        await db.collection('poetry_stats').doc(poemId).delete().catch(() => {})
        return NextResponse.json({ success: true, poemId, action: 'reset' })
      }

      // Geolocation and device extraction
      const headerIp = parseClientIp(req)
      const headerCountryCode = (
        req.headers.get('x-vercel-ip-country') ||
        req.headers.get('cf-ipcountry') ||
        req.headers.get('x-country-code') ||
        ''
      ).toUpperCase()

      const rawCity = req.headers.get('x-vercel-ip-city') || req.headers.get('x-city') || ''
      let headerCity = ''
      if (rawCity) {
        try {
          headerCity = decodeURIComponent(rawCity)
        } catch {
          headerCity = rawCity
        }
      }

      const userAgent = req.headers.get('user-agent') || ''
      const parsedDevice = parseDevice(userAgent)

      const finalIp = body.ip || (headerIp !== '127.0.0.1' ? headerIp : '') || '127.0.0.1'
      const finalCountryCode = body.countryCode || headerCountryCode || 'PK'
      const finalCountry = body.country || (finalCountryCode === 'PK' ? 'Pakistan' : finalCountryCode)
      const finalCity = body.city || headerCity || ''
      const finalDevice = body.device || parsedDevice.device
      const finalBrowser = body.browser || parsedDevice.browser
      const finalUserName = body.userName && body.userName.trim() ? body.userName.trim() : (isAdmin ? 'Admin (Test)' : 'Guest Visitor')
      const finalLocation = body.createdLocation || (finalCity ? `${finalCity}, ${finalCountry}` : finalCountry || 'Pakistan')

      // Ensure summary document is never kept in poetry_stats (user only wants individual poem docs)
      db.collection('poetry_stats').doc('summary').delete().catch(() => {})

      // 1. Update Poem-Specific Stats (poem-0001, poem-0002, etc.)
      const poemRef = db.collection('poetry_stats').doc(poemId)
      const isView = action === 'view' || action === 'click'
      const isFlyer = action === 'flyer' || action === 'download'
      const isLike = action === 'like'
      const isUnlike = action === 'unlike'

      const poemUpdates: Record<string, any> = {
        poemId,
        poet: poet || 'Classical Poet',
        title: title || poemId,
        views: isView ? FieldValue.increment(1) : FieldValue.increment(0),
        copies: action === 'copy' ? FieldValue.increment(1) : FieldValue.increment(0),
        shares: action === 'share' ? FieldValue.increment(1) : FieldValue.increment(0),
        flyers: isFlyer ? FieldValue.increment(1) : FieldValue.increment(0),
        cardCreations: action === 'card_bridge' ? FieldValue.increment(1) : FieldValue.increment(0),
        likes: isLike ? FieldValue.increment(1) : isUnlike ? FieldValue.increment(-1) : FieldValue.increment(0),
        lastInteractedAt: Date.now(),
      }

      if (finalCity) poemUpdates.lastCity = finalCity
      if (finalCountry) poemUpdates.lastCountry = finalCountry
      poemUpdates.lastUserName = finalUserName

      await poemRef.set(poemUpdates, { merge: true })

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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const idsParam = searchParams.get('ids')
    const db = getAdminDb()

    const statsMap: Record<string, { views: number; copies: number; shares: number; flyers: number; likes: number }> = {}

    if (idsParam) {
      const ids = idsParam
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 50)

      if (ids.length > 0) {
        const docRefs = ids.map((id) => db.collection('poetry_stats').doc(id))
        const docSnaps = await db.getAll(...docRefs).catch(() => [])
        docSnaps.forEach((docSnap) => {
          if (docSnap && docSnap.exists) {
            const data = docSnap.data() || {}
            statsMap[docSnap.id] = {
              views: Number(data.views) || 0,
              copies: Number(data.copies) || 0,
              shares: Number(data.shares) || 0,
              flyers: Number(data.flyers) || 0,
              likes: Number(data.likes) || 0,
            }
          }
        })
      }
    } else {
      const snapshot = await db.collection('poetry_stats').limit(250).get().catch(() => ({ docs: [] } as any))
      snapshot.docs.forEach((d: any) => {
        if (d.id === 'summary') return
        const data = d.data() || {}
        statsMap[d.id] = {
          views: Number(data.views) || 0,
          copies: Number(data.copies) || 0,
          shares: Number(data.shares) || 0,
          flyers: Number(data.flyers) || 0,
          likes: Number(data.likes) || 0,
        }
      })
    }

    return NextResponse.json({ success: true, stats: statsMap })
  } catch (err: any) {
    console.warn('Error fetching poetry stats:', err?.message || err)
    return NextResponse.json({ success: true, stats: {} })
  }
}
