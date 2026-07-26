'use client'

import { useState, forwardRef } from 'react'
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  MessageSquare,
  UserPlus,
  Share2,
  Building2,
  Briefcase,
  QrCode,
  Check,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Cpu,
  X,
  RotateCw,
  Award,
  ChevronRight,
  Globe2
} from 'lucide-react'
import type { VisitingCard } from '@/lib/jashn/types'
import { getVisitingCardTheme } from '@/lib/jashn/visiting-card-themes'
import { CardQrCode } from '@/components/jashn/qr-code'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'

interface VisitingCardProps {
  data: Partial<VisitingCard>
  showShareBtn?: boolean
  showQrCode?: boolean
}

const LANGUAGE_LABELS: Record<string, { label: string; dir: 'ltr' | 'rtl'; fontClass?: string }> = {
  ur: { label: 'اردو (Urdu)', dir: 'rtl', fontClass: 'font-urdu' },
  ar: { label: 'العربية (Arabic)', dir: 'rtl', fontClass: 'font-urdu' },
  en: { label: 'English', dir: 'ltr' },
  es: { label: 'Español', dir: 'ltr' },
  fr: { label: 'Français', dir: 'ltr' },
  de: { label: 'Deutsch', dir: 'ltr' },
  hi: { label: 'हिन्दी (Hindi)', dir: 'ltr' },
  tr: { label: 'Türkçe', dir: 'ltr' },
}

