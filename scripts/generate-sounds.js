const fs = require('fs');
const path = require('path');

const SOUNDS_DIR = path.join(__dirname, '..', 'public', 'sounds');

if (!fs.existsSync(SOUNDS_DIR)) {
  fs.mkdirSync(SOUNDS_DIR, { recursive: true });
}

function createWavBuffer(sampleRate, duration, frequencyFn) {
  const numSamples = sampleRate * duration;
  const buffer = Buffer.alloc(44 + numSamples * 2);
  
  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM format
  buffer.writeUInt16LE(1, 22); // Mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32); // Block align
  buffer.writeUInt16LE(16, 34); // Bits per sample
  buffer.write('data', 36);
  buffer.writeUInt32LE(numSamples * 2, 40);
  
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const value = frequencyFn(t);
    const sample = Math.max(-32768, Math.min(32767, Math.floor(value * 32767)));
    buffer.writeInt16LE(sample, 44 + i * 2);
  }
  
  return buffer;
}

const sampleRate = 8000; // Low sample rate to keep file size lightweight for WhatsApp

// 1. Birthday: Playful chime melody (C4-C4-D4-C4-F4-E4)
const birthdayFn = (t) => {
  const noteDuration = 0.4;
  const notes = [
    { freq: 261.63, start: 0, end: 0.3 },
    { freq: 261.63, start: 0.4, end: 0.7 },
    { freq: 293.66, start: 0.8, end: 1.1 },
    { freq: 261.63, start: 1.2, end: 1.5 },
    { freq: 349.23, start: 1.6, end: 1.9 },
    { freq: 329.63, start: 2.0, end: 2.5 },
  ];
  
  let val = 0;
  for (const note of notes) {
    if (t >= note.start && t <= note.end) {
      const dt = t - note.start;
      const envelope = Math.exp(-4 * dt); // Pluck decay
      val += Math.sin(2 * Math.PI * note.freq * t) * envelope * 0.4;
      // Add a higher overtone for a music box sound
      val += Math.sin(2 * Math.PI * note.freq * 2 * t) * envelope * 0.1;
    }
  }
  return val;
};

// 2. Wedding: Shehnai/Dhol-like rhythmic chime
const weddingFn = (t) => {
  // Sitar-like drone (C3 and G3)
  let val = Math.sin(2 * Math.PI * 130.81 * t) * 0.15;
  val += Math.sin(2 * Math.PI * 196.00 * t) * 0.1;
  
  // Shehnai melody notes
  const notes = [
    { freq: 261.63, start: 0, end: 0.5 },
    { freq: 293.66, start: 0.6, end: 1.1 },
    { freq: 329.63, start: 1.2, end: 1.7 },
    { freq: 349.23, start: 1.8, end: 2.3 },
    { freq: 392.00, start: 2.4, end: 3.0 },
  ];
  
  for (const note of notes) {
    if (t >= note.start && t <= note.end) {
      const dt = t - note.start;
      // Add heavy vibrato (sitar jawari)
      const vibrato = 1 + 0.05 * Math.sin(2 * Math.PI * 8 * dt);
      const envelope = (1 - Math.exp(-20 * dt)) * Math.exp(-2 * dt); // Swell envelope
      val += Math.sin(2 * Math.PI * note.freq * vibrato * t) * envelope * 0.5;
    }
  }
  
  // Dhol beat hits (low-pitched drums at t=0, 0.8, 1.6, 2.4)
  const dholTimes = [0, 0.8, 1.6, 2.4];
  for (const dTime of dholTimes) {
    if (t >= dTime && t < dTime + 0.3) {
      const dt = t - dTime;
      const freq = 120 * Math.exp(-15 * dt); // Pitch slide down
      const envelope = Math.exp(-10 * dt);
      val += Math.sin(2 * Math.PI * freq * t) * envelope * 0.3;
    }
  }
  
  return val;
};

// 3. Islamic: Soft spiritual flute
const islamicFn = (t) => {
  const notes = [
    { freq: 329.63, start: 0.2, end: 1.0 },
    { freq: 392.00, start: 1.1, end: 1.9 },
    { freq: 440.00, start: 2.0, end: 2.8 },
    { freq: 392.00, start: 2.9, end: 3.9 },
  ];
  
  let val = 0;
  // Drone
  val += Math.sin(2 * Math.PI * 220 * t) * 0.1 * Math.sin(2 * Math.PI * 0.2 * t); // slow pulsing drone
  
  for (const note of notes) {
    if (t >= note.start && t <= note.end) {
      const dt = t - note.start;
      const vibrato = 1 + 0.02 * Math.sin(2 * Math.PI * 6 * dt);
      const envelope = (1 - Math.exp(-10 * dt)) * Math.exp(-1.5 * dt); // slow attack
      val += Math.sin(2 * Math.PI * note.freq * vibrato * t) * envelope * 0.4;
    }
  }
  
  return val;
};

// 4. General: Soft warm ambient pad
const generalFn = (t) => {
  // Arpeggiated chord C - E - G - C
  const notes = [
    { freq: 261.63, start: 0, end: 2.0 },
    { freq: 329.63, start: 0.3, end: 2.0 },
    { freq: 392.00, start: 0.6, end: 2.0 },
    { freq: 523.25, start: 0.9, end: 2.5 },
  ];
  
  let val = 0;
  for (const note of notes) {
    if (t >= note.start && t <= note.end) {
      const dt = t - note.start;
      const envelope = (1 - Math.exp(-4 * dt)) * Math.exp(-1.5 * dt);
      val += Math.sin(2 * Math.PI * note.freq * t) * envelope * 0.2;
    }
  }
  return val;
};

// Generate files
fs.writeFileSync(path.join(SOUNDS_DIR, 'birthday.mp3'), createWavBuffer(sampleRate, 3.5, birthdayFn));
fs.writeFileSync(path.join(SOUNDS_DIR, 'wedding.mp3'), createWavBuffer(sampleRate, 4.0, weddingFn));
fs.writeFileSync(path.join(SOUNDS_DIR, 'islamic.mp3'), createWavBuffer(sampleRate, 5.0, islamicFn));
fs.writeFileSync(path.join(SOUNDS_DIR, 'general.mp3'), createWavBuffer(sampleRate, 3.5, generalFn));

console.log('Successfully generated traditional sounds in /public/sounds/');
