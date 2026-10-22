'use client'

import { recordCardShare } from '@/lib/jashn/magic-service'
import { getDefaultAudioTrackForOccasion } from '@/lib/jashn/audio'
import fixWebmDuration from 'fix-webm-duration'

export interface CardMediaExportOptions {
  element: HTMLElement | null
  fileName?: string
  cardType?: 'invite' | 'wish' | 'vcard' | 'magic' | 'poetry'
  cardSlug?: string
  occasionId?: string
  audioTrack?: string
  audioUrl?: string
  targetAspectRatio?: 'auto' | '9:16' | 'original'
  durationSeconds?: number
  onProgress?: (percent: number) => void
}

let sharedAudioContext: AudioContext | null = null

export function primeAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
  if (!AudioCtx) return null
  try {
    if (!sharedAudioContext || sharedAudioContext.state === 'closed') {
      sharedAudioContext = new AudioCtx()
    }
    if (sharedAudioContext.state === 'suspended') {
      sharedAudioContext.resume().catch(() => {})
    }
    return sharedAudioContext
  } catch {
    return null
  }
}

/**
 * Checks for true native MP4 support.
 * Notice: Most Android devices ONLY support WebM in MediaRecorder.
 */
function getBestVideoMimeType(): { mimeType: string; isRealMp4: boolean } {
  if (typeof window === 'undefined' || typeof MediaRecorder === 'undefined') {
    return { mimeType: 'video/webm', isRealMp4: false }
  }

  // Only consider it real MP4 if the browser genuinely supports recording MP4 (Safari / iOS)
  const mp4Types = [
    'video/mp4;codecs=avc1.42E01E,mp4a.40.2',
    'video/mp4;codecs=avc1',
    'video/mp4',
  ]

  for (const mime of mp4Types) {
    if (MediaRecorder.isTypeSupported(mime)) {
      return { mimeType: mime, isRealMp4: true }
    }
  }

  const webmTypes = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm;codecs=h264',
    'video/webm',
  ]

  for (const mime of webmTypes) {
    if (MediaRecorder.isTypeSupported(mime)) {
      return { mimeType: mime, isRealMp4: false }
    }
  }

  return { mimeType: 'video/webm', isRealMp4: false }
}

/**
 * Duration metadata is now handled by the `fix-webm-duration` package, which
 * properly parses the EBML structure and INSERTS the Duration element when it is
 * missing (the case on Android Chrome). The previous custom implementation could
 * only patch an existing Duration tag and silently returned the unpatched blob
 * when the tag was absent — causing Android media players, Instagram, and
 * Facebook to show "00:01" instead of the real duration.
 */

// ── FFmpeg.wasm for WebM → MP4 conversion ──
// Android Chrome can only record WebM via MediaRecorder. We transcode the
// resulting WebM to H.264/AAC MP4 using ffmpeg.wasm so the final file works
// everywhere — Instagram, Facebook, Android Gallery, WhatsApp status, etc.

let ffmpegInstance: any = null
let ffmpegLoadPromise: Promise<any> | null = null

async function getFFmpegInstance(): Promise<any> {
  if (ffmpegInstance?.loaded) return ffmpegInstance
  if (ffmpegLoadPromise) return ffmpegLoadPromise

  ffmpegLoadPromise = (async () => {
    const { FFmpeg } = await import('@ffmpeg/ffmpeg')
    const { toBlobURL } = await import('@ffmpeg/util')

    const ffmpeg = new FFmpeg()
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.9/dist/umd'
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    })

    ffmpegInstance = ffmpeg
    return ffmpeg
  })()

  try {
    return await ffmpegLoadPromise
  } catch (err) {
    ffmpegLoadPromise = null
    throw err
  }
}

async function convertWebmToMp4(
  webmBlob: Blob,
  onProgress?: (percent: number) => void
): Promise<Blob | null> {
  try {
    const ffmpeg = await getFFmpegInstance()

    let progressCb: ((e: { progress: number; time: number }) => void) | undefined
    if (onProgress) {
      progressCb = ({ progress }) => {
        // Map ffmpeg 0.0-1.0 to 85-99 (recording already covered 0-84)
        onProgress(Math.min(99, 85 + Math.round(progress * 14)))
      }
      ffmpeg.on('progress', progressCb)
    }

    try {
      const inputData = new Uint8Array(await webmBlob.arrayBuffer())
      await ffmpeg.writeFile('input.webm', inputData)

      await ffmpeg.exec([
        '-i', 'input.webm',
        '-c:v', 'libx264',
        '-preset', 'ultrafast',
        '-crf', '23',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-movflags', '+faststart',
        'output.mp4',
      ])

      const outputData = await ffmpeg.readFile('output.mp4')
      const mp4Blob = new Blob([outputData as Uint8Array], { type: 'video/mp4' })

      try {
        await ffmpeg.deleteFile('input.webm')
        await ffmpeg.deleteFile('output.mp4')
      } catch {}

      return mp4Blob
    } finally {
      if (progressCb) {
        ffmpeg.off('progress', progressCb)
      }
    }
  } catch (err) {
    console.error('FFmpeg conversion failed, falling back to WebM:', extractErrorMessage(err))
    return null
  }
}

