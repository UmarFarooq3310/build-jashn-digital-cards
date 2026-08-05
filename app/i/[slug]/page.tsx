'use client'

import '@/app/invitation-themes-animations.css'
import '@/app/invitation-themes-wedding.css'
import '@/app/invitation-themes-religious.css'
import '@/app/invitation-themes-social.css'
import '@/app/invitation-themes-professional.css'
import '@/app/invitation-themes-premium.css'

import { useEffect, useRef, useState, use, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Sparkles, MapPin, CheckCircle2, MessageCircle, Heart, Loader2, Edit3, Trash2, Eye, Share2, X, ExternalLink } from 'lucide-react'
import { InvitationCard } from '@/components/jashn/invitation-card'
import { ThreeDCardWrapper } from '@/components/jashn/three-d-card-wrapper'
import { ConfettiRain } from '@/components/jashn/confetti-rain'
import { ShareBar } from '@/components/jashn/share-bar'
import { CardQrCode } from '@/components/jashn/qr-code'
import { CardzyLogo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { useJashn } from '@/lib/jashn/store'
import { useLang } from '@/lib/lang/context'
import { decodeShortInvitation } from '@/lib/jashn/codec'
import { getInvitationType } from '@/lib/jashn/invitations'
import type { Invitation } from '@/lib/jashn/types'
import { cn } from '@/lib/utils'
import { db, isFirebaseConfigured } from '@/lib/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

function InvitationPublicContent({ slug }: { slug: string }) {
  const { lang, t } = useLang()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { invitations, incrementInvitationView, incrementRsvp, deleteInvitation, showToast } = useJashn()
  const cardRef = useRef<HTMLDivElement>(null)
  const viewIncrementedRef = useRef<string | null>(null)

  const [isMounted, setIsMounted] = useState(false)
  const [activeInvitation, setActiveInvitation] = useState<Invitation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [rsvped, setRsvped] = useState(false)
  const [rainActive, setRainActive] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

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
        const docRef = doc(db, 'invitations', slug)
        unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as Invitation
            setActiveInvitation(data)
            
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
      <div className="flex min-h-screen items-center justify-center p-8 text-center bg-slate-950 text-white">
        <Loader2 className="size-10 animate-spin text-amber-400" />
      </div>
    )
  }

  if (!activeInvitation) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-slate-950 text-white space-y-4">
        <h1 className="text-3xl font-extrabold text-amber-400">{t('invitationNotFoundTitle') || 'Invitation Not Found'}</h1>
        <p className="text-sm text-slate-300 max-w-md">{t('invitationNotFoundDesc') || 'This invitation link may have moved or expired.'}</p>
        <Link href="/create-invitation" className="rounded-2xl bg-amber-600 px-6 py-3 font-bold text-white shadow-lg hover:bg-amber-500 transition-all">
          Create Event Invitation
        </Link>
      </div>
    )
  }

  const resolvedTypeId = !activeInvitation.typeId || (activeInvitation.typeId === 'iftaar' && (activeInvitation.groom || activeInvitation.bride)) ? 'nikkah' : activeInvitation.typeId
  const type = getInvitationType(resolvedTypeId)
  const isIslamic = type?.category === 'Religious'
  const waMsg = `You are invited! Check out the digital invitation for ${activeInvitation.title || activeInvitation.groom + ' & ' + activeInvitation.bride}`
  
  // Always share the CLEAN receiver URL without ?mode=sender
  const receiverUrl = `/i/${activeInvitation.slug}`

  // ── 1. SENDER / CREATOR SCREEN (Full Website Layout + Creator Control Panel) ──
  if (isSenderMode) {
    return (
      <div className="py-8 px-4">
        <div className="mx-auto max-w-2xl md:max-w-4xl text-center">
            <ConfettiRain active={rainActive} />

            {/* Creator Control Panel */}
            <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-slate-900 text-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-xl">
              <div>
                <p className="text-base font-extrabold text-white flex items-center gap-2">
                  <Sparkles className="size-5 text-amber-400 animate-pulse" /> You Created This Event Invitation!
                </p>
                <p className="text-xs text-slate-300 mt-1">{t('invitationOwnerControlDesc') || 'You can edit, share, or delete your invitation below.'}</p>
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

            {/* Badges & Views */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
              <span className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-extrabold shadow-sm",
                isIslamic ? "border-emerald-500/40 bg-emerald-900/80 text-emerald-300" : "border-amber-500/40 bg-amber-950/80 text-amber-300"
              )}>
                <Sparkles className="size-4 text-amber-400" /> Event Invitation Page
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/40 bg-pink-950/80 px-4 py-1.5 text-xs font-extrabold text-pink-300 shadow-sm">
                <Heart className="size-4 text-pink-400 animate-pulse" /> {activeInvitation.rsvpCount + (rsvped ? 1 : 0)} Attending
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-1.5 text-xs font-extrabold text-slate-200 shadow-sm">
                <Eye className="size-4 text-emerald-400" /> {activeInvitation.viewCount ?? 1} views
              </span>
            </div>

            {/* 3D Invitation Card Display */}
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

            {/* RSVP & Location Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={handleRsvp}
                size="lg"
                className="w-full sm:w-auto bg-[#25D366] text-white hover:bg-[#1eb955] font-bold text-base px-8 rounded-xl shadow-lg"
              >
                {rsvped ? <CheckCircle2 className="mr-2 size-5" /> : <MessageCircle className="mr-2 size-5" />}
                {rsvped ? 'RSVP Confirmed!' : 'Confirm RSVP via WhatsApp'}
              </Button>

              {activeInvitation.mapsLink && (
                <a
                  href={activeInvitation.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors shadow-sm"
                >
                  <MapPin className="size-4 text-primary" /> Get Location on Google Maps
                </a>
              )}
            </div>

            {/* Share & QR Code Panel */}
            <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col items-center gap-6 text-left">
              <div className="w-full text-center sm:text-left">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Share Receiver Link With Guests
                </h3>
                <ShareBar url={receiverUrl} waMessage={waMsg} captureRef={cardRef} fileName={`cardzy-online-${activeInvitation.slug}`} />
              </div>

              <div className="w-full pt-4 border-t border-border flex flex-col items-center text-center space-y-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Receiver Shareable QR Code
                </span>
                <CardQrCode slug={slug} cardType="i" size={160} showDownloadBtn={true} />
              </div>
            </div>

            {/* CTA Banner */}
            <div className="mt-8 rounded-2xl p-6 text-center border border-border bg-card shadow-sm">
              <p className="text-base font-bold mb-1 text-foreground">{t('createDigitalCardCTA') || 'Create Another Event Invitation'}</p>
              <Link
                href="/create-invitation"
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
              >
                {t('buildInvitation') || 'Create Invitation'} <Sparkles className="size-4" />
              </Link>
            </div>
          </div>
        </div>
    )
  }

  // ── 2. RECEIVER SCREEN (Clean 100dvh Full-Screen Viewport + Cardzy Make Your Own) ──
  return (
    <div className="flex min-h-[100dvh] flex-col justify-between items-center relative overflow-hidden px-4 py-4 sm:py-6 w-full select-none">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[32rem] rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 size-[32rem] rounded-full bg-emerald-500/10 blur-[120px]" />

      {/* Celebration Effects Rain */}
      <ConfettiRain active={rainActive} />

      {/* Receiver Screen Top Minimal Bar */}
      <header className="w-full max-w-2xl flex items-center justify-between z-20 py-2 px-4 rounded-full bg-slate-900/50 backdrop-blur-xl border border-white/10 text-white shadow-xl">
        <Link href="/" className="flex items-center gap-2 group">
          <CardzyLogo className="size-7 transition-transform group-hover:scale-105" />
          <span className="text-sm font-extrabold tracking-tight bg-gradient-to-r from-amber-400 via-yellow-200 to-emerald-300 bg-clip-text text-transparent">
            Cardzy Invitations
          </span>
        </Link>

        <Link
          href="/create-invitation"
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white px-4 py-1.5 text-xs font-extrabold shadow-md transition-all hover:scale-105"
        >
          <Sparkles className="size-3 text-amber-200 animate-pulse" />
          <span>Cardzy · Make Your Own</span>
        </Link>
      </header>

      {/* Receiver Screen Main Centered 3D Card Display */}
      <main className="w-full max-w-4xl flex-1 flex flex-col items-center justify-center my-auto py-6 sm:py-10 z-10">
        <div className="w-full flex justify-center">
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

        {/* Action Buttons Right Below Card */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md px-2">
          <Button
            onClick={handleRsvp}
            size="lg"
            className="w-full bg-[#25D366] text-white hover:bg-[#1eb955] font-extrabold text-sm py-3 px-6 rounded-2xl shadow-xl hover:scale-[1.02] transition-all"
          >
            {rsvped ? <CheckCircle2 className="mr-2 size-5" /> : <MessageCircle className="mr-2 size-5" />}
            {rsvped ? 'RSVP Confirmed!' : 'RSVP via WhatsApp'}
          </Button>

          {activeInvitation.mapsLink && (
            <a
              href={activeInvitation.mapsLink}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 text-white py-3 px-6 text-sm font-bold shadow-lg transition-all"
            >
              <MapPin className="size-4 text-amber-400" />
              <span>Google Maps</span>
            </a>
          )}
        </div>
      </main>

      {/* Receiver Screen Footer Control */}
      <footer className="w-full max-w-md flex flex-col items-center gap-3 z-20 pb-2 text-center">
        <button
          onClick={() => setShowShareModal((o) => !o)}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-slate-900/70 hover:bg-slate-800 text-white font-extrabold py-2 px-5 text-xs shadow-lg transition-all"
        >
          <Share2 className="size-3.5 text-amber-400" />
          <span>Share Invitation</span>
        </button>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 max-w-sm w-full space-y-5 text-white relative shadow-2xl">
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
              >
                <X className="size-5" />
              </button>

              <div className="text-center space-y-1">
                <h3 className="font-extrabold text-lg text-amber-300">Share Invitation</h3>
                <p className="text-xs text-slate-400">Send link or scan QR code</p>
              </div>

              <ShareBar url={receiverUrl} waMessage={waMsg} captureRef={cardRef} fileName={`cardzy-online-${activeInvitation.slug}`} />

              <div className="pt-3 border-t border-white/10 flex flex-col items-center space-y-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Invitation QR Code</span>
                <CardQrCode slug={slug} cardType="i" size={140} showDownloadBtn={true} />
              </div>
            </div>
          </div>
        )}

        <Link
          href="/create-invitation"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors font-medium"
        >
          <Sparkles className="size-3 text-amber-400" />
          <span>Cardzy · Make Your Own</span>
        </Link>
      </footer>
    </div>
  )
}

export default function InvitationPublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  return (
    <div className="flex min-h-[100dvh] flex-col bg-gradient-to-b from-slate-950 via-emerald-950/40 to-slate-950 text-white">
      <Suspense fallback={
        <div className="flex min-h-[100dvh] items-center justify-center bg-slate-950">
          <Loader2 className="size-10 animate-spin text-amber-400" />
        </div>
      }>
        <InvitationPublicContent slug={slug} />
      </Suspense>
    </div>
  )
}
