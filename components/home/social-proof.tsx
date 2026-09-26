'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Star, Award, MessageSquarePlus, X, Send, Loader2, Sparkles, User, MapPin } from 'lucide-react'
import { useLang } from '@/lib/lang/context'
import { useJashn } from '@/lib/jashn/store'
import { getFirebaseDb } from '@/lib/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { TestimonialItem } from '@/lib/jashn/testimonials'
import { cn } from '@/lib/utils'

export function SocialProofSection() {
  const { t } = useLang()
  const showToast = useJashn((s) => s.showToast)

  const [reviews, setReviews] = useState<TestimonialItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState<number>(6)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Review Form state
  const [reviewForm, setReviewForm] = useState({
    name: '',
    role: '',
    comment: '',
    stars: 5,
  })
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)

  // Load testimonials from Firebase Firestore
  useEffect(() => {
    let isMounted = true

    // 1. Fetch immediately from backend API (connected to Firebase Admin Firestore)
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          if (Array.isArray(data?.testimonials)) {
            setReviews(data.testimonials)
          }
          setIsLoading(false)
        }
      })
      .catch((err) => {
        console.warn('Notice loading testimonials:', err)
        if (isMounted) setIsLoading(false)
      })

    // 2. Also listen for real-time live updates if client Firebase is connected
    let unsub = () => {}
    try {
      const activeDb = getFirebaseDb()
      if (activeDb) {
        const collRef = collection(activeDb, 'testimonials')
        unsub = onSnapshot(
          collRef,
          (snap) => {
            if (!isMounted) return
            const list: TestimonialItem[] = snap.docs.map((doc) => {
              const data = doc.data()
              return {
                id: doc.id,
                name: data.name || 'Anonymous Sender',
                role: data.role || 'Digital Card Sender',
                comment: data.comment || '',
                stars: Number(data.stars ?? data.rating ?? 5),
                color: data.color || 'emerald',
                createdAt: data.createdAt || Date.now(),
                location: data.location || '',
                country: data.country || '',
                city: data.city || '',
                isApproved: data.isApproved !== false,
              }
            })
            list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
            setReviews(list)
            setIsLoading(false)
          },
          (err) => {
            console.warn('Snapshot listener notice:', err)
          }
        )
      }
    } catch {}

    return () => {
      isMounted = false
      unsub()
    }
  }, [])

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!reviewForm.name.trim()) {
      showToast('Please enter your name.', 'error')
      return
    }
    if (!reviewForm.comment.trim()) {
      showToast('Please enter your feedback or review comment.', 'error')
      return
    }

    setIsSubmitting(true)
    try {
      const colors = ['emerald', 'amber', 'rose', 'purple', 'blue', 'teal']
      const assignedColor = colors[Math.floor(Math.random() * colors.length)]

      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: reviewForm.name,
          role: reviewForm.role || 'Cardzy Sender',
          comment: reviewForm.comment,
          stars: reviewForm.stars,
          color: assignedColor,
        }),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit review')
      }

      // Optimistic update
      if (data.testimonial) {
        setReviews((prev) => [data.testimonial, ...prev.filter((r) => r.id !== data.testimonial.id)])
      }

      showToast('Thank you! Your review is now live on Cardzy 🌟', 'success')
      setIsReviewModalOpen(false)
      setReviewForm({ name: '', role: '', comment: '', stars: 5 })
    } catch (err: any) {
      showToast(err.message || 'Error submitting review', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const avatarColors: Record<string, string> = {
    emerald: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30',
    rose: 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30',
    purple: 'bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30',
    blue: 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30',
    teal: 'bg-teal-500/20 text-teal-600 dark:text-teal-400 border-teal-500/30',
  }

  const borderAccents: Record<string, string> = {
    emerald: 'border-t-emerald-500',
    amber: 'border-t-amber-500',
    rose: 'border-t-rose-500',
    purple: 'border-t-purple-500',
    blue: 'border-t-blue-500',
    teal: 'border-t-teal-500',
  }

  const displayedReviews = reviews.slice(0, visibleCount)

  return (
    <section className="py-12 bg-gradient-to-b from-background via-emerald-500/[0.04] to-background border-y border-border/50 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 space-y-10 text-center relative z-10">
        {/* Top Badges Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold uppercase tracking-widest backdrop-blur-sm">
            <Award className="size-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t('trustedPlatformBadge') || 'Trusted Digital Greetings Platform 🌟'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
            {t('lovedBySendersTitle') || 'Loved by Senders Across 60+ Countries Worldwide'}
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
            {t('lovedBySendersSub') || 'From birthdays and Nikah invitations to custom greeting cards, see why senders across the world choose Cardzy.'}{' '}
            <Link href="/about" className="text-emerald-600 dark:text-emerald-400 underline font-semibold hover:opacity-80">
              Read about our mission
            </Link>
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md hover:shadow-emerald-500/20 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <MessageSquarePlus className="size-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { metric: '60+', label: t('globalCountriesLabel') || 'Global Countries', sub: t('sendersWorldwideSub') || 'Senders across 60+ nations', accent: 'border-t-emerald-500' },
            { metric: '18', label: t('languagesSupportedLabel') || 'Languages Supported', sub: t('languagesSub') || 'Urdu, Arabic, English & more', accent: 'border-t-teal-500' },
            { metric: '100%', label: t('mobileOptimizedLabel') || 'Mobile & Desktop', sub: t('instantWebAccessSub') || 'Instant web browser access', accent: 'border-t-amber-500' },
            { metric: 'Free', label: t('freeCreationLabel') || 'Free Creation', sub: t('zeroCreditCardRequired') || 'Zero credit card required', accent: 'border-t-violet-500' },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`rounded-3xl border border-border/70 border-t-2 ${item.accent} bg-card/80 backdrop-blur-sm p-5 shadow-xs text-center space-y-1 hover:border-emerald-500/40 hover:scale-[1.03] hover:shadow-lg transition-all duration-300`}
            >
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                {item.metric}
              </div>
              <div className="text-xs font-bold text-foreground">{item.label}</div>
              <div className="text-[10px] text-muted-foreground">{item.sub}</div>
            </div>
          ))}
        </div>

        {/* Real User Reviews Grid (Loaded from Firebase) */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 text-left">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-3xl border border-border/80 bg-card/60 p-6 shadow-sm space-y-4 animate-pulse"
              >
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="size-4 rounded-full bg-muted" />
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-muted rounded-full" />
                  <div className="h-3 w-4/5 bg-muted rounded-full" />
                  <div className="h-3 w-3/5 bg-muted rounded-full" />
                </div>
                <div className="pt-3 border-t border-border/40 flex items-center gap-3">
                  <div className="size-8 rounded-full bg-muted" />
                  <div className="space-y-1 flex-1">
                    <div className="h-3 w-24 bg-muted rounded-full" />
                    <div className="h-2.5 w-16 bg-muted rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : displayedReviews.length === 0 ? (
          <div className="py-12 px-4 rounded-3xl border border-dashed border-border/80 bg-card/50 text-center space-y-3">
            <Sparkles className="size-8 text-amber-500 mx-auto opacity-70" />
            <h3 className="text-base font-bold text-foreground">No Reviews Recorded Yet</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Be the first to share your experience with 3D digital cards, WhatsApp invitations, or greeting wishes!
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquarePlus className="size-4" />
                <span>Write First Review</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 text-left">
            {displayedReviews.map((rev) => {
              const colorKey = rev.color && avatarColors[rev.color] ? rev.color : 'emerald'
              return (
                <div
                  key={rev.id}
                  className={`rounded-3xl border border-border/80 border-t-2 ${borderAccents[colorKey]} bg-card/80 backdrop-blur-sm p-6 shadow-sm space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow duration-300`}
                >
                  <div className="space-y-2">
                    <span className="block text-4xl leading-none font-serif text-emerald-500/10 select-none">&ldquo;</span>
                    <div className="flex items-center gap-1 text-amber-400 drop-shadow-[0_0_3px_rgba(251,191,36,0.4)]">
                      {Array.from({ length: rev.stars || 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed text-foreground italic">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/50 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-extrabold border ${avatarColors[colorKey]}`}>
                        {rev.name ? rev.name.charAt(0).toUpperCase() : 'C'}
                      </div>
                      <div className="min-w-0">
                        <div className="font-extrabold text-xs text-foreground truncate">{rev.name}</div>
                        <div className="text-[10px] text-muted-foreground truncate">{rev.role}</div>
                      </div>
                    </div>

                    {rev.location && (
                      <div className="text-[10px] text-muted-foreground font-medium shrink-0 flex items-center gap-1">
                        <MapPin className="size-3 text-muted-foreground/70" />
                        <span className="truncate max-w-[100px]">{rev.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {reviews.length > visibleCount && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-5 py-2.5 rounded-2xl bg-muted/60 hover:bg-muted text-foreground font-bold text-xs border border-border/80 transition-all cursor-pointer shadow-xs"
            >
              Show More Reviews ({reviews.length - visibleCount} more)
            </button>
          </div>
        )}
      </div>

      {/* Review Submission Modal Form */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg bg-card border border-border rounded-3xl p-6 sm:p-7 shadow-2xl relative space-y-5 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                  <Sparkles className="size-3" />
                  <span>Share Your Experience</span>
                </div>
                <h3 className="text-xl font-black text-foreground">Write a Review</h3>
                <p className="text-xs text-muted-foreground">
                  Your feedback helps families, hosts, and gamers worldwide discover Cardzy.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Rating Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((starVal) => {
                    const activeVal = hoveredStar !== null ? hoveredStar : reviewForm.stars
                    const isFilled = starVal <= activeVal
                    return (
                      <button
                        key={starVal}
                        type="button"
                        onMouseEnter={() => setHoveredStar(starVal)}
                        onMouseLeave={() => setHoveredStar(null)}
                        onClick={() => setReviewForm((prev) => ({ ...prev, stars: starVal }))}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                        title={`${starVal} Star${starVal > 1 ? 's' : ''}`}
                      >
                        <Star className={cn('size-6', isFilled ? 'fill-current' : 'text-muted-foreground/30')} />
                      </button>
                    )
                  })}
                  <span className="text-xs font-bold text-amber-500 ml-2">
                    {reviewForm.stars} out of 5 Stars
                  </span>
                </div>
              </div>

              {/* Name & Role Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zainab M."
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-muted/40 border border-border/80 text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Role / Occasion</label>
                  <input
                    type="text"
                    placeholder="e.g. Bride & Nikah Host, Gamer"
                    value={reviewForm.role}
                    onChange={(e) => setReviewForm((prev) => ({ ...prev, role: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-muted/40 border border-border/80 text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              {/* Comment Textarea */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Your Feedback & Experience *</label>
                <textarea
                  required
                  rows={3}
                  maxLength={500}
                  placeholder="Share what you liked about your 3D digital cards, WhatsApp invitations, or music audio..."
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm((prev) => ({ ...prev, comment: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border/80 text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30 resize-none"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Honest community reviews</span>
                  <span>{reviewForm.comment.length}/500</span>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="size-3.5" />
                      <span>Post Review</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
