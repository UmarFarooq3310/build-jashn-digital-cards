'use strict';
const fs = require('fs');
const path = require('path');

const SOUNDS_DIR = path.join(__dirname, '..', 'public', 'sounds');
if (!fs.existsSync(SOUNDS_DIR)) fs.mkdirSync(SOUNDS_DIR, { recursive: true });

const SAMPLE_RATE = 22050; // Higher quality than the old 8000 Hz

/**
 * Build a mono 16-bit PCM WAV buffer from a sample generator function.
 * @param {number} duration  - seconds
 * @param {function} sampleFn - f(t) -> [-1, 1]
 */
function createWav(duration, sampleFn) {
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const dataBytes  = numSamples * 2;            // 16-bit = 2 bytes per sample
  const buf        = Buffer.alloc(44 + dataBytes);

  // ---- RIFF chunk ----
  buf.write('RIFF',           0, 'ascii');
  buf.writeUInt32LE(36 + dataBytes, 4);
  buf.write('WAVE',           8, 'ascii');

  // ---- fmt  sub-chunk ----
  buf.write('fmt ',          12, 'ascii');
  buf.writeUInt32LE(16,      16);           // sub-chunk size
  buf.writeUInt16LE(1,       20);           // PCM = 1
  buf.writeUInt16LE(1,       22);           // mono
  buf.writeUInt32LE(SAMPLE_RATE,      24);
  buf.writeUInt32LE(SAMPLE_RATE * 2,  28); // byte rate
  buf.writeUInt16LE(2,       32);           // block align
  buf.writeUInt16LE(16,      34);           // bits per sample

  // ---- data sub-chunk ----
  buf.write('data',          36, 'ascii');
  buf.writeUInt32LE(dataBytes, 40);

  for (let i = 0; i < numSamples; i++) {
    const t   = i / SAMPLE_RATE;
    const raw = sampleFn(t);
    const clamped = Math.max(-1, Math.min(1, raw));
    buf.writeInt16LE(Math.round(clamped * 32767), 44 + i * 2);
  }

  return buf;
}

/** Smooth ADSR envelope (all times in seconds). */
function adsr(t, attack, decay, sustainLevel, sustainEnd, release) {
  if (t < 0) return 0;
  if (t < attack) return t / attack;
  const afterA = t - attack;
  if (afterA < decay) return 1 - (1 - sustainLevel) * (afterA / decay);
  if (t < sustainEnd) return sustainLevel;
  const afterS = t - sustainEnd;
  if (afterS < release) return sustainLevel * (1 - afterS / release);
  return 0;
}

/** Sine oscillator with optional vibrato. */
function sine(freq, t, vibratoRate = 0, vibratoDepth = 0) {
  const modFreq = freq * (1 + vibratoDepth * Math.sin(2 * Math.PI * vibratoRate * t));
  return Math.sin(2 * Math.PI * modFreq * t);
}

/** Low-pass-ish noise using summed random harmonics (deterministic via seed). */
function drumNoise(t, seed) {
  let v = 0;
  for (let h = 1; h <= 8; h++) {
    v += Math.sin(2 * Math.PI * (seed * h * 17.3) + h * t * 2000) / h;
  }
  return v / 4;
}

// ─── 1. birthday-dholki.mp3 ─────────────────────────────────────────────────
// Upbeat dholki rhythm: bass hits on beat 1 & 3, treble snaps on 2 & 4,
// plus a pentatonic melody loop over the top.
function birthdayDholki(t) {
  const BPM   = 138;
  const beat  = 60 / BPM;           // seconds per beat
  const bar   = beat * 4;
  const tBar  = t % bar;            // position within current bar

  let val = 0;

  // --- Bass drum hits: beat 1 and beat 3 ---
  const bassTimes = [0, beat * 2];
  for (const bt of bassTimes) {
    const dt = tBar - bt;
    if (dt >= 0 && dt < 0.18) {
      const pitch = 90 * Math.exp(-30 * dt);
      const env   = Math.exp(-18 * dt);
      val += Math.sin(2 * Math.PI * pitch * dt) * env * 0.65;
      val += drumNoise(dt, 1) * env * 0.15;
    }
  }

  // --- High dholki snap: beat 2 and beat 4 ---
  const snapTimes = [beat, beat * 3];
  for (const st of snapTimes) {
    const dt = tBar - st;
    if (dt >= 0 && dt < 0.10) {
      const pitch = 320 * Math.exp(-25 * dt);
      const env   = Math.exp(-30 * dt);
      val += Math.sin(2 * Math.PI * pitch * dt) * env * 0.45;
      val += drumNoise(dt, 7) * env * 0.20;
    }
  }

  // --- Off-beat ghost hit (halfway through beat 1 and 3) ---
  const ghostTimes = [beat * 0.5, beat * 2.5];
  for (const gt of ghostTimes) {
    const dt = tBar - gt;
    if (dt >= 0 && dt < 0.07) {
      const env = Math.exp(-40 * dt);
      val += drumNoise(dt, 3) * env * 0.18;
    }
  }

  // --- Melody: pentatonic (C D E G A) ascending motif ---
  const pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00];
  const noteLen    = beat;
  const noteIdx    = Math.floor(t / noteLen) % pentatonic.length;
  const tNote      = t % noteLen;
  const freq       = pentatonic[noteIdx];
  const melEnv     = adsr(tNote, 0.01, 0.05, 0.6, noteLen - 0.08, 0.07);
  val += sine(freq, t, 5, 0.01) * melEnv * 0.22;
  val += sine(freq * 2, t) * melEnv * 0.06;  // octave overtone

  return val * 0.85;
}

