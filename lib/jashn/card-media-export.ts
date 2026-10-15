'use client'

import { recordCardShare } from '@/lib/jashn/magic-service'
import { getDefaultAudioTrackForOccasion } from '@/lib/jashn/audio'

export interface CardMediaExportOptions {
  element: HTMLElement | null
  fileName?: string
  cardType?: 'invite' | 'wish' | 'vcard' | 'magic' | 'poetry'
  cardSlug?: string
  occasionId?: string
  audioTrack?: string
  audioUrl?: string
  targetAspectRatio?: 'auto' | '9:16' | 'original'
  onProgress?: (percent: number) => void
}

let sharedAudioContext: AudioContext | null = null

/**
 * Pre-warms / unlocks the Web Audio context immediately inside a synchronous user gesture (click/tap)
 * so that subsequent asynchronous downloads have an active, running AudioContext without browser autoplay blocking.
 */
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
  } catch (e) {
    console.warn('primeAudioContext note:', e)
    return null
  }
}

function resolveSoundUrl(audioTrack?: string, cardType?: string, occasionId?: string): string {
  // If occasion is solemn / condolence / sympathy, always default to silence unless explicitly overridden
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
  if (typeof e === 'object') {
    const obj = e as Record<string, unknown>
    return (obj.message as string) || (obj.name as string) || (obj.error as string) || JSON.stringify(e)
  }
  return String(e)
}

/**
 * Captures a clean, high-resolution snapshot of a card element, preserving its exact aspect ratio.
 */
async function captureCardDataUrl(element: HTMLElement): Promise<string> {
  const { toPng } = await import('html-to-image')

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

  // Measure the true layout border-box dimensions of the card itself
  // (Strictly avoid scrollWidth/scrollHeight because absolute blur glow blobs stick outside and falsely expand the canvas)
  const rect = element.getBoundingClientRect()
  const offsetW = element.offsetWidth || 0
  const rectW = Math.round(rect.width) || 0
  const naturalWidth = Math.max(offsetW || rectW, 320)

  const offsetH = element.offsetHeight || 0
  const rectH = Math.round(rect.height) || 0
  const naturalHeight = Math.max(offsetH || rectH, 280)

  const TRANSPARENT_PIXEL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQABNjN9GQAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAA0lEQVQI12P4z8BQDwAEgAF/QualzQAAAABJRU5ErkJggg=='

  const toPngOptions = {
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
    pixelRatio: 2, // Native 2x high-resolution capture without artificial CSS transform shifting
    imagePlaceholder: TRANSPARENT_PIXEL,
    skipFonts: false,
    onImageErrorHandler: () => {},
    fetchRequestInit: { cache: 'force-cache' as RequestCache },
    style: {
      overflow: 'hidden',
      transform: 'none',
      transformOrigin: 'top left',
      margin: '0',
      marginLeft: '0',
      marginRight: '0',
      marginTop: '0',
      marginBottom: '0',
      left: '0',
      top: '0',
      right: 'auto',
      bottom: 'auto',
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

  let dataUrl: string
  try {
    dataUrl = await toPng(element, toPngOptions)
  } catch {
    try {
      dataUrl = await toPng(element, { ...toPngOptions, skipFonts: true })
    } catch {
      dataUrl = await toPng(element, { ...toPngOptions, skipFonts: true, pixelRatio: 1 })
    }
  } finally {
    if (originalCssRules) {
      Object.defineProperty(CSSStyleSheet.prototype, 'cssRules', originalCssRules)
    }
  }

  return dataUrl
}

/**
 * Downloads a high-resolution PNG image of the given card element.
 */
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

function drawRoundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.max(0, Math.min(r, w / 2, h / 2))
  ctx.beginPath()
  if (typeof (ctx as any).roundRect === 'function') {
    ;(ctx as any).roundRect(x, y, w, h, radius)
  } else {
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + w - radius, y)
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius)
    ctx.lineTo(x + w, y + h - radius)
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h)
    ctx.lineTo(x + radius, y + h)
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
  }
  ctx.closePath()
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

  // Soft ambient star halo
  c.beginPath()
  c.arc(0, 0, size * 0.8, 0, Math.PI * 2)
  c.fillStyle = `rgba(255, 230, 150, ${opacity * 0.22})`
  c.fill()

  // 4-point diamond star
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

  // Bright core pin
  c.beginPath()
  c.arc(0, 0, size * 0.22, 0, Math.PI * 2)
  c.fillStyle = `rgba(255, 255, 255, ${opacity})`
  c.fill()
  c.restore()
}

