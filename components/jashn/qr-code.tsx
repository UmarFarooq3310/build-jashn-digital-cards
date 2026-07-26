'use client'

import React, { useState, useEffect } from 'react'
import { Download, Check, Sparkles, Link2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CardQrCodeProps {
  shareUrl?: string
  slug?: string
  cardType?: 'v' | 'i' | 'w'
  value?: string
  size?: number
  darkColor?: string
  lightColor?: string
  showDownloadBtn?: boolean
  className?: string
}

/**
 * Standard ISO-Compliant Scannable QR Code component.
 * Renders a crisp, scannable QR image ONLY when a valid shareable card link exists.
 * In draft mode (before saving), shows a helpful indicator.
 */
export function CardQrCode({
  shareUrl,
  slug,
  cardType = 'v',
  value,
  size = 170,
  darkColor = '09090b',
  lightColor = 'ffffff',
  showDownloadBtn = true,
  className,
}: CardQrCodeProps) {
  const [downloaded, setDownloaded] = useState(false)
  const [resolvedShareUrl, setResolvedShareUrl] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (shareUrl) {
        setResolvedShareUrl(shareUrl)
      } else if (value && value !== 'https://cardzy.online') {
        setResolvedShareUrl(value)
      } else if (slug) {
        const origin = window.location.origin || 'https://cardzy.online'
        setResolvedShareUrl(`${origin}/${cardType}/${slug}`)
      } else {
        const path = window.location.pathname
        if (
          path.startsWith('/v/') ||
          path.startsWith('/i/') ||
          path.startsWith('/w/')
        ) {
          setResolvedShareUrl(window.location.href)
        } else {
          setResolvedShareUrl('')
        }
      }
    }
  }, [shareUrl, slug, cardType, value])

  // If no shareable link is available yet (Draft Mode before publishing)
  if (!resolvedShareUrl) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center text-center p-4 rounded-2xl border border-dashed border-[#D4AF37]/40 bg-black/30 backdrop-blur-md space-y-1.5 max-w-xs mx-auto',
          className
        )}
      >
        <div className="size-8 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center">
          <Link2 className="size-4" />
        </div>
        <span className="text-xs font-bold text-white">QR Code & Shareable Link</span>
        <p className="text-[11px] text-zinc-400 leading-snug">
          Save/publish your card to generate your unique scannable QR Code and shareable URL.
        </p>
      </div>
    )
  }

  // QR Server Image API URL using the exact shareable link
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&color=${darkColor.replace('#', '')}&bgcolor=${lightColor.replace('#', '')}&data=${encodeURIComponent(resolvedShareUrl)}`

  // Download high-resolution PNG file
  const handleDownloadQr = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const response = await fetch(qrImageUrl)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `cardzy_qr_${slug || 'share'}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(blobUrl)
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 2500)
    } catch {
      window.open(qrImageUrl, '_blank')
    }
  }

  return (
    <div className={cn('flex flex-col items-center gap-2.5 select-none', className)}>
      {/* Target URL indicator badge */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-[#D4AF37]/30 text-[10px] font-mono text-zinc-300 max-w-[220px] truncate">
        <Sparkles className="size-3 text-[#D4AF37] shrink-0" />
        <span className="truncate">{resolvedShareUrl}</span>
      </div>

      {/* QR Code Canvas Frame */}
      <div
        className="relative inline-flex items-center justify-center rounded-2xl p-3 border-2 border-[#D4AF37]/60 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-transform hover:scale-105"
        style={{ width: size + 24, height: size + 24 }}
      >
        <img
          src={qrImageUrl}
          alt="Cardzy Digital Card Shareable QR Code"
          width={size}
          height={size}
          className="rounded-lg object-contain w-full h-full"
          loading="eager"
          suppressHydrationWarning
        />

        {/* Center Brand Emblem Badge */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div className="size-8 rounded-full bg-[#09090b] border-2 border-[#D4AF37] flex items-center justify-center shadow-lg">
            <span className="font-extrabold text-[10px] text-[#D4AF37] tracking-tighter">
              C
            </span>
          </div>
        </div>
      </div>

      {/* Download PNG Button */}
      {showDownloadBtn && (
        <button
          type="button"
          onClick={handleDownloadQr}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C35A] text-slate-950 font-extrabold text-[11px] uppercase tracking-wider shadow-md active:scale-95 transition-all"
        >
          {downloaded ? <Check className="size-3.5 text-slate-950" /> : <Download className="size-3.5 text-slate-950" />}
          <span>{downloaded ? 'QR Downloaded!' : 'Download QR Code'}</span>
        </button>
      )}
    </div>
  )
}
