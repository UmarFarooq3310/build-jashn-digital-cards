'use client'

import React, { useState, useEffect, useRef, use, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Volume2,
  VolumeX,
  Share2,
  Copy,
  Check,
  Eye,
  ArrowLeft,
  Sparkles,
  QrCode,
  Loader2,
  ExternalLink,
  Heart,
  MessageCircle,
  Edit3,
  Download,
} from 'lucide-react'
import { getMagicLink, submitMagicResponse, recordCardShare, getMagicWhatsAppUrl } from '@/lib/jashn/magic-service'
import type { MagicLinkData, MagicThemeId } from '@/lib/jashn/magic-types'
import { isCardExpired } from '@/lib/jashn/plan-limits'
import { ConfettiRain } from '@/components/jashn/confetti-rain'
import { CardzyLogo } from '@/components/ui/logo'
import { CardShareModal } from '@/components/dashboard/card-share-modal'
import { CardGuestbookModal } from '@/components/jashn/card-guestbook-modal'
import { ShareBar } from '@/components/jashn/share-bar'
import { CardQrCode } from '@/components/jashn/qr-code'
import { Button } from '@/components/ui/button'
import { useJashn } from '@/lib/jashn/store'
import { db, getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase'
import { doc, onSnapshot, setDoc, increment } from 'firebase/firestore'
import { useLang } from '@/lib/lang/context'
import { shouldIncrementView, isSenderOrOwner, recordCardView, getCardViews } from '@/lib/jashn/view-tracker'
import { cn } from '@/lib/utils'

// Specialized Occasion Scenarios
import { BirthdayScenario } from '@/components/magic-scenarios/birthday-scenario'
import { WeddingScenario } from '@/components/magic-scenarios/wedding-scenario'
import { EidScenario } from '@/components/magic-scenarios/eid-scenario'
import { AnniversaryScenario } from '@/components/magic-scenarios/anniversary-scenario'
import { GraduationScenario } from '@/components/magic-scenarios/graduation-scenario'
import { ProposalScenario } from '@/components/magic-scenarios/proposal-scenario'
import { PartyScenario } from '@/components/magic-scenarios/party-scenario'
import { NewbornScenario } from '@/components/magic-scenarios/newborn-scenario'
import { RamadanScenario } from '@/components/magic-scenarios/ramadan-scenario'
import { ApologyScenario } from '@/components/magic-scenarios/apology-scenario'
import { FriendshipScenario } from '@/components/magic-scenarios/friendship-scenario'
import { ThankYouScenario } from '@/components/magic-scenarios/thankyou-scenario'
import { GetWellScenario } from '@/components/magic-scenarios/getwell-scenario'

class MagicAudio {
  private ctx: AudioContext | null = null

  private getContext() {
    if (typeof window === 'undefined') return null
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtx) this.ctx = new AudioCtx()
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    return this.ctx
  }

  playWaxCrack() {
    const ctx = this.getContext()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(280, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15)
    gain.gain.setValueAtTime(0.7, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.15)
  }

  playPop() {
    const ctx = this.getContext()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(750, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.12)
    gain.gain.setValueAtTime(0.9, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.12)
  }

  playBlow() {
    const ctx = this.getContext()
    if (!ctx) return
    const bufferSize = ctx.sampleRate * 0.25
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(600, ctx.currentTime)
    filter.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.25)
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.5, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25)
    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    noise.start()
  }

  playChime() {
    const ctx = this.getContext()
    if (!ctx) return
    const notes = [587.33, 739.99, 880.0, 1174.66]
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      const start = ctx.currentTime + idx * 0.08
      gain.gain.setValueAtTime(0.25, start)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.9)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(start)
      osc.stop(start + 0.9)
    })
  }

  playFanfare() {
    const ctx = this.getContext()
    if (!ctx) return
    const chords = [
      { f: 523.25, t: 0 },
      { f: 659.25, t: 0.1 },
      { f: 783.99, t: 0.2 },
      { f: 1046.5, t: 0.35 },
      { f: 1318.5, t: 0.5 },
    ]
    chords.forEach(({ f, t }) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.value = f
      gain.gain.setValueAtTime(0.22, ctx.currentTime + t)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 1.2)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(ctx.currentTime + t)
      osc.stop(ctx.currentTime + t + 1.2)
    })
  }
}

const audio = new MagicAudio()

