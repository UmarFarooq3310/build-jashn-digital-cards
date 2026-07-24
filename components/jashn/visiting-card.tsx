'use client'

import { useState } from 'react'
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
} from 'lucide-react'
import type { VisitingCard } from '@/lib/jashn/types'
import { getVisitingCardTheme } from '@/lib/jashn/visiting-card-themes'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'

interface VisitingCardProps {
  data: Partial<VisitingCard>
  showShareBtn?: boolean
  showQrCode?: boolean
}

export function VisitingCardView({ data, showShareBtn = true, showQrCode = true }: VisitingCardProps) {
  const [copied, setCopied] = useState(false)
  const [showQrModal, setShowQrModal] = useState(false)
  const { t } = useLang()

  const theme = getVisitingCardTheme(data.themeId)

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
NOTE:${data.bio || 'Created with Cardzy.online Digital Visiting Cards'}
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
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const cleanPhone = (data.phone || '').replace(/[^0-9+]/g, '')
  const whatsappNumber = (data.whatsapp || data.phone || '').replace(/[^0-9]/g, '')
  const isRtl = data.language === 'ur' || data.language === 'ar' || (typeof window !== 'undefined' && document.documentElement.dir === 'rtl')

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Main Visiting Card Box */}
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-300 border-2 border-amber-500/40 ring-1 ring-white/10",
          isRtl && "text-right"
        )}
        dir={isRtl ? "rtl" : "ltr"}
        style={{
          background: theme.bgGradient,
          color: theme.textColor,
        }}
      >
        {/* Metallic grain & sheen texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/15 via-transparent to-black/25 pointer-events-none" />
        <div className="absolute -top-24 -right-24 size-64 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 size-64 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          {/* Top Header: NFC Chip & Category Tag */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest backdrop-blur-md border border-amber-400/30 text-amber-300">
                <Cpu className="size-3.5 text-amber-400" />
                <span>{data.category || 'Digital Card'}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>ONLINE V-CARD</span>
              </span>
            </div>

            {showQrCode && (
              <button
                onClick={() => setShowQrModal(!showQrModal)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors border border-white/15 active:scale-95"
                title="Show QR Code"
              >
                <QrCode className="size-4" />
              </button>
            )}
          </div>

          {/* User Info Header */}
          <div className={cn("flex items-start gap-4 pt-1", isRtl && "flex-row-reverse")}>
            <div className="relative size-20 sm:size-24 shrink-0 rounded-2xl bg-gradient-to-br from-amber-400/30 via-white/10 to-white/5 border-2 border-amber-400/50 overflow-hidden flex items-center justify-center shadow-xl font-black text-2xl uppercase text-amber-200">
              {data.avatarUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={data.avatarUrl} alt={data.fullName} className="w-full h-full object-cover" />
              ) : (
                <span>{(data.fullName || 'C')[0]}</span>
              )}
            </div>

            <div className={cn("space-y-2 flex-1 min-w-0 py-0.5", isRtl && "space-y-2.5")}>
              <div className={cn("flex items-center gap-1.5 flex-wrap", isRtl && "flex-row-reverse")}>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-relaxed [unicode-bidi:plaintext] break-words">
                  {data.fullName || 'Your Full Name'}
                </h2>
                <ShieldCheck className="size-4 text-amber-400 shrink-0" />
              </div>

              <p className={cn("text-xs sm:text-sm font-bold opacity-95 flex items-center gap-2 text-amber-300 [unicode-bidi:plaintext] leading-snug break-words", isRtl && "flex-row-reverse")}>
                <Briefcase className="size-3.5 shrink-0 opacity-85" />
                <span>{data.title || 'Professional Title'}</span>
              </p>

              {data.company && (
                <p className={cn("text-xs font-bold opacity-85 flex items-center gap-2 [unicode-bidi:plaintext] leading-snug break-words", isRtl && "flex-row-reverse")}>
                  <Building2 className="size-3.5 shrink-0 opacity-75" />
                  <span>{data.company}</span>
                </p>
              )}
            </div>
          </div>

          {/* Gold Metallic Accent Line */}
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-amber-400/50 to-transparent my-1" />

          {/* Directly Visible Contact Info Section */}
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2 text-xs">
            {data.phone && (
              <a
                href={`tel:${cleanPhone}`}
                className={cn("flex items-center gap-2.5 font-bold hover:text-emerald-400 transition-colors [unicode-bidi:plaintext]", isRtl && "flex-row-reverse")}
              >
                <div className="size-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Phone className="size-3.5" />
                </div>
                <span className="truncate">{data.phone}</span>
              </a>
            )}

            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className={cn("flex items-center gap-2.5 font-bold hover:text-sky-300 transition-colors [unicode-bidi:plaintext]", isRtl && "flex-row-reverse")}
              >
                <div className="size-7 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/30">
                  <Mail className="size-3.5" />
                </div>
                <span className="truncate">{data.email}</span>
              </a>
            )}

            {data.website && (
              <a
                href={data.website.startsWith('http') ? data.website : `https://${data.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("flex items-center gap-2.5 font-bold hover:text-amber-300 transition-colors [unicode-bidi:plaintext]", isRtl && "flex-row-reverse")}
              >
                <div className="size-7 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Globe className="size-3.5" />
                </div>
                <span className="truncate">{data.website}</span>
              </a>
            )}

            {data.address && (
              <div className={cn("flex items-start gap-2.5 pt-0.5 [unicode-bidi:plaintext]", isRtl && "flex-row-reverse")}>
                <div className="size-7 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30 mt-0.5">
                  <MapPin className="size-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="opacity-90 font-medium leading-tight block">{data.address}</span>
                  {data.mapLink && (
                    <a
                      href={data.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-300 hover:underline mt-1"
                    >
                      <span>{t('officeLocationPin') || 'Office Location Map Pin'}</span>
                      <ExternalLink className="size-3" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bio statement */}
          {data.bio && (
            <p className="text-xs leading-relaxed opacity-90 bg-black/20 p-3 rounded-2xl backdrop-blur-sm border border-white/10 font-medium [unicode-bidi:plaintext] text-start">
              {data.bio}
            </p>
          )}

          {/* Quick Action Contact Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {data.phone && (
              <a
                href={`tel:${cleanPhone}`}
                className="flex flex-col items-center justify-center gap-1 p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md border border-white/15 active:scale-95 text-center shadow-sm"
              >
                <Phone className="size-4 text-emerald-400" />
                <span className="text-[10px] font-bold">{isRtl ? 'کال کریں' : (t('callNow') || 'Call')}</span>
              </a>
            )}

            {(data.whatsapp || data.phone) && (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1 p-2.5 rounded-2xl bg-emerald-600/90 hover:bg-emerald-500 transition-all backdrop-blur-md border border-emerald-400/30 active:scale-95 text-center text-white shadow-md"
              >
                <MessageSquare className="size-4" />
                <span className="text-[10px] font-bold">{isRtl ? 'واٹس ایپ' : (t('whatsAppChat') || 'WhatsApp')}</span>
              </a>
            )}

            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="flex flex-col items-center justify-center gap-1 p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md border border-white/15 active:scale-95 text-center shadow-sm"
              >
                <Mail className="size-4 text-sky-400" />
                <span className="text-[10px] font-bold">{isRtl ? 'ای میل' : (t('sendEmail') || 'Email')}</span>
              </a>
            )}

            {data.website && (
              <a
                href={data.website.startsWith('http') ? data.website : `https://${data.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1 p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md border border-white/15 active:scale-95 text-center shadow-sm"
              >
                <Globe className="size-4 text-amber-300" />
                <span className="text-[10px] font-bold">{isRtl ? 'ویب سائٹ' : 'Website'}</span>
              </a>
            )}
          </div>

          {/* Primary CTA: Add to Contacts (.vcf) */}
          <div className="pt-1">
            <button
              onClick={downloadVCard}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl active:scale-98 transition-all border border-amber-300/40"
            >
              <UserPlus className="size-4" />
              <span>{t('saveContactVcf') || 'Save Contact to Phone (.vcf)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Share / Copy Bar */}
      {showShareBtn && (
        <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-card border border-border shadow-sm">
          <span className="text-xs font-bold text-muted-foreground pl-2">Share Digital Visiting Card:</span>
          <button
            onClick={handleShareLink}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-sm active:scale-95 transition-all"
          >
            {copied ? <Check className="size-3.5 text-emerald-300" /> : <Share2 className="size-3.5" />}
            <span>{copied ? 'Link Copied!' : 'Copy Share Link'}</span>
          </button>
        </div>
      )}

      {/* QR Code Overlay Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-sm w-full space-y-4 text-center relative shadow-2xl">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-muted text-muted-foreground"
            >
              <X className="size-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-foreground">Scan Digital Card</h3>
              <p className="text-xs text-muted-foreground">Scan with phone camera to view live profile</p>
            </div>

            <div className="bg-white p-4 rounded-2xl inline-block shadow-inner">
              <div className="size-48 bg-slate-900 rounded-xl flex flex-col items-center justify-center text-amber-400 p-2 text-center space-y-2">
                <QrCode className="size-24" />
                <span className="text-[10px] font-mono font-bold text-white tracking-widest uppercase">
                  {(data.fullName || 'CARDZY').slice(0, 15)}
                </span>
              </div>
            </div>

            <button
              onClick={downloadVCard}
              className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs"
            >
              {t('saveContactVcf') || 'Save Contact (.vcf)'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
