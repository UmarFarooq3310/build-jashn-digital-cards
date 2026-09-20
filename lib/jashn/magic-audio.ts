/**
 * MagicAudio: Synthesized Web Audio API sound effects for Jashn Magic Links.
 * 100% procedurally generated, zero external audio asset dependencies, works on mobile Safari/Android/desktop.
 */

export class MagicAudio {
  private ctx: AudioContext | null = null

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
    return this.ctx
  }

  /**
   * Wax Seal Crack / Box Opening snap
   */
  playWaxCrack() {
    const ctx = this.getContext()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(320, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.16)
    gain.gain.setValueAtTime(0.75, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.16)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.16)
  }

  /**
   * Balloon / Confetti Pop
   */
  playPop() {
    const ctx = this.getContext()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(780, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + 0.12)
    gain.gain.setValueAtTime(0.85, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.12)
  }

  /**
   * Candle Blow Out
   */
  playBlow() {
    const ctx = this.getContext()
    if (!ctx) return
    const bufferSize = ctx.sampleRate * 0.28
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(620, ctx.currentTime)
    filter.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.28)
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.55, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.28)
    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    noise.start()
  }

  /**
   * Crystalline Chime
   */
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
      gain.gain.setValueAtTime(0.24, start)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.9)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(start)
      osc.stop(start + 0.9)
    })
  }

  /**
   * Diamond / Starlight Twinkle Sparkle
   */
  playSparkle() {
    const ctx = this.getContext()
    if (!ctx) return
    const sparkles = [1046.5, 1318.5, 1567.98, 2093.0]
    sparkles.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06)
      gain.gain.setValueAtTime(0.18, ctx.currentTime + i * 0.06)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.06 + 0.6)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(ctx.currentTime + i * 0.06)
      osc.stop(ctx.currentTime + i * 0.06 + 0.6)
    })
  }

  /**
   * Romantic Arpeggio (Celesta / Gentle Harp)
   */
  playRomanticArpeggio() {
    const ctx = this.getContext()
    if (!ctx) return
    const romanticNotes = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.51]
    romanticNotes.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12)
      const start = ctx.currentTime + idx * 0.12
      gain.gain.setValueAtTime(0.2, start)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 1.2)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(start)
      osc.stop(start + 1.2)
    })
  }

  /**
   * Celebration Fanfare Chords
   */
  playFanfare() {
    const ctx = this.getContext()
    if (!ctx) return
    const chords = [
      { f: 523.25, t: 0 },
      { f: 659.25, t: 0.09 },
      { f: 783.99, t: 0.18 },
      { f: 1046.5, t: 0.32 },
      { f: 1318.5, t: 0.46 },
      { f: 1567.98, t: 0.6 },
    ]
    chords.forEach(({ f, t }) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.value = f
      gain.gain.setValueAtTime(0.24, ctx.currentTime + t)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 1.4)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(ctx.currentTime + t)
      osc.stop(ctx.currentTime + t + 1.4)
    })
  }

  /**
   * Heartbeat pulse thump
   */
  playHeartBeat() {
    const ctx = this.getContext()
    if (!ctx) return
    ;[0, 0.22].forEach((offset) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(80, ctx.currentTime + offset)
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + offset + 0.12)
      gain.gain.setValueAtTime(0.4, ctx.currentTime + offset)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + offset + 0.12)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(ctx.currentTime + offset)
      osc.stop(ctx.currentTime + offset + 0.12)
    })
  }

  /**
   * Fast Whoosh / Swish sound for dodge / transitions
   */
  playWhoosh() {
    const ctx = this.getContext()
    if (!ctx) return
    const bufferSize = ctx.sampleRate * 0.18
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(800, ctx.currentTime)
    filter.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.18)
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.35, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18)
    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    noise.start()
  }

  /**
   * Continuous gentle synthesized melody loop (from provided demo)
   */
  private loopTimer: any = null
  private isMelodyPlaying: boolean = false
  private melodySeq: number[] = [523.25, 659.25, 783.99, 1046.5, 783.99, 659.25, 587.33, 880]

  private occasionMelodies: Record<string, number[]> = {
    proposal: [523.25, 659.25, 783.99, 1046.5, 783.99, 659.25, 587.33, 880],
    anniversary: [523.25, 659.25, 783.99, 1046.5, 783.99, 659.25, 587.33, 880],
    birthday: [261.63, 261.63, 293.66, 261.63, 349.23, 329.63, 261.63, 261.63, 293.66, 261.63, 392.0, 349.23],
    wedding: [392.0, 523.25, 523.25, 523.25, 659.25, 587.33, 523.25, 659.25, 783.99, 659.25],
    eid: [440.0, 466.16, 554.37, 587.33, 659.25, 698.46, 554.37, 440.0],
    ramadan: [392.0, 415.3, 493.88, 523.25, 587.33, 523.25, 493.88, 392.0],
    graduation: [392.0, 440.0, 493.88, 523.25, 587.33, 659.25, 783.99, 1046.5],
    party: [392.0, 523.25, 659.25, 783.99, 880.0, 783.99, 659.25, 523.25],
    newborn: [523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 392.0],
    apology: [440.0, 493.88, 523.25, 587.33, 523.25, 440.0, 392.0, 440.0],
  }

  tone(f: number, t: number, d: number, v: number) {
    const ctx = this.getContext()
    if (!ctx) return
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    o.frequency.value = f
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(v, t + 0.03)
    g.gain.exponentialRampToValueAtTime(0.0001, t + d)
    o.connect(g)
    g.connect(ctx.destination)
    o.start(t)
    o.stop(t + d)
  }

  playMelodyLoop() {
    const ctx = this.getContext()
    if (!ctx) return
    const t = ctx.currentTime
    this.melodySeq.forEach((f, i) => {
      this.tone(f, t + i * 0.42, 1.3, 0.045)
    })
  }

  startMelody(occasion?: string) {
    this.stopMelody()
    if (occasion && this.occasionMelodies[occasion]) {
      this.melodySeq = this.occasionMelodies[occasion]
    }
    this.isMelodyPlaying = true
    this.playMelodyLoop()
    this.loopTimer = setInterval(() => {
      if (this.isMelodyPlaying) {
        this.playMelodyLoop()
      }
    }, this.melodySeq.length * 420)
  }

  stopMelody() {
    this.isMelodyPlaying = false
    if (this.loopTimer) {
      clearInterval(this.loopTimer)
      this.loopTimer = null
    }
  }

  toggleMelody(occasion?: string): boolean {
    if (this.isMelodyPlaying) {
      this.stopMelody()
      return false
    } else {
      this.startMelody(occasion)
      return true
    }
  }

  getIsMelodyPlaying(): boolean {
    return this.isMelodyPlaying
  }
}

export const magicAudio = new MagicAudio()