function resolveSoundUrl(audioTrack?: string, cardType?: string, occasionId?: string): string {
  if (occasionId) {
    const cleanOccasion = occasionId.toLowerCase().trim()
    if (
      cleanOccasion.includes('condolence') ||
      cleanOccasion.includes('sympathy') ||
      cleanOccasion.includes('ashura') ||
      cleanOccasion.includes('chehlum') ||
      cleanOccasion.includes('chelum') ||
      cleanOccasion.includes('majlis')
    ) {
      if (!audioTrack || audioTrack === 'none' || audioTrack === 'birthday-dholki' || audioTrack === 'birthday-festive') {
        return ''
      }
    }
  }

  if (audioTrack && audioTrack !== 'none') {
    if (audioTrack.startsWith('/')) return audioTrack
    const trackMap: Record<string, string> = {
      'friendship-soft': '/sounds/friendship-soft.m4a',
      'friendship': '/sounds/friendship-soft.m4a',
      'soft': '/sounds/friendship-soft.m4a',
      'poetry': '/sounds/friendship-soft.m4a',
      'wedding-shehnai': '/sounds/wedding-shehnai.m4a',
      'wedding': '/sounds/wedding.m4a',
      'punjabi-bhangra': '/sounds/mehndi-dholki.m4a',
      'punjabi-bhangra-dhol': '/sounds/mehndi-dholki.m4a',
      'dholak-tappe': '/sounds/mehndi-dholki.m4a',
      'birthday-festive': '/sounds/birthday-dholki.m4a',
      'birthday-dholki': '/sounds/birthday-dholki.m4a',
      'birthday': '/sounds/birthday.m4a',
      'indian-sitar': '/sounds/wedding.m4a',
      'indian-sitar-classical': '/sounds/wedding.m4a',
      'romantic-strings': '/sounds/romantic-strings.m4a',
      'romantic-piano': '/sounds/romantic-piano.m4a',
      'islamic-oud': '/sounds/islamic.m4a',
      'islamic-chime': '/sounds/eid-chime.m4a',
      'sufi-harmonium': '/sounds/sufi-harmonium.m4a',
      'corporate-ambient': '/sounds/corporate-ambient.m4a',
      'celebration-party': '/sounds/celebration-party.m4a',
      'festive-garba': '/sounds/festive.m4a',
      'baby-lullaby': '/sounds/baby-lullaby.m4a',
      'holiday-bells': '/sounds/holiday-bells.m4a',
      'festive': '/sounds/festive.m4a',
      'general': '/sounds/general.m4a',
    }
    if (trackMap[audioTrack]) return trackMap[audioTrack]
  }

  if (occasionId) {
    const defaultOccasionTrack = getDefaultAudioTrackForOccasion(occasionId)
    if (defaultOccasionTrack === 'none') return ''
    if (defaultOccasionTrack) {
      const trackMap: Record<string, string> = {
        'wedding-shehnai': '/sounds/wedding-shehnai.m4a',
        'punjabi-bhangra': '/sounds/mehndi-dholki.m4a',
        'dholak-tappe': '/sounds/mehndi-dholki.m4a',
        'birthday-festive': '/sounds/birthday-dholki.m4a',
        'birthday-dholki': '/sounds/birthday-dholki.m4a',
        'indian-sitar': '/sounds/wedding.m4a',
        'romantic-strings': '/sounds/romantic-strings.m4a',
        'romantic-piano': '/sounds/romantic-piano.m4a',
        'islamic-oud': '/sounds/islamic.m4a',
        'islamic-chime': '/sounds/eid-chime.m4a',
        'sufi-harmonium': '/sounds/sufi-harmonium.m4a',
        'corporate-ambient': '/sounds/corporate-ambient.m4a',
        'celebration-party': '/sounds/celebration-party.m4a',
        'festive-garba': '/sounds/festive.m4a',
        'baby-lullaby': '/sounds/baby-lullaby.m4a',
        'holiday-bells': '/sounds/holiday-bells.m4a',
        'festive': '/sounds/festive.m4a',
        'general': '/sounds/general.m4a',
      }
      if (trackMap[defaultOccasionTrack]) return trackMap[defaultOccasionTrack]
    }
  }

  if (cardType === 'poetry') return '/sounds/friendship-soft.m4a'
  if (cardType === 'invite') return '/sounds/wedding-shehnai.m4a'
  if (cardType === 'vcard') return '/sounds/corporate-ambient.m4a'
  if (cardType === 'wish') return '/sounds/birthday-dholki.m4a'
  return '/sounds/festive.m4a'
}

function extractErrorMessage(e: unknown): string {
  if (!e) return 'Empty error'
  if (e instanceof Error) return e.message
  if (e instanceof Event) return `Event: ${e.type}`
  if (typeof e === 'string') return e
  return String(e)
}

/**
 * Captures a DOM element to an HTMLCanvasElement using html-to-image.
 * Used by both downloadCardVideo and downloadCardPng so they share the
 * same capture logic, and downloadCardVideo can use the memory-efficient
 * blob-URL path instead of a large base64 data URL string.
 */
