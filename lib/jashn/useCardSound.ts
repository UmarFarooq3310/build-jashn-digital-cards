'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useJashn } from './store'

export function useCardSound(category?: 'dholki' | 'islamic' | 'festive' | 'somber' | 'default') {
  const { isMuted, toggleMuted } = useJashn()
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Resolve sound file path — somber/condolence is intentionally silent
  const soundUrl = category === 'somber'
    ? null
    : category && ['dholki', 'islamic', 'festive', 'default'].includes(category)
    ? `/sounds/${category}.mp3`
    : category
    ? '/sounds/default.mp3'
    : null

  // ── Create / replace Audio element ONLY when the resolved URL changes ──────
  // isMuted is intentionally excluded here: syncing mute state is handled in
  // the separate effect below, so toggling mute never destroys the Audio object
  // mid-playback (which was the original bug).
  useEffect(() => {
    if (!soundUrl) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audioRef.current = null
      }
      return
    }

    const audio = new Audio(soundUrl)
    audio.loop = category === 'dholki'
    audio.muted = isMuted  // set initial mute on construction only
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundUrl, category]) // ← isMuted intentionally NOT in this dep array

  // ── Sync mute state onto existing Audio element without re-creating it ─────
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])

  // ── Play the category sound (call on card open / first interaction) ─────────
  const playCategorySound = useCallback(() => {
    if (!audioRef.current || isMuted || !soundUrl) return

    audioRef.current.currentTime = 0
    audioRef.current.play()
      .then(() => setAutoplayBlocked(false))
      .catch(() => {
        // Browser blocked autoplay — user hasn't interacted with the page yet
        setAutoplayBlocked(true)
      })
  }, [isMuted, soundUrl])

  // ── Short UI click sound played when user taps Save / Download ─────────────
  const playClickSound = useCallback(() => {
    if (isMuted) return
    const click = new Audio('/sounds/click.mp3')
    click.volume = 0.6
    click.play().catch(() => { /* silently ignore if blocked */ })
  }, [isMuted])

  // ── Resume after first user gesture when autoplay was previously blocked ────
  const handleUserInteraction = useCallback(() => {
    if (audioRef.current && autoplayBlocked && !isMuted) {
      audioRef.current.play()
        .then(() => setAutoplayBlocked(false))
        .catch((err) => console.error('[useCardSound] Still blocked:', err))
    }
  }, [autoplayBlocked, isMuted])

  return {
    isMuted,
    toggleMuted,
    autoplayBlocked,
    playCategorySound,
    playClickSound,
    handleUserInteraction,
    hasSound: !!soundUrl,
  }
}
