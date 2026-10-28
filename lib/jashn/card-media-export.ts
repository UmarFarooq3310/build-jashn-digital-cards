'use client'

import { recordCardShare } from '@/lib/jashn/magic-service'
import { getDefaultAudioTrackForOccasion, getAudioTrack } from '@/lib/jashn/audio'
import { getSoundForOccasion, getSoundForInvitationType } from '@/lib/jashn/occasionSoundMap'
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
    'video/webm;codecs=h264,opus',
    'video/webm;codecs=h264',
    'video/webm;codecs=vp8,opus',
    'video/webm;codecs=vp8',
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp9',
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

    const loadTask = ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    })

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('FFmpeg CDN download timed out')), 25000)
    )

    await Promise.race([loadTask, timeoutPromise])

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
  onProgress?: (percent: number) => void,
  sourceMime?: string
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

      // Fast path: if the browser captured H.264 video, copy the video stream directly (remux in ~0.5s instead of full re-encoding)
      let remuxSuccess = false
      const isAlreadyH264 = Boolean(
        sourceMime && (sourceMime.includes('h264') || sourceMime.includes('avc'))
      )

      if (isAlreadyH264) {
        try {
          await ffmpeg.exec([
            '-i', 'input.webm',
            '-c:v', 'copy',
            '-c:a', 'aac',
            '-b:a', '128k',
            '-movflags', '+faststart',
            'output.mp4',
          ])
          remuxSuccess = true
        } catch {
          // If remuxing fails, fall through to transcode below
        }
      }

      if (!remuxSuccess) {
        await ffmpeg.exec([
          '-i', 'input.webm',
          '-c:v', 'libx264',
          '-preset', 'ultrafast',
          '-tune', 'fastdecode',
          '-crf', '26',
          '-threads', '0',
          '-pix_fmt', 'yuv420p',
          '-c:a', 'aac',
          '-b:a', '128k',
          '-movflags', '+faststart',
          'output.mp4',
        ])
      }

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
  // 1. Explicitly silent
  if (audioTrack === 'none') {
    return ''
  }

  // 2. Custom or provided audioTrack
  if (audioTrack && audioTrack.trim()) {
    const clean = audioTrack.trim()
    // Data URL, Blob URL, Absolute HTTP URL, or local public path starting with /
    if (
      clean.startsWith('data:') ||
      clean.startsWith('blob:') ||
      clean.startsWith('http://') ||
      clean.startsWith('https://') ||
      clean.startsWith('/')
    ) {
      return clean
    }

    // Resolve via getAudioTrack (covers all 20+ AUDIO_TRACKS, aliases, and names)
    const trackObj = getAudioTrack(clean)
    if (trackObj && trackObj.id !== 'none' && trackObj.src) {
      return trackObj.src
    }

    // Check occasionSoundMap
    const mapped = getSoundForOccasion(clean) || getSoundForInvitationType(clean)
    if (mapped) {
      return mapped
    }

    if (clean.endsWith('.m4a') || clean.endsWith('.mp3') || clean.endsWith('.wav')) {
      return `/${clean}`
    }
  }

  // 3. Fallback to occasion if no custom audio was specified
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
      return ''
    }

    const defaultOccasionTrack = getDefaultAudioTrackForOccasion(occasionId)
    if (defaultOccasionTrack === 'none') return ''
    if (defaultOccasionTrack) {
      const defaultObj = getAudioTrack(defaultOccasionTrack)
      if (defaultObj && defaultObj.id !== 'none' && defaultObj.src) {
        return defaultObj.src
      }
    }

    const occasionSound = getSoundForOccasion(occasionId) || getSoundForInvitationType(occasionId)
    if (occasionSound) {
      return occasionSound
    }
  }

  // 4. Default fallbacks by cardType
  if (cardType === 'poetry') return '/sounds/friendship-soft.m4a'
  if (cardType === 'invite') return '/sounds/wedding-shehnai.m4a'
  if (cardType === 'vcard') return '/sounds/friendship-soft.m4a'
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
async function captureCardCanvas(element: HTMLElement, forVideo = false): Promise<HTMLCanvasElement> {
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

  // ── Temporarily expand all scrollable / max-height containers so the
  // FULL text is captured — not just the visible scrolled portion.
  // This fixes wish cards (and any other card) where the message sits
  // inside a max-h-* overflow-y-auto box. Styles are restored after
  // capture so the live page is unaffected.
  const savedStyles: {
    el: HTMLElement
    maxHeight: string
    overflow: string
    overflowY: string
    height: string
    width?: string
    maxWidth?: string
    minWidth?: string
    minHeight?: string
  }[] = []

  // If capturing on desktop where the card is rendered wide (e.g. > 460px),
  // temporarily constrain to standard mobile card width (430px) during capture
  // so that headings, message fonts, avatars, and decorations render at their
  // maximum scale to cover the full vertical card, exactly like mobile downloads.
  const isWideScreen = element.offsetWidth > 460
  const exportWidth = 430

  if (isWideScreen) {
    savedStyles.push({
      el: element,
      maxHeight: element.style.maxHeight,
      overflow: element.style.overflow,
      overflowY: element.style.overflowY,
      height: element.style.height,
      width: element.style.width,
      maxWidth: element.style.maxWidth,
      minWidth: element.style.minWidth,
    })
    element.style.width = `${exportWidth}px`
    element.style.maxWidth = `${exportWidth}px`
    element.style.minWidth = `${exportWidth}px`
  }

  // Size the card container to match 9:16 mobile story aspect ratio (430x764)
  // so BOTH Image and Video downloads fill the screen completely from edge-to-edge
  // and top-to-bottom as ONE full card with exact identical dimensions and zero stretching!
  const targetMinH = Math.round(exportWidth * (1280 / 720))
  if (element.scrollHeight < targetMinH) {
    savedStyles.push({
      el: element,
      maxHeight: element.style.maxHeight,
      overflow: element.style.overflow,
      overflowY: element.style.overflowY,
      height: element.style.height,
      minHeight: element.style.minHeight,
    })
    element.style.minHeight = `${targetMinH}px`
  }

  // Temporarily reset any active 3D transforms (e.g. GSAP hover tilt) during capture
  // so the captured card is measured flat and not clipped or distorted in SVG foreignObject
  const savedTransform = element.style.transform
  const savedTransformStyle = element.style.transformStyle
  element.style.transform = 'none'
  element.style.transformStyle = 'flat'

  const expandElement = (el: HTMLElement) => {
    const computed = window.getComputedStyle(el)
    if (
      computed.maxHeight !== 'none' ||
      computed.overflowY === 'auto' ||
      computed.overflowY === 'scroll'
    ) {
      savedStyles.push({
        el,
        maxHeight: el.style.maxHeight,
        overflow: el.style.overflow,
        overflowY: el.style.overflowY,
        height: el.style.height,
      })
      el.style.maxHeight = 'none'
      el.style.overflow = 'visible'
      el.style.overflowY = 'visible'
    }
  }

  // Expand the root element itself
  expandElement(element)
  // Expand only scrollable / max-height candidates (instant, avoids 100+ synchronous style recalcs)
  const scrollCandidates = element.querySelectorAll<HTMLElement>(
    '.overflow-y-auto, .overflow-auto, [class*="max-h-"], [class*="overflow-"], [style*="max-height"], [style*="overflow"]'
  )
  scrollCandidates.forEach(expandElement)

  // Force a synchronous reflow so scrollHeight reflects the expanded layout
  const naturalWidth = Math.max(element.offsetWidth || Math.round(element.getBoundingClientRect().width), 320)
  const naturalHeight = Math.max(element.scrollHeight, 280)
  const captureHeight = naturalHeight

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
    height: captureHeight,
    // Use pixelRatio 1 for video — the video encoder scales down to 720px
    // width anyway, so 2x capture is wasted work that doubles capture time
    // for invitation/wish/vcard cards with complex DOM. Keep 2x for PNG
    // downloads where sharpness matters.
    pixelRatio: forVideo ? 1 : 2,
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
      height: `${captureHeight}px`,
      minHeight: `${captureHeight}px`,
    },
  }

  try {
    return await toCanvas(element, captureOptions)
  } catch {
    return await toCanvas(element, { ...captureOptions, skipFonts: true, pixelRatio: 1 })
  } finally {
    // Restore 3D transform styles
    element.style.transform = savedTransform
    element.style.transformStyle = savedTransformStyle

    // Restore all temporarily expanded elements
    savedStyles.forEach(({ el, maxHeight, overflow, overflowY, height, width, maxWidth, minWidth, minHeight }) => {
      el.style.maxHeight = maxHeight
      el.style.overflow = overflow
      el.style.overflowY = overflowY
      el.style.height = height
      if (width !== undefined) el.style.width = width
      if (maxWidth !== undefined) el.style.maxWidth = maxWidth
      if (minWidth !== undefined) el.style.minWidth = minWidth
      if (minHeight !== undefined) el.style.minHeight = minHeight
    })
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

    const capturedCanvas = await captureCardCanvas(element)

    // Render to exact 720x1280 resolution so image size is identical to video
    const finalCanvas = document.createElement('canvas')
    finalCanvas.width = 720
    finalCanvas.height = 1280
    const ctx = finalCanvas.getContext('2d')
    if (ctx) {
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(capturedCanvas, 0, 0, 720, 1280)
    }

    const dataUrl = (ctx ? finalCanvas : capturedCanvas).toDataURL('image/png')
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

function computeVideoDimensions(
  img: HTMLImageElement,
  targetAspectRatio: 'auto' | '9:16' | 'original' = '9:16'
): {
  targetWidth: number
  targetHeight: number
  isNineSixteen: boolean
  cardX: number
  cardY: number
  cardW: number
  cardH: number
} {
  const imgW = img.naturalWidth || img.width || 720
  const imgH = img.naturalHeight || img.height || 1280
  const imgAspect = imgW / Math.max(1, imgH)

  // Standard 9:16 mobile story / reel resolution (720x1280):
  // 720 and 1280 are both exact multiples of 16 (720=16*45, 1280=16*80),
  // which guarantees 100% compatibility with Android hardware encoders (MediaCodec / WebCodecs).
  const isNineSixteen = targetAspectRatio === '9:16' || targetAspectRatio === 'auto' || imgAspect <= 0.75

  if (isNineSixteen) {
    const targetWidth = 720
    const targetHeight = 1280

    // Full-bleed edge-to-edge 9:16 mobile video (WhatsApp Status / Instagram Story / Reels)
    return {
      targetWidth,
      targetHeight,
      isNineSixteen: true,
      cardX: 0,
      cardY: 0,
      cardW: targetWidth,
      cardH: targetHeight,
    }
  }

  // targetAspectRatio === 'original':
  let targetWidth = imgW
  let targetHeight = imgH

  if (targetWidth > 720) {
    const s = 720 / targetWidth
    targetWidth = 720
    targetHeight = Math.round(targetHeight * s)
  } else if (targetWidth < 480) {
    const s = 480 / targetWidth
    targetWidth = 480
    targetHeight = Math.round(targetHeight * s)
  }

  targetHeight = Math.max(360, targetHeight)

  // Enforce 16-pixel boundary alignment for Android MediaCodec hardware encoder
  targetWidth = Math.round(targetWidth / 16) * 16
  targetHeight = Math.round(targetHeight / 16) * 16

  return {
    targetWidth,
    targetHeight,
    isNineSixteen: false,
    cardX: 0,
    cardY: 0,
    cardW: targetWidth,
    cardH: targetHeight,
  }
}

function createCardVideoBaseCanvas({
  img,
  targetWidth,
  targetHeight,
  isNineSixteen,
  cardX,
  cardY,
  cardW,
  cardH,
}: {
  img: HTMLImageElement
  targetWidth: number
  targetHeight: number
  isNineSixteen: boolean
  cardX: number
  cardY: number
  cardW: number
  cardH: number
  cardType?: string
}): HTMLCanvasElement {
  const baseCanvas = document.createElement('canvas')
  baseCanvas.width = targetWidth
  baseCanvas.height = targetHeight
  const bCtx = baseCanvas.getContext('2d', { alpha: false })
  if (!bCtx) return baseCanvas

  bCtx.imageSmoothingEnabled = true
  bCtx.imageSmoothingQuality = 'high'

  if (isNineSixteen) {
    // Full-bleed edge-to-edge: ONE complete card on full screen — NO card inside card!
    bCtx.drawImage(img, 0, 0, targetWidth, targetHeight)
  } else {
    bCtx.drawImage(img, cardX, cardY, cardW, cardH)
  }

  return baseCanvas
}

function drawCardVideoFrame({
  ctx,
  baseCanvas,
  t,
  elapsed,
  dtFactor,
  targetWidth,
  targetHeight,
  ribbons,
  stars,
}: {
  ctx: CanvasRenderingContext2D
  baseCanvas: HTMLCanvasElement
  t: number
  elapsed: number
  dtFactor: number
  targetWidth: number
  targetHeight: number
  ribbons: any[]
  stars: any[]
}) {
  // 1. Instantly blit the pre-rendered base canvas (single fast GPU drawImage)
  ctx.drawImage(baseCanvas, 0, 0)

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

  // 4. Confetti ribbons
  ctx.save()
  for (let i = 0; i < ribbons.length; i++) {
    const r = ribbons[i]
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
  }
  ctx.restore()

  // 5. Diamond stars
  ctx.save()
  ctx.globalCompositeOperation = 'screen'
  for (let i = 0; i < stars.length; i++) {
    const s = stars[i]
    s.y -= s.speedY * dtFactor
    if (s.y < -20) {
      s.y = targetHeight + 20
      s.x = Math.random() * targetWidth
    }
    const posX = s.x + Math.sin(t * 1.5 + s.wobbleOffset) * 6
    const twinkle = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset)
    drawDiamondStar(ctx, posX, s.y, s.size, twinkle, t * s.rotSpeed)
  }
  ctx.restore()
}

