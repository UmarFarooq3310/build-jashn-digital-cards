'use client'

import React, { useState, useEffect } from 'react'
import {
  AUDIO_TRACKS,
  getAudioTrack,
  getAudioTracksForOccasion,
  type AudioTrack,
  type AudioCategory,
} from '@/lib/jashn/audio'
import { celebrationAudio } from '@/lib/jashn/audio-synth'
import {
  Volume2,
  VolumeX,
  Music,
  CheckCircle2,
  Sparkles,
  SlidersHorizontal,
  Flame,
  Moon,
  Heart,
  Cake,
  Trophy,
  Briefcase,
  Flower2,
  TreePine,
  PartyPopper,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AudioTrackPickerProps {
  selectedTrackId: string
  onSelectTrack: (trackId: string) => void
  occasionId?: string
  label?: string
  className?: string
}

const CATEGORY_TABS: { id: AudioCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'All 20 Sounds', icon: '🌐' },
  { id: 'wedding', label: 'Wedding & Folk', icon: '💍' },
  { id: 'islamic', label: 'Islamic & Spiritual', icon: '🌙' },
  { id: 'birthday', label: 'Birthdays & Baby', icon: '🎂' },
  { id: 'romantic', label: 'Romance & Love', icon: '💖' },
  { id: 'festive', label: 'Festivals & Party', icon: '🎉' },
  { id: 'milestone', label: 'Victory & Gaming', icon: '🏆' },
  { id: 'ambient', label: 'Corporate & Chill', icon: '💼' },
]

