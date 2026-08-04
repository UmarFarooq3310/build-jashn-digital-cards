'use client'

class CelebrationAudioPlayer {
  private ctx: AudioContext | null = null
  private isPlaying = false

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

  private playNote(freq: number, duration: number, delay = 0, type: OscillatorType = 'sine') {
    if (typeof window === 'undefined') return
    setTimeout(() => {
      if (!this.ctx || !this.isPlaying) return
      try {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = type
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

        gain.gain.setValueAtTime(0.12, this.ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start()
        osc.stop(this.ctx.currentTime + duration)
      } catch (e) {
        console.error('Audio synth note playback error:', e)
      }
    }, delay * 1000)
  }

  playMelody(occasionId: string = 'birthday') {
    this.initCtx()
    this.stop()
    this.isPlaying = true

    const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, B4 = 493.88, C5 = 523.25, D5 = 587.33, E5 = 659.25, G5 = 783.99

    const isGaming = ['pubg-winner', 'free-fire-winner', 'ludo-champion', 'number-draw-winner', 'bingo-winner', 'esports-winner'].includes(occasionId)

    if (isGaming) {
      // High-Energy Esports Victory Fanfare
      const notes = [
        { f: G4, d: 0.2, t: 0 },
        { f: G4, d: 0.2, t: 0.25 },
        { f: G4, d: 0.2, t: 0.5 },
        { f: C5, d: 0.6, t: 0.75 },
        { f: E5, d: 0.6, t: 1.2 },
        { f: G5, d: 0.9, t: 1.7 },
      ]
      notes.forEach(n => this.playNote(n.f, n.d, n.t, 'triangle'))
    } else {
      // Festive Celebration Chimes
      const notes = [
        { f: C4, d: 0.3, t: 0 },
        { f: C4, d: 0.3, t: 0.35 },
        { f: D4, d: 0.5, t: 0.7 },
        { f: C4, d: 0.5, t: 1.25 },
        { f: F4, d: 0.5, t: 1.8 },
        { f: E4, d: 0.8, t: 2.35 },
        { f: C4, d: 0.3, t: 3.2 },
        { f: C4, d: 0.3, t: 3.55 },
        { f: D4, d: 0.5, t: 3.9 },
        { f: C4, d: 0.5, t: 4.45 },
        { f: G4, d: 0.5, t: 5.0 },
        { f: F4, d: 0.8, t: 5.55 },
      ]
      notes.forEach(n => this.playNote(n.f, n.d, n.t, 'sine'))
    }
  }

  stop() {
    this.isPlaying = false
  }

  getIsPlaying() {
    return this.isPlaying
  }

  toggle(occasionId: string = 'birthday'): boolean {
    if (this.isPlaying) {
      this.stop()
      return false
    } else {
      this.playMelody(occasionId)
      return true
    }
  }
}

export const celebrationAudio = new CelebrationAudioPlayer()