/**
 * Records the card video using WebCodecs API + mp4-muxer.
 * Produces a true H.264/AAC MP4 directly — no WebM, no ffmpeg.wasm, no CDN download.
 * Works on Chrome 94+ (including Android Chrome) and Safari 16.4+.
 * Guarantees standard 10-second duration and ultra-fast (1-2s) offline encoding.
 */
async function recordImageAsMp4WebCodecs({
  img,
  fileName = 'cardzy-card',
  cardType,
  occasionId,
  audioTrack,
  audioUrl,
  targetAspectRatio = '9:16',
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
  const DURATION_SEC = Math.max(5, durationSeconds || 10)

  // ── Compute 16-pixel aligned video dimensions (default 720x1280 9:16) ──
  const dims = computeVideoDimensions(img, targetAspectRatio)
  const { targetWidth, targetHeight, isNineSixteen, cardX, cardY, cardW, cardH } = dims

  // Pre-render static card, drop shadow, background glow, and badges ONCE (major speedup!)
  const baseCanvas = createCardVideoBaseCanvas({
    img,
    targetWidth,
    targetHeight,
    isNineSixteen,
    cardX,
    cardY,
    cardW,
    cardH,
    cardType,
  })

  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight
  const ctx = canvas.getContext('2d', { alpha: false })
  if (!ctx) throw new Error('Canvas 2D context not supported')
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  // ── Check WebCodecs + H.264 support ──
  if (typeof VideoEncoder === 'undefined') {
    throw new Error('VideoEncoder not supported')
  }

  // Broad set of H.264 profiles covering all Android chipsets & iOS versions
  const codecCandidates = [
    'avc1.42E01E', // Baseline Level 3.0 (broadest mobile hardware support)
    'avc1.42E01F', // Baseline Level 3.1
    'avc1.42001E', // Constrained Baseline Level 3.0
    'avc1.42001F',
    'avc1.4D401E', // Main Level 3.0
    'avc1.4D401F', // Main Level 3.1
    'avc1.4D4028', // Main Level 4.0
    'avc1.64001F', // High Level 3.1
    'avc1.640028', // High Level 4.0
  ]

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
  if (!videoConfig) throw new Error('No H.264 video codec supported for dimensions')

  // ── Probe AudioEncoder Support ──
  const SAMPLE_RATE = 44100
  const NUM_CHANNELS = 2
  const totalAudioSamples = Math.ceil(SAMPLE_RATE * DURATION_SEC)

  let audioConfigured = false
  let audioCandidateConfig: AudioEncoderConfig | null = null

  if (typeof AudioEncoder !== 'undefined') {
    const audioCandidates: AudioEncoderConfig[] = [
      { codec: 'mp4a.40.2', sampleRate: SAMPLE_RATE, numberOfChannels: NUM_CHANNELS, bitrate: 128000 },
      { codec: 'mp4a.40.02', sampleRate: SAMPLE_RATE, numberOfChannels: NUM_CHANNELS, bitrate: 128000 },
    ]
    for (const ac of audioCandidates) {
      try {
        const sup = await AudioEncoder.isConfigSupported(ac)
        if (sup.supported) {
          audioCandidateConfig = ac
          audioConfigured = true
          break
        }
      } catch {}
    }
  }

  // ── Render audio offline if AudioEncoder is available ──
  let renderedAudio: AudioBuffer | null = null
  if (audioConfigured) {
    try {
      const AudioCtxClass = window.OfflineAudioContext || (window as any).webkitOfflineAudioContext
      if (AudioCtxClass) {
        const offlineCtx = new AudioCtxClass(NUM_CHANNELS, totalAudioSamples, SAMPLE_RATE)
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
        renderedAudio = await offlineCtx.startRendering()
      }
    } catch {
      audioConfigured = false
    }
  }

  // ── Set up mp4-muxer ──
  const { Muxer, ArrayBufferTarget } = await import('mp4-muxer')
  const muxerConfig: any = {
    target: new ArrayBufferTarget(),
    video: {
      codec: 'avc',
      width: targetWidth,
      height: targetHeight,
      frameRate: 30,
    },
    fastStart: 'in-memory',
    firstTimestampBehavior: 'offset',
  }
  if (audioConfigured) {
    muxerConfig.audio = {
      codec: 'aac',
      sampleRate: SAMPLE_RATE,
      numberOfChannels: NUM_CHANNELS,
    }
  }
  const muxer = new Muxer(muxerConfig)

  // ── Set up video encoder ──
  let videoError: Error | null = null
  const videoEncoder = new VideoEncoder({
    output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
    error: (e) => { videoError = e instanceof Error ? e : new Error(String(e)) },
  })
  videoEncoder.configure(videoConfig)

  // ── Set up audio encoder if configured ──
  let audioEncoder: AudioEncoder | null = null
  if (audioConfigured && audioCandidateConfig && renderedAudio) {
    try {
      audioEncoder = new AudioEncoder({
        output: (chunk, meta) => muxer.addAudioChunk(chunk, meta),
        error: (e) => {
          console.warn('AudioEncoder warning:', e)
        },
      })
      audioEncoder.configure(audioCandidateConfig)

      const audioChannels = Math.min(renderedAudio.numberOfChannels, NUM_CHANNELS)
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
    } catch {
      audioEncoder = null
      audioConfigured = false
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

  // ── Encode video frames (Ultra-fast offline rendering) ──
  for (let frameIdx = 0; frameIdx < TOTAL_FRAMES; frameIdx++) {
    const t = frameIdx / FPS
    const elapsed = frameIdx * (1000 / FPS)

    drawCardVideoFrame({
      ctx,
      baseCanvas,
      t,
      elapsed,
      dtFactor,
      targetWidth,
      targetHeight,
      ribbons,
      stars,
    })

    const videoFrame = new VideoFrame(canvas, {
      timestamp: frameIdx * FRAME_DURATION_US,
      duration: FRAME_DURATION_US,
    })
    videoEncoder.encode(videoFrame, {
      keyFrame: frameIdx === 0 || frameIdx % (FPS * 2) === 0,
    })
    videoFrame.close()

    if (onProgress) {
      onProgress(Math.min(84, Math.round((frameIdx / TOTAL_FRAMES) * 84)))
    }

    if (videoEncoder.encodeQueueSize > 8) {
      await new Promise((r) => setTimeout(r, 0))
    }

    if (videoError) throw videoError
  }

  // ── Flush encoders ──
  if (onProgress) onProgress(88)
  await videoEncoder.flush()
  videoEncoder.close()

  if (audioEncoder) {
    if (onProgress) onProgress(94)
    try {
      await audioEncoder.flush()
      audioEncoder.close()
    } catch {}
  }

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
 * Solves the 00:01 / 25fps bug on Android video players by guaranteeing
 * true 10-second MP4 output via WebCodecs + 9:16 aligned canvas.
 */
export async function recordImageAsVideo({
  img,
  fileName = 'cardzy-card',
  cardType,
  occasionId,
  audioTrack,
  audioUrl,
  targetAspectRatio = '9:16',
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
  // ── Try WebCodecs first (native H.264 → MP4, no external downloads needed) ──
  if (typeof window !== 'undefined' && typeof VideoEncoder !== 'undefined') {
    try {
      const result = await recordImageAsMp4WebCodecs({
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
      if (result) return result
    } catch (e) {
      console.warn('WebCodecs MP4 recording fallback to MediaRecorder:', extractErrorMessage(e))
    }
  }

  // ── Fallback: MediaRecorder → WebM → fix duration → ffmpeg.wasm → MP4 ──
  const DURATION_SEC = Math.max(5, durationSeconds || 10)
  const DURATION_MS = DURATION_SEC * 1000

  // 16-pixel aligned video dimensions
  const dims = computeVideoDimensions(img, targetAspectRatio)
  const { targetWidth, targetHeight, isNineSixteen, cardX, cardY, cardW, cardH } = dims

  // Pre-render static card base ONCE
  const baseCanvas = createCardVideoBaseCanvas({
    img,
    targetWidth,
    targetHeight,
    isNineSixteen,
    cardX,
    cardY,
    cardW,
    cardH,
    cardType,
  })

  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight
  const ctx = canvas.getContext('2d', { alpha: false })
  if (!ctx) throw new Error('Canvas 2D context not supported')
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  const captureStreamFn = canvas.captureStream || (canvas as any).mozCaptureStream
  if (!captureStreamFn || typeof MediaRecorder === 'undefined') {
    throw new Error('Video recording not supported on this browser')
  }

  const canvasStream: MediaStream = captureStreamFn.call(canvas, 25)

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
        if (!isRealMp4 && (actualMime.includes('webm') || blob.type.includes('webm'))) {
          try {
            const fixFn = (fixWebmDuration as any)?.default || fixWebmDuration
            if (typeof fixFn === 'function') {
              blob = await fixFn(blob, DURATION_MS, { logger: false })
            }
          } catch {}
        }

        let finalBlob = blob
        let ext = isRealMp4 ? 'mp4' : 'webm'

        if (!isRealMp4 && blob.type.includes('webm')) {
          const mp4Blob = await convertWebmToMp4(blob, onProgress, actualMime)
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

      drawCardVideoFrame({
        ctx,
        baseCanvas,
        t,
        elapsed,
        dtFactor,
        targetWidth,
        targetHeight,
        ribbons,
        stars,
      })

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
  targetAspectRatio = '9:16',
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
  targetAspectRatio = '9:16',
  durationSeconds = 10,
  onProgress,
}: CardMediaExportOptions): Promise<boolean> {
  if (!element) return false

  try {
    if (cardType && cardSlug && cardType !== 'poetry') {
      recordCardShare(cardType, cardSlug, 'video')
    }

    // Capture DOM element → canvas → blob URL
    const capturedCanvas = await captureCardCanvas(element, true)
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