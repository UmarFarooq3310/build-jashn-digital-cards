'use client'

import { useEffect, useRef } from 'react'

const CLIENT = 'ca-pub-8899224608517833'

const SLOTS = {
  display:   '3120518741',
  multiplex: '9494355401',
} as const

type AdFormat = keyof typeof SLOTS

interface AdBannerProps {
  format?: AdFormat
  className?: string
}

export function AdBanner({ format = 'display', className }: AdBannerProps) {
  const insRef = useRef<HTMLModElement>(null)
  const pushedRef = useRef(false)

  useEffect(() => {
    const el = insRef.current
    if (!el || pushedRef.current) return

    const isElementUnprocessed = (element: Element) => {
      if (element.hasAttribute('data-ad-status')) return false
      if (element.hasAttribute('data-adsbygoogle-status')) return false
      if (element.getAttribute('data-adsbygoogle-status') === 'done') return false
      if (element.children.length > 0) return false
      return true
    }

    if (!isElementUnprocessed(el)) return

    const tryPushAd = () => {
      const target = insRef.current
      if (!target || pushedRef.current) return
      if (!isElementUnprocessed(target)) return

      // Ensure element has actual visible dimensions before pushing to AdSense
      const rect = target.getBoundingClientRect()
      if (rect.width <= 0 || target.offsetWidth <= 0) return

      // Check if there is an actual unfilled ins.adsbygoogle in the DOM before pushing
      const hasUnfilledIns = () => {
        if (typeof document === 'undefined') return false
        const allIns = document.querySelectorAll('ins.adsbygoogle')
        for (let i = 0; i < allIns.length; i++) {
          const item = allIns[i]
          const status = item.getAttribute('data-ad-status') || item.getAttribute('data-adsbygoogle-status')
          if (!status && item.children.length === 0) {
            return true
          }
        }
        return false
      }

      if (!hasUnfilledIns()) return

      pushedRef.current = true

      try {
        // @ts-ignore
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {
        /* Ignore ad blocker or duplicate push TagError exceptions */
      }
    }

    // Use IntersectionObserver to push ONLY when element is visible in layout
    let observer: IntersectionObserver | null = null
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target) {
              tryPushAd()
            }
          })
        },
        { threshold: 0.1 }
      )
      observer.observe(el)
    }

    // Fallback timer for browsers without IntersectionObserver or fast-scrolling
    const timer = setTimeout(tryPushAd, 500)

    return () => {
      if (observer) observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  if (format === 'multiplex') {
    return (
      <div className={className} style={{ minHeight: '120px', textAlign: 'center' }}>
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '120px' }}
          data-ad-client={CLIENT}
          data-ad-slot={SLOTS.multiplex}
          data-ad-format="autorelaxed"
        />
      </div>
    )
  }

  // Use responsive auto — Google picks best size
  return (
    <div className={className} style={{ textAlign: 'center', minHeight: '90px' }}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px' }}
        data-ad-client={CLIENT}
        data-ad-slot={SLOTS.display}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
