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
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current) return
    pushed.current = true
    try {
      // @ts-ignore
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch { /* ad blocker */ }
  }, [])

  if (format === 'multiplex') {
    return (
      <div className={className}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={CLIENT}
          data-ad-slot={SLOTS.multiplex}
          data-ad-format="autorelaxed"
        />
      </div>
    )
  }

  // Use responsive auto — Google picks best size
  return (
    <div className={className} style={{ textAlign: 'center' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={CLIENT}
        data-ad-slot={SLOTS.display}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
