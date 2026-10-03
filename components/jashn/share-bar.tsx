'use client'

import { useState, type RefObject } from 'react'
import { Check, Copy, Download, MessageCircle, Smartphone, Video, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLang } from '@/lib/lang/context'
import { recordCardShare } from '@/lib/jashn/magic-service'
import { downloadCardPng, downloadCardVideo } from '@/lib/jashn/card-media-export'

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
    // Universal WhatsApp share URL that triggers the native app on mobile or WhatsApp Web on desktop
    const waUrl = `https://api.whatsapp.com/send?text=${text}`
    window.open(waUrl, '_blank')
  }

  async function shareNative() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        if (inferredSlug) {
          recordCardShare(inferredType, inferredSlug, 'app')
        }
        await navigator.share({
          title: 'Cardzy Digital Card',
          text: waMessage,
          url: fullUrl,
        })
      } catch {
        // User dismissed or cancelled
      }
    } else {
      copyLink()
    }
  }

  function shareSms() {
    if (inferredSlug) {
      recordCardShare(inferredType, inferredSlug, 'sms')
    }
    const text = encodeURIComponent(`${waMessage}\n${fullUrl}`)
    window.open(`sms:?&body=${text}`, '_blank')
  }

  async function downloadVideo() {
    if (!captureRef?.current) return
    setVideoGenerating(true)
    setVideoProgress(0)
    try {
      await downloadCardVideo({
        element: captureRef.current,
        fileName,
        cardType: inferredType,
        cardSlug: inferredSlug,
        onProgress: (percent) => setVideoProgress(percent),
      })
    } finally {
      setVideoGenerating(false)
      setVideoProgress(0)
    }
  }

  async function downloadPng() {
    if (!captureRef?.current) return
    setDownloading(true)
    try {
      await downloadCardPng({
        element: captureRef.current,
        fileName,
        cardType: inferredType,
        cardSlug: inferredSlug,
      })
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button onClick={shareWhatsApp} className="bg-[#25D366] text-white hover:bg-[#1eb955] font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all">
        <MessageCircle className="size-4" />
        <span>WhatsApp</span>
      </Button>
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <Button onClick={shareNative} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all">
          <Share2 className="size-4" />
          <span>{t('shareViaApps') || 'Share'}</span>
        </Button>
      )}
      <Button onClick={shareSms} className="bg-blue-600 text-white hover:bg-blue-500 font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all">
        <Smartphone className="size-4" />
        <span>SMS</span>
      </Button>
      <Button onClick={copyLink} variant="secondary" className="font-bold shadow-xs hover:scale-[1.02] active:scale-95 transition-all">
        {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
        <span>{copied ? (t('copied') || 'Copied!') : (t('copyLink') || 'Copy Link')}</span>
      </Button>
      {captureRef && inferredType !== 'magic' ? (
        <>
          <Button onClick={downloadPng} variant="outline" disabled={downloading || videoGenerating} className="bg-white hover:bg-zinc-100 text-black dark:text-black font-extrabold border-zinc-300 shadow-xs active:scale-95 transition-all">
            <Download className="size-4 text-black" />
            <span className="text-black font-extrabold">{downloading ? (t('saving') || 'Saving…') : 'PNG'}</span>
          </Button>
          <Button
            onClick={downloadVideo}
            variant="outline"
            disabled={downloading || videoGenerating}
            className="bg-[#7A1E2B] hover:bg-[#5a1620] text-white border-transparent shadow-md font-extrabold active:scale-95 transition-all"
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
        </>
      ) : null}
    </div>
  )
}
