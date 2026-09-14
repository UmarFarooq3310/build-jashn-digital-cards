'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import {
  Search,
  Calendar as CalendarIcon,
  Sparkles,
  Clock,
  ArrowRight,
  Copy,
  Check,
  Moon,
  Globe,
  Heart,
  Flag,
  Award,
  RefreshCw,
} from 'lucide-react'
import {
  getEventsForRollingYear,
  CATEGORY_LABELS,
  type EventCategory,
} from '@/lib/calendar/data'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'

const CATEGORY_ICONS: Record<EventCategory, typeof Moon> = {
  islamic: Moon,
  global_faiths: Globe,
  family: Heart,
  national: Flag,
  milestones: Award,
}

function getCategoryName(cat: EventCategory, lang: string, t?: (k: string) => string): string {
  if (t) {
    const key = `cal_cat_${cat}`
    const trans = t(key)
    if (trans && trans !== key) return trans
    const directTrans = t(cat)
    if (directTrans && directTrans !== cat) return directTrans
  }
  if (lang === 'ur') return CATEGORY_LABELS[cat].ur
  if (lang === 'ar') {
    const arMap: Record<EventCategory, string> = {
      islamic: 'المناسبات الإسلامية والهجرية',
      global_faiths: 'الأديان العالمية والمهرجانات',
      family: 'العائلة والمحبة',
      national: 'الأيام الوطنية والرسمية',
      milestones: 'المحطات والمواسم',
    }
    return arMap[cat] || CATEGORY_LABELS[cat].en
  }
  if (lang === 'hi') {
    const hiMap: Record<EventCategory, string> = {
      islamic: 'इस्लामी व हिजरी',
      global_faiths: 'वैश्विक धर्म व त्योहार',
      family: 'परिवार और रिश्ते',
      national: 'राष्ट्रीय व नागरिक',
      milestones: 'मील के पत्थर व मौसम',
    }
    return hiMap[cat] || CATEGORY_LABELS[cat].en
  }
  return CATEGORY_LABELS[cat].en
}

