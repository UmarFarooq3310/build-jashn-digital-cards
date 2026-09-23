'use client'
import { TypewriterLetter } from "@/components/magic-scenarios/typewriter-letter";

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Check,
  ArrowRight,
  ArrowLeft,
  Volume2,
  ExternalLink,
  Music,
} from 'lucide-react'
import type { MagicLinkData } from '@/lib/jashn/magic-types'
import { submitMagicResponse } from '@/lib/jashn/magic-service'
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

const PARTY_SCENES = [
  { id: 0, label: 'Disco', icon: '🪩' },
  { id: 1, label: 'Lineup', icon: '🍹' },
  { id: 2, label: 'Anthem', icon: '📜' },
  { id: 3, label: 'RSVP', icon: '🎉' },
]

export function PartyScenario({
  data,
  slug,
  soundEnabled,
  triggerConfetti,
  onSendLove,
  loveSent,
}: ScenarioProps) {
  const { t } = useLang()

  const [activeScene, setActiveScene] = useState<number>(0)
  const [unlockedScenes, setUnlockedScenes] = useState<number[]>([0])
  const [musicPlaying, setMusicPlaying] = useState<boolean>(false)

  // Scene 0: Disco
  const [discoSpun, setDiscoSpun] = useState<boolean>(false)

  // Scene 3: RSVP
  const [attending, setAttending] = useState<boolean | null>(true)
  const [guestsCount, setGuestsCount] = useState<number>(1)
  const [rsvpSent, setRsvpSent] = useState<boolean>(false)
  const [selectedReaction, setSelectedReaction] = useState<string>('🎉')
  const [particles, setParticles] = useState<{ id: number; emoji: string; left: number; duration: number }[]>([])

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
    const isNowPlaying = magicAudio.toggleMelody('party')
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

  // Handle Disco Ball Tap
  const handleSpinDisco = () => {
    if (discoSpun) return
    magicAudio.playFanfare()
    setDiscoSpun(true)
    spawnBurst(['🪩', '✨', '🎉', '⚡', '🥂'], 22)
    triggerConfetti()
    setTimeout(() => {
      magicAudio.playChime()
      unlockScene(1)
      unlockScene(2)
      unlockScene(3)
      setTimeout(() => goToScene(1), 3000)
    }, 700)
  }

  const rawPhone = (data.wishContent?.whatsappNumber || (data.inviteContent as any)?.whatsappNumber || '')?.replace(/[^0-9]/g, '')
  const returnUrl = typeof window !== 'undefined' ? `${window.location.origin}/m/${slug}` : ''
  const rsvpStatus = attending ? `I am IN! (${guestsCount} person${guestsCount > 1 ? 's' : ''})` : 'Cannot make it this time'
  const getWhatsAppUrl = () => {
    const msg = encodeURIComponent(
      `Party RSVP for ${data.recipientName}: ${rsvpStatus} 🎉🔥\n\nView celebration: ${returnUrl}`
    )
    return rawPhone
      ? `https://wa.me/${rawPhone}?text=${msg}`
      : `https://api.whatsapp.com/send?text=${msg}`
  }
  const whatsAppHref = getWhatsAppUrl()

  // Handle RSVP
  const handleSubmitRsvp = async () => {
    magicAudio.playFanfare()
    triggerConfetti()
    spawnBurst(['🎉', '🔥', '⚡', '🥂'], 20)
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
          '--card-bg': 'rgba(20, 6, 36, 0.88)',
          '--acc': '#f5c451',
          '--glow': '#a855f7',
          '--rose': '#ec4899',
          '--txt': '#faf5ff',
          '--mut': '#e9d5ff',
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
        <span className="inline-block text-[10px] tracking-widest font-semibold px-3 py-1 rounded-full border border-purple-400/40 bg-purple-500/15 text-[#f5c451] uppercase mb-1">
          🎉 VIP CELEBRATION BASH
        </span>

        {/* Recipient Title */}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5c451] my-1 leading-tight">
          Party Time, {data.recipientName}!
        </h1>

        {/* Subtitle / Sender */}
        <p className="text-xs text-[#e9d5ff] mb-2.5">
          Hosted by {data.senderName}
        </p>

        {/* Scene Navigation Tabs */}
        <div className="flex gap-1.5 justify-center mb-3 flex-wrap">
          {PARTY_SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => goToScene(scene.id)}
              disabled={!unlockedScenes.includes(scene.id)}
              className={cn(
                'text-[10.5px] px-2.5 py-0.5 rounded-full border transition-all cursor-pointer',
                activeScene === scene.id
                  ? 'bg-[#f5c451] text-[#1e0730] font-bold border-[#f5c451] shadow-sm'
                  : unlockedScenes.includes(scene.id)
                  ? 'bg-white/5 border-white/15 text-[#e9d5ff] hover:bg-white/10'
                  : 'bg-white/5 border-white/10 text-slate-600 cursor-not-allowed opacity-40'
              )}
            >
              {scene.icon} {scene.label}
            </button>
          ))}
        </div>

        {/* ================= SCENE 0: DISCO BALL ================= */}
        {activeScene === 0 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              Ignite the Dance Floor!
            </h2>
            <p className="text-xs text-[#e9d5ff] mb-2">
              Tap the 3D disco mirror ball to get the party started
            </p>

            <div className="magic-stage">
              <div
                onClick={handleSpinDisco}
                className="relative w-40 h-40 mx-auto flex flex-col items-center justify-center cursor-pointer group select-none"
              >
                <div
                  className={cn(
                    'size-24 rounded-full bg-gradient-to-tr from-slate-300 via-white to-purple-200 border-2 border-amber-300 shadow-[0_0_40px_rgba(168,85,247,0.6)] flex items-center justify-center text-4xl transition-transform duration-500',
                    discoSpun ? 'magic-disco-spin scale-110' : 'group-hover:scale-105 animate-pulse'
                  )}
                >
                  🪩
                </div>
                <span className="text-[11px] font-bold text-amber-300 mt-2 uppercase tracking-wider">
                  {discoSpun ? 'Beats Dropping! ⚡' : 'Tap to Spin Disco'}
                </span>
              </div>
            </div>

            {discoSpun ? (
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => goToScene(1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#f5c451] hover:bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer transition-transform active:scale-95"
                >
                  <span>Check Lineup 🍹</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-xs text-[#f5c451] animate-pulse my-2">
                ✨ Tap the disco ball to enter ✨
              </div>
            )}
          </div>
        )}

        {/* ================= SCENE 1: LINEUP TILES ================= */}
        {activeScene === 1 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-white mb-0.5">
              Party Details & Vibe
            </h2>
            <p className="text-xs text-[#e9d5ff] mb-2">
              Everything you need to know for the night
            </p>

            <div className="magic-tiles my-2">
              <div className="magic-tile p-2.5 border-purple-400/40 bg-white/5">
                <Calendar className="size-4 text-purple-400 mb-1" />
                <span className="text-[11px] font-bold text-amber-300">Date</span>
                <span className="text-xs text-white mt-0.5 font-serif">
                  {data.inviteContent?.eventDate || 'Saturday Night'}
                </span>
              </div>

              <div className="magic-tile p-2.5 border-purple-400/40 bg-white/5">
                <Clock className="size-4 text-purple-400 mb-1" />
                <span className="text-[11px] font-bold text-amber-300">Time</span>
                <span className="text-xs text-white mt-0.5 font-serif">
                  {data.inviteContent?.eventTime || '8:30 PM Onwards'}
                </span>
              </div>

              <div className="magic-tile p-2.5 border-purple-400/40 bg-white/5">
                <MapPin className="size-4 text-purple-400 mb-1" />
                <span className="text-[11px] font-bold text-amber-300">Venue</span>
                <span className="text-[10.5px] text-white mt-0.5 line-clamp-2">
                  {data.inviteContent?.venueName || 'Rooftop Lounge & Club'}
                </span>
              </div>

              <div className="magic-tile p-2.5 border-purple-400/40 bg-white/5">
                <Music className="size-4 text-purple-400 mb-1" />
                <span className="text-[11px] font-bold text-amber-300">Dress Code</span>
                <span className="text-xs text-white mt-0.5 font-serif">
                  VIP Club Chic
                </span>
              </div>
            </div>

            {data.inviteContent?.venueMapsUrl && (
              <a
                href={data.inviteContent.venueMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-amber-300 hover:text-white underline mb-2"
              >
                <span>View Venue Location</span>
                <ExternalLink className="size-3" />
              </a>
            )}

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
                <span>Read Invite 📜</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= SCENE 2: HOST ANTHEM LETTER ================= */}
        {activeScene === 2 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-serif text-lg font-bold text-[#f5c451] mb-1">
              You Are on the VIP Guestlist!
            </h2>

            <TypewriterLetter
              className="magic-letter text-xs text-purple-100 max-h-52 overflow-y-auto"
              englishText={data.wishContent?.secretLetter || data.inviteContent?.eventTitle || `Get ready for an unforgettable evening of high octane energy, electric music, signature mocktails, and memories that will last a lifetime. Cannot celebrate without you!`}
              urduText={data.wishContent?.urduGreeting || (data.inviteContent as any)?.urduGreeting}
              signatureText={`— Can&apos;t wait to see you, ${data.senderName}`}
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
                <span>Confirm VIP 💌</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= SCENE 3: RSVP ================= */}
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
              Confirm Your Spot
            </h2>
            <p className="text-xs text-[#e9d5ff] mb-2">
              Let {data.senderName} know you are rolling in
            </p>

            <div className="p-3 rounded-2xl bg-black/40 border border-purple-400/30 text-left space-y-2.5 my-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={cn(
                    'flex-1 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer text-center',
                    attending === true
                      ? 'bg-purple-500/30 border-purple-400 text-purple-200 shadow-sm'
                      : 'bg-white/5 border-white/10 text-slate-400'
                  )}
                >
                  I am IN! 🔥
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
                  Cannot Make It
                </button>
              </div>

              {attending && (
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[#e9d5ff]">Squad Count:</span>
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

            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={handleSubmitRsvp}
                className="w-full py-2.5 rounded-xl bg-[#f5c451] hover:bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1 shadow-md cursor-pointer transition-transform active:scale-95"
              >
                <span>{rsvpSent ? 'RSVP Confirmed! ✓' : 'Save RSVP'}</span>
              </button>
            </div>

            {/* Direct WhatsApp RSVP */}
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
              href="/create-magic-link?occasion=party"
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