export function AudioTrackPicker({
  selectedTrackId,
  onSelectTrack,
  occasionId,
  label = 'Background Celebration Music',
  className,
}: AudioTrackPickerProps) {
  const [viewMode, setViewMode] = useState<'matched' | 'all'>('matched')
  const [categoryFilter, setCategoryFilter] = useState<AudioCategory>('all')
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null)

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      celebrationAudio.stop()
    }
  }, [])

  // If occasionId changes, keep viewMode on 'matched' so user sees relevant sounds
  useEffect(() => {
    setViewMode('matched')
  }, [occasionId])

  const matchedTracks = getAudioTracksForOccasion(occasionId)

  // Resolve tracks to display
  let displayedTracks: AudioTrack[] = []
  if (viewMode === 'matched') {
    displayedTracks = matchedTracks
  } else {
    if (categoryFilter === 'all') {
      displayedTracks = AUDIO_TRACKS
    } else {
      const silent = AUDIO_TRACKS[0]
      const filtered = AUDIO_TRACKS.filter((t) => t.category === categoryFilter)
      displayedTracks = [silent, ...filtered]
    }
  }

  const handlePlayPreview = (trackId: string) => {
    if (trackId === 'none') {
      celebrationAudio.stop()
      setPlayingTrackId(null)
      return
    }

    if (playingTrackId === trackId) {
      celebrationAudio.stop()
      setPlayingTrackId(null)
    } else {
      celebrationAudio.playTrack(trackId)
      setPlayingTrackId(trackId)
    }
  }

  const handleSelectTrack = (trackId: string) => {
    onSelectTrack(trackId)
    if (trackId === 'none') {
      celebrationAudio.stop()
      setPlayingTrackId(null)
    } else {
      // Auto-preview track briefly on selection
      celebrationAudio.playTrack(trackId)
      setPlayingTrackId(trackId)
    }
  }

  const currentSelectedTrack = getAudioTrack(selectedTrackId)

  return (
    <div className={cn('space-y-3.5', className)}>
      {/* Top Header with title and Master Preview/Stop */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground flex items-center gap-1.5">
              <Music className="size-4 text-[#7B0D1E]" />
              {label}
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              20 High-Quality Sounds
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Auto-matched to your selected event. No national anthems — pure universal festive tunes.
          </p>
        </div>

        {selectedTrackId !== 'none' && (
          <button
            type="button"
            onClick={() => handlePlayPreview(selectedTrackId)}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold text-[#7B0D1E] hover:bg-[#7B0D1E]/10 transition-colors border border-[#7B0D1E]/20 cursor-pointer shrink-0"
          >
            {playingTrackId ? (
              <>
                <VolumeX className="size-3.5 animate-pulse" />
                <span>Stop Playing ⏹️</span>
              </>
            ) : (
              <>
                <Volume2 className="size-3.5" />
                <span>Preview Selected 🔊</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Main Switcher: Matched for Event vs All 20 Tracks */}
      <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-xl border border-border/60">
        <button
          type="button"
          onClick={() => setViewMode('matched')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer',
            viewMode === 'matched'
              ? 'bg-card text-[#7B0D1E] shadow-xs border border-border/80'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Sparkles className="size-3.5 text-amber-500" />
          <span>Recommended for this Event ({matchedTracks.length - 1})</span>
        </button>

        <button
          type="button"
          onClick={() => setViewMode('all')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer',
            viewMode === 'all'
              ? 'bg-card text-[#7B0D1E] shadow-xs border border-border/80'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <SlidersHorizontal className="size-3.5" />
          <span>Explore All 20 Sounds</span>
        </button>
      </div>

      {/* Category Pills (Visible when in 'all' view) */}
      {viewMode === 'all' && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
          {CATEGORY_TABS.map((cat) => {
            const isActive = categoryFilter === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id)}
                className={cn(
                  'whitespace-nowrap px-2.5 py-1 rounded-full font-semibold transition-all border cursor-pointer shrink-0 flex items-center gap-1',
                  isActive
                    ? 'bg-[#7B0D1E] text-white border-[#7B0D1E] shadow-xs'
                    : 'bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'
                )}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Audio Tracks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {displayedTracks.map((trk) => {
          const isSelected = selectedTrackId === trk.id
          const isCurrentlyPlaying = playingTrackId === trk.id

          return (
            <div
              key={trk.id}
              onClick={() => handleSelectTrack(trk.id)}
              className={cn(
                'group relative flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer shadow-xs',
                isSelected
                  ? 'border-[#7B0D1E] bg-[#7B0D1E]/6 ring-2 ring-[#7B0D1E]/25 font-bold shadow-sm'
                  : 'border-border bg-card hover:border-[#7B0D1E]/35 hover:bg-muted/30'
              )}
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <div
                  className={cn(
                    'size-9 rounded-xl flex items-center justify-center shrink-0 transition-all shadow-xs',
                    isSelected
                      ? 'bg-[#7B0D1E] text-white shadow-[#7B0D1E]/20'
                      : 'bg-muted text-muted-foreground group-hover:bg-[#7B0D1E]/10 group-hover:text-[#7B0D1E]',
                    isCurrentlyPlaying && 'animate-pulse ring-2 ring-amber-400'
                  )}
                >
                  {trk.id === 'none' ? (
                    <VolumeX className="size-4 text-muted-foreground" />
                  ) : isCurrentlyPlaying ? (
                    <Volume2 className="size-4 text-amber-300 animate-bounce" />
                  ) : (
                    <Music className="size-4" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-foreground truncate max-w-[190px]">
                      {trk.name}
                    </span>
                    {trk.tag && trk.id !== 'none' && (
                      <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-muted text-muted-foreground border border-border/50 shrink-0">
                        {trk.tag}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">
                    {isCurrentlyPlaying ? (
                      <span className="text-amber-600 dark:text-amber-400 font-semibold animate-pulse">
                        🎵 Playing audio preview...
                      </span>
                    ) : (
                      trk.description
                    )}
                  </span>
                </div>
              </div>

              {/* Action / Checkmark */}
              <div className="flex items-center gap-1 shrink-0">
                {trk.id !== 'none' && (
                  <button
                    type="button"
                    title={isCurrentlyPlaying ? 'Stop preview' : 'Play preview'}
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePlayPreview(trk.id)
                    }}
                    className={cn(
                      'p-1.5 rounded-lg text-muted-foreground hover:text-[#7B0D1E] hover:bg-[#7B0D1E]/10 transition-colors',
                      isCurrentlyPlaying && 'text-[#7B0D1E] bg-[#7B0D1E]/15'
                    )}
                  >
                    {isCurrentlyPlaying ? (
                      <VolumeX className="size-4" />
                    ) : (
                      <Volume2 className="size-4" />
                    )}
                  </button>
                )}

                {isSelected ? (
                  <span className="flex size-5 items-center justify-center rounded-full bg-[#7B0D1E] text-white shrink-0">
                    <CheckCircle2 className="size-3.5" />
                  </span>
                ) : (
                  <span className="size-4 rounded-full border border-border group-hover:border-[#7B0D1E]/50 shrink-0" />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
