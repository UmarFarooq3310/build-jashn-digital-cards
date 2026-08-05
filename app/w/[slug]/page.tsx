'use client'

import '@/app/invitation-themes-animations.css'
import { useEffect, useRef, useState, use, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Sparkles, Eye, Loader2, HeartHandshake, Edit3, Trash2, Share2, X, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WishCard } from '@/components/jashn/wish-card'
import { ThreeDCardWrapper } from '@/components/jashn/three-d-card-wrapper'
import { ConfettiRain } from '@/components/jashn/confetti-rain'
import { ShareBar } from '@/components/jashn/share-bar'
import { CardQrCode } from '@/components/jashn/qr-code'
import { CardzyLogo } from '@/components/ui/logo'
import { useJashn } from '@/lib/jashn/store'
import { useLang } from '@/lib/lang/context'
import { getOccasion } from '@/lib/jashn/occasions'
import { decodeShortWish } from '@/lib/jashn/codec'
import type { Wish } from '@/lib/jashn/types'
import { cn } from '@/lib/utils'
import { db, isFirebaseConfigured } from '@/lib/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

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
  const viewIncrementedRef = useRef<string | null>(null)

  // Check explicitly if the user opened the page in Sender Mode
  const isSenderMode = searchParams.get('mode') === 'sender' || searchParams.get('preview') === 'true' || searchParams.get('role') === 'sender'

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    let unsubscribe: (() => void) | undefined
    setIsLoading(true)

    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, 'wishes', slug)
        unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as Wish
            setActiveWish(data)
            
            if (viewIncrementedRef.current !== slug) {
              viewIncrementedRef.current = slug
              incrementWishView(slug)
              setActiveWish((prev) => (prev ? { ...prev, viewCount: (prev.viewCount || 0) + 1 } : null))
            }
            setIsLoading(false)
          } else {
            fallbackToLocalAndUrl()
          }
        }, (error) => {
          console.error('Firestore listener error:', error)
          fallbackToLocalAndUrl()
        })
      } catch (e) {
        console.error('Failed to listen to wish from Firestore:', e)
        fallbackToLocalAndUrl()
      }
    } else {
      fallbackToLocalAndUrl()
    }

    function fallbackToLocalAndUrl() {
      const existing = wishes.find((w) => w.slug === slug)
      if (existing) {
        setActiveWish(existing)
        if (viewIncrementedRef.current !== slug) {
          viewIncrementedRef.current = slug
          incrementWishView(slug)
          setActiveWish((prev) => (prev ? { ...prev, viewCount: (prev.viewCount || 0) + 1 } : null))
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

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [slug, wishes, searchParams, isMounted, incrementWishView])

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

  // ── 1. SENDER / CREATOR SCREEN (Full Website Layout + Creator Control Panel) ──
  if (isSenderMode) {
    return (
      <div className="py-8 px-4">
        <div className="mx-auto max-w-2xl md:max-w-4xl text-center">
            {/* Celebration Effects Rain */}
            {!isSensitive && <ConfettiRain active={rainActive} />}

            {/* Creator Control Panel */}
            <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-slate-900 text-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-xl">
              <div>
                <p className="text-base font-extrabold text-white flex items-center gap-2">
                  <Sparkles className="size-5 text-amber-400 animate-pulse" /> You Created This Wish Card!
                </p>
                <p className="text-xs text-slate-300 mt-1">{t('wishOwnerControlDesc') || 'You can edit, share, or delete your card below.'}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <Link
                  href={receiverUrl}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all border border-emerald-400/30"
                >
                  <ExternalLink className="size-3.5 text-white" /> View Receiver Screen
                </Link>
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  size="sm"
                  className="text-xs flex items-center gap-1.5 border-amber-300/40 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl shadow-md transition-all px-4 py-2"
                >
                  <Edit3 className="size-3.5 text-slate-950" />
                  <span>Edit Card</span>
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="destructive"
                  size="sm"
                  className="text-xs flex items-center gap-1.5 font-extrabold rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-md transition-all px-4 py-2 border border-red-400/30"
                >
                  <Trash2 className="size-3.5" /> Delete Card
                </Button>
              </div>
            </div>

            {/* Badges & Views Info */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
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
                <Eye className="size-4 text-emerald-400" /> {activeWish.viewCount ?? 1} views
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
                onOpened={() => {
                  if (!isSensitive) {
                    setRainActive(true)
                  }
                }}
              >
                <WishCard ref={cardRef} data={activeWish} watermark={true} />
              </ThreeDCardWrapper>
            </div>

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
      </div>
    )
  }

  // ── 2. RECEIVER SCREEN (Clean 100dvh Full-Screen Viewport + Cardzy Make Your Own) ──
  return (
    <div className="flex min-h-[100dvh] md:h-screen flex-col justify-between items-center relative px-4 py-3 sm:py-4 w-full select-none">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[32rem] rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 size-[32rem] rounded-full bg-amber-500/10 blur-[120px]" />

      {/* Celebration Effects Rain */}
      {!isSensitive && <ConfettiRain active={rainActive} />}

      {/* Receiver Screen Top Minimal Bar */}
      <header className="w-full max-w-2xl flex items-center justify-between z-20 py-2 px-4 rounded-full bg-slate-900/50 backdrop-blur-xl border border-white/10 text-white shadow-xl">
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
      <main className="w-full max-w-4xl lg:max-w-5xl flex-1 flex flex-col items-center justify-center my-auto py-2 sm:py-4 z-10">
        <div className="w-full flex justify-center">
          <ThreeDCardWrapper
            recipientName={activeWish.recipientName}
            eventTitle={lang === 'ur' ? (occasion?.urdu || occasion?.label || 'مبارک ہو') : (t(`occ_${occasion?.id?.replace(/-/g, '_')}`) || occasion?.label || 'Greetings')}
            occasionIdOrCategory={activeWish.occasionId}
            isIslamic={isIslamic}
            isSensitive={isSensitive}
            onOpened={() => {
              if (!isSensitive) {
                setRainActive(true)
              }
            }}
          >
            <WishCard ref={cardRef} data={activeWish} watermark={true} />
          </ThreeDCardWrapper>
        </div>
      </main>

      {/* Receiver Screen Footer Control */}
      <footer className="w-full max-w-md flex flex-col items-center gap-3 z-20 pb-2 text-center">
        <div className="flex items-center gap-3 w-full justify-center">
          <button
            onClick={() => setShowShareModal((o) => !o)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold py-2.5 px-6 text-xs sm:text-sm border border-white/15 backdrop-blur-md shadow-lg transition-all hover:scale-105"
          >
            <Share2 className="size-4 text-emerald-400" />
            <span>Share This Card</span>
          </button>
        </div>

        {/* Share Modal Overlay */}
        {showShareModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 max-w-sm w-full space-y-5 text-white relative shadow-2xl">
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
              >
                <X className="size-5" />
              </button>

              <div className="text-center space-y-1">
                <h3 className="font-extrabold text-lg text-emerald-300">Share Wish Card</h3>
                <p className="text-xs text-slate-400">Send link or scan QR code</p>
              </div>

              <ShareBar url={receiverUrl} waMessage={waMsg} captureRef={cardRef} fileName={`cardzy-online-${activeWish.slug}`} />

              <div className="pt-3 border-t border-white/10 flex flex-col items-center space-y-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Shareable QR Code</span>
                <CardQrCode slug={slug} cardType="w" size={140} showDownloadBtn={true} />
              </div>
            </div>
          </div>
        )}

        <Link
          href="/create-wish"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors font-medium"
        >
          <Sparkles className="size-3 text-amber-400" />
          <span>Cardzy · Make Your Own</span>
        </Link>
      </footer>
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