async function captureCardCanvas(element: HTMLElement): Promise<HTMLCanvasElement> {
  const { toCanvas } = await import('html-to-image')

  const originalCssRules = Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype, 'cssRules')
  if (originalCssRules) {
    Object.defineProperty(CSSStyleSheet.prototype, 'cssRules', {
      configurable: true,
      get() {
        try {
          return originalCssRules.get!.call(this)
        } catch {
          return []
        }
      },
    })
  }

  const rect = element.getBoundingClientRect()
  const offsetW = element.offsetWidth || 0
  const rectW = Math.round(rect.width) || 0
  const naturalWidth = Math.max(offsetW || rectW, 320)

  const offsetH = element.offsetHeight || 0
  const rectH = Math.round(rect.height) || 0
  const naturalHeight = Math.max(offsetH || rectH, 280)

  const TRANSPARENT_PIXEL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQABNjN9GQAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAA0lEQVQI12P4z8BQDwAEgAF/QualzQAAAABJRU5ErkJggg=='

  const captureOptions = {
    cacheBust: true,
    filter: (node: Node) => {
      const el = node as HTMLElement
      if (!el || !el.tagName) return true
      if (['IFRAME', 'SCRIPT', 'INS'].includes(el.tagName)) return false
      if (el.hasAttribute && (el.hasAttribute('data-no-download') || el.hasAttribute('data-export-ignore'))) return false
      if (el.classList && (el.classList.contains('no-export') || el.classList.contains('no-download'))) return false
      return true
    },
    width: naturalWidth,
    height: naturalHeight,
    pixelRatio: 2,
    imagePlaceholder: TRANSPARENT_PIXEL,
    skipFonts: false,
    fetchRequestInit: { cache: 'force-cache' as RequestCache },
    style: {
      overflow: 'hidden',
      transform: 'none',
      transformOrigin: 'top left',
      margin: '0',
      position: 'relative',
      animation: 'none',
      transition: 'none',
      boxSizing: 'border-box',
      maxWidth: `${naturalWidth}px`,
      minWidth: `${naturalWidth}px`,
      width: `${naturalWidth}px`,
      height: `${naturalHeight}px`,
    },
  }

  try {
    return await toCanvas(element, captureOptions)
  } catch {
    return await toCanvas(element, { ...captureOptions, skipFonts: true, pixelRatio: 1 })
  } finally {
    if (originalCssRules) {
      Object.defineProperty(CSSStyleSheet.prototype, 'cssRules', originalCssRules)
    }
  }
}

async function captureCardDataUrl(element: HTMLElement): Promise<string> {
  const canvas = await captureCardCanvas(element)
  return canvas.toDataURL('image/png')
}

/**
 * Converts a canvas to an Image using blob URLs for mobile memory efficiency.
 * canvas.toDataURL on a large canvas produces a multi-MB base64 string that
 * can cause Image loading to fail on Android — which forces a fallback to
 * MediaRecorder (known "00:01" duration bug). Blob URLs are far lighter.
 * Returns the Image and the URL so the caller can revoke it after use.
 */
async function canvasToImage(canvas: HTMLCanvasElement): Promise<{ img: HTMLImageElement; imgUrl: string }> {
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/png')
  )

  let imgUrl: string
  if (blob && blob.size > 0) {
    imgUrl = URL.createObjectURL(blob)
  } else {
    // Fallback for very old browsers without toBlob
    imgUrl = canvas.toDataURL('image/png')
  }

  const img = new Image()
  img.src = imgUrl
  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = () => reject(new Error('Image load failed'))
  })

  return { img, imgUrl }
}

export async function downloadCardPng({
  element,
  fileName = 'cardzy-card',
  cardType,
  cardSlug,
}: CardMediaExportOptions): Promise<boolean> {
  if (!element) return false

  try {
    if (cardType && cardSlug && cardType !== 'poetry') {
      recordCardShare(cardType, cardSlug, 'image')
    }

    const dataUrl = await captureCardDataUrl(element)
    const link = document.createElement('a')
    link.download = `${fileName}.png`
    link.href = dataUrl
    link.click()
    return true
  } catch (e) {
    console.error('PNG download failed:', e)
    return false
  }
}

function drawDiamondStar(
  c: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  opacity: number,
  rotation: number
) {
  if (opacity <= 0.01) return
  c.save()
  c.translate(cx, cy)
  c.rotate(rotation)

  c.beginPath()
  c.arc(0, 0, size * 0.8, 0, Math.PI * 2)
  c.fillStyle = `rgba(255, 230, 150, ${opacity * 0.22})`
  c.fill()

  c.beginPath()
  for (let i = 0; i < 4; i++) {
    c.lineTo(Math.cos((i * Math.PI) / 2) * size, Math.sin((i * Math.PI) / 2) * size)
    c.lineTo(
      Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.22),
      Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.22)
    )
  }
  c.closePath()
  c.fillStyle = `rgba(255, 250, 220, ${opacity * 0.95})`
  c.fill()
  c.restore()
}

/**
 * Records the card video using WebCodecs API + mp4-muxer.
 * Produces a true H.264/AAC MP4 directly — no WebM, no ffmpeg.wasm, no CDN download.
 * Works on Chrome 94+ (including Android Chrome) and Safari 16.4+.
 */
