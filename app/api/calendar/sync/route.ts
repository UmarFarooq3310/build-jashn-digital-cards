import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface NagerHoliday {
  date: string
  localName: string
  name: string
  countryCode: string
  fixed: boolean
  global: boolean
  types: string[]
}

// Approximate Hijri conversion algorithm for reliable offline/online fallback
function calculateHijriDate(date: Date) {
  const jd = Math.floor(date.getTime() / 86400000) + 2440588
  let l = jd - 1948440 + 10632
  const n = Math.floor((l - 1) / 10631)
  l = l - 10631 * n + 354
  const j = Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) + Math.floor(l / 5670) * Math.floor((43 * l) / 15238)
  l = l - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29
  const m = Math.floor((24 * l) / 709)
  const d = l - Math.floor((709 * m) / 24)
  const y = 30 * n + j - 30

  const HIJRI_MONTHS = [
    'Muharram', 'Safar', 'Rabi-ul-Awwal', 'Rabi-us-Sani',
    'Jumada al-Awwal', 'Jumada al-Sani', 'Rajab', 'Shaban',
    'Ramadan', 'Shawwal', 'Dhul-Qadah', 'Dhul-Hijjah'
  ]

  const monthName = HIJRI_MONTHS[(m - 1 + 12) % 12] || 'Rabi-ul-Awwal'

  return {
    day: d,
    month: monthName,
    year: y,
    formatted: `${d} ${monthName} ${y} AH`,
  }
}

export async function GET() {
  const now = new Date()
  const fallbackHijri = calculateHijriDate(now)

  let liveHolidays: Array<{
    title: string
    date: string
    countryCode: string
    localName: string
  }> = []

  let source = 'Cardzy Astronomical Engine'

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4500)

    // Public Worldwide Holidays API (free, open, no key required)
    const res = await fetch('https://date.nager.at/api/v3/NextPublicHolidaysWorldwide', {
      signal: controller.signal,
      next: { revalidate: 3600 }, // Cache 1 hour
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Cardzy-Celebration-Calendar/1.0',
      },
    })
    clearTimeout(timeoutId)

    if (res.ok) {
      const data: NagerHoliday[] = await res.json()
      if (Array.isArray(data)) {
        liveHolidays = data.slice(0, 30).map((h) => ({
          title: h.name || h.localName,
          date: h.date,
          countryCode: h.countryCode,
          localName: h.localName,
        }))
        source = 'Live Nager.Date Global Holidays API'
      }
    }
  } catch {
    // Graceful fallback to offline catalog if API is unreachable
    source = 'Cardzy Astronomical Engine (Offline Mode)'
  }

  return NextResponse.json({
    success: true,
    syncedAt: now.toISOString(),
    source,
    hijri: fallbackHijri,
    liveHolidays,
  })
}