// ─── 2. mehndi-dholki.mp3 ───────────────────────────────────────────────────
// Folk beat: faster BPM, layered bass + mid taps, tambourine shimmer,
// and a simple repetitive melody riff.
function mehndiDholki(t) {
  const BPM   = 156;
  const beat  = 60 / BPM;
  const bar   = beat * 4;
  const tBar  = t % bar;

  let val = 0;

  // Bass hits: 1 & 1.5 & 3 (bhangra-style double kick pattern)
  const bassTimes = [0, beat * 0.5, beat * 2];
  for (const bt of bassTimes) {
    const dt = tBar - bt;
    if (dt >= 0 && dt < 0.15) {
      const pitch = 80 * Math.exp(-28 * dt);
      const env   = Math.exp(-20 * dt);
      val += Math.sin(2 * Math.PI * pitch * dt) * env * 0.60;
      val += drumNoise(dt, 2) * env * 0.12;
    }
  }

  // Mid dholki: beats 2 & 4
  const midTimes = [beat, beat * 3];
  for (const mt of midTimes) {
    const dt = tBar - mt;
    if (dt >= 0 && dt < 0.12) {
      const pitch = 220 * Math.exp(-20 * dt);
      const env   = Math.exp(-25 * dt);
      val += Math.sin(2 * Math.PI * pitch * dt) * env * 0.40;
      val += drumNoise(dt, 5) * env * 0.18;
    }
  }

  // Tambourine shimmer (16th-note pulse)
  const sixteenth = beat / 4;
  const tSixteenth = tBar % sixteenth;
  if (tSixteenth < 0.03) {
    const env = Math.exp(-60 * tSixteenth);
    val += drumNoise(tSixteenth, 11) * env * 0.10;
  }

  // Melody: simple folk riff (D E F# A repeated)
  const folkScale = [293.66, 329.63, 369.99, 440.00];
  const noteLen   = beat;
  const noteIdx   = Math.floor(t / noteLen) % folkScale.length;
  const tNote     = t % noteLen;
  const freq      = folkScale[noteIdx];
  const melEnv    = adsr(tNote, 0.01, 0.04, 0.55, noteLen - 0.07, 0.06);
  val += sine(freq, t, 6, 0.015) * melEnv * 0.20;
  val += sine(freq * 1.5, t) * melEnv * 0.05; // fifth overtone

  return val * 0.85;
}

// ─── 3. wedding-shehnai.mp3 ─────────────────────────────────────────────────
// Shehnai-inspired: reedy double-reed timbre (sawtooth + odd harmonics),
// slow vibrato, ascending Bhairavi-scale melody, light dhol accompaniment.
function weddingShehnai(t) {
  // Raga Bhairavi scale (C Db Eb F G Ab Bb C)
  const scale = [261.63, 277.18, 311.13, 349.23, 392.00, 415.30, 466.16, 523.25];
  const noteDur = 0.55;
  const noteIdx = Math.floor(t / noteDur) % scale.length;
  const tNote   = t % noteDur;
  const freq    = scale[noteIdx];

  let val = 0;

  // Shehnai timbre: sawtooth-ish (sum of harmonics with odd emphasis)
  const env = adsr(tNote, 0.04, 0.08, 0.75, noteDur - 0.10, 0.10);
  const vib = 1 + 0.03 * Math.sin(2 * Math.PI * 6.5 * tNote);
  for (let h = 1; h <= 7; h++) {
    const amp = h % 2 === 1 ? 0.18 / h : 0.07 / h; // odd harmonics stronger
    val += Math.sin(2 * Math.PI * freq * h * vib * t) * amp * env;
  }

  // Drone (tanpura-like C + G)
  val += Math.sin(2 * Math.PI * 130.81 * t) * 0.08;
  val += Math.sin(2 * Math.PI * 196.00 * t) * 0.05;
  val += Math.sin(2 * Math.PI * 261.63 * t) * 0.04;

  // Light dhol beat (half-time feel)
  const BPM  = 72;
  const beat = 60 / BPM;
  const tBar = t % (beat * 2);
  for (const bt of [0, beat]) {
    const dt = tBar - bt;
    if (dt >= 0 && dt < 0.20) {
      const pitch = (bt === 0 ? 100 : 200) * Math.exp(-20 * dt);
      const dEnv  = Math.exp(-15 * dt);
      val += Math.sin(2 * Math.PI * pitch * dt) * dEnv * 0.20;
    }
  }

  return val * 0.80;
}