export const VisitingCardView = forwardRef<HTMLDivElement, VisitingCardProps>(function VisitingCardView(
  { data, showShareBtn = true, showQrCode = true },
  ref
) {
  const [copied, setCopied] = useState(false)
  const [showQrModal, setShowQrModal] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const { t, lang } = useLang()

  const theme = getVisitingCardTheme(data.themeId)

  // Language auto-detection
  const cardLang = data.language || lang || 'en'
  const langConfig = LANGUAGE_LABELS[cardLang] || { label: 'English', dir: 'ltr' }
  const isRtl = langConfig.dir === 'rtl' || cardLang === 'ur' || cardLang === 'ar'

  // Generate VCard (.vcf file content)
  const downloadVCard = () => {
    const vcardData = `BEGIN:VCARD
VERSION:3.0
FN:${data.fullName || 'Cardzy Member'}
TITLE:${data.title || 'Professional'}
ORG:${data.company || ''}
TEL;TYPE=CELL:${data.phone || ''}
EMAIL:${data.email || ''}
URL:${data.website || ''}
ADR;TYPE=WORK:;;${data.address || ''};;;;
NOTE:${data.bio || 'Executive Digital Business Card - Created on Cardzy.online'}
END:VCARD`

    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${(data.fullName || 'Contact').replace(/\s+/g, '_')}.vcf`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : '')
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const cleanPhone = (data.phone || '').replace(/[^0-9+]/g, '')
  const whatsappNumber = (data.whatsapp || data.phone || '').replace(/[^0-9]/g, '')
  const whatsappGreeting = encodeURIComponent(
    isRtl
      ? `سلام ${data.fullName || ''}! میں آپ کے کارڈزی ڈیجیٹل بزنس کارڈ کے ذریعے رابطہ کر رہا ہوں۔`
      : `Hello ${data.fullName || ''}! I am reaching out to you via your Cardzy Digital Business Card.`
  )

  return (
    <div className="w-full max-w-md mx-auto space-y-4 font-sans select-none">
      {/* Dynamic Keyframes */}
      <style jsx global>{`
        @keyframes shineSheen {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(200%) rotate(45deg); }
        }
        @keyframes pulseBorder {
          0%, 100% { border-color: rgba(212,175,55,0.4); box-shadow: 0 0 30px rgba(212,175,55,0.15); }
          50% { border-color: rgba(212,175,55,0.8); box-shadow: 0 0 50px rgba(212,175,55,0.3); }
        }
      `}</style>

      {/* Main 3D Flip Card Container */}
      <div className="perspective-1000 relative">
        <div
          ref={ref}
          className={cn(
            'relative overflow-hidden rounded-[32px] p-6 sm:p-8 transition-all duration-700 border-2 border-[#D4AF37]/50 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl',
            isRtl && 'text-right'
          )}
          dir={isRtl ? 'rtl' : 'ltr'}
          style={{
            background: theme.bgGradient,
            color: theme.textColor,
            animation: 'pulseBorder 4s ease-in-out infinite',
          }}
        >
          {/* Metallic Sheen Light Reflection */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none opacity-40 mix-blend-overlay" />
          <div className="absolute -top-32 -right-32 size-72 rounded-full bg-[#D4AF37]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 size-72 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

          {/* Gold Decorative Corner Trim */}
          <div className="absolute top-4 left-4 size-5 border-t-2 border-l-2 border-[#D4AF37]/70 pointer-events-none" />
          <div className="absolute top-4 right-4 size-5 border-t-2 border-r-2 border-[#D4AF37]/70 pointer-events-none" />
          <div className="absolute bottom-4 left-4 size-5 border-b-2 border-l-2 border-[#D4AF37]/70 pointer-events-none" />
          <div className="absolute bottom-4 right-4 size-5 border-b-2 border-r-2 border-[#D4AF37]/70 pointer-events-none" />

          {/* Front Side View */}
          {!isFlipped ? (
            <div className="relative z-10 space-y-5">
              {/* Header Badges */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/80 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-widest border border-[#D4AF37]/40 text-[#D4AF37] shadow-sm backdrop-blur-md">
                    <Cpu className="size-3 text-[#D4AF37]" />
                    <span>{data.category || 'Executive NFC Card'}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40 uppercase tracking-wider backdrop-blur-md">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Verified vCard</span>
                  </span>
                </div>
              </div>

              {/* Profile Avatar & Primary Details */}
              <div className={cn('flex items-center gap-4 pt-1', isRtl && 'flex-row-reverse')}>
                <div className="relative size-20 sm:size-24 shrink-0 rounded-2xl bg-gradient-to-br from-[#D4AF37]/30 via-white/10 to-black/40 border-2 border-[#D4AF37] overflow-hidden flex items-center justify-center shadow-2xl font-black text-3xl uppercase text-[#D4AF37]">
                  {data.avatarUrl ? (
                    <img src={data.avatarUrl} alt={data.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <span>{(data.fullName || 'C')[0]}</span>
                  )}
                </div>

                <div className={cn('space-y-1.5 flex-1 min-w-0', isRtl && 'space-y-2')}>
                  <div className={cn('flex items-center gap-1.5 flex-wrap', isRtl && 'flex-row-reverse')}>
                    <h2 className={cn('text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-snug break-words', isRtl && 'font-urdu')}>
                      {data.fullName || 'Your Full Name'}
                    </h2>
                    <ShieldCheck className="size-5 text-[#D4AF37] shrink-0" />
                  </div>

                  <p className={cn('text-xs sm:text-sm font-bold text-[#F5E6A8] flex items-center gap-1.5 leading-snug break-words', isRtl && 'flex-row-reverse font-urdu')}>
                    <Briefcase className="size-3.5 shrink-0 text-[#D4AF37]" />
                    <span>{data.title || 'Professional Title / Designation'}</span>
                  </p>

                  {data.company && (
                    <p className={cn('text-xs font-semibold text-zinc-300 flex items-center gap-1.5 leading-snug break-words', isRtl && 'flex-row-reverse font-urdu')}>
                      <Building2 className="size-3.5 shrink-0 text-zinc-400" />
                      <span>{data.company}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent my-2" />

              {/* Direct Contact Information Box */}
              <div className="bg-slate-950/60 backdrop-blur-xl rounded-2xl p-4 border border-white/10 space-y-2 text-xs">
                {data.phone && (
                  <a
                    href={`tel:${cleanPhone}`}
                    className={cn('flex items-center gap-3 font-bold text-white hover:text-[#D4AF37] transition-colors', isRtl && 'flex-row-reverse')}
                  >
                    <div className="size-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40">
                      <Phone className="size-4" />
                    </div>
                    <span className="truncate text-xs font-mono dir-ltr">{data.phone}</span>
                  </a>
                )}

                {data.email && (
                  <a
                    href={`mailto:${data.email}`}
                    className={cn('flex items-center gap-3 font-bold text-white hover:text-sky-300 transition-colors', isRtl && 'flex-row-reverse')}
                  >
                    <div className="size-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/40">
                      <Mail className="size-4" />
                    </div>
                    <span className="truncate text-xs dir-ltr">{data.email}</span>
                  </a>
                )}

                {data.website && (
                  <a
                    href={data.website.startsWith('http') ? data.website : `https://${data.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn('flex items-center gap-3 font-bold text-white hover:text-[#D4AF37] transition-colors', isRtl && 'flex-row-reverse')}
                  >
                    <div className="size-8 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/40">
                      <Globe className="size-4" />
                    </div>
                    <span className="truncate text-xs dir-ltr">{data.website}</span>
                  </a>
                )}

                {data.address && (
                  <div className={cn('flex items-start gap-3 pt-1', isRtl && 'flex-row-reverse')}>
                    <div className="size-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/40 mt-0.5">
                      <MapPin className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-zinc-200 font-medium leading-relaxed block text-xs">{data.address}</span>
                      {data.mapLink && (
                        <a
                          href={data.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[#D4AF37] hover:underline mt-1"
                        >
                          <span>{t('officeLocationPin') || 'Open Office Location in Maps'}</span>
                          <ExternalLink className="size-3" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Professional Bio */}
              {data.bio && (
                <div className="bg-slate-950/40 p-3.5 rounded-2xl backdrop-blur-md border border-white/10 text-xs leading-relaxed text-zinc-300 font-medium">
                  {data.bio}
                </div>
              )}

              {/* Quick Action Contact Grid (ICONS ONLY) */}
              <div className="flex items-center justify-center gap-3 pt-2">
                {data.phone && (
                  <a
                    href={`tel:${data.phone}`}
                    title={isRtl ? 'کال کریں' : (t('callNow') || 'Call')}
                    aria-label={t('callNow') || 'Call'}
                    className="flex-1 flex items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md border border-white/15 active:scale-95 text-white shadow-sm"
                  >
                    <Phone className="size-5 text-emerald-400" />
                  </a>
                )}

                {(data.whatsapp || data.phone) && (
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappGreeting}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={isRtl ? 'واٹس ایپ' : (t('whatsAppChat') || 'WhatsApp')}
                    aria-label={t('whatsAppChat') || 'WhatsApp'}
                    className="flex-1 flex items-center justify-center p-3 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5A] transition-all text-slate-950 active:scale-95 shadow-md"
                  >
                    <MessageSquare className="size-5" />
                  </a>
                )}

                {data.email && (
                  <a
                    href={`mailto:${data.email}?subject=Business%20Inquiry`}
                    title={isRtl ? 'ای میل' : (t('sendEmail') || 'Email')}
                    aria-label={t('sendEmail') || 'Email'}
                    className="flex-1 flex items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md border border-white/15 active:scale-95 text-white shadow-sm"
                  >
                    <Mail className="size-5 text-sky-400" />
                  </a>
                )}

                {data.website && (
                  <a
                    href={data.website.startsWith('http') ? data.website : `https://${data.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={isRtl ? 'ویب سائٹ' : 'Website'}
                    aria-label="Website"
                    className="flex-1 flex items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md border border-white/15 active:scale-95 text-white shadow-sm"
                  >
                    <Globe className="size-5 text-[#D4AF37]" />
                  </a>
                )}
              </div>

            </div>
          ) : (
            /* Back Side View (QR & NFC Detail) */
            <div className="relative z-10 space-y-6 text-center py-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
                  Executive NFC Profile Back
                </span>
                <button
                  onClick={() => setIsFlipped(false)}
                  className="p-2 rounded-xl bg-white/10 text-[#D4AF37] hover:bg-white/20 transition-all border border-white/20"
                >
                  <RotateCw className="size-4" />
                </button>
              </div>

              <div className="flex justify-center my-2">
                <CardQrCode
                  slug={data.slug}
                  cardType="v"
                  size={190}
                  darkColor="09090b"
                  lightColor="ffffff"
                />
              </div>

              <div className="space-y-2 text-xs text-zinc-300">
                <p className="font-bold text-white text-sm">Scan QR Code to Open Digital Profile</p>
                <p className="max-w-xs mx-auto text-zinc-400">
                  Hold your mobile camera over this QR code or tap the button below to download the contact file directly.
                </p>
              </div>

              <button
                onClick={downloadVCard}
                className="w-full py-3.5 rounded-2xl bg-[#D4AF37] text-slate-950 font-black text-xs uppercase tracking-wider"
              >
                Save Contact (.vcf)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Share / Copy Bar & External Save Contact Button (OUTSIDE CARD) */}
      {showShareBtn && (
        <div className="space-y-2.5">
          {/* Primary CTA: Add to Contacts (.vcf) - Outside Card Surface */}
          <button
            onClick={downloadVCard}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#E5C35A] hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md active:scale-98 transition-all border border-[#D4AF37]"
          >
            <UserPlus className="size-4 text-slate-950" />
            <span>{t('saveContactVcf') || 'Save Contact to Phone (.vcf)'}</span>
          </button>

          <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#0a0a0c] border border-[#D4AF37]/30 shadow-sm">
            <span className="text-[11px] font-bold text-zinc-300 pl-1">Share Card Link:</span>
            <button
              onClick={handleShareLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37] text-slate-950 text-[11px] font-bold shadow-sm active:scale-95 transition-all hover:bg-[#E5C35A]"
            >
              {copied ? <Check className="size-3 text-slate-950" /> : <Share2 className="size-3 text-slate-950" />}
              <span>{copied ? 'Copied!' : 'Copy Share Link'}</span>
            </button>
          </div>

          {/* External QR Code Block (Outside Card Canvas) */}
          <div className="p-4 rounded-3xl bg-[#0a0a0c]/90 border border-[#D4AF37]/30 shadow-lg text-center space-y-2 backdrop-blur-md">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#D4AF37]">
              Digital Profile QR Code (Outside Card)
            </span>
            <CardQrCode
              slug={data.slug}
              cardType="v"
              size={160}
              darkColor="09090b"
              lightColor="ffffff"
              showDownloadBtn={true}
            />
          </div>
        </div>
      )}

      {/* QR Code Overlay Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-[#0a0a0c] border border-[#D4AF37]/40 rounded-3xl p-6 max-w-sm w-full space-y-4 text-center relative shadow-2xl text-white">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/10 text-zinc-400"
            >
              <X className="size-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-white">Scan Digital Visiting Card</h3>
              <p className="text-xs text-zinc-400">Scan with phone camera to open live profile</p>
            </div>

            <div className="flex justify-center my-2">
              <CardQrCode
                slug={data.slug}
                cardType="v"
                size={200}
                darkColor="09090b"
                lightColor="ffffff"
              />
            </div>

            <button
              onClick={downloadVCard}
              className="w-full py-3 rounded-xl bg-[#D4AF37] text-slate-950 font-extrabold text-xs uppercase tracking-wider"
            >
              {t('saveContactVcf') || 'Save Contact (.vcf)'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
})