const THEME_STYLES: Record<string, { bg: string; glow: string }> = {
  'romantic-rose': { bg: 'from-[#3a0418] via-[#5c0b29] to-[#1e010c]', glow: 'rgba(251, 113, 133, 0.35)' },
  'emerald-gold': { bg: 'from-[#022017] via-[#043324] to-[#01140e]', glow: 'rgba(245, 158, 11, 0.25)' },
  'mughal-gold': { bg: 'from-[#1a1304] via-[#2a1d06] to-[#0d0901]', glow: 'rgba(234, 179, 8, 0.3)' },
  'ruby-velvet': { bg: 'from-[#330410] via-[#52071a] to-[#1a0107]', glow: 'rgba(244, 63, 94, 0.25)' },
  'royal-sapphire': { bg: 'from-[#07132a] via-[#0d214a] to-[#030914]', glow: 'rgba(56, 189, 248, 0.25)' },
  'midnight-stars': { bg: 'from-[#0b0817] via-[#1a1236] to-[#04020a]', glow: 'rgba(192, 132, 252, 0.25)' },
  'proposal-crimson': { bg: 'from-[#3b0312] via-[#24010a] to-[#0d0004]', glow: 'rgba(244, 63, 94, 0.35)' },
  'proposal-rose': { bg: 'from-[#2a0818] via-[#1a040f] to-[#0d0107]', glow: 'rgba(251, 113, 133, 0.35)' },
  'proposal-amethyst': { bg: 'from-[#1f0933] via-[#120421] to-[#08010f]', glow: 'rgba(192, 132, 252, 0.3)' },
  'proposal-emerald': { bg: 'from-[#04241a] via-[#021711] to-[#010a07]', glow: 'rgba(52, 211, 153, 0.3)' },
  'proposal-champagne': { bg: 'from-[#2b2108] via-[#1a1403] to-[#0b0801]', glow: 'rgba(251, 191, 36, 0.35)' },
  'proposal-noir': { bg: 'from-[#141414] via-[#0a0a0a] to-[#000000]', glow: 'rgba(248, 250, 252, 0.2)' },
}

