import { NextResponse } from 'next/server'

export const runtime = 'edge'

function parseClientIp(forwardedFor: string | null, realIp: string | null): string {
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0].trim()
    if (first && first !== '::1' && first !== '127.0.0.1') return first
  }
  if (realIp && realIp !== '::1' && realIp !== '127.0.0.1') return realIp
  return '127.0.0.1'
}

function getCountryName(countryCode?: string): string {
  if (!countryCode || countryCode.length !== 2) return ''
  try {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
    return regionNames.of(countryCode.toUpperCase()) || countryCode
  } catch {
    return countryCode
  }
}

export async function GET(request: Request) {
  const headers = new Headers(request.headers)

  const rawCountry =
    headers.get('x-vercel-ip-country') ||
    headers.get('cf-ipcountry') ||
    headers.get('x-country-code') ||
    ''

  let countryCode = rawCountry ? rawCountry.toUpperCase() : ''
  let country = countryCode ? getCountryName(countryCode) : ''

  const rawCity =
    headers.get('x-vercel-ip-city') ||
    headers.get('x-city') ||
    ''
  let city = ''
  if (rawCity) {
    try {
      city = decodeURIComponent(rawCity)
    } catch {
      city = rawCity
    }
  }

  let region =
    headers.get('x-vercel-ip-country-region') ||
    headers.get('x-region') ||
    ''

  const forwardedFor = headers.get('x-forwarded-for')
  const realIp = headers.get('x-real-ip')
  const ip = parseClientIp(forwardedFor, realIp)

  // If city is not provided by edge headers and we have a valid public client IP, look it up
  if (!city && ip && ip !== '127.0.0.1') {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 1800)
      const ipRes = await fetch(`https://ipwho.is/${ip}`, { signal: controller.signal })
      clearTimeout(timeoutId)
      if (ipRes.ok) {
        const ipData = await ipRes.json()
        if (ipData.success !== false) {
          if (ipData.city) city = ipData.city
          if (!region && ipData.region) region = ipData.region
          if (!country && ipData.country) country = ipData.country
          if (!countryCode && ipData.country_code) countryCode = ipData.country_code
        }
      }
    } catch {}
  }

  const userAgent = headers.get('user-agent') || ''

  return NextResponse.json(
    {
      ip,
      country,
      countryCode,
      city,
      region,
      userAgent,
      timestamp: Date.now(),
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  )
}
