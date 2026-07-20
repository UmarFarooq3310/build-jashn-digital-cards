'use client'

import { useEffect, useRef, useState, use, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Sparkles, MapPin, CheckCircle2, MessageCircle, Heart, Loader2, Edit3, Trash2, Eye } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { InvitationCard } from '@/components/jashn/invitation-card'
import { ThreeDCardWrapper } from '@/components/jashn/three-d-card-wrapper'
import { ConfettiRain } from '@/components/jashn/confetti-rain'
import { ShareBar } from '@/components/jashn/share-bar'
import { Button } from '@/components/ui/button'
import { useJashn } from '@/lib/jashn/store'
import { useLang } from '@/lib/lang/context'
import { decodeShortInvitation, encodeShortInvitation } from '@/lib/jashn/codec'
import { getInvitationType } from '@/lib/jashn/invitations'
import type { Invitation } from '@/lib/jashn/types'
import { cn } from '@/lib/utils'
import { db, isFirebaseConfigured } from '@/lib/firebase'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'

function InvitationPublicContent({ slug }: { slug: string }) {
  const { lang, t } = useLang()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, invitations, incrementInvitationView, incrementRsvp, deleteInvitation, showToast } = useJashn()
  const cardRef = useRef<HTMLDivElement>(null)
  const viewIncrementedRef = useRef<string | null>(null)

  const [isMounted, setIsMounted] = useState(false)
  const [activeInvitation, setActiveInvitation] = useState<Invitation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [rsvped, setRsvped] = useState(false)
  const [rainActive, setRainActive] = useState(false)

  // Resolve sound category from the invitation type


  const isCreator = (() => {
    const card = invitations.find((i) => i.slug === slug)
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
        const docRef = doc(db, 'invitations', slug)
        unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as Invitation
            setActiveInvitation(data)
            
            // Increment view count (only once per mount/slug)
            if (viewIncrementedRef.current !== slug) {
              viewIncrementedRef.current = slug
              incrementInvitationView(slug)
              setActiveInvitation((prev) => (prev ? { ...prev, viewCount: (prev.viewCount || 0) + 1 } : null))
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
        console.error('Failed to listen to invitation from Firestore:', e)
        fallbackToLocalAndUrl()
      }
    } else {
      fallbackToLocalAndUrl()
    }

    function fallbackToLocalAndUrl() {
      // Fallback to local storage (Zustand)
      const existing = invitations.find((i) => i.slug === slug)
      if (existing) {
        setActiveInvitation(existing)
        if (viewIncrementedRef.current !== slug) {
          viewIncrementedRef.current = slug
          incrementInvitationView(slug)
          setActiveInvitation((prev) => (prev ? { ...prev, viewCount: (prev.viewCount || 0) + 1 } : null))
        }
        setIsLoading(false)
        return
      }

      // Decode short format or full json
      const decoded = decodeShortInvitation(searchParams, slug)
      if (decoded) {
        setActiveInvitation(decoded)
        setIsLoading(false)
        return
      }

      const rawData = searchParams.get('d')
      if (rawData) {
        try {
          const parsed: Invitation = JSON.parse(decodeURIComponent(rawData))
          setActiveInvitation(parsed)
          setIsLoading(false)
          return
        } catch (e) {
          console.error('Failed to parse encoded invitation data', e)
        }
      }

      if (slug === 'sample' || slug === 'demo') {
        setActiveInvitation({
          id: 'sample',
          slug: 'sample',
          creatorId: 'demo',
          typeId: 'nikkah',
          title: 'Nikkah Ceremony',
          hostNames: 'Khan & Ali Families',
          groom: 'Hamza Khan',
          bride: 'Ayesha Ali',
          date: new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 10),
          time: '7:30 PM',
          venue: 'Pearl Continental Marquee',
          city: 'Lahore',
          mapsLink: 'https://maps.google.com',
          dressCode: 'Traditional / Formal',
          notes: 'Your presence is our greatest gift!',
          rsvpPhone: '+92 300 1234567',
          themeId: 'mehndi-red',
          borderId: 'mehndi',
          rsvpCount: 24,
          viewCount: 142,
          createdAt: Date.now(),
        })
      }
      setIsLoading(false)
    }

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [slug, invitations, searchParams, isMounted, incrementInvitationView])

  function handleRsvp() {
    if (!rsvped) {
      incrementRsvp(slug)
      setRsvped(true)
    }
    if (activeInvitation?.rsvpPhone) {
      const text = encodeURIComponent(`Hi! I will be attending ${activeInvitation.title || 'the event'}. Confirming my RSVP via Cardzy.online!`)
      window.open(`https://wa.me/${activeInvitation.rsvpPhone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank')
    }
  }

  function handleEdit() {
    router.push(`/create-invitation?edit=${slug}`)
  }

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this invitation? This action cannot be undone.")) {
      deleteInvitation(slug)
      showToast("Invitation deleted successfully", "info")
      router.push('/')
    }
  }

  if (!isMounted || isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center p-20 text-center">
        <Loader2 className="size-8 animate-spin text-emerald-600" />
      </div>
    )
  }

  if (!activeInvitation) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center py-20">
        <h1 className="text-3xl font-bold text-primary">{t('invitationNotFoundTitle')}</h1>
        <p className="mt-2 text-muted-foreground">{t('invitationNotFoundDesc')}</p>
        <Link href="/create-invitation" className="mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg hover:bg-primary/90">
          Create Event Invitation
        </Link>
      </div>
    )
  }

  const type = getInvitationType(activeInvitation.typeId)
  const isIslamic = type?.category === 'Religious'
  const waMsg = `You are invited! Check out the digital invitation for ${activeInvitation.title || activeInvitation.groom + ' & ' + activeInvitation.bride}`
  const cleanUrl = `/i/${activeInvitation.slug}`

  return (
    <div className="mx-auto max-w-2xl md:max-w-4xl px-4 text-center">
      {/* Celebration Effects Rain */}
      <ConfettiRain active={rainActive} />

      {/* Creator Actions Panel */}
      {isCreator && (
        <div className="mb-6 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-sm">
          <div>
            <p className="text-sm font-bold text-primary flex items-center gap-1.5">
              <Sparkles className="size-4 text-primary animate-pulse" /> You Created This Card!
            </p>
            <p className="text-xs text-muted-foreground">{t('invitationOwnerControlDesc')}</p>
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

      <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
        <span className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-semibold",
          isIslamic
            ? "border-emerald-600/30 bg-emerald-500/10 text-emerald-700"
            : "border-primary/20 bg-primary/10 text-primary"
        )}>
          <Sparkles className="size-3.5" /> Event Invitation Page
        </span>
        <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
          <Heart className="size-3.5 text-primary animate-pulse" /> {activeInvitation.rsvpCount + (rsvped ? 1 : 0)} Attending
        </span>
        <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
          <Eye className="size-3.5" /> {activeInvitation.viewCount ?? 1} views
        </span>
      </div>



      {/* Card Component with 3D Envelope Opening Cover */}
      <div className="my-6 py-4 flex justify-center">
        <ThreeDCardWrapper
          eventTitle={activeInvitation.title || `${activeInvitation.groom} & ${activeInvitation.bride}`}
          occasionIdOrCategory={activeInvitation.typeId}
          isIslamic={isIslamic}
          onOpened={() => {
            setRainActive(true)
          }}
        >
          <InvitationCard ref={cardRef} data={activeInvitation} watermark={true} showCountdown={true} />
        </ThreeDCardWrapper>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          onClick={handleRsvp}
          size="lg"
          className="w-full sm:w-auto bg-[#25D366] text-white hover:bg-[#1eb955] font-bold text-base px-8 rounded-xl shadow-lg"
        >
          {rsvped ? <CheckCircle2 className="mr-2 size-5" /> : <MessageCircle className="mr-2 size-5" />}
          {rsvped ? 'RSVP Confirmed!' : 'Confirm RSVP via WhatsApp'}
        </Button>

        {activeInvitation.mapsLink ? (
          <a
            href={activeInvitation.mapsLink}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors shadow-sm"
          >
            <MapPin className="size-4 text-primary" /> Get Location on Google Maps
          </a>
        ) : null}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Share Invitation with Guests
        </h3>
        <ShareBar url={cleanUrl} waMessage={waMsg} captureRef={cardRef} fileName={`jashn-invitation-${activeInvitation.slug}`} />
      </div>


      {/* CTA Banner — solid card background ensures readability */}
      <div className="mt-8 rounded-2xl p-6 text-center border border-border bg-card shadow-sm">
        <p className={lang === 'ur' ? "font-urdu text-xl mb-1 text-foreground" : "text-base font-bold mb-1 text-foreground"}>
          {t('createDigitalCardCTA')}
        </p>
        <p className="text-sm font-medium text-muted-foreground mt-1">{t('planningEventCTA')}</p>
        <Link
          href="/create-invitation"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
        >
          {t('buildInvitation')} <Sparkles className="size-4" />
        </Link>
      </div>

    </div>
  )
}

export default function InvitationPublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 py-10 md:py-16 overflow-x-hidden">
        <Suspense fallback={
          <div className="flex py-20 items-center justify-center">
            <Loader2 className="size-8 animate-spin text-emerald-600" />
          </div>
        }>
          <InvitationPublicContent slug={slug} />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}
