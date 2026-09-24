'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X, ZoomIn, ZoomOut, RotateCcw, Download, Maximize2, Sparkles, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface LightboxPayload {
  src: string
  alt?: string
  title?: string
  caption?: string
}

declare global {
  interface Window {
    openImageLightbox?: (payload: LightboxPayload) => void
  }
}

export function openLightbox(payload: LightboxPayload) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('cardzy-open-lightbox', { detail: payload }))
}

export function ImageLightboxModal() {
  const [mounted, setMounted] = useState(false)
  const [data, setData] = useState<LightboxPayload | null>(null)
  const [zoom, setZoom] = useState<number>(1)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const close = useCallback(() => {
    setData(null)
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    setMounted(true)

    // Register global function on window
    window.openImageLightbox = (payload: LightboxPayload) => {
      if (payload && payload.src) {
        setData(payload)
        setZoom(1)
        setPosition({ x: 0, y: 0 })
      }
    }

    const handleCustomOpen = (e: Event) => {
      const customEvent = e as CustomEvent<LightboxPayload>
      if (customEvent.detail && customEvent.detail.src) {
        setData(customEvent.detail)
        setZoom(1)
        setPosition({ x: 0, y: 0 })
      }
    }

    // Global document click delegator for any image with [data-lightbox="true"] or .lightbox-trigger
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const trigger = target.closest('[data-lightbox="true"], .lightbox-trigger') as HTMLElement | null
      if (trigger) {
        e.preventDefault()
        e.stopPropagation()
        const img = trigger.tagName === 'IMG' ? (trigger as HTMLImageElement) : trigger.querySelector('img')
        const src = trigger.getAttribute('data-src') || (img ? img.currentSrc || img.src : null)
        const alt = trigger.getAttribute('data-alt') || (img ? img.alt : '')
        const title = trigger.getAttribute('data-title') || trigger.getAttribute('title') || alt || 'Photo Preview'
        const caption = trigger.getAttribute('data-caption') || ''

        if (src) {
          setData({ src, alt, title, caption })
          setZoom(1)
          setPosition({ x: 0, y: 0 })
        }
      }
    }

    window.addEventListener('cardzy-open-lightbox', handleCustomOpen)
    document.addEventListener('click', handleDocumentClick, true)

    return () => {
      window.removeEventListener('cardzy-open-lightbox', handleCustomOpen)
      document.removeEventListener('click', handleDocumentClick, true)
    }
  }, [])

  // Keyboard shortcut listener (Escape to close, +/- to zoom)
  useEffect(() => {
    if (!data) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
      } else if (e.key === '+' || e.key === '=') {
        setZoom((z) => Math.min(3, +(z + 0.3).toFixed(1)))
      } else if (e.key === '-') {
        setZoom((z) => Math.max(0.7, +(z - 0.3).toFixed(1)))
      } else if (e.key === '0') {
        setZoom(1)
        setPosition({ x: 0, y: 0 })
      }
    }

    // Lock body scroll while open
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [data, close])

  const handleZoomIn = () => setZoom((z) => Math.min(3, +(z + 0.3).toFixed(1)))
  const handleZoomOut = () => setZoom((z) => Math.max(0.7, +(z - 0.3).toFixed(1)))
  const handleResetZoom = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleDownload = async () => {
    if (!data?.src) return
    try {
      const response = await fetch(data.src)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = (data.title || 'cardzy-photo').replace(/[^a-zA-Z0-9_-]/g, '_') + '.jpg'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch {
      window.open(data.src, '_blank')
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUp = () => setIsDragging(false)

  if (!mounted || typeof document === 'undefined' || !data) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={data.title || 'Image Preview'}
      className="fixed inset-0 z-[2147483646] flex flex-col items-center justify-between p-3 sm:p-6 bg-black/92 backdrop-blur-2xl select-none animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      {/* ── TOP FLOATING NAVBAR ── */}
      <header className="w-full max-w-5xl flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl text-white shadow-2xl z-20">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex items-center justify-center size-7 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <Sparkles className="size-4" />
          </span>
          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-md">
              {data.title || 'Photo & Document Preview'}
            </h2>
            {data.caption && (
              <p className="text-[11px] text-zinc-400 truncate max-w-[200px] sm:max-w-md">
                {data.caption}
              </p>
            )}
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoom <= 0.7}
            title="Zoom Out (-)"
            className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors disabled:opacity-30 cursor-pointer"
          >
            <ZoomOut className="size-4" />
          </button>
          
          <button
            type="button"
            onClick={handleResetZoom}
            title="Reset Zoom (100%)"
            className="px-2 py-1 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white text-xs font-mono font-bold transition-colors cursor-pointer"
          >
            {Math.round(zoom * 100)}%
          </button>

          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoom >= 3}
            title="Zoom In (+)"
            className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors disabled:opacity-30 cursor-pointer"
          >
            <ZoomIn className="size-4" />
          </button>

          <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block" />

          <button
            type="button"
            onClick={handleDownload}
            title="Download Image"
            className="p-1.5 sm:p-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
          >
            <Download className="size-4" />
            <span className="hidden sm:inline">Save</span>
          </button>

          <button
            type="button"
            onClick={close}
            title="Close (Esc)"
            className="p-1.5 sm:p-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 hover:text-rose-300 transition-colors ml-1 cursor-pointer"
          >
            <X className="size-4.5" />
          </button>
        </div>
      </header>

      {/* ── CENTER IMAGE VIEWPORT ── */}
      <main
        className="relative flex-1 w-full max-w-5xl flex items-center justify-center overflow-hidden my-3 sm:my-4 cursor-default"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="relative max-h-[75vh] sm:max-h-[80vh] max-w-full flex items-center justify-center p-1 rounded-3xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.src}
            alt={data.alt || data.title || 'Full View'}
            className="max-h-[75vh] sm:max-h-[80vh] w-auto max-w-full object-contain rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10"
            draggable={false}
          />
        </div>
      </main>

      {/* ── BOTTOM HELPER BAR ── */}
      <footer className="w-full max-w-md flex items-center justify-between text-[11px] text-zinc-400 px-4 py-2 rounded-full bg-zinc-900/60 border border-white/10 backdrop-blur-md z-20">
        <span className="flex items-center gap-1.5">
          <Maximize2 className="size-3 text-amber-400" />
          <span>Tap outside or press Esc to close</span>
        </span>
        <button
          type="button"
          onClick={() => window.open(data.src, '_blank')}
          className="hover:text-white flex items-center gap-1 text-zinc-300 font-medium cursor-pointer"
        >
          <span>Open raw</span>
          <ExternalLink className="size-3" />
        </button>
      </footer>
    </div>,
    document.body
  )
}

