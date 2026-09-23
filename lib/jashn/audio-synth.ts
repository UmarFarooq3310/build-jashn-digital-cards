'use client'

class CelebrationAudioPlayer {
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
  }

  getIsPlaying() {
    return this.isPlaying
  }

  getCurrentTrack() {
    return this.currentTrack
  }

  playTrack(trackId: string = 'birthday-festive') {
    this.initCtx()
    this.stop()
    if (!trackId || trackId === 'none') return

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
    } else if (t === 'wedding-shehnai' || t.includes('wedding') || t.includes('shaadi') || t.includes('barat') || t.includes('walima') || t.includes('mehndi') || t.includes('nikkah') || t.includes('qawwali') || t.includes('mayun')) {
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
