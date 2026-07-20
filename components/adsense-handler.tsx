'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// Only allow Google AdSense on the Homepage and Informational content directories (FAQ/Guides)
function isAdSenseAllowed(pathname: string): boolean {
  if (!pathname) return false
  if (pathname === '/') return true
  if (pathname === '/faq') return true
  if (pathname.startsWith('/guide')) return true
  if (pathname === '/eid-wording-ideas' || pathname.startsWith('/eid-wording-ideas/')) return true
  return false
}

export function AdSenseHandler() {
  const pathname = usePathname()
  const allowed = isAdSenseAllowed(pathname)

  useEffect(() => {
    if (typeof document === 'undefined') return

    if (!allowed) {
      // 1. Apply safety CSS class to immediately suppress any ad rendering
      document.documentElement.classList.add('no-ads')
      document.body.classList.add('no-ads')
      
      // 2. Proactively clear any AdSense elements that were dynamically inserted
      const adElements = document.querySelectorAll(
        '.google-auto-placed, ins.adsbygoogle, [id^="google_ads_"], iframe[id^="aswift_"]'
      )
      adElements.forEach((el) => el.remove())

      // 3. Remove script if it exists
      const existingScript = document.getElementById('google-adsense-dynamic')
      if (existingScript) {
        existingScript.remove()
      }
    } else {
      // Restore ads when navigating back to allowed pages
      document.documentElement.classList.remove('no-ads')
      document.body.classList.remove('no-ads')

      // Dynamically load AdSense script if not already present
      const scriptId = 'google-adsense-dynamic'
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script')
        script.id = scriptId
        script.async = true
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8899224608517833'
        script.setAttribute('crossorigin', 'anonymous')
        document.head.appendChild(script)
      }
    }
  }, [pathname, allowed])

  return null
}
