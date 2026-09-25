'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  X,
  Share2,
  Copy,
  Check,
  QrCode,
  Download,
  ExternalLink,
  Sparkles,
  MessageCircle,
  Image as ImageIcon,
  Smartphone,
  Eye,
  Calendar,
  MapPin,
  Heart,
  Crown,
  Loader2,
  CheckCircle2,
  BarChart3,
  Phone,
  Mail,
  Globe,
  Video,
  UserPlus,
} from 'lucide-react'
import { CardQrCode } from '@/components/jashn/qr-code'
import { CardzyLogo } from '@/components/ui/logo'
import { recordCardShare } from '@/lib/jashn/magic-service'
import { getInitials } from '@/components/jashn/visiting-card'
import { downloadVCard } from '@/lib/jashn/vcard-export'

export interface ShareModalCardData {
  title: string
  recipientOrCouple: string
  type: 'wish' | 'invite' | 'vcard' | 'magic'
  slug: string
  url: string
  viewsCount?: number
  shares?: {
    whatsapp?: number
    sms?: number
    copy?: number
    qr?: number
    image?: number
    video?: number
    app?: number
  }
  waMessage?: string
  occasion?: string
  date?: string
  time?: string
  venue?: string
  message?: string
  senderName?: string
  subtitle?: string
  details?: string
  theme?: string
  phone?: string
  email?: string
  website?: string
  address?: string
  avatarUrl?: string
  photoUrl?: string
}

interface CardShareModalProps {
  card: ShareModalCardData | null
  onClose: () => void
}

