'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

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
  const [consentGranted, setConsentGranted] = useState(true)

  // Listen for cookie consent changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkConsent = () => {
      const prefsStr =
        localStorage.getItem('cardzy_consent_v2') ||
        localStorage.getItem('cardzy_cookie_prefs')
      if (prefsStr) {
        try {
          const prefs = JSON.parse(prefsStr)
          if (prefs && typeof prefs === 'object') {
            setConsentGranted(prefs.advertising !== false)
            return
          }
        } catch {}
      }

      const stored =
        localStorage.getItem('cardzy_cookie_consent') ||
        localStorage.getItem('cookie_consent')
      if (stored === 'rejected' || stored === 'declined') {
        setConsentGranted(false)
      } else {
        setConsentGranted(true)
      }
    }

    checkConsent()

    const handleConsentChange = (e: any) => {
      if (e?.detail) {
        setConsentGranted(e.detail.advertising !== false)
      } else {
        checkConsent()
      }
    }

    window.addEventListener('cardzy_consent_change', handleConsentChange)
    window.addEventListener('cookie_consent_change', handleConsentChange)
    window.addEventListener('storage', checkConsent)
    return () => {
      window.removeEventListener('cardzy_consent_change', handleConsentChange)
      window.removeEventListener('cookie_consent_change', handleConsentChange)
      window.removeEventListener('storage', checkConsent)
    }
  }, [])

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

      // Configure personalized vs non-personalized ad requests based on consent
      try {
        ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
        ;(window as any).adsbygoogle.requestNonPersonalizedAds = consentGranted ? 0 : 1
      } catch {}

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
  }, [pathname, allowed, consentGranted])

  return null
}

