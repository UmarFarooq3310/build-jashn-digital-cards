'use client'

import { recordCardShare } from '@/lib/jashn/magic-service'

export interface CardMediaExportOptions {
  element: HTMLElement | null
  fileName?: string
  cardType?: 'invite' | 'wish' | 'vcard' | 'magic' | 'poetry'
  cardSlug?: string
  audioTrack?: string
  audioUrl?: string
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

function resolveSoundUrl(audioTrack?: string, cardType?: string): string {
  if (audioTrack && audioTrack !== 'none') {
    if (audioTrack.startsWith('/')) return audioTrack
    const trackMap: Record<string, string> = {
      'friendship-soft': '/sounds/friendship-soft.m4a',
      'friendship': '/sounds/friendship-soft.m4a',
      'soft': '/sounds/friendship-soft.m4a',
      'poetry': '/sounds/friendship-soft.m4a',
      'wedding-shehnai': '/sounds/wedding-shehnai.m4a',
      'punjabi-bhangra': '/sounds/mehndi-dholki.m4a',
      'punjabi-bhangra-dhol': '/sounds/mehndi-dholki.m4a',
      'birthday-festive': '/sounds/birthday-dholki.m4a',
      'birthday-dholki': '/sounds/birthday-dholki.m4a',
      'indian-sitar': '/sounds/wedding.m4a',
      'indian-sitar-classical': '/sounds/wedding.m4a',
      'romantic-strings': '/sounds/romantic-strings.m4a',
      'romantic-piano': '/sounds/romantic-piano.m4a',
      'islamic-oud': '/sounds/islamic.m4a',
      'sufi-harmonium': '/sounds/sufi-harmonium.m4a',
      'corporate-ambient': '/sounds/corporate-ambient.m4a',
      'celebration-party': '/sounds/celebration-party.m4a',
      'festive': '/sounds/festive.m4a',
      'general': '/sounds/general.m4a',
    }
    if (trackMap[audioTrack]) return trackMap[audioTrack]
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

/**
 * Animates a card image with a high-end luxury light sheen (strictly matching the card's exact pixels),
 * records it into an MP4/WebM video of ~3.8 seconds, and triggers a direct browser download.
 */
export async function recordImageAsVideo({
  img,
  fileName = "cardzy-card",
  cardType,
  audioTrack,
  audioUrl,
  onProgress,
}: {
  img: HTMLImageElement
  fileName?: string
  cardType?: "invite" | "wish" | "vcard" | "magic" | "poetry"
  audioTrack?: string
  audioUrl?: string
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
  } else if (targetWidth < 540) {
    const scale = 540 / targetWidth
    targetWidth = 540
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

        const soundSrc = resolveSoundUrl(audioTrack || audioUrl, cardType)
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
              gain.gain.setValueAtTime(0.7, audioContext.currentTime)
              // Smooth fade-out in final 0.5s of the 5.0-second video
              gain.gain.setValueAtTime(0.7, audioContext.currentTime + 4.5)
              gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 5.0)

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
      cleanupAudio()
      const detail = (ev as any)?.error?.message || "recorder error event"
      reject(new Error(`MediaRecorder error: ${detail}`))
    }
    recorder.onstop = () => {
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

  recorder.start(100)

  // ── Exact 5.0 Seconds Timing Control ──
  const DURATION_MS = 5000 // Exactly 5.0 seconds
  const TARGET_FPS = 30
  const TOTAL_FRAMES = 150 // 150 frames @ 30fps = 5.0 seconds
  let frame = 0
  const startTime = performance.now()

  // 24 Celebration particles: ambient golden dust and twinkling diamond stars
  const particles = Array.from({ length: 24 }).map((_, i) => ({
    x: Math.random() * targetWidth,
    y: Math.random() * targetHeight,
    radius: Math.random() * 2.5 + 1.2,
    speedY: Math.random() * 1.6 + 0.8,
    wobbleSpeed: Math.random() * 2 + 1,
    wobbleOffset: Math.random() * Math.PI * 2,
    isStar: i % 3 === 0,
    starSize: Math.random() * 7 + 4,
    twinkleSpeed: Math.random() * 3 + 1.5,
    twinkleOffset: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.06,
    color: i % 4 === 0 ? "rgba(255, 255, 255," : "rgba(255, 225, 140,",
  }))

  const drawDiamondStar = (
    c: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    size: number,
    opacity: number,
    rotation: number
  ) => {
    c.save()
    c.translate(cx, cy)
    c.rotate(rotation)

    // Soft outer glow without slow shadowBlur
    c.beginPath()
    c.arc(0, 0, size * 0.7, 0, Math.PI * 2)
    c.fillStyle = `rgba(255, 220, 120, ${opacity * 0.25})`
    c.fill()

    c.beginPath()
    for (let i = 0; i < 4; i++) {
      c.lineTo(Math.cos((i * Math.PI) / 2) * size, Math.sin((i * Math.PI) / 2) * size)
      c.lineTo(
        Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.24),
        Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.24)
      )
    }
    c.closePath()
    c.fillStyle = `rgba(255, 245, 195, ${opacity})`
    c.fill()

    c.beginPath()
    c.arc(0, 0, size * 0.28, 0, Math.PI * 2)
    c.fillStyle = `rgba(255, 255, 255, ${opacity})`
    c.fill()
    c.restore()
  }

  return await new Promise<boolean>((resolve) => {
    const drawFrame = () => {
      const now = performance.now()
      const elapsed = now - startTime
      const p = Math.min(1, elapsed / DURATION_MS)

      ctx.clearRect(0, 0, targetWidth, targetHeight)

      // 1. Draw the exact full card image with 100% edge-to-edge fidelity (never clipped)
      ctx.save()
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
      ctx.restore()

      // 2. Luxury Shimmer Gleam: sweeps diagonally across the card with bright glossy highlights
      ctx.save()
      ctx.globalCompositeOperation = "screen"
      const sweepProgress = (p * 2.2) % 1.0
      const rayX = sweepProgress * (targetWidth * 2.6) - targetWidth * 0.8

      const beamGradient = ctx.createLinearGradient(rayX, 0, rayX + targetWidth * 0.35, targetHeight)
      beamGradient.addColorStop(0, "rgba(255, 255, 255, 0)")
      beamGradient.addColorStop(0.3, "rgba(255, 240, 200, 0.12)")
      beamGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.55)")
      beamGradient.addColorStop(0.7, "rgba(255, 240, 200, 0.12)")
      beamGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      ctx.fillStyle = beamGradient
      ctx.transform(1, 0, -0.3, 1, 0, 0)
      ctx.fillRect(rayX, -targetHeight * 0.2, targetWidth * 0.45, targetHeight * 1.4)
      ctx.restore()

      // 3. Floating Celebration Particles & Twinkling Diamond Stars
      ctx.save()
      ctx.globalCompositeOperation = "screen"
      particles.forEach((pt) => {
        pt.y -= pt.speedY
        if (pt.y < -20) {
          pt.y = targetHeight + Math.random() * 20
          pt.x = Math.random() * targetWidth
        }
        const x = pt.x + Math.sin(frame * 0.05 + pt.wobbleOffset) * 12
        const baseAlpha = Math.max(0, 1 - pt.y / targetHeight)
        const twinkle = 0.5 + 0.5 * Math.sin(frame * 0.1 + pt.twinkleOffset)
        const alpha = Math.min(1, Math.max(0.15, baseAlpha * twinkle))

        if (pt.isStar) {
          const rot = frame * pt.rotationSpeed + pt.wobbleOffset
          drawDiamondStar(ctx, x, pt.y, pt.starSize, alpha, rot)
        } else {
          // Soft outer halo without shadowBlur (lightning fast)
          ctx.beginPath()
          ctx.arc(x, pt.y, pt.radius * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 215, 120, ${alpha * 0.2})`
          ctx.fill()

          ctx.beginPath()
          ctx.arc(x, pt.y, pt.radius, 0, Math.PI * 2)
          ctx.fillStyle = `${pt.color}${alpha * 0.85})`
          ctx.fill()
        }
      })
      ctx.restore()

      frame++
      const progressPercent = Math.min(99, Math.round((frame / TOTAL_FRAMES) * 100))
      if (onProgress) onProgress(progressPercent)

      if (frame < TOTAL_FRAMES && elapsed < DURATION_MS + 200) {
        const targetNext = startTime + (frame * 1000) / TARGET_FPS
        const delay = Math.max(0, Math.round(targetNext - performance.now()))
        setTimeout(drawFrame, delay)
      } else {
        if (onProgress) onProgress(100)
        setTimeout(() => {
          if (recorder.state !== "inactive") {
            recorder.stop()
          }
        }, 150)
      }
    }

    drawFrame()
    recordingPromise
      .then(() => resolve(true))
      .catch((err) => {
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
  onProgress,
}: {
  canvas: HTMLCanvasElement
  fileName?: string
  audioTrack?: string
  audioUrl?: string
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
    audioTrack: audioTrack || "friendship-soft",
    audioUrl,
    onProgress,
  })
}

/**
 * Records an animated 5-second video from a DOM card element with background sound.
 */
export async function downloadCardVideo({
  element,
  fileName = "cardzy-card",
  cardType,
  cardSlug,
  audioTrack,
  audioUrl,
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
      audioTrack,
      audioUrl,
      onProgress,
    })
  } catch (e: unknown) {
    console.error("Video export error:", extractErrorMessage(e))
    return false
  }
}
