'use client'

import { useEffect, useRef, useState, use, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Sparkles, Eye, Loader2, HeartHandshake, Edit3, Trash2 } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { WishCard } from '@/components/jashn/wish-card'
import { ThreeDCardWrapper } from '@/components/jashn/three-d-card-wrapper'
import { ConfettiRain } from '@/components/jashn/confetti-rain'
import { ShareBar } from '@/components/jashn/share-bar'
import { useJashn } from '@/lib/jashn/store'
import { useLang } from '@/lib/lang/context'
import { getOccasion } from '@/lib/jashn/occasions'
import { decodeShortWish, encodeShortWish } from '@/lib/jashn/codec'
import type { Wish } from '@/lib/jashn/types'
import { cn } from '@/lib/utils'
import { db, isFirebaseConfigured } from '@/lib/firebase'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'

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
  const viewIncrementedRef = useRef<string | null>(null)



  const isCreator = (() => {
    const card = wishes.find((w) => w.slug === slug)
    if (!card) return false
    if (card.creatorId === 'guest') return !user
    return !!user && card.creatorId === user.uid
  })()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    let unsubscribe: (() => void) | undefined

    setIsLoading(true)

    // Try fetching from Firestore first if configured (with real-time listener)
    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, 'wishes', slug)
        unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as Wish
            setActiveWish(data)
            
            // Increment view count (only once per mount/slug)
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
      // Fallback to local storage (Zustand)
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

      // Decode short format or full json
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
      <div className="flex flex-1 items-center justify-center p-20 text-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!activeWish) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center py-20">
        <h1 className="text-3xl font-bold text-primary">{t('wishNotFoundTitle')}</h1>
        <p className="mt-2 text-muted-foreground">{t('wishNotFoundDesc')}</p>
        <Link href="/create-wish" className="mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg hover:bg-primary/90">
          Create Your Own Wish Card
        </Link>
      </div>
    )
  }

  const occasion = getOccasion(activeWish.occasionId)
  const isIslamic = occasion?.category === 'Islamic'
  const isSensitive = activeWish.occasionId === 'condolence'

  const waMsg = `${activeWish.senderName} sent you a 0`
  const cleanUrl = `/w/${activeWish.slug}`

  return (
    <div className="mx-auto max-w-2xl md:max-w-4xl px-4 text-center">
      {/* Celebration Effects Rain */}
      {!isSensitive && <ConfettiRain active={rainActive} />}

      {/* Creator Actions Panel */}
      {isCreator && (
        <div className="mb-6 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-sm">
          <div>
            <p className="text-sm font-bold text-primary flex items-center gap-1.5">
              <Sparkles className="size-4 text-primary animate-pulse" /> You Created This Card!
            </p>
            <p className="text-xs text-muted-foreground">{t('wishOwnerControlDesc')}</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              onClick={handleEdit}
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-initial text-xs flex items-center justify-center gap-1.5 border-primary/30 hover:bg-primary/10"
            >
              <Edit3 className="size-3.5" /> Edit Card
            </Button>
            <Button
              onClick={handleDelete}
              variant="destructive"
              size="sm"
              className="flex-1 sm:flex-initial text-xs flex items-center justify-center gap-1.5"
            >
              <Trash2 className="size-3.5" /> Delete Card
            </Button>
          </div>
        </div>
      )}

      {/* Top badges & Views info */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
        <span className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-semibold",
          isSensitive
            ? "border-zinc-700 bg-zinc-800/50 text-zinc-400"
            : isIslamic
            ? "border-emerald-600/30 bg-emerald-500/10 text-emerald-700"
            : "border-primary/20 bg-primary/10 text-primary"
        )}>
          {isSensitive ? (
            <HeartHandshake className="size-3.5" />
          ) : (
            <Sparkles className="size-3.5" />
          )}
          {isSensitive ? t('forwardMessage') : t('specialAnimatedCard')}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Eye className="size-3.5" /> {activeWish.viewCount ?? 1} views
        </span>
      </div>



      {/* Card Component with 3D Envelope Opening Cover */}
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

      {/* Share Actions with Clean Short Link */}
      <div className={cn(
        "mt-8 rounded-2xl border bg-card p-6 shadow-sm",
        isSensitive ? "border-zinc-800 bg-zinc-950" : "border-border"
      )}>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {isSensitive ? t('forwardMessage') : t('shareThisCard')}
        </h3>
        <ShareBar url={cleanUrl} waMessage={waMsg} captureRef={cardRef} fileName={`jashn-wish-${activeWish.slug}`} />
      </div>


      {/* CTA Banner — solid background so text is always readable */}
      <div className={cn(
        "mt-8 rounded-2xl p-6 text-center border",
        isSensitive
          ? "bg-zinc-900 border-zinc-700"
          : "bg-card border-border shadow-sm"
      )}>
        {isSensitive ? (
          <>
            <p className="text-sm font-medium text-zinc-300">Cardzy — share digital condolence letters respectfully.</p>
            <Link
              href="/create-wish"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-zinc-700 px-6 py-2.5 text-sm font-bold text-zinc-100 border border-zinc-600 hover:bg-zinc-600 transition-colors"
            >
              Create Free Animated Card
            </Link>
          </>
        ) : (
          <>
            <p className={lang === 'ur' ? "font-urdu text-xl mb-1 text-foreground" : "text-base font-bold mb-1 text-foreground"}>
              {t('createDigitalCardCTA')}
            </p>
            <p className="text-sm font-medium text-muted-foreground mt-1">{t('inspiredByWish')}</p>
            <Link
              href="/create-wish"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
            >
              {t('sendWish')} <Sparkles className="size-4" />
            </Link>
          </>
        )}
      </div>

    </div>
  )
}

export default function WishPublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [activeWish, setActiveWish] = useState<Wish | null>(null)
  const { wishes } = useJashn()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Basic pre-fetch of occasion to get sensitive status
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
      "flex min-h-screen flex-col transition-colors duration-500",
      isSensitive ? "bg-zinc-950 text-zinc-400" : "bg-background"
    )}>
      <SiteHeader />
      <main className="flex-1 py-10 md:py-16 overflow-x-hidden">
        <Suspense fallback={
          <div className="flex py-20 items-center justify-center">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        }>
          <WishPublicContent slug={slug} />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}
