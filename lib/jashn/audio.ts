'use client'

import { useJashn } from './store'

/**
 * Rich Web Audio API Synthesizer for Jashn.
 * Synthesizes premium, context-specific melodies on the fly:
 * - Wedding / Nikkah / Shaadi / Mehndi / Dholki: Sitar-inspired sympathetic strings with an accompanying dholki beat loop.
 * - Birthday: Magical music box "Happy Birthday" melody with lush delay echo.
 * - Islamic Occasions (Eid, Ramadan): Serene chorus drone, wind-chime pings, and a soft flute melody.
 * - Pakistani Festive / National: High-energy rhythmic folk dhol drum beats with metal tambourine shakers.
 * - Engagement / Congratulations: Fast-paced glissando harp arpeggios.
 * - Sensitive (Condolences/Death): Completely silent.
 */

let activeAudioContext: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioCtx) return null
    if (!activeAudioContext || activeAudioContext.state === 'closed') {
      activeAudioContext = new AudioCtx()
    }
    return activeAudioContext
  } catch (e) {
    console.warn('Audio Context creation failed:', e)
    return null
  }
}

/**
 * Creates a master dynamics compressor to master the audio on the fly, preventing digital clipping
 */
function getMasterNode(ctx: AudioContext, dest: AudioNode): AudioNode {
  const compressor = ctx.createDynamicsCompressor()
  compressor.threshold.setValueAtTime(-16, ctx.currentTime)
  compressor.knee.setValueAtTime(8, ctx.currentTime)
  compressor.ratio.setValueAtTime(4, ctx.currentTime)
  compressor.attack.setValueAtTime(0.005, ctx.currentTime)
  compressor.release.setValueAtTime(0.20, ctx.currentTime)
  compressor.connect(dest)
  return compressor
}

/**
 * Creates a feedback delay node to simulate natural reverb/ambient echo
 */
function createDelayFeedback(ctx: AudioContext, input: AudioNode, dest: AudioNode, delayTime = 0.3, feedback = 0.25, wetVol = 0.2) {
  const delay = ctx.createDelay()
  const feedbackGain = ctx.createGain()
  const wetGain = ctx.createGain()

  delay.delayTime.setValueAtTime(delayTime, ctx.currentTime)
  feedbackGain.gain.setValueAtTime(feedback, ctx.currentTime)
  wetGain.gain.setValueAtTime(wetVol, ctx.currentTime)

  // Feedback loop
  input.connect(delay)
  delay.connect(feedbackGain)
  feedbackGain.connect(delay)

  // Wet mix to output
  delay.connect(wetGain)
  wetGain.connect(dest)
}

/**
 * Play contextual background sound based on the occasion category or id.
 * Uses autoplay fallback handling (returns a promise).
 */
let currentAudio: HTMLAudioElement | null = null

export function stopContextualSound() {
  if (currentAudio) {
    try {
      currentAudio.pause()
      currentAudio.currentTime = 0
    } catch (e) {
      console.warn('Failed to stop audio:', e)
    }
    currentAudio = null
  }
}

