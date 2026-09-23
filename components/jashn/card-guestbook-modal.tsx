'use client'

import React, { useState, useEffect } from 'react'
import {
  MessageCircle,
  Heart,
  Sparkles,
  Send,
  X,
  Clock,
  User,
  ShieldCheck,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import {
  GuestbookWish,
  postGuestbookWish,
  subscribeCardWishes,
  validateWishContent,
} from '@/lib/jashn/guestbook-service'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang/context'

interface CardGuestbookModalProps {
  cardSlug: string
  cardType?: 'magic' | 'invite' | 'wish'
  cardTitle?: string
  recipientName: string
  isOpen: boolean
  onClose: () => void
  onWishSubmitted?: () => void
}

const EMOJI_OPTIONS = [
  { emoji: '💖', label: 'Love' },
  { emoji: '🎂', label: 'Birthday' },
  { emoji: '🌸', label: 'Dua' },
  { emoji: '💍', label: 'Shaadi' },
  { emoji: '🥂', label: 'Cheers' },
  { emoji: '✨', label: 'Joy' },
  { emoji: '🤲', label: 'Blessings' },
]

function formatWishRelativeTime(timestamp: number): string {
  const diffSec = Math.floor((Date.now() - timestamp) / 1000)
  if (diffSec < 60) return 'Just now'
  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHour = Math.floor(diffMin / 60)
  if (diffHour < 24) return `${diffHour}h ago`
  const diffDays = Math.floor(diffHour / 24)
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 30) return `${diffDays}d ago`
  return `${Math.floor(diffDays / 30)}mo ago`
}

