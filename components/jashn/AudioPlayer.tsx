'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { useJashn } from '@/lib/jashn/store'
import { getSoundForOccasion } from '@/lib/jashn/occasionSoundMap'

interface AudioPlayerProps {
  /** Occasion ID — used to resolve the correct sound file. */
  occasionId: string
  /**
   * Whether to start playing automatically on mount.
   * Defaults to false. Do NOT set to true on creation pages.
   */
  autoPlay?: boolean
}

/**
 * A compact pill-shaped audio preview button for Jashn cards.
 *
 * - Resolves the sound file from getSoundForOccasion(occasionId).
 * - Renders nothing when the occasion has no sound (e.g. condolence).
 * - Respects the global isMuted flag from the Jashn store.
 * - Wraps audio.play() in try/catch to honour browser autoplay policy.
 * - Loops the audio and stops / reloads when occasionId changes.
 */
export default function AudioPlayer({ occasionId, autoPlay = false }: AudioPlayerProps) {
  const { isMuted, toggleMuted } = useJashn()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const soundSrc = getSoundForOccasion(occasionId)

  // ── Initialise / update audio element when occasionId changes ──────────────
  useEffect(() => {
    if (!soundSrc) return

    // Stop any currently-playing audio
    const prev = audioRef.current
    if (prev) {
      prev.pause()
      prev.currentTime = 0
      prev.removeAttribute('src')
      prev.load()
    }

    const audio = new Audio(soundSrc)
    audio.loop = false
    audioRef.current = audio
    setIsPlaying(false)

    // Sync muted state onto the new element
    audio.muted = isMuted

    // Optional autoplay (off by default — never used on creation pages)
    if (autoPlay && !isMuted) {
      audio.play().catch((err) => {
        console.warn('[AudioPlayer] autoplay blocked:', err)
      })
    }

    return () => {
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [occasionId, soundSrc])

  // ── Sync global mute state → HTMLAudioElement ──────────────────────────────
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = isMuted

    // If the user unmutes while audio is conceptually "playing", resume it
    if (!isMuted && isPlaying) {
      audio.play().catch((err) => {
        console.warn('[AudioPlayer] play after unmute blocked:', err)
      })
    }
  }, [isMuted, isPlaying])

  // ── Nothing to render for silent occasions ─────────────────────────────────
  if (!soundSrc) return null

  // ── Play / pause toggle ────────────────────────────────────────────────────
  const handlePlayPause = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      // If currently muted, unmute first (also updates store)
      if (isMuted) {
        toggleMuted()
        audio.muted = false
      }

      try {
        await audio.play()
        setIsPlaying(true)
      } catch (err) {
        console.warn('[AudioPlayer] play() blocked by browser autoplay policy:', err)
      }
    }
  }

  // ── Mute / unmute toggle (keeps playback state, only silences output) ──────
  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    const audio = audioRef.current
    if (audio) audio.muted = !isMuted
    toggleMuted()
  }

  return (
    <div className="inline-flex items-center gap-1">
      {/* Main play/pause pill */}
      <button
        type="button"
        onClick={handlePlayPause}
        className={[
          'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
          'border transition-colors select-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
          isPlaying
            ? 'border-amber-400 bg-amber-50 text-amber-700 hover:bg-amber-100 focus-visible:ring-amber-400'
            : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50 focus-visible:ring-slate-400',
        ].join(' ')}
        aria-label={isPlaying ? 'Mute preview sound' : 'Preview sound'}
      >
        {isPlaying ? (
          <>
            <span aria-hidden="true">🔊</span>
            <span>Playing…</span>
          </>
        ) : (
          <>
            <span aria-hidden="true">🎵</span>
            <span>Preview sound</span>
          </>
        )}
      </button>

      {/* Standalone mute icon — always visible while sound is playing */}
      {isPlaying && (
        <button
          type="button"
          onClick={handleMuteToggle}
          className={[
            'inline-flex items-center justify-center rounded-full w-6 h-6',
            'border transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
            isMuted
              ? 'border-red-300 bg-red-50 text-red-500 hover:bg-red-100 focus-visible:ring-red-400'
              : 'border-slate-300 bg-white text-slate-500 hover:bg-slate-50 focus-visible:ring-slate-400',
          ].join(' ')}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="h-3 w-3" aria-hidden="true" />
          ) : (
            <Volume2 className="h-3 w-3" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  )
}