function getSoundPath(themeOrOccasion: string): string {
  const normalized = themeOrOccasion.toLowerCase().trim()

  // Sensitive — no sound
  if (normalized === 'condolence' || normalized === 'death' || normalized === 'mourning') {
    return ''
  }

  // Birthday / Saalgirah
  if (
    normalized === 'birthday' ||
    normalized === 'saalgirah' ||
    normalized === 'personal-birthday'
  ) {
    return '/sounds/birthday.mp3'
  }

  // Wedding / Family celebrations → wedding sound
  if (
    normalized === 'wedding' ||
    normalized === 'shaadi' ||
    normalized === 'nikah' ||
    normalized === 'mehndi' ||
    normalized === 'dholki' ||
    normalized === 'barat' ||
    normalized === 'walima' ||
    normalized === 'family' ||
    normalized === 'marriage' ||
    normalized === 'anniversary'       // golden shimmer + similar festive mood
  ) {
    return '/sounds/wedding.mp3'
  }

  // Islamic occasions → islamic sound
  if (
    normalized === 'islamic' ||
    normalized === 'eid-ul-fitr' ||
    normalized === 'eid-ul-adha' ||
    normalized === 'ramadan' ||
    normalized === 'jumma' ||
    normalized === 'eid-party' ||
    normalized === 'eid' ||
    normalized === 'milad' ||
    normalized === 'hajj' ||
    normalized === 'umrah'
  ) {
    return '/sounds/islamic.mp3'
  }

  // National / Festive (dhol beat family) → general (upbeat)
  if (
    normalized === 'national' ||
    normalized === 'independence-day' ||
    normalized === 'kashmir-day' ||
    normalized === 'basant'
  ) {
    return '/sounds/general.mp3'
  }

  // Personal warm occasions → general (soft)
  if (
    normalized === 'friendship-day' ||
    normalized === 'thank-you' ||
    normalized === 'miss-you' ||
    normalized === 'valentines' ||
    normalized === 'mothers-day' ||
    normalized === 'fathers-day' ||
    normalized === 'get-well-soon' ||
    normalized === 'welcome-back' ||
    normalized === 'good-luck' ||
    normalized === 'farewell' ||
    normalized === 'miss you' ||
    normalized === 'thank you'
  ) {
    return '/sounds/general.mp3'
  }

  // Achievements / Congratulations → birthday (celebratory)
  if (
    normalized === 'graduation' ||
    normalized === 'new-job' ||
    normalized === 'promotion' ||
    normalized === 'new-home' ||
    normalized === 'business-launch' ||
    normalized === 'exam-pass' ||
    normalized === 'congratulations' ||
    normalized === 'new-baby' ||
    normalized === 'new-year'
  ) {
    return '/sounds/birthday.mp3'
  }

  // Default fallback
  return '/sounds/general.mp3'
}

export function playContextualSound(categoryOrId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve()
      return
    }

    const { isMuted } = useJashn.getState()
    if (isMuted) {
      resolve()
      return
    }

    const queryOccasion = new URLSearchParams(window.location.search).get('occasion')
    const occasion = queryOccasion || categoryOrId
    const path = getSoundPath(occasion)

    if (!path) {
      stopContextualSound()
      resolve()
      return
    }

    stopContextualSound()

    const audio = new Audio(path)
    audio.loop = false
    currentAudio = audio

    audio.play()
      .then(() => {
        resolve()
      })
      .catch((err) => {
        console.warn('HTML5 Audio autoplay blocked, falling back to Web Audio synth...', err)
        const ctx = getAudioContext()
        if (ctx) {
          if (ctx.state === 'suspended') {
            ctx.resume().then(() => playTheme(ctx, occasion, resolve, reject)).catch(reject)
          } else {
            playTheme(ctx, occasion, resolve, reject)
          }
        } else {
          reject(err)
        }
      })
  })
}

