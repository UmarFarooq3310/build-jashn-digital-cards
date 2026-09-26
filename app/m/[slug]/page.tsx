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
} from 'lucide-react'
import { getMagicLink, submitMagicResponse, recordCardShare, getMagicWhatsAppUrl } from '@/lib/jashn/magic-service'
import type { MagicLinkData, MagicThemeId } from '@/lib/jashn/magic-types'
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
import { shouldIncrementView, isSenderOrOwner } from '@/lib/jashn/view-tracker'
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

  // Sender preview: ONLY true if explicitly requested via query params (?mode=sender, ?preview=true, ?role=sender)
  // When copying clean link (/m/slug), both sender and receiver see the authentic receiver experience
  const isSenderMode =
    searchParams.get('mode') === 'sender' ||
    searchParams.get('preview') === 'true' ||
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
    // Determine if viewer is sender, owner, or in preview mode
    const isSender = isSenderMode || isSenderOrOwner(slug, null, searchParams, user?.uid)

    if (isFirebaseConfigured && activeDb) {
      try {
        const docRef = doc(activeDb, 'magic_links', slug)
        unsubscribe = onSnapshot(
          docRef,
          (docSnap) => {
            if (docSnap.exists()) {
              const linkData = { id: docSnap.id, ...(docSnap.data() as MagicLinkData) }
              setData(linkData)
              setLoading(false)

              // ONLY genuine receiver increments view (never sender or editor preview)
              if (!isSender && viewIncrementedRef.current !== slug) {
                if (shouldIncrementView(slug, 'magic', linkData.senderId, searchParams, user?.uid)) {
                  viewIncrementedRef.current = slug
                  setData((prev) => (prev ? { ...prev, viewsCount: (prev.viewsCount || 0) + 1 } : null))
                  
                  // Direct Client Firestore Increment (with server fallback if direct write fails)
                  if (activeDb) {
                    setDoc(
                      docRef,
                      { viewsCount: increment(1), lastViewedAt: Date.now() },
                      { merge: true }
                    ).catch(() => {
                      // Fallback to server API only if direct client write fails
                      fetch('/api/card-activity', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ cardType: 'magic', slug, action: 'view' }),
                      }).catch(() => {})
                    })
                  } else {
                    fetch('/api/card-activity', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ cardType: 'magic', slug, action: 'view' }),
                    }).catch(() => {})
                  }
                }
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
        const canCountView = !isSender && viewIncrementedRef.current !== slug && shouldIncrementView(slug, 'magic', null, searchParams, user?.uid)
        if (canCountView) {
          viewIncrementedRef.current = slug
        }
        const result = await getMagicLink(slug, canCountView)
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
  }, [slug, isSenderMode, searchParams, user?.uid, showToast])

  const triggerConfetti = () => {
    setConfettiActive(true)
    setTimeout(() => setConfettiActive(false), 4000)
  }

  const handleSendLove = async () => {
    if (loveSent || !data) return
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
  const [copiedLink, setCopiedLink] = useState(false)
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
          setShowShareModal(true)
        }
      }
    } else {
      setShowShareModal(true)
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

  const themeStyle =
    THEME_STYLES[data.theme] ||
    (data.occasion === 'proposal' ? THEME_STYLES['proposal-crimson'] : THEME_STYLES['emerald-gold']) ||
    THEME_STYLES['romantic-rose']

  const renderScenario = () => {
    const commonProps = {
      data,
      slug,
      soundEnabled,
      audio,
      triggerConfetti,
      onSendLove: handleSendLove,
      loveSent,
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
      default:
        return <BirthdayScenario {...commonProps} />
    }
  }

  // ── 1. SENDER / CREATOR SCREEN (Full Website Layout + Delivery Hero + Sticky Mobile Bar) ──
  if (isSenderMode) {
    return (
      <div className="py-8 px-4 pb-28 sm:pb-12 min-h-screen">
        <div className="mx-auto max-w-2xl md:max-w-4xl text-center">
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

          {/* High-Converting Delivery Hero for Sender */}
          <div className="mb-8 rounded-3xl border-2 border-emerald-500/50 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 text-white p-6 sm:p-8 shadow-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black uppercase tracking-wider">
                <Sparkles className="size-3.5 text-amber-400 animate-pulse" />
                <span>Celebration Ready to Deliver!</span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Send 3D Magic Link to <span className="text-amber-400">{data.recipientName}</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  Your interactive card is live! Deliver it now via WhatsApp, social apps, or copy the direct private link.
                </p>
              </div>

              {/* Instant 1-Click Action Hub */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <Button
                  onClick={handleDirectWhatsApp}
                  className="h-12 rounded-2xl bg-[#25D366] hover:bg-[#1eb955] text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-green-950/50 active:scale-95 transition-all cursor-pointer"
                >
                  <MessageCircle className="size-5 shrink-0" />
                  <span>Send via WhatsApp</span>
                </Button>

                {canNativeShare ? (
                  <Button
                    onClick={handleDirectNativeShare}
                    className="h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
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

              {/* Secondary Creator Options (Preview / Customize Another / Total Views) */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-3 border-t border-white/10 w-full text-xs">
                <Link
                  href={receiverUrl}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition-colors border border-white/10"
                >
                  <ExternalLink className="size-3 text-amber-400" /> View Receiver Screen
                </Link>
                <Link
                  href={`/create-magic-link?occasion=${data.occasion}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition-colors border border-white/10"
                >
                  <Edit3 className="size-3 text-amber-400" /> Customize Another
                </Link>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 ml-2">
                  <Eye className="size-3" /> {data.viewsCount || 0} visits
                </span>
              </div>
            </div>
          </div>

          {/* Badges & Views */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-950/80 px-4 py-1.5 text-xs font-extrabold text-amber-300 shadow-sm">
              <Sparkles className="size-4 text-amber-400" /> 3D Magic Link Capsule
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/40 bg-purple-950/80 px-4 py-1.5 text-xs font-extrabold text-purple-300 shadow-sm">
              <Heart className="size-4 text-pink-400" /> For {data.recipientName}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-1.5 text-xs font-extrabold text-slate-200 shadow-sm">
              <Eye className="size-4 text-emerald-400" /> {data.viewsCount || 0} views
            </span>
          </div>

          {/* 3D Magic Card Display */}
          <div className="my-4 flex justify-center w-full">
            {renderScenario()}
          </div>

          {/* Share & QR Code Panel */}
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col items-center gap-6 text-left">
            <div className="w-full text-center sm:text-left">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Share Receiver Link With Loved Ones
              </h3>
              <ShareBar
                url={receiverUrl}
                waMessage={`Hey ${data.recipientName}! ✨ I created an interactive surprise for you on Cardzy:`}
                fileName={`cardzy-magic-${slug}`}
              />
            </div>

            <div className="w-full pt-4 border-t border-border flex flex-col items-center text-center space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Receiver Shareable QR Code
              </span>
              <CardQrCode slug={slug} cardType="m" size={160} showDownloadBtn={true} />
            </div>
          </div>

          {/* CTA Banner */}
          <div className="mt-8 rounded-2xl p-6 text-center border border-border bg-card shadow-sm">
            <p className="text-base font-bold mb-1 text-foreground">Create Another 3D Animated Magic Link</p>
            <Link
              href="/create-magic-link"
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
            >
              Create Magic Link <Sparkles className="size-4" />
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

        {/* Floating Action Pill for SENDER */}
        <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 flex items-center gap-1.5">
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-amber-300 hover:text-amber-200 text-xs font-bold shadow-xl shadow-black/50 border border-amber-400/30 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
            title="Share Celebration"
          >
            <Share2 className="size-3.5 text-amber-400" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button
            onClick={() => setShowGuestbookModal(true)}
            className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 hover:from-purple-600 hover:to-indigo-600 text-white text-xs font-bold shadow-2xl shadow-purple-950/70 border border-purple-400/40 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
            title="Wishes Wall"
          >
            <MessageCircle className="size-3.5 text-purple-200" />
            <span>💬 Wishes Wall</span>
          </button>
        </div>

        {/* Universal Share & Image Modal */}
        <CardShareModal
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

          <button
            onClick={() => setShowShareModal(true)}
            className="size-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-amber-300 transition-all cursor-pointer shadow-md"
            title="Share Card"
          >
            <Share2 className="size-3.5" />
          </button>
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
          title="Share Celebration · QR Code · Download PNG"
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