export function CardShareModal({ card, onClose }: CardShareModalProps) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'link' | 'qr' | 'image' | 'stats'>('link')
  const [downloadingImage, setDownloadingImage] = useState(false)
  const [imageDownloaded, setImageDownloaded] = useState(false)
  const [shareStats, setShareStats] = useState({
    whatsapp: 0,
    sms: 0,
    copy: 0,
    qr: 0,
    image: 0,
    video: 0,
    app: 0,
  })
  const imageCaptureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!card) return
    let initialStats = {
      whatsapp: card.shares?.whatsapp || 0,
      sms: card.shares?.sms || 0,
      copy: card.shares?.copy || 0,
      qr: card.shares?.qr || 0,
      image: card.shares?.image || 0,
      video: card.shares?.video || 0,
      app: card.shares?.app || 0,
    }

    if (typeof window !== 'undefined') {
      try {
        const localKey = `cardzy_shares_${card.type}_${card.slug}`
        const raw = localStorage.getItem(localKey)
        if (raw) {
          const parsed = JSON.parse(raw)
          initialStats = {
            whatsapp: Math.max(initialStats.whatsapp, parsed.whatsapp || 0),
            sms: Math.max(initialStats.sms, parsed.sms || 0),
            copy: Math.max(initialStats.copy, parsed.copy || 0),
            qr: Math.max(initialStats.qr, parsed.qr || 0),
            image: Math.max(initialStats.image, parsed.image || 0),
            video: Math.max(initialStats.video, parsed.video || 0),
            app: Math.max(initialStats.app, parsed.app || 0),
          }
        }
      } catch {}
    }

    setShareStats(initialStats)

    const handleShareUpdate = (e: any) => {
      if (e?.detail?.slug === card.slug) {
        const ch = e?.detail?.channel
        if (ch) {
          setShareStats((prev) => ({
            ...prev,
            [ch]: (prev[ch as keyof typeof prev] || 0) + 1,
          }))
        }
      }
    }

    window.addEventListener('cardzy_shares_updated', handleShareUpdate)
    return () => {
      window.removeEventListener('cardzy_shares_updated', handleShareUpdate)
    }
  }, [card])

  if (!card) return null

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://cardzy.online'
  const fullUrl = card.url.startsWith('http') ? card.url : `${origin}${card.url}`

  const defaultWaText =
    card.waMessage ||
    `✨ Hey! I created a digital card for ${card.recipientOrCouple} on Cardzy. Tap to open: ${fullUrl}`

  const handleCopy = () => {
    recordCardShare(card.type, card.slug, 'copy')
    setShareStats((prev) => ({ ...prev, copy: prev.copy + 1 }))
    navigator.clipboard?.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsApp = () => {
    recordCardShare(card.type, card.slug, 'whatsapp')
    setShareStats((prev) => ({ ...prev, whatsapp: prev.whatsapp + 1 }))
    const msg = defaultWaText.includes(fullUrl) ? defaultWaText : `${defaultWaText}\n${fullUrl}`
    const text = encodeURIComponent(msg)
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank')
  }

  const handleSms = () => {
    recordCardShare(card.type, card.slug, 'sms')
    setShareStats((prev) => ({ ...prev, sms: prev.sms + 1 }))
    const msg = defaultWaText.includes(fullUrl) ? defaultWaText : `${defaultWaText}\n${fullUrl}`
    const text = encodeURIComponent(msg)
    window.open(`sms:?&body=${text}`, '_blank')
  }

  const handleQrDownload = () => {
    recordCardShare(card.type, card.slug, 'qr')
    setShareStats((prev) => ({ ...prev, qr: prev.qr + 1 }))
  }

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        const cleanText = defaultWaText.replace(fullUrl, '').trim()
        await navigator.share({
          title: card.title,
          text: cleanText || card.title,
          url: fullUrl,
        })
        recordCardShare(card.type, card.slug, 'app')
        setShareStats((prev) => ({ ...prev, app: (prev.app || 0) + 1 }))
      } catch {
        // User cancelled
      }
    } else {
      handleCopy()
    }
  }

  const handleDownloadCardImage = async () => {
    if (!imageCaptureRef.current) return
    setDownloadingImage(true)
    try {
      recordCardShare(card.type, card.slug, 'image')
      setShareStats((prev) => ({ ...prev, image: prev.image + 1 }))

      const { toPng } = await import('html-to-image')
      const dataUrl = await toPng(imageCaptureRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        quality: 0.98,
        filter: (node: Node) => {
          const el = node as HTMLElement
          if (!el || !el.tagName) return true
          if (['IFRAME', 'SCRIPT', 'INS'].includes(el.tagName)) return false
          if (el.hasAttribute && (el.hasAttribute('data-no-download') || el.hasAttribute('data-export-ignore'))) return false
          if (el.classList && (el.classList.contains('no-export') || el.classList.contains('no-download'))) return false
          return true
        },
      })

      const link = document.createElement('a')
      link.download = `cardzy-${card.type}-${card.slug}.png`
      link.href = dataUrl
      link.click()
      setImageDownloaded(true)
      setTimeout(() => setImageDownloaded(false), 3000)
    } catch (err) {
      console.error('Failed to render card image:', err)
      alert('Could not download image. Please try saving from browser or downloading the QR code.')
    } finally {
      setDownloadingImage(false)
    }
  }

  // Visual Theme Badges & Labels based on Card Type
  const typeBadge =
    card.type === 'invite'
      ? { label: 'Royal Invitation', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' }
      : card.type === 'wish'
      ? { label: '3D Greeting Card', color: 'text-rose-500 bg-rose-500/10 border-rose-500/30' }
      : card.type === 'vcard'
      ? { label: 'Smart Executive vCard', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' }
      : { label: 'Magic Link Celebration', color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-amber-500/40 bg-zinc-950 p-5 sm:p-6 shadow-2xl text-white text-left space-y-4 max-h-[92vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 size-8 rounded-full bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer border border-white/10 z-10"
        >
          <X className="size-4" />
        </button>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${typeBadge.color}`}>
              <Share2 className="size-3" /> {typeBadge.label}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-400 bg-zinc-900 px-2.5 py-0.5 rounded-full border border-white/10">
              <Eye className="size-3 text-amber-400" /> {card.viewsCount || 0} visits
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black tracking-tight text-white line-clamp-1">{card.title}</h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            For: <span className="font-semibold text-amber-300">{card.recipientOrCouple}</span>
          </p>
        </div>

        {/* 4 Interactive Navigation Tabs */}
        <div className="grid grid-cols-4 p-1 rounded-2xl bg-zinc-900/90 border border-white/10 gap-1">
          <button
            onClick={() => setActiveTab('link')}
            className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer text-center ${
              activeTab === 'link'
                ? 'bg-amber-500 text-zinc-950 shadow-md font-black'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <MessageCircle className="size-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={() => setActiveTab('qr')}
            className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer text-center ${
              activeTab === 'qr'
                ? 'bg-amber-500 text-zinc-950 shadow-md font-black'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <QrCode className="size-3.5" />
            <span>QR Code</span>
          </button>

          <button
            onClick={() => setActiveTab('image')}
            className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer text-center ${
              activeTab === 'image'
                ? 'bg-amber-500 text-zinc-950 shadow-md font-black'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ImageIcon className="size-3.5" />
            <span>Image</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer text-center ${
              activeTab === 'stats'
                ? 'bg-amber-500 text-zinc-950 shadow-md font-black'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Eye className="size-3.5" />
            <span>Insights</span>
          </button>
        </div>

        {/* ================= TAB 1: QUICK SHARE ================= */}
        {activeTab === 'link' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Share URL Box */}
            <div className="p-3 bg-zinc-900 border border-white/10 rounded-2xl text-xs font-mono break-all text-zinc-300 flex items-center justify-between gap-2 shadow-inner">
              <span className="truncate">{fullUrl}</span>
              <button
                onClick={handleCopy}
                className="shrink-0 p-1.5 hover:bg-zinc-800 rounded-lg text-white transition-colors cursor-pointer"
                title="Copy Link"
              >
                {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
              </button>
            </div>

            {/* Quick Share Buttons with SMS, WhatsApp & Copy */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={handleWhatsApp}
                className="py-3 px-3 rounded-xl bg-[#25D366] hover:bg-[#1eb955] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition-transform active:scale-98 cursor-pointer"
              >
                <MessageCircle className="size-4 shrink-0" />
                <span>WhatsApp</span>
                {shareStats.whatsapp > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-black/25 text-[10px] font-mono">
                    {shareStats.whatsapp}
                  </span>
                )}
              </button>

              <button
                onClick={handleSms}
                className="py-3 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition-transform active:scale-98 cursor-pointer"
              >
                <Smartphone className="size-4 shrink-0" />
                <span>SMS Text</span>
                {shareStats.sms > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-black/25 text-[10px] font-mono">
                    {shareStats.sms}
                  </span>
                )}
              </button>

              <button
                onClick={handleCopy}
                className="py-3 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-white/15 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-transform active:scale-98 cursor-pointer"
              >
                {copied ? <Check className="size-4 text-emerald-400 shrink-0" /> : <Copy className="size-4 shrink-0" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                {shareStats.copy > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-white/15 text-[10px] font-mono">
                    {shareStats.copy}
                  </span>
                )}
              </button>
            </div>

            {/* 1-Tap Save Contact (.vcf) for Visiting Cards */}
            {card.type === 'vcard' && (
              <button
                onClick={() => {
                  downloadVCard({
                    fullName: card.recipientOrCouple || card.title,
                    phone: card.phone,
                    email: card.email,
                    website: card.website,
                    address: card.address,
                    company: card.occasion,
                    bio: card.message,
                  })
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-slate-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-98 transition-all cursor-pointer"
              >
                <UserPlus className="size-4 shrink-0" />
                <span>📥 Save Contact to Phone (.vcf)</span>
              </button>
            )}

            {/* Native Mobile Share Sheet */}
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                onClick={handleNativeShare}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Smartphone className="size-3.5" />
                <span>Share via Other Apps (Instagram / Messages)</span>
                {shareStats.app > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-mono ml-1">
                    {shareStats.app}
                  </span>
                )}
              </button>
            )}

            {/* Open Host Preview Link */}
            <a
              href={`${fullUrl}${card.url.includes('?') ? '&' : '?'}mode=sender`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl border border-white/15 bg-zinc-900/60 hover:bg-zinc-900 text-xs font-semibold flex items-center justify-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
            >
              <span>Open Host Preview (with Controls)</span>
              <ExternalLink className="size-3.5 text-amber-400" />
            </a>

            <div className="rounded-xl p-3 bg-zinc-900/50 border border-white/5 text-[11px] text-zinc-400">
              💡 <span className="font-semibold text-zinc-300">Pro Tip:</span> When you send this link, the recipient sees a clean, full-screen immersive experience without any admin edit controls.
            </div>
          </div>
        )}

        {/* ================= TAB 2: QR CODE & SCAN ================= */}
        {activeTab === 'qr' && (
          <div className="flex flex-col items-center justify-center py-2 space-y-4 animate-in fade-in duration-150">
            <CardQrCode
              shareUrl={fullUrl}
              slug={card.slug}
              cardType={card.type === 'magic' ? 'w' : (card.type as any)}
              size={180}
              showDownloadBtn={true}
              onDownload={handleQrDownload}
            />
            <div className="text-center max-w-xs space-y-1">
              <p className="text-xs font-bold text-amber-300">Universal Scannable QR Code</p>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Scan with any iPhone or Android camera to immediately view this card. Perfect for printing on physical cards, gifts, or event boards!
              </p>
              {shareStats.qr > 0 && (
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
                  🔲 Downloaded {shareStats.qr} time{shareStats.qr !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: DOWNLOAD AS IMAGE FOR ALL CARDS ================= */}
        {activeTab === 'image' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <p className="text-xs text-zinc-400 text-center">
              Export this gorgeous luxury digital flyer image to post on WhatsApp Status, Instagram Story, or send as a picture.
            </p>

            {/* The Captured Card Flyer Element */}
            <div className="flex justify-center overflow-hidden py-1">
              <div
                ref={imageCaptureRef}
                className="w-full max-w-[380px] rounded-3xl p-5 sm:p-6 text-white relative shadow-2xl border-2 border-amber-400/80 select-none overflow-hidden"
                style={{
                  background:
                    card.type === 'invite'
                      ? 'linear-gradient(135deg, #021f15 0%, #063928 50%, #01130d 100%)'
                      : card.type === 'wish'
                      ? 'linear-gradient(135deg, #24050d 0%, #450a1a 50%, #150207 100%)'
                      : card.type === 'vcard'
                      ? 'linear-gradient(135deg, #091326 0%, #122244 50%, #040812 100%)'
                      : 'linear-gradient(135deg, #1f1402 0%, #3d2805 50%, #120b01 100%)',
                }}
              >
                {/* Decorative Inset Border */}
                <div className="absolute inset-2 rounded-2xl border border-amber-400/30 pointer-events-none" />

                {/* Top Brand & Occasion Badge */}
                <div className="flex items-center justify-between gap-2 relative z-10 mb-4">
                  <div className="flex items-center gap-1.5">
                    <CardzyLogo className="size-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">Cardzy Jashn</span>
                  </div>
                  <span className="text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    {card.occasion || typeBadge.label}
                  </span>
                </div>

                {/* Card Main Title & Recipient */}
                <div className="relative z-10 text-center my-3 space-y-1">
                  {card.type === 'vcard' && (
                    <div className="flex justify-center mb-2">
                      <div className="size-16 rounded-full border-2 border-amber-400 overflow-hidden bg-black/50 flex items-center justify-center font-black text-xl text-amber-300 shadow-md">
                        {card.avatarUrl || card.photoUrl ? (
                          <img src={card.avatarUrl || card.photoUrl} alt="Avatar Profile" className="size-full object-cover" />
                        ) : (
                          <span>{getInitials(card.recipientOrCouple || card.senderName)}</span>
                        )}
                      </div>
                    </div>
                  )}
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-300 block">
                    {card.type === 'invite' ? 'Cordially Invites You' : card.type === 'vcard' ? 'Executive Profile' : 'Special Celebration'}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black text-amber-200 tracking-tight leading-tight">
                    {card.recipientOrCouple}
                  </h4>
                  <p className="text-xs font-semibold text-zinc-300 line-clamp-1">{card.title}</p>
                </div>

                {/* Specific Card Details Preview */}
                <div className="relative z-10 my-3 p-3 rounded-xl bg-black/40 border border-white/10 text-xs space-y-1.5 backdrop-blur-sm">
                  {card.date && (
                    <div className="flex items-center gap-2 text-amber-300 font-semibold text-[11px]">
                      <Calendar className="size-3.5 text-amber-400 shrink-0" />
                      <span>{card.date} {card.time ? `• ${card.time}` : ''}</span>
                    </div>
                  )}
                  {card.venue && (
                    <div className="flex items-center gap-2 text-zinc-300 text-[11px]">
                      <MapPin className="size-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{card.venue}</span>
                    </div>
                  )}
                  {card.phone && (
                    <div className="flex items-center gap-2 text-emerald-300 font-semibold text-[11px]">
                      <Phone className="size-3.5 text-emerald-400 shrink-0" />
                      <span>{card.phone}</span>
                    </div>
                  )}
                  {card.email && (
                    <div className="flex items-center gap-2 text-sky-300 font-semibold text-[11px]">
                      <Mail className="size-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">{card.email}</span>
                    </div>
                  )}
                  {card.website && (
                    <div className="flex items-center gap-2 text-amber-300 font-semibold text-[11px]">
                      <Globe className="size-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{card.website}</span>
                    </div>
                  )}
                  {card.address && (
                    <div className="flex items-center gap-2 text-zinc-300 text-[11px]">
                      <MapPin className="size-3.5 text-rose-400 shrink-0" />
                      <span className="truncate">{card.address}</span>
                    </div>
                  )}
                  {card.subtitle && (
                    <p className="text-[11px] text-zinc-300 font-medium">{card.subtitle}</p>
                  )}
                  {card.message && (
                    <p className="text-[11px] text-zinc-300 italic line-clamp-2 leading-relaxed break-words break-all [overflow-wrap:anywhere] [word-break:break-word]">
                      "{card.message}"
                    </p>
                  )}
                  {card.senderName && (
                    <p className="text-[10px] text-zinc-400">
                      With love & regards: <span className="text-amber-200 font-bold">{card.senderName}</span>
                    </p>
                  )}
                </div>

                {/* Bottom QR Code & Scan Callout */}
                <div className="relative z-10 pt-3 border-t border-amber-400/20 flex items-center justify-between gap-3">
                  <div className="text-left space-y-0.5">
                    <span className="text-[9px] font-black uppercase text-amber-400 tracking-wider block">
                      Scan to Open Live
                    </span>
                    <p className="text-[9px] text-zinc-400 leading-tight">
                      Open with mobile camera for 3D interactive animations & RSVP
                    </p>
                    <span className="text-[8px] text-zinc-500 font-mono block">cardzy.online</span>
                  </div>

                  {/* High-Contrast QR Code */}
                  <div className="size-16 rounded-xl bg-white p-1 shrink-0 border border-amber-400/60 shadow-lg flex items-center justify-center">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&color=000000&bgcolor=ffffff&data=${encodeURIComponent(fullUrl)}`}
                      alt="Cardzy QR"
                      className="size-full object-contain rounded"
                      crossOrigin="anonymous"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 1-Click Download Button */}
            <div className="pt-2">
              <button
                onClick={handleDownloadCardImage}
                disabled={downloadingImage}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-zinc-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
              >
                {downloadingImage ? (
                  <>
                    <Loader2 className="size-4 animate-spin text-zinc-950" />
                    <span>Rendering High-Res PNG...</span>
                  </>
                ) : imageDownloaded ? (
                  <>
                    <CheckCircle2 className="size-4 text-emerald-950" />
                    <span>Card Image Downloaded! 🎉</span>
                  </>
                ) : (
                  <>
                    <Download className="size-4 text-zinc-950" />
                    <span>Download Card Image (PNG)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 4: CARD ANALYTICS & INSIGHTS ================= */}
        {activeTab === 'stats' && (
          <div className="space-y-4 py-1 animate-in fade-in duration-150">
            {/* Top Stat Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="group relative overflow-hidden p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 via-zinc-900 to-zinc-900 border border-amber-500/30 text-center shadow-xs">
                <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase font-extrabold text-amber-400 tracking-wider mb-1">
                  <Eye className="size-3.5" /> Total Visits
                </div>
                <span className="text-3xl font-black text-amber-400 font-mono tracking-tight block my-0.5">
                  {(card.viewsCount || 0).toLocaleString()}
                </span>
                <span className="text-[10px] text-zinc-400 font-medium block">Real-time live views</span>
              </div>

              <div className="group relative overflow-hidden p-4 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-zinc-900 to-zinc-900 border border-emerald-500/30 text-center shadow-xs">
                <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase font-extrabold text-emerald-400 tracking-wider mb-1">
                  <Share2 className="size-3.5" /> Total Shares
                </div>
                <span className="text-3xl font-black text-emerald-400 font-mono tracking-tight block my-0.5">
                  {(
                    (shareStats.whatsapp || 0) +
                    (shareStats.sms || 0) +
                    (shareStats.copy || 0) +
                    (shareStats.qr || 0) +
                    (shareStats.image || 0) +
                    (shareStats.video || 0)
                  ).toLocaleString()}
                </span>
                <span className="text-[10px] text-zinc-400 font-medium block">Across 6 channels</span>
              </div>

              <div className="col-span-2 sm:col-span-1 group relative overflow-hidden p-4 rounded-2xl bg-gradient-to-br from-primary/15 via-zinc-900 to-zinc-900 border border-primary/30 text-center shadow-xs">
                <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase font-extrabold text-primary tracking-wider mb-1">
                  <Sparkles className="size-3.5" /> Card Format
                </div>
                <span className="text-sm font-black text-amber-300 capitalize truncate block my-1">
                  {card.type === 'invite'
                    ? 'Invitation'
                    : card.type === 'vcard'
                    ? 'Smart vCard'
                    : card.type === 'magic'
                    ? 'Magic Link'
                    : 'Wish Card'}
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center justify-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active & Hosted
                </span>
              </div>
            </div>

            {/* Sharing Methods Breakdown */}
            <div className="p-4 rounded-2xl bg-zinc-900/90 border border-white/10 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2 font-bold text-xs text-white">
                  <BarChart3 className="size-4 text-amber-400" />
                  <span>Channel Engagement Breakdown</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono bg-white/5 px-2 py-0.5 rounded-md border border-white/10">Live Firestore</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* 1. WhatsApp */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#25D366]/10 to-transparent border border-[#25D366]/20 hover:border-[#25D366]/40 transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-lg bg-[#25D366]/20 flex items-center justify-center text-[#25D366] shadow-2xs">
                      <MessageCircle className="size-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block leading-tight">WhatsApp Share</span>
                      <span className="text-[10px] text-zinc-400">Direct message to contacts</span>
                    </div>
                  </div>
                  <span className="text-lg font-black text-emerald-400 font-mono">
                    {shareStats.whatsapp || 0}
                  </span>
                </div>

                {/* 2. SMS */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shadow-2xs">
                      <Smartphone className="size-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block leading-tight">SMS Text</span>
                      <span className="text-[10px] text-zinc-400">Mobile carrier text</span>
                    </div>
                  </div>
                  <span className="text-lg font-black text-blue-400 font-mono">
                    {shareStats.sms || 0}
                  </span>
                </div>

                {/* 3. Copy Link */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-zinc-500/10 to-transparent border border-zinc-500/20 hover:border-zinc-500/40 transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-lg bg-zinc-500/20 flex items-center justify-center text-zinc-300 shadow-2xs">
                      <Copy className="size-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block leading-tight">Copy Clean Link</span>
                      <span className="text-[10px] text-zinc-400">Clipboard copies</span>
                    </div>
                  </div>
                  <span className="text-lg font-black text-zinc-200 font-mono">
                    {shareStats.copy || 0}
                  </span>
                </div>

                {/* 4. QR Barcode */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 hover:border-amber-500/40 transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 shadow-2xs">
                      <QrCode className="size-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block leading-tight">Barcode / QR Code</span>
                      <span className="text-[10px] text-zinc-400">Scanned / Downloaded</span>
                    </div>
                  </div>
                  <span className="text-lg font-black text-amber-400 font-mono">
                    {shareStats.qr || 0}
                  </span>
                </div>

                {/* 5. Flyer Image Download */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 hover:border-purple-500/40 transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 shadow-2xs">
                      <ImageIcon className="size-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block leading-tight">Card Image (PNG)</span>
                      <span className="text-[10px] text-zinc-400">Exported snapshot</span>
                    </div>
                  </div>
                  <span className="text-lg font-black text-purple-400 font-mono">
                    {shareStats.image || 0}
                  </span>
                </div>

                {/* 6. Video Download */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-rose-500/10 to-transparent border border-rose-500/20 hover:border-rose-500/40 transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400 shadow-2xs">
                      <Video className="size-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block leading-tight">Animated Video (MP4)</span>
                      <span className="text-[10px] text-zinc-400">3D Animated motion export</span>
                    </div>
                  </div>
                  <span className="text-lg font-black text-rose-400 font-mono">
                    {shareStats.video || 0}
                  </span>
                </div>

                {/* 7. Apps / Native OS Share */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-indigo-500/10 to-transparent border border-indigo-500/20 hover:border-indigo-500/40 transition-all sm:col-span-2">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-2xs">
                      <Share2 className="size-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block leading-tight">Apps / Native Mobile Sheet</span>
                      <span className="text-[10px] text-zinc-400">Instagram DM, Messages, AirDrop & other apps</span>
                    </div>
                  </div>
                  <span className="text-lg font-black text-indigo-400 font-mono">
                    {shareStats.app || 0}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 text-xs text-zinc-300 space-y-1">
              <div className="flex items-center gap-2 font-bold text-white">
                <Sparkles className="size-3.5 text-amber-400" />
                <span>How Share Tracking Works</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Whenever you or a recipient taps WhatsApp, shares via mobile apps, sends an SMS, copies the link, downloads the QR barcode, saves the card flyer, or exports the animated video, Cardzy increments the counter in real time in Firestore and your Host Dashboard.
              </p>
            </div>
          </div>
        )}

        {/* Footer info bar */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
          <span className="flex items-center gap-1.5 text-[11px]">
            <Eye className="size-3.5 text-amber-400" /> {card.viewsCount || 0} views tracked
          </span>
          <a
            href={fullUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-bold text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>Open Link</span>
            <ExternalLink className="size-3" />
          </a>
        </div>

      </div>
    </div>
  )
}