function playTheme(ctx: AudioContext, theme: string, resolve: () => void, reject: (err: Error) => void) {
  try {
    const normalized = theme.toLowerCase().trim()

    // 1. Sensitive Events (Death/Condolences) - Play nothing
    if (normalized === 'condolence' || normalized === 'death' || normalized === 'mourning') {
      resolve()
      return
    }

    const master = getMasterNode(ctx, ctx.destination)
    const now = ctx.currentTime

    // 2. Birthday (Happy Birthday Melody)
    if (normalized === 'birthday' || normalized === 'personal-birthday') {
      playBirthdayMelody(ctx, master, now)
      resolve()
      return
    }

    // 3. Wedding/Shaadi/Nikah/Mehndi/Dholki (Sitar scale with dholki loop)
    if (
      normalized === 'wedding' ||
      normalized === 'shaadi' ||
      normalized === 'nikah' ||
      normalized === 'mehndi' ||
      normalized === 'dholki' ||
      normalized === 'barat' ||
      normalized === 'walima' ||
      normalized === 'family' ||
      normalized === 'anniversary'
    ) {
      playWeddingShehnai(ctx, master, now)
      resolve()
      return
    }

    // 4. Islamic (Eid, Ramadan, Jumma, Hajj, Umrah, Milad)
    if (
      normalized === 'islamic' ||
      normalized === 'eid-ul-fitr' ||
      normalized === 'eid-ul-adha' ||
      normalized === 'ramadan' ||
      normalized === 'jumma' ||
      normalized === 'eid-party' ||
      normalized === 'milad' ||
      normalized === 'hajj' ||
      normalized === 'umrah'
    ) {
      playIslamicAmbiance(ctx, master, now)
      resolve()
      return
    }

    // 5. Pakistani Festive (Dhol beat / National Days)
    if (
      normalized === 'national' ||
      normalized === 'independence-day' ||
      normalized === 'pakistani' ||
      normalized === 'kashmir-day' ||
      normalized === 'basant'
    ) {
      playDholBeat(ctx, master, now)
      resolve()
      return
    }

    // 6. Warm personal occasions (friendship, thank-you, miss-you)
    if (
      normalized === 'friendship-day' ||
      normalized === 'thank-you' ||
      normalized === 'miss-you' ||
      normalized === 'valentines' ||
      normalized === 'mothers-day' ||
      normalized === 'fathers-day' ||
      normalized === 'get-well-soon' ||
      normalized === 'welcome-back' ||
      normalized === 'good-luck' ||
      normalized === 'farewell'
    ) {
      playHarpCelebration(ctx, master, now)
      resolve()
      return
    }

    // 6. Generic Celebration (Engagement, Achievements, Congratulations)
    playHarpCelebration(ctx, master, now)
    resolve()
  } catch (err) {
    reject(err as Error)
  }
}

// --- SYNTHESIZERS ---

/**
 * Synthesizes a music-box style Happy Birthday melody with rich feedback echo delay
 */
function playBirthdayMelody(ctx: AudioContext, dest: AudioNode, startTime: number) {
  const bpm = 112
  const beatDuration = 60 / bpm
  
  // Melody: [freq, duration_multiplier]
  const melody = [
    [261.63, 0.75], [261.63, 0.25], [293.66, 1], [261.63, 1], [349.23, 1], [329.63, 2],
    [261.63, 0.75], [261.63, 0.25], [293.66, 1], [261.63, 1], [392.00, 1], [349.23, 2],
    [261.63, 0.75], [261.63, 0.25], [523.25, 1], [440.00, 1], [349.23, 1], [329.63, 1], [293.66, 2],
    [466.16, 0.75], [466.16, 0.25], [440.00, 1], [349.23, 1], [392.00, 1], [349.23, 2]
  ]

  // Setup delay node for lush echo
  const dryGain = ctx.createGain()
  dryGain.connect(dest)
  createDelayFeedback(ctx, dryGain, dest, 0.35, 0.3, 0.25)

  let time = startTime
  melody.forEach(([freq, duration]) => {
    // Primary music box tine (sine wave)
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    // Secondary bright tine strike (triangle wave at octave + 5th)
    const chime = ctx.createOscillator()
    const chimeGain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, time)

    chime.type = 'triangle'
    chime.frequency.setValueAtTime(freq * 3, time) // high harmonic overtone

    const noteLength = duration * beatDuration

    // Smooth envelope with fast attack and long decay
    gain.gain.setValueAtTime(0, time)
    gain.gain.linearRampToValueAtTime(0.12, time + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.001, time + noteLength - 0.02)

    chimeGain.gain.setValueAtTime(0, time)
    chimeGain.gain.linearRampToValueAtTime(0.03, time + 0.005)
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.15) // very fast decay for strike sound

    osc.connect(gain)
    chime.connect(chimeGain)

    gain.connect(dryGain)
    chimeGain.connect(dryGain)

    osc.start(time)
    chime.start(time)

    osc.stop(time + noteLength)
    chime.stop(time + noteLength)

    time += noteLength
  })
}