/**
 * Reusable wrapper that adds an interactive "Tap to zoom" badge
 * and auto-opens the lightbox popup on click.
 */
export function ZoomableImageBadge({
  src,
  alt = '',
  title,
  caption,
  badgeText = 'Tap to zoom',
  className,
  imgClassName,
  children,
  badgePosition = 'center',
}: {
  src?: string
  alt?: string
  title?: string
  caption?: string
  badgeText?: string
  className?: string
  imgClassName?: string
  children?: React.ReactNode
  badgePosition?: 'top-right' | 'bottom-right' | 'top-left' | 'center'
}) {
  if (!src) return <>{children}</>

  return (
    <div
      data-lightbox="true"
      data-src={src}
      data-alt={alt}
      data-title={title || alt || 'Photo Preview'}
      data-caption={caption || ''}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-inherit select-none',
        className
      )}
      onClick={(e) => {
        e.stopPropagation()
        openLightbox({ src, alt, title, caption })
      }}
    >
      {children ? (
        children
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt || 'Image'}
          className={cn('size-full object-cover', imgClassName)}
        />
      )}

      {/* Prominent centered "Tap to zoom" badge indicator overlay */}
      <div
        data-no-download="true"
        data-export-ignore="true"
        className={cn(
          'no-export no-download absolute z-10 flex items-center justify-center text-center shadow-lg backdrop-blur-md transition-all duration-200 pointer-events-none select-none',
          'bg-black/80 border border-white/30 group-hover:bg-black/95 group-hover:border-amber-400/70',
          badgePosition === 'center' && 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl py-0.5 px-2 max-w-[86%]',
          badgePosition === 'top-right' && 'top-1.5 right-1.5 rounded-xl py-0.5 px-1.5 max-w-[94%]',
          badgePosition === 'bottom-right' && 'bottom-1.5 right-1.5 rounded-xl py-0.5 px-1.5 max-w-[94%]',
          badgePosition === 'top-left' && 'top-1.5 left-1.5 rounded-xl py-0.5 px-1.5 max-w-[94%]'
        )}
      >
        <div className="flex flex-col items-center justify-center leading-tight py-0.5">
          <div className="flex items-center gap-0.5 sm:gap-1">
            <ZoomIn className="size-2 sm:size-2.5 text-amber-300 shrink-0" />
            <span className="text-[8px] sm:text-[9.5px] font-bold text-slate-100 leading-none whitespace-nowrap">
              Tap to
            </span>
          </div>
          <span className="text-[8px] sm:text-[9.5px] font-extrabold text-amber-300 leading-none mt-0.5">
            zoom
          </span>
        </div>
      </div>
    </div>
  )
}