async function recordImageAsMp4WebCodecs({
  img,
  fileName = 'cardzy-card',
  cardType,
  occasionId,
  audioTrack,
  audioUrl,
  durationSeconds = 10,
  onProgress,
}: {
  img: HTMLImageElement
  fileName?: string
  cardType?: 'invite' | 'wish' | 'vcard' | 'magic' | 'poetry'
  occasionId?: string
  audioTrack?: string
  audioUrl?: string
  durationSeconds?: number
  onProgress?: (percent: number) => void
}): Promise<boolean> {
  const DURATION_SEC = Math.max(5, durationSeconds || 10)
  const DURATION_MS = DURATION_SEC * 1000

  // ── Canvas setup ──
  const MAX_VIDEO_WIDTH = 720
  let targetWidth = img.naturalWidth || img.width || 720
  let targetHeight = img.naturalHeight || img.height || 1280

  if (targetWidth > MAX_VIDEO_WIDTH) {
    const scale = MAX_VIDEO_WIDTH / targetWidth
    targetWidth = MAX_VIDEO_WIDTH
    targetHeight = Math.round(targetHeight * scale)
  } else if (targetWidth < 480) {
    const scale = 480 / targetWidth
    targetWidth = 480
    targetHeight = Math.round(targetHeight * scale)
  }
  if (targetWidth % 2 !== 0) targetWidth += 1
  if (targetHeight % 2 !== 0) targetHeight += 1

  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight
  const ctx = canvas.getContext('2d', { alpha: false })
  if (!ctx) throw new Error('Canvas 2D context not supported')
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  // ── Check WebCodecs + H.264 support ──
  if (typeof VideoEncoder === 'undefined' || typeof AudioEncoder === 'undefined') {
    throw new Error('WebCodecs not supported')
  }

  const codecCandidates = ['avc1.4D401F', 'avc1.42E01F', 'avc1.64001F']
  let videoConfig: VideoEncoderConfig | null = null
  for (const codec of codecCandidates) {
    const cfg: VideoEncoderConfig = {
      codec,
      width: targetWidth,
      height: targetHeight,
      bitrate: 4_500_000,
      framerate: 30,
      avc: { format: 'avc' },
    }
    try {
      const support = await VideoEncoder.isConfigSupported(cfg)
      if (support.supported) {
        videoConfig = cfg
        break
      }
    } catch {}
  }
  if (!videoConfig) throw new Error('No H.264 codec supported')

  // ── Render audio offline ──
  const SAMPLE_RATE = 44100
  const NUM_CHANNELS = 2
  const totalAudioSamples = Math.ceil(SAMPLE_RATE * DURATION_SEC)
  const offlineCtx = new OfflineAudioContext(NUM_CHANNELS, totalAudioSamples, SAMPLE_RATE)

  const soundSrc = resolveSoundUrl(audioTrack || audioUrl, cardType, occasionId)
  if (soundSrc) {
    try {
      const res = await fetch(soundSrc)
      if (res.ok) {
        const arr = await res.arrayBuffer()
        const audioBuf = await offlineCtx.decodeAudioData(arr)
        const srcNode = offlineCtx.createBufferSource()
        srcNode.buffer = audioBuf
        srcNode.loop = true

        const gain = offlineCtx.createGain()
        gain.gain.setValueAtTime(0.001, 0)
        gain.gain.exponentialRampToValueAtTime(0.75, 0.35)
        const fadeOutStart = Math.max(0.5, DURATION_SEC - 0.8)
        gain.gain.setValueAtTime(0.75, fadeOutStart)
        gain.gain.exponentialRampToValueAtTime(0.001, DURATION_SEC)

        srcNode.connect(gain)
        gain.connect(offlineCtx.destination)
        srcNode.start(0)
      }
    } catch {}
  }

  const renderedAudio = await offlineCtx.startRendering()
  const audioChannels = Math.min(renderedAudio.numberOfChannels, NUM_CHANNELS)

  // ── Set up mp4-muxer ──
  const { Muxer, ArrayBufferTarget } = await import('mp4-muxer')
  const muxer = new Muxer({
    target: new ArrayBufferTarget(),
    video: {
      codec: 'avc',
      width: targetWidth,
      height: targetHeight,
      frameRate: 30,
    },
    audio: {
      codec: 'aac',
      sampleRate: SAMPLE_RATE,
      numberOfChannels: NUM_CHANNELS,
    },
    fastStart: 'in-memory',
    firstTimestampBehavior: 'offset',
  })

  // ── Set up video encoder ──
  let videoError: Error | null = null
  const videoEncoder = new VideoEncoder({
    output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
    error: (e) => { videoError = e instanceof Error ? e : new Error(String(e)) },
  })
  videoEncoder.configure(videoConfig)

  // ── Set up audio encoder ──
  let audioError: Error | null = null
  const audioEncoder = new AudioEncoder({
    output: (chunk, meta) => muxer.addAudioChunk(chunk, meta),
    error: (e) => { audioError = e instanceof Error ? e : new Error(String(e)) },
  })
  audioEncoder.configure({
    codec: 'mp4a.40.2',
    sampleRate: SAMPLE_RATE,
    numberOfChannels: NUM_CHANNELS,
    bitrate: 128000,
  })

  // ── Encode audio in 1024-sample chunks ──
  const channelData: Float32Array[] = []
  for (let ch = 0; ch < audioChannels; ch++) {
    channelData.push(renderedAudio.getChannelData(ch))
  }

  for (let offset = 0; offset < totalAudioSamples; offset += 1024) {
    const frameCount = Math.min(1024, totalAudioSamples - offset)
    const planar = new Float32Array(frameCount * NUM_CHANNELS)
    for (let ch = 0; ch < NUM_CHANNELS; ch++) {
      const src = ch < audioChannels ? channelData[ch] : channelData[0]
      planar.set(src.subarray(offset, offset + frameCount), ch * frameCount)
    }

    const audioData = new AudioData({
      format: 'f32-planar',
      sampleRate: SAMPLE_RATE,
      numberOfFrames: frameCount,
      numberOfChannels: NUM_CHANNELS,
      data: planar,
      timestamp: Math.round((offset / SAMPLE_RATE) * 1_000_000),
    })
    audioEncoder.encode(audioData)
    audioData.close()

    if (audioEncoder.encodeQueueSize > 10) {
      await new Promise((r) => setTimeout(r, 0))
    }
  }

  // ── Animation setup ──
  const FPS = 30
  const FRAME_DURATION_US = Math.round(1_000_000 / FPS)
  const TOTAL_FRAMES = Math.round(DURATION_SEC * FPS)
  const dt = 1 / FPS
  const dtFactor = dt * 60

  const ribbons = Array.from({ length: 40 }).map(() => ({
    x: Math.random() * targetWidth,
    y: Math.random() * targetHeight * 1.5 - targetHeight * 0.5,
    w: Math.random() * 6 + 8,
    h: Math.random() * 8 + 10,
    vx: (Math.random() - 0.5) * 1.2,
    vy: Math.random() * 2 + 2.5,
    rotX: Math.random() * Math.PI * 2,
    rotY: Math.random() * Math.PI * 2,
    rotZ: Math.random() * Math.PI * 2,
    speedX: Math.random() * 0.08 + 0.04,
    speedY: Math.random() * 0.09 + 0.05,
    speedZ: (Math.random() - 0.5) * 0.05,
    wobbleSpeed: Math.random() * 2.5 + 1.5,
    wobbleOffset: Math.random() * Math.PI * 2,
    color: ['#FFD700', '#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#EC4899'][Math.floor(Math.random() * 6)],
  }))

  const stars = Array.from({ length: 14 }).map(() => ({
    x: Math.random() * targetWidth,
    y: Math.random() * targetHeight,
    size: Math.random() * 6 + 4,
    twinkleSpeed: Math.random() * 3 + 2,
    twinkleOffset: Math.random() * Math.PI * 2,
    speedY: Math.random() * 0.4 + 0.2,
    rotSpeed: (Math.random() - 0.5) * 0.04,
    wobbleOffset: Math.random() * Math.PI * 2,
  }))

  // ── Encode video frames ──
  for (let frameIdx = 0; frameIdx < TOTAL_FRAMES; frameIdx++) {
    const t = frameIdx / FPS

    // Draw frame (same animation as MediaRecorder path)
    ctx.clearRect(0, 0, targetWidth, targetHeight)
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

    // Micro-pixel noise
    ctx.fillStyle = (frameIdx % 2 === 0) ? 'rgba(255,255,255,0.008)' : 'rgba(0,0,0,0.008)'
    ctx.fillRect(0, 0, 2, 2)

    // Shimmer sheen sweep
    const sheenPeriod = 2.4
    const cycleProgress = (t % sheenPeriod) / sheenPeriod
    const sheenAlpha = Math.sin(cycleProgress * Math.PI) * 0.8
    const sheenPos = -targetWidth * 0.4 + cycleProgress * (targetWidth * 1.8)
    ctx.save()
    ctx.globalCompositeOperation = 'screen'
    const beamGrad = ctx.createLinearGradient(sheenPos, 0, sheenPos + targetWidth * 0.35, targetHeight)
    beamGrad.addColorStop(0, 'rgba(255,255,255,0)')
    beamGrad.addColorStop(0.5, `rgba(255,255,255,${0.75 * sheenAlpha})`)
    beamGrad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = beamGrad
    ctx.fillRect(0, 0, targetWidth, targetHeight)
    ctx.restore()

    // Confetti ribbons
    ctx.save()
    ribbons.forEach((r) => {
      r.y += r.vy * dtFactor
      r.x += (r.vx + Math.sin(t * r.wobbleSpeed + r.wobbleOffset) * 0.8) * dtFactor
      r.rotX += r.speedX * dtFactor
      r.rotY += r.speedY * dtFactor
      r.rotZ += r.speedZ * dtFactor
      if (r.y > targetHeight + 30) { r.y = -30; r.x = Math.random() * targetWidth }
      ctx.save()
      ctx.translate(r.x, r.y)
      ctx.rotate(r.rotZ)
      ctx.scale(Math.cos(r.rotY), Math.sin(r.rotX))
      ctx.fillStyle = r.color
      ctx.fillRect(-r.w / 2, -r.h / 2, r.w, r.h)
      ctx.restore()
    })
    ctx.restore()

    // Diamond stars
    ctx.save()
    ctx.globalCompositeOperation = 'screen'
    stars.forEach((s) => {
      s.y -= s.speedY * dtFactor
      if (s.y < -20) { s.y = targetHeight + 20; s.x = Math.random() * targetWidth }
      const posX = s.x + Math.sin(t * 1.5 + s.wobbleOffset) * 6
      const twinkle = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset)
      drawDiamondStar(ctx, posX, s.y, s.size, twinkle, t * s.rotSpeed)
    })
    ctx.restore()

    // Create and encode video frame
    const videoFrame = new VideoFrame(canvas, {
      timestamp: frameIdx * FRAME_DURATION_US,
      duration: FRAME_DURATION_US,
    })
    videoEncoder.encode(videoFrame, {
      keyFrame: frameIdx === 0 || frameIdx % (FPS * 2) === 0,
    })
    videoFrame.close()

    // Progress (0-84% for encoding phase)
    if (onProgress) onProgress(Math.min(84, Math.round((frameIdx / TOTAL_FRAMES) * 84)))

    // Backpressure: if encoder queue is too deep, wait
    if (videoEncoder.encodeQueueSize > 10) {
      while (videoEncoder.encodeQueueSize > 5) {
        await new Promise((r) => setTimeout(r, 1))
      }
    }

    if (videoError) throw videoError
  }

  // ── Flush encoders ──
  if (onProgress) onProgress(88)
  await videoEncoder.flush()
  if (onProgress) onProgress(94)
  await audioEncoder.flush()
  videoEncoder.close()
  audioEncoder.close()

  if (videoError) throw videoError

  // ── Finalize muxer ──
  muxer.finalize()
  if (onProgress) onProgress(100)

  // ── Create and download MP4 ──
  const { buffer } = muxer.target as InstanceType<typeof ArrayBufferTarget>
  if (!buffer || buffer.byteLength === 0) throw new Error('MP4 encoding produced empty file')

  const mp4Blob = new Blob([buffer], { type: 'video/mp4' })
  const cleanName = fileName.endsWith('.mp4') ? fileName : `${fileName}.mp4`
  const blobUrl = URL.createObjectURL(mp4Blob)
  const link = document.createElement('a')
  link.download = cleanName
  link.href = blobUrl
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  setTimeout(() => {
    document.body.removeChild(link)
    URL.revokeObjectURL(blobUrl)
  }, 8000)

  return true
}