/**
 * Synthesizes sitar notes with sympathetic resonant strings
 */
function playSitarNote(ctx: AudioContext, dest: AudioNode, freq: number, time: number, duration: number, prevFreq?: number) {
  const osc = ctx.createOscillator()
  const sympathetic = ctx.createOscillator() // sympathetic resonance string (perfect fifth)
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()

  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(freq, time)

  sympathetic.type = 'triangle'
  sympathetic.frequency.setValueAtTime(freq * 1.5, time)

  // Slide pitch (portamento) from previous note to emulate sitar bending/meend
  if (prevFreq) {
    osc.frequency.setValueAtTime(prevFreq, time)
    osc.frequency.exponentialRampToValueAtTime(freq, time + 0.06)
    sympathetic.frequency.setValueAtTime(prevFreq * 1.5, time)
    sympathetic.frequency.exponentialRampToValueAtTime(freq * 1.5, time + 0.06)
  }

  // Vibrato (sitar jawari string bend)
  const vibrato = ctx.createOscillator()
  const vibratoGain = ctx.createGain()
  vibrato.frequency.setValueAtTime(7.5, time) // Hz
  vibratoGain.gain.setValueAtTime(3.5, time) // pitch modulation depth
  vibrato.connect(vibratoGain)
  vibratoGain.connect(osc.frequency)

  filter.type = 'peaking'
  filter.frequency.setValueAtTime(2200, time)
  filter.Q.setValueAtTime(2.5, time)
  filter.gain.setValueAtTime(8, time) // bright jawari buzz sound

  gain.gain.setValueAtTime(0, time)
  gain.gain.linearRampToValueAtTime(0.06, time + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration - 0.01)

  osc.connect(filter)
  sympathetic.connect(gain)
  filter.connect(gain)
  gain.connect(dest)

  vibrato.start(time)
  osc.start(time)
  sympathetic.start(time)

  vibrato.stop(time + duration)
  osc.stop(time + duration)
  sympathetic.stop(time + duration)
}

/**
 * Low dhol bass slap
 */
function playDholBassHit(ctx: AudioContext, dest: AudioNode, time: number) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'triangle'
  osc.frequency.setValueAtTime(145, time)
  osc.frequency.exponentialRampToValueAtTime(45, time + 0.16)

  gain.gain.setValueAtTime(0.18, time)
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35)

  osc.connect(gain)
  gain.connect(dest)

  osc.start(time)
  osc.stop(time + 0.36)
}

/**
 * Sharp high dholki slap
 */
function playDholkiSlapHit(ctx: AudioContext, dest: AudioNode, time: number) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(490, time)
  osc.frequency.exponentialRampToValueAtTime(220, time + 0.07)

  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(390, time)
  filter.Q.setValueAtTime(4.0, time)

  gain.gain.setValueAtTime(0.08, time)
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12)

  osc.connect(filter)
  filter.connect(gain)
  gain.connect(dest)

  osc.start(time)
  osc.stop(time + 0.15)
}

/**
 * Metal tambourine shaker jingle synthesized with filtered noise
 */
function playTambourineShaker(ctx: AudioContext, dest: AudioNode, time: number) {
  const bufferSize = ctx.sampleRate * 0.05 // 50ms jingle
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1
  }

  const noise = ctx.createBufferSource()
  noise.buffer = buffer

  const filter = ctx.createBiquadFilter()
  filter.type = 'highpass'
  filter.frequency.setValueAtTime(8000, time)

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.012, time)
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.04)

  noise.connect(filter)
  filter.connect(gain)
  gain.connect(dest)

  noise.start(time)
  noise.stop(time + 0.05)
}

/**
 * Synthesizes shehnai/sitar styled wedding melody + background dhol drum loops
 */