export function CardGuestbookModal({
  cardSlug,
  cardType = 'magic',
  cardTitle,
  recipientName,
  isOpen,
  onClose,
  onWishSubmitted,
}: CardGuestbookModalProps) {
  const { t } = useLang()
  const [wishes, setWishes] = useState<GuestbookWish[]>([])
  const [guestName, setGuestName] = useState('')
  const [message, setMessage] = useState('')
  const [selectedEmoji, setSelectedEmoji] = useState('💖')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successNotice, setSuccessNotice] = useState<string | null>(null)

  const [lastPostedWish, setLastPostedWish] = useState<{ guestName: string; message: string; emoji: string } | null>(null)

  // Real-time subscription to wishes for this specific card
  useEffect(() => {
    if (!isOpen || !cardSlug) return
    const unsubscribe = subscribeCardWishes(cardSlug, (updatedWishes) => {
      setWishes(updatedWishes)
    })
    return () => unsubscribe()
  }, [isOpen, cardSlug])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessNotice(null)

    const check = validateWishContent(guestName, message)
    if (!check.valid) {
      setError(check.error || 'Please enter a valid wish.')
      return
    }

    setLoading(true)
    try {
      await postGuestbookWish({
        cardSlug,
        cardType,
        cardTitle: cardTitle || `${recipientName}'s Celebration`,
        guestName,
        message,
        emoji: selectedEmoji,
      })

      const submitted = { guestName, message, emoji: selectedEmoji }
      setLastPostedWish(submitted)
      setMessage('')
      setSuccessNotice('✨ Your wish has been pinned to the Wishes Wall!')
      if (onWishSubmitted) onWishSubmitted()
      setTimeout(() => setSuccessNotice(null), 6000)
    } catch (err: any) {
      setError(err?.message || 'Could not post wish. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const wishReturnUrl = typeof window !== 'undefined' ? `${window.location.origin}/${cardType === 'magic' ? 'm' : cardType === 'invite' ? 'i' : 'w'}/${cardSlug}` : ''
  const whatsAppWishHref = lastPostedWish
    ? `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${lastPostedWish.emoji} "${lastPostedWish.message}" — ${lastPostedWish.guestName} sent a wish for ${recipientName} on Cardzy!\n\nView celebration: ${wishReturnUrl}`
      )}`
    : ''

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-lg bg-slate-950/95 border border-amber-400/50 rounded-3xl p-5 sm:p-6 shadow-[0_0_60px_rgba(245,158,11,0.25)] text-white flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Ornate Gold Corner Filigrees */}
        <div className="absolute top-2 left-2 size-5 border-t-2 border-l-2 border-amber-400/80 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-2 right-2 size-5 border-t-2 border-r-2 border-amber-400/80 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-2 left-2 size-5 border-b-2 border-l-2 border-amber-400/80 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-2 right-2 size-5 border-b-2 border-r-2 border-amber-400/80 rounded-br-lg pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="size-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-xl shadow-inner">
              💬
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-amber-200">
                  {t('wishesWallTitle', 'Guestbook & Wishes Wall')}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-amber-300 text-[10px] font-bold border border-white/15">
                  {wishes.length} {wishes.length === 1 ? 'Wish' : 'Wishes'}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {t('leaveABlessing', 'Leave a heartfelt wish or Dua')} for <span className="text-amber-300 font-bold">{recipientName}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Scrollable Wishes Feed */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1.5 my-2 min-h-[140px] max-h-[320px] sm:max-h-[380px] scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {wishes.length === 0 ? (
            <div className="py-8 text-center space-y-2 bg-white/5 border border-white/10 rounded-2xl p-4">
              <span className="text-3xl animate-bounce block">✨</span>
              <p className="text-xs font-bold text-amber-200">
                No wishes pinned yet!
              </p>
              <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                Be the very first family member or friend to write a blessing on {recipientName}&apos;s wall.
              </p>
            </div>
          ) : (
            wishes.map((w) => (
              <div
                key={w.id}
                className="p-3 bg-white/5 hover:bg-white/8 border border-white/10 rounded-2xl transition-all text-left shadow-sm space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="size-6 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-xs">
                      {w.emoji || '💖'}
                    </span>
                    <span className="text-xs font-bold text-amber-200">
                      {w.guestName}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="size-3 text-slate-500" />
                    {formatWishRelativeTime(w.createdAt)}
                  </span>
                </div>

                <p className="text-xs text-slate-100 leading-relaxed font-sans pl-8">
                  {w.message}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Success Alert */}
        {successNotice && (
          <div className="p-3 bg-emerald-950/90 border border-emerald-400/60 rounded-2xl text-xs text-emerald-200 font-semibold flex flex-col gap-2 animate-in fade-in my-1.5 shadow-md">
            <div className="flex items-center gap-2">
              <Sparkles className="size-3.5 text-emerald-400 shrink-0" />
              <span>{successNotice}</span>
            </div>
            {lastPostedWish && whatsAppWishHref && (
              <a
                href={whatsAppWishHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all"
              >
                <span>Share Wish via WhatsApp 💬</span>
              </a>
            )}
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-2.5 bg-rose-950/80 border border-rose-400/50 rounded-xl text-xs text-rose-200 font-semibold flex items-center gap-2 animate-in fade-in my-1.5">
            <AlertCircle className="size-3.5 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Post a Wish Form */}
        <form onSubmit={handleSubmit} className="border-t border-white/10 pt-3 mt-1 space-y-2.5">
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Guest Name */}
            <div className="flex-1">
              <input
                type="text"
                required
                maxLength={40}
                placeholder="Your Name (e.g. Sara / Ali & Family)"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-3 py-2 bg-black/60 border border-white/20 rounded-xl text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Emoji Pill Selector */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
              {EMOJI_OPTIONS.map((opt) => (
                <button
                  key={opt.emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(opt.emoji)}
                  className={cn(
                    'size-7 rounded-lg text-xs flex items-center justify-center transition-all cursor-pointer shrink-0',
                    selectedEmoji === opt.emoji
                      ? 'bg-amber-400 text-slate-950 font-bold scale-110 shadow-md ring-1 ring-amber-300'
                      : 'bg-white/10 hover:bg-white/20 text-slate-300'
                  )}
                  title={opt.label}
                >
                  {opt.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Message Textarea */}
          <div className="relative">
            <textarea
              required
              rows={2}
              maxLength={400}
              placeholder={`Write your warm wish, blessing, or Dua for ${recipientName}...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 bg-black/60 border border-white/20 rounded-xl text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 leading-relaxed resize-none"
            />
          </div>

          <div className="flex items-center justify-between gap-2 pt-0.5">
            <div className="flex items-center gap-1 text-[10px] text-slate-400">
              <ShieldCheck className="size-3 text-emerald-400" />
              <span>Family-friendly & Safe</span>
            </div>

            <button
              type="submit"
              disabled={loading || !guestName.trim() || !message.trim()}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="size-3 animate-spin" />
                  <span>Posting...</span>
                </>
              ) : (
                <>
                  <Send className="size-3" />
                  <span>Post Wish ✨</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
