export interface ClientTrackingInfo {
  country?: string
  countryCode?: string
  city?: string
  region?: string
  ip?: string
  device?: string
  browser?: string
  os?: string
  createdLocation?: string
}

let cachedTracking: ClientTrackingInfo | null = null

export function getFlagEmoji(countryCode?: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌐'
  try {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  } catch {
    return '🌐'
  }
}

export function parseDeviceAndBrowser(userAgentString?: string): {
  device: string
  browser: string
  os: string
} {
  const ua = userAgentString || (typeof navigator !== 'undefined' ? navigator.userAgent : '') || ''
  if (!ua) {
    return { device: 'Unknown Device', browser: 'Unknown Browser', os: 'Unknown OS' }
  }

  // Detect OS
  let os = 'Unknown OS'
  if (/windows phone/i.test(ua)) os = 'Windows Phone'
  else if (/win(dows|98|nt|xp|7|8|10|11)/i.test(ua)) os = 'Windows'
  else if (/ipad/i.test(ua)) os = 'iPadOS'
  else if (/iphone|ipod/i.test(ua)) os = 'iOS'
  else if (/android/i.test(ua)) os = 'Android'
  else if (/mac(intosh|_os_x)/i.test(ua)) os = 'macOS'
  else if (/cros/i.test(ua)) os = 'Chrome OS'
  else if (/linux/i.test(ua)) os = 'Linux'

  // Detect Device Category
  let device = 'Desktop'
  const isMobile = /mobile|iphone|ipod|android.*mobile|blackberry|phone|iemobile/i.test(ua)
  const isTablet = /ipad|tablet|(android(?!.*mobile))/i.test(ua)
  if (isTablet) {
    device = `Tablet (${os})`
  } else if (isMobile) {
    device = `Mobile (${os})`
  } else {
    device = `Desktop (${os})`
  }

  // Detect Browser
  let browser = 'Unknown Browser'
  if (/edg/i.test(ua)) browser = 'Edge'
  else if (/samsungbrowser/i.test(ua)) browser = 'Samsung Internet'
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome'
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox'
  else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) browser = 'Safari'
  else if (/opera|opr/i.test(ua)) browser = 'Opera'

  return { device, browser, os }
}

const TIMEZONE_MAP: Record<string, { country: string; code: string; city: string }> = {
  'Asia/Karachi': { country: 'Pakistan', code: 'PK', city: 'Karachi' },
  'Asia/Lahore': { country: 'Pakistan', code: 'PK', city: 'Lahore' },
  'Asia/Dubai': { country: 'United Arab Emirates', code: 'AE', city: 'Dubai' },
  'Asia/Riyadh': { country: 'Saudi Arabia', code: 'SA', city: 'Riyadh' },
  'Asia/Muscat': { country: 'Oman', code: 'OM', city: 'Muscat' },
  'Asia/Doha': { country: 'Qatar', code: 'QA', city: 'Doha' },
  'Asia/Kuwait': { country: 'Kuwait', code: 'KW', city: 'Kuwait City' },
  'Asia/Bahrain': { country: 'Bahrain', code: 'BH', city: 'Manama' },
  'Asia/Kolkata': { country: 'India', code: 'IN', city: 'New Delhi' },
  'Asia/Dhaka': { country: 'Bangladesh', code: 'BD', city: 'Dhaka' },
  'Europe/London': { country: 'United Kingdom', code: 'GB', city: 'London' },
  'America/New_York': { country: 'United States', code: 'US', city: 'New York' },
  'America/Chicago': { country: 'United States', code: 'US', city: 'Chicago' },
  'America/Los_Angeles': { country: 'United States', code: 'US', city: 'Los Angeles' },
  'America/Toronto': { country: 'Canada', code: 'CA', city: 'Toronto' },
  'Australia/Sydney': { country: 'Australia', code: 'AU', city: 'Sydney' },
  'Australia/Melbourne': { country: 'Australia', code: 'AU', city: 'Melbourne' },
  'Europe/Berlin': { country: 'Germany', code: 'DE', city: 'Berlin' },
  'Europe/Paris': { country: 'France', code: 'FR', city: 'Paris' },
  'Asia/Singapore': { country: 'Singapore', code: 'SG', city: 'Singapore' },
  'Asia/Kuala_Lumpur': { country: 'Malaysia', code: 'MY', city: 'Kuala Lumpur' },
  'Asia/Jakarta': { country: 'Indonesia', code: 'ID', city: 'Jakarta' },
  'Asia/Istanbul': { country: 'Turkey', code: 'TR', city: 'Istanbul' },
  'Africa/Cairo': { country: 'Egypt', code: 'EG', city: 'Cairo' },
}

export function inferClientFallback(): ClientTrackingInfo {
  let tz = ''
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
  } catch {
    tz = ''
  }

  const { device, browser, os } = parseDeviceAndBrowser()
  const tzMatch = tz ? TIMEZONE_MAP[tz] : null

  const country = tzMatch ? tzMatch.country : 'Unknown Country'
  const countryCode = tzMatch ? tzMatch.code : ''
  const city = tzMatch ? tzMatch.city : tz.split('/').pop()?.replace(/_/g, ' ') || ''

  const parts = [city, country].filter(Boolean)
  const createdLocation = parts.length > 0 ? parts.join(', ') : 'Web Client'

  return {
    country,
    countryCode,
    city,
    device,
    browser,
    os,
    createdLocation,
  }
}

/**
 * Non-blocking client tracking fetch with 1.5s timeout.
 * Guaranteed to return quickly and never fail or block the UI.
 */
export async function getClientTracking(): Promise<ClientTrackingInfo> {
  if (cachedTracking) return cachedTracking

  if (typeof window === 'undefined') {
    return {
      country: 'Server',
      device: 'Server',
      createdLocation: 'Server Process',
    }
  }

  const fallback = inferClientFallback()

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 1500)

    const res = await fetch('/api/geo', {
      signal: controller.signal,
      cache: 'no-store',
    })
    clearTimeout(timeoutId)

    if (res.ok) {
      const data = await res.json()
      const { device, browser, os } = parseDeviceAndBrowser(data.userAgent)

      const country = data.country || fallback.country || ''
      const countryCode = data.countryCode || fallback.countryCode || ''
      const city = data.city || fallback.city || ''
      const region = data.region || ''
      const ip = data.ip || ''

      const locParts: string[] = []
      if (city) locParts.push(city)
      if (region && region !== city) locParts.push(region)
      if (country) locParts.push(country)

      const createdLocation = locParts.length > 0 ? locParts.join(', ') : (fallback.createdLocation || 'Web Client')

      cachedTracking = {
        country,
        countryCode,
        city,
        region,
        ip,
        device,
        browser,
        os,
        createdLocation,
      }
      return cachedTracking
    }
  } catch {
    // Network or timeout failure - fallback will be used
  }

  cachedTracking = fallback
  return cachedTracking
}
