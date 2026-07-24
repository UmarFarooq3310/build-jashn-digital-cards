'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Sparkles, Eye, Users, Crown, Calendar, Send, ExternalLink, LogOut, FileText, CheckCircle2, Loader2 } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { useJashn } from '@/lib/jashn/store'
import { getOccasion } from '@/lib/jashn/occasions'
import { getInvitationType } from '@/lib/jashn/invitations'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang/context'

export default function DashboardPage() {
  const router = useRouter()
  const { user, wishes, invitations, signOut, fetchUserCards, upgrade, isAuthLoading, downloadAllGuestsCsv, downloadAllGuestsPdf } = useJashn()
  
  // Tab selector: 'all' | 'events' | 'wishes'
  const [activeFilter, setActiveFilter] = useState<'all' | 'events' | 'wishes'>('all')
  const { t } = useLang()

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login?redirect=/dashboard')
    }
  }, [user, isAuthLoading, router])

  useEffect(() => {
    if (user) {
      fetchUserCards()
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
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-10">
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

          {/* Quick Actions grid */}
          <div className="grid gap-4 sm:grid-cols-2 mb-10">
            <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-card to-card p-6 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">{t('createInvitation')}</span>
                <h3 className="text-xl font-bold text-foreground mt-1">{t('dashCreateInviteTitle')}</h3>
                <p className="text-xs text-muted-foreground mt-1">{t('dashCreateInviteDesc')}</p>
              </div>
              <Link href="/create-invitation" className="rounded-xl bg-emerald-700 p-3 text-white hover:bg-emerald-800 shadow-md">
                <Plus className="size-6" />
              </Link>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card p-6 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">{t('greetingsWishes')}</span>
                <h3 className="text-xl font-bold text-foreground mt-1">{t('dashCreateWishTitle')}</h3>
                <p className="text-xs text-muted-foreground mt-1">{t('dashCreateWishDesc')}</p>
              </div>
              <Link href="/create-wish" className="rounded-xl bg-primary p-3 text-primary-foreground hover:bg-primary/90 shadow-md">
                <Plus className="size-6" />
              </Link>
            </div>
          </div>



          {/* Sub-header Filter Tabs */}
          <div className="flex border-b border-border mb-6 gap-2">
            {[
              { id: 'all', label: `${t('dashboard')} (${hostInvitations.length + hostWishes.length})` },
              { id: 'events', label: `${t('hostedInvitations')} (${hostInvitations.length})` },
              { id: 'wishes', label: `${t('greetingsWishes')} (${hostWishes.length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as 'all' | 'events' | 'wishes')}
                className={cn(
                  "px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors",
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
                  <Calendar className="size-5 text-emerald-600" /> {t('hostedInvitations')} ({hostInvitations.length})
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
                            <span className="font-bold text-emerald-600 uppercase tracking-wider">{type?.label ?? 'Event'}</span>
                            <span className="flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                              <Users className="size-3.5" /> {inv.rsvpCount} RSVPs
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-foreground leading-tight">{inv.title || `${inv.groom} & ${inv.bride}`}</h4>
                          <p className="text-xs text-muted-foreground mt-1.5">{inv.date} • {inv.city || inv.venue}</p>
                        </div>
                        <div className="mt-5 pt-3 border-t border-border/50 flex justify-end">
                          <Link href={`/i/${inv.slug}`} target="_blank" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline">
                            View Invitation <ExternalLink className="size-3" />
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
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Send className="size-5 text-primary" /> {t('greetingsWishes')} ({hostWishes.length})
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
                            <span className="font-bold text-primary uppercase tracking-wider">{occ?.label ?? 'Wish'}</span>
                            <span className="flex items-center gap-1"><Eye className="size-3.5" /> {w.viewCount} views</span>
                          </div>
                          <p className="text-sm font-semibold text-foreground line-clamp-2 leading-relaxed">{w.message}</p>
                          <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/50">For: <span className="font-bold text-foreground">{w.recipientName || 'Friend'}</span></p>
                        </div>
                        <div className="mt-4 pt-3 flex justify-end">
                          <Link href={`/w/${w.slug}`} target="_blank" className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                            View Greeting <ExternalLink className="size-3" />
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
