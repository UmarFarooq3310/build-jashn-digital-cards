'use client'

import { useState, type RefObject } from 'react'
import { Check, Copy, Download, MessageCircle, Smartphone, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLang } from '@/lib/lang/context'
import { recordCardShare } from '@/lib/jashn/magic-service'

export function ShareBar({
  url,
  waMessage,
  captureRef,
  fileName = 'cardzy-card',
}: {
  url: string
  waMessage: string
  captureRef?: RefObject<HTMLElement | null>
  fileName?: string
}) {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [videoGenerating, setVideoGenerating] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)

  const fullUrl =
    typeof window !== 'undefined' && url.startsWith('/')
      ? `${window.location.origin}${url}`
      : url

  const inferredType = (
    url.includes('/i/') ? 'invite' : url.includes('/w/') ? 'wish' : url.includes('/v/') ? 'vcard' : 'magic'
  ) as 'wish' | 'invite' | 'vcard' | 'magic'
  const inferredSlug = url.split('/').pop()?.split('?')[0] || ''

  function copyLink() {
    if (inferredSlug) {
      recordCardShare(inferredType, inferredSlug, 'copy')
    }
    navigator.clipboard?.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  function shareWhatsApp() {
    if (inferredSlug) {
      recordCardShare(inferredType, inferredSlug, 'whatsapp')
    }
    const text = encodeURIComponent(`${waMessage}\n${fullUrl}`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  function shareSms() {
    if (inferredSlug) {
      recordCardShare(inferredType, inferredSlug, 'sms')
    }
    const text = encodeURIComponent(`${waMessage}\n${fullUrl}`)
    window.open(`sms:?&body=${text}`, '_blank')
  }

  /** Helper: extract a readable message from any thrown value */
  function extractErrorMessage(e: unknown): string {
    if (!e) return 'Empty error'
    if (e instanceof Error) return e.message
    if (e instanceof Event) return `Event: ${e.type}`
    if (typeof e === 'string') return e
    if (typeof e === 'object') {
      const obj = e as Record<string, unknown>
      return obj.message as string || obj.name as string || obj.error as string || JSON.stringify(e)
    }
    return String(e)
  }

  async function downloadVideo() {
    if (!captureRef?.current) return
    setVideoGenerating(true)
    setVideoProgress(0)
    let step = 'init'
    try {
      if (inferredSlug) {
        recordCardShare(inferredType, inferredSlug, 'video')
      }

      step = 'import html-to-image'
      const { toPng } = await import('html-to-image')
      const el = captureRef.current

      // Temporarily patch cssRules to suppress SecurityError on cross-origin sheets
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
          }
        })
      }
      
      const naturalWidth = el.offsetWidth || 480
      const naturalHeight = el.offsetHeight || 640
      
      // Standardize to high-definition 720px width (even numbers required for video codecs)
      let targetWidth = Math.max(720, Math.min(960, Math.round(naturalWidth * 1.5)))
      if (targetWidth % 2 !== 0) targetWidth += 1
      const scale = targetWidth / naturalWidth
      let targetHeight = Math.round(naturalHeight * scale)
      if (targetHeight % 2 !== 0) targetHeight += 1

      // 1×1 transparent pixel as placeholder for any cross-origin images that fail to fetch
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
        // Prevent html-to-image from rejecting with raw Event objects ({})
        // when cloned image elements fail to load from their data URLs
        onImageErrorHandler: () => { /* swallow image load errors */ },
        fetchRequestInit: { cache: 'force-cache' as RequestCache },
        style: {
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          animation: 'none',
          transition: 'none',
          width: `${naturalWidth}px`,
          height: `${naturalHeight}px`,
          maxWidth: 'none',
          margin: '0',
        },
      }

      step = 'capture card snapshot'
      let dataUrl: string
      try {
        dataUrl = await toPng(el, toPngOptions)
      } catch {
        // Attempt 2: skip web fonts (common CORS issue with Google Fonts in SVG)
        try {
          dataUrl = await toPng(el, { ...toPngOptions, skipFonts: true })
        } catch {
          // Attempt 3: skip fonts + reduce resolution (handles canvas memory limits)
          try {
            dataUrl = await toPng(el, { ...toPngOptions, skipFonts: true, pixelRatio: 1 })
          } catch (finalErr) {
            throw new Error(`Card snapshot failed after 3 attempts: ${extractErrorMessage(finalErr)}`)
          }
        }
      } finally {
        // Always restore original cssRules descriptor
        if (originalCssRulesDesc) {
          Object.defineProperty(CSSStyleSheet.prototype, 'cssRules', originalCssRulesDesc)
        }
      }

      step = 'load snapshot image'
      const img = new Image()
      img.src = dataUrl
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = () => reject(new Error('Snapshot image failed to load'))
      })

      step = 'create canvas'
      const canvas = document.createElement('canvas')
      canvas.width = targetWidth
      canvas.height = targetHeight
      const ctx = canvas.getContext('2d')

      if (!ctx) throw new Error('Canvas 2D context not supported')
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'

      // Supported video codecs — MP4 first (Chrome 121+ supports natively), WebM fallback
      step = 'detect codecs'
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

      step = 'create capture stream'
      const captureStreamFn = canvas.captureStream || (canvas as any).mozCaptureStream
      if (!captureStreamFn || typeof MediaRecorder === 'undefined') {
        throw new Error('Video recording not supported on this browser')
      }

      const stream = captureStreamFn.call(canvas, 30)
      const options: MediaRecorderOptions = {}
      if (mimeType) options.mimeType = mimeType

      step = 'create MediaRecorder'
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

      // Determine the actual MIME type and file extension from what the recorder is using
      const actualMime = recorder.mimeType || mimeType || 'video/mp4'
      const ext = actualMime.includes('webm') ? 'webm' : 'mp4'

      const chunks: BlobPart[] = []
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data)
        }
      }

      step = 'record animation'
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

      // 5 Seconds at 30fps = 150 frames
      const totalFrames = 150
      let frame = 0

      // Luxury Particle & Star Glint Setup
      const particles = Array.from({ length: 35 }).map((_, i) => ({
        x: Math.random() * targetWidth,
        y: Math.random() * targetHeight + targetHeight * 0.15,
        radius: Math.random() * 3 + 1,
        speedY: Math.random() * 2 + 0.8,
        wobbleSpeed: Math.random() * 0.08 + 0.02,
        wobbleOffset: Math.random() * Math.PI * 2,
        isStar: i % 4 === 0, // 25% of particles are 4-pointed glint stars
        starSize: Math.random() * 9 + 5,
        twinkleSpeed: Math.random() * 0.15 + 0.05,
        twinkleOffset: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
      }))

      // Helper to render 4-point luxury diamond glint star
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

        // Bright white center core
        ctx.beginPath()
        ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.fill()
        ctx.restore()
      }

      const drawFrame = () => {
        ctx.clearRect(0, 0, targetWidth, targetHeight)

        const p = frame / totalFrames
        // Smooth ease-out cubic for cinematic push-in
        const ease = 1 - Math.pow(1 - p, 3)

        // 1. Draw card image cleanly across full canvas bounds
        ctx.save()
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
        ctx.restore()

        // 2. High-End Diamond Light Sheen (Two ultra-smooth sweeping passes)
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

        // 3. Floating Golden Twinkle Stars & Bokeh Dust
        ctx.save()
        ctx.globalCompositeOperation = 'screen'
        particles.forEach((pt) => {
          pt.y -= pt.speedY
          // Recycle particles that float above the canvas back to the bottom
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

        // 4. Subtle Luxury Border Vignette & Glow
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

        setVideoProgress(Math.min(99, Math.round((frame / totalFrames) * 100)))

        frame++
        if (frame <= totalFrames) {
          setTimeout(drawFrame, 33) // ~30fps
        } else {
          setVideoProgress(100)
          setTimeout(() => {
            if (recorder.state !== 'inactive') {
              recorder.stop()
            }
          }, 200)
        }
      }

      drawFrame()
      await recordingPromise
      setVideoGenerating(false)
    } catch (e: unknown) {
      const msg = extractErrorMessage(e)
      console.error(`Video generation failed at [${step}]:`, msg)
      setVideoGenerating(false)
    }
  }

  async function downloadPng() {
    if (!captureRef?.current) return
    setDownloading(true)
    try {
      if (inferredSlug) {
        recordCardShare(inferredType, inferredSlug, 'image')
      }
      const { toPng } = await import('html-to-image')
      const originalCssRules = Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype, 'cssRules')
      if (originalCssRules) {
        Object.defineProperty(CSSStyleSheet.prototype, 'cssRules', {
          get() {
            try {
              return originalCssRules.get!.call(this)
            } catch (e) {
              return []
            }
          }
        })
      }
      const naturalWidth = captureRef.current.offsetWidth
      const naturalHeight = captureRef.current.offsetHeight
      
      // Standardize capture to a clean, high-resolution desktop width (minimum 620px)
      const targetWidth = Math.max(620, naturalWidth)
      const scale = targetWidth / naturalWidth
      const targetHeight = Math.round(naturalHeight * scale)
      
      const dataUrl = await toPng(captureRef.current, {
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
          margin: '0',
        },
      })
      
      const link = document.createElement('a')
      link.download = `${fileName}.png`
      link.href = dataUrl
      link.click()
    } catch (e) {
      console.error('PNG download failed:', e)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button onClick={shareWhatsApp} className="bg-[#25D366] text-white hover:bg-[#1eb955] font-bold">
        <MessageCircle className="size-4" />
        WhatsApp
      </Button>
      <Button onClick={shareSms} className="bg-blue-600 text-white hover:bg-blue-500 font-bold">
        <Smartphone className="size-4" />
        SMS Text
      </Button>
      <Button onClick={copyLink} variant="secondary">
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? (t('copied') || 'Copied!') : (t('copyLink') || 'Copy link')}
      </Button>
      {captureRef ? (
        <>
          <Button onClick={downloadPng} variant="outline" disabled={downloading || videoGenerating} className="bg-white hover:bg-zinc-100 text-black dark:text-black font-extrabold border-zinc-300 shadow-xs">
            <Download className="size-4 text-black" />
            <span className="text-black font-extrabold">{downloading ? (t('saving') || 'Saving…') : 'PNG'}</span>
          </Button>
          {inferredType !== 'magic' && (
            <Button
              onClick={downloadVideo}
              variant="outline"
              disabled={downloading || videoGenerating}
              className="bg-[#7A1E2B] hover:bg-[#5a1620] text-white border-transparent shadow-md font-extrabold"
            >
              <Video className="size-4" />
              <span className="font-extrabold">
                {videoGenerating
                  ? videoProgress > 0
                    ? `Making Video ${videoProgress}%`
                    : 'Making Video…'
                  : 'Download Video'}
              </span>
            </Button>
          )}
        </>
      ) : null}
    </div>
  )
}