/**
 * Animates and records the card video.
 * Solves the 00:01 / 25fps bug on Android video players.
 */
export async function recordImageAsVideo({
  img,
  fileName = 'cardzy-card',
  cardType,
  occasionId,
  audioTrack,
  audioUrl,
  durationSeconds = 10,
  onProgress,
}: {
  img: HTMLImageElement
  fileName?: string
  cardType?: 'invite' | 'wish' | 'vcard' | 'magic' | 'poetry'
  occasionId?: string
  audioTrack?: string
  audioUrl?: string
  targetAspectRatio?: 'auto' | '9:16' | 'original'
  durationSeconds?: number
  onProgress?: (percent: number) => void
}): Promise<boolean> {
  // ── Try WebCodecs first (native H.264 → MP4, no downloads needed) ──
  if (typeof window !== 'undefined' &&
      typeof VideoEncoder !== 'undefined' &&
      typeof AudioEncoder !== 'undefined') {
    try {
      const result = await recordImageAsMp4WebCodecs({
        img,
        fileName,
        cardType,
        occasionId,
        audioTrack,
        audioUrl,
        durationSeconds,
        onProgress,
      })
      if (result) return result
    } catch (e) {
      console.error('WebCodecs MP4 recording failed, falling back to MediaRecorder:', extractErrorMessage(e))
    }
  }

  // ── Fallback: MediaRecorder → WebM → fix duration → ffmpeg.wasm → MP4 ──
  const DURATION_SEC = Math.max(5, durationSeconds || 10)
  const DURATION_MS = DURATION_SEC * 1000

  // Standard 720p resolution with guaranteed even pixel boundaries
  const MAX_VIDEO_WIDTH = 720
  let targetWidth = img.naturalWidth || img.width || 720
  let targetHeight = img.naturalHeight || img.height || 1280

  if (targetWidth > MAX_VIDEO_WIDTH) {
    const scale = MAX_VIDEO_WIDTH / targetWidth
    targetWidth = MAX_VIDEO_WIDTH
    targetHeight = Math.round(targetHeight * scale)
  } else if (targetWidth < 480) {
    const scale = 480 / targetWidth
    targetWidth = 480
    targetHeight = Math.round(targetHeight * scale)
  }

  if (targetWidth % 2 !== 0) targetWidth += 1
  if (targetHeight % 2 !== 0) targetHeight += 1

  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight
  const ctx = canvas.getContext('2d', { alpha: false })
  if (!ctx) throw new Error('Canvas 2D context not supported')
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  // Explicit 30 FPS stream for Android hardware encoder
  const captureStreamFn = canvas.captureStream || (canvas as any).mozCaptureStream
  if (!captureStreamFn || typeof MediaRecorder === 'undefined') {
    throw new Error('Video recording not supported on this browser')
  }

  const canvasStream: MediaStream = captureStreamFn.call(canvas, 30)

  // ── Audio Track Setup ──
  let audioContext: AudioContext | null = null
  let audioTrackNode: MediaStreamTrack | null = null

  if (typeof window !== 'undefined') {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
    if (AudioCtx) {
      try {
        audioContext = new AudioCtx()
        if (audioContext.state === 'suspended') {
          await audioContext.resume().catch(() => {})
        }

        const soundSrc = resolveSoundUrl(audioTrack || audioUrl, cardType, occasionId)
        let audioLoaded = false

        if (soundSrc) {
          try {
            const res = await fetch(soundSrc)
            if (res.ok) {
              const arr = await res.arrayBuffer()
              const audioBuf = await audioContext.decodeAudioData(arr)
              const srcNode = audioContext.createBufferSource()
              srcNode.buffer = audioBuf
              srcNode.loop = true

              const gain = audioContext.createGain()
              gain.gain.setValueAtTime(0.001, audioContext.currentTime)
              gain.gain.exponentialRampToValueAtTime(0.75, audioContext.currentTime + 0.35)
              const fadeOutStart = Math.max(0.5, DURATION_SEC - 0.8)
              gain.gain.setValueAtTime(0.75, audioContext.currentTime + fadeOutStart)
              gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + DURATION_SEC)

              const dest = audioContext.createMediaStreamDestination()
              srcNode.connect(gain)
              gain.connect(dest)
              srcNode.start(0)

              const tracks = dest.stream.getAudioTracks()
              if (tracks.length > 0) {
                audioTrackNode = tracks[0]
                audioLoaded = true
              }
            }
          } catch {}
        }

        // Ambient sub-audible oscillator prevents Android stream stalling if audio fails
        if (!audioLoaded) {
          const osc = audioContext.createOscillator()
          const gain = audioContext.createGain()
          gain.gain.value = 0.0001
          osc.frequency.value = 440

          const dest = audioContext.createMediaStreamDestination()
          osc.connect(gain)
          gain.connect(dest)
          osc.start()

          const tracks = dest.stream.getAudioTracks()
          if (tracks.length > 0) {
            audioTrackNode = tracks[0]
          }
        }
      } catch {}
    }
  }

  const streamTracks: MediaStreamTrack[] = [...canvasStream.getVideoTracks()]
  if (audioTrackNode) {
    streamTracks.push(audioTrackNode)
  }
  const stream = new MediaStream(streamTracks)

  const { mimeType: chosenMime, isRealMp4 } = getBestVideoMimeType()

  // Preload FFmpeg in the background while recording if we'll need WebM→MP4 conversion.
  // This overlaps the ~30MB core download with the 10-14s recording to save time.
  if (!isRealMp4) {
    getFFmpegInstance().catch(() => {})
  }

  let recorder: MediaRecorder
  try {
    recorder = new MediaRecorder(stream, {
      mimeType: chosenMime,
      videoBitsPerSecond: 4_500_000,
    })
  } catch {
    try {
      recorder = new MediaRecorder(stream, { mimeType: chosenMime })
    } catch {
      recorder = new MediaRecorder(stream)
    }
  }

  const actualMime = recorder.mimeType || chosenMime
  const chunks: BlobPart[] = []

  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) {
      chunks.push(e.data)
    }
  }

  let animId: number | null = null

  const cleanupAudio = () => {
    if (audioContext && audioContext.state !== 'closed') {
      try { audioContext.close() } catch {}
    }
    if (audioTrackNode) {
      try { audioTrackNode.stop() } catch {}
    }
  }

  const recordingPromise = new Promise<void>((resolve, reject) => {
    recorder.onerror = (ev) => {
      if (animId) cancelAnimationFrame(animId)
      cleanupAudio()
      reject(new Error(`MediaRecorder error: ${(ev as any)?.error?.message || 'recording failed'}`))
    }

    recorder.onstop = async () => {
      if (animId) cancelAnimationFrame(animId)
      cleanupAudio()

      try {
        let blob = new Blob(chunks, { type: actualMime })
        if (blob.size === 0) {
          reject(new Error('Video recording produced an empty file'))
          return
        }

        // CRITICAL: Fix WebM duration metadata if not true MP4.
        // Android Chrome's MediaRecorder produces WebM files WITHOUT a Duration
        // element in the EBML header. The fix-webm-duration package properly parses
        // the EBML structure and INSERTS the Duration element when missing — fixing
        // the "00:01" bug in Android media players, Instagram, and Facebook.
        if (!isRealMp4 && (actualMime.includes('webm') || blob.type.includes('webm'))) {
          try {
            blob = await fixWebmDuration(blob, DURATION_MS, { logger: false })
          } catch {}
        }

        // Convert WebM → MP4 (H.264/AAC) for maximum compatibility with
        // Instagram, Facebook, WhatsApp status, and Android Gallery.
        // Falls back to .webm download if ffmpeg conversion fails.
        let finalBlob = blob
        let ext = isRealMp4 ? 'mp4' : 'webm'

        if (!isRealMp4 && blob.type.includes('webm')) {
          const mp4Blob = await convertWebmToMp4(blob, onProgress)
          if (mp4Blob && mp4Blob.size > 0) {
            finalBlob = mp4Blob
            ext = 'mp4'
          }
        }

        if (onProgress) onProgress(100)

        const cleanName = fileName.endsWith(`.${ext}`) ? fileName : `${fileName}.${ext}`
        const blobUrl = URL.createObjectURL(finalBlob)
        const link = document.createElement('a')
        link.download = cleanName
        link.href = blobUrl
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()

        setTimeout(() => {
          document.body.removeChild(link)
          URL.revokeObjectURL(blobUrl)
        }, 8000)

        resolve()
      } catch (err) {
        reject(err)
      }
    }
  })

  // Flush video chunks every 500ms
  try {
    recorder.start(500)
  } catch {
    recorder.start()
  }

  const startTime = performance.now()
  let lastFrameTime = startTime

  const ribbons = Array.from({ length: 40 }).map(() => ({
    x: Math.random() * targetWidth,
    y: Math.random() * targetHeight * 1.5 - targetHeight * 0.5,
    w: Math.random() * 6 + 8,
    h: Math.random() * 8 + 10,
    vx: (Math.random() - 0.5) * 1.2,
    vy: Math.random() * 2 + 2.5,
    rotX: Math.random() * Math.PI * 2,
    rotY: Math.random() * Math.PI * 2,
    rotZ: Math.random() * Math.PI * 2,
    speedX: Math.random() * 0.08 + 0.04,
    speedY: Math.random() * 0.09 + 0.05,
    speedZ: (Math.random() - 0.5) * 0.05,
    wobbleSpeed: Math.random() * 2.5 + 1.5,
    wobbleOffset: Math.random() * Math.PI * 2,
    color: ['#FFD700', '#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#EC4899'][Math.floor(Math.random() * 6)],
  }))

  const stars = Array.from({ length: 14 }).map(() => ({
    x: Math.random() * targetWidth,
    y: Math.random() * targetHeight,
    size: Math.random() * 6 + 4,
    twinkleSpeed: Math.random() * 3 + 2,
    twinkleOffset: Math.random() * Math.PI * 2,
    speedY: Math.random() * 0.4 + 0.2,
    rotSpeed: (Math.random() - 0.5) * 0.04,
    wobbleOffset: Math.random() * Math.PI * 2,
  }))

  return await new Promise<boolean>((resolve) => {
    const drawFrame = () => {
      const now = performance.now()
      const elapsed = now - startTime
      const t = Math.min(DURATION_SEC, elapsed / 1000)
      const dt = Math.min(0.05, Math.max(0.001, (now - lastFrameTime) / 1000))
      lastFrameTime = now
      const dtFactor = dt * 60

      ctx.clearRect(0, 0, targetWidth, targetHeight)

      // 1. Draw base card
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

      // 2. Micro-pixel noise to force Android GPU hardware encoder to serialize every frame
      ctx.fillStyle = (Math.floor(elapsed / 100) % 2 === 0) ? 'rgba(255, 255, 255, 0.008)' : 'rgba(0, 0, 0, 0.008)'
      ctx.fillRect(0, 0, 2, 2)

      // 3. Shimmer sheen sweep
      const sheenPeriod = 2.4
      const cycleProgress = (t % sheenPeriod) / sheenPeriod
      const sheenAlpha = Math.sin(cycleProgress * Math.PI) * 0.8
      const sheenPos = -targetWidth * 0.4 + cycleProgress * (targetWidth * 1.8)

      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      const beamGrad = ctx.createLinearGradient(
        sheenPos,
        0,
        sheenPos + targetWidth * 0.35,
        targetHeight
      )
      beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0)')
      beamGrad.addColorStop(0.5, `rgba(255, 255, 255, ${0.75 * sheenAlpha})`)
      beamGrad.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = beamGrad
      ctx.fillRect(0, 0, targetWidth, targetHeight)
      ctx.restore()

      // 4. Confetti & Stars
      ctx.save()
      ribbons.forEach((r) => {
        r.y += r.vy * dtFactor
        r.x += (r.vx + Math.sin(t * r.wobbleSpeed + r.wobbleOffset) * 0.8) * dtFactor
        r.rotX += r.speedX * dtFactor
        r.rotY += r.speedY * dtFactor
        r.rotZ += r.speedZ * dtFactor
        if (r.y > targetHeight + 30) {
          r.y = -30
          r.x = Math.random() * targetWidth
        }

        ctx.save()
        ctx.translate(r.x, r.y)
        ctx.rotate(r.rotZ)
        const scaleX = Math.cos(r.rotY)
        const scaleY = Math.sin(r.rotX)
        ctx.scale(scaleX, scaleY)
        ctx.fillStyle = r.color
        ctx.fillRect(-r.w / 2, -r.h / 2, r.w, r.h)
        ctx.restore()
      })
      ctx.restore()

      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      stars.forEach((s) => {
        s.y -= s.speedY * dtFactor
        if (s.y < -20) {
          s.y = targetHeight + 20
          s.x = Math.random() * targetWidth
        }
        const posX = s.x + Math.sin(t * 1.5 + s.wobbleOffset) * 6
        const twinkle = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset)
        drawDiamondStar(ctx, posX, s.y, s.size, twinkle, t * s.rotSpeed)
      })
      ctx.restore()

      // Progress reporting (capped at 84% — 85-100% reserved for MP4 conversion phase)
      const progressPercent = Math.min(84, Math.round((elapsed / DURATION_MS) * 84))
      if (onProgress) onProgress(progressPercent)

      if (elapsed < DURATION_MS) {
        animId = requestAnimationFrame(drawFrame)
      } else {
        setTimeout(() => {
          if (recorder.state === 'recording') {
            try {
              recorder.requestData()
            } catch {}
            recorder.stop()
          } else if (recorder.state !== 'inactive') {
            recorder.stop()
          }
        }, 100)
      }
    }

    drawFrame()
    recordingPromise
      .then(() => resolve(true))
      .catch((err) => {
        cleanupAudio()
        console.error('Video generation failed:', extractErrorMessage(err))
        resolve(false)
      })
  })
}

