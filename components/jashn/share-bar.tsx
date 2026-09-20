'use client'

import { useState, type RefObject } from 'react'
import { Check, Copy, Download, MessageCircle, Smartphone } from 'lucide-react'
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

  async function downloadPng() {
    if (!captureRef?.current) return
    setDownloading(true)
    try {
      if (inferredSlug) {
        recordCardShare(inferredType, inferredSlug, 'image')
      }
      const { toPng } = await import('html-to-image')
      const naturalWidth = captureRef.current.offsetWidth
      const naturalHeight = captureRef.current.offsetHeight
      
      // Standardize capture to a clean, high-resolution desktop width (minimum 620px)
      // so when saved on mobile screens, the resulting PNG has the exact same spacious, crisp desktop proportions!
      const targetWidth = Math.max(620, naturalWidth)
      const scale = targetWidth / naturalWidth
      const targetHeight = Math.round(naturalHeight * scale)
      
      const dataUrl = await toPng(captureRef.current, {
        cacheBust: true,
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
        <Button onClick={downloadPng} variant="outline" disabled={downloading} className="bg-white hover:bg-zinc-100 text-black dark:text-black font-extrabold border-zinc-300 shadow-xs">
          <Download className="size-4 text-black" />
          <span className="text-black font-extrabold">{downloading ? (t('saving') || 'Saving…') : (t('downloadPng') || 'Download PNG')}</span>
        </Button>
      ) : null}
    </div>
  )
}
