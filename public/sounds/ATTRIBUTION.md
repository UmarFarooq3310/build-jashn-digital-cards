# Audio File Attribution

## Synthesized Audio Files

The following audio files in this directory are **programmatically synthesized**
and do not incorporate any third-party recordings or samples:

| File | Description |
|------|-------------|
| `birthday-dholki.mp3` | Upbeat dholki-inspired percussive rhythm with pentatonic melody |
| `mehndi-dholki.mp3` | Folk beat dholki rhythm with bhangra-style pattern |
| `wedding-shehnai.mp3` | Melodic shehnai-inspired reed tone over Bhairavi scale with drone |
| `eid-chime.mp3` | Soft inharmonic bell/chime tones with ambient pad |
| `friendship-soft.mp3` | Gentle Cmaj7 ambient pad with tender melodic line |
| `birthday.mp3` | Playful chime melody (C major motif) |
| `wedding.mp3` | Sitar drone + shehnai melody + dhol rhythm |
| `islamic.mp3` | Soft spiritual flute with slow pulsing drone |
| `general.mp3` | Warm arpeggiated ambient pad (C major chord) |

## Generation Method

All files were generated using **Node.js PCM synthesis** — raw mathematical
waveforms (sine oscillators, inharmonic partials, ADSR envelopes, and drum
transient modeling) written directly into valid RIFF/WAV containers.

- Sample rate: 22050 Hz (new files) / 8000 Hz (legacy files)
- Bit depth: 16-bit signed PCM, mono
- Format: RIFF WAV (playable by all browsers and media players)
- Generator script: `scripts/generate-new-sounds.js`

## License

**MIT — freely usable with no restrictions.**

No third-party audio, samples, or recordings were used. No external attribution
is required. You are free to use, modify, and distribute these files in any
project, commercial or otherwise.

Generated: 2026-07-04
