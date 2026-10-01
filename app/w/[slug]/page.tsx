'use client'

import '@/app/invitation-themes-animations.css'
import { useEffect, useRef, useState, use, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Sparkles, Eye, Loader2, HeartHandshake, Edit3, Trash2, Share2, X, ExternalLink, MessageCircle, Camera, Maximize2, Smartphone, Copy, Check, Send, QrCode, Download, Video, Heart } from 'lucide-react'
import { downloadCardPng, downloadCardVideo } from '@/lib/jashn/card-media-export'
import { Button } from '@/components/ui/button'
import { WishCard } from '@/components/jashn/wish-card'
import { ThreeDCardWrapper } from '@/components/jashn/three-d-card-wrapper'
import { ConfettiRain } from '@/components/jashn/confetti-rain'
import { ShareBar } from '@/components/jashn/share-bar'
import { CardQrCode } from '@/components/jashn/qr-code'
import { CardzyLogo } from '@/components/ui/logo'
import { CardShareModal } from '@/components/dashboard/card-share-modal'
import { CardGuestbookModal } from '@/components/jashn/card-guestbook-modal'
import { CardLiveReactions } from '@/components/jashn/card-reactions'
import { ZoomableImageBadge } from '@/components/ui/image-lightbox'
import { useJashn } from '@/lib/jashn/store'
import { useLang } from '@/lib/lang/context'
import { getOccasion } from '@/lib/jashn/occasions'
import { decodeShortWish } from '@/lib/jashn/codec'
import { recordCardShare } from '@/lib/jashn/magic-service'
import type { Wish } from '@/lib/jashn/types'
import { cn } from '@/lib/utils'
import { db, getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { shouldIncrementView, isSenderOrOwner } from '@/lib/jashn/view-tracker'
import { isCardExpired } from '@/lib/jashn/plan-limits'

function WishPublicContent({ slug }: { slug: string }) {
  const { lang, t } = useLang()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, wishes, incrementWishView, deleteWish, showToast } = useJashn()
  const cardRef = useRef<HTMLDivElement>(null)

  const [isMounted, setIsMounted] = useState(false)
  const [activeWish, setActiveWish] = useState<Wish | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [rainActive, setRainActive] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showGuestbookModal, setShowGuestbookModal] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [isDownloadingPng, setIsDownloadingPng] = useState(false)
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const [downloadingQr, setDownloadingQr] = useState(false)
  const viewIncrementedRef = useRef<string | null>(null)

  // Sender/Creator mode: ONLY active if explicitly requested via ?mode=sender or ?role=sender
  // When visiting clean card URL, always show the full receiver experience (card, navbar, wishes wall, no side box)
  const isSenderMode =
    searchParams.get('mode') === 'sender' ||
    searchParams.get('role') === 'sender'

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    setIsLoading(true)
    let unsubscribe: (() => void) | null = null

    function fallbackToLocalAndUrl() {
      const existing = wishes.find((w) => w.slug === slug)
      if (existing) {
        setActiveWish(existing)
        if (viewIncrementedRef.current !== slug) {
          viewIncrementedRef.current = slug
          // Only increment view count if viewer is receiver (not sender/creator)
          if (shouldIncrementView(slug, 'wish', existing.creatorId, searchParams, user?.uid, user?.email)) {
            incrementWishView(slug)
            setActiveWish((prev) => (prev ? { ...prev, viewCount: (prev.viewCount || 0) + 1 } : null))
          }
        }
        setIsLoading(false)
        return
      }

      const decoded = decodeShortWish(searchParams, slug)
      if (decoded) {
        setActiveWish(decoded)
        setIsLoading(false)
        return
      }

      const rawData = searchParams.get('d')
      if (rawData) {
        try {
          const parsed: Wish = JSON.parse(decodeURIComponent(rawData))
          setActiveWish(parsed)
          setIsLoading(false)
          return
        } catch (e) {
          console.error('Failed to parse encoded wish data', e)
        }
      }

      if (slug === 'sample' || slug === 'demo') {
        setActiveWish({
          id: 'sample',
          slug: 'sample',
          creatorId: 'demo',
          occasionId: 'birthday',
          message: 'Wishing you a day filled with joy, laughter, and immense blessings!',
          language: 'en',
          themeId: 'mehndi-red',
          borderId: 'mehndi',
          senderName: 'Cardzy Team',
          recipientName: 'Friend',
          viewCount: 12,
          createdAt: Date.now(),
        })
      }
      setIsLoading(false)
    }

    const activeDb = getFirebaseDb() || db
    if (isFirebaseConfigured && activeDb) {
      try {
        const docRef = doc(activeDb, 'wishes', slug)
        unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as Wish
            setActiveWish(data)
            
            if (viewIncrementedRef.current !== slug) {
              viewIncrementedRef.current = slug
              // Only increment view count if viewer is receiver (not sender/creator)
              if (shouldIncrementView(slug, 'wish', data.creatorId, searchParams, user?.uid, user?.email)) {
                incrementWishView(slug)
                setActiveWish((prev) => (prev ? { ...prev, viewCount: (prev.viewCount || 0) + 1 } : null))
              }
            }
            setIsLoading(false)
          } else {
            fallbackToLocalAndUrl()
          }
        }, (err) => {
          console.warn('Live wish listener notice:', err)
          fallbackToLocalAndUrl()
        })
      } catch (e) {
        console.error('Failed to attach real-time wish listener:', e)
        fallbackToLocalAndUrl()
      }
    } else {
      fallbackToLocalAndUrl()
    }

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [slug, wishes, searchParams, isMounted, incrementWishView, user?.uid])

  function handleEdit() {
    router.push(`/create-wish?edit=${slug}`)
  }

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this wish card? This action cannot be undone.")) {
      deleteWish(slug)
      showToast("Wish card deleted successfully", "info")
      router.push('/')
    }
  }

  if (!isMounted || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8 text-center bg-slate-950 text-white">
        <Loader2 className="size-10 animate-spin text-emerald-400" />
      </div>
    )
  }

  if (!activeWish) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-slate-950 text-white space-y-4">
        <h1 className="text-3xl font-extrabold text-emerald-400">{t('wishNotFoundTitle') || 'Wish Card Not Found'}</h1>
        <p className="text-sm text-slate-300 max-w-md">{t('wishNotFoundDesc') || 'This card link may have moved or expired.'}</p>
        <Link href="/create-wish" className="rounded-2xl bg-emerald-600 px-6 py-3 font-bold text-white shadow-lg hover:bg-emerald-500 transition-all">
          Create Wish Card
        </Link>
      </div>
    )
  }

  // ── 30-Day Expiration for Free Cards ──
  const isExpiredCard = isCardExpired(activeWish.createdAt, (activeWish as any).plan || (activeWish.creatorId === user?.uid ? user?.plan : undefined))
  if (isExpiredCard) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-slate-950 text-white space-y-4">
        <div className="size-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 text-2xl">
          ⏳
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-400">Card Link Expired</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
          Free Cardzy cards remain active for 30 days from creation. To keep cards active forever with no watermarks, upgrade to a Pro account.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link href="/pricing" className="rounded-2xl bg-amber-500 hover:bg-amber-400 px-5 py-2.5 font-bold text-xs text-slate-950 shadow-lg transition-all">
            Upgrade to Pro ($1.99 / Rs 499)
          </Link>
          <Link href="/create-wish" className="rounded-2xl border border-white/20 bg-white/10 hover:bg-white/15 px-5 py-2.5 font-bold text-xs text-white transition-all">
            Create New Card
          </Link>
        </div>
      </div>
    )
  }

  const occasion = getOccasion(activeWish.occasionId)
  const isIslamic = occasion?.category === 'Islamic'
  const isSensitive = activeWish.occasionId === 'condolence'
  const waMsg = `${activeWish.senderName} sent you a special digital card`

  // Always share the CLEAN receiver URL without ?mode=sender
  const receiverUrl = `/w/${activeWish.slug}`

  // Universal share methods for creator
  const handleDirectCopy = () => {
    recordCardShare('wish', activeWish.slug, 'copy')
    const fullReceiverUrl = typeof window !== 'undefined' ? `${window.location.origin}${receiverUrl}` : receiverUrl
    navigator.clipboard?.writeText(fullReceiverUrl)
    setCopiedLink(true)
    showToast(t('linkCopied', 'Clean receiver link copied! 📋'), 'success')
    setTimeout(() => setCopiedLink(false), 2200)
  }

  const handleDirectWhatsApp = () => {
    recordCardShare('wish', activeWish.slug, 'whatsapp')
    const fullReceiverUrl = typeof window !== 'undefined' ? `${window.location.origin}${receiverUrl}` : receiverUrl
    const text = encodeURIComponent(`✨ Hey ${activeWish.recipientName}! ${activeWish.senderName} created a special digital greeting card for you on Cardzy:\n${fullReceiverUrl}`)
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank')
  }

  const handleDownloadPng = async () => {
    if (!cardRef.current) return
    setIsDownloadingPng(true)
    try {
      await downloadCardPng({
        element: cardRef.current,
        fileName: `wish-${slug}`,
        cardType: 'wish',
        cardSlug: slug,
      })
    } finally {
      setIsDownloadingPng(false)
    }
  }

  const handleDownloadVideo = async () => {
    if (!cardRef.current) return
    setIsGeneratingVideo(true)
    setVideoProgress(0)
    try {
      await downloadCardVideo({
        element: cardRef.current,
        fileName: `wish-${slug}`,
        cardType: 'wish',
        cardSlug: slug,
        onProgress: (p) => setVideoProgress(p),
      })
    } finally {
      setIsGeneratingVideo(false)
    }
  }

  const handleDirectNativeShare = async () => {
    const fullReceiverUrl = typeof window !== 'undefined' ? `${window.location.origin}${receiverUrl}` : receiverUrl
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        recordCardShare('wish', activeWish.slug, 'app')
        await navigator.share({
          title: `Wish for ${activeWish.recipientName}`,
          text: `✨ I created a special digital greeting card for you on Cardzy! Tap to open:`,
          url: fullReceiverUrl,
        })
      } catch {
        // User cancelled share
      }
    } else {
      handleDirectCopy()
    }
  }

  const handleDownloadQr = async () => {
    if (!activeWish) return
    setDownloadingQr(true)
    try {
      recordCardShare('wish', activeWish.slug, 'qr')
      const fullReceiverUrl = typeof window !== 'undefined' ? `${window.location.origin}${receiverUrl}` : receiverUrl
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&color=09090b&bgcolor=ffffff&data=${encodeURIComponent(fullReceiverUrl)}`
      const response = await fetch(qrUrl)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `wish-qr-${slug}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(blobUrl)
      showToast(t('qrDownloaded', 'QR Code downloaded! 📲'), 'success')
    } catch {
      const fullReceiverUrl = typeof window !== 'undefined' ? `${window.location.origin}${receiverUrl}` : receiverUrl
      window.open(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(fullReceiverUrl)}`, '_blank')
    } finally {
      setDownloadingQr(false)
    }
  }

  // ── 1. SENDER / CREATOR SCREEN (Clean Responsive Desktop/Mobile Layout, No Repetition) ──
  if (isSenderMode) {
    const fullReceiverUrl = typeof window !== 'undefined' ? `${window.location.origin}${receiverUrl}` : receiverUrl

    return (
      <div className="pt-2 sm:pt-3 pb-24 sm:pb-8 lg:py-2 px-3 sm:px-5 max-w-7xl mx-auto lg:h-[calc(100dvh-4.25rem)] lg:max-h-[calc(100dvh-4.25rem)] flex flex-col justify-center">
        {!isSensitive && <ConfettiRain active={rainActive} />}

        {/* ── Main Responsive Grid: Card Preview (Left on Desktop, Below on Mobile) + Delivery Hub (Top on Mobile, Right on Desktop) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center lg:h-full lg:max-h-full">
          {/* Interactive Card Preview Column */}
          <div className="order-2 lg:order-1 lg:col-span-8 xl:col-span-8 flex flex-col items-center text-center lg:h-full lg:max-h-full lg:justify-start lg:min-h-0">
            <div className="w-full shrink-0 flex items-center justify-between px-2 mb-1.5 z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Eye className="size-3.5 text-emerald-400" /> Interactive Receiver Preview
              </span>
            </div>

            <div className="w-full flex-1 min-h-0 pt-10 pb-6 px-1 flex flex-col items-center justify-start lg:max-h-[calc(100dvh-6.5rem)] overflow-y-auto scrollbar-none">
              <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
                <ThreeDCardWrapper
                  recipientName={activeWish.recipientName}
                  eventTitle={lang === 'ur' ? (occasion?.urdu || occasion?.label || 'مبارک ہو') : (t(`occ_${occasion?.id?.replace(/-/g, '_')}`) || occasion?.label || 'Greetings')}
                  occasionIdOrCategory={activeWish.occasionId}
                  isIslamic={isIslamic}
                  isSensitive={isSensitive}
                  audioTrack={activeWish.audioTrack}
                  autoOpen={true}
                  onOpened={() => {
                    if (!isSensitive) {
                      setRainActive(true)
                    }
                  }}
                >
                  <WishCard ref={cardRef} data={activeWish} watermark={true} />
                </ThreeDCardWrapper>
              </div>

              {/* Recipient Photo (if attached) */}
              {activeWish.photoUrl && (
                <div className="mt-3 w-full max-w-sm p-2 rounded-xl border border-border bg-card/80 backdrop-blur-md shadow-xs text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Camera className="size-3 text-amber-500" />
                    <span className="text-[10px] font-bold text-foreground">Attached Photo</span>
                  </div>
                  <ZoomableImageBadge
                    src={activeWish.photoUrl}
                    alt={activeWish.recipientName || 'Wish Photo'}
                    title={`${activeWish.recipientName || 'Greeting'} — Photo`}
                    className="size-11 sm:size-12 mx-auto rounded-lg border border-border shadow-xs hover:scale-105 transition-transform"
                  >
                    <img src={activeWish.photoUrl} alt="Attached Wish Photo" className="size-full object-cover rounded-lg" />
                  </ZoomableImageBadge>
                  <p className="text-[9.5px] text-muted-foreground mt-1 flex items-center justify-center gap-1">
                    <Maximize2 className="size-2.5 text-amber-500" /> Tap photo to enlarge
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Unified 1-Click Delivery Hub Column (Top on Mobile, Vertically Centered on Desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-4 xl:col-span-4 flex flex-col justify-center lg:h-full lg:max-h-full">
            <div className="rounded-2xl xl:rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white p-3.5 sm:p-4 lg:p-3.5 xl:p-4 shadow-xl space-y-2 lg:space-y-2 xl:space-y-2.5 text-left lg:max-h-[calc(100dvh-5.5rem)] lg:overflow-y-auto scrollbar-none">
              {/* Ready to Deliver celebration highlight */}
              <div className="p-2 lg:p-2.5 rounded-xl bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-emerald-500/20 border border-emerald-400/35 shadow-xs flex items-center gap-2">
                <span className="text-xl animate-bounce shrink-0">🎉</span>
                <div className="flex-1 min-w-0 text-left">
                  <span className="text-emerald-300 font-extrabold text-xs block leading-tight">Card Live & Ready to Deliver!</span>
                  <p className="text-zinc-300 text-[10px] leading-tight truncate mt-0.5">
                    Send to <strong>{activeWish.recipientName || 'recipient'}</strong> on WhatsApp for full unboxing surprise!
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                    <Sparkles className="size-2.5 text-amber-400" /> 1-Click Delivery Hub
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-800/90 px-2 py-0.5 text-[9.5px] font-bold text-slate-300 border border-white/10">
                    <Eye className="size-2.5 text-emerald-400" /> {activeWish.viewCount || 0} visits
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                  Deliver to {activeWish.recipientName || 'Loved One'}
                </h2>
                <p className="text-[10.5px] text-slate-300 mt-0.5">
                  Send the clean private link directly. Recipient sees full-screen experience with music & wishes.
                </p>
              </div>

              {/* Primary 1-Click WhatsApp Button */}
              <Button
                onClick={handleDirectWhatsApp}
                className="w-full h-10 sm:h-11 rounded-xl bg-[#25D366] hover:bg-[#1eb955] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/25 active:scale-95 transition-all cursor-pointer"
              >
                <MessageCircle className="size-4 shrink-0" />
                <span>Send via WhatsApp</span>
              </Button>

              {/* Clean Receiver Link Box */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Clean Receiver Link
                </label>
                <div className="flex items-center gap-2 p-1 rounded-xl border border-white/15 bg-white/5">
                  <input
                    type="text"
                    readOnly
                    value={fullReceiverUrl}
                    className="flex-1 bg-transparent px-2 text-[11px] text-slate-200 outline-none truncate font-mono select-all"
                  />
                  <Button
                    onClick={handleDirectCopy}
                    size="sm"
                    className={cn(
                      "h-7 px-2.5 rounded-lg font-bold text-[11px] shrink-0 transition-all cursor-pointer",
                      copiedLink
                        ? "bg-emerald-500 text-slate-950"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    )}
                  >
                    {copiedLink ? <Check className="size-3" /> : <Copy className="size-3" />}
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </Button>
                </div>
              </div>

              {/* Direct 1-Click Media Exports: Download Image (PNG) & Animated Video (MP4) */}
              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <Button
                  onClick={handleDownloadPng}
                  disabled={isDownloadingPng || isGeneratingVideo}
                  variant="outline"
                  className="h-8.5 rounded-lg border-emerald-500/30 bg-white/5 hover:bg-white/10 text-emerald-300 font-bold text-[11px] flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {isDownloadingPng ? (
                    <Loader2 className="size-3 animate-spin text-emerald-400" />
                  ) : (
                    <Download className="size-3 text-emerald-400" />
                  )}
                  <span>{isDownloadingPng ? 'Saving...' : 'Download Image'}</span>
                </Button>

                <Button
                  onClick={handleDownloadVideo}
                  disabled={isDownloadingPng || isGeneratingVideo}
                  variant="outline"
                  className="h-8.5 rounded-lg border-rose-500/30 bg-[#7A1E2B]/20 hover:bg-[#7A1E2B]/30 text-rose-200 font-bold text-[11px] flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {isGeneratingVideo ? (
                    <>
                      <Loader2 className="size-3 animate-spin text-rose-300" />
                      <span>{videoProgress > 0 ? `${videoProgress}%` : 'Making...'}</span>
                    </>
                  ) : (
                    <>
                      <Video className="size-3 text-rose-400" />
                      <span>Download Video</span>
                    </>
                  )}
                </Button>
              </div>

              {typeof navigator !== 'undefined' && 'share' in navigator ? (
                <Button
                  onClick={handleDirectNativeShare}
                  variant="outline"
                  className="w-full h-8 rounded-lg border-white/15 bg-white/5 hover:bg-white/10 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <Share2 className="size-3" />
                  <span>Share via Other Apps</span>
                </Button>
              ) : null}

              {/* Integrated Receiver QR Code (Compact Horizontal Row with Download Icon) */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <button
                    type="button"
                    onClick={handleDownloadQr}
                    className="relative group p-1 rounded-xl bg-white shadow-xs shrink-0 cursor-pointer hover:ring-2 hover:ring-emerald-400 transition-all text-slate-900"
                    title="Click to Download QR Code (PNG)"
                  >
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=09090b&bgcolor=ffffff&data=${encodeURIComponent(fullReceiverUrl)}`}
                      alt="Receiver QR Code"
                      className="size-11 rounded object-contain block"
                    />
                    <span className="absolute inset-0 bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                      <Download className="size-4 text-emerald-300" />
                    </span>
                  </button>
                  <div className="min-w-0 text-left">
                    <span className="text-[10.5px] font-bold text-amber-300 uppercase tracking-wider block">
                      Receiver QR Code
                    </span>
                    <p className="text-[9.5px] text-slate-400 leading-tight mt-0.5 truncate">
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
                  className="h-7 px-2.5 rounded-lg border-emerald-400/40 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-300 text-[10.5px] font-bold shrink-0 flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                  title="Download high-resolution QR code"
                >
                  {downloadingQr ? <Loader2 className="size-3 animate-spin text-emerald-300" /> : <Download className="size-3" />}
                  <span>Download</span>
                </Button>
              </div>

              {/* Free vs Pro Link Retention Status */}
              <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1 text-zinc-300">
                  <Sparkles className="size-3 text-amber-400" />
                  <span>Free Card · 30-Day Active</span>
                </div>
                <Link href="/pricing" className="text-amber-400 hover:text-amber-300 font-bold underline transition-colors">
                  Keep Forever (Pro)
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner (Mobile Only) */}
        <div className="mt-8 rounded-2xl p-4 text-center border border-border bg-card shadow-sm max-w-xl mx-auto lg:hidden">
          <p className="text-sm font-bold mb-1 text-foreground">{t('createDigitalCardCTA') || 'Create Another Digital Wish Card'}</p>
          <Link
            href="/create-wish"
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
          >
            {t('sendWish') || 'Create Wish Card'} <Sparkles className="size-3.5" />
          </Link>
        </div>

        {/* Sticky Mobile Share Bar for Sender Mode */}
        <div className="fixed bottom-0 inset-x-0 z-50 p-3 bg-slate-950/95 backdrop-blur-xl border-t border-emerald-500/30 sm:hidden flex items-center justify-between gap-2 shadow-2xl">
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

        {/* Floating Action Pill for Desktop SENDER */}
        <div className="hidden sm:flex fixed bottom-4 right-4 z-40 items-center gap-2">
          <button
            onClick={() => setShowGuestbookModal(true)}
            className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 hover:from-purple-600 hover:to-indigo-600 text-white text-xs font-bold shadow-2xl shadow-purple-950/70 border border-purple-400/40 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
            title="Open Wishes Wall & Dua (Leave a Blessing)"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
            </span>
            <MessageCircle className="size-3.5 text-purple-200 group-hover:scale-110 transition-transform" />
            <span>💬 Wishes Wall</span>
          </button>
        </div>

          {/* Event Card Guestbook / Wishes Wall Modal */}
          <CardGuestbookModal
            cardSlug={slug}
            cardType="wish"
            recipientName={activeWish.recipientName}
            isOpen={showGuestbookModal}
            onClose={() => setShowGuestbookModal(false)}
            onWishSubmitted={() => {
              setRainActive(true)
              setTimeout(() => setRainActive(false), 4000)
            }}
          />

      </div>
    )
  }

  // ── 2. RECEIVER SCREEN (Clean Full-Screen Viewport + Cardzy Make Your Own) ──
  return (
    <div className="flex min-h-[100dvh] flex-col justify-between items-center relative px-3 sm:px-6 py-3 sm:py-4 w-full select-none overflow-y-auto">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[32rem] rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 size-[32rem] rounded-full bg-amber-500/10 blur-[120px]" />

      {/* Celebration Effects Rain */}
      {!isSensitive && <ConfettiRain active={rainActive} />}

      {/* Receiver Screen Top Minimal Bar (Sticky & never cut off) */}
      <header className="w-full max-w-4xl flex items-center justify-between z-20 py-2 px-4 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/15 text-white shadow-2xl shrink-0">
        <Link href="/" className="flex items-center gap-2 group">
          <CardzyLogo className="size-7 transition-transform group-hover:scale-105" />
          <span className="text-sm font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
            Cardzy
          </span>
        </Link>

        <Link
          href="/create-wish"
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-4 py-1.5 text-xs font-extrabold shadow-md transition-all hover:scale-105"
        >
          <Sparkles className="size-3 text-amber-300 animate-pulse" />
          <span>Cardzy · Make Your Own</span>
        </Link>
      </header>

      {/* Receiver Screen Main Responsive Layout: Side-by-Side on Desktop, Stacked on Mobile */}
      <main className="w-full max-w-7xl flex-1 flex flex-col justify-center items-center my-auto py-3 sm:py-5 z-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center justify-center">
          {/* Left Column: 3D Wish Card (Prominent & Wide on Desktop, natural aspect ratio) */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col items-center justify-center w-full">
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl flex justify-center">
              <ThreeDCardWrapper
                recipientName={activeWish.recipientName}
                eventTitle={lang === 'ur' ? (occasion?.urdu || occasion?.label || 'مبارک ہو') : (t(`occ_${occasion?.id?.replace(/-/g, '_')}`) || occasion?.label || 'Greetings')}
                occasionIdOrCategory={activeWish.occasionId}
                isIslamic={isIslamic}
                isSensitive={isSensitive}
                audioTrack={activeWish.audioTrack}
                onOpened={() => {
                  if (!isSensitive) {
                    setRainActive(true)
                  }
                }}
              >
                <WishCard ref={cardRef} data={activeWish} watermark={true} />
              </ThreeDCardWrapper>
            </div>
          </div>

          {/* Right Column: Interaction Hub (Live Reactions, Wishes Wall, Share) - Sleek & Compact */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col items-center lg:items-stretch justify-center gap-3 w-full max-w-sm mx-auto p-4 sm:p-4.5 rounded-3xl bg-slate-900/75 backdrop-blur-xl border border-white/15 shadow-2xl">
            {/* Occasion & Recipient Header Pill */}
            <div className="text-center lg:text-left">
              <span className="text-[10.5px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20 inline-block mb-1">
                {occasion?.label || 'Special Occasion'}
              </span>
              <h2 className="text-base sm:text-lg font-black text-white leading-tight truncate">
                For: {activeWish.recipientName}
              </h2>
              {activeWish.senderName && (
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  With love from {activeWish.senderName}
                </p>
              )}
            </div>

            {/* Interactive Live Emoji Reactions Dock - RIGHT ON SCREEN! */}
            {!isSensitive && (
              <div className="w-full flex flex-col items-center lg:items-start gap-1.5 pt-1.5 border-t border-white/10">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Heart className="size-3.5 text-rose-400" /> Send Live Reaction
                </span>
                <div className="w-full flex justify-center lg:justify-start">
                  <CardLiveReactions
                    cardSlug={activeWish.slug}
                    cardType="wish"
                    isUrdu={lang === 'ur' || lang === 'ar'}
                    theme="dark"
                  />
                </div>
              </div>
            )}

            {/* Wishes Wall & Share Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5 pt-1.5 border-t border-white/10">
              <button
                onClick={() => setShowGuestbookModal(true)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 hover:from-purple-600 hover:to-indigo-600 text-white font-extrabold text-xs shadow-lg border border-purple-400/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
                </span>
                <span>💬 Wishes Wall</span>
              </button>

              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl border border-white/20 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Share2 className="size-3.5 text-emerald-400" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Receiver Screen Footer Control */}
      <footer className="w-full max-w-md flex flex-col items-center gap-2 z-20 pt-1 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] text-center shrink-0">
        <Link
          href="/create-wish"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors font-medium"
        >
          <Sparkles className="size-3 text-amber-400" />
          <span>Cardzy · Make Your Own</span>
        </Link>
      </footer>

      {/* Floating Action Pill for Wishes Wall & Share - Visible on mobile only, hidden on desktop to avoid duplicate share button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setShowShareModal(true)}
          className="group flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-bold shadow-xl border border-white/20 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          title="Share Link & QR"
        >
          <Share2 className="size-3.5 text-amber-400" />
          <span className="hidden sm:inline">Share</span>
        </button>

        <button
          onClick={() => setShowGuestbookModal(true)}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 hover:from-purple-600 hover:to-indigo-600 text-white text-xs font-bold shadow-2xl shadow-purple-950/70 border border-purple-400/40 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
          title="Open Wishes Wall & Dua (Leave a Blessing)"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
          </span>
          <MessageCircle className="size-3.5 text-purple-200 group-hover:scale-110 transition-transform" />
          <span>💬 Wishes Wall</span>
        </button>
      </div>

      {/* Universal Luxury Share Modal */}
      {showShareModal && (
        <CardShareModal
          simpleMode={true}
          card={{
            title: occasion?.label || 'Greeting Card',
            recipientOrCouple: activeWish.recipientName,
            type: 'wish',
            slug: activeWish.slug,
            url: `/w/${activeWish.slug}`,
            viewsCount: activeWish.viewCount || 0,
            shares: activeWish.shares,
            occasion: occasion?.label || activeWish.occasionId,
            message: activeWish.message,
            senderName: activeWish.senderName,
            theme: activeWish.themeId,
            photoUrl: activeWish.photoUrl,
            waMessage: `✨ Hey ${activeWish.recipientName}! I created a digital greeting card for you on Cardzy. Tap to open:`,
          }}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {/* Event Card Guestbook / Wishes Wall Modal */}
      <CardGuestbookModal
        cardSlug={activeWish.slug}
        cardType="wish"
        recipientName={activeWish.recipientName}
        isOpen={showGuestbookModal}
        onClose={() => setShowGuestbookModal(false)}
        onWishSubmitted={() => {
          setRainActive(true)
          setTimeout(() => setRainActive(false), 4000)
        }}
      />
    </div>
  )
}

export default function WishPublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [activeWish, setActiveWish] = useState<Wish | null>(null)
  const { wishes } = useJashn()
  const searchParams = useSearchParams()

  useEffect(() => {
    const existing = wishes.find((w) => w.slug === slug)
    if (existing) {
      setActiveWish(existing)
    } else {
      const decoded = decodeShortWish(searchParams, slug)
      if (decoded) {
        setActiveWish(decoded)
      }
    }
  }, [slug, wishes, searchParams])

  const isSensitive = activeWish?.occasionId === 'condolence'

  return (
    <div className={cn(
      "flex min-h-[100dvh] flex-col transition-colors duration-500",
      isSensitive ? "bg-zinc-950 text-zinc-400" : "bg-gradient-to-b from-slate-950 via-emerald-950/40 to-slate-950 text-white"
    )}>
      <Suspense fallback={
        <div className="flex min-h-[100dvh] items-center justify-center bg-slate-950">
          <Loader2 className="size-10 animate-spin text-emerald-400" />
        </div>
      }>
        <WishPublicContent slug={slug} />
      </Suspense>
    </div>
  )
}
