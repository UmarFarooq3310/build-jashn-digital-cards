'use client'

import { recordCardShare } from '@/lib/jashn/magic-service'

export interface CardMediaExportOptions {
  element: HTMLElement | null
  fileName?: string
  cardType?: 'invite' | 'wish' | 'vcard' | 'magic'
  cardSlug?: string
  onProgress?: (percent: number) => void
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
    if (cardType && cardSlug) {
      recordCardShare(cardType, cardSlug, 'image')
    }

    const { toPng } = await import('html-to-image')

    const originalCssRules = Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype, 'cssRules')
    if (originalCssRules) {
      Object.defineProperty(CSSStyleSheet.prototype, 'cssRules', {
        get() {
          try {
            return originalCssRules.get!.call(this)
          } catch {
            return []
          }
        },
      })
    }

    // Calculate full natural dimensions using scrollHeight/scrollWidth to prevent mobile clipping of victory report/squad
    const naturalWidth = Math.max(element.offsetWidth, element.scrollWidth, 480)
    const naturalHeight = Math.max(element.offsetHeight, element.scrollHeight, 640)

    const targetWidth = Math.max(620, naturalWidth)
    const scale = targetWidth / naturalWidth
    const targetHeight = Math.round(naturalHeight * scale)

    const dataUrl = await toPng(element, {
      cacheBust: true,
      filter: (node: Node) => {
        const el = node as HTMLElement
        if (!el || !el.tagName) return true
        if (['IFRAME', 'SCRIPT', 'INS'].includes(el.tagName)) return false
        if (el.hasAttribute && (el.hasAttribute('data-no-download') || el.hasAttribute('data-export-ignore'))) return false
        if (el.classList && (el.classList.contains('no-export') || el.classList.contains('no-download'))) return false
        return true
      },
      width: targetWidth,
      height: targetHeight,
      pixelRatio: 2,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        animation: 'none',
        transition: 'none',
        width: `${naturalWidth}px`,
        height: `${naturalHeight}px`,
        maxHeight: 'none',
        overflow: 'visible',
        margin: '0',
      },
    })

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
 * Renders and downloads an animated video (MP4 / WebM) of the given card element.
 */
/**
 * Animates an Image with celebration particles & light beam, records it into an MP4/WebM video,
 * and triggers a direct browser download.
 */
