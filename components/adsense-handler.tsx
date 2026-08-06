'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// Allow Google AdSense on all public site pages except private dashboard/admin or raw dynamic user card views
function isAdSenseAllowed(pathname: string): boolean {
  if (!pathname) return true
  // Disallow on internal admin or user dashboard pages
  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname === '/login' || pathname === '/signup') {
    return false
  }
  // Disallow on raw recipient card presentation views (/w/[slug], /i/[slug], /v/[slug]) unless in sender mode
  if (/^\/(w|i|v)\/[^/]+$/.test(pathname)) {
    return false
  }
  return true
}

export function AdSenseHandler() {
  const pathname = usePathname()
  const allowed = isAdSenseAllowed(pathname)

  useEffect(() => {
    if (typeof document === 'undefined') return

    const cleanStyles = () => {
      try {
        if (document.body) {
          document.body.style.setProperty('top', '0px', 'important')
          document.body.style.setProperty('margin-top', '0px', 'important')
          document.body.style.setProperty('padding-top', '0px', 'important')
        }
        if (document.documentElement) {
          document.documentElement.style.setProperty('top', '0px', 'important')
          document.documentElement.style.setProperty('margin-top', '0px', 'important')
          document.documentElement.style.setProperty('padding-top', '0px', 'important')
        }
      } catch (e) {}
    }

    cleanStyles()

    if (!allowed) {
      document.documentElement.classList.add('no-ads')
      document.body.classList.add('no-ads')
      
      const adElements = document.querySelectorAll(
        '.google-auto-placed, ins.adsbygoogle:not(main ins), [id^="google_ads_"], iframe[id^="aswift_"]'
      )
      adElements.forEach((el) => el.remove())
    } else {
      document.documentElement.classList.remove('no-ads')
      document.body.classList.remove('no-ads')

      // Ensure AdSense script is present in head immediately for bots & users
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
