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
import { Sparkles, MapPin, CheckCircle2, MessageCircle, Heart, Loader2, Edit3, Trash2, Eye, Share2, X, ExternalLink, Camera, Maximize2, Smartphone, Copy, Check, Send, QrCode, Download, Video } from 'lucide-react'
import { downloadCardPng, downloadCardVideo } from '@/lib/jashn/card-media-export'
import { InvitationCard } from '@/components/jashn/invitation-card'
import { ThreeDCardWrapper } from '@/components/jashn/three-d-card-wrapper'
import { ConfettiRain } from '@/components/jashn/confetti-rain'
import { ShareBar } from '@/components/jashn/share-bar'
import { CardQrCode } from '@/components/jashn/qr-code'
import { CardzyLogo } from '@/components/ui/logo'
import { CardShareModal } from '@/components/dashboard/card-share-modal'
import { CardGuestbookModal } from '@/components/jashn/card-guestbook-modal'
import { CardLiveReactions } from '@/components/jashn/card-reactions'
import { ZoomableImageBadge } from '@/components/ui/image-lightbox'
import { Button } from '@/components/ui/button'
import { useJashn } from '@/lib/jashn/store'
import { useLang } from '@/lib/lang/context'
import { decodeShortInvitation } from '@/lib/jashn/codec'
import { recordCardShare } from '@/lib/jashn/magic-service'
import { getInvitationType } from '@/lib/jashn/invitations'
import type { Invitation } from '@/lib/jashn/types'
import { cn } from '@/lib/utils'
import { db, getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { shouldIncrementView, isSenderOrOwner, recordCardView, getCardViews } from '@/lib/jashn/view-tracker'
import { isCardExpired } from '@/lib/jashn/plan-limits'

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
  const [showShareModal, setShowShareModal] = useState(false)
  const [showGuestbookModal, setShowGuestbookModal] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [isDownloadingPng, setIsDownloadingPng] = useState(false)
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const [downloadingQr, setDownloadingQr] = useState(false)

  // Sender/Creator mode: active if explicitly requested via ?mode=sender or ?role=sender, or if viewer is verified creator/owner
  const isSenderMode =
    searchParams.get('mode') === 'sender' ||
    searchParams.get('role') === 'sender'

  const isSender = isSenderMode || (activeInvitation ? isSenderOrOwner(activeInvitation.slug, activeInvitation.creatorId, searchParams, user?.uid, user?.email) : false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    setIsLoading(true)
    let unsubscribe: (() => void) | null = null

    function fallbackToLocalAndUrl() {
      const existing = invitations.find((i) => i.slug === slug)
      if (existing) {
        setActiveInvitation(existing)
        if (viewIncrementedRef.current !== slug) {
          viewIncrementedRef.current = slug
          // Only increment view count if viewer is receiver (not sender/creator)
          if (shouldIncrementView(slug, 'invite', existing.creatorId, searchParams, user?.uid, user?.email)) {
            incrementInvitationView(slug)
            recordCardView('invite', slug, existing.creatorId, searchParams, user?.uid, user?.email)
            setActiveInvitation((prev) => (prev ? { ...prev, viewCount: getCardViews(prev) + 1 } : null))
          }
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

    const activeDb = getFirebaseDb() || db
    if (isFirebaseConfigured && activeDb) {
      try {
        const docRef = doc(activeDb, 'invitations', slug)
        unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as Invitation
            setActiveInvitation(data)
            
            if (viewIncrementedRef.current !== slug) {
              viewIncrementedRef.current = slug
              // Only increment view count if viewer is receiver (not sender/creator)
              if (shouldIncrementView(slug, 'invite', data.creatorId, searchParams, user?.uid, user?.email)) {
                incrementInvitationView(slug)
                recordCardView('invite', slug, data.creatorId, searchParams, user?.uid, user?.email)
                setActiveInvitation((prev) => (prev ? { ...prev, viewCount: getCardViews(prev) + 1 } : null))
              }
            }
            setIsLoading(false)
          } else {
            fallbackToLocalAndUrl()
          }
        }, (err) => {
          console.warn('Live invitation listener notice:', err)
          fallbackToLocalAndUrl()
        })
      } catch (e) {
        console.error('Failed to load invitation from Firestore:', e)
        fallbackToLocalAndUrl()
      }
    } else {
      fallbackToLocalAndUrl()
    }

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [slug, invitations, searchParams, isMounted, incrementInvitationView, user?.uid])

  function handleRsvp() {
    if (isSender) {
      showToast("👀 Preview Mode: RSVP confirmation is disabled for the card host/sender.", "info")
      return
    }
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

  // ── 30-Day Expiration for Free Invitations ──
  const isExpiredCard = isCardExpired(activeInvitation.createdAt, (activeInvitation as any).plan || (activeInvitation.creatorId === user?.uid ? user?.plan : undefined))
  if (isExpiredCard) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-slate-950 text-white space-y-4">
        <div className="size-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 text-2xl">
          ⏳
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-400">Invitation Link Expired</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
          Free Cardzy invitations remain active for 30 days from creation. To keep your wedding and event invitations online forever with unlimited RSVPs and no watermarks, upgrade to Pro.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link href="/pricing" className="rounded-2xl bg-amber-500 hover:bg-amber-400 px-5 py-2.5 font-bold text-xs text-slate-950 shadow-lg transition-all">
            Upgrade to Pro ($1.99 / Rs 499)
          </Link>
          <Link href="/create-invitation" className="rounded-2xl border border-white/20 bg-white/10 hover:bg-white/15 px-5 py-2.5 font-bold text-xs text-white transition-all">
            Create New Invitation
          </Link>
        </div>
      </div>
    )
  }

  const resolvedTypeId = !activeInvitation.typeId || (activeInvitation.typeId === 'iftaar' && (activeInvitation.groom || activeInvitation.bride)) ? 'nikkah' : activeInvitation.typeId
  const type = getInvitationType(resolvedTypeId)
  const isIslamic = type?.category === 'Religious'
  const waMsg = `You are invited! Check out the digital invitation for ${activeInvitation.title || activeInvitation.groom + ' & ' + activeInvitation.bride}`
  
  // Always share the CLEAN receiver URL without ?mode=sender
  const receiverUrl = `/i/${activeInvitation.slug}`

  // Universal share methods for creator
  const handleDirectCopy = () => {
    recordCardShare('invite', activeInvitation.slug, 'copy')
    const fullReceiverUrl = typeof window !== 'undefined' ? `${window.location.origin}${receiverUrl}` : receiverUrl
    navigator.clipboard?.writeText(fullReceiverUrl)
    setCopiedLink(true)
    showToast(t('linkCopied', 'Clean guest link copied! 📋'), 'success')
    setTimeout(() => setCopiedLink(false), 2200)
  }

  const handleDirectWhatsApp = () => {
    recordCardShare('invite', activeInvitation.slug, 'whatsapp')
    const fullReceiverUrl = typeof window !== 'undefined' ? `${window.location.origin}${receiverUrl}` : receiverUrl
    const eventName = activeInvitation.title || (activeInvitation.groom ? `${activeInvitation.groom} & ${activeInvitation.bride}` : 'Special Event')
    const text = encodeURIComponent(`✨ You are cordially invited to ${eventName}!\nTap to view our interactive digital invitation & RSVP:\n${fullReceiverUrl}`)
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank')
  }

  const handleDownloadPng = async () => {
    if (!cardRef.current) return
    setIsDownloadingPng(true)
    try {
      await downloadCardPng({
        element: cardRef.current,
        fileName: `invitation-${slug}`,
        cardType: 'invite',
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
        fileName: `invitation-${slug}`,
        cardType: 'invite',
        cardSlug: slug,
        audioTrack: activeInvitation.audioTrack,
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
        recordCardShare('invite', activeInvitation.slug, 'app')
        await navigator.share({
          title: activeInvitation.title || 'Digital Invitation',
          text: `✨ You are cordially invited! Tap to view our interactive digital invitation:`,
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
    if (!activeInvitation) return
    setDownloadingQr(true)
    try {
      recordCardShare('invite', activeInvitation.slug, 'qr')
      const fullReceiverUrl = typeof window !== 'undefined' ? `${window.location.origin}${receiverUrl}` : receiverUrl
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&color=09090b&bgcolor=ffffff&data=${encodeURIComponent(fullReceiverUrl)}`
      const response = await fetch(qrUrl)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `invitation-qr-${slug}.png`
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

  // ── 1. SENDER / CREATOR SCREEN (Full Website Layout + Creator Control Panel) ──
  // ── 1. SENDER / CREATOR SCREEN (Clean Responsive Desktop/Mobile Layout, No Repetition) ──
  if (isSenderMode) {
    const fullReceiverUrl = typeof window !== 'undefined' ? `${window.location.origin}${receiverUrl}` : receiverUrl
    const eventName = activeInvitation.title || (activeInvitation.groom ? `${activeInvitation.groom} & ${activeInvitation.bride}` : 'Event Invitation')

    return (
      <div className="pt-2 sm:pt-3 pb-24 sm:pb-8 lg:py-2 px-3 sm:px-5 max-w-7xl mx-auto lg:h-[calc(100dvh-4.25rem)] lg:max-h-[calc(100dvh-4.25rem)] flex flex-col justify-center">
        <ConfettiRain active={rainActive} />

        {/* ── Main Responsive Grid: Invitation Preview (Left on Desktop, Below on Mobile) + Delivery Hub (Top on Mobile, Right on Desktop) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center lg:h-full lg:max-h-full">
          {/* Interactive Guest Preview Column */}
          <div className="order-2 lg:order-1 lg:col-span-8 xl:col-span-8 flex flex-col items-center text-center lg:h-full lg:max-h-full lg:justify-start lg:min-h-0">
            <div className="w-full shrink-0 flex items-center justify-between px-2 mb-1.5 z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Eye className="size-3.5 text-amber-400" /> Interactive Guest View
              </span>
              <Button
                onClick={handleEdit}
                variant="outline"
                size="sm"
                className="h-7 px-2.5 rounded-lg border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                <Edit3 className="size-3" />
                <span>Edit Invitation</span>
              </Button>
            </div>

            <div className="w-full flex-1 min-h-0 pt-10 pb-6 px-1 flex flex-col items-center justify-start lg:max-h-[calc(100dvh-6.5rem)] overflow-y-auto scrollbar-none">
              <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
                <ThreeDCardWrapper
                  eventTitle={activeInvitation.title || `${activeInvitation.groom} & ${activeInvitation.bride}`}
                  occasionIdOrCategory={activeInvitation.typeId}
                  audioTrack={activeInvitation.audioTrack}
                  isIslamic={isIslamic}
                  autoOpen={true}
                  onOpened={() => {
                    setRainActive(true)
                  }}
                >
                  <InvitationCard ref={cardRef} data={activeInvitation} watermark={true} showCountdown={false} />
                </ThreeDCardWrapper>
              </div>

              {/* Attached Event Portraits / Photos */}
              {(activeInvitation.photoUrl || activeInvitation.photoUrl2) && (
                <div className="mt-3 w-full max-w-sm p-2 rounded-xl border border-border bg-card/80 backdrop-blur-md shadow-xs text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Camera className="size-3 text-amber-500" />
                    <span className="text-[10px] font-bold text-foreground">Attached Event Portraits</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    {activeInvitation.photoUrl && (
                      <div className="flex items-center gap-1.5">
                        <ZoomableImageBadge
                          src={activeInvitation.photoUrl}
                          alt="Photo 1"
                          title={activeInvitation.bride ? `${activeInvitation.bride} (Bride / Host)` : `${activeInvitation.title || 'Event'} Photo`}
                          className="size-11 sm:size-12 rounded-lg border border-border shadow-xs hover:scale-105 transition-transform"
                        >
                          <img src={activeInvitation.photoUrl} alt="Photo 1" className="size-full object-cover rounded-lg" />
                        </ZoomableImageBadge>
                        <span className="text-[10px] font-semibold text-muted-foreground truncate max-w-[80px]">
                          {activeInvitation.bride || 'Host 1'}
                        </span>
                      </div>
                    )}
                    {activeInvitation.photoUrl2 && (
                      <div className="flex items-center gap-1.5">
                        <ZoomableImageBadge
                          src={activeInvitation.photoUrl2}
                          alt="Photo 2"
                          title={activeInvitation.groom ? `${activeInvitation.groom} (Groom / Host)` : `${activeInvitation.title || 'Event'} Photo`}
                          className="size-11 sm:size-12 rounded-lg border border-border shadow-xs hover:scale-105 transition-transform"
                        >
                          <img src={activeInvitation.photoUrl2} alt="Photo 2" className="size-full object-cover rounded-lg" />
                        </ZoomableImageBadge>
                        <span className="text-[10px] font-semibold text-muted-foreground truncate max-w-[80px]">
                          {activeInvitation.groom || 'Host 2'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Unified 1-Click Delivery Hub Column (Top on Mobile, Vertically Centered on Desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-4 xl:col-span-4 flex flex-col justify-center lg:h-full lg:max-h-full">
            <div className="rounded-2xl xl:rounded-3xl border-2 border-amber-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white p-3.5 sm:p-4 lg:p-3.5 xl:p-4 shadow-xl space-y-2 lg:space-y-2 xl:space-y-2.5 text-left lg:max-h-[calc(100dvh-5.5rem)] lg:overflow-y-auto scrollbar-none">
              {/* Ready to Deliver celebration highlight */}
              <div className="p-2 lg:p-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-amber-500/20 border border-amber-400/35 shadow-xs flex items-center gap-2">
                <span className="text-xl animate-bounce shrink-0">🎉</span>
                <div className="flex-1 min-w-0 text-left">
                  <span className="text-amber-300 font-extrabold text-xs block leading-tight">Invitation Live & Ready to Deliver!</span>
                  <p className="text-zinc-300 text-[10px] leading-tight truncate mt-0.5">
                    Guests receive an interactive RSVP card with event countdown & details!
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-wider">
                    <Sparkles className="size-2.5 text-amber-400" /> 1-Click Guest Delivery
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-pink-950/80 border border-pink-500/30 px-2 py-0.5 text-[9.5px] font-bold text-pink-300">
                      <Heart className="size-2.5 text-pink-400 animate-pulse" /> {activeInvitation.rsvpCount + (rsvped ? 1 : 0)} RSVPs
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-800/90 border border-white/10 px-2 py-0.5 text-[9.5px] font-bold text-slate-300">
                      <Eye className="size-2.5 text-emerald-400" /> {getCardViews(activeInvitation)} visits
                    </span>
                  </div>
                </div>
                <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                  Send to Guests & Friends
                </h2>
                <p className="text-[10.5px] text-slate-300 mt-0.5">
                  Deliver the clean guest link directly via WhatsApp or copy the private URL.
                </p>
              </div>

              {/* Primary 1-Click WhatsApp Button */}
              <Button
                onClick={handleDirectWhatsApp}
                className="w-full h-10 sm:h-11 rounded-xl bg-[#25D366] hover:bg-[#1eb955] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/25 active:scale-95 transition-all cursor-pointer"
              >
                <MessageCircle className="size-4 shrink-0" />
                <span>Send on WhatsApp</span>
              </Button>

              {/* Clean Guest Link Box */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Clean Guest Link (Private URL)
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
                        ? "bg-amber-500 text-slate-950"
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
                  className="h-8.5 rounded-lg border-amber-500/30 bg-white/5 hover:bg-white/10 text-amber-300 font-bold text-[11px] flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {isDownloadingPng ? (
                    <Loader2 className="size-3 animate-spin text-amber-400" />
                  ) : (
                    <Download className="size-3 text-amber-400" />
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

              {/* Edit Invitation Details */}
              <Button
                onClick={handleEdit}
                variant="outline"
                className="w-full h-8.5 rounded-lg border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-[11px] flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                <Edit3 className="size-3.5" />
                <span>Edit Invitation Details</span>
              </Button>

              {/* Integrated Guest QR Code (Compact Horizontal Row with Download Icon) */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <button
                    type="button"
                    onClick={handleDownloadQr}
                    className="relative group p-1 rounded-xl bg-white shadow-xs shrink-0 cursor-pointer hover:ring-2 hover:ring-amber-400 transition-all text-slate-900"
                    title="Click to Download QR Code (PNG)"
                  >
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=09090b&bgcolor=ffffff&data=${encodeURIComponent(fullReceiverUrl)}`}
                      alt="Guest QR Code"
                      className="size-11 rounded object-contain block"
                    />
                    <span className="absolute inset-0 bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                      <Download className="size-4 text-amber-300" />
                    </span>
                  </button>
                  <div className="min-w-0 text-left">
                    <span className="text-[10.5px] font-bold text-amber-300 uppercase tracking-wider block">
                      Guest QR Code
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
                  className="h-7 px-2.5 rounded-lg border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 text-[10.5px] font-bold shrink-0 flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                  title="Download high-resolution QR code"
                >
                  {downloadingQr ? <Loader2 className="size-3 animate-spin text-amber-300" /> : <Download className="size-3" />}
                  <span>Download</span>
                </Button>
              </div>

              {/* Free vs Pro Link Retention Status */}
              <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1 text-zinc-300">
                  <Sparkles className="size-3 text-amber-400" />
                  <span>Free Invitation · 30-Day Active</span>
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
          <p className="text-sm font-bold mb-1 text-foreground">{t('createDigitalCardCTA') || 'Create Another Event Invitation'}</p>
          <Link
            href="/create-invitation"
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
          >
            {t('buildInvitation') || 'Create Invitation'} <Sparkles className="size-3.5" />
          </Link>
        </div>

        {/* Sticky Mobile Share Bar for Sender Mode */}
        <div className="fixed bottom-0 inset-x-0 z-50 p-3 bg-slate-950/95 backdrop-blur-xl border-t border-amber-500/30 sm:hidden flex items-center justify-between gap-2 shadow-2xl">
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
            cardType="invite"
            recipientName={activeInvitation.groom ? `${activeInvitation.groom} & ${activeInvitation.bride}` : activeInvitation.title}
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
    <div className="flex min-h-[100dvh] flex-col justify-between items-center relative overflow-y-auto px-3 sm:px-6 py-3 sm:py-4 w-full select-none">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[32rem] rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 size-[32rem] rounded-full bg-emerald-500/10 blur-[120px]" />

      {/* Celebration Effects Rain */}
      <ConfettiRain active={rainActive} />

      {/* Receiver Screen Top Minimal Bar */}
      <header className="w-full max-w-4xl flex items-center justify-between z-20 py-2 px-4 rounded-full bg-slate-900/50 backdrop-blur-xl border border-white/10 text-white shadow-xl shrink-0">
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

      {/* Receiver Screen Main Responsive Layout: Side-by-Side on Desktop, Stacked on Mobile */}
      <main className="w-full max-w-7xl flex-1 flex flex-col justify-center items-center my-auto py-3 sm:py-5 z-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center justify-center">
          {/* Left Column: 3D Invitation Card (Prominent & Wide on Desktop, natural aspect ratio) */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col items-center justify-center w-full">
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl flex justify-center">
              <ThreeDCardWrapper
                eventTitle={activeInvitation.title || `${activeInvitation.groom} & ${activeInvitation.bride}`}
                occasionIdOrCategory={activeInvitation.typeId}
                audioTrack={activeInvitation.audioTrack}
                isIslamic={isIslamic}
                onOpened={() => {
                  setRainActive(true)
                }}
              >
                <InvitationCard ref={cardRef} data={activeInvitation} watermark={true} showCountdown={true} />
              </ThreeDCardWrapper>
            </div>
          </div>

          {/* Right Column: Interaction Hub (RSVP, Live Reactions, Wishes Wall, Share) - Sleek & Compact */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col items-center lg:items-stretch justify-center gap-3 w-full max-w-sm mx-auto p-4 sm:p-4.5 rounded-3xl bg-slate-900/75 backdrop-blur-xl border border-white/15 shadow-2xl">
            {/* Event Header Pill */}
            <div className="text-center lg:text-left">
              <span className="text-[10.5px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20 inline-block mb-1">
                {type?.label || 'Special Invitation'}
              </span>
              <h2 className="text-base sm:text-lg font-black text-white leading-tight truncate">
                {activeInvitation.title || `${activeInvitation.groom} & ${activeInvitation.bride}`}
              </h2>
              {activeInvitation.hostNames && (
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  Hosted by {activeInvitation.hostNames}
                </p>
              )}
            </div>

            {/* Host Preview Notice */}
            {isSender && (
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs text-center font-medium">
                👀 <strong>Preview Mode:</strong> You are viewing your invitation as the host. RSVP & reaction counting are disabled.
              </div>
            )}

            {/* Big WhatsApp RSVP Button */}
            <Button
              onClick={handleRsvp}
              size="lg"
              disabled={isSender}
              className={cn(
                "w-full h-12 font-black text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2",
                isSender
                  ? "bg-slate-750 text-slate-400 border border-white/10 cursor-not-allowed opacity-80"
                  : "bg-[#25D366] text-white hover:bg-[#1eb955] hover:scale-[1.02] active:scale-98 cursor-pointer"
              )}
            >
              {isSender ? (
                <>
                  <MessageCircle className="size-5 shrink-0 opacity-50" />
                  <span>RSVP via WhatsApp (Host Preview)</span>
                </>
              ) : rsvped ? (
                <>
                  <CheckCircle2 className="size-5 shrink-0" />
                  <span>RSVP Confirmed!</span>
                </>
              ) : (
                <>
                  <MessageCircle className="size-5 shrink-0" />
                  <span>RSVP via WhatsApp</span>
                </>
              )}
            </Button>

            {/* Interactive Live Emoji Reactions Dock - RIGHT ON SCREEN! */}
            <div className="w-full flex flex-col items-center lg:items-start gap-1.5 pt-1.5 border-t border-white/10">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="size-3.5 text-rose-400" /> Send Live Reaction
              </span>
              <div className="w-full flex justify-center lg:justify-start">
                <CardLiveReactions
                  cardSlug={slug}
                  cardType="invite"
                  isUrdu={lang === 'ur' || lang === 'ar'}
                  theme="dark"
                  disabled={isSender}
                />
              </div>
            </div>

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
                <Share2 className="size-3.5 text-amber-400" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Receiver Screen Footer Control */}
      <footer className="w-full max-w-md flex flex-col items-center gap-2 z-20 pt-1 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] text-center shrink-0">
        <Link
          href="/create-invitation"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors font-medium"
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
            title: activeInvitation.title || type?.label || 'Royal Invitation',
            recipientOrCouple: activeInvitation.groom && activeInvitation.bride ? `${activeInvitation.groom} & ${activeInvitation.bride}` : (activeInvitation.title || 'Special Guest'),
            type: 'invite',
            slug: activeInvitation.slug,
            url: `/i/${activeInvitation.slug}`,
            viewsCount: activeInvitation.viewCount || 0,
            shares: activeInvitation.shares,
            occasion: type?.label || 'Special Celebration',
            date: activeInvitation.date,
            time: activeInvitation.time,
            venue: activeInvitation.venue,
            senderName: activeInvitation.hostNames,
            theme: activeInvitation.themeId,
            photoUrl: activeInvitation.photoUrl,
            waMessage: `✨ You are cordially invited to ${activeInvitation.title || (activeInvitation.groom ? `${activeInvitation.groom} & ${activeInvitation.bride}` : 'our celebration')}!\nTap to view the digital invitation:`,
          }}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {/* Event Card Guestbook / Wishes Wall Modal */}
      <CardGuestbookModal
        cardSlug={activeInvitation.slug}
        cardType="invite"
        recipientName={activeInvitation.groom && activeInvitation.bride ? `${activeInvitation.groom} & ${activeInvitation.bride}` : (activeInvitation.title || 'Host')}
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