function MagicLinkInner({ slug }: { slug: string }) {
  const searchParams = useSearchParams()
  const { user, showToast } = useJashn()
  const { t } = useLang()

  const [data, setData] = useState<MagicLinkData | null>(null)
  const [loading, setLoading] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [confettiActive, setConfettiActive] = useState(false)
  const [heartFountain, setHeartFountain] = useState<number[]>([])
  const [loveSent, setLoveSent] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showGuestbookModal, setShowGuestbookModal] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [downloadingQr, setDownloadingQr] = useState(false)
  const viewIncrementedRef = useRef<string | null>(null)
  // --- Holographic 3D Tilt Effect ---
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    
    // For touch events, grab the first touch point
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const x = clientX - rect.left
    const y = clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Max rotation in degrees
    const maxTilt = 12
    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    // Glare position (percentage)
    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100

    setTilt({ x: rotateX, y: rotateY, glareX, glareY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 })
  }

  // Sender/Creator mode: ONLY active if explicitly requested via ?mode=sender or ?role=sender
  // When visiting clean card URL (/m/slug), always show the full receiver experience (clean full view, top bar, wishes wall, no delivery box)
  const isSenderMode =
    searchParams.get('mode') === 'sender' ||
    searchParams.get('role') === 'sender'

  useEffect(() => {
    return () => {
      import('@/lib/jashn/magic-audio').then((mod) => {
        if (mod && mod.magicAudio) {
          mod.magicAudio.stopMelody()
        }
      }).catch(() => {})
    }
  }, [])

  useEffect(() => {
    if (!slug) return
    let unsubscribe: (() => void) | undefined

    const activeDb = getFirebaseDb() || db
    const isSender = isSenderMode || isSenderOrOwner(slug, null, searchParams, user?.uid, user?.email)

    if (isFirebaseConfigured && activeDb) {
      try {
        const docRef = doc(activeDb, 'magic_links', slug)
        unsubscribe = onSnapshot(
          docRef,
          (docSnap) => {
            if (docSnap.exists()) {
              const linkData = { id: docSnap.id, ...(docSnap.data() as MagicLinkData) }
              linkData.viewsCount = getCardViews(linkData)
              setData(linkData)
              setLoading(false)

              const isOwnerOrSender = isSenderMode || isSenderOrOwner(slug, linkData.senderId || linkData.creatorId, searchParams, user?.uid, user?.email)

              // ONLY genuine receiver increments view (never sender, admin, or editor preview)
              if (!isOwnerOrSender && viewIncrementedRef.current !== slug) {
                viewIncrementedRef.current = slug
                recordCardView('magic', slug, linkData.senderId || linkData.creatorId, searchParams, user?.uid, user?.email).then((counted) => {
                  if (counted) {
                    setData((prev) => (prev ? { ...prev, viewsCount: getCardViews(prev) + 1 } : null))
                  }
                })
              }
            } else {
              fallbackLocal()
            }
          },
          (err) => {
            console.warn('Firestore snapshot notice, checking local:', err)
            fallbackLocal()
          }
        )
      } catch (e) {
        fallbackLocal()
      }
    } else {
      fallbackLocal()
    }

    async function fallbackLocal() {
      try {
        const canCountView = !isSender && viewIncrementedRef.current !== slug && shouldIncrementView(slug, 'magic', null, searchParams, user?.uid, user?.email)
        if (canCountView) {
          viewIncrementedRef.current = slug
          recordCardView('magic', slug, null, searchParams, user?.uid, user?.email).catch(() => {})
        }
        const result = await getMagicLink(slug, false)
        if (result) {
          result.viewsCount = getCardViews(result) + (canCountView ? 1 : 0)
        }
        setData(result)
      } catch (err) {
        console.error('Error loading magic link:', err)
        showToast('Could not load magic celebration', 'error')
      } finally {
        setLoading(false)
      }
    }

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [slug, isSenderMode, searchParams, user?.uid, user?.email, showToast])

  const triggerConfetti = () => {
    setConfettiActive(true)
    setTimeout(() => setConfettiActive(false), 4000)
  }

  const handleSendLove = async () => {
    if (loveSent || !data) return
    const isSender = isSenderMode || isSenderOrOwner(slug, data.senderId || (data as any)?.creatorId, searchParams, user?.uid, user?.email)
    if (isSender) {
      showToast('Sender Preview: Response submission disabled in preview mode.', 'info')
      if (soundEnabled) audio.playFanfare()
      triggerConfetti()
      setHeartFountain(Array.from({ length: 16 }, (_, i) => i))
      setTimeout(() => setHeartFountain([]), 3500)
      return
    }

    if (soundEnabled) audio.playFanfare()
    triggerConfetti()
    setLoveSent(true)

    setHeartFountain(Array.from({ length: 16 }, (_, i) => i))
    setTimeout(() => setHeartFountain([]), 3500)
    showToast('❤️ Love and blessings sent!', 'success')

    try {
      await submitMagicResponse({
        linkId: slug,
        recipientName: data.recipientName,
        type: 'reaction',
        reaction: '❤️ Sent Love & Prayers',
      })
    } catch {
      // Offline or network error
    }

    // Direct WhatsApp send to the creator
    const waUrl = getMagicWhatsAppUrl(data, '❤️ Sent Love & Prayers!')
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank')
    }
  }

  const receiverUrl = typeof window !== 'undefined' ? `${window.location.origin}/m/${slug}` : ''
  const canNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  const waMsg = `Hey ${data?.recipientName || ''}! ✨ I created an interactive celebration surprise for you on Cardzy: ${receiverUrl}`

  const handleDirectWhatsApp = async () => {
    recordCardShare('magic', slug, 'whatsapp').catch(() => {})
    const text = encodeURIComponent(waMsg)
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank')
  }

  const handleDirectNativeShare = async () => {
    if (canNativeShare) {
      try {
        await navigator.share({
          title: `${data?.recipientName || ''} - 3D Magic Celebration`,
          text: `Hey ${data?.recipientName || ''}! ✨ I created an interactive surprise for you on Cardzy:`,
          url: receiverUrl,
        })
        recordCardShare('magic', slug, 'app').catch(() => {})
        return
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          handleDirectCopy()
        }
      }
    } else {
      handleDirectCopy()
    }
  }

  const handleDirectCopy = () => {
    if (!receiverUrl) return
    navigator.clipboard.writeText(receiverUrl)
    recordCardShare('magic', slug, 'copy').catch(() => {})
    setCopiedLink(true)
    setCopied(true)
    showToast('Receiver link copied to clipboard!', 'success')
    setTimeout(() => {
      setCopiedLink(false)
      setCopied(false)
    }, 2500)
  }

  const handleCopyReceiverLink = handleDirectCopy

  const handleDownloadQr = async () => {
    if (!data) return
    setDownloadingQr(true)
    try {
      recordCardShare('magic', slug, 'qr').catch(() => {})
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&color=09090b&bgcolor=ffffff&data=${encodeURIComponent(receiverUrl)}`
      const response = await fetch(qrUrl)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `magic-qr-${slug}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(blobUrl)
      showToast('QR Code downloaded! 📲', 'success')
    } catch {
      window.open(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(receiverUrl)}`, '_blank')
    } finally {
      setDownloadingQr(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-slate-950 text-white space-y-4">
        <Loader2 className="size-10 animate-spin text-amber-400" />
        <p className="text-xs font-bold uppercase tracking-widest text-amber-300 animate-pulse">
          Opening Bespoke Celebration... ✨
        </p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-slate-950 text-white space-y-4">
        <span className="text-6xl animate-bounce">🪄</span>
        <h1 className="text-3xl font-extrabold text-amber-400">
          {t('magicLinkNotFoundTitle', 'Magic Link Not Found')}
        </h1>
        <p className="text-sm text-slate-300 max-w-md">
          {t('magicLinkNotFoundDesc', 'This celebration magic link may have moved, expired, or is unavailable.')}
        </p>
        <Link
          href="/create-magic-link"
          className="rounded-2xl bg-amber-500 hover:bg-amber-400 px-6 py-3 font-extrabold text-slate-950 shadow-xl transition-all"
        >
          Create a Magic Link 🪄
        </Link>
      </div>
    )
  }

  // ── 30-Day Expiration for Free Magic Links ──
  const isExpiredCard = isCardExpired((data as any).createdAt, (data as any).plan || (data.senderId === user?.uid ? user?.plan : undefined))
  if (isExpiredCard) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-slate-950 text-white space-y-4">
        <div className="size-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 text-2xl">
          ⏳
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-400">Magic Link Expired</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
          Free Cardzy magic links remain active for 30 days from creation. To preserve your celebrations forever, upgrade to a Pro account.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link href="/pricing" className="rounded-2xl bg-amber-500 hover:bg-amber-400 px-5 py-2.5 font-bold text-xs text-slate-950 shadow-lg transition-all">
            Upgrade to Pro ($1.99 / Rs 499)
          </Link>
          <Link href="/create-magic-link" className="rounded-2xl border border-white/20 bg-white/10 hover:bg-white/15 px-5 py-2.5 font-bold text-xs text-white transition-all">
            Create New Link
          </Link>
        </div>
      </div>
    )
  }

  const themeStyle =
    THEME_STYLES[data.theme] ||
    (data.occasion === 'proposal' ? THEME_STYLES['proposal-crimson'] : THEME_STYLES['emerald-gold']) ||
    THEME_STYLES['romantic-rose']

  const renderScenario = () => {
    const isSender = isSenderMode || isSenderOrOwner(slug, data.senderId || (data as any)?.creatorId, searchParams, user?.uid, user?.email)
    const commonProps = {
      data,
      slug,
      soundEnabled,
      audio,
      triggerConfetti,
      onSendLove: handleSendLove,
      loveSent,
      isSenderView: isSender,
    }

    switch (data.occasion) {
      case 'birthday':
        return <BirthdayScenario {...commonProps} />
      case 'wedding':
        return <WeddingScenario {...commonProps} />
      case 'eid':
        return <EidScenario {...commonProps} />
      case 'anniversary':
        return <AnniversaryScenario {...commonProps} />
      case 'graduation':
        return <GraduationScenario {...commonProps} />
      case 'proposal':
        return <ProposalScenario {...commonProps} />
      case 'party':
        return <PartyScenario {...commonProps} />
      case 'newborn':
        return <NewbornScenario {...commonProps} />
      case 'ramadan':
        return <RamadanScenario {...commonProps} />
      case 'apology':
        return <ApologyScenario {...commonProps} />
      case 'friendship':
        return <FriendshipScenario {...commonProps} />
      case 'thankyou':
        return <ThankYouScenario {...commonProps} />
      case 'getwell':
        return <GetWellScenario {...commonProps} />
      case 'newyear':
        return <PartyScenario {...commonProps} />
      case 'umrah':
        return <EidScenario {...commonProps} />
      case 'career':
        return <GraduationScenario {...commonProps} />
      case 'farewell':
        return <FriendshipScenario {...commonProps} />
      case 'housewarming':
        return <PartyScenario {...commonProps} />
      case 'roza-kushai':
        return <RamadanScenario {...commonProps} />
      default:
        return <BirthdayScenario {...commonProps} />
    }
  }

  // ── 1. SENDER / CREATOR SCREEN (Full Website Layout + Delivery Hero + Sticky Mobile Bar) ──
  // ── 1. SENDER / CREATOR SCREEN (Clean Responsive Desktop/Mobile Layout, No Repetition) ──
  if (isSenderMode) {
    const fullReceiverUrl = typeof window !== 'undefined' ? `${window.location.origin}${receiverUrl}` : receiverUrl

    return (
      <div className="pt-2 sm:pt-3 pb-24 sm:pb-8 lg:py-2 px-3 sm:px-5 max-w-7xl mx-auto lg:h-[calc(100dvh-4.25rem)] lg:max-h-[calc(100dvh-4.25rem)] flex flex-col justify-center">
        <ConfettiRain active={confettiActive} />
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float-slow { animation: float 6s ease-in-out infinite; }
          .animate-float-fast { animation: float 3s ease-in-out infinite; }
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.1); }
            50% { box-shadow: 0 0 40px rgba(255,255,255,0.3); }
          }
          .animate-pulse-glow { animation: pulse-glow 3s infinite; }
        `}</style>
        {/* Twinkling Stars Background Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* ── Main Responsive Grid: Magic Scene (Left on Desktop, Below on Mobile) + Delivery Hub (Top on Mobile, Right on Desktop) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center lg:h-full lg:max-h-full">
          {/* Interactive Magic Link Capsule Column */}
          <div className="order-2 lg:order-1 lg:col-span-8 xl:col-span-8 flex flex-col items-center text-center lg:h-full lg:max-h-full lg:justify-start lg:min-h-0">
            <div className="w-full shrink-0 flex items-center justify-between px-2 mb-1.5 z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Eye className="size-3.5 text-purple-400" /> Interactive Receiver Preview
              </span>
              <Link
                href={`/create-magic-link?edit=${slug}`}
                className="h-7 px-2.5 rounded-lg border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                <Edit3 className="size-3" />
                <span>Edit Magic Link</span>
              </Link>
            </div>

            <div ref={cardRef} className="w-full flex-1 min-h-0 pt-4 pb-6 px-1 flex flex-col items-center justify-start lg:max-h-[calc(100dvh-6.5rem)] overflow-y-auto scrollbar-none">
              <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                {renderScenario()}
              </div>
            </div>
          </div>

          {/* Unified 1-Click Delivery Hub Column (Top on Mobile, Vertically Centered on Desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-4 xl:col-span-4 flex flex-col justify-center lg:h-full lg:max-h-full">
            <div className="rounded-2xl xl:rounded-3xl border-2 border-purple-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white p-3.5 sm:p-4 lg:p-3.5 xl:p-4 shadow-xl space-y-2 lg:space-y-2 xl:space-y-2.5 text-left lg:max-h-[calc(100dvh-5.5rem)] lg:overflow-y-auto scrollbar-none">
              {/* Ready to Deliver celebration highlight */}
              <div className="p-2 lg:p-2.5 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/15 to-purple-500/20 border border-purple-400/35 shadow-xs flex items-center gap-2">
                <span className="text-xl animate-bounce shrink-0">🎉</span>
                <div className="flex-1 min-w-0 text-left">
                  <span className="text-purple-300 font-extrabold text-xs block leading-tight">Magic Link Live & Ready to Deliver!</span>
                  <p className="text-zinc-300 text-[10px] leading-tight truncate mt-0.5">
                    Send to <strong>{data.recipientName}</strong> to unbox a 3D celebration capsule!
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-wider">
                    <Sparkles className="size-2.5 text-amber-400" /> 1-Click Delivery Hub
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-800/90 border border-white/10 px-2 py-0.5 text-[9.5px] font-bold text-slate-300">
                    <Eye className="size-2.5 text-emerald-400" /> {getCardViews(data)} visits
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                  Deliver to {data.recipientName}
                </h2>
                <p className="text-[10.5px] text-slate-300 mt-0.5">
                  Send the clean link directly. The receiver unlocks the interactive capsule on arrival.
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
                        ? "bg-purple-500 text-white"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    )}
                  >
                    {copiedLink ? <Check className="size-3" /> : <Copy className="size-3" />}
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </Button>
                </div>
              </div>



              {canNativeShare ? (
                <Button
                  onClick={handleDirectNativeShare}
                  variant="outline"
                  className="w-full h-8 rounded-lg border-white/15 bg-white/5 hover:bg-white/10 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <Share2 className="size-3" />
                  <span>Share via Other Apps</span>
                </Button>
              ) : null}

              {/* Edit Magic Link Details */}
              <Link
                href={`/create-magic-link?edit=${slug}`}
                className="w-full h-8.5 rounded-lg border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-bold text-[11px] flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                <Edit3 className="size-3.5" />
                <span>Edit Magic Link Details</span>
              </Link>

              {/* Integrated Receiver QR Code (Compact Horizontal Row with Download Icon) */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <button
                    type="button"
                    onClick={handleDownloadQr}
                    className="relative group p-1 rounded-xl bg-white shadow-xs shrink-0 cursor-pointer hover:ring-2 hover:ring-purple-400 transition-all text-slate-900"
                    title="Click to Download QR Code (PNG)"
                  >
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=09090b&bgcolor=ffffff&data=${encodeURIComponent(receiverUrl)}`}
                      alt="Receiver QR Code"
                      className="size-11 rounded object-contain block"
                    />
                    <span className="absolute inset-0 bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                      <Download className="size-4 text-purple-300" />
                    </span>
                  </button>
                  <div className="min-w-0 text-left">
                    <span className="text-[10.5px] font-bold text-purple-300 uppercase tracking-wider block">
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
                  className="h-7 px-2.5 rounded-lg border-purple-400/40 bg-purple-400/10 hover:bg-purple-400/20 text-purple-300 text-[10.5px] font-bold shrink-0 flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                  title="Download high-resolution QR code"
                >
                  {downloadingQr ? <Loader2 className="size-3 animate-spin text-purple-300" /> : <Download className="size-3" />}
                  <span>Download</span>
                </Button>
              </div>

              {/* Free vs Pro Link Retention Status */}
              <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1 text-zinc-300">
                  <Sparkles className="size-3 text-amber-400" />
                  <span>Free Celebration · 30-Day Active</span>
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
          <p className="text-sm font-bold mb-1 text-foreground">Create Another 3D Animated Magic Link</p>
          <Link
            href="/create-magic-link"
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
          >
            Create Magic Link <Sparkles className="size-3.5" />
          </Link>
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
          {canNativeShare && (
            <Button
              onClick={handleDirectNativeShare}
              variant="outline"
              className="h-11 px-3.5 rounded-xl border-white/20 bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-1 active:scale-95 transition-all"
            >
              <Share2 className="size-4" />
              <span>Share</span>
            </Button>
          )}
        </div>

        {/* Floating Action Pill for SENDER */}
        <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 flex items-center gap-1.5">
          <button
            onClick={() => setShowGuestbookModal(true)}
            className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 hover:from-purple-600 hover:to-indigo-600 text-white text-xs font-bold shadow-2xl shadow-purple-950/70 border border-purple-400/40 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
            title="Wishes Wall"
          >
            <MessageCircle className="size-3.5 text-purple-200" />
            <span>💬 Wishes Wall</span>
          </button>
        </div>

        {/* Event Card Guestbook & Wishes Wall Modal */}
        <CardGuestbookModal
          cardSlug={slug}
          cardType="magic"
          recipientName={data.recipientName}
          isOpen={showGuestbookModal}
          onClose={() => setShowGuestbookModal(false)}
          onWishSubmitted={() => {
            setConfettiActive(true)
            setTimeout(() => setConfettiActive(false), 4000)
          }}
        />
      </div>
    )
  }

  // ── 2. RECEIVER SCREEN (Clean 100dvh Full-Screen Viewport + Cardzy Make Your Own) ──
  return (
    <div
      className={`h-screen max-h-screen sm:h-dvh sm:max-h-dvh w-full overflow-hidden bg-gradient-to-b ${themeStyle.bg} text-white flex flex-col items-center justify-between p-1 sm:p-3 relative font-sans select-none`}
    >
      <ConfettiRain active={confettiActive} />
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-slow { animation: float 6s ease-in-out infinite; }
        .animate-float-fast { animation: float 3s ease-in-out infinite; }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.1); }
          50% { box-shadow: 0 0 40px rgba(255,255,255,0.3); }
        }
        .animate-pulse-glow { animation: pulse-glow 3s infinite; }
      `}</style>
      {/* Twinkling Stars Background Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Ambient Glowing Orbs */}
      <div
        className="absolute top-12 left-6 size-80 rounded-full blur-[130px] pointer-events-none"
        style={{ backgroundColor: themeStyle.glow }}
      />
      <div
        className="absolute bottom-12 right-6 size-80 rounded-full blur-[130px] pointer-events-none"
        style={{ backgroundColor: themeStyle.glow }}
      />

      {/* Heart Fountain Particles */}
      {heartFountain.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50 flex justify-center items-end overflow-hidden">
          {heartFountain.map((_, i) => (
            <span
              key={i}
              className="text-3xl animate-bounce absolute"
              style={{
                left: `${10 + (i % 9) * 10}%`,
                bottom: `${(i * 30) % 280}px`,
                animationDuration: `${1 + (i % 4) * 0.3}s`,
                opacity: 0.9,
              }}
            >
              {data.occasion === 'eid' ? '🌙' : data.occasion === 'wedding' ? '🌸' : '❤️'}
            </span>
          ))}
        </div>
      )}

      {/* Receiver Screen Top Minimal Bar */}
      <header className="w-full max-w-xl flex items-center justify-between z-20 py-1.5 px-4 rounded-full bg-slate-900/50 backdrop-blur-xl border border-white/10 text-white shadow-xl">
        <Link href="/" className="flex items-center gap-2 group">
          <CardzyLogo className="size-6 transition-transform group-hover:scale-105" />
          <span className="text-xs font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">
            Cardzy Jashn
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/create-magic-link"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white px-3 py-1 text-xs font-bold shadow-md transition-all hover:scale-105"
          >
            <Sparkles className="size-3 text-amber-200 animate-pulse" />
            <span>Cardzy · Make Your Own</span>
          </Link>
        </div>
      </header>

      {/* Bespoke Occasion Experience Container (Always Centered & Zero Scroll) */}
      {/* Bespoke Occasion Experience Container (Interactive 3D Holographic Card) */}
          <main className="w-full max-w-2xl z-10 flex flex-col items-center justify-center my-auto animate-float-slow">
        {renderScenario()}
      </main>

      {/* Luxury Floating Glass Capsule: Share & Wishes Wall - VISIBLE TO BOTH SENDER & RECEIVER */}
      <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 flex items-center gap-1.5">
        <button
          onClick={() => setShowShareModal(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-amber-300 hover:text-amber-200 text-xs font-bold shadow-xl shadow-black/50 border border-amber-400/30 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
          title="Share Celebration · QR Code"
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

      {/* Universal Share & Image Modal */}
      <CardShareModal
        simpleMode={true}
        card={
          showShareModal
            ? {
                title: `${data.occasion.toUpperCase()} Magic Link`,
                recipientOrCouple: data.recipientName,
                type: 'magic',
                slug: slug,
                url: `/m/${slug}`,
                viewsCount: data.viewsCount,
                shares: data.shares,
                occasion: `${data.occasion.toUpperCase()} Magic Celebration`,
                message: data.wishContent?.secretLetter || data.inviteContent?.eventTitle,
                date: data.inviteContent?.eventDate,
                time: data.inviteContent?.eventTime,
                venue: data.inviteContent?.venueName,
                senderName: data.senderName,
                theme: data.theme,
                waMessage: `Hey ${data.recipientName}! ✨ I created an interactive surprise for you on Cardzy:`,
              }
            : null
        }
        onClose={() => setShowShareModal(false)}
      />

      {/* Event Card Guestbook & Wishes Wall Modal */}
      <CardGuestbookModal
        cardSlug={slug}
        cardType="magic"
        recipientName={data.recipientName}
        isOpen={showGuestbookModal}
        onClose={() => setShowGuestbookModal(false)}
        onWishSubmitted={() => {
          setConfettiActive(true)
          setTimeout(() => setConfettiActive(false), 4000)
        }}
      />
    </div>
  )
}

export default function MagicLinkPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-slate-950 text-white space-y-4">
          <Loader2 className="size-10 animate-spin text-amber-400" />
          <p className="text-xs font-bold uppercase tracking-widest text-amber-300 animate-pulse">
            Loading Magic Celebration... ✨
          </p>
        </div>
      }
    >
      <MagicLinkInner slug={resolvedParams.slug} />
    </Suspense>
  )
}
