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

  const countryCode = rawCountry ? rawCountry.toUpperCase() : ''
  const country = countryCode ? getCountryName(countryCode) : ''

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

  const region =
    headers.get('x-vercel-ip-country-region') ||
    headers.get('x-region') ||
    ''

  const forwardedFor = headers.get('x-forwarded-for')
  const realIp = headers.get('x-real-ip')
  const ip = parseClientIp(forwardedFor, realIp)

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
