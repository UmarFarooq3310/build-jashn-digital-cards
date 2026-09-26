'use client'
import { TypewriterLetter } from "@/components/magic-scenarios/typewriter-letter";

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  Heart,
  Crown,
  Calendar,
  Clock,
  MapPin,
  Check,
  ArrowRight,
  ArrowLeft,
  Volume2,
  ExternalLink,
  MessageCircle,
} from 'lucide-react'
import type { MagicLinkData } from '@/lib/jashn/magic-types'
import { submitMagicResponse, normalizeWhatsAppNumber } from '@/lib/jashn/magic-service'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'
import { magicAudio } from '@/lib/jashn/magic-audio'

interface ScenarioProps {
  data: MagicLinkData
  slug: string
  soundEnabled: boolean
  audio: any
  triggerConfetti: () => void
  onSendLove: () => void
  loveSent: boolean
}

const WEDDING_SCENES = [
  { id: 0, label: 'Gates', icon: '🏛️' },
  { id: 1, label: 'Schedule', icon: '📅' },
  { id: 2, label: 'Farmaan', icon: '📜' },
  { id: 3, label: 'RSVP', icon: '💌' },
]

export function WeddingScenario({
  data,
  slug,
  soundEnabled,
  triggerConfetti,
  onSendLove,
  loveSent,
}: ScenarioProps) {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const [activeScene, setActiveScene] = useState<number>(0)
  const [unlockedScenes, setUnlockedScenes] = useState<number[]>([0])
  const [musicPlaying, setMusicPlaying] = useState<boolean>(false)

  // Scene 0: Palace Gates
  const [gatesOpen, setGatesOpen] = useState(false)

  // Scene 3: RSVP
  const [attending, setAttending] = useState<boolean | null>(true)
  const [guestsCount, setGuestsCount] = useState<number>(1)
  const [rsvpSent, setRsvpSent] = useState(false)
  const [particles, setParticles] = useState<{ id: number; emoji: string; left: number; duration: number }[]>([])

  const couple = data.inviteContent?.coupleNames || `${data.recipientName} & Partner`

  const spawnBurst = (emojis: string[], count = 12) => {
    const newItems = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 96,
      duration: 2.2 + Math.random() * 2.2,
    }))
    setParticles((prev) => [...prev, ...newItems])
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newItems.some((n) => n.id === p.id)))
    }, 4500)
  }

  const handleToggleMusic = () => {
    const isNowPlaying = magicAudio.toggleMelody('wedding')
    setMusicPlaying(isNowPlaying)
  }

  const unlockScene = (sceneIdx: number) => {
    setUnlockedScenes((prev) => (prev.includes(sceneIdx) ? prev : [...prev, sceneIdx]))
  }

  const goToScene = (sceneIdx: number) => {
    setUnlockedScenes((prev) => (prev.includes(sceneIdx) ? prev : [...prev, sceneIdx]))
    setActiveScene(sceneIdx)
    try {
      magicAudio.playSparkle()
    } catch {}
  }

  // Handle Opening Royal Gates
  const handleOpenGates = () => {
    if (gatesOpen) return
    magicAudio.playWaxCrack()
    setGatesOpen(true)
    spawnBurst(['🌸', '✨', '👑', '🕊️'], 16)
    setTimeout(() => {
      magicAudio.playFanfare()
      triggerConfetti()
      unlockScene(1)
      unlockScene(2)
      unlockScene(3)
      setTimeout(() => goToScene(1), 3000)
    }, 700)
  }

  // Handle Shower Rose Petals
  const handleShowerPetals = () => {
    magicAudio.playChime()
    spawnBurst(['🌸', '🌹', '✨', '💖'], 18)
    triggerConfetti()
    onSendLove()
  }

  const rawPhone = normalizeWhatsAppNumber(data.wishContent?.whatsappNumber || (data.inviteContent as any)?.whatsappNumber || (data as any)?.whatsappNumber)
  const returnUrl = typeof window !== 'undefined' ? `${window.location.origin}/m/${slug}` : ''
  const rsvpStatus = attending ? `Confirming Attendance (${guestsCount} guest${guestsCount > 1 ? 's' : ''})` : 'Unable to attend with warm regards'
  const getWhatsAppUrl = () => {
    const msg = encodeURIComponent(
      `Wedding RSVP for ${couple}: ${data.recipientName} has responded: ${rsvpStatus} 💍🌸\n\nView invitation: ${returnUrl}`
    )
    return rawPhone
      ? `https://wa.me/${rawPhone}?text=${msg}`
      : `https://api.whatsapp.com/send?text=${msg}`
  }
  const whatsAppHref = getWhatsAppUrl()

  // Handle Submit RSVP
  const handleSubmitRsvp = async () => {
    magicAudio.playFanfare()
    triggerConfetti()
    spawnBurst(['🎉', '🌸', '✨', '💍'], 20)
    setRsvpSent(true)

    try {
      await submitMagicResponse({
        linkId: slug,
        recipientName: data.recipientName,
        type: 'rsvp',
        rsvp: {
          attending: attending ?? true,
          guestsCount,
          guestName: data.recipientName,
        },
      })
    } catch {
      // offline fallback
    }

    // Open WhatsApp so user can return view and send RSVP
    const waUrl = getWhatsAppUrl()
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank')
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center select-none animate-in fade-in duration-300">
      {/* Floating Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="magic-fx text-2xl"
          style={{
            left: `${p.left}vw`,
            '--d': `${p.duration}s`,
          } as any}
        >
          {p.emoji}
        </span>
      ))}

      {/* Screen-Perfect Centered Card */}
      <div
        className="magic-card select-none text-white mx-auto shadow-2xl relative"
        style={{
          '--card-bg': 'rgba(26, 14, 5, 0.88)',
          '--acc': '#f5c451',
          '--glow': '#d97706',
          '--rose': '#b45309',
          '--txt': '#fff8ed',
          '--mut': '#fde68a',
        } as any}
      >
        {/* Top Header Bar: Back to All Magic Cards & Music Toggle */}
        <div className="flex items-center justify-between w-full mb-2">
          <Link
            href="/create-magic-link"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-amber-200 transition-all shadow-sm cursor-pointer"
            title="Back to All Magic Cards"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back</span>
          </Link>

          <button
            type="button"
            onClick={handleToggleMusic}
            className="size-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-amber-300 text-sm transition-all cursor-pointer shadow-sm"
            title={musicPlaying ? 'Mute music' : 'Play synthesized music'}
          >
            {musicPlaying ? '🎵' : '🔇'}
          </button>
        </div>

        {/* Pill Badge */}
        <span className="inline-block text-[10px] tracking-widest font-semibold px-3 py-1 rounded-full border border-amber-400/40 bg-amber-500/15 text-[#f5c451] uppercase mb-1">
          👑 ROYAL MUGHHAL NIKKAH
        </span>

        {/* Recipient Title */}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5c451] my-1 leading-tight">
          {couple}
        </h1>

        {/* Subtitle / Sender */}
        <p className="text-xs text-[#fde68a] mb-2.5">
          Cordially requested by {data.senderName}
        </p>

        {/* Scene Navigation Tabs */}
        <div className="flex gap-1.5 justify-center mb-3 flex-wrap">
          {WEDDING_SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => goToScene(scene.id)}
              disabled={!unlockedScenes.includes(scene.id)}
              className={cn(
                'text-[10.5px] px-2.5 py-0.5 rounded-full border transition-all cursor-pointer',
                activeScene === scene.id
                  ? 'bg-[#f5c451] text-[#241303] font-bold border-[#f5c451] shadow-sm'
                  : unlockedScenes.includes(scene.id)
                  ? 'bg-white/5 border-white/15 text-[#fde68a] hover:bg-white/10'
                  : 'bg-white/5 border-white/10 text-slate-600 cursor-not-allowed opacity-40'
              )}
            >
              {scene.icon} {scene.label}
            </button>
          ))}
        </div>

        {/* ================= SCENE 0: ROYAL GATES ================= */}
        {activeScene === 0 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              The Royal Farmaan
            </h2>
            <p className="text-xs text-[#fde68a] mb-2">
              Tap the golden palace doors to reveal the wedding proclamation
            </p>

            {/* 3D Palace Gates Stage */}
            <div className="magic-stage">
              <div
                onClick={handleOpenGates}
                className={cn('magic-gates relative w-56 h-36 mx-auto cursor-pointer rounded-2xl overflow-hidden border border-amber-400/50 shadow-2xl flex', gatesOpen && 'open')}
              >
                {/* Left Gate */}
                <div className="magic-gate-l w-1/2 h-full bg-gradient-to-r from-[#382006] via-[#5c3509] to-[#261503] border-r border-amber-400/60 p-2 flex flex-col justify-between items-center text-amber-300">
                  <span className="text-lg">⚜️</span>
                  <span className="text-[10px] font-bold tracking-widest uppercase writing-vertical">BARAAT</span>
                  <span className="text-sm">🔑</span>
                </div>
                {/* Right Gate */}
                <div className="magic-gate-r w-1/2 h-full bg-gradient-to-l from-[#382006] via-[#5c3509] to-[#261503] border-l border-amber-400/60 p-2 flex flex-col justify-between items-center text-amber-300">
                  <span className="text-lg">⚜️</span>
                  <span className="text-[10px] font-bold tracking-widest uppercase writing-vertical">WALIMA</span>
                  <span className="text-sm">🔑</span>
                </div>

                {/* Inner Reveal */}
                {gatesOpen && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-3 animate-in fade-in">
                    <span className="text-2xl animate-pulse">👑</span>
                    <span className="text-xs font-serif font-bold text-amber-200 mt-1">
                      Welcome to the Celebrations!
                    </span>
                  </div>
                )}
              </div>
            </div>

            {gatesOpen ? (
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => goToScene(1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#f5c451] hover:bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer transition-transform active:scale-95"
                >
                  <span>View Ceremony Schedule 📅</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-xs text-[#f5c451] animate-pulse my-2">
                ✨ Tap to open royal palace doors ✨
              </div>
            )}
          </div>
        )}

        {/* ================= SCENE 1: SCHEDULE & VENUE TILES ================= */}
        {activeScene === 1 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              Wedding Schedule & Venue
            </h2>
            <p className="text-xs text-[#fde68a] mb-2">
              Save the date and join us in welcoming the newlyweds
            </p>

            <div className="magic-tiles my-2">
              {/* Date */}
              <div className="magic-tile p-2.5 border-amber-400/40 bg-white/5">
                <Calendar className="size-4 text-amber-400 mb-1" />
                <span className="text-[11px] font-bold text-amber-300">Event Date</span>
                <span className="text-xs text-white mt-0.5 font-serif">
                  {data.inviteContent?.eventDate || 'Saturday, 14 Dec'}
                </span>
              </div>

              {/* Time */}
              <div className="magic-tile p-2.5 border-amber-400/40 bg-white/5">
                <Clock className="size-4 text-amber-400 mb-1" />
                <span className="text-[11px] font-bold text-amber-300">Timing</span>
                <span className="text-xs text-white mt-0.5 font-serif">
                  {data.inviteContent?.eventTime || '7:00 PM Sharp'}
                </span>
              </div>

              {/* Venue */}
              <div className="magic-tile p-2.5 border-amber-400/40 bg-white/5">
                <MapPin className="size-4 text-amber-400 mb-1" />
                <span className="text-[11px] font-bold text-amber-300">Venue</span>
                <span className="text-[10.5px] text-white mt-0.5 line-clamp-2">
                  {data.inviteContent?.venueName || 'The Royal Palace Banquet Hall'}
                </span>
              </div>

              {/* Dress Code */}
              <div className="magic-tile p-2.5 border-amber-400/40 bg-white/5">
                <Crown className="size-4 text-amber-400 mb-1" />
                <span className="text-[11px] font-bold text-amber-300">Dress Code</span>
                <span className="text-xs text-white mt-0.5 font-serif">
                  Traditional Formal
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 mt-3">
              <button
                type="button"
                onClick={() => goToScene(0)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all cursor-pointer"
              >
                <ArrowLeft className="size-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => goToScene(2)}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#f5c451] hover:bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <span>Read Farmaan 📜</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= SCENE 2: FARMAAN LETTER ================= */}
        {activeScene === 2 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-[#f5c451] mb-1">
              In the Name of Allah
            </h2>

            <TypewriterLetter
              className="magic-letter text-xs text-amber-100 max-h-52 overflow-y-auto"
              englishText={data.wishContent?.secretLetter || data.inviteContent?.eventTitle || `We joyfully request the pleasure of your presence and warm prayers as our beloved ${couple} embark on this beautiful sacred journey of marriage.`}
              urduText={data.wishContent?.urduGreeting || (data.inviteContent as any)?.urduGreeting}
              signatureText={`— Cordially, ${data.senderName}`}
              photoUrl={data.wishContent?.photoUrl || data.inviteContent?.photoUrl}
              urduClassName="mt-2.5 text-right font-nastaliq text-sm text-amber-200"
              signatureClassName="mt-3 text-right font-serif italic text-amber-300"
            />

            <div className="flex items-center justify-between gap-2 mt-3">
              <button
                type="button"
                onClick={() => goToScene(1)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all cursor-pointer"
              >
                <ArrowLeft className="size-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => goToScene(3)}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#f5c451] hover:bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <span>Confirm RSVP 💌</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= SCENE 3: RSVP & PETAL SHOWER ================= */}
        {activeScene === 3 && (
          <div className="animate-in fade-in duration-300">
            <div className="flex justify-start mb-1">
              <button
                type="button"
                onClick={() => goToScene(2)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all cursor-pointer"
              >
                <ArrowLeft className="size-3.5" />
                <span>Back</span>
              </button>
            </div>
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              Confirm Your Attendance
            </h2>
            <p className="text-xs text-[#fde68a] mb-2">
              Let the host know if you can make it
            </p>

            <div className="p-3 rounded-2xl bg-black/40 border border-amber-400/30 text-left space-y-2.5 my-2">
              {/* Choice: Attending / Regret */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={cn(
                    'flex-1 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer text-center',
                    attending === true
                      ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300 shadow-sm'
                      : 'bg-white/5 border-white/10 text-slate-400'
                  )}
                >
                  Joyfully Accept 🌸
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={cn(
                    'flex-1 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer text-center',
                    attending === false
                      ? 'bg-rose-500/25 border-rose-400 text-rose-300 shadow-sm'
                      : 'bg-white/5 border-white/10 text-slate-400'
                  )}
                >
                  Regretfully Decline
                </button>
              </div>

              {attending && (
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[#fde68a]">Attending Guests:</span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuestsCount(num)}
                        className={cn(
                          'size-6 rounded-lg text-xs font-bold border transition-transform cursor-pointer',
                          guestsCount === num
                            ? 'bg-amber-400 text-slate-950 border-amber-400'
                            : 'bg-white/5 border-white/15 text-white hover:scale-105'
                        )}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions: Rose Petals & Submit */}
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={handleShowerPetals}
                className="py-2.5 px-3 rounded-xl bg-pink-600/30 hover:bg-pink-600/50 border border-pink-400/40 text-pink-200 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-transform active:scale-95"
                title="Shower Rose Petals"
              >
                <span>Shower Roses 🌸</span>
              </button>

              <button
                type="button"
                onClick={handleSubmitRsvp}
                className="flex-1 py-2.5 rounded-xl bg-[#f5c451] hover:bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1 shadow-md cursor-pointer transition-transform active:scale-95"
              >
                <span>{rsvpSent ? 'RSVP Recorded! ✓' : 'Save RSVP'}</span>
              </button>
            </div>

            {/* Direct WhatsApp RSVP Button */}
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noreferrer"
              className="w-full mt-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-transform active:scale-95"
            >
              <span>Send RSVP on WhatsApp 💬</span>
            </a>

            {/* CTA to studio */}
            <Link
              href="/create-magic-link?occasion=wedding"
              className="inline-block text-[10.5px] text-slate-400 hover:text-amber-300 transition-colors mt-2"
            >
              Crafted on Cardzy Jashn • Create your own Magic Link ✨
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