function playWeddingShehnai(ctx: AudioContext, dest: AudioNode, startTime: number) {
  // Raga Bhairavi scale sequence
  const melody = [
    261.63, 277.18, 329.63, 349.23, 392.00, 415.30, 493.88, 523.25,
    493.88, 415.30, 392.00, 349.23, 329.63, 277.18, 261.63
  ]

  const noteDuration = 0.32
  let time = startTime

  // Setup delay node for live sitar resonance
  const dryGain = ctx.createGain()
  dryGain.connect(dest)
  createDelayFeedback(ctx, dryGain, dest, 0.28, 0.25, 0.15)

  // 1. Play Sitar Melody
  melody.forEach((freq, idx) => {
    const prev = idx > 0 ? melody[idx - 1] : undefined
    playSitarNote(ctx, dryGain, freq, time, noteDuration, prev)
    time += noteDuration
  })

  // 2. Play Accompanying Rhythmic Dholki Loop in sync (4 bars of 4/4)
  const dholBpm = 118
  const beat = 60 / dholBpm
  let dholTime = startTime

  for (let measure = 0; measure < 4; measure++) {
    // Standard Mehndi Kaharwa beat pattern
    const hits = [
      { type: 'bass', t: 0 },
      { type: 'shaker', t: 0.25 },
      { type: 'slap', t: 0.5 },
      { type: 'shaker', t: 0.75 },
      { type: 'bass', t: 1.0 },
      { type: 'bass', t: 1.25 },
      { type: 'slap', t: 1.5 },
      { type: 'shaker', t: 1.75 }
    ]

    hits.forEach((h) => {
      const hitTime = dholTime + h.t * beat
      if (hitTime >= time) return // stop beat loop when melody finishes
      if (h.type === 'bass') {
        playDholBassHit(ctx, dest, hitTime)
      } else if (h.type === 'slap') {
        playDholkiSlapHit(ctx, dest, hitTime)
      } else if (h.type === 'shaker') {
        playTambourineShaker(ctx, dest, hitTime)
      }
    })

    dholTime += 2 * beat
  }
}

/**
 * Serene, spiritual ambient drone, wind chimes, and a soft flute melody for Islamic cards
 */
function playIslamicAmbiance(ctx: AudioContext, dest: AudioNode, startTime: number) {
  const duration = 7.0
  const now = startTime

  // 1. Detuned Triangle Drone (Creates a warm, rich organic pad sound)
  const droneFreqs = [110, 165, 220, 330] // A2, E3, A3, E4
  droneFreqs.forEach((freq) => {
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator() // Detuned twin
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc1.type = 'triangle'
    osc1.frequency.setValueAtTime(freq - 0.6, now)

    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(freq + 0.6, now)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(140, now)
    filter.frequency.exponentialRampToValueAtTime(550, now + duration / 2)
    filter.frequency.exponentialRampToValueAtTime(140, now + duration)

    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.04, now + 1.2)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

    osc1.connect(filter)
    osc2.connect(filter)
    filter.connect(gain)
    gain.connect(dest)

    osc1.start(now)
    osc2.start(now)
    osc1.stop(now + duration)
    osc2.stop(now + duration)
  })

  // 2. Wind Chimes (Random gentle chimes routing through feedback delay)
  const chimeGainNode = ctx.createGain()
  chimeGainNode.connect(dest)
  createDelayFeedback(ctx, chimeGainNode, dest, 0.4, 0.35, 0.3)

  const chimeFreqs = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66]
  for (let i = 0; i < 9; i++) {
    const triggerTime = now + 0.3 + i * 0.7 + Math.random() * 0.25
    const freq = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)]

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, triggerTime)

    gain.gain.setValueAtTime(0, triggerTime)
    gain.gain.linearRampToValueAtTime(0.035, triggerTime + 0.08)
    gain.gain.exponentialRampToValueAtTime(0.0001, triggerTime + 1.4)

    osc.connect(gain)
    gain.connect(chimeGainNode)

    osc.start(triggerTime)
    osc.stop(triggerTime + 1.5)
  }

  // 3. Soft flute-like melody (Serene Jumma/Eid tune)
  const fluteMelody = [329.63, 392.00, 440.00, 523.25, 440.00, 392.00, 329.63]
  let fluteTime = now + 1.0
  fluteMelody.forEach((freq) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const vibrato = ctx.createOscillator()
    const vibratoGain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, fluteTime)

    // Warm, slow flute vibrato
    vibrato.frequency.setValueAtTime(5.5, fluteTime)
    vibratoGain.gain.setValueAtTime(2.5, fluteTime)
    vibrato.connect(vibratoGain)
    vibratoGain.connect(osc.frequency)

    gain.gain.setValueAtTime(0, fluteTime)
    gain.gain.linearRampToValueAtTime(0.035, fluteTime + 0.15)
    gain.gain.exponentialRampToValueAtTime(0.0001, fluteTime + 0.7)

    osc.connect(gain)
    gain.connect(dest)

    vibrato.start(fluteTime)
    osc.start(fluteTime)
    vibrato.stop(fluteTime + 0.7)
    osc.stop(fluteTime + 0.7)

    fluteTime += 0.65
  })
}