// ─── 4. eid-chime.mp3 ───────────────────────────────────────────────────────
// Soft bell/chime tones: metallic partial series, gentle reverb tail,
// sparse notes suggesting a peaceful Eid greeting.
function eidChime(t) {
  // Bell partial frequencies (inharmonic, characteristic of bells)
  // Each "strike" plays at specific times
  const strikes = [
    { time: 0.1,  freq: 523.25, amp: 0.70 },  // C5
    { time: 0.9,  freq: 659.25, amp: 0.60 },  // E5
    { time: 1.7,  freq: 783.99, amp: 0.65 },  // G5
    { time: 2.6,  freq: 1046.5, amp: 0.50 },  // C6
    { time: 3.5,  freq: 783.99, amp: 0.45 },  // G5
    { time: 4.2,  freq: 659.25, amp: 0.55 },  // E5
    { time: 5.0,  freq: 523.25, amp: 0.60 },  // C5
  ];

  // Bell partials relative to fundamental (inharmonic series)
  const partials = [
    { ratio: 1.000, amp: 1.00 },
    { ratio: 2.756, amp: 0.50 },
    { ratio: 5.404, amp: 0.25 },
    { ratio: 3.466, amp: 0.18 },
    { ratio: 0.500, amp: 0.12 }, // sub-octave body
  ];

  let val = 0;
  for (const strike of strikes) {
    const dt = t - strike.time;
    if (dt < 0 || dt > 4.0) continue;
    const env = Math.exp(-1.8 * dt) * strike.amp;
    for (const p of partials) {
      val += Math.sin(2 * Math.PI * strike.freq * p.ratio * t) * p.amp * env * 0.18;
    }
  }

  // Very soft ambient pad underneath (C major chord)
  const padEnv = Math.min(t / 0.5, 1) * Math.exp(-t / 8);
  val += Math.sin(2 * Math.PI * 261.63 * t) * padEnv * 0.04;
  val += Math.sin(2 * Math.PI * 329.63 * t) * padEnv * 0.03;
  val += Math.sin(2 * Math.PI * 392.00 * t) * padEnv * 0.03;

  return val * 0.90;
}

// ─── 5. friendship-soft.mp3 ─────────────────────────────────────────────────
// Gentle ambient: slow evolving pad chords with a simple tender melody.
function friendshipSoft(t) {
  // Warm pad: slow-attack chord C-E-G-B (Cmaj7)
  const chordFreqs = [261.63, 329.63, 392.00, 493.88];
  const padEnv = Math.min(t / 1.2, 1) * Math.exp(-t / 12);

  let val = 0;
  for (let i = 0; i < chordFreqs.length; i++) {
    const f   = chordFreqs[i];
    const lfo = 1 + 0.008 * Math.sin(2 * Math.PI * 0.3 * t + i); // slow chorus
    val += Math.sin(2 * Math.PI * f * lfo * t) * padEnv * 0.14;
    val += Math.sin(2 * Math.PI * f * 2 * t) * padEnv * 0.03;    // octave shimmer
  }

  // Gentle melody: C major pentatonic, long notes
  const melody = [
    { freq: 523.25, start: 0.5,  end: 1.8  },  // C5
    { freq: 659.25, start: 2.0,  end: 3.4  },  // E5
    { freq: 783.99, start: 3.6,  end: 5.0  },  // G5
    { freq: 659.25, start: 5.2,  end: 6.5  },  // E5
    { freq: 523.25, start: 6.7,  end: 8.5  },  // C5
  ];
  for (const note of melody) {
    if (t < note.start || t > note.end + 0.6) continue;
    const dt  = t - note.start;
    const dur = note.end - note.start;
    const env = adsr(dt, 0.15, 0.2, 0.65, dur - 0.2, 0.4);
    val += sine(note.freq, t, 4, 0.008) * env * 0.28;
  }

  return val * 0.80;
}

// ─── Write files ─────────────────────────────────────────────────────────────
const files = [
  { name: 'birthday-dholki.mp3',  duration: 8.0, fn: birthdayDholki  },
  { name: 'mehndi-dholki.mp3',    duration: 8.0, fn: mehndiDholki    },
  { name: 'wedding-shehnai.mp3',  duration: 8.0, fn: weddingShehnai  },
  { name: 'eid-chime.mp3',        duration: 9.0, fn: eidChime        },
  { name: 'friendship-soft.mp3',  duration: 9.0, fn: friendshipSoft  },
];

for (const f of files) {
  const outPath = path.join(SOUNDS_DIR, f.name);
  console.log(`Generating ${f.name} (${f.duration}s) …`);
  const buf = createWav(f.duration, f.fn);
  fs.writeFileSync(outPath, buf);
  console.log(`  → wrote ${buf.length} bytes to ${outPath}`);
}

console.log('\nDone! All 5 synthesized audio files written.');
