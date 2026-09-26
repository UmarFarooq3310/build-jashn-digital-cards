'use client'

import '@/app/invitation-themes-animations.css'
import { useEffect, useRef, useState, use, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Sparkles, Eye, Loader2, HeartHandshake, Edit3, Trash2, Share2, X, ExternalLink, MessageCircle, Camera, Maximize2, Smartphone, Copy, Check, Send, QrCode } from 'lucide-react'
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
  const viewIncrementedRef = useRef<string | null>(null)

  // Only enter Sender Screen if explicitly requested in URL (e.g. preview from dashboard/create page)
  // When copying clean link, sender and receiver both get the complete, clean Receiver Screen
  const isSenderMode =
    searchParams.get('mode') === 'sender' ||
    searchParams.get('preview') === 'true' ||
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
          if (shouldIncrementView(slug, 'wish', existing.creatorId, searchParams, user?.uid)) {
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
              if (shouldIncrementView(slug, 'wish', data.creatorId, searchParams, user?.uid)) {
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

  // ── 1. SENDER / CREATOR SCREEN (Full Website Layout + Creator Control Panel) ──
  if (isSenderMode) {
    return (
      <div className="py-6 px-4 pb-28 sm:pb-12">
        <div className="mx-auto max-w-2xl md:max-w-4xl text-center">
            {/* Celebration Effects Rain */}
            {!isSensitive && <ConfettiRain active={rainActive} />}

            {/* ── High-Converting Card Delivery & Quick Share Hero ── */}
            <div className="mb-6 rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white p-5 sm:p-7 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-black uppercase tracking-wider">
                  <Sparkles className="size-3.5 text-amber-400 animate-pulse" />
                  <span>Your Greeting Card is Ready! 🎉</span>
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Deliver to <span className="text-amber-300">{activeWish.recipientName || 'Your Loved One'}</span>
                </h1>
                
                <p className="text-xs sm:text-sm text-slate-300 max-w-md">
                  Send this interactive 3D digital card instantly. The recipient will see a full-screen celebration with music and animations!
                </p>

                {/* Primary 1-Click Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full max-w-xl pt-2">
                  <Button
                    onClick={handleDirectWhatsApp}
                    className="h-12 rounded-2xl bg-[#25D366] hover:bg-[#1eb955] text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <MessageCircle className="size-4 shrink-0" />
                    <span>Send on WhatsApp</span>
                  </Button>

                  {typeof navigator !== 'undefined' && 'share' in navigator ? (
                    <Button
                      onClick={handleDirectNativeShare}
                      className="h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer"
                    >
                      <Share2 className="size-4 shrink-0" />
                      <span>Share via Apps</span>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setShowShareModal(true)}
                      className="h-12 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
                    >
                      <QrCode className="size-4 shrink-0" />
                      <span>QR Code & Image</span>
                    </Button>
                  )}

                  <Button
                    onClick={handleDirectCopy}
                    variant="outline"
                    className="h-12 rounded-2xl border-white/20 bg-white/5 hover:bg-white/10 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                  >
                    {copiedLink ? <Check className="size-4 text-emerald-400 shrink-0" /> : <Copy className="size-4 shrink-0" />}
                    <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                  </Button>
                </div>

                {/* Secondary Creator Options (Edit / Delete / Preview) */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-3 border-t border-white/10 w-full text-xs">
                  <Link
                    href={receiverUrl}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition-colors border border-white/10"
                  >
                    <ExternalLink className="size-3 text-amber-400" /> View Receiver Screen
                  </Link>
                  <button
                    onClick={handleEdit}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition-colors border border-white/10 cursor-pointer"
                  >
                    <Edit3 className="size-3 text-amber-400" /> Edit Card
                  </button>
                  <button
                    onClick={handleDelete}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 text-[11px] font-semibold transition-colors border border-red-500/20 cursor-pointer"
                  >
                    <Trash2 className="size-3" /> Delete
                  </button>
                  <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 ml-2">
                    <Eye className="size-3" /> {activeWish.viewCount || 0} visits
                  </span>
                </div>
              </div>
            </div>

            {/* Badges & Views Info */}
            <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
              <span className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-extrabold shadow-sm",
                isSensitive
                  ? "border-zinc-700 bg-zinc-800 text-zinc-200"
                  : isIslamic
                  ? "border-emerald-500/40 bg-emerald-900/80 text-emerald-300"
                  : "border-amber-500/40 bg-amber-950/80 text-amber-300"
              )}>
                {isSensitive ? <HeartHandshake className="size-4 text-zinc-300" /> : <Sparkles className="size-4 text-amber-400" />}
                {isSensitive ? t('forwardMessage') : t('specialAnimatedCard')}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-1.5 text-xs font-extrabold text-slate-200 shadow-sm">
                <Eye className="size-4 text-emerald-400" /> {activeWish.viewCount || 0} views
              </span>
            </div>

            {/* 3D Card Display */}
            <div className="my-6 py-4 flex justify-center">
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

            {/* ── Recipient Attached Photo (Tap to view large) ── */}
            {activeWish.photoUrl && (
              <div className="my-6 mx-auto max-w-sm p-4 rounded-3xl border border-amber-500/30 bg-card/80 backdrop-blur-md shadow-xl text-center space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="inline-flex items-center justify-center size-6 rounded-full bg-amber-500/15 text-amber-400">
                    <Camera className="size-3.5" />
                  </span>
                  <p className="text-xs font-bold text-foreground">
                    Attached Card Photo
                  </p>
                </div>
                <div className="flex justify-center">
                  <ZoomableImageBadge
                    src={activeWish.photoUrl}
                    alt={activeWish.recipientName || 'Wish Photo'}
                    title={`${activeWish.recipientName || 'Greeting'} — Photo`}
                    className="size-24 sm:size-28 rounded-2xl border-2 border-amber-500/40 shadow-md hover:scale-105 transition-transform"
                  >
                    <img src={activeWish.photoUrl} alt="Attached Wish Photo" className="size-full object-cover rounded-2xl" />
                  </ZoomableImageBadge>
                </div>
                <p className="text-[11px] text-muted-foreground flex items-center justify-center gap-1">
                  <Maximize2 className="size-3 text-amber-500" /> Tap photo to view in full resolution
                </p>
              </div>
            )}

            {/* Share & QR Code Panel */}
            <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col items-center gap-6 text-left">
              <div className="w-full">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground text-center sm:text-left">
                  Share Receiver Link With Friends
                </h3>
                <ShareBar url={receiverUrl} waMessage={waMsg} captureRef={cardRef} fileName={`cardzy-online-${activeWish.slug}`} />
              </div>

              <div className="w-full pt-4 border-t border-border flex flex-col items-center text-center space-y-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Receiver Shareable QR Code
                </span>
                <CardQrCode slug={slug} cardType="w" size={160} showDownloadBtn={true} />
              </div>
            </div>

            {/* CTA Banner */}
            <div className="mt-8 rounded-2xl p-6 text-center border border-border bg-card shadow-sm">
              <p className="text-base font-bold mb-1 text-foreground">{t('createDigitalCardCTA') || 'Create Another Digital Wish Card'}</p>
              <Link
                href="/create-wish"
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
              >
                {t('sendWish') || 'Create Wish Card'} <Sparkles className="size-4" />
              </Link>
            </div>
          </div>

          {/* Sticky Mobile Share Bar for Sender Mode */}
          <div className="fixed bottom-0 inset-x-0 z-50 p-3 bg-slate-950/95 backdrop-blur-xl border-t border-emerald-500/30 sm:hidden flex items-center justify-between gap-2 shadow-2xl">
            <Button
              onClick={handleDirectWhatsApp}
              className="flex-1 h-11 rounded-xl bg-[#25D366] hover:bg-[#1eb955] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all"
            >
              <MessageCircle className="size-4 shrink-0" />
              <span>WhatsApp</span>
            </Button>
            <Button
              onClick={handleDirectCopy}
              variant="outline"
              className="h-11 px-3.5 rounded-xl border-white/20 bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-1 active:scale-95 transition-all"
            >
              {copiedLink ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
              <span>{copiedLink ? 'Copied' : 'Copy'}</span>
            </Button>
            <Button
              onClick={() => setShowShareModal(true)}
              className="h-11 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1 shadow-md active:scale-95 transition-all"
            >
              <Share2 className="size-4" />
              <span>Share</span>
            </Button>
          </div>

          {/* Floating Action Pill for Desktop SENDER */}
          <div className="hidden sm:flex fixed bottom-4 right-4 z-40 items-center gap-2">
            <button
              onClick={() => setShowShareModal(true)}
              className="group flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-bold shadow-xl border border-white/20 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              title="Share Link & QR"
            >
              <Share2 className="size-3.5 text-amber-400" />
              <span>Share</span>
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

          {/* Universal Share Modal */}
          {showShareModal && (
            <CardShareModal
              card={{
                title: `Wish for ${activeWish.recipientName}`,
                recipientOrCouple: activeWish.recipientName,
                type: 'wish',
                slug: slug,
                url: receiverUrl,
                viewsCount: activeWish.viewCount,
                shares: activeWish.shares,
                occasion: occasion?.label || 'Greeting Card',
                senderName: activeWish.senderName,
                message: activeWish.message,
                waMessage: `✨ I sent you a special wish on Cardzy! Tap to open:`,
              }}
              onClose={() => setShowShareModal(false)}
            />
          )}

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

  // ── 2. RECEIVER SCREEN (Clean 100dvh Full-Screen Viewport + Cardzy Make Your Own) ──
  return (
    <div className="flex min-h-[100dvh] flex-col justify-between items-center relative px-4 py-4 sm:py-6 w-full select-none overflow-y-auto">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[32rem] rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 size-[32rem] rounded-full bg-amber-500/10 blur-[120px]" />

      {/* Celebration Effects Rain */}
      {!isSensitive && <ConfettiRain active={rainActive} />}

      {/* Receiver Screen Top Minimal Bar (Sticky & never cut off) */}
      <header className="sticky top-3 w-full max-w-2xl flex items-center justify-between z-30 py-2.5 px-4 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/15 text-white shadow-2xl shrink-0">
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

      {/* Receiver Screen Main Centered 3D Card Display */}
      <main className="w-full max-w-4xl lg:max-w-5xl flex-1 flex flex-col items-center justify-center my-auto py-4 sm:py-6 z-10">
        <div className="w-full flex justify-center py-2">
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

        {/* Interactive Live Emoji Reactions Dock */}
        {!isSensitive && (
          <div className="w-full max-w-md flex justify-center">
            <CardLiveReactions
              cardSlug={activeWish.slug}
              cardType="wish"
              isUrdu={lang === 'ur' || lang === 'ar'}
              theme="dark"
            />
          </div>
        )}
      </main>

      {/* Receiver Screen Footer Control (Always visible & never cut off) */}
      <footer className="w-full max-w-md flex flex-col items-center gap-3 z-20 pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] text-center shrink-0">
        <div className="flex items-center gap-3 w-full justify-center">
          <button
            onClick={() => setShowShareModal((o) => !o)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold py-2.5 px-6 text-xs sm:text-sm border border-white/15 backdrop-blur-md shadow-lg transition-all hover:scale-105"
          >
            <Share2 className="size-4 text-emerald-400" />
            <span>Share This Card</span>
          </button>
        </div>

        {/* Universal Luxury Share Modal */}
        {showShareModal && (
          <CardShareModal
            card={{
              title: lang === 'ur' ? (occasion?.urdu || occasion?.label || 'مبارک ہو') : (t(`occ_${occasion?.id?.replace(/-/g, '_')}`) || occasion?.label || 'Greetings'),
              recipientOrCouple: activeWish.recipientName,
              type: 'wish',
              slug: activeWish.slug,
              url: `/w/${activeWish.slug}`,
              viewsCount: activeWish.viewCount || 0,
              shares: activeWish.shares,
              occasion: occasion?.label || 'Wish Greeting',
              senderName: activeWish.senderName,
              waMessage: waMsg,
            }}
            onClose={() => setShowShareModal(false)}
          />
        )}



        <Link
          href="/create-wish"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors font-medium"
        >
          <Sparkles className="size-3 text-amber-400" />
          <span>Cardzy · Make Your Own</span>
        </Link>
      </footer>

      {/* Floating Action Pill for Wishes Wall & Share - Visible to ALL visitors */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
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
