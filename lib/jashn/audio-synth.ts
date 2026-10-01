'use client'

import { getAudioTrack } from './audio'
import { getSoundForOccasion, getSoundForInvitationType } from './occasionSoundMap'

class CelebrationAudioPlayer {
  private audioElement: HTMLAudioElement | null = null
  private ctx: AudioContext | null = null
  private isPlaying = false
  private currentTrack: string = ''
  private activeTimers: ReturnType<typeof setTimeout>[] = []

  private initCtx() {
    if (typeof window === 'undefined') return
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
  }

  private clearTimers() {
    this.activeTimers.forEach((timer) => clearTimeout(timer))
    this.activeTimers = []
  }

  private playNote(freq: number, duration: number, delay = 0, type: OscillatorType = 'sine', volume = 0.14) {
    if (typeof window === 'undefined') return
    const timer = setTimeout(() => {
      if (!this.ctx || !this.isPlaying) return
      try {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = type
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

        gain.gain.setValueAtTime(volume, this.ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start()
        osc.stop(this.ctx.currentTime + duration)
      } catch {
        // Audio error silent
      }
    }, delay * 1000)

    this.activeTimers.push(timer)
  }

  stop() {
    this.isPlaying = false
    this.currentTrack = ''
    this.clearTimers()
    if (this.audioElement) {
      try {
        this.audioElement.pause()
        this.audioElement.currentTime = 0
        this.audioElement.removeAttribute('src')
        this.audioElement.load()
      } catch {}
      this.audioElement = null
    }
  }

  getIsPlaying() {
    return this.isPlaying
  }

  getCurrentTrack() {
    return this.currentTrack
  }

  playTrack(trackId: string = 'birthday-festive') {
    if (typeof window === 'undefined') return
    this.stop()
    if (!trackId || trackId === 'none') return

    this.isPlaying = true
    this.currentTrack = trackId

    // 1. Resolve audio track URL from AUDIO_TRACKS or occasionSoundMap
    const trackObj = getAudioTrack(trackId)
    let soundSrc = trackObj && trackObj.id !== 'none' ? trackObj.src : null

    if (!soundSrc) {
      soundSrc = getSoundForOccasion(trackId) || getSoundForInvitationType(trackId)
    }

    if (soundSrc) {
      try {
        const audio = new Audio(soundSrc)
        audio.loop = true
        audio.volume = 0.85
        this.audioElement = audio

        const playPromise = audio.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.isPlaying = true
            })
            .catch(() => {
              this.playSynthesizerFallback(trackId)
            })
        }
        return
      } catch {
        this.playSynthesizerFallback(trackId)
        return
      }
    }

    this.playSynthesizerFallback(trackId)
  }

  playSynthesizerFallback(trackId: string = 'birthday-festive') {
    this.initCtx()
    this.clearTimers()
    this.isPlaying = true
    this.currentTrack = trackId

    // Frequencies
    const C4 = 261.63, Db4 = 277.18, D4 = 293.66, Eb4 = 311.13, E4 = 329.63, F4 = 349.23, Fs4 = 369.99, G4 = 392.00, Ab4 = 415.30, A4 = 440.00, Bb4 = 466.16, B4 = 493.88
    const C5 = 523.25, D5 = 587.33, Eb5 = 622.25, E5 = 659.25, F5 = 698.46, G5 = 783.99, A5 = 880.00, B5 = 987.77, C6 = 1046.50

    const t = trackId.toLowerCase()

    if (t === 'gaming-victory' || t.includes('gaming') || t.includes('winner') || t.includes('champion') || t.includes('pubg') || t.includes('free-fire') || t.includes('ludo') || t.includes('esports')) {
      // High-Energy Esports Victory Fanfare
      const notes = [
        { f: G4, d: 0.18, t: 0, type: 'triangle' as OscillatorType, v: 0.18 },
        { f: G4, d: 0.18, t: 0.2, type: 'triangle' as OscillatorType, v: 0.18 },
        { f: G4, d: 0.18, t: 0.4, type: 'triangle' as OscillatorType, v: 0.18 },
        { f: C5, d: 0.5, t: 0.62, type: 'sawtooth' as OscillatorType, v: 0.16 },
        { f: E5, d: 0.5, t: 0.95, type: 'sawtooth' as OscillatorType, v: 0.18 },
        { f: G5, d: 0.8, t: 1.35, type: 'sawtooth' as OscillatorType, v: 0.22 },
        { f: C6, d: 1.2, t: 1.85, type: 'sawtooth' as OscillatorType, v: 0.25 },
      ]
      notes.forEach((n) => this.playNote(n.f, n.d, n.t, n.type, n.v))
    } else if (
      t === 'punjabi-bhangra-dhol' ||
      t === 'punjabi-tappe-dholki' ||
      t.includes('bhangra') ||
      t.includes('dholki') ||
      t.includes('dholak') ||
      t.includes('tappe') ||
      t.includes('vaisakhi') ||
      t.includes('baisakhi') ||
      t.includes('lohri') ||
      t.includes('sangeet') ||
      t.includes('mehndi')
    ) {
      // Energetic Punjabi Bhangra & Dholki Folk Melody
      const notes = [
        { f: G4, d: 0.18, t: 0, type: 'sawtooth' as OscillatorType, v: 0.19 },
        { f: G4, d: 0.16, t: 0.2, type: 'sawtooth' as OscillatorType, v: 0.19 },
        { f: Bb4, d: 0.25, t: 0.38, type: 'sawtooth' as OscillatorType, v: 0.20 },
        { f: C5, d: 0.32, t: 0.64, type: 'sawtooth' as OscillatorType, v: 0.21 },
        { f: D5, d: 0.4, t: 0.98, type: 'sawtooth' as OscillatorType, v: 0.22 },
        { f: C5, d: 0.2, t: 1.4, type: 'sawtooth' as OscillatorType, v: 0.19 },
        { f: Bb4, d: 0.28, t: 1.62, type: 'sawtooth' as OscillatorType, v: 0.20 },
        { f: G4, d: 0.45, t: 1.92, type: 'sawtooth' as OscillatorType, v: 0.22 },
        { f: F4, d: 0.22, t: 2.4, type: 'sawtooth' as OscillatorType, v: 0.18 },
        { f: G4, d: 0.75, t: 2.65, type: 'sawtooth' as OscillatorType, v: 0.24 },
      ]
      notes.forEach((n) => this.playNote(n.f, n.d, n.t, n.type, n.v))
    } else if (
      t === 'indian-sitar-classical' ||
      t.includes('sitar') ||
      t.includes('diwali') ||
      t.includes('holi') ||
      t.includes('janmashtami') ||
      t.includes('raksha-bandhan') ||
      t.includes('traditional') ||
      t.includes('raag') ||
      t.includes('classical')
    ) {
      // Traditional Indian Sitar & Raag Yaman / Bhairavi Motif
      const notes = [
        { f: C4, d: 0.4, t: 0, type: 'triangle' as OscillatorType, v: 0.18 },
        { f: E4, d: 0.4, t: 0.35, type: 'triangle' as OscillatorType, v: 0.17 },
        { f: Fs4, d: 0.42, t: 0.7, type: 'triangle' as OscillatorType, v: 0.18 },
        { f: G4, d: 0.55, t: 1.1, type: 'triangle' as OscillatorType, v: 0.20 },
        { f: B4, d: 0.45, t: 1.65, type: 'triangle' as OscillatorType, v: 0.19 },
        { f: C5, d: 0.7, t: 2.1, type: 'triangle' as OscillatorType, v: 0.22 },
        { f: B4, d: 0.35, t: 2.8, type: 'triangle' as OscillatorType, v: 0.17 },
        { f: G4, d: 0.4, t: 3.15, type: 'triangle' as OscillatorType, v: 0.18 },
        { f: E4, d: 0.45, t: 3.55, type: 'triangle' as OscillatorType, v: 0.17 },
        { f: C4, d: 1.1, t: 4.0, type: 'triangle' as OscillatorType, v: 0.20 },
      ]
      notes.forEach((n) => this.playNote(n.f, n.d, n.t, n.type, n.v))
    } else if (t === 'wedding-shehnai' || t.includes('wedding') || t.includes('shaadi') || t.includes('barat') || t.includes('walima') || t.includes('nikkah') || t.includes('nikah') || t.includes('qawwali') || t.includes('mayun')) {
      // Royal Shehnai & Dholki Wedding Melody
      const notes = [
        { f: G4, d: 0.35, t: 0, type: 'sawtooth' as OscillatorType, v: 0.13 },
        { f: C5, d: 0.35, t: 0.3, type: 'sawtooth' as OscillatorType, v: 0.14 },
        { f: D5, d: 0.35, t: 0.6, type: 'sawtooth' as OscillatorType, v: 0.15 },
        { f: E5, d: 0.55, t: 0.9, type: 'sawtooth' as OscillatorType, v: 0.16 },
        { f: G5, d: 0.6, t: 1.35, type: 'sawtooth' as OscillatorType, v: 0.18 },
        { f: E5, d: 0.4, t: 1.9, type: 'sawtooth' as OscillatorType, v: 0.15 },
        { f: D5, d: 0.4, t: 2.25, type: 'sawtooth' as OscillatorType, v: 0.14 },
        { f: C5, d: 0.9, t: 2.6, type: 'sawtooth' as OscillatorType, v: 0.17 },
      ]
      notes.forEach((n) => this.playNote(n.f, n.d, n.t, n.type, n.v))
    } else if (t === 'islamic-oud' || t.includes('islamic') || t.includes('eid') || t.includes('ramadan') || t.includes('hajj') || t.includes('umrah') || t.includes('jumma') || t.includes('aqiqah') || t.includes('roza')) {
      // Serene Oud & Nasheed Melody (Maqam Hijaz)
      const notes = [
        { f: D4, d: 0.45, t: 0, type: 'sine' as OscillatorType, v: 0.18 },
        { f: Eb4, d: 0.4, t: 0.38, type: 'sine' as OscillatorType, v: 0.17 },
        { f: Fs4, d: 0.45, t: 0.72, type: 'sine' as OscillatorType, v: 0.18 },
        { f: G4, d: 0.6, t: 1.1, type: 'sine' as OscillatorType, v: 0.19 },
        { f: A4, d: 0.6, t: 1.65, type: 'sine' as OscillatorType, v: 0.18 },
        { f: Bb4, d: 0.5, t: 2.2, type: 'sine' as OscillatorType, v: 0.17 },
        { f: A4, d: 0.5, t: 2.65, type: 'sine' as OscillatorType, v: 0.16 },
        { f: G4, d: 0.5, t: 3.1, type: 'sine' as OscillatorType, v: 0.16 },
        { f: Fs4, d: 0.55, t: 3.55, type: 'sine' as OscillatorType, v: 0.17 },
        { f: D4, d: 1.1, t: 4.05, type: 'sine' as OscillatorType, v: 0.19 },
      ]
      notes.forEach((n) => this.playNote(n.f, n.d, n.t, n.type, n.v))
    } else if (t === 'romantic-strings' || t.includes('romantic') || t.includes('anniversary') || t.includes('proposal') || t.includes('love') || t.includes('valentine')) {
      // Romantic Celesta & Harp Arpeggios
      const notes = [
        { f: C4, d: 0.6, t: 0, type: 'sine' as OscillatorType, v: 0.15 },
        { f: E4, d: 0.6, t: 0.22, type: 'sine' as OscillatorType, v: 0.15 },
        { f: G4, d: 0.6, t: 0.44, type: 'sine' as OscillatorType, v: 0.16 },
        { f: B4, d: 0.6, t: 0.66, type: 'sine' as OscillatorType, v: 0.16 },
        { f: C5, d: 0.7, t: 0.88, type: 'sine' as OscillatorType, v: 0.18 },
        { f: E5, d: 0.7, t: 1.15, type: 'sine' as OscillatorType, v: 0.18 },
        { f: G5, d: 1.2, t: 1.45, type: 'sine' as OscillatorType, v: 0.20 },
      ]
      notes.forEach((n) => this.playNote(n.f, n.d, n.t, n.type, n.v))
    } else if (t === 'baby-lullaby' || t.includes('baby') || t.includes('lullaby')) {
      // Sweet Music Box Lullaby (Brahms)
      const notes = [
        { f: E4, d: 0.5, t: 0, type: 'sine' as OscillatorType, v: 0.16 },
        { f: E4, d: 0.5, t: 0.5, type: 'sine' as OscillatorType, v: 0.16 },
        { f: G4, d: 0.9, t: 1.0, type: 'sine' as OscillatorType, v: 0.18 },
        { f: E4, d: 0.5, t: 2.0, type: 'sine' as OscillatorType, v: 0.16 },
        { f: E4, d: 0.5, t: 2.5, type: 'sine' as OscillatorType, v: 0.16 },
        { f: G4, d: 0.9, t: 3.0, type: 'sine' as OscillatorType, v: 0.18 },
        { f: E4, d: 0.4, t: 4.0, type: 'sine' as OscillatorType, v: 0.16 },
        { f: G4, d: 0.4, t: 4.4, type: 'sine' as OscillatorType, v: 0.17 },
        { f: C5, d: 0.8, t: 4.8, type: 'sine' as OscillatorType, v: 0.20 },
        { f: B4, d: 0.8, t: 5.6, type: 'sine' as OscillatorType, v: 0.18 },
        { f: A4, d: 1.1, t: 6.4, type: 'sine' as OscillatorType, v: 0.19 },
      ]
      notes.forEach((n) => this.playNote(n.f, n.d, n.t, n.type, n.v))
    } else if (t === 'holiday-bells' || t.includes('christmas') || t.includes('bell')) {
      // Sparkling Holiday Bells
      const notes = [
        { f: E4, d: 0.35, t: 0, type: 'sine' as OscillatorType, v: 0.18 },
        { f: E4, d: 0.35, t: 0.38, type: 'sine' as OscillatorType, v: 0.18 },
        { f: E4, d: 0.6, t: 0.76, type: 'sine' as OscillatorType, v: 0.20 },
        { f: E4, d: 0.35, t: 1.45, type: 'sine' as OscillatorType, v: 0.18 },
        { f: E4, d: 0.35, t: 1.83, type: 'sine' as OscillatorType, v: 0.18 },
        { f: E4, d: 0.6, t: 2.21, type: 'sine' as OscillatorType, v: 0.20 },
        { f: E4, d: 0.35, t: 2.9, type: 'sine' as OscillatorType, v: 0.18 },
        { f: G4, d: 0.35, t: 3.28, type: 'sine' as OscillatorType, v: 0.19 },
        { f: C4, d: 0.35, t: 3.66, type: 'sine' as OscillatorType, v: 0.17 },
        { f: D4, d: 0.35, t: 4.04, type: 'sine' as OscillatorType, v: 0.18 },
        { f: E4, d: 1.0, t: 4.42, type: 'sine' as OscillatorType, v: 0.22 },
      ]
      notes.forEach((n) => this.playNote(n.f, n.d, n.t, n.type, n.v))
    } else if (t === 'corporate-ambient' || t.includes('corporate') || t.includes('business') || t.includes('vcard')) {
      // Modern Lo-Fi Executive Chords
      const notes = [
        { f: D4, d: 1.8, t: 0, type: 'sine' as OscillatorType, v: 0.14 },
        { f: Fs4, d: 1.8, t: 0.05, type: 'sine' as OscillatorType, v: 0.13 },
        { f: A4, d: 1.8, t: 0.1, type: 'sine' as OscillatorType, v: 0.13 },
        { f: C5, d: 1.8, t: 0.15, type: 'sine' as OscillatorType, v: 0.14 },
        { f: B4, d: 2.0, t: 2.2, type: 'sine' as OscillatorType, v: 0.15 },
        { f: D5, d: 2.0, t: 2.25, type: 'sine' as OscillatorType, v: 0.14 },
        { f: G4, d: 2.2, t: 4.5, type: 'sine' as OscillatorType, v: 0.15 },
      ]
      notes.forEach((n) => this.playNote(n.f, n.d, n.t, n.type, n.v))
    } else if (t === 'achievement-brass' || t === 'celebration-party' || t.includes('fanfare') || t.includes('graduation')) {
      // Triumphant Fanfare
      const notes = [
        { f: C4, d: 0.25, t: 0, type: 'triangle' as OscillatorType, v: 0.18 },
        { f: C4, d: 0.25, t: 0.3, type: 'triangle' as OscillatorType, v: 0.18 },
        { f: C4, d: 0.25, t: 0.6, type: 'triangle' as OscillatorType, v: 0.18 },
        { f: F4, d: 0.7, t: 0.9, type: 'sawtooth' as OscillatorType, v: 0.20 },
        { f: G4, d: 0.4, t: 1.7, type: 'sawtooth' as OscillatorType, v: 0.20 },
        { f: C5, d: 1.2, t: 2.2, type: 'sawtooth' as OscillatorType, v: 0.24 },
      ]
      notes.forEach((n) => this.playNote(n.f, n.d, n.t, n.type, n.v))
    } else {
      // Festive Celebration / Birthday Melody
      const notes = [
        { f: C4, d: 0.3, t: 0, type: 'sine' as OscillatorType, v: 0.16 },
        { f: C4, d: 0.3, t: 0.32, type: 'sine' as OscillatorType, v: 0.16 },
        { f: D4, d: 0.5, t: 0.65, type: 'sine' as OscillatorType, v: 0.18 },
        { f: C4, d: 0.5, t: 1.15, type: 'sine' as OscillatorType, v: 0.18 },
        { f: F4, d: 0.5, t: 1.65, type: 'sine' as OscillatorType, v: 0.20 },
        { f: E4, d: 0.8, t: 2.15, type: 'sine' as OscillatorType, v: 0.20 },
        { f: C4, d: 0.3, t: 2.95, type: 'sine' as OscillatorType, v: 0.16 },
        { f: C4, d: 0.3, t: 3.25, type: 'sine' as OscillatorType, v: 0.16 },
        { f: D4, d: 0.5, t: 3.6, type: 'sine' as OscillatorType, v: 0.18 },
        { f: C4, d: 0.5, t: 4.1, type: 'sine' as OscillatorType, v: 0.18 },
        { f: G4, d: 0.5, t: 4.6, type: 'sine' as OscillatorType, v: 0.20 },
        { f: F4, d: 0.9, t: 5.1, type: 'sine' as OscillatorType, v: 0.22 },
      ]
      notes.forEach((n) => this.playNote(n.f, n.d, n.t, n.type, n.v))
    }
  }

  playMelody(occasionId: string = 'birthday', trackId?: string) {
    if (trackId && trackId !== 'none') {
      this.playTrack(trackId)
    } else if (trackId === 'none') {
      this.stop()
    } else {
      this.playTrack(occasionId)
    }
  }

  toggle(trackIdOrOccasion: string = 'birthday'): boolean {
    if (this.isPlaying) {
      this.stop()
      return false
    } else {
      this.playTrack(trackIdOrOccasion)
      return true
    }
  }
}

export const celebrationAudio = new CelebrationAudioPlayer()
