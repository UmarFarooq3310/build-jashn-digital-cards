'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Plus,
  Sparkles,
  Eye,
  Users,
  Crown,
  Calendar,
  Send,
  ExternalLink,
  LogOut,
  FileText,
  Loader2,
  Share2,
  QrCode,
  CreditCard,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useJashn } from '@/lib/jashn/store'
import { getOccasion } from '@/lib/jashn/occasions'
import { getInvitationType } from '@/lib/jashn/invitations'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang/context'
import { getUserMagicLinks } from '@/lib/jashn/magic-service'
import type { MagicLinkData } from '@/lib/jashn/magic-types'
import { CardShareModal, type ShareModalCardData } from '@/components/dashboard/card-share-modal'

export default function DashboardPage() {
  const router = useRouter()
  const {
    user,
    wishes,
    invitations,
    visitingCards,
    signOut,
    fetchUserCards,
    upgrade,
    isAuthLoading,
    downloadAllGuestsCsv,
    downloadAllGuestsPdf,
  } = useJashn()

  // Tab selector: 'all' | 'events' | 'wishes' | 'vcards' | 'magic'
  const [activeFilter, setActiveFilter] = useState<'all' | 'events' | 'wishes' | 'vcards' | 'magic'>('all')
  const [magicLinks, setMagicLinks] = useState<MagicLinkData[]>([])
  const [shareModalCard, setShareModalCard] = useState<ShareModalCardData | null>(null)
  const { t } = useLang()

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login')
    }
  }, [user, isAuthLoading, router])

  useEffect(() => {
    if (user) {
      fetchUserCards()
      getUserMagicLinks(user.uid).then(setMagicLinks).catch(console.error)
    }
  }, [user, fetchUserCards])

  async function handleCancelPlan() {
    if (!user) return
    if (confirm('Are you sure you want to cancel your paid plan and downgrade to the Free plan?')) {
      try {
        await upgrade('free')
        alert('Your plan was canceled successfully and downgraded to Free.')
      } catch (e) {
        console.error('Failed to cancel plan:', e)
        alert('Failed to cancel plan. Please try again.')
      }
    }
  }

  // Filter listings based on host's user ID
  const hostWishes = user ? wishes.filter((w) => w.creatorId === user.uid) : []
  const hostInvitations = user ? invitations.filter((i) => i.creatorId === user.uid) : []
  const hostVisitingCards = user ? (visitingCards || []).filter((v) => v.creatorId === user.uid) : []

  // Grand Total Views & Metrics Calculation
  const wishViews = hostWishes.reduce((sum, w) => sum + (w.viewCount || 0), 0)
  const invViews = hostInvitations.reduce((sum, i) => sum + (i.viewCount || 0), 0)
  const vcViews = hostVisitingCards.reduce((sum, v) => sum + (v.viewCount || 0), 0)
  const magicViews = magicLinks.reduce((sum, m) => sum + (m.viewsCount || 0), 0)
  const grandTotalViews = wishViews + invViews + vcViews + magicViews

  const grandTotalCards =
    hostInvitations.length + hostWishes.length + hostVisitingCards.length + magicLinks.length
  const totalRsvps = hostInvitations.reduce((sum, i) => sum + (i.rsvpCount || 0), 0)

  const allHostCards = [...hostInvitations, ...hostWishes, ...hostVisitingCards, ...magicLinks]
  const totalHostShares = allHostCards.reduce((acc, card: any) => {
    const s = card.shares || {}
    return {
      whatsapp: acc.whatsapp + (s.whatsapp || 0),
      sms: acc.sms + (s.sms || 0),
      copy: acc.copy + (s.copy || 0),
      qr: acc.qr + (s.qr || 0),
      image: acc.image + (s.image || 0),
      video: acc.video + (s.video || 0),
      total:
        acc.total +
        (s.whatsapp || 0) +
        (s.sms || 0) +
        (s.copy || 0) +
        (s.qr || 0) +
        (s.image || 0) +
        (s.video || 0),
    }
  }, { whatsapp: 0, sms: 0, copy: 0, qr: 0, image: 0, video: 0, total: 0 })

  function handleDownloadGuests() {
    if (!user) return
    if (user.plan !== 'business') {
      alert('Downloading all guests in CSV format is exclusively available for Business plan subscribers. Please upgrade to the Business plan.')
      router.push('/pricing')
      return
    }
    downloadAllGuestsCsv()
  }

  function handleDownloadGuestsPdf() {
    if (!user) return
    if (user.plan !== 'business') {
      alert('Downloading guest report in PDF format is exclusively available for Business plan subscribers. Please upgrade to the Business plan.')
      router.push('/pricing')
      return
    }
    downloadAllGuestsPdf()
  }

  if (isAuthLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="py-10">
      <div className="mx-auto max-w-6xl px-4">
        {/* Host Welcome Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-foreground">{t('welcomeBackUser')} {user.name}!</h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-amber-600">
                <Crown className="size-3" /> {user.plan} Host Plan
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{user.email} • Host Portal Dashboard</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadGuestsPdf}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold h-auto transition-all",
                user.plan === 'business'
                  ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-700 hover:bg-indigo-500/20"
                  : "border-amber-500/40 bg-amber-500/10 text-amber-700 hover:bg-amber-500/20"
              )}
            >
              <FileText className="size-4" />
              <span>Download PDF Report</span>
              {user.plan !== 'business' && (
                <span className="ml-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-extrabold uppercase text-amber-800 border border-amber-500/30">
                  Business Only
                </span>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadGuests}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold h-auto transition-all",
                user.plan === 'business'
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20"
                  : "border-amber-500/40 bg-amber-500/10 text-amber-700 hover:bg-amber-500/20"
              )}
            >
              <FileText className="size-4" />
              <span>Export CSV</span>
              {user.plan !== 'business' && (
                <span className="ml-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-extrabold uppercase text-amber-800 border border-amber-500/30">
                  Business Only
                </span>
              )}
            </Button>
            <Link href="/pricing" className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-bold text-primary hover:bg-primary/20">
              <Crown className="size-4" /> {t('upgradePlan')}
            </Link>
            {user.plan !== 'free' && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelPlan}
                className="inline-flex items-center gap-1.5 rounded-xl border-destructive/30 bg-destructive/10 px-4 py-2 text-sm font-bold text-destructive hover:bg-destructive/20 h-auto"
              >
                {t('cancelPlan')}
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => { signOut(); router.push('/'); }}>
              <LogOut className="size-4 mr-1.5" /> {t('signOut')}
            </Button>
          </div>
        </div>

        {/* ================= TOTAL VIEWS & ANALYTICS OVERVIEW BAR ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="group relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/15 via-card/90 to-card p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5">
            <div className="absolute top-0 right-0 size-24 bg-primary/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />
            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
              <span className="text-[11px] font-extrabold text-foreground/80">Total Card Views</span>
              <div className="size-8 rounded-xl bg-primary/15 flex items-center justify-center text-primary shadow-2xs group-hover:scale-110 transition-transform">
                <Eye className="size-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-foreground tracking-tight font-mono">
              {grandTotalViews.toLocaleString()}
            </div>
            <p className="text-[10px] text-muted-foreground/80 mt-2 font-medium truncate" title={`Wishes: ${wishViews} | Invites: ${invViews} | Magic: ${magicViews} | vCards: ${vcViews}`}>
              Wishes: <span className="font-bold text-foreground">{wishViews}</span> • Invites: <span className="font-bold text-foreground">{invViews}</span> • Magic: <span className="font-bold text-foreground">{magicViews}</span>
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-amber-500/25 bg-gradient-to-br from-amber-500/15 via-card/90 to-card p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-amber-500/40 hover:-translate-y-0.5">
            <div className="absolute top-0 right-0 size-24 bg-amber-500/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />
            <div className="flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3">
              <span className="text-[11px] font-extrabold">Magic Links Views</span>
              <div className="size-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-500 shadow-2xs group-hover:scale-110 transition-transform">
                <Sparkles className="size-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400 tracking-tight font-mono">
              {magicViews.toLocaleString()}
            </div>
            <p className="text-[10px] text-muted-foreground/80 mt-2 font-medium">
              <span className="font-bold text-foreground">{magicLinks.length}</span> interactive 3D links
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/15 via-card/90 to-card p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-emerald-500/40 hover:-translate-y-0.5">
            <div className="absolute top-0 right-0 size-24 bg-emerald-500/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />
            <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-3">
              <span className="text-[11px] font-extrabold">Total Cards</span>
              <div className="size-8 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-500 shadow-2xs group-hover:scale-110 transition-transform">
                <Calendar className="size-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-foreground tracking-tight font-mono">
              {grandTotalCards}
            </div>
            <p className="text-[10px] text-muted-foreground/80 mt-2 font-medium">
              Active live creations
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-indigo-500/25 bg-gradient-to-br from-indigo-500/15 via-card/90 to-card p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-500/40 hover:-translate-y-0.5">
            <div className="absolute top-0 right-0 size-24 bg-indigo-500/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />
            <div className="flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
              <span className="text-[11px] font-extrabold">Event RSVPs</span>
              <div className="size-8 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-500 shadow-2xs group-hover:scale-110 transition-transform">
                <Users className="size-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight font-mono">
              {totalRsvps}
            </div>
            <p className="text-[10px] text-muted-foreground/80 mt-2 font-medium">
              Confirmed guest responses
            </p>
          </div>
        </div>

        {/* ================= CARD SHARING CHANNELS ANALYTICS ================= */}
        <div className="p-5 rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card/90 to-card shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-500 shadow-2xs">
                <Share2 className="size-4" />
              </div>
              <div>
                <span className="text-sm font-extrabold text-foreground block leading-tight">Card Distribution & Sharing Channels</span>
                <span className="text-[10px] text-muted-foreground">Real-time engagement across SMS, WhatsApp, QR, Image & Video Exports</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-xs font-mono border border-amber-500/20 self-start sm:self-auto">
              <Sparkles className="size-3 text-amber-500" />
              {totalHostShares.total.toLocaleString()} Total Shares
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* 1. SMS */}
            <div className="group relative p-3 rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-card/50 border border-blue-500/20 hover:border-blue-500/40 hover:shadow-xs transition-all duration-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-muted-foreground">SMS Text</span>
                <span className="text-sm">📱</span>
              </div>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono tracking-tight">
                {totalHostShares.sms.toLocaleString()}
              </div>
            </div>

            {/* 2. WhatsApp */}
            <div className="group relative p-3 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-card/50 border border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-xs transition-all duration-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-muted-foreground">WhatsApp</span>
                <span className="text-sm">💬</span>
              </div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">
                {totalHostShares.whatsapp.toLocaleString()}
              </div>
            </div>

            {/* 3. Link Copied */}
            <div className="group relative p-3 rounded-2xl bg-gradient-to-br from-zinc-500/10 via-zinc-500/5 to-card/50 border border-zinc-500/20 hover:border-zinc-500/40 hover:shadow-xs transition-all duration-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-muted-foreground">Link Copied</span>
                <span className="text-sm">📋</span>
              </div>
              <div className="text-2xl font-black text-foreground font-mono tracking-tight">
                {totalHostShares.copy.toLocaleString()}
              </div>
            </div>

            {/* 4. Barcode / QR */}
            <div className="group relative p-3 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-card/50 border border-amber-500/20 hover:border-amber-500/40 hover:shadow-xs transition-all duration-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-muted-foreground">Barcode / QR</span>
                <span className="text-sm">🔲</span>
              </div>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono tracking-tight">
                {totalHostShares.qr.toLocaleString()}
              </div>
            </div>

            {/* 5. Image PNG */}
            <div className="group relative p-3 rounded-2xl bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-card/50 border border-purple-500/20 hover:border-purple-500/40 hover:shadow-xs transition-all duration-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-muted-foreground">Image PNG</span>
                <span className="text-sm">🖼️</span>
              </div>
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono tracking-tight">
                {totalHostShares.image.toLocaleString()}
              </div>
            </div>

            {/* 6. Video MP4 */}
            <div className="group relative p-3 rounded-2xl bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-card/50 border border-rose-500/20 hover:border-rose-500/40 hover:shadow-xs transition-all duration-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-muted-foreground">Video MP4</span>
                <span className="text-sm">🎥</span>
              </div>
              <div className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono tracking-tight">
                {totalHostShares.video.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions grid */}
        <div className="grid gap-4 sm:grid-cols-4 mb-10">
          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-card to-card p-5 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Invitations</span>
              <h3 className="text-base font-bold text-foreground mt-0.5">Wedding / Party</h3>
            </div>
            <Link href="/create-invitation" className="rounded-xl bg-emerald-700 p-2.5 text-white hover:bg-emerald-800 shadow-md">
              <Plus className="size-5" />
            </Link>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card p-5 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Wishes</span>
              <h3 className="text-base font-bold text-foreground mt-0.5">3D Greeting Cards</h3>
            </div>
            <Link href="/create-wish" className="rounded-xl bg-primary p-2.5 text-primary-foreground hover:bg-primary/90 shadow-md">
              <Plus className="size-5" />
            </Link>
          </div>

          <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 via-card to-card p-5 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">vCards</span>
              <h3 className="text-base font-bold text-foreground mt-0.5">Visiting Cards</h3>
            </div>
            <Link href="/create-visiting-card" className="rounded-xl bg-indigo-600 p-2.5 text-white hover:bg-indigo-700 shadow-md">
              <Plus className="size-5" />
            </Link>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-card to-card p-5 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Magic Links 🪄</span>
              <h3 className="text-base font-bold text-foreground mt-0.5">Interactive Surprise</h3>
            </div>
            <Link href="/create-magic-link" className="rounded-xl bg-amber-600 p-2.5 text-white hover:bg-amber-700 shadow-md">
              <Plus className="size-5" />
            </Link>
          </div>
        </div>

        {/* Sub-header Filter Tabs */}
        <div className="flex border-b border-border mb-6 gap-2 overflow-x-auto">
          {[
            { id: 'all', label: `All Cards (${grandTotalCards})` },
            { id: 'events', label: `Invitations (${hostInvitations.length})` },
            { id: 'wishes', label: `Wishes (${hostWishes.length})` },
            { id: 'vcards', label: `vCards (${hostVisitingCards.length})` },
            { id: 'magic', label: `Magic Links 🪄 (${magicLinks.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={cn(
                "px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer",
                activeFilter === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. HOSTED EVENTS LIST */}
        {(activeFilter === 'all' || activeFilter === 'events') && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Calendar className="size-5 text-emerald-600" /> Hosted Invitations ({hostInvitations.length})
              </h2>
              <Link href="/create-invitation" className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
                New Invitation <Plus className="size-3" />
              </Link>
            </div>

            {hostInvitations.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-8 text-center bg-card">
                <p className="text-muted-foreground text-xs">{t('dashNoInvitesYet')}</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {hostInvitations.map((inv) => {
                  const resolvedTypeId = !inv.typeId || (inv.typeId === 'iftaar' && (inv.groom || inv.bride)) ? 'nikkah' : inv.typeId
                  const type = getInvitationType(resolvedTypeId)
                  return (
                    <div key={inv.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-md transition-all">
                      <div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                          <span className="font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">{type?.label ?? 'Event'}</span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-muted/60 border border-border/80 text-foreground shadow-2xs">
                            <Eye className="size-3 text-emerald-500" /> {inv.viewCount || 0} views
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-foreground leading-tight">{inv.title || `${inv.groom} & ${inv.bride}`}</h4>
                        <p className="text-xs text-muted-foreground mt-1.5">{inv.date} • {inv.city || inv.venue}</p>
                        <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-xl shadow-2xs">
                          <Users className="size-3.5 text-emerald-600 dark:text-emerald-400" /> {inv.rsvpCount || 0} Confirmed RSVPs
                        </div>

                        {/* Share Channel Breakdown Badges */}
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] mt-3.5 pt-2.5 border-t border-border/50">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground/80 mr-0.5">Shares:</span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-extrabold border border-blue-500/20 shadow-2xs" title="Shared via SMS">
                            📱 {inv.shares?.sms || 0}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/20 shadow-2xs" title="Shared via WhatsApp">
                            💬 {inv.shares?.whatsapp || 0}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-500/10 dark:bg-zinc-500/20 text-foreground font-extrabold border border-zinc-500/20 shadow-2xs" title="Link Copied">
                            📋 {inv.shares?.copy || 0}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold border border-amber-500/20 shadow-2xs" title="Barcode / QR Code">
                            🔲 {inv.shares?.qr || 0}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-extrabold border border-purple-500/20 shadow-2xs" title="Image Download">
                            🖼️ {inv.shares?.image || 0}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-extrabold border border-rose-500/20 shadow-2xs" title="Video Download">
                            🎥 {inv.shares?.video || 0}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                        <button
                          onClick={() =>
                            setShareModalCard({
                              title: inv.title || `${inv.groom} & ${inv.bride}`,
                              recipientOrCouple: (inv.groom && inv.bride) ? `${inv.groom} & ${inv.bride}` : (inv.title || 'Royal Guests'),
                              type: 'invite',
                              slug: (inv.slug || inv.id || ""),
                              url: `/i/${(inv.slug || inv.id)}`,
                              viewsCount: inv.viewCount,
                              shares: inv.shares,
                              occasion: type?.label || 'Royal Wedding Invitation',
                              date: inv.date,
                              time: inv.time,
                              venue: inv.venue || inv.city,
                              waMessage: `✨ You are cordially invited to celebrate with us! Tap to view our interactive digital invitation:`,
                            })
                          }
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
                        >
                          <Share2 className="size-3.5" /> Share, QR & Image
                        </button>
                        <Link href={`/i/${(inv.slug || inv.id)}?mode=sender`} target="_blank" className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground">
                          Preview <ExternalLink className="size-3" />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* 2. GREETINGS & WISHES LIST */}
        {(activeFilter === 'all' || activeFilter === 'wishes') && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Send className="size-5 text-primary" /> Greetings & Wishes ({hostWishes.length})
              </h2>
              <Link href="/create-wish" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                New Wish <Plus className="size-3" />
              </Link>
            </div>

            {hostWishes.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-8 text-center bg-card">
                <p className="text-muted-foreground text-xs">{t('dashNoWishesYet')}</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {hostWishes.map((w) => {
                  const occ = getOccasion(w.occasionId)
                  return (
                    <div key={w.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all">
                      <div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                          <span className="font-extrabold text-primary uppercase tracking-wider text-[11px] px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">{occ?.label ?? 'Wish'}</span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-muted/60 border border-border/80 text-foreground shadow-2xs">
                            <Eye className="size-3 text-primary" /> {w.viewCount || 0} views
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-foreground max-h-24 overflow-y-auto pr-1 leading-relaxed break-words break-all [overflow-wrap:anywhere] [word-break:break-word]">{w.message}</p>
                        <p className="text-xs text-muted-foreground mt-3 pt-2 border-t border-border/50 break-words break-all [overflow-wrap:anywhere]">
                          For: <span className="font-bold text-foreground">{w.recipientName || 'Friend'}</span>
                        </p>

                        {/* Share Channel Breakdown Badges */}
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] mt-3.5 pt-2.5 border-t border-border/50">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground/80 mr-0.5">Shares:</span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-extrabold border border-blue-500/20 shadow-2xs" title="Shared via SMS">
                            📱 {w.shares?.sms || 0}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/20 shadow-2xs" title="Shared via WhatsApp">
                            💬 {w.shares?.whatsapp || 0}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-500/10 dark:bg-zinc-500/20 text-foreground font-extrabold border border-zinc-500/20 shadow-2xs" title="Link Copied">
                            📋 {w.shares?.copy || 0}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold border border-amber-500/20 shadow-2xs" title="Barcode / QR Code">
                            🔲 {w.shares?.qr || 0}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-extrabold border border-purple-500/20 shadow-2xs" title="Image Download">
                            🖼️ {w.shares?.image || 0}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-extrabold border border-rose-500/20 shadow-2xs" title="Video Download">
                            🎥 {w.shares?.video || 0}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                        <button
                          onClick={() =>
                            setShareModalCard({
                              title: `${occ?.label ?? 'Wish'} Card`,
                              recipientOrCouple: w.recipientName || 'Dear Friend',
                              type: 'wish',
                              slug: (w.slug || w.id || ""),
                              url: `/w/${(w.slug || w.id)}`,
                              viewsCount: w.viewCount,
                              shares: w.shares,
                              occasion: occ?.label || 'Celebration Wish',
                              message: w.message,
                              senderName: w.senderName,
                              waMessage: `✨ A special 3D digital wish card was created for you! Tap to open:`,
                            })
                          }
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline cursor-pointer"
                        >
                          <Share2 className="size-3.5" /> Share, QR & Image
                        </button>
                        <Link href={`/w/${(w.slug || w.id)}?mode=sender`} target="_blank" className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground">
                          Preview <ExternalLink className="size-3" />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* 3. VISITING CARDS (vCards) LIST */}
        {(activeFilter === 'all' || activeFilter === 'vcards') && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <CreditCard className="size-5 text-indigo-600" /> Smart vCards ({hostVisitingCards.length})
              </h2>
              <Link href="/create-visiting-card" className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
                New vCard <Plus className="size-3" />
              </Link>
            </div>

            {hostVisitingCards.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-8 text-center bg-card">
                <p className="text-muted-foreground text-xs">No Smart Visiting Cards created yet.</p>
                <Link href="/create-visiting-card" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline">
                  Create Executive vCard <Plus className="size-3" />
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {hostVisitingCards.map((vc) => (
                  <div key={vc.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm flex flex-col justify-between hover:border-indigo-500/40 hover:shadow-md transition-all">
                    <div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span className="font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">Digital vCard</span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-muted/60 border border-border/80 text-foreground shadow-2xs">
                          <Eye className="size-3 text-indigo-500" /> {vc.viewCount || 0} views
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-foreground">{vc.fullName}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{vc.title} • {vc.company}</p>

                      {/* Share Channel Breakdown Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] mt-3.5 pt-2.5 border-t border-border/50">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground/80 mr-0.5">Shares:</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-extrabold border border-blue-500/20 shadow-2xs" title="Shared via SMS">
                          📱 {vc.shares?.sms || 0}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/20 shadow-2xs" title="Shared via WhatsApp">
                          💬 {vc.shares?.whatsapp || 0}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-500/10 dark:bg-zinc-500/20 text-foreground font-extrabold border border-zinc-500/20 shadow-2xs" title="Link Copied">
                          📋 {vc.shares?.copy || 0}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold border border-amber-500/20 shadow-2xs" title="Barcode / QR Code">
                          🔲 {vc.shares?.qr || 0}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-extrabold border border-purple-500/20 shadow-2xs" title="Image Download">
                          🖼️ {vc.shares?.image || 0}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-extrabold border border-rose-500/20 shadow-2xs" title="Video Download">
                          🎥 {vc.shares?.video || 0}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                      <button
                        onClick={() =>
                          setShareModalCard({
                            title: `${vc.fullName}'s Digital vCard`,
                            recipientOrCouple: vc.fullName,
                            type: 'vcard',
                            slug: (vc.slug || vc.id || ""),
                            url: `/v/${(vc.slug || vc.id)}`,
                            viewsCount: vc.viewCount,
                            shares: vc.shares,
                            occasion: 'Executive Digital vCard',
                            subtitle: `${vc.title || 'Professional'} • ${vc.company || ''}`,
                            details: vc.phone || vc.email,
                            waMessage: `✨ Here is my executive digital business card. Tap to save contact:`,
                          })
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
                      >
                        <Share2 className="size-3.5" /> Share, QR & Image
                      </button>
                      <Link href={`/v/${(vc.slug || vc.id)}`} target="_blank" className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground">
                        Preview <ExternalLink className="size-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. MAGIC LINKS LIST */}
        {(activeFilter === 'all' || activeFilter === 'magic') && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Sparkles className="size-5 text-amber-500" /> Magic Links 🪄 ({magicLinks.length})
              </h2>
              <Link href="/create-magic-link" className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1">
                New Magic Link <Plus className="size-3" />
              </Link>
            </div>

            {magicLinks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-8 text-center bg-card">
                <p className="text-muted-foreground text-xs">No Magic Links created yet. Surprise someone with an animated 3D celebration!</p>
                <Link href="/create-magic-link" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:underline">
                  Create Magic Link <Plus className="size-3" />
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {magicLinks.map((m) => (
                  <div
                    key={(m.slug || m.id)}
                    className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-card to-card p-5 shadow-sm flex flex-col justify-between hover:border-amber-500/60 hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span className="font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider text-[11px] bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                          {m.occasion} · {m.type}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-muted/60 border border-border/80 text-foreground shadow-2xs">
                          <Eye className="size-3 text-amber-500" /> {m.viewsCount || 0} views
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-foreground break-words break-all [overflow-wrap:anywhere]">{m.recipientName}</h4>
                      <p className="text-xs text-muted-foreground mt-1 max-h-20 overflow-y-auto pr-1 break-words break-all [overflow-wrap:anywhere] [word-break:break-word]">
                        {m.wishContent?.secretLetter || m.inviteContent?.eventTitle || 'Interactive 3D celebration capsule'}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-3 pt-2 border-t border-border/50">
                        Theme: <span className="font-bold text-foreground capitalize">{m.theme || 'Emerald Gold'}</span>
                      </p>

                      {/* Share Channel Breakdown Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] mt-3.5 pt-2.5 border-t border-border/50">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground/80 mr-0.5">Shares:</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-extrabold border border-blue-500/20 shadow-2xs" title="Shared via SMS">
                          📱 {m.shares?.sms || 0}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/20 shadow-2xs" title="Shared via WhatsApp">
                          💬 {m.shares?.whatsapp || 0}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-500/10 dark:bg-zinc-500/20 text-foreground font-extrabold border border-zinc-500/20 shadow-2xs" title="Link Copied">
                          📋 {m.shares?.copy || 0}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold border border-amber-500/20 shadow-2xs" title="Barcode / QR Code">
                          🔲 {m.shares?.qr || 0}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-extrabold border border-purple-500/20 shadow-2xs" title="Image Download">
                          🖼️ {m.shares?.image || 0}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-extrabold border border-rose-500/20 shadow-2xs" title="Video Download">
                          🎥 {m.shares?.video || 0}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                      <button
                        onClick={() =>
                          setShareModalCard({
                            title: `${m.occasion.toUpperCase()} Magic Link`,
                            recipientOrCouple: m.recipientName,
                            type: 'magic',
                            slug: (m.slug || m.id || ""),
                            url: `/m/${(m.slug || m.id)}`,
                            viewsCount: m.viewsCount,
                            shares: m.shares,
                            occasion: `${m.occasion.toUpperCase()} Magic Celebration`,
                            message: m.wishContent?.secretLetter || m.inviteContent?.eventTitle || 'Interactive 3D celebration capsule',
                            date: m.inviteContent?.eventDate,
                            time: m.inviteContent?.eventTime,
                            venue: m.inviteContent?.venueName,
                            senderName: m.senderName,
                            theme: m.theme,
                            waMessage: `✨ I created an interactive surprise for you on Cardzy! Tap to unwrap:`,
                          })
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:underline cursor-pointer"
                      >
                        <Share2 className="size-3.5" /> Share, QR & Image
                      </button>
                      <Link
                        href={`/m/${(m.slug || m.id)}?mode=sender`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground"
                      >
                        Preview <ExternalLink className="size-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Universal Share & QR Modal */}
        <CardShareModal
          card={shareModalCard}
          onClose={() => setShareModalCard(null)}
        />
      </div>
    </div>
  )
}
