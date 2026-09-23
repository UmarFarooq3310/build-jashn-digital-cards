const fs = require('fs');
let file = fs.readFileSync('lib/jashn/tracking.ts', 'utf8');

const oldCode = `    const res = await fetch('/api/geo', {
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
      const ip = data.ip || ''`;

const newCode = `    let data: any = {}
    
    // First try to get precise city from a free client-side IP API
    try {
      const externalRes = await fetch('https://ipapi.co/json/', { signal: controller.signal })
      if (externalRes.ok) {
        const externalData = await externalRes.json()
        if (externalData.city) {
          data.city = externalData.city
          data.region = externalData.region
          data.countryCode = externalData.country_code
          data.country = externalData.country_name
          data.ip = externalData.ip
        }
      }
    } catch (e) {
      // Ignore if adblocker blocks it
    }

    // Fallback to our internal Vercel headers API if ipapi failed or got blocked
    if (!data.city) {
      const res = await fetch('/api/geo', {
        signal: controller.signal,
        cache: 'no-store',
      })
      if (res.ok) {
        const internalData = await res.json()
        data = { ...internalData }
      }
    }
    
    clearTimeout(timeoutId)

    if (data && Object.keys(data).length > 0) {
      const { device, browser, os } = parseDeviceAndBrowser(data.userAgent || typeof navigator !== 'undefined' ? navigator.userAgent : '')

      const country = data.country || fallback.country || ''
      const countryCode = data.countryCode || fallback.countryCode || ''
      // If we STILL don't have a city, only use the timezone fallback as a last resort
      const city = data.city || fallback.city || ''
      const region = data.region || ''
      const ip = data.ip || ''`;

file = file.replace(oldCode, newCode);
fs.writeFileSync('lib/jashn/tracking.ts', file);
