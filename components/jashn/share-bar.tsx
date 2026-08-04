'use client'

import { useState, type RefObject } from 'react'
import { Check, Copy, Download, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLang } from '@/lib/lang/context'

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

  function copyLink() {
    navigator.clipboard?.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  function shareWhatsApp() {
    const text = encodeURIComponent(`${waMessage}\n${fullUrl}`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  async function downloadPng() {
    if (!captureRef?.current) return
    setDownloading(true)
    try {
      const { toPng } = await import('html-to-image')
      const width = captureRef.current.offsetWidth
      const height = captureRef.current.offsetHeight
      
      const dataUrl = await toPng(captureRef.current, {
        cacheBust: true,
        width,
        height,
        pixelRatio: 2,
        style: {
          transform: 'none',
          transformOrigin: 'unset',
          animation: 'none',
          transition: 'none',
          width: `${width}px`,
          height: `${height}px`,
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