export async function recordImageAsVideo({
  img,
  fileName = 'cardzy-card',
  onProgress,
}: {
  img: HTMLImageElement
  fileName?: string
  onProgress?: (percent: number) => void
}): Promise<boolean> {
  let targetWidth = img.naturalWidth || img.width || 720
  let targetHeight = img.naturalHeight || img.height || 1280

  // Constrain width to 720-1080 for optimal mobile video recording performance
  if (targetWidth > 1080) {
    const scale = 1080 / targetWidth
    targetWidth = 1080
    targetHeight = Math.round(targetHeight * scale)
  }

  // Ensure width and height are even integers (h264 hardware encoding requirement)
  if (targetWidth % 2 !== 0) targetWidth += 1
  if (targetHeight % 2 !== 0) targetHeight += 1

  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas 2D context not supported')
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  const candidateTypes = [
    'video/mp4;codecs=avc1.640028',
    'video/mp4;codecs=avc1',
    'video/mp4;codecs=h264',
    'video/mp4',
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm',
  ]
  let mimeType = ''
  if (typeof MediaRecorder !== 'undefined') {
    mimeType =
      candidateTypes.find((t) => {
        try {
          return MediaRecorder.isTypeSupported(t)
        } catch {
          return false
        }
      }) || ''
  }

  const captureStreamFn = canvas.captureStream || (canvas as any).mozCaptureStream
  if (!captureStreamFn || typeof MediaRecorder === 'undefined') {
    throw new Error('Video recording not supported on this browser')
  }

  const stream = captureStreamFn.call(canvas, 30)
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

  const actualMime = recorder.mimeType || mimeType || 'video/mp4'
  const ext = actualMime.includes('webm') ? 'webm' : 'mp4'

  const chunks: BlobPart[] = []
  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) {
      chunks.push(e.data)
    }
  }

  const recordingPromise = new Promise<void>((resolve, reject) => {
    recorder.onerror = (ev) => {
      const detail = (ev as any)?.error?.message || 'recorder error event'
      reject(new Error(`MediaRecorder error: ${detail}`))
    }
    recorder.onstop = () => {
      try {
        const blob = new Blob(chunks, { type: actualMime })
        if (blob.size === 0) {
          reject(new Error('Video recording produced empty file'))
          return
        }
        const blobUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
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

  const totalFrames = 150
  let frame = 0

  const particles = Array.from({ length: 35 }).map((_, i) => ({
    x: Math.random() * targetWidth,
    y: Math.random() * targetHeight + targetHeight * 0.15,
    radius: Math.random() * 3 + 1,
    speedY: Math.random() * 2 + 0.8,
    wobbleSpeed: Math.random() * 0.08 + 0.02,
    wobbleOffset: Math.random() * Math.PI * 2,
    isStar: i % 4 === 0,
    starSize: Math.random() * 9 + 5,
    twinkleSpeed: Math.random() * 0.15 + 0.05,
    twinkleOffset: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.04,
  }))

  const drawDiamondStar = (cx: number, cy: number, size: number, opacity: number, rotation: number) => {
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(rotation)
    ctx.fillStyle = `rgba(255, 245, 190, ${opacity})`
    ctx.shadowBlur = 12
    ctx.shadowColor = `rgba(255, 220, 110, ${opacity * 0.95})`

    ctx.beginPath()
    for (let i = 0; i < 4; i++) {
      ctx.lineTo(Math.cos((i * Math.PI) / 2) * size, Math.sin((i * Math.PI) / 2) * size)
      ctx.lineTo(
        Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.22),
        Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.22)
      )
    }
    ctx.closePath()
    ctx.fill()

    ctx.beginPath()
    ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
    ctx.fill()
    ctx.restore()
  }

  return await new Promise<boolean>((resolve) => {
    const drawFrame = () => {
      ctx.clearRect(0, 0, targetWidth, targetHeight)

      const p = frame / totalFrames
      ctx.save()
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
      ctx.restore()

      const sweepProgress = (p * 2) % 1
      const rayX = sweepProgress * (targetWidth * 2.8) - targetWidth * 0.8

      ctx.save()
      ctx.globalCompositeOperation = 'overlay'
      const beamGradient = ctx.createLinearGradient(rayX, 0, rayX + 220, targetHeight)
      beamGradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
      beamGradient.addColorStop(0.3, 'rgba(255, 235, 175, 0.2)')
      beamGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.65)')
      beamGradient.addColorStop(0.7, 'rgba(255, 235, 175, 0.2)')
      beamGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

      ctx.fillStyle = beamGradient
      ctx.transform(1, 0, -0.35, 1, 0, 0)
      ctx.fillRect(rayX, -50, 320, targetHeight + 100)
      ctx.restore()

      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      particles.forEach((pt) => {
        pt.y -= pt.speedY
        if (pt.y < -20) {
          pt.y = targetHeight + Math.random() * 40
          pt.x = Math.random() * targetWidth
        }
        const x = pt.x + Math.sin(frame * pt.wobbleSpeed + pt.wobbleOffset) * 14
        const baseAlpha = Math.max(0, 1 - pt.y / targetHeight)
        const twinkle = 0.5 + 0.5 * Math.sin(frame * pt.twinkleSpeed + pt.twinkleOffset)
        const alpha = baseAlpha * twinkle

        if (pt.isStar) {
          const rot = frame * pt.rotationSpeed + pt.wobbleOffset
          drawDiamondStar(x, pt.y, pt.starSize, alpha, rot)
        } else {
          ctx.beginPath()
          ctx.arc(x, pt.y, pt.radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 235, 140, ${alpha * 0.9})`
          ctx.shadowBlur = 10
          ctx.shadowColor = `rgba(255, 215, 100, ${alpha * 0.8})`
          ctx.fill()
        }
      })
      ctx.restore()

      ctx.save()
      ctx.globalCompositeOperation = 'soft-light'
      const borderGlow = ctx.createRadialGradient(
        targetWidth / 2,
        targetHeight / 2,
        targetWidth * 0.4,
        targetWidth / 2,
        targetHeight / 2,
        targetWidth * 0.85
      )
      borderGlow.addColorStop(0, 'rgba(255, 255, 255, 0)')
      borderGlow.addColorStop(1, 'rgba(218, 165, 32, 0.35)')
      ctx.fillStyle = borderGlow
      ctx.fillRect(0, 0, targetWidth, targetHeight)
      ctx.restore()

      const progressPercent = Math.min(99, Math.round((frame / totalFrames) * 100))
      if (onProgress) onProgress(progressPercent)

      frame++
      if (frame <= totalFrames) {
        setTimeout(drawFrame, 33)
      } else {
        if (onProgress) onProgress(100)
        setTimeout(() => {
          if (recorder.state !== 'inactive') {
            recorder.stop()
          }
        }, 200)
      }
    }

    drawFrame()
    recordingPromise
      .then(() => resolve(true))
      .catch((err) => {
        console.error('Video generation failed:', extractErrorMessage(err))
        resolve(false)
      })
  })
}

/**
 * Downloads a rendered HTML5 Canvas as an animated celebration video.
 */
export async function downloadCanvasAsVideo({
  canvas,
  fileName = 'cardzy-card',
  onProgress,
}: {
  canvas: HTMLCanvasElement
  fileName?: string
  onProgress?: (percent: number) => void
}): Promise<boolean> {
  const dataUrl = canvas.toDataURL('image/png')
  const img = new Image()
  img.src = dataUrl
  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = () => reject(new Error('Canvas image load failed'))
  })
  return recordImageAsVideo({ img, fileName, onProgress })
}

/**
 * Records a 4-5 second animated celebration video (with golden particles & light sweep)
 * from a DOM card element, and prompts direct MP4/WebM download.
 */
export async function downloadCardVideo({
  element,
  fileName = 'cardzy-card',
  cardType,
  cardSlug,
  onProgress,
}: CardMediaExportOptions): Promise<boolean> {
  if (!element) return false

  try {
    if (cardType && cardSlug) {
      recordCardShare(cardType, cardSlug, 'video')
    }

    const { toPng } = await import('html-to-image')

    const originalCssRulesDesc = Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype, 'cssRules')
    if (originalCssRulesDesc) {
      Object.defineProperty(CSSStyleSheet.prototype, 'cssRules', {
        configurable: true,
        get() {
          try {
            return originalCssRulesDesc.get!.call(this)
          } catch {
            return []
          }
        },
      })
    }

    const naturalWidth = Math.max(element.offsetWidth, element.scrollWidth, 480)
    const naturalHeight = Math.max(element.offsetHeight, element.scrollHeight, 640)

    let targetWidth = Math.max(720, Math.min(960, Math.round(naturalWidth * 1.5)))
    if (targetWidth % 2 !== 0) targetWidth += 1
    const scale = targetWidth / naturalWidth
    let targetHeight = Math.round(naturalHeight * scale)
    if (targetHeight % 2 !== 0) targetHeight += 1

    const TRANSPARENT_PIXEL =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQABNjN9GQAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAA0lEQVQI12P4z8BQDwAEgAF/QualzQAAAABJRU5ErkJggg=='

    const toPngOptions: Record<string, unknown> = {
      cacheBust: true,
      filter: (node: Node) => {
        const el = node as HTMLElement
        if (!el || !el.tagName) return true
        if (['IFRAME', 'SCRIPT', 'INS'].includes(el.tagName)) return false
        if (el.hasAttribute && (el.hasAttribute('data-no-download') || el.hasAttribute('data-export-ignore'))) return false
        if (el.classList && (el.classList.contains('no-export') || el.classList.contains('no-download'))) return false
        return true
      },
      width: targetWidth,
      height: targetHeight,
      pixelRatio: 2,
      imagePlaceholder: TRANSPARENT_PIXEL,
      skipFonts: false,
      onImageErrorHandler: () => {},
      fetchRequestInit: { cache: 'force-cache' as RequestCache },
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        animation: 'none',
        transition: 'none',
        width: `${naturalWidth}px`,
        height: `${naturalHeight}px`,
        maxWidth: 'none',
        maxHeight: 'none',
        overflow: 'visible',
        margin: '0',
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
      if (originalCssRulesDesc) {
        Object.defineProperty(CSSStyleSheet.prototype, 'cssRules', originalCssRulesDesc)
      }
    }

    const img = new Image()
    img.src = dataUrl
    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = () => reject(new Error('Snapshot image failed to load'))
    })

    return recordImageAsVideo({ img, fileName, onProgress })
  } catch (e: unknown) {
    console.error('Video export error:', extractErrorMessage(e))
    return false
  }
}

