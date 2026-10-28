/**
 * audio-trimmer.ts
 *
 * Client-side audio processing utility that trims any uploaded audio file or data URL
 * (MP3, M4A, WAV, AAC, FLAC, etc.) to the first 10 seconds and resamples to
 * a compact mono 16-bit PCM WAV at 16,000 Hz (~426KB base64 Data URL).
 *
 * This strictly guarantees the resulting audio stays well under Cloud Firestore's
 * 1,048,487 bytes (1MB) document property limit.
 */

export async function trimAudioTo10Seconds(input: File | Blob | string, maxSeconds: number = 10): Promise<string> {
  if (typeof window === 'undefined') {
    throw new Error('Audio trimming must be run in the browser')
  }

  let arrayBuffer: ArrayBuffer
  if (typeof input === 'string') {
    if (input.startsWith('data:') || input.startsWith('blob:')) {
      const res = await fetch(input)
      arrayBuffer = await res.arrayBuffer()
    } else {
      return input
    }
  } else {
    arrayBuffer = await input.arrayBuffer()
  }

  const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext
  if (!AudioCtxClass) {
    throw new Error('AudioContext is not supported on this browser')
  }

  const audioCtx = new AudioCtxClass()
  let decodedBuffer: AudioBuffer
  try {
    decodedBuffer = await audioCtx.decodeAudioData(arrayBuffer)
  } catch (err) {
    await audioCtx.close().catch(() => {})
    throw new Error('Could not decode audio. Please ensure it is a valid MP3, M4A, or WAV file.')
  }
  await audioCtx.close().catch(() => {})

  const targetDuration = Math.min(maxSeconds, decodedBuffer.duration)
  // 16,000 Hz mono 16-bit yields 320KB binary (= 426KB base64) for 10s, safely under Firestore's 1MB limit
  const targetSampleRate = 16000

  const OfflineCtxClass = window.OfflineAudioContext || (window as any).webkitOfflineAudioContext
  if (!OfflineCtxClass) {
    throw new Error('OfflineAudioContext is not supported on this browser')
  }

  const offlineCtx = new OfflineCtxClass(
    1, // mono
    Math.max(1, Math.ceil(targetDuration * targetSampleRate)),
    targetSampleRate
  )

  const source = offlineCtx.createBufferSource()
  source.buffer = decodedBuffer
  source.connect(offlineCtx.destination)
  source.start(0)

  const renderedBuffer = await offlineCtx.startRendering()
  return audioBufferToWavDataUrl(renderedBuffer)
}

function audioBufferToWavDataUrl(buffer: AudioBuffer): string {
  const numChannels = 1
  const sampleRate = buffer.sampleRate
  const format = 1 // PCM
  const bitDepth = 16
  const bytesPerSample = bitDepth / 8
  const blockAlign = numChannels * bytesPerSample

  const channelData = buffer.getChannelData(0)
  const numSamples = channelData.length
  const dataByteLength = numSamples * bytesPerSample
  const bufferByteLength = 44 + dataByteLength

  const arrayBuffer = new ArrayBuffer(bufferByteLength)
  const view = new DataView(arrayBuffer)

  // 1. RIFF chunk descriptor
  writeString(view, 0, 'RIFF')
  view.setUint32(4, 36 + dataByteLength, true)
  writeString(view, 8, 'WAVE')

  // 2. fmt sub-chunk
  writeString(view, 12, 'fmt ')
  view.setUint32(16, 16, true) // SubChunk1Size (16 for PCM)
  view.setUint16(20, format, true) // AudioFormat (1 = PCM)
  view.setUint16(22, numChannels, true) // NumChannels
  view.setUint32(24, sampleRate, true) // SampleRate
  view.setUint32(28, sampleRate * blockAlign, true) // ByteRate
  view.setUint16(32, blockAlign, true) // BlockAlign
  view.setUint16(34, bitDepth, true) // BitsPerSample

  // 3. data sub-chunk
  writeString(view, 36, 'data')
  view.setUint32(40, dataByteLength, true)

  // 4. Write 16-bit PCM samples with clipping prevention
  let offset = 44
  for (let i = 0; i < numSamples; i++) {
    const s = Math.max(-1, Math.min(1, channelData[i]))
    const sample = s < 0 ? s * 0x8000 : s * 0x7fff
    view.setInt16(offset, sample, true)
    offset += 2
  }

  // 5. Convert ArrayBuffer to base64 Data URL safely in chunks
  const bytes = new Uint8Array(arrayBuffer)
  let binary = ''
  const chunkSize = 8192
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize)
    binary += String.fromCharCode.apply(null, chunk as any)
  }

  return `data:audio/wav;base64,${btoa(binary)}`
}

function writeString(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i))
  }
}
