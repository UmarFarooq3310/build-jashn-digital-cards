'use client'

import { useState, useRef, forwardRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
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

export function getInitials(name?: string): string {
  if (!name || !name.trim() || name === '---') return '---'
  const clean = name.replace(/[^\p{L}\p{N}\s]/gu, '').trim()
  const words = clean.split(/\s+/).filter(Boolean)
  if (words.length === 0) return '---'
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }
  return (words[0][0] + words[1][0]).toUpperCase()
}

export const VisitingCardView = forwardRef<HTMLDivElement, VisitingCardProps>(function VisitingCardView(
  { data, showShareBtn = true, showQrCode = true },
  ref
) {
  const [copied, setCopied] = useState(false)
  const [showQrModal, setShowQrModal] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const { t, lang } = useLang()
  const wrapRef = useRef<HTMLDivElement>(null)

  const theme = getVisitingCardTheme(data.themeId)
  const isLight = theme.id === 'minimal-clean' || theme.textColor === '#0f172a'

  // Language auto-detection
  const cardLang = data.language || lang || 'en'
  const langConfig = LANGUAGE_LABELS[cardLang] || { label: 'English', dir: 'ltr' }
  const isRtl = langConfig.dir === 'rtl' || cardLang === 'ur' || cardLang === 'ar'

  const isPublicCard = !!data.slug

  // Translate category & title if matching known keys
  const catKey = data.category === 'business' ? 'catCorporate'
    : data.category === 'creative' ? 'catTech'
    : data.category === 'medical' ? 'catMedical'
    : data.category === 'legal' ? 'catLegal'
    : data.category === 'real-estate' ? 'catRealEstate'
    : data.category === 'beauty' ? 'catFashion'
    : data.category === 'services' ? 'catServices'
    : ''
  const translatedCategory = catKey ? t(catKey) : (data.category || 'Executive Digital Card')

  const roleKey = data.title === 'Software Developer' ? 'roleSoftwareDeveloper'
    : data.title === 'Executive' ? 'roleExecutive'
    : data.title === 'Doctor' ? 'roleDoctor'
    : data.title === 'Lawyer' ? 'roleLawyer'
    : data.title === 'Realtor' ? 'roleRealtor'
    : data.title === 'Makeup Artist' ? 'roleMakeupArtist'
    : data.title === 'Chef' ? 'roleChef'
    : ''
  const translatedTitle = roleKey ? t(roleKey) : (data.title || '---')

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

  useGSAP(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const card = wrap.querySelector<HTMLElement>('.visiting-card-surface')
    if (!card) return

    let rect: DOMRect | null = null

    const onEnter = () => {
      rect = card.getBoundingClientRect()
    }

    const onMove = (e: MouseEvent) => {
      if (!rect) rect = card.getBoundingClientRect()
      const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      gsap.to(card, {
        rotateY: dx * 7,
        rotateX: -dy * 7,
        duration: 0.35,
        ease: 'power2.out',
        transformPerspective: 1000,
      })
    }

    const onLeave = () => {
      rect = null
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
    }

    wrap.addEventListener('mouseenter', onEnter)
    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', onLeave)

    return () => {
      wrap.removeEventListener('mouseenter', onEnter)
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
    }
  }, { scope: wrapRef })

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
      <div ref={wrapRef} className="relative w-full" style={{ perspective: '1000px' }}>
        {/* Ambient Backlight Glow Blob */}
        <div
          className="pointer-events-none absolute -inset-6 -z-10 rounded-full opacity-30 blur-3xl transition-opacity"
          style={{ background: isLight ? 'radial-gradient(circle, #0d9488 0%, transparent 70%)' : 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
        />

        <div
          ref={ref}
          className={cn(
            'visiting-card-surface relative overflow-hidden rounded-[32px] p-6 sm:p-8 transition-all duration-500 border-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl',
            isLight ? 'border-slate-300/80 shadow-[0_15px_45px_rgba(0,0,0,0.12)]' : 'border-[#D4AF37]/50 shadow-[0_20px_60px_rgba(0,0,0,0.6)]',
            isRtl && 'text-right'
          )}
          dir={isRtl ? 'rtl' : 'ltr'}
          style={{
            background: theme.bgGradient,
            color: theme.textColor,
            transformStyle: 'preserve-3d',
            animation: isLight ? 'none' : 'pulseBorder 4s ease-in-out infinite',
          }}
        >
          {/* Metallic Sheen Light Reflection */}
          <div className={cn("absolute inset-0 bg-gradient-to-r from-transparent pointer-events-none mix-blend-overlay", isLight ? "via-black/5 opacity-25" : "via-white/10 opacity-40")} />
          <div className={cn("absolute -top-32 -right-32 size-72 rounded-full blur-3xl pointer-events-none", isLight ? "bg-teal-500/10" : "bg-[#D4AF37]/20")} />
          <div className={cn("absolute -bottom-32 -left-32 size-72 rounded-full blur-3xl pointer-events-none", isLight ? "bg-slate-400/10" : "bg-emerald-500/15")} />

          {/* Decorative Corner Trim */}
          <div className={cn("absolute top-4 left-4 size-5 border-t-2 border-l-2 pointer-events-none", isLight ? "border-slate-400/60" : "border-[#D4AF37]/70")} />
          <div className={cn("absolute top-4 right-4 size-5 border-t-2 border-r-2 pointer-events-none", isLight ? "border-slate-400/60" : "border-[#D4AF37]/70")} />
          <div className={cn("absolute bottom-4 left-4 size-5 border-b-2 border-l-2 pointer-events-none", isLight ? "border-slate-400/60" : "border-[#D4AF37]/70")} />
          <div className={cn("absolute bottom-4 right-4 size-5 border-b-2 border-r-2 pointer-events-none", isLight ? "border-slate-400/60" : "border-[#D4AF37]/70")} />

          {/* Front Side View */}
          {!isFlipped ? (
            <div className="relative z-10 space-y-5">
              {/* Header Badges & Flip Button */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Executive Smart NFC Chip */}
                  <div
                    className="size-7 rounded-md border border-amber-300/60 bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-600 shadow-xs relative overflow-hidden flex items-center justify-center shrink-0"
                    title="Smart Contact NFC Chip"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-x-0 top-1/2 h-[1px] bg-amber-900/40" />
                    <div className="absolute inset-y-0 left-1/2 w-[1px] bg-amber-900/40" />
                    <div className="size-3.5 rounded-full border border-amber-900/40 bg-amber-400/80" />
                  </div>

                  <span className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest border shadow-xs backdrop-blur-md",
                    isLight
                      ? "bg-white/80 border-slate-300 text-teal-800"
                      : "bg-slate-950/80 border-[#D4AF37]/40 text-[#D4AF37]"
                  )}>
                    <Cpu className={cn("size-3", isLight ? "text-teal-700" : "text-[#D4AF37]")} />
                    <span>{translatedCategory}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40 uppercase tracking-wider backdrop-blur-md">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Verified vCard</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsFlipped(true)}
                  title={t('viewQr') || 'View QR Code'}
                  aria-label={t('viewQr') || 'View QR Code'}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-sm ml-auto",
                    isLight
                      ? "bg-white/90 hover:bg-white text-slate-800 border-slate-300"
                      : "bg-slate-950/80 hover:bg-slate-900 text-[#D4AF37] border-[#D4AF37]/40"
                  )}
                >
                  <QrCode className="size-3" />
                  <span>{t('viewQr') || 'QR Code'}</span>
                  <RotateCw className="size-2.5 opacity-80" />
                </button>
              </div>

              {/* Profile Avatar & Primary Details */}
              <div className={cn('flex flex-col items-center gap-3 pt-0 text-center', isRtl && 'flex-col')}>
                <div className={cn(
                  "relative size-20 sm:size-24 shrink-0 rounded-full border-3 overflow-hidden flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.35)] font-black text-3xl uppercase transition-transform hover:scale-105 duration-300",
                  isLight
                    ? "bg-white border-slate-300 text-teal-800 shadow-md"
                    : "bg-gradient-to-br from-[#D4AF37]/30 via-white/10 to-black/40 border-[#D4AF37] text-[#D4AF37]"
                )}>
                  {data.avatarUrl ? (
                    <img
                      src={data.avatarUrl}
                      alt={data.fullName ? data.fullName.slice(0, 90) : 'User Avatar'}
                      crossOrigin="anonymous"
                      width={160}
                      height={160}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{getInitials(data.fullName)}</span>
                  )}
                </div>

                <div className={cn('space-y-1 flex-1 min-w-0 w-full', isRtl && 'space-y-1.5')}>
                  <div className={cn('flex items-center justify-center gap-1.5 flex-wrap', isRtl && 'flex-row-reverse')}>
                    <h2 className={cn(
                      'text-xl sm:text-2xl font-black tracking-tight leading-snug break-words drop-shadow-sm',
                      isLight ? 'text-slate-900' : 'text-white',
                      isRtl && 'font-urdu'
                    )}>
                      {data.fullName || '---'}
                    </h2>
                    <ShieldCheck className={cn("size-4.5 shrink-0", isLight ? "text-teal-600" : "text-[#D4AF37]")} />
                  </div>

                  <p className={cn(
                    'text-xs sm:text-sm font-bold flex justify-center items-center gap-1.5 leading-snug break-words',
                    isLight ? 'text-teal-800' : 'text-[#F5E6A8]',
                    isRtl && 'flex-row-reverse font-urdu'
                  )}>
                    <Briefcase className={cn("size-3.5 shrink-0", isLight ? "text-teal-700" : "text-[#D4AF37]")} />
                    <span>{translatedTitle}</span>
                  </p>

                  {(data.company || !isPublicCard) && (
                    <p className={cn(
                      'text-xs font-semibold flex justify-center items-center gap-1.5 leading-snug break-words',
                      isLight ? 'text-slate-600' : 'text-zinc-300',
                      isRtl && 'flex-row-reverse font-urdu'
                    )}>
                      <Building2 className="size-3.5 shrink-0 text-zinc-400" />
                      <span>{data.company || '---'}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className={cn("h-px my-1", isLight ? "bg-gradient-to-r from-transparent via-slate-300 to-transparent" : "bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent")} />

              {/* Full Contact Information List (Visible Text Data for Image Sharing & Tappable Actions) */}
              <div className={cn(
                "backdrop-blur-xl rounded-2xl p-3 sm:p-3.5 border space-y-2 text-xs",
                isLight ? "bg-white/85 border-slate-200 shadow-xs text-slate-800" : "bg-slate-950/70 border-white/10 text-white"
              )}>
                {/* Phone / Call */}
                {(data.phone || !isPublicCard) && (
                  <div
                    className={cn(
                      'group flex items-center justify-between gap-2.5 p-1.5 rounded-xl transition-all hover:bg-white/10 dark:hover:bg-white/5',
                      isRtl && 'flex-row-reverse'
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="size-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40">
                        <Phone className="size-3.5" />
                      </div>
                      <div className="min-w-0 text-left">
                        <span className="text-[10px] text-muted-foreground block leading-none font-semibold uppercase tracking-wider">
                          {t('phoneLabel') || 'Phone'}
                        </span>
                        <span className={cn(
                          "truncate text-xs font-mono font-bold block pt-0.5",
                          isLight ? "text-slate-900 group-hover:text-emerald-700" : "text-white group-hover:text-emerald-300"
                        )}>
                          {data.phone || '---'}
                        </span>
                      </div>
                    </div>
                    {data.phone ? (
                      <a
                        href={`tel:${cleanPhone}`}
                        title={t('callNow') || 'Call'}
                        className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 hidden sm:inline-block",
                          isLight ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-emerald-950/60 text-emerald-300 border-emerald-500/30"
                        )}
                      >
                        {t('callNow') || 'Call'}
                      </a>
                    ) : (
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 hidden sm:inline-block opacity-40",
                        isLight ? "bg-slate-100 text-slate-500 border-slate-200" : "bg-slate-900 text-slate-400 border-slate-800"
                      )}>
                        {t('phoneLabel') || 'Phone'}
                      </span>
                    )}
                  </div>
                )}

                {/* WhatsApp Direct (if different or quick link) */}
                {(data.whatsapp || data.phone || !isPublicCard) && (
                  <div
                    className={cn(
                      'group flex items-center justify-between gap-2.5 p-1.5 rounded-xl transition-all hover:bg-white/10 dark:hover:bg-white/5',
                      isRtl && 'flex-row-reverse'
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="size-7 rounded-lg bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0 border border-[#25D366]/40">
                        <MessageSquare className="size-3.5" />
                      </div>
                      <div className="min-w-0 text-left">
                        <span className="text-[10px] text-muted-foreground block leading-none font-semibold uppercase tracking-wider">
                          WhatsApp
                        </span>
                        <span className={cn(
                          "truncate text-xs font-mono font-bold block pt-0.5",
                          isLight ? "text-slate-900 group-hover:text-[#25D366]" : "text-white group-hover:text-[#25D366]"
                        )}>
                          {data.whatsapp || data.phone || '---'}
                        </span>
                      </div>
                    </div>
                    {(data.whatsapp || data.phone) ? (
                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${whatsappGreeting}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={t('whatsAppChat') || 'WhatsApp'}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 shrink-0 hidden sm:inline-block"
                      >
                        {t('whatsAppChat') || 'Chat'}
                      </a>
                    ) : (
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 hidden sm:inline-block opacity-40",
                        isLight ? "bg-slate-100 text-slate-500 border-slate-200" : "bg-slate-900 text-slate-400 border-slate-800"
                      )}>
                        Chat
                      </span>
                    )}
                  </div>
                )}

                {/* Email Address */}
                {(data.email || !isPublicCard) && (
                  data.email ? (
                    <a
                      href={`mailto:${data.email}?subject=Business%20Inquiry`}
                      className={cn(
                        'group flex items-center gap-2.5 p-1.5 rounded-xl transition-all hover:bg-white/10 dark:hover:bg-white/5 w-full',
                        isRtl && 'flex-row-reverse'
                      )}
                    >
                      <div className="size-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/40">
                        <Mail className="size-3.5" />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <span className="text-[10px] text-muted-foreground block leading-none font-semibold uppercase tracking-wider">
                          {t('emailLabel') || 'Email'}
                        </span>
                        <span className={cn(
                          "text-xs font-bold block pt-0.5 break-all",
                          isLight ? "text-slate-900 group-hover:text-sky-600" : "text-white group-hover:text-sky-300"
                        )}>
                          {data.email}
                        </span>
                      </div>
                    </a>
                  ) : (
                    <div
                      className={cn(
                        'group flex items-center gap-2.5 p-1.5 rounded-xl transition-all hover:bg-white/10 dark:hover:bg-white/5 w-full',
                        isRtl && 'flex-row-reverse'
                      )}
                    >
                      <div className="size-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/40 opacity-40">
                        <Mail className="size-3.5" />
                      </div>
                      <div className="min-w-0 flex-1 text-left opacity-40">
                        <span className="text-[10px] text-muted-foreground block leading-none font-semibold uppercase tracking-wider">
                          {t('emailLabel') || 'Email'}
                        </span>
                        <span className="text-xs font-bold block pt-0.5 text-slate-500">
                          ---
                        </span>
                      </div>
                    </div>
                  )
                )}

                {/* Website */}
                {(data.website || !isPublicCard) && (
                  <div
                    className={cn(
                      'group flex items-center justify-between gap-2.5 p-1.5 rounded-xl transition-all hover:bg-white/10 dark:hover:bg-white/5',
                      isRtl && 'flex-row-reverse'
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="size-7 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/40">
                        <Globe className="size-3.5" />
                      </div>
                      <div className="min-w-0 text-left">
                        <span className="text-[10px] text-muted-foreground block leading-none font-semibold uppercase tracking-wider">
                          {t('websiteLabel') || 'Website'}
                        </span>
                        <span className={cn(
                          "truncate text-xs font-bold block pt-0.5",
                          isLight ? "text-slate-900 group-hover:text-teal-700" : "text-white group-hover:text-[#D4AF37]"
                        )}>
                          {data.website ? data.website.replace(/^https?:\/\//, '') : '---'}
                        </span>
                      </div>
                    </div>
                    {data.website && (
                      <a
                        href={data.website.startsWith('http') ? data.website : `https://${data.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Website"
                      >
                        <ExternalLink className="size-3.5 text-zinc-400 shrink-0 mr-1 hover:text-white" />
                      </a>
                    )}
                  </div>
                )}

                {/* Single Full Address String */}
                {(data.address || !isPublicCard) && (
                  <div className={cn('flex items-start gap-2.5 p-1.5 rounded-xl', isRtl && 'flex-row-reverse')}>
                    <div className="size-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/40 mt-0.5">
                      <MapPin className="size-3.5" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <span className="text-[10px] text-muted-foreground block leading-none font-semibold uppercase tracking-wider">
                        {t('businessAddress') || 'Address / Location'}
                      </span>
                      <span className={cn(
                        "font-medium leading-relaxed block text-xs pt-0.5 break-words",
                        isLight ? "text-slate-800" : "text-zinc-200"
                      )}>
                        {data.address || '---'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Professional Bio */}
              {(data.bio || !isPublicCard) && (
                <div className={cn(
                  "p-3 rounded-2xl backdrop-blur-md border text-xs leading-relaxed font-medium italic text-center",
                  isLight ? "bg-white/70 border-slate-200 text-slate-700" : "bg-slate-950/50 border-white/10 text-zinc-300"
                )}>
                  &ldquo;{data.bio || '---'}&rdquo;
                </div>
              )}
            </div>
          ) : (
            /* Back Side View (QR & Profile Detail) */
            <div className="relative z-10 space-y-6 text-center py-4">
              <div className="flex items-center justify-between">
                <span className={cn("text-xs font-bold uppercase tracking-widest", isLight ? "text-teal-800" : "text-[#D4AF37]")}>
                  {t('executiveProfileBack') || 'Executive Profile Back'}
                </span>
                <button
                  type="button"
                  onClick={() => setIsFlipped(false)}
                  title={t('flipToFront') || 'Flip to Front'}
                  aria-label={t('flipToFront') || 'Flip to Front'}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border backdrop-blur-md transition-all active:scale-95 cursor-pointer",
                    isLight
                      ? "bg-white/90 hover:bg-white text-slate-800 border-slate-300"
                      : "bg-white/10 hover:bg-white/20 text-[#D4AF37] border-[#D4AF37]/30"
                  )}
                >
                  <span>{t('front') || 'Front'}</span>
                  <RotateCw className="size-3" />
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

              <div className="space-y-2 text-xs">
                <p className={cn("font-bold text-sm", isLight ? "text-slate-900" : "text-white")}>
                  {t('scanQrDigitalProfile') || 'Scan QR Code to Open Digital Profile'}
                </p>
                <p className={cn("max-w-xs mx-auto", isLight ? "text-slate-600" : "text-zinc-400")}>
                  {t('scanQrCameraTip') || 'Hold your mobile camera over this QR code or tap the button below to download the contact file directly.'}
                </p>
              </div>

              <button
                type="button"
                onClick={downloadVCard}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#E5C35A] text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:brightness-105 active:scale-98 transition-all border border-[#D4AF37]"
              >
                {t('saveContactVcf') || 'Save Contact (.vcf)'}
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
            <span className="text-[11px] font-bold text-zinc-300 pl-1">{t('shareCardLink') || 'Share Card Link:'}</span>
            <button
              onClick={handleShareLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37] text-slate-950 text-[11px] font-bold shadow-sm active:scale-95 transition-all hover:bg-[#E5C35A]"
            >
              {copied ? <Check className="size-3 text-slate-950" /> : <Share2 className="size-3 text-slate-950" />}
              <span>{copied ? (t('copied') || 'Copied!') : (t('copyShareLink') || 'Copy Share Link')}</span>
            </button>
          </div>

          {/* External QR Code Block (Outside Card Canvas) */}
          <div className="p-4 rounded-3xl bg-[#0a0a0c]/90 border border-[#D4AF37]/30 shadow-lg text-center space-y-2 backdrop-blur-md">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#D4AF37]">
              {t('digitalProfileQrCodeLabel') || 'Digital Profile QR Code'}
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
              <h3 className="text-xl font-extrabold text-white">{t('scanDigitalVisitingCard') || 'Scan Digital Visiting Card'}</h3>
              <p className="text-xs text-zinc-400">{t('scanPhoneCameraDesc') || 'Scan with phone camera to open live profile'}</p>
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
