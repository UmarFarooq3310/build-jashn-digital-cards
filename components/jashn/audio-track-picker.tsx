'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  AUDIO_TRACKS,
  getAudioTrack,
  getAudioTracksForOccasion,
  type AudioTrack,
  type AudioCategory,
} from '@/lib/jashn/audio'
import { celebrationAudio } from '@/lib/jashn/audio-synth'
import { trimAudioTo10Seconds } from '@/lib/jashn/audio-trimmer'
import { useJashn } from '@/lib/jashn/store'
import {
  Volume2,
  VolumeX,
  Music,
  CheckCircle2,
  Sparkles,
  SlidersHorizontal,
  Upload,
  Headphones,
  Search,
  X,
  Trash2,
  Check,
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
  const { showToast } = useJashn()
  const [viewMode, setViewMode] = useState<'matched' | 'all'>('matched')
  const [categoryFilter, setCategoryFilter] = useState<AudioCategory>('all')
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null)
  
  // Custom Music Gallery upload state
  const fileInputRef = useRef<HTMLInputElement>(null)
  const modalFileInputRef = useRef<HTMLInputElement>(null)
  const [customAudioName, setCustomAudioName] = useState<string>('')
  const [isProcessingAudio, setIsProcessingAudio] = useState(false)
  
  // Music Gallery Modal state
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
  const [gallerySearchQuery, setGallerySearchQuery] = useState('')
  const [modalCategoryFilter, setModalCategoryFilter] = useState<AudioCategory>('all')

  // Check if current selected track is custom audio from music gallery
  const isCustomAudioSelected = Boolean(
    selectedTrackId &&
    (selectedTrackId.startsWith('data:') ||
     selectedTrackId.startsWith('blob:') ||
     selectedTrackId.startsWith('http'))
  )

  // Load custom audio file name from localStorage on mount if applicable
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedName = localStorage.getItem('cardzy_custom_audio_name')
        if (savedName) setCustomAudioName(savedName)
      } catch {}
    }
  }, [])

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

  // Resolve tracks to display in standard view
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

  // Handle Play/Stop preview
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

  // Handle selecting a track from the list
  const handleSelectTrack = (trackId: string) => {
    onSelectTrack(trackId)
    if (trackId === 'none') {
      celebrationAudio.stop()
      setPlayingTrackId(null)
    } else {
      celebrationAudio.playTrack(trackId)
      setPlayingTrackId(trackId)
    }
  }

  // Handle upload of audio file from user's device music gallery (extracts first 10 seconds)
  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Allow files up to 35MB for trimming down
    if (file.size > 35 * 1024 * 1024) {
      showToast('Audio file must be under 35MB', 'error')
      e.target.value = ''
      return
    }

    const cleanFileName = file.name.replace(/\.[^/.]+$/, '')
    setIsProcessingAudio(true)

    try {
      showToast('Trimming first 10 seconds of audio... ⏳', 'info')
      const trimmedWavUrl = await trimAudioTo10Seconds(file, 10)

      setCustomAudioName(cleanFileName)
      try {
        localStorage.setItem('cardzy_custom_audio_name', cleanFileName)
      } catch {}

      onSelectTrack(trimmedWavUrl)
      celebrationAudio.playTrack(trimmedWavUrl)
      setPlayingTrackId(trimmedWavUrl)
      showToast(`Added first 10s of "${cleanFileName}"! 🎵`, 'success')
      setIsGalleryModalOpen(false)
    } catch (err: any) {
      console.error('Audio processing error:', err)
      showToast(err?.message || 'Could not process audio. Please choose an MP3, M4A, or WAV file.', 'error')
    } finally {
      setIsProcessingAudio(false)
      e.target.value = ''
    }
  }

  const handleRemoveCustomAudio = () => {
    celebrationAudio.stop()
    setPlayingTrackId(null)
    setCustomAudioName('')
    try {
      localStorage.removeItem('cardzy_custom_audio_name')
    } catch {}
    // Reset to occasion default
    const fallbackTrack = matchedTracks[1]?.id || 'none'
    onSelectTrack(fallbackTrack)
    showToast('Custom audio removed. Reset to default sound.', 'info')
  }

  // Filter tracks for the full Music Gallery Modal
  const modalFilteredTracks = AUDIO_TRACKS.filter((track) => {
    if (track.id === 'none') return false
    const matchesCategory =
      modalCategoryFilter === 'all' || track.category === modalCategoryFilter
    const q = gallerySearchQuery.toLowerCase().trim()
    const matchesQuery =
      !q ||
      track.name.toLowerCase().includes(q) ||
      track.description.toLowerCase().includes(q) ||
      track.tag.toLowerCase().includes(q)
    return matchesCategory && matchesQuery
  })

  const isCustomCurrentlyPlaying = playingTrackId === selectedTrackId && isCustomAudioSelected

  return (
    <div className={cn('space-y-3.5', className)}>
      {/* Hidden File Inputs for native Music Gallery upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*,.mp3,.m4a,.wav,.aac,.ogg,.flac"
        className="hidden"
        onChange={handleAudioUpload}
      />
      <input
        ref={modalFileInputRef}
        type="file"
        accept="audio/*,.mp3,.m4a,.wav,.aac,.ogg,.flac"
        className="hidden"
        onChange={handleAudioUpload}
      />

      {/* Top Header with title and Master Preview/Stop */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground flex items-center gap-1.5">
              <Music className="size-4 text-[#7B0D1E]" />
              {label}
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              20+ Sounds & Custom Audio
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Auto-matched to your event, choose from the music gallery, or upload your own audio.
          </p>
        </div>

        {selectedTrackId !== 'none' && (
          <button
            type="button"
            onClick={() => handlePlayPreview(selectedTrackId)}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold text-[#7B0D1E] hover:bg-[#7B0D1E]/10 transition-colors border border-[#7B0D1E]/20 cursor-pointer shrink-0"
          >
            {playingTrackId === selectedTrackId ? (
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

      {/* Music Gallery Action Bar */}
      <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-[#7B0D1E]/10 border border-amber-500/20">
        <button
          type="button"
          disabled={isProcessingAudio}
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7B0D1E] hover:bg-[#600A17] disabled:opacity-60 text-white text-xs font-bold shadow-xs transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          <Upload className="size-3.5" />
          <span>{isProcessingAudio ? 'Trimming 10s Audio... ⏳' : 'Upload from Music Gallery (10s) 📂'}</span>
        </button>

        <button
          type="button"
          onClick={() => setIsGalleryModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card hover:bg-muted text-foreground text-xs font-semibold border border-border shadow-xs transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          <Headphones className="size-3.5 text-amber-500" />
          <span>Browse Music Gallery 🎶</span>
        </button>
      </div>

      {/* Custom Selected Audio Banner (if user uploaded from music gallery) */}
      {isCustomAudioSelected && (
        <div className="p-3 rounded-2xl border-2 border-amber-500/60 bg-gradient-to-r from-amber-500/15 to-amber-600/10 dark:bg-amber-950/20 shadow-xs flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2.5 min-w-0 pr-1">
            <div className="size-10 rounded-xl bg-gradient-to-br from-amber-500 to-[#7B0D1E] text-white flex items-center justify-center shrink-0 shadow-md">
              <Music className={cn("size-5", isCustomCurrentlyPlaying && "animate-bounce text-amber-200")} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-foreground truncate max-w-[190px]">
                  {customAudioName || 'Custom Audio from Device'}
                </span>
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-amber-500/25 text-amber-800 dark:text-amber-200 border border-amber-500/40 uppercase tracking-wider shrink-0">
                  Music Gallery 🎵
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">
                {isCustomCurrentlyPlaying ? '🎵 Playing custom audio preview...' : 'Custom audio chosen from your device music library'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => handlePlayPreview(selectedTrackId)}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              title={isCustomCurrentlyPlaying ? "Stop preview" : "Play preview"}
            >
              {isCustomCurrentlyPlaying ? <VolumeX className="size-4 text-amber-600 dark:text-amber-400" /> : <Volume2 className="size-4" />}
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold text-amber-800 dark:text-amber-300 hover:bg-amber-500/20 transition-colors border border-amber-500/40 cursor-pointer"
            >
              Change
            </button>
            <button
              type="button"
              onClick={handleRemoveCustomAudio}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
              title="Remove custom audio"
            >
              <Trash2 className="size-3.5" />
            </button>
            <span className="flex size-5 items-center justify-center rounded-full bg-[#7B0D1E] text-white shrink-0 shadow-xs">
              <CheckCircle2 className="size-3.5" />
            </span>
          </div>
        </div>
      )}

      {/* Main Switcher: Matched for Event vs All 20 Tracks */}
      <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-xl border border-border/60 w-full max-w-full overflow-hidden">
        <button
          type="button"
          onClick={() => setViewMode('matched')}
          className={cn(
            'flex-1 min-w-0 flex items-center justify-center gap-1.5 py-1.5 px-2 sm:px-3 rounded-lg text-xs font-bold transition-all cursor-pointer',
            viewMode === 'matched'
              ? 'bg-card text-[#7B0D1E] shadow-xs border border-border/80'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Sparkles className="size-3.5 text-amber-500 shrink-0" />
          <span className="truncate">Recommended ({matchedTracks.length - 1})</span>
        </button>

        <button
          type="button"
          onClick={() => setViewMode('all')}
          className={cn(
            'flex-1 min-w-0 flex items-center justify-center gap-1.5 py-1.5 px-2 sm:px-3 rounded-lg text-xs font-bold transition-all cursor-pointer',
            viewMode === 'all'
              ? 'bg-card text-[#7B0D1E] shadow-xs border border-border/80'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <SlidersHorizontal className="size-3.5 shrink-0" />
          <span className="truncate">All 20 Sounds</span>
        </button>
      </div>

      {/* Category Pills (Visible when in 'all' view) */}
      {viewMode === 'all' && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] w-full max-w-full">
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
          const isSelected = selectedTrackId === trk.id && !isCustomAudioSelected
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

      {/* =========================================================
          FULL MUSIC GALLERY MODAL
          ========================================================= */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-4 animate-in fade-in select-none">
          <div className="relative w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-border bg-gradient-to-r from-[#7B0D1E]/10 via-amber-500/10 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="size-10 rounded-2xl bg-[#7B0D1E] text-white flex items-center justify-center shadow-md shadow-[#7B0D1E]/20">
                  <Headphones className="size-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-foreground tracking-tight">
                    Music Gallery 🎶
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Browse all tunes or upload your custom audio from device
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsGalleryModalOpen(false)}
                className="size-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                title="Close"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Modal Upload from Device Callout */}
            <div className="p-4 bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Upload className="size-4 text-amber-600 dark:text-amber-400" />
                  Have your own music or recitation?
                </span>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Select any MP3, M4A, or WAV file directly from your device music library.
                </p>
              </div>

              <button
                type="button"
                disabled={isProcessingAudio}
                onClick={() => modalFileInputRef.current?.click()}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#7B0D1E] to-[#9E1228] disabled:opacity-60 text-white text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer shrink-0"
              >
                <Upload className="size-3.5" />
                <span>{isProcessingAudio ? 'Trimming 10s Audio... ⏳' : 'Choose Audio File (10s)'}</span>
              </button>
            </div>

            {/* Search and Category Filters */}
            <div className="p-3 sm:p-4 space-y-2.5 border-b border-border bg-muted/20">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  value={gallerySearchQuery}
                  onChange={(e) => setGallerySearchQuery(e.target.value)}
                  placeholder="Search music, chimes, recitation, instruments, shehnai, dholak..."
                  className="w-full pl-9 pr-9 py-2 rounded-xl border border-border bg-background text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7B0D1E]/40"
                />
                {gallerySearchQuery && (
                  <button
                    type="button"
                    onClick={() => setGallerySearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>

              {/* Category Filter Pills in Modal */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                {CATEGORY_TABS.map((cat) => {
                  const isActive = modalCategoryFilter === cat.id
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setModalCategoryFilter(cat.id)}
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
            </div>

            {/* Modal Tracks List */}
            <div className="p-3 sm:p-4 overflow-y-auto max-h-[46vh] space-y-2 scrollbar-thin">
              {modalFilteredTracks.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground space-y-2">
                  <p className="text-sm font-semibold">No tracks found matching "{gallerySearchQuery}"</p>
                  <button
                    type="button"
                    onClick={() => {
                      setGallerySearchQuery('')
                      setModalCategoryFilter('all')
                    }}
                    className="text-xs font-bold text-[#7B0D1E] underline cursor-pointer"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {modalFilteredTracks.map((trk) => {
                    const isSelected = selectedTrackId === trk.id && !isCustomAudioSelected
                    const isCurrentlyPlaying = playingTrackId === trk.id

                    return (
                      <div
                        key={trk.id}
                        onClick={() => {
                          handleSelectTrack(trk.id)
                          showToast(`Selected "${trk.name}"`, 'success')
                          setIsGalleryModalOpen(false)
                        }}
                        className={cn(
                          'flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer shadow-xs',
                          isSelected
                            ? 'border-[#7B0D1E] bg-[#7B0D1E]/8 ring-2 ring-[#7B0D1E]/30 font-bold'
                            : 'border-border bg-card hover:border-[#7B0D1E]/40 hover:bg-muted/40'
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              handlePlayPreview(trk.id)
                            }}
                            className={cn(
                              'size-9 rounded-xl flex items-center justify-center shrink-0 transition-all shadow-xs cursor-pointer',
                              isCurrentlyPlaying
                                ? 'bg-amber-500 text-white animate-pulse'
                                : 'bg-muted text-muted-foreground hover:bg-[#7B0D1E] hover:text-white'
                            )}
                            title={isCurrentlyPlaying ? "Pause preview" : "Play preview"}
                          >
                            {isCurrentlyPlaying ? (
                              <VolumeX className="size-4 animate-bounce" />
                            ) : (
                              <Volume2 className="size-4" />
                            )}
                          </button>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-bold text-foreground truncate max-w-[170px]">
                                {trk.name}
                              </span>
                              {trk.tag && (
                                <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-muted text-muted-foreground border border-border/50 shrink-0">
                                  {trk.tag}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">
                              {trk.description}
                            </span>
                          </div>
                        </div>

                        {isSelected ? (
                          <span className="flex size-5 items-center justify-center rounded-full bg-[#7B0D1E] text-white shrink-0">
                            <Check className="size-3.5" />
                          </span>
                        ) : (
                          <span className="text-[10.5px] font-bold text-muted-foreground hover:text-[#7B0D1E] shrink-0">
                            Select
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 border-t border-border bg-muted/40 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">
                Showing {modalFilteredTracks.length} celebration tracks
              </span>
              <button
                type="button"
                onClick={() => setIsGalleryModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-card border border-border text-foreground hover:bg-muted text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