/**
 * Animates a card into a breathtaking 5-second cinematic 3D floating showcase video.
 * Features:
 * - Smooth entrance zoom & reveal
 * - Living 3D floating & gyroscopic perspective tilt
 * - Dynamic 3D multi-layered contact & ambient drop shadow
 * - Card-bounded luxury specular foil sheen sweep
 * - Metallic edge glow pulse
 * - 3D tumbling celebration confetti ribbons, bokeh orbs, and twinkling diamond stars (or serene stardust for solemn cards)
 * - Deterministic 30 FPS rendering loop with synchronized background audio
 */
export async function recordImageAsVideo({
  img,
  fileName = "cardzy-card",
  cardType,
  occasionId,
  audioTrack,
  audioUrl,
  targetAspectRatio = "auto",
  onProgress,
}: {
  img: HTMLImageElement
  fileName?: string
  cardType?: "invite" | "wish" | "vcard" | "magic" | "poetry"
  occasionId?: string
  audioTrack?: string
  audioUrl?: string
  targetAspectRatio?: "auto" | "9:16" | "original"
  onProgress?: (percent: number) => void
}): Promise<boolean> {
  // Constrain width to 720p maximum for fast, buttery smooth 30fps recording
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

  // Ensure width and height are even integers (hardware h264 encoder requirement)
  if (targetWidth % 2 !== 0) targetWidth += 1
  if (targetHeight % 2 !== 0) targetHeight += 1

  const canvas = document.createElement("canvas")
  canvas.width = targetWidth
  canvas.height = targetHeight
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Canvas 2D context not supported")
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = "high"

  const captureStreamFn = canvas.captureStream || (canvas as any).mozCaptureStream
  if (!captureStreamFn || typeof MediaRecorder === "undefined") {
    throw new Error("Video recording not supported on this browser")
  }

  const canvasStream = captureStreamFn.call(canvas, 30)

  // ── Web Audio Background Music Pipeline ──
  let audioContext: AudioContext | null = null
  let audioTrackNode: MediaStreamTrack | null = null

  if (typeof window !== "undefined") {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
    if (AudioCtx) {
      try {
        audioContext = new AudioCtx()
        if (audioContext.state === "suspended") {
          await audioContext.resume().catch(() => {})
        }

        const soundSrc = resolveSoundUrl(audioTrack || audioUrl, cardType, occasionId)
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
              // Soft fade in over 0.35s
              gain.gain.setValueAtTime(0.001, audioContext.currentTime)
              gain.gain.exponentialRampToValueAtTime(0.75, audioContext.currentTime + 0.35)
              // Sustain audio until 5.4s of the 6.0-second video
              gain.gain.setValueAtTime(0.75, audioContext.currentTime + 5.4)
              gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 6.0)

              const dest = audioContext.createMediaStreamDestination()
              srcNode.connect(gain)
              gain.connect(dest)
              srcNode.start(0)

              const tracks = dest.stream.getAudioTracks()
              if (tracks.length > 0) {
                audioTrackNode = tracks[0]
              }
            }
          } catch (fetchErr) {
            console.warn("Audio background track fetch note:", fetchErr)
          }
        }
      } catch (audioErr) {
        console.warn("AudioContext setup note:", audioErr)
      }
    }
  }

  // Combine video and audio tracks into a unified stream for MediaRecorder
  const streamTracks: MediaStreamTrack[] = [...canvasStream.getVideoTracks()]
  if (audioTrackNode) {
    streamTracks.push(audioTrackNode)
  }
  const stream = new MediaStream(streamTracks)

  const candidateTypes = [
    "video/mp4;codecs=avc1.640028,mp4a.40.2",
    "video/mp4;codecs=avc1,mp4a.40.2",
    "video/mp4",
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
  ]
  let mimeType = candidateTypes.find((t) => {
    try {
      return MediaRecorder.isTypeSupported(t)
    } catch {
      return false
    }
  }) || ""

  const options: MediaRecorderOptions = {}
  if (mimeType) options.mimeType = mimeType

  let recorder: MediaRecorder
  try {
    recorder = new MediaRecorder(stream, { ...options, videoBitsPerSecond: 8000000 })
  } catch {
    try {
      recorder = new MediaRecorder(stream, { ...options, videoBitsPerSecond: 4000000 })
    } catch {
      recorder = new MediaRecorder(stream, options)
    }
  }

  const actualMime = recorder.mimeType || mimeType || "video/mp4"
  const ext = actualMime.includes("webm") ? "webm" : "mp4"

  const chunks: BlobPart[] = []
  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) {
      chunks.push(e.data)
    }
  }

  let animId: number | null = null

  const cleanupTimers = () => {
    if (animId && typeof cancelAnimationFrame !== "undefined") {
      cancelAnimationFrame(animId)
      animId = null
    }
  }

  const cleanupAudio = () => {
    if (audioContext && audioContext.state !== "closed") {
      try { audioContext.close() } catch {}
    }
    if (audioTrackNode) {
      try { audioTrackNode.stop() } catch {}
    }
  }

  const recordingPromise = new Promise<void>((resolve, reject) => {
    recorder.onerror = (ev) => {
      cleanupTimers()
      cleanupAudio()
      const detail = (ev as any)?.error?.message || "recorder error event"
      reject(new Error(`MediaRecorder error: ${detail}`))
    }
    recorder.onstop = () => {
      cleanupTimers()
      cleanupAudio()
      try {
        const blob = new Blob(chunks, { type: actualMime })
        if (blob.size === 0) {
          reject(new Error("Video recording produced empty file"))
          return
        }
        const blobUrl = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.download = `${fileName}.${ext}`
        link.href = blobUrl
        link.click()
        setTimeout(() => URL.revokeObjectURL(blobUrl), 6000)
        resolve()
      } catch (err) {
        reject(err)
      }
    }
  })

  // Start recording cleanly without timeslice for an uncorrupted, solid video container
  recorder.start()

  // ── Exact 6.0 Seconds Real-Time Animation Control ──
  // Driven strictly by performance.now() elapsed time so particles and motion
  // animate continuously until the very last second without stopping early!
  const DURATION_MS = 6000
  const DURATION_SEC = 6.0
  const startTime = performance.now()
  let lastFrameTime = startTime

  // Occasion awareness for particles & audio
  const isSolemn = Boolean(
    occasionId &&
    (occasionId.includes("condolence") ||
      occasionId.includes("sympathy") ||
      occasionId.includes("ashura") ||
      occasionId.includes("chehlum") ||
      occasionId.includes("chelum") ||
      occasionId.includes("majlis"))
  )

  // 3D Tumbling Confetti Ribbons: 50 rich festive confetti ribbons
  const CONFETTI_COLORS = [
    "#FFD700", // Bright Gold
    "#F59E0B", // Amber Gold
    "#EF4444", // Ruby Red
    "#10B981", // Emerald Green
    "#3B82F6", // Sapphire Blue
    "#EC4899", // Party Pink
    "#8B5CF6", // Velvet Purple
    "#FFFFFF", // Pearl White
  ]

  const ribbons = Array.from({ length: 50 }).map(() => ({
    x: Math.random() * targetWidth,
    y: Math.random() * targetHeight * 1.5 - targetHeight * 0.5,
    w: Math.random() * 8 + 10, // 10px to 18px wide (highly visible!)
    h: Math.random() * 10 + 12, // 12px to 22px high
    vx: (Math.random() - 0.5) * 1.5,
    vy: Math.random() * 2.5 + 3.0, // active continuous celebration fall
    rotX: Math.random() * Math.PI * 2,
    rotY: Math.random() * Math.PI * 2,
    rotZ: Math.random() * Math.PI * 2,
    speedX: Math.random() * 0.08 + 0.04,
    speedY: Math.random() * 0.09 + 0.05,
    speedZ: (Math.random() - 0.5) * 0.05,
    wobbleSpeed: Math.random() * 2.5 + 1.5,
    wobbleOffset: Math.random() * Math.PI * 2,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  }))

  // Diamond Stars
  const stars = Array.from({ length: 18 }).map(() => ({
    x: Math.random() * targetWidth,
    y: Math.random() * targetHeight,
    size: Math.random() * 8 + 5,
    twinkleSpeed: Math.random() * 3 + 2,
    twinkleOffset: Math.random() * Math.PI * 2,
    speedY: Math.random() * 0.5 + 0.2,
    rotSpeed: (Math.random() - 0.5) * 0.05,
    wobbleOffset: Math.random() * Math.PI * 2,
  }))

  // Ambient Bokeh Orbs
  const bokehOrbs = Array.from({ length: 10 }).map(() => ({
    x: Math.random() * targetWidth,
    y: Math.random() * targetHeight,
    radius: Math.random() * 45 + 35,
    speedY: Math.random() * 0.4 + 0.15,
    pulseSpeed: Math.random() * 1.5 + 1,
    pulseOffset: Math.random() * Math.PI * 2,
  }))

  // Solemn Stardust Particles
  const stardust = Array.from({ length: 28 }).map(() => ({
    x: Math.random() * targetWidth,
    y: Math.random() * targetHeight,
    radius: Math.random() * 2.2 + 1,
    speedY: Math.random() * 0.8 + 0.3,
    driftSpeed: Math.random() * 1.4 + 0.7,
    driftOffset: Math.random() * Math.PI * 2,
    alphaBase: Math.random() * 0.4 + 0.25,
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

      // 1. Draw the exact full card image with 100% edge-to-edge fidelity (no extra space around card)
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

      // 2. Luxury Specular Foil Sheen (Continuous rhythmic light waves sweeping across the full card every 2.0 seconds)
      const sheenPeriod = 2.0 // sweeps every 2.0 seconds continuously till the very end!
      const cycleProgress = (t % sheenPeriod) / sheenPeriod // 0.0 to 1.0
      const sheenAlpha = Math.sin(cycleProgress * Math.PI) * 0.85
      const sheenPos = -targetWidth * 0.45 + cycleProgress * (targetWidth * 1.9)

      ctx.save()
      ctx.globalCompositeOperation = "screen"
      const beamGrad = ctx.createLinearGradient(
        sheenPos,
        0,
        sheenPos + targetWidth * 0.35,
        targetHeight
      )
      beamGrad.addColorStop(0, "rgba(255, 255, 255, 0)")
      beamGrad.addColorStop(0.32, `rgba(255, 245, 215, ${0.18 * sheenAlpha})`)
      beamGrad.addColorStop(0.5, `rgba(255, 255, 255, ${0.85 * sheenAlpha})`)
      beamGrad.addColorStop(0.68, `rgba(255, 245, 215, ${0.18 * sheenAlpha})`)
      beamGrad.addColorStop(1, "rgba(255, 255, 255, 0)")

      ctx.fillStyle = beamGrad
      ctx.fillRect(0, 0, targetWidth, targetHeight)
      ctx.restore()

      // 3. Floating Ambient Bokeh Orbs
      ctx.save()
      ctx.globalCompositeOperation = "screen"
      bokehOrbs.forEach((b) => {
        b.y -= b.speedY * dtFactor
        if (b.y < -b.radius) {
          b.y = targetHeight + b.radius
          b.x = Math.random() * targetWidth
        }
        const pulse = 0.5 + 0.5 * Math.sin(t * b.pulseSpeed + b.pulseOffset)
        const alpha = 0.08 + pulse * 0.12
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius)
        if (isSolemn) {
          grad.addColorStop(0, `rgba(226, 232, 240, ${alpha * 0.8})`)
          grad.addColorStop(1, "rgba(226, 232, 240, 0)")
        } else {
          grad.addColorStop(0, `rgba(251, 191, 36, ${alpha})`)
          grad.addColorStop(1, "rgba(251, 191, 36, 0)")
        }
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.restore()

      // 4. Foreground Celebratory Confetti & Twinkling Stars (Continuously animated till the last second)
      if (isSolemn) {
        ctx.save()
        ctx.globalCompositeOperation = "screen"
        stardust.forEach((m) => {
          m.y -= m.speedY * dtFactor
          if (m.y < -15) {
            m.y = targetHeight + 15
            m.x = Math.random() * targetWidth
          }
          const driftX = m.x + Math.sin(t * m.driftSpeed + m.driftOffset) * 14
          const alpha = m.alphaBase * (0.6 + 0.4 * Math.sin(t * 2 + m.driftOffset))
          ctx.beginPath()
          ctx.arc(driftX, m.y, m.radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(226, 232, 240, ${alpha})`
          ctx.fill()
        })
        ctx.restore()
      } else {
        // Tumbling 3D Confetti Ribbons: continuously tumbling & recycling across all 6 seconds
        ctx.save()
        ribbons.forEach((r) => {
          r.y += r.vy * dtFactor
          r.x += (r.vx + Math.sin(t * r.wobbleSpeed + r.wobbleOffset) * 0.9) * dtFactor
          r.rotX += r.speedX * dtFactor
          r.rotY += r.speedY * dtFactor
          r.rotZ += r.speedZ * dtFactor
          if (r.y > targetHeight + 35) {
            r.y = -35
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
          if (Math.abs(scaleX * scaleY) > 0.65) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.45)"
            ctx.fillRect(-r.w / 2, -r.h / 2, r.w, r.h)
          }
          ctx.restore()
        })
        ctx.restore()

        // Twinkling Diamond Stars (Continuous twinkling till the very last millisecond)
        ctx.save()
        ctx.globalCompositeOperation = "screen"
        stars.forEach((s) => {
          s.y -= s.speedY * dtFactor
          if (s.y < -25) {
            s.y = targetHeight + 20
            s.x = Math.random() * targetWidth
          }
          const posX = s.x + Math.sin(t * 1.5 + s.wobbleOffset) * 8
          const twinkle = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset)
          drawDiamondStar(ctx, posX, s.y, s.size, twinkle, t * s.rotSpeed + s.wobbleOffset)
        })
        ctx.restore()
      }

      // 5. Living Metallic Foil Border Glow
      ctx.save()
      ctx.lineWidth = 3
      const borderPulse = 0.35 + 0.25 * Math.sin(t * 2.5)
      ctx.strokeStyle = isSolemn
        ? `rgba(228, 228, 231, ${borderPulse * 0.65})`
        : `rgba(250, 204, 21, ${borderPulse * 0.95})`
      ctx.strokeRect(1.5, 1.5, targetWidth - 3, targetHeight - 3)
      ctx.restore()

      const progressPercent = Math.min(99, Math.round((elapsed / DURATION_MS) * 100))
      if (onProgress) onProgress(progressPercent)

      if (elapsed < DURATION_MS) {
        animId = requestAnimationFrame(drawFrame)
      } else {
        if (onProgress) onProgress(100)
        setTimeout(() => {
          if (recorder.state === "recording") {
            try {
              recorder.requestData()
            } catch {}
            recorder.stop()
          } else if (recorder.state !== "inactive") {
            recorder.stop()
          }
        }, 150)
      }
    }

    drawFrame()
    recordingPromise
      .then(() => resolve(true))
      .catch((err) => {
        cleanupTimers()
        cleanupAudio()
        console.error("Video generation failed:", extractErrorMessage(err))
        resolve(false)
      })
  })
}

/**
 * Downloads a rendered HTML5 Canvas as an animated celebration video.
 */
export async function downloadCanvasAsVideo({
  canvas,
  fileName = "cardzy-card",
  audioTrack = "friendship-soft",
  audioUrl,
  occasionId,
  targetAspectRatio,
  onProgress,
}: {
  canvas: HTMLCanvasElement
  fileName?: string
  audioTrack?: string
  audioUrl?: string
  occasionId?: string
  targetAspectRatio?: "auto" | "9:16" | "original"
  onProgress?: (percent: number) => void
}): Promise<boolean> {
  const dataUrl = canvas.toDataURL("image/png")
  const img = new Image()
  img.src = dataUrl
  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = () => reject(new Error("Canvas image load failed"))
  })
  return recordImageAsVideo({
    img,
    fileName,
    cardType: "poetry",
    occasionId,
    audioTrack: audioTrack || "friendship-soft",
    audioUrl,
    targetAspectRatio,
    onProgress,
  })
}

/**
 * Records an animated 5-second cinematic 3D video from a DOM card element with background sound.
 */
export async function downloadCardVideo({
  element,
  fileName = "cardzy-card",
  cardType,
  cardSlug,
  occasionId,
  audioTrack,
  audioUrl,
  targetAspectRatio,
  onProgress,
}: CardMediaExportOptions): Promise<boolean> {
  if (!element) return false

  try {
    if (cardType && cardSlug && cardType !== 'poetry') {
      recordCardShare(cardType, cardSlug, "video")
    }

    const dataUrl = await captureCardDataUrl(element)

    const img = new Image()
    img.src = dataUrl
    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = () => reject(new Error("Snapshot image failed to load"))
    })

    return recordImageAsVideo({
      img,
      fileName,
      cardType,
      occasionId,
      audioTrack,
      audioUrl,
      targetAspectRatio,
      onProgress,
    })
  } catch (e: unknown) {
    console.error("Video export error:", extractErrorMessage(e))
    return false
  }
}
