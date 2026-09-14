'use client'

import { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface PreviewCardFitProps {
  children: React.ReactNode
  className?: string
  /**
   * Top offset from window top in px (e.g. 80px for header + margin).
   * Defaults to 80px.
   */
  topOffset?: number
  /**
   * Bottom margin from window bottom in px (e.g. 24px).
   * Defaults to 24px.
   */
  bottomOffset?: number
  /**
   * Extra reserved height inside preview box for title, padding, and badges.
   * Defaults to 64px.
   */
  reservedHeaderHeight?: number
}

export function PreviewCardFit({
  children,
  className,
  topOffset = 80,
  bottomOffset = 24,
  reservedHeaderHeight = 64,
}: PreviewCardFitProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [naturalHeight, setNaturalHeight] = useState<number | null>(null)

  useEffect(() => {
    const updateScale = () => {
      if (typeof window === 'undefined') return

      // Only auto-scale on laptop/desktop screens (>= 1024px)
      if (window.innerWidth < 1024) {
        setScale(1)
        setNaturalHeight(null)
        return
      }

      const content = contentRef.current
      if (!content) return

      // scrollHeight/offsetHeight of unscaled content
      const naturalH = content.offsetHeight || content.scrollHeight
      if (!naturalH || naturalH === 0) return

      // Available vertical space in the viewport
      const windowH = window.innerHeight
      const availableH = Math.max(300, windowH - topOffset - bottomOffset - reservedHeaderHeight)

      if (naturalH > availableH) {
        // Compute the exact scale factor needed so the full card fits in the viewport
        const computedScale = Math.max(0.45, Math.min(1, availableH / naturalH))
        setScale(Number(computedScale.toFixed(3)))
        setNaturalHeight(naturalH)
      } else {
        setScale(1)
        setNaturalHeight(naturalH)
      }
    }

    updateScale()

    const content = contentRef.current
    let resizeObserver: ResizeObserver | null = null

    if (typeof ResizeObserver !== 'undefined' && content) {
      resizeObserver = new ResizeObserver(() => {
        updateScale()
      })
      resizeObserver.observe(content)
    }

    window.addEventListener('resize', updateScale)

    // Run after initial paint to catch late-rendering fonts/SVGs
    const timer = setTimeout(updateScale, 150)

    return () => {
      window.removeEventListener('resize', updateScale)
      if (resizeObserver) resizeObserver.disconnect()
      clearTimeout(timer)
    }
  }, [topOffset, bottomOffset, reservedHeaderHeight])

  const scaledHeight = naturalHeight && scale < 1 ? Math.ceil(naturalHeight * scale) : undefined

  return (
    <div
      ref={outerRef}
      className={cn("w-full flex flex-col items-center overflow-visible transition-[height] duration-200 ease-out", className)}
      style={{
        height: scaledHeight ? `${scaledHeight}px` : undefined,
      }}
      suppressHydrationWarning
    >
      <div
        className="w-full origin-top"
        style={{
          transform: scale < 1 ? `scale(${scale})` : undefined,
          transformOrigin: 'top center',
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        suppressHydrationWarning
      >
        <div ref={contentRef} className="w-full" suppressHydrationWarning>
          {children}
        </div>
      </div>
    </div>
  )
}