/**
 * Synthesizes a high-energy folk dhol drum beat with high slaps and tambourine shakers
 */
function playDholBeat(ctx: AudioContext, dest: AudioNode, startTime: number) {
  const bpm = 126
  const step = 60 / bpm
  let time = startTime

  // 4 measures of high-intensity folk beat
  for (let measure = 0; measure < 4; measure++) {
    const hits = [
      { type: 'bass', t: 0 },
      { type: 'shaker', t: 0.25 },
      { type: 'slap', t: 0.5 },
      { type: 'shaker', t: 0.75 },
      { type: 'bass', t: 1.0 },
      { type: 'bass', t: 1.25 },
      { type: 'slap', t: 1.5 },
      { type: 'shaker', t: 1.75 }
    ]

    hits.forEach((h) => {
      const hitTime = time + h.t * step
      if (h.type === 'bass') {
        playDholBassHit(ctx, dest, hitTime)
      } else if (h.type === 'slap') {
        playDholkiSlapHit(ctx, dest, hitTime)
      } else if (h.type === 'shaker') {
        playTambourineShaker(ctx, dest, hitTime)
      }
    })

    time += 2 * step
  }
}

/**
 * Elegant glissando harp arpeggios that echo and bleed together
 */
function playHarpCelebration(ctx: AudioContext, dest: AudioNode, startTime: number) {
  const chords = [
    [261.63, 329.63, 392.00, 523.25], // C Major
    [349.23, 440.00, 523.25, 698.46], // F Major
    [392.00, 493.88, 587.33, 783.99], // G Major
    [523.25, 659.25, 783.99, 1046.50] // C5 Major
  ]

  // Setup delay node for lush echo
  const dryGain = ctx.createGain()
  dryGain.connect(dest)
  createDelayFeedback(ctx, dryGain, dest, 0.24, 0.35, 0.22)

  let time = startTime
  const sweepDelay = 0.065 // rapid sweeping arpeggio

  chords.forEach((chord) => {
    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, time + idx * sweepDelay)

      gain.gain.setValueAtTime(0, time + idx * sweepDelay)
      gain.gain.linearRampToValueAtTime(0.08, time + idx * sweepDelay + 0.015)
      gain.gain.exponentialRampToValueAtTime(0.001, time + idx * sweepDelay + 0.6)

      osc.connect(gain)
      gain.connect(dryGain)

      osc.start(time + idx * sweepDelay)
      osc.stop(time + idx * sweepDelay + 0.65)
    })
    time += 0.42 // delay between chord sweeps
  })
}

// Fallbacks:
export function playCelebrationSound() {
  playContextualSound('congratulations')
}

export function playRsvpSound() {
  if (typeof window === 'undefined') return
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime
    const notes = [440, 554.37, 659.25] // A4, C#5, E5
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, now + index * 0.1)

      gain.gain.setValueAtTime(0.12, now + index * 0.1)
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.1 + 0.4)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now + index * 0.1)
      osc.stop(now + index * 0.1 + 0.45)
    })
  } catch (e) {
    console.log('Audio playback prevented:', e)
  }
}
