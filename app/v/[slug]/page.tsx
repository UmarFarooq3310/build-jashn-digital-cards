'use client'

import { useEffect, useState, useRef, use } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { db, getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase'
import { doc, getDoc, updateDoc, increment, onSnapshot } from 'firebase/firestore'
import { useJashn } from '@/lib/jashn/store'
import type { VisitingCard } from '@/lib/jashn/types'
import { shouldIncrementView, isSenderOrOwner } from '@/lib/jashn/view-tracker'
import { isCardExpired } from '@/lib/jashn/plan-limits'
import { VisitingCardView } from '@/components/jashn/visiting-card'
import { ShareBar } from '@/components/jashn/share-bar'
import { CardQrCode } from '@/components/jashn/qr-code'
import { CardzyLogo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { Sparkles, Eye, Edit3, Trash2, ShieldCheck, Cpu, Share2, X, Loader2, ArrowLeft, ExternalLink, MessageCircle, Smartphone, Copy, Check, QrCode, UserPlus, Download } from 'lucide-react'
import { useLang } from '@/lib/lang/context'
import { CardShareModal } from '@/components/dashboard/card-share-modal'
import { recordCardShare } from '@/lib/jashn/magic-service'
import { downloadVCard } from '@/lib/jashn/vcard-export'
import { downloadCardPng } from '@/lib/jashn/card-media-export'
import { cn } from '@/lib/utils'

export default function VisitingCardPublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug
  const router = useRouter()
  const searchParams = useSearchParams()

  const { user, visitingCards, getVisitingCard, incrementVisitingCardView, deleteVisitingCard, showToast } = useJashn()
  const { t } = useLang()
  const cardRef = useRef<HTMLDivElement>(null)
  const viewIncrementedRef = useRef<string | null>(null)

  const [card, setCard] = useState<VisitingCard | null>(null)
  const [loading, setLoading] = useState(true)
  const [showShareModal, setShowShareModal] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [isDownloadingPng, setIsDownloadingPng] = useState(false)
  const [downloadingQr, setDownloadingQr] = useState(false)

  // Sender/Creator mode: active if requested via URL OR if viewer is detected as the creator/admin
  const isSenderMode =
    searchParams.get('mode') === 'sender' ||
    searchParams.get('preview') === 'true' ||
    searchParams.get('role') === 'sender' ||
    (typeof window !== 'undefined' && isSenderOrOwner(slug, card?.creatorId, searchParams, user?.uid))

  useEffect(() => {
    let unsubscribe: (() => void) | null = null

    function fallbackLocal() {
      const storeCard = getVisitingCard(slug)
      if (storeCard) {
        setCard(storeCard)
        // Only increment view count if viewer is receiver (not sender/creator)
        if (viewIncrementedRef.current !== slug) {
          viewIncrementedRef.current = slug
          if (shouldIncrementView(slug, 'vcard', storeCard.creatorId, searchParams, user?.uid)) {
            incrementVisitingCardView(slug)
            setCard((prev) => (prev ? { ...prev, viewCount: (prev.viewCount || 0) + 1 } : null))
          }
        }
        setLoading(false)
        return
      }

      if (slug === 'sample' || slug === 'demo') {
        setCard({
          id: 'sample',
          slug: 'sample',
          creatorId: 'demo',
          fullName: 'Umar Farooq',
          title: 'Senior Software Engineer & Tech Lead',
          company: 'Jashn Digital Cards',
          phone: '+92 300 1234567',
          whatsapp: '+92 300 1234567',
          email: 'contact@cardzy.online',
          website: 'https://cardzy.online',
          address: 'Lahore, Pakistan',
          bio: 'Crafting premium interactive digital invitation cards and smart vCards with multi-language support.',
          themeId: 'obsidian-gold',
          category: 'business',
          language: 'en',
          viewCount: 184,
          createdAt: Date.now(),
        })
      }
      setLoading(false)
    }

    const activeDb = getFirebaseDb() || db
    if (isFirebaseConfigured && activeDb) {
      try {
        const docRef = doc(activeDb, 'visitingCards', slug)
        unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const fetchedCard = docSnap.data() as VisitingCard
            setCard(fetchedCard)
            // Only increment view count if viewer is receiver (not sender/creator)
            if (viewIncrementedRef.current !== slug) {
              viewIncrementedRef.current = slug
              if (shouldIncrementView(slug, 'vcard', fetchedCard.creatorId, searchParams, user?.uid)) {
                incrementVisitingCardView(slug)
                setCard((prev) => (prev ? { ...prev, viewCount: (prev.viewCount || 0) + 1 } : null))
              }
            }
            setLoading(false)
          } else {
            fallbackLocal()
          }
        }, (err) => {
          console.warn('Live vcard listener notice:', err)
          fallbackLocal()
        })
      } catch (e) {
        console.error('Failed to attach vcard listener:', e)
        fallbackLocal()
      }
    } else {
      fallbackLocal()
    }

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [slug, getVisitingCard, incrementVisitingCardView, searchParams, user?.uid])

  function handleEdit() {
    router.push(`/create-visiting-card?edit=${slug}`)
  }

  function handleDelete() {
    if (window.confirm('Are you sure you want to delete this visiting card? This action cannot be undone.')) {
      deleteVisitingCard(slug)
      showToast('Visiting card deleted successfully', 'info')
      router.push('/dashboard')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050507] text-white">
        <Loader2 className="size-10 text-[#D4AF37] animate-spin" />
        <p className="mt-4 text-xs font-bold text-zinc-400">Loading Business Profile...</p>
      </div>
    )
  }

  if (!card) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050507] p-6 text-center space-y-4 text-white">
        <h1 className="text-2xl font-bold text-[#D4AF37]">Visiting Card Not Found</h1>
        <p className="text-xs text-zinc-400 max-w-sm">
          The requested digital business profile link may have moved or expired.
        </p>
        <Link
          href="/create-visiting-card"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#E5C35A] text-slate-950 font-black text-xs shadow-lg hover:brightness-110"
        >
          <Sparkles className="size-4" />
          <span>Create Digital Business Card</span>
        </Link>
      </div>
    )
  }

  // ── 30-Day Expiration for Free Visiting Cards ──
  const isExpiredCard = isCardExpired(card.createdAt, (card as any).plan || (card.creatorId === user?.uid ? user?.plan : undefined))
  if (isExpiredCard) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050507] p-6 text-center space-y-4 text-white">
        <div className="size-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 text-2xl">
          ⏳
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#D4AF37]">vCard Profile Expired</h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
          Free digital visiting cards remain active for 30 days. To keep your executive digital visiting card and QR profile active forever, upgrade to a Pro account.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link href="/pricing" className="rounded-2xl bg-[#D4AF37] hover:bg-[#E5C35A] px-5 py-2.5 font-bold text-xs text-slate-950 shadow-lg transition-all">
            Upgrade to Pro ($1.99 / Rs 499)
          </Link>
          <Link href="/create-visiting-card" className="rounded-2xl border border-white/20 bg-white/10 hover:bg-white/15 px-5 py-2.5 font-bold text-xs text-white transition-all">
            Create New vCard
          </Link>
        </div>
      </div>
    )
  }

  // Always share the CLEAN receiver URL without ?mode=sender
  const receiverUrl = `/v/${slug}`
  const waMsg = `Check out ${card.fullName}'s Digital Business Card on Cardzy: ${receiverUrl}`

  // Universal share methods for creator
  const handleDirectCopy = () => {
    recordCardShare('vcard', card.slug, 'copy')
    const fullReceiverUrl = typeof window !== 'undefined' ? `${window.location.origin}${receiverUrl}` : receiverUrl
    navigator.clipboard?.writeText(fullReceiverUrl)
    setCopiedLink(true)
    showToast(t('linkCopied', 'Clean vCard link copied! 📋'), 'success')
    setTimeout(() => setCopiedLink(false), 2200)
  }

  const handleDirectWhatsApp = () => {
    recordCardShare('vcard', card.slug, 'whatsapp')
    const fullReceiverUrl = typeof window !== 'undefined' ? `${window.location.origin}${receiverUrl}` : receiverUrl
    const text = encodeURIComponent(`💼 Here is my official Digital Business Card:\n${fullReceiverUrl}`)
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank')
  }

  const handleDownloadPng = async () => {
    if (!cardRef.current) return
    setIsDownloadingPng(true)
    try {
      await downloadCardPng({
        element: cardRef.current,
        fileName: `vcard-${card.slug}`,
        cardType: 'vcard',
        cardSlug: card.slug,
      })
    } finally {
      setIsDownloadingPng(false)
    }
  }

  const handleDirectNativeShare = async () => {
    const fullReceiverUrl = typeof window !== 'undefined' ? `${window.location.origin}${receiverUrl}` : receiverUrl
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        recordCardShare('vcard', card.slug, 'app')
        await navigator.share({
          title: card.fullName || 'Digital Business Card',
          text: `💼 Here is ${card.fullName}'s verified Digital Business Card:`,
          url: fullReceiverUrl,
        })
      } catch {
        // User cancelled
      }
    } else {
      handleDirectCopy()
    }
  }

  const handleDownloadQr = async () => {
    if (!card) return
    setDownloadingQr(true)
    try {
      recordCardShare('vcard', card.slug, 'qr')
      const fullReceiverUrl = typeof window !== 'undefined' ? `${window.location.origin}${receiverUrl}` : receiverUrl
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&color=09090b&bgcolor=ffffff&data=${encodeURIComponent(fullReceiverUrl)}`
      const response = await fetch(qrUrl)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `vcard-qr-${slug}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(blobUrl)
      showToast('QR Code downloaded! 📲', 'success')
    } catch {
      const fullReceiverUrl = typeof window !== 'undefined' ? `${window.location.origin}${receiverUrl}` : receiverUrl
      window.open(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(fullReceiverUrl)}`, '_blank')
    } finally {
      setDownloadingQr(false)
    }
  }

  // ── 1. SENDER / CREATOR SCREEN (Full Website Layout + Creator Control Panel) ──
  // ── 1. SENDER / CREATOR SCREEN (Clean Responsive Desktop/Mobile Layout, No Repetition) ──
  if (isSenderMode) {
    const fullReceiverUrl = typeof window !== 'undefined' ? `${window.location.origin}${receiverUrl}` : receiverUrl

    return (
      <div className="pt-2 sm:pt-3 pb-24 sm:pb-8 lg:py-2 px-3 sm:px-5 max-w-7xl mx-auto lg:h-[calc(100dvh-4.25rem)] lg:max-h-[calc(100dvh-4.25rem)] flex flex-col justify-center">
        {/* ── Main Responsive Grid: vCard Preview (Left on Desktop, Below on Mobile) + Delivery Hub (Top on Mobile, Right on Desktop) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-5 items-center lg:h-full lg:max-h-full">
          {/* Digital Visiting Card Surface Column */}
          <div className="order-2 lg:order-1 lg:col-span-7 xl:col-span-7 flex flex-col items-center text-center lg:h-full lg:max-h-full lg:justify-start lg:min-h-0">
            <div className="w-full shrink-0 flex items-center justify-between px-2 mb-1.5 z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Eye className="size-3.5 text-[#D4AF37]" /> Interactive Client View
              </span>
            </div>

            <div className="w-full flex-1 min-h-0 pt-4 pb-6 px-1 flex flex-col items-center justify-start lg:max-h-[calc(100dvh-6.5rem)] overflow-y-auto scrollbar-none">
              <div className="w-full max-w-md">
                <VisitingCardView ref={cardRef} data={card} showShareBtn={false} showQrCode={false} />
              </div>
            </div>
          </div>

          {/* Unified 1-Click Delivery Hub Column (Top on Mobile, Vertically Centered on Desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-5 xl:col-span-5 flex flex-col justify-center lg:h-full lg:max-h-full">
            <div className="rounded-2xl xl:rounded-3xl border-2 border-[#D4AF37]/40 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-900 text-white p-3.5 sm:p-4 lg:p-3.5 xl:p-4 shadow-xl space-y-2 lg:space-y-2 xl:space-y-2.5 text-left lg:max-h-[calc(100dvh-5.5rem)] lg:overflow-y-auto scrollbar-none">
              {/* Ready to Deliver celebration highlight */}
              <div className="p-2 lg:p-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37]/20 via-[#E5C35A]/15 to-[#D4AF37]/20 border border-[#D4AF37]/35 shadow-xs flex items-center gap-2">
                <span className="text-xl animate-bounce shrink-0">🎉</span>
                <div className="flex-1 min-w-0 text-left">
                  <span className="text-[#D4AF37] font-extrabold text-xs block leading-tight">vCard Live & Ready to Share!</span>
                  <p className="text-zinc-300 text-[10px] leading-tight truncate mt-0.5">
                    Share directly on WhatsApp or download the <strong>.vcf contact card</strong>!
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-black uppercase tracking-wider">
                    <Sparkles className="size-2.5 text-amber-400" /> 1-Click Share Hub
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-zinc-800/90 border border-white/10 px-2 py-0.5 text-[9.5px] font-bold text-zinc-300">
                    <Eye className="size-2.5 text-emerald-400" /> {card.viewCount || 0} views
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                  Share Your vCard
                </h2>
                <p className="text-[10.5px] text-zinc-300 mt-0.5">
                  Deliver your verified digital business card to clients and business contacts instantly.
                </p>
              </div>

              {/* Download Contact (.vcf) */}
              <button
                type="button"
                onClick={() => {
                  const ok = downloadVCard(card)
                  if (ok) showToast('Contact .vcf downloaded! 📇', 'success')
                }}
                className="w-full h-9 sm:h-10 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C35A] hover:brightness-110 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <UserPlus className="size-3.5 shrink-0" />
                <span>Save Contact (.vcf)</span>
              </button>

              {/* Primary 1-Click WhatsApp Button */}
              <Button
                onClick={handleDirectWhatsApp}
                className="w-full h-10 sm:h-11 rounded-xl bg-[#25D366] hover:bg-[#1eb955] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/25 active:scale-95 transition-all cursor-pointer"
              >
                <MessageCircle className="size-4 shrink-0" />
                <span>Send on WhatsApp</span>
              </Button>

              {/* Clean vCard Link Box */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Clean Profile Link
                </label>
                <div className="flex items-center gap-2 p-1 rounded-xl border border-white/15 bg-white/5">
                  <input
                    type="text"
                    readOnly
                    value={fullReceiverUrl}
                    className="flex-1 bg-transparent px-2 text-[11px] text-zinc-200 outline-none truncate font-mono select-all"
                  />
                  <Button
                    onClick={handleDirectCopy}
                    size="sm"
                    className={cn(
                      "h-7 px-2.5 rounded-lg font-bold text-[11px] shrink-0 transition-all cursor-pointer",
                      copiedLink
                        ? "bg-[#D4AF37] text-slate-950"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    )}
                  >
                    {copiedLink ? <Check className="size-3" /> : <Copy className="size-3" />}
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </Button>
                </div>
              </div>

              {/* Direct 1-Click Media Exports & Share Apps */}
              <div className="grid grid-cols-2 gap-2 pt-0.5">
                {typeof navigator !== 'undefined' && 'share' in navigator ? (
                  <Button
                    onClick={handleDirectNativeShare}
                    variant="outline"
                    className="h-8.5 rounded-lg border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <Share2 className="size-3" />
                    <span>Share Apps</span>
                  </Button>
                ) : null}

                <Button
                  onClick={handleDownloadPng}
                  disabled={isDownloadingPng}
                  variant="outline"
                  className={cn(
                    "h-8.5 rounded-lg border-[#D4AF37]/40 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] font-bold text-[11px] flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer disabled:opacity-50",
                    !(typeof navigator !== 'undefined' && 'share' in navigator) && "col-span-2"
                  )}
                >
                  {isDownloadingPng ? (
                    <Loader2 className="size-3 animate-spin text-[#D4AF37]" />
                  ) : (
                    <Download className="size-3 text-[#D4AF37]" />
                  )}
                  <span>{isDownloadingPng ? 'Saving...' : 'Download Image'}</span>
                </Button>
              </div>

              {/* Integrated vCard QR Code (Compact Horizontal Row with Download Icon) */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <button
                    type="button"
                    onClick={handleDownloadQr}
                    className="relative group p-1 rounded-xl bg-white shadow-xs shrink-0 cursor-pointer hover:ring-2 hover:ring-[#D4AF37] transition-all text-slate-900"
                    title="Click to Download QR Code (PNG)"
                  >
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=09090b&bgcolor=ffffff&data=${encodeURIComponent(fullReceiverUrl)}`}
                      alt="Receiver QR Code"
                      className="size-11 rounded object-contain block"
                    />
                    <span className="absolute inset-0 bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                      <Download className="size-4 text-[#D4AF37]" />
                    </span>
                  </button>
                  <div className="min-w-0 text-left">
                    <span className="text-[10.5px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                      Receiver QR Code
                    </span>
                    <p className="text-[9.5px] text-zinc-400 leading-tight mt-0.5 truncate">
                      Scan or download barcode
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleDownloadQr}
                  disabled={downloadingQr}
                  size="sm"
                  variant="outline"
                  className="h-7 px-2.5 rounded-lg border-[#D4AF37]/40 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] text-[10.5px] font-bold shrink-0 flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                  title="Download high-resolution QR code"
                >
                  {downloadingQr ? <Loader2 className="size-3 animate-spin text-[#D4AF37]" /> : <Download className="size-3" />}
                  <span>Download</span>
                </Button>
              </div>

              {/* Free vs Pro Link Retention Status */}
              <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1 text-zinc-300">
                  <Sparkles className="size-3 text-[#D4AF37]" />
                  <span>Free vCard · 30-Day Active</span>
                </div>
                <Link href="/pricing" className="text-[#D4AF37] hover:brightness-110 font-bold underline transition-colors">
                  Keep Forever (Pro)
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner (Mobile Only) */}
        <div className="mt-8 rounded-2xl p-4 text-center border border-border bg-card shadow-sm max-w-xl mx-auto lg:hidden">
          <p className="text-sm font-bold mb-1 text-foreground">{t('createAnotherBusinessCard') || 'Create Another Digital Business Card'}</p>
          <Link
            href="/create-visiting-card"
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
          >
            {t('buildYourVcard') || 'Create Visiting Card'} <Sparkles className="size-3.5" />
          </Link>
        </div>

        {/* Sticky Mobile Share Bar for Sender Mode */}
        <div className="fixed bottom-0 inset-x-0 z-50 p-3 bg-zinc-950/95 backdrop-blur-xl border-t border-[#D4AF37]/30 sm:hidden flex items-center justify-between gap-2 shadow-2xl">
          <Button
            onClick={handleDirectWhatsApp}
            className="flex-1 h-11 rounded-xl bg-[#25D366] hover:bg-[#1eb955] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            <MessageCircle className="size-4 shrink-0" />
            <span>WhatsApp</span>
          </Button>
          <Button
            onClick={handleDirectCopy}
            variant="outline"
            className="h-11 px-4 rounded-xl border-white/20 bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
          >
            {copiedLink ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
            <span>{copiedLink ? 'Copied' : 'Copy'}</span>
          </Button>
          {typeof navigator !== 'undefined' && 'share' in navigator ? (
            <Button
              onClick={handleDirectNativeShare}
              variant="outline"
              className="h-11 px-4 rounded-xl border-white/20 bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
            >
              <Share2 className="size-4" />
              <span>Share</span>
            </Button>
          ) : (
            <Button
              onClick={handleDownloadPng}
              disabled={isDownloadingPng}
              variant="outline"
              className="h-11 px-4 rounded-xl border-white/20 bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
            >
              <Download className="size-4" />
              <span>Image</span>
            </Button>
          )}
        </div>
      </div>
    )
  }

  // ── 2. RECEIVER SCREEN (Clean 100dvh Full-Screen Viewport + Cardzy Make Your Own) ──
  return (
    <div className="flex min-h-[100dvh] flex-col justify-between items-center relative overflow-y-auto px-4 py-4 sm:py-6 bg-[#050507] text-white w-full select-none">
      {/* Gold Ambient Background Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[32rem] rounded-full bg-[#D4AF37]/10 blur-[120px]" />

      {/* Receiver Screen Top Minimal Bar */}
      <header className="w-full max-w-lg flex items-center justify-between z-20 py-2 px-3.5 rounded-full bg-zinc-900/80 backdrop-blur-md border border-[#D4AF37]/30 shadow-xl">
        <Link href="/" className="flex items-center gap-2 group">
          <CardzyLogo className="size-7 transition-transform group-hover:scale-105" />
          <span className="text-sm font-extrabold tracking-tight bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#E5C35A] bg-clip-text text-transparent">
            Cardzy vCard
          </span>
        </Link>

        <Link
          href="/create-visiting-card"
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5C35A] text-slate-950 px-3.5 py-1.5 text-xs font-black shadow-md hover:brightness-110 transition-all hover:scale-105"
        >
          <Sparkles className="size-3" />
          <span>{t('makeYourOwn')}</span>
        </Link>
      </header>

      {/* Receiver Screen Main Centered 3D Business Card */}
      <main className="w-full max-w-md flex-1 flex flex-col items-center justify-center my-auto py-6 sm:py-10 z-10">
        <div className="w-full py-2 flex justify-center">
          <VisitingCardView ref={cardRef} data={card} showShareBtn={false} showQrCode={false} />
        </div>
      </main>

      {/* Receiver Screen Footer Control */}
      <footer className="w-full max-w-md flex flex-col items-center gap-3 z-20 pb-4 text-center">
        <div className="flex items-center justify-center gap-2.5 w-full">
          <button
            onClick={() => {
              const ok = downloadVCard(card)
              if (ok) showToast('Contact downloaded! Open file to save. 📇', 'success')
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-slate-950 font-black py-3 px-4 text-xs sm:text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <UserPlus className="size-4 shrink-0" />
            <span>Save Contact to Phone</span>
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/40 bg-zinc-900/90 hover:bg-zinc-800 text-[#D4AF37] font-extrabold py-3 px-4 text-xs sm:text-sm shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Share2 className="size-4 shrink-0" />
            <span className="hidden sm:inline">{t('shareVCard') || 'Share'}</span>
          </button>
        </div>

        {/* Universal Luxury Share Modal */}
        {showShareModal && (
          <CardShareModal
            card={{
              title: card.fullName || 'Digital Visiting Card',
              recipientOrCouple: card.fullName,
              type: 'vcard',
              slug: card.slug,
              url: `/v/${card.slug}`,
              viewsCount: card.viewCount || 0,
              shares: card.shares,
              occasion: card.company || card.title || 'Digital Business Profile',
              senderName: card.fullName,
              waMessage: waMsg,
              phone: card.phone,
              email: card.email,
              website: card.website,
              address: card.address,
            }}
            onClose={() => setShowShareModal(false)}
          />
        )}

        <Link
          href="/create-visiting-card"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#D4AF37] transition-colors font-medium"
        >
          <Sparkles className="size-3 text-[#D4AF37]" />
          <span>Cardzy · Make Your Own</span>
        </Link>
      </footer>
    </div>
  )
}