export async function downloadCanvasAsVideo({
  canvas,
  fileName = 'cardzy-card',
  audioTrack = 'friendship-soft',
  audioUrl,
  occasionId,
  targetAspectRatio,
  durationSeconds = 10,
  onProgress,
}: {
  canvas: HTMLCanvasElement
  fileName?: string
  audioTrack?: string
  audioUrl?: string
  occasionId?: string
  targetAspectRatio?: 'auto' | '9:16' | 'original'
  durationSeconds?: number
  onProgress?: (percent: number) => void
}): Promise<boolean> {
  try {
    // Use toBlob + createObjectURL instead of toDataURL for better mobile memory
    // efficiency. toDataURL on a 1080×1920 canvas produces a multi-MB base64 string
    // that can cause Image loading to fail on Android, forcing a MediaRecorder
    // fallback with the known "00:01" duration bug. Blob URLs are far lighter.
    const { img, imgUrl } = await canvasToImage(canvas)

    try {
      return await recordImageAsVideo({
        img,
        fileName,
        cardType: 'poetry',
        occasionId,
        audioTrack: audioTrack || 'friendship-soft',
        audioUrl,
        targetAspectRatio,
        durationSeconds,
        onProgress,
      })
    } finally {
      if (imgUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imgUrl)
      }
    }
  } catch (e: unknown) {
    console.error('Canvas video export error:', extractErrorMessage(e))
    return false
  }
}

export async function downloadCardVideo({
  element,
  fileName = 'cardzy-card',
  cardType,
  cardSlug,
  occasionId,
  audioTrack,
  audioUrl,
  targetAspectRatio,
  durationSeconds = 10,
  onProgress,
}: CardMediaExportOptions): Promise<boolean> {
  if (!element) return false

  try {
    if (cardType && cardSlug && cardType !== 'poetry') {
      recordCardShare(cardType, cardSlug, 'video')
    }

    // Capture DOM element → canvas → blob URL (same memory-efficient path
    // as downloadCanvasAsVideo / poetry cards). Avoids large base64 data URL
    // strings that cause Image loading failures on Android.
    const capturedCanvas = await captureCardCanvas(element)
    const { img, imgUrl } = await canvasToImage(capturedCanvas)

    try {
      return await recordImageAsVideo({
        img,
        fileName,
        cardType,
        occasionId,
        audioTrack,
        audioUrl,
        targetAspectRatio,
        durationSeconds,
        onProgress,
      })
    } finally {
      if (imgUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imgUrl)
      }
    }
  } catch (e: unknown) {
    console.error('Video export error:', extractErrorMessage(e))
    return false
  }
}