export function CelebrationCalendarClient() {
  const { t, lang } = useLang()
  const isRtl = lang === 'ur' || lang === 'ar'

  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedMonth, setSelectedMonth] = useState<string>('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  // Live API Sync State
  const [syncStatus, setSyncStatus] = useState<{
    synced: boolean
    source?: string
    hijriFormatted?: string
    lastSynced?: string
    loading?: boolean
  }>({ synced: false, loading: false })

  const fetchSyncData = async () => {
    try {
      setSyncStatus((prev) => ({ ...prev, loading: true }))
      const res = await fetch('/api/calendar/sync')
      if (res.ok) {
        const data = await res.json()
        setSyncStatus({
          synced: true,
          source: data.source,
          hijriFormatted: data.hijri?.formatted,
          lastSynced: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          loading: false,
        })
      } else {
        setSyncStatus((prev) => ({ ...prev, loading: false }))
      }
    } catch {
      setSyncStatus((prev) => ({ ...prev, loading: false }))
    }
  }

  useEffect(() => {
    setMounted(true)
    setCurrentDate(new Date())
    fetchSyncData()
  }, [])

  // Rolling 365-day events calculated relative to the client's current date
  const allEvents = useMemo(() => {
    return getEventsForRollingYear(currentDate)
  }, [currentDate])

  // Extract distinct months for the month filter
  const availableMonths = useMemo(() => {
    const monthMap = new Map<string, string>()
    allEvents.forEach((ev) => {
      const ym = ev.dateStr.slice(0, 7) // YYYY-MM
      const label = ev.date.toLocaleDateString(lang === 'ur' ? 'ur-PK' : lang === 'ar' ? 'ar-SA' : 'en-US', {
        month: 'short',
        year: 'numeric',
      })
      if (!monthMap.has(ym)) {
        monthMap.set(ym, label)
      }
    })
    return Array.from(monthMap.entries()).map(([value, label]) => ({ value, label }))
  }, [allEvents, lang])

  // Filtered events
  const filteredEvents = useMemo(() => {
    return allEvents.filter((ev) => {
      // Category filter
      if (selectedCategory !== 'all' && ev.category !== selectedCategory) {
        return false
      }
      // Month filter
      if (selectedMonth !== 'all' && !ev.dateStr.startsWith(selectedMonth)) {
        return false
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchTitle = ev.title.toLowerCase().includes(q)
        const matchUrdu = ev.urduTitle.toLowerCase().includes(q)
        const matchDesc = ev.description.toLowerCase().includes(q)
        const matchCategory = ev.category.toLowerCase().includes(q)
        const matchHijri = ev.hijriNote ? ev.hijriNote.toLowerCase().includes(q) : false
        if (!matchTitle && !matchUrdu && !matchDesc && !matchCategory && !matchHijri) {
          return false
        }
      }
      return true
    })
  }, [allEvents, selectedCategory, selectedMonth, searchQuery])

  // Top 3 next immediate events for the highlight banner
  const nextImmediateEvents = useMemo(() => {
    return allEvents.slice(0, 3)
  }, [allEvents])

  const copyGreeting = (eventId: string, text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text)
      setCopiedId(eventId)
      setTimeout(() => setCopiedId(null), 2500)
    }
  }

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allEvents.length }
    allEvents.forEach((ev) => {
      counts[ev.category] = (counts[ev.category] || 0) + 1
    })
    return counts
  }, [allEvents])

  return (
    <div className={cn('space-y-10', isRtl && 'rtl')}>
      {/* ── Live Worldwide Holiday API Status Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-emerald-500/25 bg-emerald-500/5 px-4 py-2.5 text-xs text-muted-foreground shadow-xs">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="relative flex size-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-foreground">
            {syncStatus.source ? `⚡ ${syncStatus.source}` : (t('calLiveSyncBadge') || 'Live Worldwide Holiday API Connected')}
          </span>
          {syncStatus.hijriFormatted && (
            <>
              <span className="text-border">·</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                🌙 {syncStatus.hijriFormatted}
              </span>
            </>
          )}
          {syncStatus.lastSynced && (
            <>
              <span className="text-border">·</span>
              <span className="opacity-80">Updated: {syncStatus.lastSynced}</span>
            </>
          )}
        </div>

        <button
          onClick={fetchSyncData}
          disabled={syncStatus.loading}
          className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full bg-muted hover:bg-muted/80 px-3 py-1 font-bold text-foreground transition-all border border-border"
        >
          <RefreshCw className={cn('size-3 text-[#D4AF37]', syncStatus.loading && 'animate-spin')} />
          <span>{syncStatus.loading ? 'Syncing...' : (t('calSyncNow') || 'Sync Live Holidays')}</span>
        </button>
      </div>

      {/* ── Top Highlight Banner: Immediate Upcoming Celebrations ── */}
      <section className="rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/10 via-card to-emerald-500/5 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-[#D4AF37] flex items-center justify-center text-black font-bold shadow-sm">
              <Clock className="size-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#D4AF37]">
                <Sparkles className="size-3.5" />
                <span>{t('calHappeningSoon') || 'Happening Soon · Next Occasions'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground">
                {t('calComingUp') || 'Coming Up Next in the Rolling Year'}
              </h2>
            </div>
          </div>
          <div className="text-xs text-muted-foreground bg-muted/60 px-3.5 py-1.5 rounded-full border border-border self-start sm:self-auto">
            Today: <span className="font-bold text-foreground">{mounted ? currentDate.toLocaleDateString(lang === 'ur' ? 'ur-PK' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '...'}</span> · Daily Rolling
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nextImmediateEvents.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col justify-between rounded-2xl border border-border bg-card/90 p-5 shadow-xs hover:border-[#D4AF37]/50 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                    {item.daysRemaining === 0 ? (t('calHappeningToday') || 'Today! 🎉') : item.badgeText}
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold">
                    {item.formattedDate}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="line-clamp-1">{t(`occ_${item.occasionId?.replace(/-/g, '_')}`) || (lang === 'ur' ? item.urduTitle : item.title)}</span>
                </h3>

                {item.hijriNote && (
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
                    {item.hijriNote}
                  </p>
                )}

                <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50 flex flex-col gap-2">
                <span className="text-[11px] font-medium text-muted-foreground font-nastaliq text-right" dir="rtl">
                  {item.urduTitle}
                </span>

                {/* Direct Action Buttons for Immediate Upcoming Occasion */}
                <div className="flex items-center gap-2 pt-1">
                  <Link
                    href={item.wishLink}
                    className="flex-1 text-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 py-1.5 text-xs font-bold text-[#D4AF37] transition-colors"
                  >
                    {t('calSendCard') || 'Send 3D Card'}
                  </Link>

                  <Link
                    href={item.invitationLink}
                    className="flex-1 text-center rounded-xl bg-[#D4AF37] hover:bg-[#c49f30] py-1.5 text-xs font-bold text-black transition-colors shadow-xs"
                  >
                    {t('calCreateInvitation') || 'Invite'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Search & Filter Controls ── */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('calSearchPlaceholder') || 'Search by event, festival, Urdu title, or tradition (e.g. Ramadan, Diwali, Eid, Mother, Pakistan)...'}
              className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
              >
                {t('clear') || 'Clear'}
              </button>
            )}
          </div>

          {/* Month selector */}
          <div className="flex items-center gap-2 shrink-0">
            <label htmlFor="month-select" className="text-xs font-semibold text-muted-foreground">
              {t('calMonthLabel') || 'Month:'}
            </label>
            <select
              id="month-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-semibold text-foreground focus:border-[#D4AF37] focus:outline-none"
            >
              <option value="all">{t('calAllMonths') || 'All 12 Months (Next 365 Days)'}</option>
              {availableMonths.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-foreground text-background shadow-xs'
                : 'bg-muted hover:bg-muted/80 text-muted-foreground border border-border'
            }`}
          >
            <span>{t('calAllCelebrations') || 'All Celebrations'}</span>
            <span className="text-[11px] opacity-75 font-normal">({categoryCounts.all || 0})</span>
          </button>

          {(Object.keys(CATEGORY_LABELS) as EventCategory[]).map((cat) => {
            const meta = CATEGORY_LABELS[cat]
            const Icon = CATEGORY_ICONS[cat]
            const active = selectedCategory === cat
            const catTitle = getCategoryName(cat, lang, t)
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  active
                    ? `${meta.bg} ${meta.color} border ${meta.border} shadow-xs font-extrabold ring-1 ring-[#D4AF37]`
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground border border-border'
                }`}
              >
                <Icon className="size-3.5" />
                <span>{catTitle}</span>
                <span className="text-[11px] opacity-75 font-normal">({categoryCounts[cat] || 0})</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ── Active Filters Summary & Count ── */}
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border/60 pb-3">
        <span>
          {t('calShowing') || 'Showing'} <strong className="text-foreground">{filteredEvents.length}</strong> {t('calEventsScheduled') || 'events scheduled over the next 365 days'}
        </span>
        {(searchQuery || selectedCategory !== 'all' || selectedMonth !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
              setSelectedMonth('all')
            }}
            className="text-[#D4AF37] hover:underline font-bold"
          >
            {t('calResetFilters') || 'Reset Filters'}
          </button>
        )}
      </div>

      {/* ── Event Grid ── */}
      {filteredEvents.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center space-y-3">
          <CalendarIcon className="size-10 text-muted-foreground mx-auto opacity-50" />
          <h3 className="text-lg font-bold text-foreground">
            {t('calNoEventsMatch') || 'No events match your current filter'}
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            {t('calNoEventsDesc') || 'Try resetting your search query or selecting "All Celebrations" to browse all 80 worldwide festivals.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
              setSelectedMonth('all')
            }}
            className="rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-bold text-black"
          >
            {t('calResetFilters') || 'Reset Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => {
            const meta = CATEGORY_LABELS[event.category]
            const isCopied = copiedId === event.id
            const catLabel = getCategoryName(event.category, lang, t)

            return (
              <article
                key={event.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-xs hover:border-[#D4AF37]/40 hover:shadow-md transition-all"
              >
                <div>
                  {/* Top Header: Category & Countdown Badge */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold border ${meta.bg} ${meta.color} ${meta.border}`}
                    >
                      {catLabel}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                        event.daysRemaining === 0
                          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 animate-pulse'
                          : event.daysRemaining <= 7
                          ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 animate-pulse'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Clock className="size-3" />
                      {event.daysRemaining === 0 ? (t('calHappeningToday') || 'Today! 🎉') : event.badgeText}
                    </span>
                  </div>

                  {/* Date & Title */}
                  <div className="mb-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
                      <CalendarIcon className="size-3.5 text-[#D4AF37]" />
                      <span>{event.formattedDate}</span>
                      {event.hijriNote && (
                        <>
                          <span>·</span>
                          <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                            {event.hijriNote}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-foreground group-hover:text-[#D4AF37] transition-colors mt-1 flex items-start gap-2">
                      <span className="text-2xl shrink-0">{event.emoji}</span>
                      <span>{t(`occ_${event.occasionId?.replace(/-/g, '_')}`) || (lang === 'ur' ? event.urduTitle : event.title)}</span>
                    </h3>

                    <p className="text-sm text-muted-foreground font-nastaliq text-right mt-1" dir="rtl">
                      {event.urduTitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2.5">
                    {event.description}
                  </p>

                  {/* Copyable Greeting Box */}
                  <div className="mt-4 rounded-2xl border border-border/80 bg-muted/40 p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground">
                      <span>{t('calSampleWish') || 'Sample Wish & Blessing:'}</span>
                      <button
                        onClick={() => copyGreeting(event.id, `${event.greetings.en}\n\n${event.greetings.ur}`)}
                        className="inline-flex items-center gap-1 text-[#D4AF37] hover:underline"
                        title="Copy greeting to clipboard"
                      >
                        {isCopied ? (
                          <>
                            <Check className="size-3.5 text-emerald-500" />
                            <span className="text-emerald-500">{t('calCopied') || 'Copied!'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3.5" />
                            <span>{t('calCopyWish') || 'Copy Wish'}</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-foreground/90 italic leading-snug">
                      &ldquo;{event.greetings.en}&rdquo;
                    </p>

                    <p className="text-xs text-muted-foreground font-nastaliq leading-relaxed text-right pt-1" dir="rtl">
                      {event.greetings.ur}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer: Both Exact 3D Card and Invitation Available */}
                <div className="mt-6 pt-4 border-t border-border/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <span className="text-[11px] text-muted-foreground font-medium">
                    {event.daysRemaining === 0 ? (t('calHappeningToday') || 'Happening Today! 🎉') : `${event.daysRemaining} ${t('daysRemaining') || 'days remaining'}`}
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Send 3D Wish Card (Opens exact occasion + greeting) */}
                    <Link
                      href={event.wishLink}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 px-3.5 py-1.5 text-xs font-bold text-[#D4AF37] transition-all"
                    >
                      <span>{t('calSendCard') || 'Send 3D Card'}</span>
                      <ArrowRight className="size-3" />
                    </Link>

                    {/* Create Invitation (Opens exact invitation type + title) */}
                    <Link
                      href={event.invitationLink}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] hover:bg-[#c49f30] px-4 py-1.5 text-xs font-bold text-black transition-all shadow-xs"
                    >
                      <span>{t('calCreateInvitation') || 'Create Invitation'}</span>
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}

      {/* ── Bottom Explanatory Guidance Banner ── */}
      <section className="rounded-3xl border border-border bg-muted/20 p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
        <div className="flex items-center gap-2 text-base font-bold text-foreground">
          <Moon className="size-5 text-[#D4AF37]" />
          <h3>{t('calAboutTitle') || "About Cardzy's Dynamic Rolling Calendar"}</h3>
        </div>
        <p>
          {t('calAboutDesc1') || "This celebration calendar covers 80 major worldwide occasions including Islamic festivals (Hijri 1448–1449 AH), global religious holidays (Christmas, Easter, Diwali, Hanukkah, Lunar New Year), family relationship days (Mother's Day, Father's Day, Friendship Day), and national civic observances."}
        </p>
        <p>
          {t('calAboutDesc2') || "Daily Rolling Window: The calendar dynamically calculates dates starting from today for the upcoming 365 days. As each day passes, upcoming dates automatically shift forward so you always see what celebration is next on your calendar."}
        </p>
        <p>
          {t('calAboutDesc3') || "Connected to Free Worldwide Holiday APIs: Features live sync integration with free international holiday data feeds and automatic astronomical calculations."}
        </p>
        <p>
          {t('calAboutDesc4') || "Islamic Lunar Sighting Note: Islamic dates are projected based on standard lunar calendars. Official observance dates are subject to local moon sighting confirmation by regional Ruet-e-Hilal committees."}
        </p>
      </section>
    </div>
  )
}
