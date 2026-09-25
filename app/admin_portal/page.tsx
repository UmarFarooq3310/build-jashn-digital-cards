'use client'

import React, { useState, useMemo, useEffect, useCallback, Fragment } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  Users,
  Download,
  Search,
  Sparkles,
  Calendar,
  Clock,
  ArrowUpRight,
  UserCheck,
  UserX,
  CreditCard,
  Building2,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Lock,
  Key,
  LogOut,
  AlertCircle,
  Edit3,
  Trash2,
  ExternalLink,
  FileText,
  Globe,
  MapPin,
  Smartphone,
  Monitor,
  Activity,
  Compass,
  Bell,
  Send,
  MousePointerClick,
  XCircle,
  Share2,
  Eye,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Layers,
  Feather,
  BookOpen,
  Scroll,
  Heart,
  Plus,
  Sliders,
  Minus,
  MinusCircle,
  PlusCircle,
  RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useJashn } from '@/lib/jashn/store'
import { db, getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase'
import { collection, getDocs, query, orderBy, limit, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import { cn } from '@/lib/utils'
import type { JashnUser, Plan, Invitation, Wish, VisitingCard, RsvpGuest } from '@/lib/jashn/types'
import type { MagicLinkData } from '@/lib/jashn/magic-types'
import { POETRY_DATABASE, POETRY_CATEGORIES, POET_PROFILES } from '@/lib/jashn/poetry-data'
import {
  listenAllGuestbookWishes,
  deleteGuestbookWish,
  deleteOldGuestbookWishes,
  type GuestbookWish,
} from '@/lib/jashn/guestbook-service'
import { CardShareModal, type ShareModalCardData } from '@/components/dashboard/card-share-modal'
import { ZoomableImageBadge } from '@/components/ui/image-lightbox'
import { purgeAdminPresence, ADMIN_EMAILS } from '@/lib/jashn/admin-presence'
import { SiteHeader } from '@/components/site-header'

function formatDateStandard(timestamp?: number): string {
  if (!timestamp) return '—'
  const d = new Date(timestamp)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function toEpochMs(val?: any): number {
  if (!val) return 0
  if (typeof val === 'number') return val
  if (typeof val === 'string') return Number(val) || Date.parse(val) || 0
  if (typeof val === 'object') {
    if (typeof val.toMillis === 'function') return val.toMillis()
    if (typeof val._seconds === 'number') return val._seconds * 1000 + Math.floor((val._nanoseconds || 0) / 1000000)
    if (typeof val.seconds === 'number') return val.seconds * 1000 + Math.floor((val.nanoseconds || 0) / 1000000)
  }
  return 0
}

function formatDateTime(timestamp?: any): string {
  const t = toEpochMs(timestamp)
  if (!t) return '—'
  const d = new Date(t)
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function formatRelativeTime(timestamp?: any): string {
  const t = toEpochMs(timestamp)
  if (!t) return ''
  const diffMs = Date.now() - t
  if (diffMs < 0) return 'Just now'
  const diffSec = Math.floor(diffMs / 1000)
  if (diffSec < 60) return 'Just now'
  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHour = Math.floor(diffMin / 60)
  if (diffHour < 24) return `${diffHour}h ago`
  const diffDays = Math.floor(diffHour / 24)
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 30) return `${diffDays}d ago`
  const diffMonths = Math.floor(diffDays / 30)
  return `${diffMonths}mo ago`
}

function getCountryFlag(countryCodeOrName?: string): string {
  if (!countryCodeOrName) return '🌐'
  const val = countryCodeOrName.trim().toUpperCase()
  if (val.length === 2) {
    try {
      const codePoints = val.split('').map((char) => 127397 + char.charCodeAt(0))
      return String.fromCodePoint(...codePoints)
    } catch {
      // fallback below
    }
  }
  const low = countryCodeOrName.toLowerCase()
  if (low.includes('pakistan')) return '🇵🇰'
  if (low.includes('emirates') || low.includes('uae') || low.includes('dubai')) return '🇦🇪'
  if (low.includes('saudi')) return '🇸🇦'
  if (low.includes('united states') || low.includes('usa') || low.includes('america')) return '🇺🇸'
  if (low.includes('united kingdom') || low.includes('uk') || low.includes('britain') || low.includes('england')) return '🇬🇧'
  if (low.includes('india')) return '🇮🇳'
  if (low.includes('canada')) return '🇨🇦'
  if (low.includes('australia')) return '🇦🇺'
  if (low.includes('germany')) return '🇩🇪'
  if (low.includes('turkey')) return '🇹🇷'
  if (low.includes('qatar')) return '🇶🇦'
  if (low.includes('oman')) return '🇴🇲'
  if (low.includes('kuwait')) return '🇰🇼'
  if (low.includes('bahrain')) return '🇧🇭'
  return '🌐'
}

interface OriginInfo {
  locationText: string
  flag: string
  country: string
  city: string
  device?: string
  browser?: string
  ip?: string
}

function inferOrigin(item: {
  country?: string
  countryCode?: string
  city?: string
  cityOrigin?: string
  region?: string
  createdLocation?: string
  device?: string
  browser?: string
  os?: string
  ip?: string
  phone?: string
  rsvpPhone?: string
  address?: string
  venue?: string
}): OriginInfo {
  const directCity = item.cityOrigin || item.city || ''
  const country = item.country || 'Pakistan'
  const countryCode = item.countryCode || 'PK'
  const flag = getCountryFlag(countryCode || country)

  // 1. If direct city is available
  if (directCity) {
    const locText = item.region && item.region !== directCity 
      ? `${directCity}, ${item.region}, ${country}` 
      : `${directCity}, ${country}`
    return {
      locationText: locText,
      flag,
      country,
      city: directCity,
      device: item.device,
      browser: item.browser,
      ip: item.ip,
    }
  }

  // 2. If createdLocation is present and contains comma (e.g. "Lahore, Punjab, Pakistan")
  if (item.createdLocation && item.createdLocation.includes(',')) {
    const parts = item.createdLocation.split(',').map((s) => s.trim())
    const extractedCity = parts[0]
    return {
      locationText: item.createdLocation,
      flag,
      country: parts[parts.length - 1] || country,
      city: extractedCity,
      device: item.device,
      browser: item.browser,
      ip: item.ip,
    }
  }

  // 3. Check venue or address or text for city names
  const textToCheck = `${item.venue || ''} ${item.address || ''} ${item.createdLocation || ''}`.toLowerCase()
  const PK_CITIES = [
    'Lahore', 'Islamabad', 'Rawalpindi', 'Karachi', 'Faisalabad', 'Multan',
    'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad', 'Abbottabad',
    'Bahawalpur', 'Sargodha', 'Sukkur', 'Larkana', 'Sheikhupura', 'Jhang',
    'Rahim Yar Khan', 'Gujrat', 'Kasur', 'Mardan', 'Sahiwal', 'Mirpur', 'Muzaffarabad'
  ]
  for (const c of PK_CITIES) {
    if (textToCheck.includes(c.toLowerCase())) {
      return {
        locationText: `${c}, Pakistan`,
        flag: '🇵🇰',
        country: 'Pakistan',
        city: c,
        device: item.device,
        browser: item.browser,
        ip: item.ip,
      }
    }
  }

  // 4. If createdLocation is valid (like "United Kingdom" or "Pakistan")
  if (item.createdLocation && item.createdLocation !== 'Web Client' && item.createdLocation !== 'Unknown Country' && item.createdLocation !== 'Unknown') {
    return {
      locationText: item.createdLocation,
      flag,
      country: item.country || item.createdLocation,
      city: '',
      device: item.device,
      browser: item.browser,
      ip: item.ip,
    }
  }

  // 5. Check phone code
  const phone = item.phone || item.rsvpPhone || ''
  if (phone.startsWith('+92') || phone.startsWith('03') || phone.startsWith('92')) {
    return {
      locationText: 'Pakistan',
      flag: '🇵🇰',
      country: 'Pakistan',
      city: '',
      device: item.device,
      browser: item.browser,
      ip: item.ip,
    }
  }
  if (textToCheck.includes('dubai') || textToCheck.includes('abu dhabi') || textToCheck.includes('sharjah')) {
    return {
      locationText: 'United Arab Emirates',
      flag: '🇦🇪',
      country: 'UAE',
      city: 'Dubai',
      device: item.device,
      browser: item.browser,
      ip: item.ip,
    }
  }

  if (item.country) {
    const flag = getCountryFlag(item.countryCode || item.country)
    return {
      locationText: item.city ? `${item.city}, ${item.country}` : item.country,
      flag,
      country: item.country,
      city: item.city || '',
      device: item.device,
      browser: item.browser,
      ip: item.ip,
    }
  }

  return {
    locationText: item.city || 'Global (Online)',
    flag: '🌐',
    country: 'Global',
    city: item.city || '',
    device: item.device,
    browser: item.browser,
    ip: item.ip,
  }
}

function AdminTablePagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  itemName = 'records',
}: {
  currentPage: number
  totalItems: number
  pageSize: number
  onPageChange: (newPage: number) => void
  onPageSizeChange?: (newSize: number) => void
  itemName?: string
}) {
  if (totalItems <= 0) return null

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const startIdx = Math.min(totalItems, (currentPage - 1) * pageSize + 1)
  const endIdx = Math.min(totalItems, currentPage * pageSize)

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('ellipsis-start')
      
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i)
      }
      
      if (currentPage < totalPages - 2) pages.push('ellipsis-end')
      if (!pages.includes(totalPages)) pages.push(totalPages)
    }
    return pages
  }

  return (
    <div className="p-4 border-t border-border/80 bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-3 text-muted-foreground font-medium">
        <span>
          Showing <strong className="text-foreground font-mono">{startIdx}</strong>–<strong className="text-foreground font-mono">{endIdx}</strong> of <strong className="text-foreground font-mono">{totalItems}</strong> {itemName}
        </span>
        {onPageSizeChange && (
          <div className="flex items-center gap-1.5 ml-2 border-l border-border pl-3">
            <span className="text-[11px]">Per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                onPageSizeChange(Number(e.target.value))
                onPageChange(1)
              }}
              aria-label="Records per page"
              className="px-2 py-1 rounded-lg bg-background border border-border text-foreground font-semibold text-xs focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            >
              <option value={10}>10</option>
              <option value={30}>30 (Default)</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 flex-wrap justify-end">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-2.5 py-1.5 rounded-xl border border-border bg-card text-foreground font-semibold hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft className="size-3.5" />
          <span>Prev</span>
        </button>

        {getPageNumbers().map((page, idx) => {
          if (typeof page === 'string') {
            return (
              <span key={`ell-${idx}`} className="px-1.5 text-muted-foreground font-mono">
                …
              </span>
            )
          }
          const isActive = page === currentPage
          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={cn(
                "min-w-8 h-8 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
                isActive
                  ? "bg-indigo-600 text-white shadow-sm scale-105"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {page}
            </button>
          )
        })}

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-2.5 py-1.5 rounded-xl border border-border bg-card text-foreground font-semibold hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="size-3.5" />
        </button>
      </div>
    </div>
  )
}

export default function AdminPortalPage() {
  const [mounted, setMounted] = useState(false)
  const [isAdminAuthorized, setIsAdminAuthorized] = useState(false)
  const [adminEmailInput, setAdminEmailInput] = useState('')
  const [adminPasswordInput, setAdminPasswordInput] = useState('')
  const [adminError, setAdminError] = useState('')

  const {
    user: currentUser,
    registeredUsers,
    wishes: storeWishes,
    invitations: storeInvitations,
    visitingCards: storeVisitingCards,
    rsvps: storeRsvps,
    adminUpdateUserPlan,
    adminDeleteUser,
    downloadAllGuestsCsv,
    downloadAllGuestsPdf,
    deleteInvitation,
    deleteWish,
    deleteVisitingCard,
    showToast,
  } = useJashn()

  const [adminSection, setAdminSection] = useState<'all' | 'invitations' | 'wishes' | 'visiting_cards' | 'rsvps' | 'users' | 'push_notifications' | 'live_users' | 'magic_links' | 'guestbook' | 'poetry'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [poetrySearchTerm, setPoetrySearchTerm] = useState('')
  const [poetryCategoryFilter, setPoetryCategoryFilter] = useState('all')
  const [invitationSearch, setInvitationSearch] = useState('')
  const [wishSearch, setWishSearch] = useState('')
  const [vcSearch, setVcSearch] = useState('')
  const [magicSearch, setMagicSearch] = useState('')
  const [rsvpSearch, setRsvpSearch] = useState('')

  // ── Section Pagination States (Default 30 records per page) ───────────────
  const [pageLiveUsers, setPageLiveUsers] = useState(1)
  const [pageSizeLiveUsers, setPageSizeLiveUsers] = useState(30)

  const [pagePoetryEvents, setPagePoetryEvents] = useState(1)
  const [pageSizePoetryEvents, setPageSizePoetryEvents] = useState(30)

  const [pageUsers, setPageUsers] = useState(1)
  const [pageSizeUsers, setPageSizeUsers] = useState(30)

  const [pageInvitations, setPageInvitations] = useState(1)
  const [pageSizeInvitations, setPageSizeInvitations] = useState(30)

  const [pageWishes, setPageWishes] = useState(1)
  const [pageSizeWishes, setPageSizeWishes] = useState(30)

  const [pageVisitingCards, setPageVisitingCards] = useState(1)
  const [pageSizeVisitingCards, setPageSizeVisitingCards] = useState(30)

  const [pageMagicLinks, setPageMagicLinks] = useState(1)
  const [pageSizeMagicLinks, setPageSizeMagicLinks] = useState(30)

  const [pageGuestbook, setPageGuestbook] = useState(1)
  const [pageSizeGuestbook, setPageSizeGuestbook] = useState(30)

  const [pageRsvps, setPageRsvps] = useState(1)
  const [pageSizeRsvps, setPageSizeRsvps] = useState(30)

  // Which invitation's RSVPs to show — null means all
  const [rsvpFilterSlug, setRsvpFilterSlug] = useState<string | null>(null)

  // ── Guestbook & Wishes Wall Real-Time State ──────────────────────────────
  const [allGuestbookWishes, setAllGuestbookWishes] = useState<GuestbookWish[]>([])
  const [guestbookSearch, setGuestbookSearch] = useState('')
  const [isCleaningOldWishes, setIsCleaningOldWishes] = useState(false)
  const [guestbookCleanupDays, setGuestbookCleanupDays] = useState(30)

  useEffect(() => {
    const unsub = listenAllGuestbookWishes((wishes) => {
      setAllGuestbookWishes(wishes)
    })
    return () => unsub()
  }, [])

  async function handleDeleteSingleWish(wishId: string, cardSlug?: string) {
    if (!confirm('Are you sure you want to delete this guestbook wish? This cannot be undone.')) return
    try {
      await deleteGuestbookWish(wishId, cardSlug)
      setAllGuestbookWishes((prev) => prev.filter((w) => w.id !== wishId))
      showToast('Guest wish deleted from Wishes Wall', 'info')
    } catch (e) {
      showToast('Failed to delete wish', 'error')
    }
  }

  async function handleCleanOldWishes() {
    if (!confirm(`Are you sure you want to permanently delete guest wishes older than ${guestbookCleanupDays} days?`)) return
    setIsCleaningOldWishes(true)
    try {
      const deleted = await deleteOldGuestbookWishes(guestbookCleanupDays)
      showToast(`Cleaned up ${deleted} guestbook entries older than ${guestbookCleanupDays} days`, 'info')
      const cutoff = Date.now() - guestbookCleanupDays * 24 * 60 * 60 * 1000
      setAllGuestbookWishes((prev) => prev.filter((w) => w.createdAt > cutoff))
    } catch (e) {
      showToast('Failed to clean old wishes', 'error')
    } finally {
      setIsCleaningOldWishes(false)
    }
  }

  const filteredGuestbookWishes = useMemo(() => {
    if (!guestbookSearch.trim()) return allGuestbookWishes
    const q = guestbookSearch.toLowerCase()
    return allGuestbookWishes.filter((w) =>
      w.guestName?.toLowerCase().includes(q) ||
      w.message?.toLowerCase().includes(q) ||
      w.cardSlug?.toLowerCase().includes(q) ||
      (w.city && w.city.toLowerCase().includes(q)) ||
      (w.country && w.country.toLowerCase().includes(q))
    )
  }, [allGuestbookWishes, guestbookSearch])

  // ── Real-Time Active Users State (Live Presence) ─────────────────────────
  const [allSessions, setAllSessions] = useState<any[]>([])
  const [selectedSessions, setSelectedSessions] = useState<string[]>([])
  const [liveActiveSessions, setLiveActiveSessions] = useState<any[]>([])
  const [expandedDevices, setExpandedDevices] = useState<Record<string, boolean>>({})
  const [groupByDevice, setGroupByDevice] = useState<boolean>(true)

  const toggleExpandDevice = (key: string) => {
    setExpandedDevices((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const toggleExpandAllDevices = (expand: boolean) => {
    if (!expand) {
      setExpandedDevices({})
    } else {
      const allKeys: Record<string, boolean> = {}
      groupedSessions.forEach((g) => {
        allKeys[g.deviceKey] = true
      })
      setExpandedDevices(allKeys)
    }
  }

  interface DeviceSessionGroup {
    deviceKey: string
    deviceId?: string
    userName: string
    userEmail: string
    userId?: string | null
    device: string
    browser?: string
    os?: string
    country?: string
    countryCode?: string
    city?: string
    region?: string
    location?: string
    ip?: string
    language?: string
    referrer?: string
    latestLastSeen: number
    isActive: boolean
    latestPage: string
    latestTitle?: string
    sessions: any[]
    uniquePages: string[]
  }

  const groupedSessions = useMemo<DeviceSessionGroup[]>(() => {
    const groupsMap = new Map<string, DeviceSessionGroup>()
    const threshold = Date.now() - 120000 // Active within last 2 minutes (matches 35s pulse)

    allSessions.forEach((s) => {
      // Build unique device key based on deviceId or IP + device + user
      const key = (s.deviceId && typeof s.deviceId === 'string' && s.deviceId.length > 3)
        ? s.deviceId
        : `${s.ip || 'no-ip'}_${s.device || 'device'}_${s.userId || s.userEmail || 'guest'}`

      const isDocActive = (s.lastSeen || 0) >= threshold

      if (!groupsMap.has(key)) {
        groupsMap.set(key, {
          deviceKey: key,
          deviceId: s.deviceId,
          userName: s.userName || 'Guest Visitor',
          userEmail: s.userEmail || 'Guest',
          userId: s.userId,
          device: s.device || 'Desktop',
          browser: s.browser,
          os: s.os,
          country: s.country,
          countryCode: s.countryCode,
          city: s.city,
          region: s.region,
          location: s.location,
          ip: s.ip,
          language: s.language,
          referrer: s.referrer,
          latestLastSeen: s.lastSeen || 0,
          isActive: isDocActive,
          latestPage: s.page || '/',
          latestTitle: s.title,
          sessions: [s],
          uniquePages: [s.page || '/'],
        })
      } else {
        const g = groupsMap.get(key)!
        g.sessions.push(s)
        if ((s.lastSeen || 0) > g.latestLastSeen) {
          g.latestLastSeen = s.lastSeen || 0
          g.latestPage = s.page || g.latestPage
          g.latestTitle = s.title || g.latestTitle
          if (s.userName && s.userName !== 'Guest' && s.userName !== 'Guest Visitor') {
            g.userName = s.userName
          }
          if (s.userEmail && s.userEmail !== 'Guest' && s.userEmail !== 'Guest Visitor') {
            g.userEmail = s.userEmail
          }
          if (s.userId) g.userId = s.userId
          if (s.device) g.device = s.device
          if (s.ip && (!g.ip || g.ip === '127.0.0.1')) g.ip = s.ip
          if (s.location) g.location = s.location
          if (s.country) g.country = s.country
          if (s.city) g.city = s.city
        }
        if (isDocActive) {
          g.isActive = true
        }
        if (s.page && !g.uniquePages.includes(s.page)) {
          g.uniquePages.push(s.page)
        }
      }
    })

    return Array.from(groupsMap.values()).sort((a, b) => b.latestLastSeen - a.latestLastSeen)
  }, [allSessions])

  useEffect(() => {
    // Immediately purge any session docs from Firebase for this admin device
    const localDevId = typeof window !== 'undefined' ? (localStorage.getItem('cardzy_device_id') || undefined) : undefined
    purgeAdminPresence(undefined, localDevId)

    let unsub = () => {}
    async function listenLivePresence() {
      try {
        const firestoreDb = getFirebaseDb()
        if (!firestoreDb) return
        const collRef = collection(firestoreDb, 'active_sessions')
        const q = query(collRef, orderBy('lastSeen', 'desc'), limit(100))
        unsub = onSnapshot(q, async (snap) => {
          const threshold = Date.now() - 120000 // Active within the last 2 minutes (matches 35s pulse)
          const rawDocs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as any))
          const currentDevId = typeof window !== 'undefined' ? localStorage.getItem('cardzy_device_id') : null
          const currentSessId = typeof window !== 'undefined' ? (sessionStorage.getItem('cardzy_live_session_id') || localStorage.getItem('cardzy_live_session_id')) : null

          // Identify any admin session docs to clean up from database
          const adminDocIds = rawDocs
            .filter((s) => 
              (s.page && s.page.startsWith('/admin_portal')) || 
              (s.userEmail && ADMIN_EMAILS.includes(s.userEmail.toLowerCase().trim())) ||
              (currentDevId && s.deviceId && s.deviceId === currentDevId) ||
              (currentSessId && s.id === currentSessId)
            )
            .map((s) => s.id)

          if (adminDocIds.length > 0) {
            try {
              const { deleteDoc, doc } = await import('firebase/firestore')
              adminDocIds.forEach((id) => deleteDoc(doc(firestoreDb, 'active_sessions', id)).catch(() => {}))
            } catch {}
          }

          // Filter out admin portal visits, admin accounts, and admin device from visitor view
          const visitorDocs = rawDocs
            .filter((s) => {
              if (s.page && s.page.startsWith('/admin_portal')) return false
              if (s.userEmail && ADMIN_EMAILS.includes(s.userEmail.toLowerCase().trim())) return false
              if (currentDevId && s.deviceId && s.deviceId === currentDevId) return false
              if (currentSessId && s.id === currentSessId) return false
              return true
            })
            .sort((a, b) => (b.lastSeen || 0) - (a.lastSeen || 0))
          
          setAllSessions(visitorDocs)
          
          const active = visitorDocs.filter((s) => s.lastSeen && s.lastSeen >= threshold)
          setLiveActiveSessions(active)
        })
      } catch (err) {
        console.warn('Presence listener notice:', err)
      }
    }

    listenLivePresence()

    // Interval to prune stale sessions in local state
    const interval = setInterval(() => {
      setLiveActiveSessions((prev) => {
        const threshold = Date.now() - 120000
        return prev.filter((s) => s.lastSeen && s.lastSeen >= threshold)
      })
    }, 10000)

    return () => {
      unsub()
      clearInterval(interval)
    }
  }, [])

  // ── Delete User Modal state ──────────────────────────────────────────────
  const [deleteUserTarget, setDeleteUserTarget] = useState<{ uid: string; name: string; email: string } | null>(null)
  const [isDeletingUser, setIsDeletingUser] = useState(false)

  // ── Card Cascade Delete & Metrics Adjustment Modal States ────────────
  interface DeleteCardTarget {
    cardType: 'invite' | 'wish' | 'vcard' | 'magic' | 'poetry'
    slug: string
    title: string
    owner?: string
    views: number
    totalShares: number
    sharesBreakdown: Record<string, number>
    likes: number
    rsvpsCount: number
    guestbookCount: number
    createdAt?: any
  }

  interface MetricAdjustmentTarget {
    cardType: 'invite' | 'wish' | 'vcard' | 'magic' | 'poetry'
    slug: string
    title: string
    views: number
    totalShares: number
    sharesBreakdown: Record<string, number>
    likes: number
  }

  const [deleteCardTarget, setDeleteCardTarget] = useState<DeleteCardTarget | null>(null)
  const [isDeletingCard, setIsDeletingCard] = useState(false)

  const [metricAdjustmentTarget, setMetricAdjustmentTarget] = useState<MetricAdjustmentTarget | null>(null)
  const [isAdjustingMetric, setIsAdjustingMetric] = useState(false)
  const [customLikesInput, setCustomLikesInput] = useState('')
  const [customViewsInput, setCustomViewsInput] = useState('')

  function promptDeleteCard(cardType: 'invite' | 'wish' | 'vcard' | 'magic' | 'poetry', card: any) {
    const slug = card.slug || card.id || card.poemId || ''
    const title = card.title || card.hostNames || card.fullName || card.recipientName || slug
    const owner = card.userEmail || card.userPhone || card.ownerEmail || card.creator || (card.isGuest ? 'Guest User' : 'Authenticated User')
    const views = Number(card.viewsCount ?? card.viewCount ?? card.views ?? 0)
    const sharesBreakdown = typeof card.shares === 'object' && card.shares ? card.shares : {}
    const totalShares = Object.values(sharesBreakdown).reduce((a: number, b: any) => a + Number(b || 0), 0)
    const likes = Number(card.likesCount ?? card.likes ?? card.reactionsCount ?? 0)

    let rsvpsCount = 0
    if (cardType === 'invite') {
      rsvpsCount = firestoreRsvps.filter((r: any) => r.invitationSlug === slug || r.invitationId === slug || r.cardSlug === slug).length
    }
    let guestbookCount = 0
    if (cardType === 'wish') {
      guestbookCount = allGuestbookWishes.filter((g) => g.cardSlug === slug).length
    }

    setDeleteCardTarget({
      cardType,
      slug,
      title,
      owner,
      views,
      totalShares,
      sharesBreakdown,
      likes,
      rsvpsCount,
      guestbookCount,
      createdAt: card.createdAt,
    })
  }

  function promptAdjustMetrics(cardType: 'invite' | 'wish' | 'vcard' | 'magic' | 'poetry', card: any) {
    const slug = card.slug || card.id || card.poemId || ''
    const title = card.title || card.hostNames || card.fullName || card.recipientName || slug
    const views = Number(card.viewsCount ?? card.viewCount ?? card.views ?? 0)
    const sharesBreakdown = typeof card.shares === 'object' && card.shares ? card.shares : {}
    const totalShares = Object.values(sharesBreakdown).reduce((a: number, b: any) => a + Number(b || 0), 0)
    const likes = Number(card.likesCount ?? card.likes ?? card.reactionsCount ?? 0)

    setCustomLikesInput(String(likes))
    setCustomViewsInput(String(views))
    setMetricAdjustmentTarget({
      cardType,
      slug,
      title,
      views,
      totalShares,
      sharesBreakdown,
      likes,
    })
  }

  async function executeDeleteCard() {
    if (!deleteCardTarget) return
    setIsDeletingCard(true)
    const { cardType, slug } = deleteCardTarget
    try {
      // 1. Call server API for cascading delete (removes card, linked RSVPs, wishes, etc.)
      const res = await fetch('/api/admin-card-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_card', cardType, slug }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete card')
      }

      // 2. Client Firestore delete fallback
      const activeDb = getFirebaseDb() || db
      if (activeDb) {
        const col =
          cardType === 'invite'
            ? 'invitations'
            : cardType === 'wish'
            ? 'wishes'
            : cardType === 'vcard'
            ? 'visitingCards'
            : cardType === 'magic'
            ? 'magic_links'
            : 'custom_poetry'
        await deleteDoc(doc(activeDb, col, slug)).catch(() => {})
      }

      // 3. Purge from local Zustand and React states immediately so all admin counts decrement
      if (cardType === 'invite') {
        deleteInvitation(slug)
        setFirestoreInvitations((prev) => prev.filter((i) => i.slug !== slug && i.id !== slug))
        setFirestoreRsvps((prev) => prev.filter((r: any) => r.invitationSlug !== slug && r.invitationId !== slug && r.cardSlug !== slug))
      } else if (cardType === 'wish') {
        deleteWish(slug)
        setFirestoreWishes((prev) => prev.filter((w) => (w.slug || w.id) !== slug && w.id !== slug))
        setAllGuestbookWishes((prev) => prev.filter((g) => g.cardSlug !== slug))
      } else if (cardType === 'vcard') {
        deleteVisitingCard(slug)
        setFirestoreVisitingCards((prev) => prev.filter((v) => (v.slug || v.id) !== slug && v.id !== slug))
      } else if (cardType === 'magic') {
        setFirestoreMagicLinks((prev) => prev.filter((m) => (m.slug || m.id) !== slug))
        try {
          const raw = localStorage.getItem('cardzy_local_magic_links')
          if (raw) {
            const parsed = JSON.parse(raw)
            delete parsed[slug]
            localStorage.setItem('cardzy_local_magic_links', JSON.stringify(parsed))
          }
        } catch {}
      } else if (cardType === 'poetry') {
        setFirestoreCustomPoetry((prev) => prev.filter((p) => p.id !== slug))
        setFirestorePoetryStats((prev) => prev.filter((s) => s.id !== slug))
      }

      showToast(`Card "${deleteCardTarget.title || slug}" and all associated data permanently deleted.`, 'success')
      setDeleteCardTarget(null)
    } catch (err: any) {
      console.error('Delete card error:', err)
      showToast(err.message || 'Failed to delete card', 'error')
    } finally {
      setIsDeletingCard(false)
    }
  }

  async function executeAdjustMetric(
    metric: 'likes' | 'views' | 'shares',
    operation: 'decrement' | 'increment' | 'reset' | 'set',
    value?: number
  ) {
    if (!metricAdjustmentTarget) return
    setIsAdjustingMetric(true)
    const { cardType, slug } = metricAdjustmentTarget

    try {
      const res = await fetch('/api/admin-card-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'adjust_metric',
          cardType,
          slug,
          metric,
          operation,
          value,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to adjust metric')
      }

      const newLikes = data.likes !== undefined ? data.likes : metricAdjustmentTarget.likes
      const newViews = data.views !== undefined ? data.views : metricAdjustmentTarget.views
      const newShares = data.shares !== undefined ? data.shares : metricAdjustmentTarget.sharesBreakdown
      const newTotalShares = typeof newShares === 'object' && newShares
        ? Object.values(newShares).reduce((a: number, b: any) => a + Number(b || 0), 0)
        : (metric === 'shares' && operation === 'reset' ? 0 : metricAdjustmentTarget.totalShares)

      setMetricAdjustmentTarget((prev) => prev ? ({
        ...prev,
        likes: newLikes,
        views: newViews,
        totalShares: newTotalShares,
        sharesBreakdown: typeof newShares === 'object' && newShares ? newShares : prev.sharesBreakdown,
      }) : null)
      setCustomLikesInput(String(newLikes))
      setCustomViewsInput(String(newViews))

      if (cardType === 'invite') {
        setFirestoreInvitations((prev) => prev.map((i) => {
          if (i.slug === slug || i.id === slug) {
            return {
              ...i,
              likesCount: newLikes,
              likes: newLikes,
              reactionsCount: newLikes,
              views: newViews,
              shares: typeof newShares === 'object' && newShares ? newShares : (metric === 'shares' && operation === 'reset' ? {} : i.shares),
            }
          }
          return i
        }))
      } else if (cardType === 'wish') {
        setFirestoreWishes((prev) => prev.map((w) => {
          if ((w.slug || w.id) === slug || w.id === slug) {
            return {
              ...w,
              likesCount: newLikes,
              likes: newLikes,
              reactionsCount: newLikes,
              views: newViews,
              shares: typeof newShares === 'object' && newShares ? newShares : (metric === 'shares' && operation === 'reset' ? {} : w.shares),
            }
          }
          return w
        }))
      } else if (cardType === 'vcard') {
        setFirestoreVisitingCards((prev) => prev.map((vc) => {
          if ((vc.slug || vc.id) === slug || vc.id === slug) {
            return {
              ...vc,
              likesCount: newLikes,
              likes: newLikes,
              reactionsCount: newLikes,
              views: newViews,
              shares: typeof newShares === 'object' && newShares ? newShares : (metric === 'shares' && operation === 'reset' ? {} : vc.shares),
            }
          }
          return vc
        }))
      } else if (cardType === 'magic') {
        setFirestoreMagicLinks((prev) => prev.map((m) => {
          if ((m.slug || m.id) === slug || m.id === slug) {
            return {
              ...m,
              likesCount: newLikes,
              likes: newLikes,
              reactionsCount: newLikes,
              views: newViews,
              shares: typeof newShares === 'object' && newShares ? newShares : (metric === 'shares' && operation === 'reset' ? {} : m.shares),
            }
          }
          return m
        }))
      } else if (cardType === 'poetry') {
        setFirestorePoetryStats((prev) => {
          const idx = prev.findIndex((s) => s.id === slug)
          if (idx >= 0) {
            const updated = [...prev]
            updated[idx] = {
              ...updated[idx],
              likes: newLikes,
              views: newViews,
              shares: typeof newShares === 'number' ? newShares : updated[idx].shares,
            }
            return updated
          }
          return [...prev, { id: slug, likes: newLikes, views: newViews, shares: 0 }]
        })
      }

      showToast(`Updated ${metric} for "${metricAdjustmentTarget.title}": new value is ${metric === 'likes' ? newLikes : metric === 'views' ? newViews : newTotalShares}`, 'success')
    } catch (err: any) {
      console.error('Adjust metric error:', err)
      showToast(err.message || 'Failed to adjust metric', 'error')
    } finally {
      setIsAdjustingMetric(false)
    }
  }

  function handleDeleteInv(slug: string) {
    const card = firestoreInvitations.find((i) => i.slug === slug || i.id === slug) || { slug, id: slug, title: slug }
    promptDeleteCard('invite', card)
  }

  function handleDeleteWishCard(slug: string) {
    const card = firestoreWishes.find((w) => (w.slug || w.id) === slug || w.id === slug) || { slug, id: slug, title: slug }
    promptDeleteCard('wish', card)
  }

  function handleDeleteVisitingCard(slug: string, fullName?: string) {
    const card = firestoreVisitingCards.find((vc) => (vc.slug || vc.id) === slug || vc.id === slug) || { slug, id: slug, fullName: fullName || slug }
    promptDeleteCard('vcard', card)
  }

  async function handleCreatePoetry(e: React.FormEvent) {
    e.preventDefault()
    if (!newPoetryForm.title.trim() || !newPoetryForm.poet.trim() || !newPoetryForm.originalText.trim()) {
      showToast('Title, Poet Name, and Original Text are required.', 'error')
      return
    }

    setIsSubmittingPoetry(true)
    try {
      const res = await fetch('/api/poetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPoetryForm),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create poetry')
      }

      setFirestoreCustomPoetry((prev) => [data.poem, ...prev])
      showToast(`Poetry "${newPoetryForm.title}" added to treasury!`, 'success')
      setIsAddPoetryModalOpen(false)
      setNewPoetryForm({
        title: '',
        format: 'two_liner',
        poet: '',
        poetUrdu: '',
        poetOrigin: 'Pakistan / South Asia',
        poetEra: 'Modern Classical',
        category: 'ishq',
        categoryLabel: 'Love & Romance',
        originalLanguage: 'ur',
        direction: 'rtl',
        originalText: '',
        romanText: '',
        englishTranslation: '',
        meaning: '',
        tags: '',
        recommendedCardType: 'wish',
        cardPrefillMsg: '',
      })
    } catch (err: any) {
      console.error('Poetry creation error:', err)
      showToast(err.message || 'Failed to save poetry', 'error')
    } finally {
      setIsSubmittingPoetry(false)
    }
  }

  async function handleDeleteCustomPoetry(poemId: string, title: string) {
    if (!confirm(`Are you sure you want to delete poem "${title}" from Firebase Firestore? This action cannot be undone.`)) return
    try {
      const res = await fetch(`/api/poetry?id=${poemId}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to delete')
      setFirestoreCustomPoetry((prev) => prev.filter((p) => p.id !== poemId))
      showToast(`Poem "${title}" deleted from Firebase`, 'info')
    } catch (err: any) {
      showToast(err.message || 'Failed to delete poem', 'error')
    }
  }

  async function handleDeletePoetryActivity(eventDocId?: string, poemId?: string, e?: React.MouseEvent) {
    if (e) e.stopPropagation()
    if (!confirm('Are you sure you want to delete this poetry activity event record?')) return
    const firestoreDb = getFirebaseDb()
    if (firestoreDb && eventDocId) {
      try {
        await deleteDoc(doc(firestoreDb, 'poetry_activity', eventDocId))
        setFirestorePoetryActivity((prev) => prev.filter((a) => (a.id || a.docId) !== eventDocId))
        showToast('Poetry activity record deleted from Firebase', 'info')
      } catch (err: any) {
        setFirestorePoetryActivity((prev) => prev.filter((a) => (a.id || a.docId) !== eventDocId))
        showToast('Activity record removed', 'info')
      }
    } else {
      setFirestorePoetryActivity((prev) => prev.filter((a) => (a.id || a.docId) !== eventDocId && a.poemId !== poemId))
      showToast('Activity record removed', 'info')
    }
    if (viewingPoetryFlyer && (viewingPoetryFlyer.activity?.id === eventDocId || viewingPoetryFlyer.activity?.poemId === poemId)) {
      setViewingPoetryFlyer(null)
    }
  }

  function handleOpenFlyerPreview(act: any, e?: React.MouseEvent) {
    if (e) e.stopPropagation()
    const pId = act.poemId || ''
    const foundPoem = POETRY_DATABASE.find(
      (p) => p.id === pId || p.title === act.title || (pId && p.id.includes(pId))
    ) || {
      id: act.poemId || 'poem-custom',
      title: act.title || 'Classical Urdu Verse',
      poet: act.poet || 'Classical Poet',
      poetUrdu: act.poetUrdu || '',
      format: 'two_liner',
      category: 'ishq',
      categoryLabel: 'Love & Romance',
      originalLanguage: 'ur',
      direction: 'rtl',
      originalText: act.originalText || act.title || 'کچھ بات ہے کہ ہستی مٹتی نہیں ہماری\nصدیوں رہا ہے دشمن دورِ زماں ہمارا',
      romanText: act.romanText || 'Kuch baat hai ke hasti mit-ti nahi hamari...',
      englishTranslation: act.englishTranslation || 'There is something inherent in our essence that defies extinction.',
      tags: ['poetry', 'classic'],
      recommendedCardType: 'wish',
      cardPrefillMsg: act.title || '',
    }
    setViewingPoetryFlyer({ activity: act, poem: foundPoem })
  }

  async function handleConfirmDeleteUser() {
    if (!deleteUserTarget) return
    setIsDeletingUser(true)
    try {
      await adminDeleteUser(deleteUserTarget.uid)
      // Also remove from local firestore list
      setFirestoreUsers((prev) => prev.filter((u) => u.uid !== deleteUserTarget.uid))
      showToast(`User "${deleteUserTarget.name}" deleted permanently.`, 'info')
    } catch (e) {
      console.error('Failed to delete user:', e)
      showToast('Failed to delete user. Please try again.', 'error')
    } finally {
      setIsDeletingUser(false)
      setDeleteUserTarget(null)
    }
  }

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const sessionData = sessionStorage.getItem('cardzy_admin_session')
      if (sessionData) {
        try {
          const { authed, expiresAt } = JSON.parse(sessionData)
          if (authed && expiresAt && Date.now() < expiresAt) {
            setIsAdminAuthorized(true)
          } else {
            // Session expired — clear it
            sessionStorage.removeItem('cardzy_admin_session')
          }
        } catch {
          sessionStorage.removeItem('cardzy_admin_session')
        }
      }
    }
  }, [])

  useEffect(() => {
    const ALLOWED_EMAILS = ['cardzyonline@gmail.com']
    if (currentUser?.email && ALLOWED_EMAILS.includes(currentUser.email.toLowerCase())) {
      setIsAdminAuthorized(true)
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('cardzy_is_admin', '1')
          sessionStorage.setItem('cardzy_is_admin', '1')
          const devId = localStorage.getItem('cardzy_device_id') || undefined
          purgeAdminPresence(undefined, devId)
        } catch {}
      }
    }
  }, [currentUser])

  // Auto-lock when the 20-minute session window expires
  useEffect(() => {
    if (!isAdminAuthorized) return
    const checkExpiry = setInterval(() => {
      const sessionData = sessionStorage.getItem('cardzy_admin_session')
      if (!sessionData) {
        setIsAdminAuthorized(false)
        return
      }
      try {
        const { expiresAt } = JSON.parse(sessionData)
        if (expiresAt && Date.now() >= expiresAt) {
          sessionStorage.removeItem('cardzy_admin_session')
          setIsAdminAuthorized(false)
          showToast('Admin session expired. Please log in again.', 'info')
        }
      } catch {
        setIsAdminAuthorized(false)
      }
    }, 60_000) // Check every 60 seconds
    return () => clearInterval(checkExpiry)
  }, [isAdminAuthorized, showToast])

  function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault()
    const email = adminEmailInput.trim().toLowerCase()
    const pass = adminPasswordInput.trim()

    // ─── Admin Credentials ───────────────────────────────────────────────
    // Username (email): cardzyonline@gmail.com
    // Password:         Umar@3310
    // ────────────────────────────────────────────────────────────────────
    const ALLOWED_EMAILS = ['cardzyonline@gmail.com']
    const ADMIN_PASSWORD = 'Umar@3310'

    const emailOk = ALLOWED_EMAILS.includes(email)
    const passOk = pass === ADMIN_PASSWORD

    if (emailOk && passOk) {
      setIsAdminAuthorized(true)
      if (typeof window !== 'undefined') {
        // Session valid for 20 minutes
        const expiresAt = Date.now() + 20 * 60 * 1000
        try {
          sessionStorage.setItem('cardzy_admin_session', JSON.stringify({ authed: true, expiresAt }))
          sessionStorage.setItem('cardzy_is_admin', '1')
          localStorage.setItem('cardzy_is_admin', '1')
          const devId = localStorage.getItem('cardzy_device_id') || undefined
          purgeAdminPresence(undefined, devId)
        } catch {}
      }
      setAdminError('')
      showToast('Admin Portal Unlocked — session valid for 20 min', 'success')
    } else {
      setAdminError('Access denied: Invalid admin email or password.')
    }
  }

  function handleAdminLock() {
    setIsAdminAuthorized(false)
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem('cardzy_admin_session')
        sessionStorage.removeItem('cardzy_is_admin')
        localStorage.removeItem('cardzy_is_admin')
      } catch {}
    }
    setAdminEmailInput('')
    setAdminPasswordInput('')
    showToast('Admin Portal Locked', 'info')
  }

  const [filterPlan, setFilterPlan] = useState<'all' | 'free' | 'pro' | 'business' | 'expired'>('all')
  const [selectedDurationDays, setSelectedDurationDays] = useState<number>(30)

  const [firestoreUsers, setFirestoreUsers] = useState<JashnUser[]>([])
  const [firestoreInvitations, setFirestoreInvitations] = useState<Invitation[]>([])
  const [firestoreWishes, setFirestoreWishes] = useState<Wish[]>([])
  const [firestoreVisitingCards, setFirestoreVisitingCards] = useState<VisitingCard[]>([])
  const [firestoreRsvps, setFirestoreRsvps] = useState<RsvpGuest[]>([])
  const [firestoreMagicLinks, setFirestoreMagicLinks] = useState<MagicLinkData[]>([])
  const [firestorePoetryStats, setFirestorePoetryStats] = useState<any[]>([])
  const [firestorePoetryActivity, setFirestorePoetryActivity] = useState<any[]>([])
  const [firestoreCustomPoetry, setFirestoreCustomPoetry] = useState<any[]>([])
  const [showOnlyEngagedPoetry, setShowOnlyEngagedPoetry] = useState<boolean>(true)
  const [isAddPoetryModalOpen, setIsAddPoetryModalOpen] = useState(false)
  const [isSubmittingPoetry, setIsSubmittingPoetry] = useState(false)
  const [newPoetryForm, setNewPoetryForm] = useState({
    title: '',
    format: 'two_liner' as 'two_liner' | 'full_poem',
    poet: '',
    poetUrdu: '',
    poetOrigin: 'Pakistan / South Asia',
    poetEra: 'Modern Classical',
    category: 'ishq',
    categoryLabel: 'Love & Romance',
    originalLanguage: 'ur',
    direction: 'rtl' as 'rtl' | 'ltr',
    originalText: '',
    romanText: '',
    englishTranslation: '',
    meaning: '',
    tags: '',
    recommendedCardType: 'wish' as 'wish' | 'invitation' | 'magic',
    cardPrefillMsg: '',
  })
  const [shareModalCard, setShareModalCard] = useState<ShareModalCardData | null>(null)
  const [viewingPoetryFlyer, setViewingPoetryFlyer] = useState<{ activity: any; poem: any } | null>(null)
  const [adminFlyerTab, setAdminFlyerTab] = useState<'original' | 'urdu' | 'roman' | 'english'>('original')
  const [isFirestoreLoading, setIsFirestoreLoading] = useState(false)
  const [firestoreError, setFirestoreError] = useState<string | null>(null)
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null)

  const loadFirestoreAll = useCallback(async () => {
    setIsFirestoreLoading(true)
    try {
      const res = await fetch('/api/admin-data', { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          if (data.users) setFirestoreUsers(data.users)
          if (data.invitations) setFirestoreInvitations(data.invitations)
          if (data.wishes) setFirestoreWishes(data.wishes)
          if (data.visitingCards) setFirestoreVisitingCards(data.visitingCards)
          if (data.rsvps) setFirestoreRsvps(data.rsvps)
          if (data.magicLinks) setFirestoreMagicLinks(data.magicLinks)
          if (data.guestbookWishes && data.guestbookWishes.length > 0) setAllGuestbookWishes(data.guestbookWishes)
          if (data.poetryStats) setFirestorePoetryStats(data.poetryStats)
          if (data.poetryActivity) setFirestorePoetryActivity(data.poetryActivity)
          setLastSyncedAt(Date.now())
          showToast('Real-time database re-synced', 'success')
        }
      }
    } catch (e) {
      console.warn('Manual sync notice:', e)
    } finally {
      setIsFirestoreLoading(false)
    }
  }, [showToast])

  // Real-time onSnapshot Synchronization across ALL Firebase Collections
  useEffect(() => {
    const activeDb = getFirebaseDb() || db
    if (!isFirebaseConfigured || !activeDb) {
      setFirestoreError('Firebase Cloud Database is not connected.')
      return
    }

    const normalizeShares = (data: any) => {
      const s = data?.shares && typeof data.shares === 'object' ? data.shares : {}
      return {
        whatsapp: Math.max(Number(s.whatsapp || 0), Number(data?.['shares.whatsapp'] || 0)),
        sms: Math.max(Number(s.sms || 0), Number(data?.['shares.sms'] || 0)),
        copy: Math.max(Number(s.copy || 0), Number(data?.['shares.copy'] || 0)),
        qr: Math.max(Number(s.qr || 0), Number(data?.['shares.qr'] || 0)),
        image: Math.max(Number(s.image || 0), Number(data?.['shares.image'] || 0)),
        video: Math.max(Number(s.video || 0), Number(data?.['shares.video'] || 0)),
        app: Math.max(Number(s.app || 0), Number(data?.['shares.app'] || 0)),
      }
    }

    setIsFirestoreLoading(true)

    // 1. Live Users listener
    const unsubUsers = onSnapshot(collection(activeDb, 'users'), (snap) => {
      const list: JashnUser[] = []
      snap.forEach((docSnap) => {
        if (docSnap.exists()) list.push(docSnap.data() as JashnUser)
      })
      setFirestoreUsers(list)
      setLastSyncedAt(Date.now())
      setIsFirestoreLoading(false)
    }, (err) => {
      console.warn('Users listener notice:', err)
      setIsFirestoreLoading(false)
    })

    // 2. Live Invitations listener
    const unsubInvs = onSnapshot(collection(activeDb, 'invitations'), (snap) => {
      const list: Invitation[] = []
      snap.forEach((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as any
          list.push({ ...data, id: docSnap.id, slug: data.slug || docSnap.id, shares: normalizeShares(data) })
        }
      })
      setFirestoreInvitations(list)
      setLastSyncedAt(Date.now())
    }, (err) => console.warn('Invitations listener notice:', err))

    // 3. Live Wishes listener
    const unsubWishes = onSnapshot(collection(activeDb, 'wishes'), (snap) => {
      const list: Wish[] = []
      snap.forEach((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as any
          list.push({ ...data, id: docSnap.id, slug: data.slug || docSnap.id, shares: normalizeShares(data) })
        }
      })
      setFirestoreWishes(list)
      setLastSyncedAt(Date.now())
    }, (err) => console.warn('Wishes listener notice:', err))

    // 4. Live Visiting Cards listener
    const unsubVC = onSnapshot(collection(activeDb, 'visitingCards'), (snap) => {
      const list: VisitingCard[] = []
      snap.forEach((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as any
          list.push({ ...data, id: docSnap.id, slug: data.slug || docSnap.id, shares: normalizeShares(data) })
        }
      })
      setFirestoreVisitingCards(list)
      setLastSyncedAt(Date.now())
    }, (err) => console.warn('Visiting cards listener notice:', err))

    // 5. Live RSVPs listener
    const unsubRsvps = onSnapshot(collection(activeDb, 'rsvps'), (snap) => {
      const list: RsvpGuest[] = []
      snap.forEach((docSnap) => {
        if (docSnap.exists()) list.push(docSnap.data() as RsvpGuest)
      })
      setFirestoreRsvps(list)
      setLastSyncedAt(Date.now())
    }, (err) => console.warn('RSVPs listener notice:', err))

    // 6. Live Magic Links listener
    const unsubMagic = onSnapshot(collection(activeDb, 'magic_links'), (snap) => {
      const list: MagicLinkData[] = []
      snap.forEach((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as any
          list.push({ ...data, id: docSnap.id, slug: data.slug || docSnap.id, shares: normalizeShares(data) })
        }
      })
      setFirestoreMagicLinks(list)
      setLastSyncedAt(Date.now())
    }, (err) => console.warn('Magic links listener notice:', err))

    // 7. Live Poetry Stats listener
    const unsubPoetryStats = onSnapshot(collection(activeDb, 'poetry_stats'), (snap) => {
      const list: any[] = []
      snap.forEach((docSnap) => {
        if (docSnap.exists()) list.push({ id: docSnap.id, ...docSnap.data() })
      })
      setFirestorePoetryStats(list)
      setLastSyncedAt(Date.now())
    }, (err) => console.warn('Poetry stats listener notice:', err))

    // 8. Live Poetry Activity listener
    const unsubPoetryAct = onSnapshot(query(collection(activeDb, 'poetry_activity'), orderBy('timestamp', 'desc'), limit(100)), (snap) => {
      const list: any[] = []
      snap.forEach((docSnap) => {
        if (docSnap.exists()) list.push({ id: docSnap.id, ...docSnap.data() })
      })
      setFirestorePoetryActivity(list)
      setLastSyncedAt(Date.now())
    }, (err) => console.warn('Poetry activity listener notice:', err))

    return () => {
      unsubUsers()
      unsubInvs()
      unsubWishes()
      unsubVC()
      unsubRsvps()
      unsubMagic()
      unsubPoetryStats()
      unsubPoetryAct()
    }
  }, [])

  // Invitations list (Strictly Cloud Firebase only)
  const invitations = useMemo(() => {
    return [...firestoreInvitations].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
  }, [firestoreInvitations])

  // Wishes list (Strictly Cloud Firebase only)
  const wishes = useMemo(() => {
    return [...firestoreWishes].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
  }, [firestoreWishes])

  // Visiting Cards list (Strictly Cloud Firebase only)
  const visitingCards = useMemo(() => {
    return [...firestoreVisitingCards].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
  }, [firestoreVisitingCards])

  // RSVPs list (Strictly Cloud Firebase only)
  const rsvps = useMemo(() => {
    return [...firestoreRsvps].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
  }, [firestoreRsvps])

  // Magic Links list (Firestore only)
  const magicLinks = useMemo(() => {
    return [...firestoreMagicLinks].sort((a, b) => {
      const timeA = typeof a.createdAt === 'number' ? a.createdAt : a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt as any)?.seconds ? (a.createdAt as any).seconds * 1000 : 0
      const timeB = typeof b.createdAt === 'number' ? b.createdAt : b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt as any)?.seconds ? (b.createdAt as any).seconds * 1000 : 0
      return timeB - timeA
    })
  }, [firestoreMagicLinks])

  function handleDeleteMagicLink(slug: string) {
    const card = firestoreMagicLinks.find((m) => (m.slug || m.id) === slug || m.id === slug) || { slug, id: slug, title: slug }
    promptDeleteCard('magic', card)
  }

  // RSVPs filtered by the selected invitation slug (or all if none selected)
  const filteredRsvps = useMemo(() => {
    if (!rsvpFilterSlug) return rsvps
    return rsvps.filter((r) => r.invitationSlug === rsvpFilterSlug)
  }, [rsvps, rsvpFilterSlug])

  // The invitation object for the currently filtered event (for the header banner)
  const rsvpFilterInvitation = useMemo(() => {
    if (!rsvpFilterSlug) return null
    return invitations.find((i) => i.slug === rsvpFilterSlug) ?? null
  }, [invitations, rsvpFilterSlug])

  // Merge firestore list and card creators
  const allUsersList = useMemo(() => {
    const map = new Map<string, JashnUser>()
    
    // 1. Firestore users
    firestoreUsers.forEach((u) => {
      const key = u.uid || u.email
      if (key) {
        const existing = map.get(key)
        map.set(key, existing ? { ...existing, ...u } : u)
      }
    })

    // 4. Creators from Invitations
    invitations.forEach((inv) => {
      if (inv.creatorId && inv.creatorId !== 'guest') {
        if (!map.has(inv.creatorId)) {
          map.set(inv.creatorId, {
            uid: inv.creatorId,
            name: inv.hostNames || 'Invitation Creator',
            email: `user_${inv.creatorId.slice(0, 6)}@cardzy.online`,
            plan: 'free',
            createdAt: inv.createdAt || Date.now(),
            createdLocation: inv.createdLocation,
            country: inv.country,
            countryCode: inv.countryCode,
            city: inv.cityOrigin || inv.city,
            device: inv.device,
            browser: inv.browser,
            ip: inv.ip,
          })
        }
      }
    })

    // 5. Creators from Wishes
    wishes.forEach((w) => {
      if (w.creatorId && w.creatorId !== 'guest') {
        if (!map.has(w.creatorId)) {
          map.set(w.creatorId, {
            uid: w.creatorId,
            name: w.senderName || 'Wish Creator',
            email: `user_${w.creatorId.slice(0, 6)}@cardzy.online`,
            plan: 'free',
            createdAt: w.createdAt || Date.now(),
            createdLocation: w.createdLocation,
            country: w.country,
            countryCode: w.countryCode,
            city: w.city,
            device: w.device,
            browser: w.browser,
            ip: w.ip,
          })
        }
      }
    })

    // 6. Creators from Visiting Cards
    visitingCards.forEach((vc) => {
      if (vc.creatorId && vc.creatorId !== 'guest') {
        if (!map.has(vc.creatorId)) {
          map.set(vc.creatorId, {
            uid: vc.creatorId,
            name: vc.fullName || 'Visiting Card Creator',
            email: vc.email || `user_${vc.creatorId.slice(0, 6)}@cardzy.online`,
            phone: vc.phone,
            plan: 'free',
            createdAt: vc.createdAt || Date.now(),
            createdLocation: vc.createdLocation,
            country: vc.country,
            countryCode: vc.countryCode,
            city: vc.city,
            device: vc.device,
            browser: vc.browser,
            ip: vc.ip,
          })
        }
      }
    })

    // 7. Creators from Magic Links
    magicLinks.forEach((m) => {
      if (m.senderId && m.senderId !== 'guest') {
        if (!map.has(m.senderId)) {
          const createdAt = typeof m.createdAt === 'number' ? m.createdAt : Date.now()
          map.set(m.senderId, {
            uid: m.senderId,
            name: m.senderName || 'Magic Link Creator',
            email: `user_${m.senderId.slice(0, 6)}@cardzy.online`,
            plan: 'free',
            createdAt,
            createdLocation: m.createdLocation,
            country: m.country,
            countryCode: m.countryCode,
            city: m.city,
            device: m.device,
            browser: m.browser,
            ip: m.ip,
          })
        }
      }
    })

    return Array.from(map.values()).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
  }, [firestoreUsers, invitations, wishes, visitingCards, magicLinks])

  // Stats calculation
  const stats = useMemo(() => {
    const total = allUsersList.length
    const now = Date.now()

    let proCount = 0
    let bizCount = 0
    let expiredCount = 0

    allUsersList.forEach((u) => {
      const isExpired = u.planExpiresAt ? now > u.planExpiresAt : false
      if (isExpired) {
        expiredCount++
      } else if (u.plan === 'pro') {
        proCount++
      } else if (u.plan === 'business') {
        bizCount++
      }
    })

    const estRevenueUsd = proCount * 4 + bizCount * 18
    const estRevenuePkr = proCount * 1100 + bizCount * 5000

    return {
      total,
      proCount,
      bizCount,
      expiredCount,
      activePaid: proCount + bizCount,
      estRevenueUsd,
      estRevenuePkr,
    }
  }, [allUsersList])

  const totalAdminShares = useMemo(() => {
    const all = [...invitations, ...wishes, ...visitingCards, ...magicLinks]
    return all.reduce(
      (acc, card: any) => {
        const s = card.shares || {}
        return {
          whatsapp: acc.whatsapp + (s.whatsapp || 0),
          sms: acc.sms + (s.sms || 0),
          copy: acc.copy + (s.copy || 0),
          qr: acc.qr + (s.qr || 0),
          image: acc.image + (s.image || 0),
          video: acc.video + (s.video || 0),
          app: acc.app + (s.app || 0),
          total:
            acc.total +
            (s.whatsapp || 0) +
            (s.sms || 0) +
            (s.copy || 0) +
            (s.qr || 0) +
            (s.image || 0) +
            (s.video || 0) +
            (s.app || 0),
        }
      },
      { whatsapp: 0, sms: 0, copy: 0, qr: 0, image: 0, video: 0, app: 0, total: 0 }
    )
  }, [invitations, wishes, visitingCards, magicLinks])

  // ── Poetry Analytics Computation ──────────────────────────────
  const poetrySummary = useMemo(() => {
    const summaryDoc = firestorePoetryStats.find((s) => s.id === 'summary')
    if (summaryDoc) {
      return {
        totalInteractions: Number(summaryDoc.totalInteractions || 0),
        totalViews: Number(summaryDoc.totalViews || 0),
        totalCopies: Number(summaryDoc.totalCopies || 0),
        totalShares: Number(summaryDoc.totalShares || 0),
        totalFlyers: Number(summaryDoc.totalFlyers || 0),
        totalCardCreations: Number(summaryDoc.totalCardCreations || 0),
        lastActivityAt: summaryDoc.lastActivityAt,
      }
    }

    return firestorePoetryStats.reduce(
      (acc, curr) => {
        if (curr.id === 'summary') return acc
        return {
          totalInteractions: acc.totalInteractions + (curr.views || 0) + (curr.copies || 0) + (curr.shares || 0) + (curr.flyers || 0) + (curr.cardCreations || 0),
          totalViews: acc.totalViews + (curr.views || 0),
          totalCopies: acc.totalCopies + (curr.copies || 0),
          totalShares: acc.totalShares + (curr.shares || 0),
          totalFlyers: acc.totalFlyers + (curr.flyers || 0),
          totalCardCreations: acc.totalCardCreations + (curr.cardCreations || 0),
          lastActivityAt: Math.max(acc.lastActivityAt || 0, curr.lastInteractedAt || 0),
        }
      },
      { totalInteractions: 0, totalViews: 0, totalCopies: 0, totalShares: 0, totalFlyers: 0, totalCardCreations: 0, lastActivityAt: 0 }
    )
  }, [firestorePoetryStats])

  const mergedPoetryList = useMemo(() => {
    const statsMap = new Map<string, any>()
    firestorePoetryStats.forEach((s) => {
      if (s.id !== 'summary') statsMap.set(s.id, s)
    })

    const poemsMap = new Map<string, any>()

    // 1. Load all 1,000 poems from local bundled POETRY_DATABASE
    POETRY_DATABASE.forEach((p) => {
      if (p && p.id) poemsMap.set(p.id, p)
    })

    // 2. Overlay Firestore custom poetry
    firestoreCustomPoetry.forEach((p) => {
      if (p && p.id) poemsMap.set(p.id, { ...poemsMap.get(p.id), ...p })
    })

    return Array.from(poemsMap.values()).map((p) => {
      const live = statsMap.get(p.id) || {}
      return {
        ...p,
        views: Number(live.views || 0),
        copies: Number(live.copies || 0),
        shares: Number(live.shares || 0),
        flyers: Number(live.flyers || 0),
        cardCreations: Number(live.cardCreations || 0),
        totalInteractions:
          Number(live.views || 0) +
          Number(live.copies || 0) +
          Number(live.shares || 0) +
          Number(live.flyers || 0) +
          Number(live.cardCreations || 0),
        lastInteractedAt: live.lastInteractedAt || null,
      }
    })
  }, [firestorePoetryStats, firestoreCustomPoetry])

  const filteredPoetryList = useMemo(() => {
    return mergedPoetryList.filter((p) => {
      if (showOnlyEngagedPoetry) {
        const hasEngagement = (p.copies > 0 || p.shares > 0 || p.flyers > 0 || p.cardCreations > 0 || p.views > 0 || p.isCustom)
        if (!hasEngagement) return false
      }
      const matchCat = poetryCategoryFilter === 'all' || p.category === poetryCategoryFilter
      if (!matchCat) return false
      if (!poetrySearchTerm.trim()) return true
      const q = poetrySearchTerm.toLowerCase().trim()
      return (
        p.title.toLowerCase().includes(q) ||
        p.poet.toLowerCase().includes(q) ||
        p.poetUrdu.includes(q) ||
        p.originalText.toLowerCase().includes(q) ||
        p.englishTranslation.toLowerCase().includes(q)
      )
    }).sort((a, b) => (b.totalInteractions || 0) - (a.totalInteractions || 0))
  }, [mergedPoetryList, showOnlyEngagedPoetry, poetryCategoryFilter, poetrySearchTerm])

  // Filtered Users
  const filteredUsers = useMemo(() => {
    const now = Date.now()
    return allUsersList.filter((u) => {
      const isExpired = u.planExpiresAt ? now > u.planExpiresAt : false

      if (filterPlan === 'pro' && (u.plan !== 'pro' || isExpired)) return false
      if (filterPlan === 'business' && (u.plan !== 'business' || isExpired)) return false
      if (filterPlan === 'free' && (u.plan !== 'free' || isExpired)) return false
      if (filterPlan === 'expired' && !isExpired) return false

      if (searchTerm) {
        const query = searchTerm.toLowerCase()
        const matchName = u.name?.toLowerCase().includes(query)
        const matchEmail = u.email?.toLowerCase().includes(query)
        const matchUid = u.uid?.toLowerCase().includes(query)
        const matchPhone = u.phone?.toLowerCase().includes(query)
        const matchLoc = (u.createdLocation || u.country || u.city || '')?.toLowerCase().includes(query)
        return matchName || matchEmail || matchUid || matchPhone || matchLoc
      }
      return true
    })
  }, [allUsersList, filterPlan, searchTerm])

  const paginatedUsers = useMemo(() => {
    const start = (pageUsers - 1) * pageSizeUsers
    return filteredUsers.slice(start, start + pageSizeUsers)
  }, [filteredUsers, pageUsers, pageSizeUsers])

  // Filtered & Paginated Invitations
  const filteredInvitations = useMemo(() => {
    if (!invitationSearch.trim()) return invitations
    const q = invitationSearch.toLowerCase().trim()
    return invitations.filter((i) =>
      (i.title && i.title.toLowerCase().includes(q)) ||
      (i.slug && i.slug.toLowerCase().includes(q)) ||
      (i.id && i.id.toLowerCase().includes(q)) ||
      (i.hostNames && i.hostNames.toLowerCase().includes(q)) ||
      (i.groom && i.groom.toLowerCase().includes(q)) ||
      (i.bride && i.bride.toLowerCase().includes(q)) ||
      (i.venue && i.venue.toLowerCase().includes(q)) ||
      (i.city && i.city.toLowerCase().includes(q)) ||
      (i.rsvpPhone && i.rsvpPhone.toLowerCase().includes(q))
    )
  }, [invitations, invitationSearch])

  const paginatedInvitations = useMemo(() => {
    const start = (pageInvitations - 1) * pageSizeInvitations
    return filteredInvitations.slice(start, start + pageSizeInvitations)
  }, [filteredInvitations, pageInvitations, pageSizeInvitations])

  // Filtered & Paginated Wishes
  const filteredWishes = useMemo(() => {
    if (!wishSearch.trim()) return wishes
    const q = wishSearch.toLowerCase().trim()
    return wishes.filter((w) =>
      (w.senderName && w.senderName.toLowerCase().includes(q)) ||
      (w.recipientName && w.recipientName.toLowerCase().includes(q)) ||
      (w.slug && w.slug.toLowerCase().includes(q)) ||
      (w.id && w.id.toLowerCase().includes(q)) ||
      (w.occasionId && w.occasionId.toLowerCase().includes(q)) ||
      (w.message && w.message.toLowerCase().includes(q)) ||
      (w.relation && w.relation.toLowerCase().includes(q))
    )
  }, [wishes, wishSearch])

  const paginatedWishes = useMemo(() => {
    const start = (pageWishes - 1) * pageSizeWishes
    return filteredWishes.slice(start, start + pageSizeWishes)
  }, [filteredWishes, pageWishes, pageSizeWishes])

  // Filtered & Paginated Visiting Cards
  const filteredVisitingCards = useMemo(() => {
    if (!vcSearch.trim()) return visitingCards || []
    const q = vcSearch.toLowerCase().trim()
    return (visitingCards || []).filter((vc) =>
      (vc.fullName && vc.fullName.toLowerCase().includes(q)) ||
      (vc.title && vc.title.toLowerCase().includes(q)) ||
      (vc.company && vc.company.toLowerCase().includes(q)) ||
      (vc.slug && vc.slug.toLowerCase().includes(q)) ||
      (vc.id && vc.id.toLowerCase().includes(q)) ||
      (vc.email && vc.email.toLowerCase().includes(q)) ||
      (vc.phone && vc.phone.toLowerCase().includes(q)) ||
      (vc.address && vc.address.toLowerCase().includes(q))
    )
  }, [visitingCards, vcSearch])

  const paginatedVisitingCards = useMemo(() => {
    const start = (pageVisitingCards - 1) * pageSizeVisitingCards
    return filteredVisitingCards.slice(start, start + pageSizeVisitingCards)
  }, [filteredVisitingCards, pageVisitingCards, pageSizeVisitingCards])

  // Filtered & Paginated Magic Links
  const filteredMagicLinks = useMemo(() => {
    if (!magicSearch.trim()) return magicLinks
    const q = magicSearch.toLowerCase().trim()
    return magicLinks.filter((m) =>
      (m.recipientName && m.recipientName.toLowerCase().includes(q)) ||
      (m.senderName && m.senderName.toLowerCase().includes(q)) ||
      (m.slug && m.slug.toLowerCase().includes(q)) ||
      (m.id && m.id.toLowerCase().includes(q)) ||
      (m.occasion && m.occasion.toLowerCase().includes(q)) ||
      (m.theme && m.theme.toLowerCase().includes(q))
    )
  }, [magicLinks, magicSearch])

  const paginatedMagicLinks = useMemo(() => {
    const start = (pageMagicLinks - 1) * pageSizeMagicLinks
    return filteredMagicLinks.slice(start, start + pageSizeMagicLinks)
  }, [filteredMagicLinks, pageMagicLinks, pageSizeMagicLinks])

  // Paginated Guestbook Wishes
  const paginatedGuestbookWishes = useMemo(() => {
    const start = (pageGuestbook - 1) * pageSizeGuestbook
    return filteredGuestbookWishes.slice(start, start + pageSizeGuestbook)
  }, [filteredGuestbookWishes, pageGuestbook, pageSizeGuestbook])

  // Filtered & Paginated RSVPs
  const filteredRsvpsWithSearch = useMemo(() => {
    let list = filteredRsvps
    if (rsvpSearch.trim()) {
      const q = rsvpSearch.toLowerCase().trim()
      list = list.filter((r) =>
        (r.guestName && r.guestName.toLowerCase().includes(q)) ||
        (r.phone && r.phone.toLowerCase().includes(q)) ||
        (r.note && r.note.toLowerCase().includes(q)) ||
        (r.invitationSlug && r.invitationSlug.toLowerCase().includes(q))
      )
    }
    return list
  }, [filteredRsvps, rsvpSearch])

  const paginatedRsvps = useMemo(() => {
    const start = (pageRsvps - 1) * pageSizeRsvps
    return filteredRsvpsWithSearch.slice(start, start + pageSizeRsvps)
  }, [filteredRsvpsWithSearch, pageRsvps, pageSizeRsvps])

  // Paginated Active Sessions
  const activeSessionsList = groupByDevice ? groupedSessions : allSessions
  const paginatedSessionsList = useMemo(() => {
    const start = (pageLiveUsers - 1) * pageSizeLiveUsers
    return activeSessionsList.slice(start, start + pageSizeLiveUsers)
  }, [activeSessionsList, pageLiveUsers, pageSizeLiveUsers])

  // Paginated Live Poetry Engagements Activity
  const paginatedPoetryActivity = useMemo(() => {
    const start = (pagePoetryEvents - 1) * pageSizePoetryEvents
    return firestorePoetryActivity.slice(start, start + pageSizePoetryEvents)
  }, [firestorePoetryActivity, pagePoetryEvents, pageSizePoetryEvents])

  const handleUpdateUserPlan = async (uid: string, plan: Plan) => {
    await adminUpdateUserPlan(uid, plan, selectedDurationDays)
    showToast(`Updated user plan to ${plan.toUpperCase()} for ${selectedDurationDays} days!`, 'success')
  }

  // ── Geolocation and Country Aggregation ──────────────────────────────────
  const geoCountryStats = useMemo(() => {
    const counts: Record<string, { country: string; flag: string; count: number }> = {}

    const track = (origin: OriginInfo) => {
      const c = origin.country || 'Global / Online'
      if (!counts[c]) {
        counts[c] = { country: c, flag: origin.flag || '🌐', count: 0 }
      }
      counts[c].count++
    }

    allUsersList.forEach((u) => track(inferOrigin(u)))
    invitations.forEach((inv) =>
      track(
        inferOrigin({
          country: inv.country,
          countryCode: inv.countryCode,
          city: inv.cityOrigin || inv.city,
          createdLocation: inv.createdLocation,
          phone: inv.rsvpPhone,
          venue: inv.venue,
        })
      )
    )
    wishes.forEach((w) =>
      track(
        inferOrigin({
          country: w.country,
          countryCode: w.countryCode,
          city: w.city,
          createdLocation: w.createdLocation,
        })
      )
    )
    visitingCards.forEach((vc) =>
      track(
        inferOrigin({
          country: vc.country,
          countryCode: vc.countryCode,
          city: vc.city,
          createdLocation: vc.createdLocation,
          phone: vc.phone,
        })
      )
    )

    return Object.values(counts).sort((a, b) => b.count - a.count)
  }, [allUsersList, invitations, wishes, visitingCards])

  // ── Recent Real-Time Activity Feed ───────────────────────────────────────
  const recentActivities = useMemo(() => {
    interface ActivityItem {
      type: 'user' | 'invitation' | 'wish' | 'visiting_card' | 'magic_link'
      typeLabel: string
      title: string
      subtitle: string
      time: number
      origin: OriginInfo
      link?: string
    }

    const items: ActivityItem[] = []

    allUsersList.forEach((u) => {
      if (u.createdAt) {
        items.push({
          type: 'user',
          typeLabel: 'User Signup',
          title: u.name || 'New User',
          subtitle: `${u.email} • Plan: ${u.plan.toUpperCase()}`,
          time: u.createdAt,
          origin: inferOrigin(u),
        })
      }
    })

    invitations.forEach((inv) => {
      if (inv.createdAt) {
        items.push({
          type: 'invitation',
          typeLabel: 'Invitation Created',
          title: inv.title || 'Event Invitation',
          subtitle: `By ${inv.hostNames || 'Host'} • ${inv.city || inv.venue || 'Event'}`,
          time: inv.createdAt,
          origin: inferOrigin({
            country: inv.country,
            countryCode: inv.countryCode,
            city: inv.cityOrigin || inv.city,
            createdLocation: inv.createdLocation,
            phone: inv.rsvpPhone,
            venue: inv.venue,
          }),
          link: `/i/${(inv.slug || inv.id)}`,
        })
      }
    })

    wishes.forEach((w) => {
      if (w.createdAt) {
        items.push({
          type: 'wish',
          typeLabel: 'Wish Card Created',
          title: `${w.senderName || 'Sender'} → ${w.recipientName || 'Recipient'}`,
          subtitle: `Occasion: ${w.occasionId} • "${(w.message || '').slice(0, 45)}..."`,
          time: w.createdAt,
          origin: inferOrigin({
            country: w.country,
            countryCode: w.countryCode,
            city: w.city,
            createdLocation: w.createdLocation,
          }),
          link: `/w/${(w.slug || w.id)}`,
        })
      }
    })

    visitingCards.forEach((vc) => {
      if (vc.createdAt) {
        items.push({
          type: 'visiting_card',
          typeLabel: 'Visiting Card',
          title: vc.fullName || 'Digital Card',
          subtitle: `${vc.title || 'Professional'} • ${vc.company || 'Company'}`,
          time: vc.createdAt,
          origin: inferOrigin({
            country: vc.country,
            countryCode: vc.countryCode,
            city: vc.city,
            createdLocation: vc.createdLocation,
            phone: vc.phone,
          }),
          link: `/v/${(vc.slug || vc.id)}`,
        })
      }
    })

    magicLinks.forEach((m) => {
      const createdAt = typeof m.createdAt === 'number' ? m.createdAt : m.createdAt?.toMillis ? m.createdAt.toMillis() : (m.createdAt as any)?.seconds ? (m.createdAt as any).seconds * 1000 : 0
      if (createdAt) {
        items.push({
          type: 'magic_link',
          typeLabel: 'Magic Link',
          title: `${m.senderName || 'Sender'} → ${m.recipientName || 'Recipient'}`,
          subtitle: `Type: ${m.type || 'magic'} • Occasion: ${m.occasion || 'event'}`,
          time: createdAt,
          origin: inferOrigin({}),
          link: `/m/${(m.slug || m.id)}`,
        })
      }
    })

    return items.sort((a, b) => (b.time || 0) - (a.time || 0))
  }, [allUsersList, invitations, wishes, visitingCards, magicLinks])

  // 🔒 Render Admin Login Lock Gate if not authorized
  if (!mounted) return null

  if (!isAdminAuthorized) {
    return (
      <div className="flex items-center justify-center p-4 py-16 min-h-[60vh]">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-2xl space-y-6 text-left">
          <div className="text-center space-y-2">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 shadow-inner">
              <Lock className="size-7 text-indigo-600 animate-pulse" />
            </div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Admin Security Portal</h1>
            <p className="text-xs text-muted-foreground">
              Enter authorized admin email or master passcode to access system administration.
            </p>
          </div>

          {adminError && (
            <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs font-semibold text-red-600 flex items-center gap-2">
              <AlertCircle className="size-4 shrink-0 text-red-600" />
              <span>{adminError}</span>
            </div>
          )}

          <form noValidate onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Input
                  type="email"
                  required
                  placeholder="e.g. cardzyonline@gmail.com"
                  value={adminEmailInput}
                  onChange={(e) => setAdminEmailInput(e.target.value)}
                  className="rounded-2xl pl-3 pr-3"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Admin Master Passcode / Secret
              </label>
              <div className="relative">
                <Input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  className="rounded-2xl pl-3 pr-3"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl py-3 shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Key className="size-4" /> Unlock Admin Hub
            </Button>
          </form>

          <p className="text-[11px] text-muted-foreground text-center">
            Restricted Area • Unauthorized access attempts are monitored.
          </p>
        </div>
      </div>
    )
  }

  function printPdfReport(title: string, subtitle: string, summaryItems: { label: string; value: string }[], headers: string[], rowsHtml: string) {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cardzy — ${title}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 35px; color: #0f172a; background: #fff; line-height: 1.5; }
            .header { border-bottom: 3px solid #7A1E2B; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: flex-end; }
            .brand { font-size: 26px; font-weight: 900; color: #7A1E2B; letter-spacing: -0.5px; }
            .sub-brand { font-size: 14px; font-weight: 700; color: #334155; margin-top: 4px; }
            .meta { font-size: 12px; color: #64748b; text-align: right; }
            .summary { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 15px; margin-bottom: 25px; display: flex; flex-wrap: wrap; gap: 30px; font-size: 13px; }
            .summary-item { font-size: 12px; color: #475569; }
            .summary-item strong { color: #7A1E2B; font-size: 15px; display: block; margin-top: 2px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
            th { background-color: #7A1E2B; color: #ffffff; font-weight: 700; text-align: left; padding: 10px 12px; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; }
            td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
            tr:nth-child(even) { background-color: #f8fafc; }
            .footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #94a3b8; }
            @media print {
              body { padding: 0; }
              @page { margin: 1.5cm; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="brand">Cardzy.online</div>
              <div class="sub-brand">${title} — ${subtitle}</div>
            </div>
            <div class="meta">
              <div><strong>Generated:</strong> ${new Date().toLocaleString()}</div>
              <div><strong>Document:</strong> Official PDF Audit Report</div>
            </div>
          </div>

          <div class="summary">
            ${summaryItems.map((s) => `<div class="summary-item">${s.label}: <strong>${s.value}</strong></div>`).join('')}
          </div>

          <table>
            <thead>
              <tr>
                ${headers.map((h) => `<th>${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          <div class="footer">
            Cardzy.online • Digital Wishes & Event Invitations Portal • Confidential System Report
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() { window.print(); }, 400);
            }
          </script>
        </body>
      </html>
    `

    printWindow.document.write(html)
    printWindow.document.close()
  }

  function handleDownloadInvitationsPdf() {
    const rowsHtml = invitations.length === 0
      ? `<tr><td colspan="8" style="text-align:center; padding: 25px; color: #64748b;">No active invitations recorded.</td></tr>`
      : invitations.map((i, idx) => {
          const origin = inferOrigin({
            country: i.country,
            countryCode: i.countryCode,
            city: i.cityOrigin || i.city,
            createdLocation: i.createdLocation,
            phone: i.rsvpPhone,
            venue: i.venue,
          })
          return `
          <tr>
            <td>${idx + 1}</td>
            <td><strong>${i.title || 'Invitation'}</strong><br/><span style="font-size: 11px; color: #64748b;">${i.groom || ''} & ${i.bride || ''}</span></td>
            <td><strong>${i.hostNames || 'Host'}</strong><br/><span style="font-size: 11px; color: #64748b;">ID: ${i.creatorId}</span></td>
            <td><span style="padding: 2px 8px; border-radius: 10px; background: #e0e7ff; color: #3730a3; font-weight: 700; font-size: 10px;">${(i.typeId || 'event').toUpperCase()}</span></td>
            <td>${i.date || 'TBD'} ${i.time || ''}<br/><span style="font-size: 11px; color: #64748b;">${i.venue || i.city || '—'}</span></td>
            <td><strong>${formatDateTime(i.createdAt)}</strong><br/><span style="font-size: 11px; color: #059669;">${origin.flag} ${origin.locationText}</span></td>
            <td><strong>${i.rsvpPhone || '—'}</strong></td>
            <td><strong>${i.rsvpCount} RSVPs</strong><br/><span style="font-size: 11px; color: #64748b;">${i.viewCount || 1} views</span></td>
          </tr>
        `}).join('')

    printPdfReport(
      'Active Invitations Database Report',
      'Event & Wedding Cards Audit',
      [
        { label: 'Total Active Invitations', value: `${invitations.length} Cards` },
        { label: 'Total RSVPs Received', value: `${invitations.reduce((a, b) => a + (b.rsvpCount || 0), 0)} Responses` },
      ],
      ['#', 'Event & Couple', 'Host / Creator', 'Category', 'Date & Venue', 'Created When & Where', 'RSVP Contact', 'Stats'],
      rowsHtml
    )
  }

  function handleDownloadWishesPdf() {
    const rowsHtml = wishes.length === 0
      ? `<tr><td colspan="7" style="text-align:center; padding: 25px; color: #64748b;">No wish cards recorded.</td></tr>`
      : wishes.map((w, idx) => {
          const origin = inferOrigin({
            country: w.country,
            countryCode: w.countryCode,
            city: w.city,
            createdLocation: w.createdLocation,
          })
          return `
          <tr>
            <td>${idx + 1}</td>
            <td><strong>${w.senderName || 'Well Wisher'}</strong></td>
            <td><strong>${w.recipientName || 'Friend'}</strong><br/><span style="font-size: 11px; color: #64748b;">Relation: ${w.relation || '—'}</span></td>
            <td><span style="padding: 2px 8px; border-radius: 10px; background: #fef3c7; color: #92400e; font-weight: 700; font-size: 10px;">${(w.occasionId || 'wish').toUpperCase()}</span></td>
            <td><strong>${formatDateTime(w.createdAt)}</strong><br/><span style="font-size: 11px; color: #d97706;">${origin.flag} ${origin.locationText}</span></td>
            <td style="max-width: 250px; font-size: 11px; color: #475569;">${w.message}</td>
            <td><strong>${w.viewCount} views</strong></td>
          </tr>
        `}).join('')

    printPdfReport(
      'Greeting Wishes & Cards Database Report',
      'Sent Wish Cards Audit',
      [
        { label: 'Total Wishes Created', value: `${wishes.length} Cards` },
        { label: 'Total Views Tracked', value: `${wishes.reduce((a, b) => a + (b.viewCount || 0), 0)} Views` },
      ],
      ['#', 'Sender (Who Sent)', 'Recipient (Who Received)', 'Occasion', 'Created When & Where', 'Wish Message Text', 'Views'],
      rowsHtml
    )
  }

  function handleDownloadUsersPdf() {
    const rowsHtml = allUsersList.length === 0
      ? `<tr><td colspan="7" style="text-align:center; padding: 25px; color: #64748b;">No registered users found.</td></tr>`
      : allUsersList.map((u, idx) => {
          const now = Date.now()
          const isExpired = u.planExpiresAt ? now > u.planExpiresAt : false
          const origin = inferOrigin(u)
          return `
            <tr>
              <td>${idx + 1}</td>
              <td><strong>${u.name || 'Jashn User'}</strong><br/><span style="font-size: 11px; color: #64748b;">${u.email}</span></td>
              <td>${u.phone || 'N/A'}</td>
              <td><strong>${formatDateTime(u.createdAt)}</strong><br/><span style="font-size: 11px; color: #4f46e5;">${origin.flag} ${origin.locationText}</span></td>
              <td><span style="padding: 2px 8px; border-radius: 10px; font-weight: 700; font-size: 10px; ${u.plan === 'business' ? 'background: #f3e8ff; color: #6b21a8;' : u.plan === 'pro' ? 'background: #fef3c7; color: #92400e;' : 'background: #f1f5f9; color: #475569;'}">${u.plan.toUpperCase()}</span></td>
              <td>${u.planActivatedAt ? new Date(u.planActivatedAt).toLocaleDateString() : '—'}</td>
              <td>${isExpired ? '<strong style="color: #dc2626;">Expired</strong>' : u.planExpiresAt ? new Date(u.planExpiresAt).toLocaleDateString() : 'No Limit'}</td>
            </tr>
          `
        }).join('')

    printPdfReport(
      'Registered User Accounts & Subscriptions Report',
      'Account Level Audit',
      [
        { label: 'Total Registered Accounts', value: `${allUsersList.length} Users` },
        { label: 'Active Pro Accounts', value: `${stats.proCount} Users` },
        { label: 'Active Business Accounts', value: `${stats.bizCount} Users` },
      ],
      ['#', 'User Name & Email', 'Phone', 'Registered When & From', 'Subscription Plan', 'Activated Date', 'Plan Expiry Status'],
      rowsHtml
    )
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Secret Admin Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-2xl border border-indigo-500/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 text-xs font-semibold tracking-wider uppercase">
                  <ShieldCheck className="size-4 text-amber-400" /> Master Admin Data Control
                </div>
                {isFirebaseConfigured ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" /> Cloud Firestore Live
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-semibold">
                    <AlertTriangle className="size-3.5 text-amber-400" /> Local Storage Mode
                  </div>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Cardzy Management Hub
              </h1>
              <p className="text-slate-300 text-sm max-w-2xl">
                Generate printable PDF reports for all system databases (Guest RSVPs, Invitations, Wish Cards, and User Accounts).
                {lastSyncedAt && (
                  <span className="block text-xs text-slate-400 mt-1">
                    Last Cloud Sync: {new Date(lastSyncedAt).toLocaleTimeString()} • {firestoreInvitations.length} Cloud Invs • {firestoreWishes.length} Cloud Wishes • {firestoreUsers.length} Cloud Users
                  </span>
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                onClick={() => loadFirestoreAll()}
                disabled={isFirestoreLoading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-1.5 text-xs"
              >
                <RefreshCw className={cn("size-3.5", isFirestoreLoading && "animate-spin")} />
                {isFirestoreLoading ? 'Syncing...' : 'Sync Cloud Data'}
              </Button>
              <Button
                onClick={() => downloadAllGuestsPdf()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center gap-1.5 text-xs"
              >
                <Download className="size-4" /> Guest RSVPs (PDF)
              </Button>
              <Button
                onClick={handleDownloadInvitationsPdf}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-lg hover:shadow-sky-500/25 transition-all flex items-center gap-1.5 text-xs"
              >
                <FileText className="size-4" /> Invitations (PDF)
              </Button>
              <Button
                onClick={handleDownloadWishesPdf}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all flex items-center gap-1.5 text-xs"
              >
                <Sparkles className="size-4" /> Wishes (PDF)
              </Button>
              <Button
                onClick={handleDownloadUsersPdf}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all flex items-center gap-1.5 text-xs"
              >
                <Users className="size-4" /> Users (PDF)
              </Button>
              <Button
                onClick={handleAdminLock}
                variant="outline"
                className="border-slate-700 bg-slate-800/80 hover:bg-rose-950/50 hover:border-rose-500/50 text-slate-200 hover:text-rose-300 font-bold rounded-xl transition-all flex items-center gap-1.5 text-xs"
              >
                <Lock className="size-4 text-rose-400" /> Lock Session
              </Button>
            </div>
          </div>
        </div>

        {!isFirebaseConfigured ? (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200 flex items-start gap-3">
            <AlertTriangle className="size-5 shrink-0 text-amber-400 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-sm text-amber-100">Firebase Cloud Database Not Connected</p>
              <p className="text-amber-200/80 leading-relaxed">
                This deployment is missing the required Firebase environment variables (<code className="bg-amber-900/40 px-1.5 py-0.5 rounded text-amber-300 font-mono text-[11px]">NEXT_PUBLIC_FIREBASE_*</code>). Currently, you are viewing local browser data only. To see real-time submissions from all users across the published site, add these environment variables in your Vercel Project Settings and redeploy.
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div>
                <span className="font-bold text-xs text-emerald-100">
                  Firebase Cloud Database Connected: <code className="bg-emerald-950/60 px-1.5 py-0.5 rounded font-mono text-emerald-300 text-[11px]">jashn-app-e3888</code>
                </span>
                <span className="text-[11px] text-emerald-300/80 ml-2">
                  (Real-time live synchronization active)
                </span>
              </div>
            </div>
            {lastSyncedAt && (
              <span className="text-[10px] text-emerald-400 font-mono">
                Synced at {new Date(lastSyncedAt).toLocaleTimeString()}
              </span>
            )}
          </div>
        )}

        {firestoreError && isFirebaseConfigured && (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-200 flex items-start gap-3">
            <AlertCircle className="size-5 shrink-0 text-rose-400 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-sm text-rose-100">Firestore Sync Notice</p>
              <p className="text-rose-200/80 leading-relaxed">{firestoreError}</p>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard
            icon={<div className="relative flex items-center justify-center"><Activity className="size-5 text-emerald-500" /><span className="absolute -top-1 -right-1 flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span></span></div>}
            title="Live Online Now"
            value={liveActiveSessions.length}
            subtitle="Active right now"
            highlight={liveActiveSessions.length > 0}
          />
          <StatCard
            icon={<Users className="size-5 text-indigo-500" />}
            title="Total Accounts"
            value={stats.total}
            subtitle="Registered users"
          />
          <StatCard
            icon={<Sparkles className="size-5 text-amber-500" />}
            title="Active Pro Users"
            value={stats.proCount}
            subtitle="$4 / Rs 1,100 plan"
          />
          <StatCard
            icon={<Building2 className="size-5 text-purple-500" />}
            title="Active Business"
            value={stats.bizCount}
            subtitle="$18 / Rs 5,000 plan"
          />
          <StatCard
            icon={<AlertTriangle className="size-5 text-rose-500" />}
            title="Expired Accounts"
            value={stats.expiredCount}
            subtitle="Needs renewal"
          />
          <StatCard
            icon={<CreditCard className="size-5 text-emerald-500" />}
            title="Est. Revenue"
            value={`$${stats.estRevenueUsd}`}
            subtitle={`Rs ${stats.estRevenuePkr.toLocaleString()}`}
            highlight
          />
        </div>

        {/* ================= GLOBAL CARD SHARING CHANNELS ANALYTICS ================= */}
        <div className="p-5 rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card/90 to-card shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-500 shadow-2xs">
                <Share2 className="size-4" />
              </div>
              <div>
                <span className="text-base font-extrabold text-foreground block leading-tight">Global Card Sharing & Channel Engagement</span>
                <span className="text-xs text-muted-foreground">
                  Live engagement across SMS, WhatsApp, Clean URL Copy, Barcode / QR, Image PNG & Video MP4 Exports
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-xs font-mono border border-amber-500/20 self-start sm:self-auto">
              <Sparkles className="size-3 text-amber-500" />
              {totalAdminShares.total.toLocaleString()} Total Shares
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {/* 1. SMS */}
            <div className="group relative p-3.5 rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-card/50 border border-blue-500/20 hover:border-blue-500/40 hover:shadow-xs transition-all duration-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-muted-foreground">SMS Text</span>
                <span className="text-base">📱</span>
              </div>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono tracking-tight">
                {totalAdminShares.sms.toLocaleString()}
              </div>
            </div>

            {/* 2. WhatsApp */}
            <div className="group relative p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-card/50 border border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-xs transition-all duration-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-muted-foreground">WhatsApp</span>
                <span className="text-base">💬</span>
              </div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">
                {totalAdminShares.whatsapp.toLocaleString()}
              </div>
            </div>

            {/* 3. Link Copied */}
            <div className="group relative p-3.5 rounded-2xl bg-gradient-to-br from-zinc-500/10 via-zinc-500/5 to-card/50 border border-zinc-500/20 hover:border-zinc-500/40 hover:shadow-xs transition-all duration-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-muted-foreground">Link Copied</span>
                <span className="text-base">📋</span>
              </div>
              <div className="text-2xl font-black text-foreground font-mono tracking-tight">
                {totalAdminShares.copy.toLocaleString()}
              </div>
            </div>

            {/* 4. Barcode / QR */}
            <div className="group relative p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-card/50 border border-amber-500/20 hover:border-amber-500/40 hover:shadow-xs transition-all duration-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-muted-foreground">Barcode / QR</span>
                <span className="text-base">🔲</span>
              </div>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono tracking-tight">
                {totalAdminShares.qr.toLocaleString()}
              </div>
            </div>

            {/* 5. Image PNG */}
            <div className="group relative p-3.5 rounded-2xl bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-card/50 border border-purple-500/20 hover:border-purple-500/40 hover:shadow-xs transition-all duration-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-muted-foreground">Image PNG</span>
                <span className="text-base">🖼️</span>
              </div>
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono tracking-tight">
                {totalAdminShares.image.toLocaleString()}
              </div>
            </div>

            {/* 6. Video MP4 */}
            <div className="group relative p-3.5 rounded-2xl bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-card/50 border border-rose-500/20 hover:border-rose-500/40 hover:shadow-xs transition-all duration-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-muted-foreground">Video MP4</span>
                <span className="text-base">🎥</span>
              </div>
              <div className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono tracking-tight">
                {totalAdminShares.video.toLocaleString()}
              </div>
            </div>

            {/* 7. Apps Share */}
            <div className="group relative p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-card/50 border border-indigo-500/20 hover:border-indigo-500/40 hover:shadow-xs transition-all duration-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-muted-foreground">Apps Share</span>
                <span className="text-base">📲</span>
              </div>
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono tracking-tight">
                {totalAdminShares.app.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation Bar */}
        <div className="flex border-b border-border gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: `✨ All Database Overview`, icon: FileSpreadsheet },
            { id: 'poetry', label: `📜 Poetry Hub (${poetrySummary.totalInteractions.toLocaleString()})`, icon: Feather },
            { id: 'live_users', label: `🟢 Live Online (${liveActiveSessions.length})`, icon: Activity },
            { id: 'magic_links', label: `🪄 Magic Links (${magicLinks.length})`, icon: Sparkles },
            { id: 'guestbook', label: `💬 Wishes Wall (${allGuestbookWishes.length})`, icon: MessageCircle },
            { id: 'invitations', label: `Active Invitations (${invitations.length})`, icon: Calendar },
            { id: 'wishes', label: `Created Wishes (${wishes.length})`, icon: Sparkles },
            { id: 'visiting_cards', label: `Visiting Cards (${visitingCards?.length || 0})`, icon: CreditCard },
            { id: 'rsvps', label: `Recorded RSVPs (${rsvps?.length || 0})`, icon: FileSpreadsheet },
            { id: 'users', label: `User Accounts (${allUsersList.length})`, icon: Users },
            { id: 'push_notifications', label: `🔔 Push Notifications`, icon: Bell },
          ].map((tab) => {
            const IconComp = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setAdminSection(tab.id as any)}
                className={cn(
                  "px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 rounded-t-2xl",
                  adminSection === tab.id
                    ? "border-indigo-600 text-indigo-600 bg-indigo-500/5 shadow-sm"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
                )}
              >
                <IconComp className="size-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Real-Time Activity & Geolocation Radar (Shown in Overview tab) */}
        {adminSection === 'all' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Countries / Geolocation Summary */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Globe className="size-4 text-indigo-600" />
                  Origin & Geolocation
                </h3>
                <span className="text-[11px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  Real-time
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Distribution of where users register and cards are created across Cardzy.
              </p>

              {/* Country Badges / List */}
              <div className="space-y-2.5 pt-1">
                {geoCountryStats.length === 0 ? (
                  <div className="py-6 text-center text-xs text-muted-foreground">
                    No location data recorded yet.
                  </div>
                ) : (
                  geoCountryStats.slice(0, 6).map((item) => (
                    <div
                      key={item.country}
                      className="flex items-center justify-between p-2.5 rounded-2xl bg-muted/40 hover:bg-muted/60 transition-colors text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-lg leading-none shrink-0">{item.flag}</span>
                        <span className="font-semibold text-foreground truncate">{item.country}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                          {item.count}
                        </span>
                        <span className="text-[10px] text-muted-foreground">events</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Live Activity & Creation Stream */}
            <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Activity className="size-4 text-emerald-600 animate-pulse" />
                  Live Real-Time Activity & Creation Stream
                </h3>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Feed
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Chronological timeline of latest user registrations, event invitations, greeting wishes, magic links, and visiting cards.
              </p>

              <div className="divide-y divide-border/60">
                {recentActivities.length === 0 ? (
                  <div className="py-8 text-center text-xs text-muted-foreground">
                    No activity recorded yet.
                  </div>
                ) : (
                  recentActivities.slice(0, 15).map((act, i) => (
                    <div key={i} className="py-3 first:pt-1 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className={cn(
                          "size-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
                          act.type === 'user' ? 'bg-indigo-500/10 text-indigo-600' :
                          act.type === 'invitation' ? 'bg-emerald-500/10 text-emerald-600' :
                          act.type === 'wish' ? 'bg-amber-500/10 text-amber-600' :
                          act.type === 'magic_link' ? 'bg-pink-500/10 text-pink-600' :
                          'bg-purple-500/10 text-purple-600'
                        )}>
                          {act.type === 'user' ? <Users className="size-4" /> :
                           act.type === 'invitation' ? <Calendar className="size-4" /> :
                           act.type === 'wish' ? <Sparkles className="size-4" /> :
                           act.type === 'magic_link' ? <MousePointerClick className="size-4" /> :
                           <CreditCard className="size-4" />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-foreground">{act.title}</span>
                            <span className={cn(
                              "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase",
                              act.type === 'user' ? 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-400' :
                              act.type === 'invitation' ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400' :
                              act.type === 'wish' ? 'bg-amber-500/15 text-amber-800 dark:text-amber-400' :
                              act.type === 'magic_link' ? 'bg-pink-500/15 text-pink-700 dark:text-pink-400' :
                              'bg-purple-500/15 text-purple-700 dark:text-purple-400'
                            )}>
                              {act.typeLabel}
                            </span>
                          </div>
                          <div className="text-[11px] text-muted-foreground mt-0.5 truncate max-w-sm">
                            {act.subtitle}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 sm:text-right">
                        <div>
                          <div className="flex items-center sm:justify-end gap-1 font-semibold text-foreground">
                            <span>{act.origin.flag}</span>
                            <span className="truncate max-w-[150px]">{act.origin.locationText}</span>
                          </div>
                          <div className="text-[10px] text-muted-foreground flex items-center sm:justify-end gap-1 mt-0.5">
                            <Clock className="size-3 text-muted-foreground" />
                            <span>{formatDateTime(act.time)} • {formatRelativeTime(act.time) || 'Recently'}</span>
                          </div>
                        </div>

                        {act.link && (
                          <Link
                            href={act.link}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors shrink-0"
                            title="Open Link"
                          >
                            <ExternalLink className="size-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* 0. LIVE ACTIVE ONLINE VISITORS SECTION */}
        {(adminSection === 'all' || adminSection === 'live_users') && (
          <div className="bg-card border border-emerald-500/30 rounded-3xl shadow-xl overflow-hidden space-y-4">
            <div className="p-6 border-b border-border flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  Live Visitors & Device Activity ({liveActiveSessions.length} active • {groupedSessions.length} unique devices)
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Real-time heartbeat presence connected directly to Firebase Firestore. Shows devices and all their event history.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {/* View Mode Toggle */}
                <div className="inline-flex rounded-xl bg-muted/60 p-1 border border-border/80">
                  <button
                    type="button"
                    onClick={() => setGroupByDevice(true)}
                    className={cn(
                      "px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5",
                      groupByDevice ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Layers className="size-3.5" />
                    <span>Group by Device ({groupedSessions.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGroupByDevice(false)}
                    className={cn(
                      "px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5",
                      !groupByDevice ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Activity className="size-3.5" />
                    <span>Flat Events ({allSessions.length})</span>
                  </button>
                </div>

                {groupByDevice && groupedSessions.length > 0 && (
                  <button
                    type="button"
                    onClick={() => toggleExpandAllDevices(Object.keys(expandedDevices).length !== groupedSessions.length)}
                    className="px-3 py-1 rounded-xl text-xs font-bold bg-muted/80 hover:bg-muted text-foreground border border-border/80 transition-all flex items-center gap-1.5"
                  >
                    <span>{Object.keys(expandedDevices).length === groupedSessions.length ? 'Collapse All' : 'Expand All'}</span>
                  </button>
                )}

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-1.5">
                  <Activity className="size-3.5 animate-pulse" /> Live Pulse
                </span>
              </div>
            </div>

            <div className="p-6 pt-0">
              {allSessions.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground space-y-2">
                  <Activity className="size-8 mx-auto opacity-30 animate-pulse text-emerald-500" />
                  <p className="text-sm font-semibold">No other active visitors browsing right now.</p>
                  <p className="text-xs text-muted-foreground">When visitors open Cardzy in any tab or mobile browser, they appear here instantly.</p>
                </div>
              ) : (
                <div className="overflow-x-auto -mx-6 px-6 relative">
                  {selectedSessions.length > 0 && (
                    <div className="absolute top-0 left-6 right-6 bg-rose-500/10 border border-rose-500/20 rounded-t-xl p-2 flex items-center justify-between z-10 backdrop-blur-md">
                      <span className="text-xs font-bold text-rose-600 px-2">{selectedSessions.length} session records selected</span>
                      <button
                        onClick={async () => {
                          if (!confirm(`Delete ${selectedSessions.length} sessions?`)) return
                          const firestoreDb = getFirebaseDb()
                          if (firestoreDb) {
                            try {
                              const { deleteDoc, doc } = await import('firebase/firestore')
                              await Promise.all(selectedSessions.map(id => deleteDoc(doc(firestoreDb, 'active_sessions', id))))
                              setAllSessions(prev => prev.filter(s => !selectedSessions.includes(s.id)))
                              setSelectedSessions([])
                            } catch(e) {}
                          }
                        }}
                        className="px-3 py-1 bg-rose-600 text-white text-xs font-bold rounded-lg hover:bg-rose-700 transition-colors flex items-center gap-2"
                      >
                        <Trash2 className="size-3.5" /> Delete Selected
                      </button>
                    </div>
                  )}

                  {groupByDevice ? (
                    /* ── GROUPED BY DEVICE VIEW ──────────────────────────────── */
                    <table className="w-full text-sm text-left border-collapse">
                      <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
                        <tr>
                          <th className="px-4 py-3 rounded-l-xl w-[40px]">
                            <input 
                              type="checkbox" 
                              className="rounded border-border accent-emerald-500"
                              checked={allSessions.length > 0 && selectedSessions.length === allSessions.length}
                              onChange={(e) => {
                                if (e.target.checked) setSelectedSessions(allSessions.map(s => s.id))
                                else setSelectedSessions([])
                              }}
                            />
                          </th>
                          <th className="px-4 py-3">Device / User</th>
                          <th className="px-4 py-3">Latest Active Flow & Events</th>
                          <th className="px-4 py-3">Hardware & OS</th>
                          <th className="px-4 py-3">Location & IP</th>
                          <th className="px-4 py-3">Last Heartbeat</th>
                          <th className="px-4 py-3 rounded-r-xl text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {paginatedSessionsList.map((group: any) => {
                          const isExpanded = !!expandedDevices[group.deviceKey]
                          const groupSessionIds = group.sessions.map((s: any) => s.id)
                          const isAllGroupSelected = groupSessionIds.every((id: string) => selectedSessions.includes(id))
                          const secondsAgo = Math.max(0, Math.round((Date.now() - (group.latestLastSeen || Date.now())) / 1000))
                          const isGroupActive = group.isActive && secondsAgo <= 65

                          return (
                            <React.Fragment key={group.deviceKey}>
                              <tr 
                                className={cn(
                                  "hover:bg-muted/25 transition-colors group cursor-pointer",
                                  !isGroupActive && "opacity-65",
                                  isAllGroupSelected && "bg-rose-500/5 hover:bg-rose-500/10",
                                  isExpanded && "bg-muted/15"
                                )}
                                onClick={(e) => {
                                  // Don't toggle expand if clicking checkbox, link, or button
                                  const target = e.target as HTMLElement
                                  if (target.closest('input') || target.closest('a') || target.closest('button')) return
                                  toggleExpandDevice(group.deviceKey)
                                }}
                              >
                                <td className="px-4 py-3.5">
                                  <input 
                                    type="checkbox" 
                                    className="rounded border-border accent-emerald-500 cursor-pointer"
                                    checked={isAllGroupSelected}
                                    onChange={(e) => {
                                      e.stopPropagation()
                                      if (e.target.checked) {
                                        setSelectedSessions(prev => Array.from(new Set([...prev, ...groupSessionIds])))
                                      } else {
                                        setSelectedSessions(prev => prev.filter(id => !groupSessionIds.includes(id)))
                                      }
                                    }}
                                  />
                                </td>
                                <td className="px-4 py-3.5">
                                  <div className="flex items-center gap-2.5">
                                    {isGroupActive ? (
                                      <span className="relative flex h-2.5 w-2.5 shrink-0">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                      </span>
                                    ) : (
                                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-muted-foreground shrink-0"></span>
                                    )}
                                    <div>
                                      <div className="font-bold text-foreground flex items-center gap-1.5 flex-wrap">
                                        <span>{group.userName || 'Guest Visitor'}</span>
                                        {group.userId && (
                                          <span className="text-[10px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded font-bold border border-indigo-500/20">Member</span>
                                        )}
                                      </div>
                                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                                        <span>{group.userEmail || 'Guest'}</span>
                                        {group.deviceId && (
                                          <span className="text-[9px] font-mono text-muted-foreground/70 bg-muted/60 px-1 rounded">
                                            {group.deviceId.slice(0, 10)}...
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3.5">
                                  <div className="space-y-1">
                                    <div className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                                      <Link href={group.latestPage || '/'} target="_blank" className="hover:underline flex items-center gap-1">
                                        <span className="truncate max-w-[180px]">{group.latestPage || '/'}</span>
                                        <ExternalLink className="size-3 opacity-60 shrink-0" />
                                      </Link>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          toggleExpandDevice(group.deviceKey)
                                        }}
                                        className={cn(
                                          "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold transition-all border shadow-2xs cursor-pointer",
                                          group.sessions.length > 1
                                            ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                                            : "bg-muted/80 text-muted-foreground border-border/80 hover:bg-muted"
                                        )}
                                      >
                                        <Sparkles className="size-2.5" />
                                        <span>{group.sessions.length} recorded {group.sessions.length === 1 ? 'event' : 'events'}</span>
                                        {group.uniquePages.length > 1 && (
                                          <span className="opacity-75">({group.uniquePages.length} unique pages)</span>
                                        )}
                                        {isExpanded ? <ChevronDown className="size-3 ml-0.5" /> : <ChevronRight className="size-3 ml-0.5" />}
                                      </button>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3.5 text-xs">
                                  <span className={cn(
                                    "px-2 py-1 rounded-lg font-semibold inline-flex items-center gap-1",
                                    group.device?.includes('Mobile') ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20" : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                                  )}>
                                    {group.device?.includes('Mobile') ? <Smartphone className="size-3.5" /> : <Monitor className="size-3.5" />}
                                    {group.device || 'Desktop'}
                                  </span>
                                </td>
                                <td className="px-4 py-3.5 text-xs text-muted-foreground">
                                  {(() => {
                                    const sOrigin = inferOrigin({
                                      country: group.country,
                                      countryCode: group.countryCode,
                                      city: group.city,
                                      region: group.region,
                                      createdLocation: group.location,
                                      device: group.device,
                                      ip: group.ip,
                                    })
                                    return (
                                      <div>
                                        <div className="font-medium text-foreground flex items-center gap-1.5">
                                          <span className="text-sm">{sOrigin.flag}</span>
                                          <span className="truncate max-w-[140px]">{sOrigin.locationText}</span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground/80 mt-0.5">
                                          <span>Lang: {group.language || 'en'}</span>
                                          {group.ip && group.ip !== '127.0.0.1' && (
                                            <span className="font-mono bg-muted/60 px-1 rounded text-[9px]">IP: {group.ip}</span>
                                          )}
                                        </div>
                                      </div>
                                    )
                                  })()}
                                </td>
                                <td className={cn("px-4 py-3.5 text-xs font-bold whitespace-nowrap", isGroupActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground")}>
                                  {isGroupActive ? (secondsAgo <= 5 ? 'Just now (live)' : `${secondsAgo}s ago`) : (
                                    <div className="flex flex-col gap-0.5">
                                      <span>Offline</span>
                                      {group.latestLastSeen && (
                                        <span className="text-[10px] font-normal opacity-70">
                                          {new Date(group.latestLastSeen).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </td>
                                <td className="px-4 py-3.5 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        toggleExpandDevice(group.deviceKey)
                                      }}
                                      className="px-2.5 py-1 rounded-lg bg-muted hover:bg-muted/80 text-foreground text-xs font-bold transition-colors inline-flex items-center gap-1 shadow-2xs cursor-pointer"
                                      title="Toggle Event History"
                                    >
                                      <span>{isExpanded ? 'Hide' : 'Expand'}</span>
                                      {isExpanded ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
                                    </button>

                                    <button
                                      type="button"
                                      onClick={async (e) => {
                                        e.stopPropagation()
                                        if (!confirm(`Delete all ${group.sessions.length} session records for this device?`)) return
                                        const firestoreDb = getFirebaseDb()
                                        if (firestoreDb) {
                                          try {
                                            const { deleteDoc, doc } = await import('firebase/firestore')
                                            await Promise.all(group.sessions.map((s: any) => deleteDoc(doc(firestoreDb, 'active_sessions', s.id))))
                                            setAllSessions(prev => prev.filter((s: any) => !groupSessionIds.includes(s.id)))
                                          } catch(e) {}
                                        }
                                      }}
                                      className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 transition-colors inline-flex cursor-pointer"
                                      title="Delete Device & All Events"
                                    >
                                      <Trash2 className="size-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>

                              {/* ── EXPANDABLE NESTED EVENTS / PAGES ACCORDION ─────────────── */}
                              {isExpanded && (
                                <tr key={`${group.deviceKey}-expanded`} className="bg-muted/20 border-b border-border/60">
                                  <td colSpan={7} className="p-4 sm:p-5">
                                    <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm space-y-3">
                                      <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
                                        <div className="flex items-center gap-2">
                                          <Sparkles className="size-4 text-amber-500" />
                                          <h4 className="text-xs font-extrabold uppercase tracking-wider text-foreground">
                                            Device Event History & Open Tabs ({group.sessions.length} total events • {group.uniquePages.length} unique URLs)
                                          </h4>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground font-mono">
                                          Device: {group.device} • {group.country || 'Pakistan'}
                                        </span>
                                      </div>

                                      <div className="divide-y divide-border/40">
                                        {group.sessions.map((sess: any, sIdx: number) => {
                                          const sessSecAgo = Math.max(0, Math.round((Date.now() - (sess.lastSeen || Date.now())) / 1000))
                                          const isSessActive = (sess.lastSeen || 0) >= (Date.now() - 65000)

                                          return (
                                            <div key={sess.id || sIdx} className="py-2.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                                              <div className="flex items-start gap-2.5 min-w-0">
                                                <div className="mt-0.5">
                                                  {isSessActive ? (
                                                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse block" />
                                                  ) : (
                                                    <span className="size-2 rounded-full bg-muted-foreground/60 block" />
                                                  )}
                                                </div>
                                                <div className="min-w-0 space-y-0.5">
                                                  <div className="flex items-center gap-2 flex-wrap">
                                                    <Link 
                                                      href={sess.page || '/'} 
                                                      target="_blank"
                                                      className="font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                                                    >
                                                      <span>{sess.page || '/'}</span>
                                                      <ExternalLink className="size-3 opacity-60 shrink-0" />
                                                    </Link>
                                                    {sess.title && (
                                                      <span className="text-[11px] text-muted-foreground truncate max-w-xs font-medium">
                                                        "{sess.title}"
                                                      </span>
                                                    )}
                                                  </div>
                                                  <div className="text-[10px] text-muted-foreground flex items-center gap-2 font-mono">
                                                    <span>Ref: {sess.referrer || 'Direct'}</span>
                                                    <span>•</span>
                                                    <span>ID: {sess.sessionId || sess.id}</span>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="flex items-center gap-3 shrink-0 sm:text-right">
                                                <div className="text-[11px]">
                                                  <div className={cn("font-bold", isSessActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground")}>
                                                    {isSessActive ? (sessSecAgo <= 5 ? 'Active now' : `${sessSecAgo}s ago`) : 'Offline'}
                                                  </div>
                                                  {sess.lastSeen && (
                                                    <div className="text-[10px] text-muted-foreground">
                                                      {new Date(sess.lastSeen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                                    </div>
                                                  )}
                                                </div>

                                                <button
                                                  type="button"
                                                  onClick={async () => {
                                                    const firestoreDb = getFirebaseDb()
                                                    if (firestoreDb) {
                                                      try {
                                                        const { deleteDoc, doc } = await import('firebase/firestore')
                                                        await deleteDoc(doc(firestoreDb, 'active_sessions', sess.id))
                                                        setAllSessions(prev => prev.filter((s: any) => s.id !== sess.id))
                                                      } catch(e) {}
                                                    }
                                                  }}
                                                  className="p-1 rounded-md text-rose-500 hover:bg-rose-500/10 transition-colors"
                                                  title="Delete this event record"
                                                >
                                                  <Trash2 className="size-3.5" />
                                                </button>
                                              </div>
                                            </div>
                                          )
                                        })}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          )
                        })}
                      </tbody>
                    </table>
                  ) : (
                    /* ── FLAT EVENTS VIEW ─────────────────────────────────────── */
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
                        <tr>
                          <th className="px-4 py-3 rounded-l-xl w-[40px]">
                            <input 
                              type="checkbox" 
                              className="rounded border-border accent-emerald-500"
                              checked={allSessions.length > 0 && selectedSessions.length === allSessions.length}
                              onChange={(e) => {
                                if (e.target.checked) setSelectedSessions(allSessions.map((s: any) => s.id))
                                else setSelectedSessions([])
                              }}
                            />
                          </th>
                          <th className="px-4 py-3">User / Visitor</th>
                          <th className="px-4 py-3">Current Active Page</th>
                          <th className="px-4 py-3">Device</th>
                          <th className="px-4 py-3">Location / Timezone</th>
                          <th className="px-4 py-3">Referrer</th>
                          <th className="px-4 py-3">Last Heartbeat</th>
                          <th className="px-4 py-3 rounded-r-xl text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                        {paginatedSessionsList.map((session: any) => {
                          const secondsAgo = Math.max(0, Math.round((Date.now() - (session.lastSeen || Date.now())) / 1000))
                          const isActive = secondsAgo <= 65
                          
                          return (
                            <tr key={session.sessionId || session.id} className={cn("hover:bg-muted/20 transition-colors", !isActive && "opacity-60", selectedSessions.includes(session.id) && "bg-rose-500/5 hover:bg-rose-500/10")}>
                              <td className="px-4 py-3.5">
                                <input 
                                  type="checkbox" 
                                  className="rounded border-border accent-emerald-500"
                                  checked={selectedSessions.includes(session.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) setSelectedSessions(prev => [...prev, session.id])
                                    else setSelectedSessions(prev => prev.filter(id => id !== session.id))
                                  }}
                                />
                              </td>
                              <td className="px-4 py-3.5">
                                <div className="flex items-center gap-2.5">
                                  {isActive ? (
                                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                    </span>
                                  ) : (
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-muted-foreground shrink-0"></span>
                                  )}
                                  <div>
                                    <div className="font-bold text-foreground flex items-center gap-1.5">
                                      {session.userName || 'Guest Visitor'}
                                      {session.userId && (
                                        <span className="text-[10px] bg-indigo-500/10 text-indigo-600 px-1.5 py-0.5 rounded font-bold">Member</span>
                                      )}
                                    </div>
                                    <div className="text-xs text-muted-foreground">{session.userEmail || 'Guest'}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3.5 font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                                <Link href={session.page || '/'} target="_blank" className="hover:underline flex items-center gap-1">
                                  {session.page || '/'}
                                  <ExternalLink className="size-3 opacity-60" />
                                </Link>
                              </td>
                              <td className="px-4 py-3.5 text-xs">
                                <span className={cn(
                                  "px-2 py-1 rounded-lg font-semibold inline-flex items-center gap-1",
                                  session.device === 'Mobile' ? "bg-amber-500/10 text-amber-600" : "bg-blue-500/10 text-blue-600"
                                  )}>
                                  {session.device === 'Mobile' ? <Smartphone className="size-3.5" /> : <Monitor className="size-3.5" />}
                                  {session.device || 'Desktop'}
                                </span>
                              </td>
                              <td className="px-4 py-3.5 text-xs text-muted-foreground">
                                {(() => {
                                  const sOrigin = inferOrigin({
                                    country: session.country,
                                    countryCode: session.countryCode,
                                    city: session.city,
                                    region: session.region,
                                    createdLocation: session.location,
                                    device: session.device,
                                    ip: session.ip,
                                  })
                                  return (
                                    <div>
                                      <div className="font-medium text-foreground flex items-center gap-1.5">
                                        <span className="text-sm">{sOrigin.flag}</span>
                                        <span>{sOrigin.locationText}</span>
                                      </div>
                                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground/80 mt-0.5">
                                        <span>Lang: {session.language || 'en'}</span>
                                        {session.ip && session.ip !== '127.0.0.1' && (
                                          <span className="font-mono bg-muted/60 px-1 rounded text-[9px]">IP: {session.ip}</span>
                                        )}
                                      </div>
                                    </div>
                                  )
                                })()}
                              </td>
                              <td className="px-4 py-3.5 text-xs text-muted-foreground truncate max-w-[120px]">
                                {session.referrer === 'Direct' ? 'Direct URL' : session.referrer || 'Direct'}
                              </td>
                              <td className={cn("px-4 py-3.5 text-xs font-bold whitespace-nowrap", isActive ? "text-emerald-600" : "text-muted-foreground")}>
                                {isActive ? (secondsAgo <= 5 ? 'Just now (live)' : `${secondsAgo}s ago`) : (
                                  <div className="flex flex-col gap-0.5">
                                    <span>Offline</span>
                                    {session.lastSeen && (
                                      <span className="text-[10px] font-normal opacity-70">
                                        {new Date(session.lastSeen).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </td>
                              <td className="px-4 py-3.5 text-right">
                                <button
                                  onClick={async () => {
                                    if (!confirm('Delete this session record?')) return
                                    const firestoreDb = getFirebaseDb()
                                    if (firestoreDb) {
                                      try {
                                        const { deleteDoc, doc } = await import('firebase/firestore')
                                        await deleteDoc(doc(firestoreDb, 'active_sessions', session.id))
                                        setAllSessions(prev => prev.filter(s => s.id !== session.id))
                                      } catch(e) {}
                                    }
                                  }}
                                  className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 transition-colors inline-flex"
                                  title="Delete Session"
                                >
                                  <Trash2 className="size-4" />
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>

            <AdminTablePagination
              currentPage={pageLiveUsers}
              totalItems={activeSessionsList.length}
              pageSize={pageSizeLiveUsers}
              onPageChange={setPageLiveUsers}
              onPageSizeChange={setPageSizeLiveUsers}
              itemName={groupByDevice ? "device sessions" : "visitor sessions"}
            />
          </div>
        )}

        {/* ── POETRY LIVE EVENTS & ENGAGEMENT STREAM ── */}
        {(adminSection === 'all' || adminSection === 'poetry') && (
          <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden space-y-6">
            <div className="p-6 border-b border-border space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-bold uppercase tracking-wider">
                    <Activity className="size-3.5 animate-pulse" /> Live Poetry Events & Engagements
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-foreground flex items-center gap-2">
                    Poetry Interactions & Real-Time Events
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl">
                    Live stream of user interactions: WhatsApp shares, verse text copies, 1080p story flyer downloads, and card creations.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  <Link
                    href="/poetry"
                    target="_blank"
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <BookOpen className="size-3.5" />
                    <span>Open Poetry Explorer (1,000 Verses)</span>
                    <ExternalLink className="size-3 opacity-75" />
                  </Link>
                </div>
              </div>

              {/* 5 Top Metric Stat Boxes */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-card border border-amber-500/20">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-1">
                    <span>Poetry Views</span>
                    <Eye className="size-4 text-amber-500" />
                  </div>
                  <div className="text-2xl font-black text-amber-500 font-mono">
                    {poetrySummary.totalViews.toLocaleString()}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-card border border-emerald-500/20">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-1">
                    <span>WhatsApp Shares</span>
                    <Share2 className="size-4 text-emerald-500" />
                  </div>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {poetrySummary.totalShares.toLocaleString()}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-card border border-blue-500/20">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-1">
                    <span>Verses Copied</span>
                    <FileText className="size-4 text-blue-500" />
                  </div>
                  <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">
                    {poetrySummary.totalCopies.toLocaleString()}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-card border border-purple-500/20">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-1">
                    <span>Flyer Downloads</span>
                    <Download className="size-4 text-purple-500" />
                  </div>
                  <div className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">
                    {poetrySummary.totalFlyers.toLocaleString()}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-card border border-rose-500/20">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-1">
                    <span>Cards Created</span>
                    <Heart className="size-4 text-rose-500" />
                  </div>
                  <div className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono">
                    {poetrySummary.totalCardCreations.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Real-Time Poetry Activity Feed */}
            <div className="p-6 pt-0 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Activity className="size-4 text-emerald-500 animate-pulse" />
                  Recent Live User Engagements
                </h3>
                <span className="text-[11px] text-muted-foreground font-mono">
                  {firestorePoetryActivity.length > 0 ? `Showing latest ${firestorePoetryActivity.length} real-time events` : 'Listening for new events...'}
                </span>
              </div>

              {firestorePoetryActivity.length === 0 ? (
                <div className="py-12 text-center rounded-2xl bg-muted/20 border border-border/60">
                  <Feather className="size-8 text-amber-500/40 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-foreground">No recent poetry engagement events recorded yet.</p>
                  <p className="text-xs text-muted-foreground mt-1">Live events will appear in real time whenever users share, copy, or download story flyers.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {paginatedPoetryActivity.map((act: any, aIdx: number) => (
                    <div
                      key={act.id || aIdx}
                      className="p-4 rounded-2xl bg-card border border-border/80 flex flex-col justify-between gap-3 text-xs shadow-xs hover:border-amber-500/40 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-2.5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={cn(
                            "size-8 rounded-xl flex items-center justify-center text-sm font-bold shrink-0",
                            act.action === 'share' ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/20" :
                            act.action === 'copy' ? "bg-blue-500/15 text-blue-500 border border-blue-500/20" :
                            act.action === 'flyer' ? "bg-purple-500/15 text-purple-500 border border-purple-500/20" :
                            act.action === 'card_bridge' ? "bg-rose-500/15 text-rose-500 border border-rose-500/20" :
                            "bg-amber-500/15 text-amber-500 border border-amber-500/20"
                          )}>
                            {act.action === 'share' ? '💬' :
                             act.action === 'copy' ? '📋' :
                             act.action === 'flyer' ? '🖼️' :
                             act.action === 'card_bridge' ? '💌' : '👁️'}
                          </span>
                          <div className="min-w-0">
                            <div className="font-bold text-foreground truncate text-sm">
                              {act.title || act.poemId}
                            </div>
                            <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                              {act.poet && <span className="font-medium text-foreground/80">{act.poet}</span>}
                              <span>•</span>
                              <span className="capitalize font-semibold text-amber-500">{act.action.replace('_', ' ')}</span>
                            </div>
                          </div>
                        </div>

                        <span className="text-[10px] text-muted-foreground shrink-0 font-mono bg-muted/60 px-2 py-0.5 rounded-md">
                          {act.timestamp ? new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'just now'}
                        </span>
                      </div>

                      {/* Action buttons bar */}
                      <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleOpenFlyerPreview(act, e)}
                          className="px-2.5 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold text-[11px] border border-purple-500/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Eye className="size-3.5" />
                          <span>View Flyer & Verse</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              promptAdjustMetrics('poetry', { id: act.poemId, title: act.title, poemId: act.poemId })
                            }}
                            className="p-1.5 rounded-xl text-indigo-500 hover:text-indigo-600 hover:bg-indigo-500/10 border border-transparent hover:border-indigo-500/20 transition-all cursor-pointer"
                            title="Adjust metrics (likes, views, shares)"
                          >
                            <Sliders className="size-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleDeletePoetryActivity(act.id || act.docId, act.poemId, e)}
                            className="p-1.5 rounded-xl text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
                            title="Delete this poetry event log"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <AdminTablePagination
              currentPage={pagePoetryEvents}
              totalItems={firestorePoetryActivity.length}
              pageSize={pageSizePoetryEvents}
              onPageChange={setPagePoetryEvents}
              onPageSizeChange={setPageSizePoetryEvents}
              itemName="poetry events"
            />
          </div>
        )}

        {/* 1. USER ACCOUNTS SECTION */}
        {(adminSection === 'all' || adminSection === 'users') && (
          <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-border space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <UserCheck className="size-5 text-primary" /> User Accounts & Package Expiry Control
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Set package duration, upgrade user limits, or revoke expired packages so they can renew.
                  </p>
                </div>

                {/* Package Duration Selector */}
                <div className="flex items-center gap-2 text-xs bg-muted/60 p-1.5 rounded-2xl border border-border">
                  <span className="font-semibold text-muted-foreground px-2">Upgrade Duration:</span>
                  {[
                    { label: '30 Days', days: 30 },
                    { label: '90 Days', days: 90 },
                    { label: '1 Year', days: 365 },
                  ].map((d) => (
                    <button
                      key={d.days}
                      onClick={() => setSelectedDurationDays(d.days)}
                      className={cn(
                        'px-2.5 py-1 rounded-xl font-bold transition-all',
                        selectedDurationDays === d.days
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter and Search */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Search user name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 rounded-2xl bg-muted/30"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                  {[
                    { id: 'all', label: 'All Users' },
                    { id: 'free', label: 'Free' },
                    { id: 'pro', label: 'Pro' },
                    { id: 'business', label: 'Business' },
                    { id: 'expired', label: 'Expired' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setFilterPlan(tab.id as any)}
                      className={cn(
                        'px-3 py-1.5 rounded-2xl text-xs font-semibold transition-all',
                        filterPlan === tab.id
                          ? 'bg-foreground text-background font-extrabold shadow-sm'
                          : 'bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* User Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/40 border-b border-border text-xs uppercase font-semibold text-muted-foreground">
                  <tr>
                    <th className="py-3.5 px-4">User Details</th>
                    <th className="py-3.5 px-4">Registered When & From</th>
                    <th className="py-3.5 px-4">Current Package</th>
                    <th className="py-3.5 px-4">Activated Date</th>
                    <th className="py-3.5 px-4">Package Expiry</th>
                    <th className="py-3.5 px-4 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-muted-foreground">
                        No user accounts found matching your query.
                      </td>
                    </tr>
                  ) : (
                    paginatedUsers.map((u) => {
                      const now = Date.now()
                      const isExpired = u.planExpiresAt ? now > u.planExpiresAt : false
                      const daysLeft = u.planExpiresAt
                        ? Math.ceil((u.planExpiresAt - now) / (1000 * 60 * 60 * 24))
                        : null
                      const userOrigin = inferOrigin(u)

                      return (
                        <tr key={u.uid || u.email} className="hover:bg-muted/20 transition-colors">
                          <td className="py-4 px-4">
                            <div className="font-bold text-foreground">{u.name || 'Jashn User'}</div>
                            <div className="text-xs text-muted-foreground font-mono">{u.email}</div>
                            {u.phone && <div className="text-[11px] text-muted-foreground/80">{u.phone}</div>}
                          </td>

                          <td className="py-4 px-4 text-xs">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5">
                                <Clock className="size-3.5 text-indigo-500 shrink-0" />
                                <span className="font-bold text-foreground">
                                  {formatDateTime(u.createdAt)}
                                </span>
                                {u.createdAt ? (
                                  <span className="text-[10px] text-muted-foreground font-medium px-1.5 py-0.5 rounded bg-muted/60">
                                    {formatRelativeTime(u.createdAt)}
                                  </span>
                                ) : null}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-base shrink-0 leading-none">{userOrigin.flag}</span>
                                <span className="font-semibold text-foreground truncate max-w-[190px]">
                                  {userOrigin.locationText}
                                </span>
                              </div>
                              {(userOrigin.device || userOrigin.ip) && (
                                <div className="flex flex-wrap items-center gap-1 text-[10px]">
                                  {userOrigin.device && (
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-medium">
                                      {userOrigin.device.includes('Mobile') ? <Smartphone className="size-2.5" /> : <Monitor className="size-2.5" />}
                                      {userOrigin.device} {userOrigin.browser ? `• ${userOrigin.browser}` : ''}
                                    </span>
                                  )}
                                  {userOrigin.ip && userOrigin.ip !== '127.0.0.1' && (
                                    <span className="px-1.5 py-0.5 rounded bg-muted/70 text-muted-foreground font-mono">
                                      IP: {userOrigin.ip}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            {isExpired ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 border border-rose-500/20 text-xs font-bold">
                                <UserX className="size-3.5" /> Expired ({u.plan.toUpperCase()})
                              </span>
                            ) : u.plan === 'business' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 border border-purple-500/20 text-xs font-extrabold">
                                <Building2 className="size-3.5" /> Business Active
                              </span>
                            ) : u.plan === 'pro' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 border border-amber-500/20 text-xs font-bold">
                                <Sparkles className="size-3.5" /> Pro Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-500/10 text-slate-600 border border-slate-500/20 text-xs font-medium">
                                Free Plan
                              </span>
                            )}
                          </td>

                          <td className="py-4 px-4 text-xs text-muted-foreground">
                            {u.planActivatedAt ? (
                              <span className="flex items-center gap-1">
                                <Calendar className="size-3.5 text-muted-foreground" />
                                {formatDateStandard(u.planActivatedAt)}
                              </span>
                            ) : (
                              '—'
                            )}
                          </td>

                          <td className="py-4 px-4 text-xs">
                            {u.plan === 'free' ? (
                              <span className="text-muted-foreground">Lifetime Free</span>
                            ) : isExpired ? (
                              <span className="text-rose-600 font-bold flex items-center gap-1">
                                <Clock className="size-3.5" /> Expired {Math.abs(daysLeft || 0)} days ago
                              </span>
                            ) : u.planExpiresAt ? (
                              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                                <Clock className="size-3.5" /> {daysLeft} days remaining ({formatDateStandard(u.planExpiresAt)})
                              </span>
                            ) : (
                              <span className="text-emerald-600 font-bold">No Expiry Limit</span>
                            )}
                          </td>

                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateUserPlan(u.uid, 'pro')}
                                className="text-xs h-8 rounded-xl border-amber-500/30 text-amber-700 hover:bg-amber-500/10"
                              >
                                + Pro ({selectedDurationDays}d)
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateUserPlan(u.uid, 'business')}
                                className="text-xs h-8 rounded-xl border-purple-500/30 text-purple-700 hover:bg-purple-500/10"
                              >
                                + Biz ({selectedDurationDays}d)
                              </Button>
                              {u.plan !== 'free' && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleUpdateUserPlan(u.uid, 'free')}
                                  className="text-xs h-8 rounded-xl text-rose-600 hover:bg-rose-500/10"
                                >
                                  Revoke
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setDeleteUserTarget({ uid: u.uid, name: u.name || 'Unknown', email: u.email || '' })}
                                className="text-xs h-8 rounded-xl text-rose-700 hover:bg-rose-500/15 hover:text-rose-800 border border-rose-500/20"
                                title="Delete user permanently"
                              >
                                <Trash2 className="size-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>

            <AdminTablePagination
              currentPage={pageUsers}
              totalItems={filteredUsers.length}
              pageSize={pageSizeUsers}
              onPageChange={setPageUsers}
              onPageSizeChange={setPageSizeUsers}
              itemName="users"
            />
          </div>
        )}

        {/* MAGIC LINKS 🪄 SECTION */}
        {(adminSection === 'all' || adminSection === 'magic_links') && (
          <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden mb-8">
            <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="size-5 text-amber-500" /> Interactive Magic Links 🪄 ({magicLinks.length})
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Full database of bespoke 3D animated celebration microsites (Balloons, Candles, Mughal farmaan, Lanterns).
                </p>
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search magic links..."
                    value={magicSearch}
                    onChange={(e) => {
                      setMagicSearch(e.target.value)
                      setPageMagicLinks(1)
                    }}
                    className="pl-8 text-xs h-8 w-48 rounded-xl"
                  />
                </div>
                <Link
                  href="/create-magic-link"
                  className="rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2 text-xs font-black shadow-md flex items-center gap-1.5"
                >
                  <Sparkles className="size-3.5" /> Create Magic Link
                </Link>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/40 border-b border-border text-xs uppercase font-semibold text-muted-foreground">
                  <tr>
                    <th className="py-3.5 px-4">Celebrant / Recipient</th>
                    <th className="py-3.5 px-4">Creator / Host</th>
                    <th className="py-3.5 px-4">Occasion & Theme</th>
                    <th className="py-3.5 px-4">Details / Secret Letter</th>
                    <th className="py-3.5 px-4">Created When</th>
                    <th className="py-3.5 px-4">Visits</th>
                    <th className="py-3.5 px-4 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredMagicLinks.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-muted-foreground text-xs">
                        {magicSearch ? `No Magic Links match "${magicSearch}".` : 'No Magic Links recorded yet. Create one to test interactive celebrations!'}
                      </td>
                    </tr>
                  ) : (
                    paginatedMagicLinks.map((m, idx) => {
                      const mOrigin = inferOrigin({
                        country: m.country,
                        countryCode: m.countryCode,
                        city: m.city,
                        region: m.region,
                        createdLocation: m.createdLocation,
                        device: m.device,
                        browser: m.browser,
                        ip: m.ip,
                        phone: m.wishContent?.whatsappNumber || m.inviteContent?.whatsappNumber,
                      })

                      return (
                        <tr key={(m.slug || m.id) || m.id || `ml-${idx}`} className="hover:bg-muted/20 transition-colors">
                          <td className="py-4 px-4 font-bold text-foreground">
                            <div className="text-base text-amber-400 font-black">{m.recipientName}</div>
                            <div className="text-[11px] font-mono text-muted-foreground">slug: {(m.slug || m.id) || m.id}</div>
                            {(m.wishContent?.photoUrl || m.inviteContent?.photoUrl) && (
                              <div className="flex items-center gap-1.5 mt-1">
                                <ZoomableImageBadge
                                  src={m.wishContent?.photoUrl || m.inviteContent?.photoUrl}
                                  alt={m.recipientName || 'Magic Link Photo'}
                                  title={`${m.recipientName || 'Magic Celebration'} — Photo`}
                                  className="size-7 rounded-lg border border-amber-500/30 shadow-xs hover:scale-110 transition-transform inline-block"
                                >
                                  <img src={m.wishContent?.photoUrl || m.inviteContent?.photoUrl} alt="Magic Photo" className="size-full object-cover rounded-lg" />
                                </ZoomableImageBadge>
                                <span className="text-[9.5px] text-amber-500 font-semibold">✨ Photo</span>
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-4 font-semibold text-foreground">
                            {m.senderName || 'Anonymous Host'}
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase border border-amber-500/30">
                              {m.occasion} · {m.type}
                            </span>
                            <div className="text-[10px] text-muted-foreground mt-1 capitalize font-mono">
                              Theme: {m.theme || 'emerald-gold'}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-xs text-muted-foreground max-w-xs">
                            <div className="max-h-28 overflow-y-auto pr-1 break-words break-all [overflow-wrap:anywhere] [word-break:break-word] text-xs leading-relaxed" title={m.wishContent?.secretLetter || m.inviteContent?.eventTitle}>
                              {m.wishContent?.secretLetter || m.inviteContent?.eventTitle || 'Interactive 3D celebration capsule'}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-xs">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5">
                                <Clock className="size-3.5 text-amber-500 shrink-0" />
                                <span className="font-bold text-foreground">
                                  {formatDateTime(typeof m.createdAt === 'number' ? m.createdAt : (m.createdAt as any)?.toMillis?.() || (m.createdAt as any)?.seconds * 1000 || Date.now())}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-base shrink-0 leading-none">{mOrigin.flag}</span>
                                <span className="font-semibold text-foreground truncate max-w-[180px]">
                                  {mOrigin.locationText}
                                </span>
                              </div>
                              {(mOrigin.device || mOrigin.ip) && (
                                <div className="flex flex-wrap items-center gap-1 text-[10px]">
                                  {mOrigin.device && (
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 font-medium">
                                      {mOrigin.device.includes('Mobile') ? <Smartphone className="size-2.5" /> : <Monitor className="size-2.5" />}
                                      {mOrigin.device} {mOrigin.browser ? `• ${mOrigin.browser}` : ''}
                                    </span>
                                  )}
                                  {mOrigin.ip && mOrigin.ip !== '127.0.0.1' && (
                                    <span className="px-1.5 py-0.5 rounded bg-muted/70 text-muted-foreground font-mono">
                                      IP: {mOrigin.ip}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                        <td className="py-4 px-4 text-xs font-bold text-foreground">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <Eye className="size-3.5 text-amber-500" />
                            <span className="px-2 py-0.5 rounded-md bg-muted font-mono font-bold text-foreground text-xs">
                              {m.viewsCount || 0} visits
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-extrabold border border-blue-500/20 shadow-2xs" title="SMS">
                              📱 {m.shares?.sms || 0}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/20 shadow-2xs" title="WhatsApp">
                              💬 {m.shares?.whatsapp || 0}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-500/10 dark:bg-zinc-500/20 text-foreground font-extrabold border border-zinc-500/20 shadow-2xs" title="Link Copied">
                              📋 {m.shares?.copy || 0}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold border border-amber-500/20 shadow-2xs" title="Barcode / QR">
                              🔲 {m.shares?.qr || 0}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-extrabold border border-purple-500/20 shadow-2xs" title="Image Download">
                              🖼️ {m.shares?.image || 0}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-extrabold border border-rose-500/20 shadow-2xs" title="Video Download">
                              🎥 {m.shares?.video || 0}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-extrabold border border-indigo-500/20 shadow-2xs" title="Apps / Native OS Share">
                              📲 {m.shares?.app || 0}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/m/${(m.slug || m.id)}?mode=sender`}
                              target="_blank"
                              className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 text-xs font-bold flex items-center gap-1"
                              title="Host Screen Preview"
                            >
                              <ExternalLink className="size-3.5" /> Preview
                            </Link>

                            <button
                              type="button"
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
                                  message: m.wishContent?.secretLetter || m.inviteContent?.eventTitle,
                                  theme: m.theme,
                                  senderName: m.senderName,
                                  date: m.inviteContent?.eventDate,
                                  time: m.inviteContent?.eventTime,
                                  venue: m.inviteContent?.venueName,
                                  waMessage: `✨ I created an interactive surprise for you on Cardzy! Tap to unwrap:`,
                                })
                              }
                              className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              title="Share, QR & Download Image"
                            >
                              <Sparkles className="size-3.5" /> Share & Image
                            </button>

                              <button
                                type="button"
                                onClick={() => promptAdjustMetrics('magic', m)}
                                className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                                title="Adjust Likes, Views & Shares"
                              >
                                <Sliders className="size-3.5" /> Metrics
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteMagicLink((m.slug || m.id || ""))}
                                className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                                title="Delete Magic Link"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                        </td>
                      </tr>
                    )})
                  )}
                </tbody>
              </table>
            </div>

            <AdminTablePagination
              currentPage={pageMagicLinks}
              totalItems={filteredMagicLinks.length}
              pageSize={pageSizeMagicLinks}
              onPageChange={setPageMagicLinks}
              onPageSizeChange={setPageSizeMagicLinks}
              itemName="magic links"
            />
          </div>
        )}

        {/* EVENT CARD GUESTBOOK / WISHES WALL SECTION */}
        {(adminSection === 'all' || adminSection === 'guestbook') && (
          <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden mb-8">
            <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <MessageCircle className="size-5 text-purple-500" /> Guestbook & Wishes Wall ({allGuestbookWishes.length})
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    🛡️ 100% AdSense Safe (No Links / UGC Filtered)
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Heartfelt wishes, prayers, and Duas left by guests and friends on digital celebration cards. Live synchronized.
                </p>
              </div>

              {/* Action Toolbar: Search + Bulk Delete */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search guest, message, slug..."
                    value={guestbookSearch}
                    onChange={(e) => {
                      setGuestbookSearch(e.target.value)
                      setPageGuestbook(1)
                    }}
                    className="pl-8 text-xs h-9 bg-muted/30 border-border rounded-xl"
                  />
                </div>

                <div className="flex items-center gap-1.5 bg-muted/30 border border-border rounded-xl p-1">
                  <select
                    value={guestbookCleanupDays}
                    onChange={(e) => setGuestbookCleanupDays(Number(e.target.value))}
                    className="bg-transparent text-xs font-semibold text-foreground px-2 py-1 outline-none cursor-pointer"
                    title="Select age threshold for cleanup"
                  >
                    <option value={7} className="bg-card text-foreground">Older than 7 days</option>
                    <option value={15} className="bg-card text-foreground">Older than 15 days</option>
                    <option value={30} className="bg-card text-foreground">Older than 30 days</option>
                    <option value={60} className="bg-card text-foreground">Older than 60 days</option>
                    <option value={90} className="bg-card text-foreground">Older than 90 days</option>
                  </select>

                  <Button
                    onClick={handleCleanOldWishes}
                    disabled={isCleaningOldWishes || allGuestbookWishes.length === 0}
                    variant="outline"
                    className="h-7 px-2.5 text-xs font-bold text-rose-600 hover:text-white hover:bg-rose-600 border-rose-500/30 rounded-lg transition-colors flex items-center gap-1"
                    title="Bulk clean old wishes from database"
                  >
                    <Trash2 className={cn("size-3", isCleaningOldWishes && "animate-spin")} />
                    <span>{isCleaningOldWishes ? 'Cleaning...' : 'Purge Old'}</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/40 border-b border-border text-xs uppercase font-semibold text-muted-foreground">
                  <tr>
                    <th className="py-3.5 px-4">Guest & Reaction</th>
                    <th className="py-3.5 px-4">Target Card / Slug</th>
                    <th className="py-3.5 px-4">Wish Message / Dua</th>
                    <th className="py-3.5 px-4">Submitted When</th>
                    <th className="py-3.5 px-4 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredGuestbookWishes.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-muted-foreground text-xs">
                        {guestbookSearch ? (
                          <span>No wishes match your search query "{guestbookSearch}".</span>
                        ) : (
                          <div className="space-y-1">
                            <p className="font-semibold text-foreground">No guestbook wishes recorded yet.</p>
                            <p className="text-[11px]">When guests visit celebration cards and post wishes or Duas, they will stream here in real time.</p>
                          </div>
                        )}
                      </td>
                    </tr>
                  ) : (
                    paginatedGuestbookWishes.map((w, idx) => (
                      <tr key={w.id || `gbw-${idx}`} className="hover:bg-muted/20 transition-colors">
                        <td className="py-4 px-4 font-bold text-foreground">
                          <div className="flex items-center gap-2">
                            <span className="text-xl shrink-0 p-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                              {w.emoji || '💖'}
                            </span>
                            <div>
                              <div className="text-sm font-black text-foreground">{w.guestName}</div>
                              {(w.city || w.country) && (
                                <div className="text-[11px] font-normal text-muted-foreground flex items-center gap-1">
                                  <MapPin className="size-3 text-muted-foreground" />
                                  <span>{[w.city, w.country].filter(Boolean).join(', ')}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold font-mono">
                              {w.cardType || 'magic'}
                            </span>
                            <Link
                              href={`/m/${w.cardSlug}`}
                              target="_blank"
                              className="text-xs font-mono font-bold text-amber-500 hover:underline flex items-center gap-1"
                              title="Open card celebration"
                            >
                              <span>{w.cardSlug}</span>
                              <ExternalLink className="size-3" />
                            </Link>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-xs text-foreground max-w-md">
                          <div className="p-2.5 rounded-xl bg-muted/40 border border-border/60 text-xs leading-relaxed font-medium italic break-words break-all [overflow-wrap:anywhere] [word-break:break-word] max-h-32 overflow-y-auto pr-1" title={w.message}>
                            "{w.message}"
                          </div>
                        </td>
                        <td className="py-4 px-4 text-xs whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Clock className="size-3.5 text-muted-foreground shrink-0" />
                            <span className="font-bold text-foreground">
                              {formatDateTime(w.createdAt)}
                            </span>
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-0.5 font-mono">
                            {formatRelativeTime(w.createdAt)}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteSingleWish(w.id, w.cardSlug)}
                            className="p-2 rounded-xl bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                            title="Delete this wish entry"
                          >
                            <Trash2 className="size-3.5" />
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <AdminTablePagination
              currentPage={pageGuestbook}
              totalItems={filteredGuestbookWishes.length}
              pageSize={pageSizeGuestbook}
              onPageChange={setPageGuestbook}
              onPageSizeChange={setPageSizeGuestbook}
              itemName="guestbook wishes"
            />
          </div>
        )}

        {/* 2. ACTIVE INVITATIONS SECTION */}
        {(adminSection === 'all' || adminSection === 'invitations') && (
          <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Calendar className="size-5 text-emerald-600" /> Active Event & Wedding Invitations ({invitations.length})
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Full control panel to manage, edit, view, and delete all invitations.
                </p>
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search invitations..."
                    value={invitationSearch}
                    onChange={(e) => {
                      setInvitationSearch(e.target.value)
                      setPageInvitations(1)
                    }}
                    className="pl-8 text-xs h-8 w-48 rounded-xl"
                  />
                </div>
                <Link href="/create-invitation" className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-xs font-bold shadow-md">
                  + Create New Invite
                </Link>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/40 border-b border-border text-xs uppercase font-semibold text-muted-foreground">
                  <tr>
                    <th className="py-3.5 px-4">Event & Couple</th>
                    <th className="py-3.5 px-4">Host / Sender</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Schedule & Venue</th>
                    <th className="py-3.5 px-4">Created When & Where</th>
                    <th className="py-3.5 px-4">RSVP Contact</th>
                    <th className="py-3.5 px-4">Stats</th>
                    <th className="py-3.5 px-4 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredInvitations.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-muted-foreground">
                        {invitationSearch ? `No invitations match "${invitationSearch}".` : 'No active invitations found.'}
                      </td>
                    </tr>
                  ) : (
                    paginatedInvitations.map((inv, idx) => {
                      const invOrigin = inferOrigin({
                        country: inv.country,
                        countryCode: inv.countryCode,
                        city: inv.cityOrigin || inv.city,
                        createdLocation: inv.createdLocation,
                        device: inv.device,
                        browser: inv.browser,
                        ip: inv.ip,
                        phone: inv.rsvpPhone,
                        venue: inv.venue,
                      })

                      return (
                        <tr key={(inv.slug || inv.id) || inv.id || `inv-${idx}`} className="hover:bg-muted/20 transition-colors">
                          <td className="py-4 px-4">
                            <div className="font-bold text-foreground">{inv.title || 'Event Invitation'}</div>
                            {(inv.groom || inv.bride) && (
                              <div className="text-xs font-medium text-emerald-700">{inv.groom || ''} & {inv.bride || ''}</div>
                            )}
                            <div className="text-[10px] text-muted-foreground font-mono">Slug: {(inv.slug || inv.id)}</div>
                            {(inv.photoUrl || inv.photoUrl2) && (
                              <div className="flex items-center gap-1.5 mt-1.5">
                                {inv.photoUrl && (
                                  <ZoomableImageBadge
                                    src={inv.photoUrl}
                                    alt="Bride / Host Photo"
                                    title={`${inv.title || 'Event'} — Photo 1`}
                                    className="size-7 rounded-lg border border-border shadow-xs hover:scale-110 transition-transform inline-block"
                                  >
                                    <img src={inv.photoUrl} alt="Photo 1" className="size-full object-cover rounded-lg" />
                                  </ZoomableImageBadge>
                                )}
                                {inv.photoUrl2 && (
                                  <ZoomableImageBadge
                                    src={inv.photoUrl2}
                                    alt="Groom / Host Photo"
                                    title={`${inv.title || 'Event'} — Photo 2`}
                                    className="size-7 rounded-lg border border-border shadow-xs hover:scale-110 transition-transform inline-block"
                                  >
                                    <img src={inv.photoUrl2} alt="Photo 2" className="size-full object-cover rounded-lg" />
                                  </ZoomableImageBadge>
                                )}
                                <span className="text-[9.5px] text-emerald-600 font-semibold">🖼️ Photo</span>
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-semibold text-xs text-foreground">{inv.hostNames || 'Host'}</div>
                            <div className="text-[11px] text-muted-foreground font-mono">Creator: {inv.creatorId}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-bold uppercase">
                              {inv.typeId || 'Event'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-xs text-muted-foreground">
                            <div className="font-bold text-foreground">{inv.date || 'Date TBD'} {inv.time ? `• ${inv.time}` : ''}</div>
                            <div>{inv.venue || inv.city || 'Location N/A'}</div>
                            {inv.dressCode && <div className="text-[11px] italic">Dress: {inv.dressCode}</div>}
                          </td>
                          <td className="py-4 px-4 text-xs">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5">
                                <Clock className="size-3.5 text-emerald-600 shrink-0" />
                                <span className="font-bold text-foreground">
                                  {formatDateTime(inv.createdAt)}
                                </span>
                                {inv.createdAt ? (
                                  <span className="text-[10px] text-muted-foreground font-medium px-1.5 py-0.5 rounded bg-muted/60">
                                    {formatRelativeTime(inv.createdAt)}
                                  </span>
                                ) : null}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-base shrink-0 leading-none">{invOrigin.flag}</span>
                                <span className="font-semibold text-foreground truncate max-w-[180px]">
                                  {invOrigin.locationText}
                                </span>
                              </div>
                              {(invOrigin.device || invOrigin.ip) && (
                                <div className="flex flex-wrap items-center gap-1 text-[10px]">
                                  {invOrigin.device && (
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium">
                                      {invOrigin.device.includes('Mobile') ? <Smartphone className="size-2.5" /> : <Monitor className="size-2.5" />}
                                      {invOrigin.device} {invOrigin.browser ? `• ${invOrigin.browser}` : ''}
                                    </span>
                                  )}
                                  {invOrigin.ip && invOrigin.ip !== '127.0.0.1' && (
                                    <span className="px-1.5 py-0.5 rounded bg-muted/70 text-muted-foreground font-mono">
                                      IP: {invOrigin.ip}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                        <td className="py-4 px-4 text-xs font-mono text-muted-foreground">
                          {inv.rsvpPhone ? (
                            <span className="text-emerald-600 font-semibold">{inv.rsvpPhone}</span>
                          ) : (
                            '—'
                          )}
                        </td>
                        <td className="py-4 px-4 text-xs">
                          <div className="font-bold text-emerald-600">{inv.rsvpCount} RSVPs</div>
                          <div className="text-muted-foreground font-semibold mb-1.5">{inv.viewCount || 0} views</div>
                          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-extrabold border border-blue-500/20 shadow-2xs" title="SMS">
                              📱 {inv.shares?.sms || 0}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/20 shadow-2xs" title="WhatsApp">
                              💬 {inv.shares?.whatsapp || 0}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-500/10 dark:bg-zinc-500/20 text-foreground font-extrabold border border-zinc-500/20 shadow-2xs" title="Link Copied">
                              📋 {inv.shares?.copy || 0}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold border border-amber-500/20 shadow-2xs" title="Barcode / QR">
                              🔲 {inv.shares?.qr || 0}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-extrabold border border-purple-500/20 shadow-2xs" title="Image Download">
                              🖼️ {inv.shares?.image || 0}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-extrabold border border-rose-500/20 shadow-2xs" title="Video Download">
                              🎥 {inv.shares?.video || 0}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-extrabold border border-indigo-500/20 shadow-2xs" title="Apps / Native OS Share">
                              📲 {inv.shares?.app || 0}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setShareModalCard({
                                  title: inv.title || `${inv.groom} & ${inv.bride}`,
                                  recipientOrCouple: (inv.groom && inv.bride) ? `${inv.groom} & ${inv.bride}` : (inv.title || 'Royal Guests'),
                                  type: 'invite',
                                  slug: (inv.slug || inv.id || ""),
                                  url: `/i/${(inv.slug || inv.id)}`,
                                  viewsCount: inv.viewCount,
                                  shares: inv.shares,
                                  occasion: inv.typeId || 'Royal Wedding Invitation',
                                  date: inv.date,
                                  time: inv.time,
                                  venue: inv.venue || inv.city,
                                  waMessage: `✨ You are cordially invited to celebrate with us! Tap to view our interactive digital invitation:`,
                                })
                              }
                              className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              title="Share, QR & Download Image"
                            >
                              <Sparkles className="size-3.5" /> Share
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setRsvpFilterSlug((inv.slug || inv.id))
                                setAdminSection('rsvps')
                                // Scroll to top so the RSVP section is visible
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                              }}
                              className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-700 hover:bg-indigo-500/20 text-xs font-bold flex items-center gap-1"
                              title={`View RSVPs for this event (${inv.rsvpCount})`}
                            >
                              <Users className="size-3.5" /> RSVPs ({inv.rsvpCount})
                            </button>
                            <Link
                              href={`/i/${(inv.slug || inv.id)}`}
                              target="_blank"
                              className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 text-xs font-bold flex items-center gap-1"
                              title="View Live Card"
                            >
                              <ExternalLink className="size-3.5" /> View
                            </Link>
                            <Link
                              href={`/create-invitation?edit=${(inv.slug || inv.id)}`}
                              rel="nofollow"
                              className="p-1.5 rounded-lg bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 text-xs font-bold flex items-center gap-1"
                              title="Edit Invitation"
                            >
                              <Edit3 className="size-3.5" /> Edit
                            </Link>
                            <button
                              type="button"
                              onClick={() => promptAdjustMetrics('invite', inv)}
                              className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-700 hover:bg-indigo-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              title="Adjust Likes, Views & Shares"
                            >
                              <Sliders className="size-3.5" /> Metrics
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteInv((inv.slug || inv.id))}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              title="Delete Invitation"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
                </tbody>
              </table>
            </div>

            <AdminTablePagination
              currentPage={pageInvitations}
              totalItems={filteredInvitations.length}
              pageSize={pageSizeInvitations}
              onPageChange={setPageInvitations}
              onPageSizeChange={setPageSizeInvitations}
              itemName="invitations"
            />
          </div>
        )}

        {/* 3. CREATED WISHES SECTION */}
        {(adminSection === 'all' || adminSection === 'wishes') && (
          <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="size-5 text-amber-500" /> Created Greeting Wishes & Cards ({wishes.length})
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Complete database of all animated wish cards sent across Cardzy.
                </p>
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search wishes..."
                    value={wishSearch}
                    onChange={(e) => {
                      setWishSearch(e.target.value)
                      setPageWishes(1)
                    }}
                    className="pl-8 text-xs h-8 w-48 rounded-xl"
                  />
                </div>
                <Link href="/create-wish" className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-xs font-bold shadow-md">
                  + Create New Wish
                </Link>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/40 border-b border-border text-xs uppercase font-semibold text-muted-foreground">
                  <tr>
                    <th className="py-3.5 px-4">Sender (Who Sent)</th>
                    <th className="py-3.5 px-4">Recipient (Who Received)</th>
                    <th className="py-3.5 px-4">Occasion & Style</th>
                    <th className="py-3.5 px-4">Created When & Where</th>
                    <th className="py-3.5 px-4">Card Message</th>
                    <th className="py-3.5 px-4">Views</th>
                    <th className="py-3.5 px-4 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredWishes.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-muted-foreground">
                        {wishSearch ? `No wishes match "${wishSearch}".` : 'No wishes recorded.'}
                      </td>
                    </tr>
                  ) : (
                    paginatedWishes.map((w, idx) => {
                      const wishOrigin = inferOrigin({
                        country: w.country,
                        countryCode: w.countryCode,
                        city: w.city,
                        createdLocation: w.createdLocation,
                        device: w.device,
                        browser: w.browser,
                        ip: w.ip,
                      })

                      return (
                        <tr key={(w.slug || w.id) || w.id || `wish-${idx}`} className="hover:bg-muted/20 transition-colors">
                          <td className="py-4 px-4 font-bold text-foreground break-words break-all [overflow-wrap:anywhere] max-w-[150px]">
                            <div>{w.senderName || 'Well Wisher'}</div>
                            <div className="text-[10px] text-muted-foreground font-mono font-normal mt-0.5">Slug: {(w.slug || w.id)}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-semibold text-foreground break-words break-all [overflow-wrap:anywhere] max-w-[150px]">{w.recipientName || 'Friend'}</div>
                            {w.relation && <div className="text-[11px] text-muted-foreground">Relation: {w.relation}</div>}
                            {w.photoUrl && (
                              <div className="flex items-center gap-1.5 mt-1">
                                <ZoomableImageBadge
                                  src={w.photoUrl}
                                  alt={w.recipientName || 'Wish Photo'}
                                  title={`${w.recipientName || 'Wish'} — Uploaded Photo`}
                                  className="size-7 rounded-lg border border-border shadow-xs hover:scale-110 transition-transform inline-block"
                                >
                                  <img src={w.photoUrl} alt="Wish Photo" className="size-full object-cover rounded-lg" />
                                </ZoomableImageBadge>
                                <span className="text-[9.5px] text-amber-600 font-semibold">🖼️ Photo</span>
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-bold uppercase">
                              {w.occasionId}
                            </span>
                            <div className="text-[10px] text-muted-foreground mt-1 font-mono">Theme: {w.themeId || 'default'}</div>
                          </td>
                          <td className="py-4 px-4 text-xs">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5">
                                <Clock className="size-3.5 text-amber-500 shrink-0" />
                                <span className="font-bold text-foreground">
                                  {formatDateTime(w.createdAt)}
                                </span>
                                {w.createdAt ? (
                                  <span className="text-[10px] text-muted-foreground font-medium px-1.5 py-0.5 rounded bg-muted/60">
                                    {formatRelativeTime(w.createdAt)}
                                  </span>
                                ) : null}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-base shrink-0 leading-none">{wishOrigin.flag}</span>
                                <span className="font-semibold text-foreground truncate max-w-[180px]">
                                  {wishOrigin.locationText}
                                </span>
                              </div>
                              {(wishOrigin.device || wishOrigin.ip) && (
                                <div className="flex flex-wrap items-center gap-1 text-[10px]">
                                  {wishOrigin.device && (
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 font-medium">
                                      {wishOrigin.device.includes('Mobile') ? <Smartphone className="size-2.5" /> : <Monitor className="size-2.5" />}
                                      {wishOrigin.device} {wishOrigin.browser ? `• ${wishOrigin.browser}` : ''}
                                    </span>
                                  )}
                                  {wishOrigin.ip && wishOrigin.ip !== '127.0.0.1' && (
                                    <span className="px-1.5 py-0.5 rounded bg-muted/70 text-muted-foreground font-mono">
                                      IP: {wishOrigin.ip}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                        <td className="py-4 px-4 text-xs text-muted-foreground max-w-xs">
                          <div className="max-h-28 overflow-y-auto pr-1 break-words break-all [overflow-wrap:anywhere] [word-break:break-word] text-xs leading-relaxed" title={w.message}>
                            {w.message}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-xs font-bold text-foreground">
                          <div className="font-bold text-foreground mb-1.5">{w.viewCount || 0} views</div>
                          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-extrabold border border-blue-500/20 shadow-2xs" title="SMS">
                              📱 {w.shares?.sms || 0}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/20 shadow-2xs" title="WhatsApp">
                              💬 {w.shares?.whatsapp || 0}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-500/10 dark:bg-zinc-500/20 text-foreground font-extrabold border border-zinc-500/20 shadow-2xs" title="Link Copied">
                              📋 {w.shares?.copy || 0}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold border border-amber-500/20 shadow-2xs" title="Barcode / QR">
                              🔲 {w.shares?.qr || 0}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-extrabold border border-purple-500/20 shadow-2xs" title="Image Download">
                              🖼️ {w.shares?.image || 0}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-extrabold border border-rose-500/20 shadow-2xs" title="Video Download">
                              🎥 {w.shares?.video || 0}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-extrabold border border-indigo-500/20 shadow-2xs" title="Apps / Native OS Share">
                              📲 {w.shares?.app || 0}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setShareModalCard({
                                  title: `${w.occasionId} Wish Card`,
                                  recipientOrCouple: w.recipientName || 'Dear Friend',
                                  type: 'wish',
                                  slug: (w.slug || w.id || ""),
                                  url: `/w/${(w.slug || w.id)}`,
                                  viewsCount: w.viewCount,
                                  shares: w.shares,
                                  occasion: w.occasionId,
                                  message: w.message,
                                  senderName: w.senderName,
                                  waMessage: `✨ A special 3D digital wish card was created for you! Tap to open:`,
                                })
                              }
                              className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              title="Share, QR & Download Image"
                            >
                              <Sparkles className="size-3.5" /> Share
                            </button>
                            <Link
                              href={`/w/${(w.slug || w.id)}`}
                              target="_blank"
                              className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-xs font-bold flex items-center gap-1"
                              title="View Live Greeting"
                            >
                              <ExternalLink className="size-3.5" /> View
                            </Link>
                            <Link
                              href={`/create-wish?edit=${(w.slug || w.id)}`}
                              rel="nofollow"
                              className="p-1.5 rounded-lg bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 text-xs font-bold flex items-center gap-1"
                              title="Edit Wish"
                            >
                              <Edit3 className="size-3.5" /> Edit
                            </Link>
                            <button
                              type="button"
                              onClick={() => promptAdjustMetrics('wish', w)}
                              className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-700 hover:bg-indigo-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              title="Adjust Likes, Views & Shares"
                            >
                              <Sliders className="size-3.5" /> Metrics
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteWishCard((w.slug || w.id))}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              title="Delete Wish"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
                </tbody>
              </table>
            </div>

            <AdminTablePagination
              currentPage={pageWishes}
              totalItems={filteredWishes.length}
              pageSize={pageSizeWishes}
              onPageChange={setPageWishes}
              onPageSizeChange={setPageSizeWishes}
              itemName="wishes"
            />
          </div>
        )}

        {/* 3. VISITING CARDS SECTION */}
        {(adminSection === 'all' || adminSection === 'visiting_cards') && (
          <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <CreditCard className="size-5 text-emerald-600" /> Digital Visiting & Business Cards ({visitingCards?.length || 0})
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  View, edit, preview, or remove digital business cards created on Cardzy.online.
                </p>
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search visiting cards..."
                    value={vcSearch}
                    onChange={(e) => {
                      setVcSearch(e.target.value)
                      setPageVisitingCards(1)
                    }}
                    className="pl-8 text-xs h-8 w-48 rounded-xl"
                  />
                </div>
                <Link
                  href="/create-visiting-card"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0 shadow-md"
                >
                  <CreditCard className="size-4" />
                  <span>+ Create Visiting Card</span>
                </Link>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-[11px] uppercase tracking-wider font-extrabold text-muted-foreground">
                    <th className="py-3.5 px-4">Full Name & Title</th>
                    <th className="py-3.5 px-4">Company & Category</th>
                    <th className="py-3.5 px-4">Contact Info</th>
                    <th className="py-3.5 px-4">Created When & Where</th>
                    <th className="py-3.5 px-4">Views</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredVisitingCards.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-xs text-muted-foreground">
                        {vcSearch ? `No visiting cards match "${vcSearch}".` : 'No visiting cards created yet.'}
                      </td>
                    </tr>
                  ) : (
                    paginatedVisitingCards.map((vc, idx) => {
                      const vcOrigin = inferOrigin({
                        country: vc.country,
                        countryCode: vc.countryCode,
                        city: vc.city,
                        createdLocation: vc.createdLocation,
                        device: vc.device,
                        browser: vc.browser,
                        ip: vc.ip,
                        phone: vc.phone || vc.whatsapp,
                        address: vc.address,
                      })

                      return (
                        <tr key={(vc.slug || vc.id) || vc.id || `vc-${idx}`} className="hover:bg-muted/20 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2.5">
                              {vc.avatarUrl && (
                                <ZoomableImageBadge
                                  src={vc.avatarUrl}
                                  alt={vc.fullName || 'Avatar'}
                                  title={`${vc.fullName || 'User'} — Profile Photo`}
                                  className="size-8 rounded-full border border-border shadow-xs hover:scale-110 transition-transform shrink-0"
                                >
                                  <img src={vc.avatarUrl} alt={vc.fullName} className="size-full object-cover rounded-full" />
                                </ZoomableImageBadge>
                              )}
                              <div>
                                <div className="font-bold text-foreground text-sm">{vc.fullName}</div>
                                <div className="text-xs text-muted-foreground font-medium">{vc.title}</div>
                                <div className="text-[10px] text-muted-foreground font-mono">Slug: {(vc.slug || vc.id)}</div>
                              </div>
                            </div>
                            <div className="text-[10px] text-muted-foreground mt-0.5 font-mono">Theme: {vc.themeId || 'executive-gold'}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-xs font-bold text-foreground">{vc.company || '—'}</div>
                            <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-extrabold text-[10px] uppercase">
                              {vc.category || 'Business'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-xs space-y-0.5 text-muted-foreground">
                            {vc.phone && <div>📞 {vc.phone}</div>}
                            {vc.email && <div>✉️ {vc.email}</div>}
                            {vc.address && <div className="truncate max-w-[160px]">📍 {vc.address}</div>}
                          </td>
                          <td className="py-4 px-4 text-xs">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5">
                                <Clock className="size-3.5 text-emerald-600 shrink-0" />
                                <span className="font-bold text-foreground">
                                  {formatDateTime(vc.createdAt)}
                                </span>
                                {vc.createdAt ? (
                                  <span className="text-[10px] text-muted-foreground font-medium px-1.5 py-0.5 rounded bg-muted/60">
                                    {formatRelativeTime(vc.createdAt)}
                                  </span>
                                ) : null}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-base shrink-0 leading-none">{vcOrigin.flag}</span>
                                <span className="font-semibold text-foreground truncate max-w-[180px]">
                                  {vcOrigin.locationText}
                                </span>
                              </div>
                              {(vcOrigin.device || vcOrigin.ip) && (
                                <div className="flex flex-wrap items-center gap-1 text-[10px]">
                                  {vcOrigin.device && (
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium">
                                      {vcOrigin.device.includes('Mobile') ? <Smartphone className="size-2.5" /> : <Monitor className="size-2.5" />}
                                      {vcOrigin.device} {vcOrigin.browser ? `• ${vcOrigin.browser}` : ''}
                                    </span>
                                  )}
                                  {vcOrigin.ip && vcOrigin.ip !== '127.0.0.1' && (
                                    <span className="px-1.5 py-0.5 rounded bg-muted/70 text-muted-foreground font-mono">
                                      IP: {vcOrigin.ip}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-xs font-bold text-foreground">
                            <div className="font-bold text-foreground mb-1.5">{vc.viewCount || 0} views</div>
                            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-extrabold border border-blue-500/20 shadow-2xs" title="SMS">
                                📱 {vc.shares?.sms || 0}
                              </span>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/20 shadow-2xs" title="WhatsApp">
                                💬 {vc.shares?.whatsapp || 0}
                              </span>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-500/10 dark:bg-zinc-500/20 text-foreground font-extrabold border border-zinc-500/20 shadow-2xs" title="Link Copied">
                                📋 {vc.shares?.copy || 0}
                              </span>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold border border-amber-500/20 shadow-2xs" title="Barcode / QR">
                                🔲 {vc.shares?.qr || 0}
                              </span>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-extrabold border border-purple-500/20 shadow-2xs" title="Image Download">
                                🖼️ {vc.shares?.image || 0}
                              </span>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-extrabold border border-rose-500/20 shadow-2xs" title="Video Download">
                                🎥 {vc.shares?.video || 0}
                              </span>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-extrabold border border-indigo-500/20 shadow-2xs" title="Apps / Native OS Share">
                                📲 {vc.shares?.app || 0}
                              </span>
                            </div>
                          </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
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
                              className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              title="Share, QR & Download Image"
                            >
                              <Sparkles className="size-3.5" /> Share
                            </button>
                            <Link
                              href={`/v/${(vc.slug || vc.id)}`}
                              target="_blank"
                              className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 text-xs font-bold flex items-center gap-1"
                              title="View Live Card"
                            >
                              <ExternalLink className="size-3.5" /> View
                            </Link>
                            <button
                              type="button"
                              onClick={() => promptAdjustMetrics('vcard', vc)}
                              className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-700 hover:bg-indigo-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              title="Adjust Likes, Views & Shares"
                            >
                              <Sliders className="size-3.5" /> Metrics
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteVisitingCard((vc.slug || vc.id), vc.fullName)}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              title="Delete Card"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>

            <AdminTablePagination
              currentPage={pageVisitingCards}
              totalItems={filteredVisitingCards.length}
              pageSize={pageSizeVisitingCards}
              onPageChange={setPageVisitingCards}
              onPageSizeChange={setPageSizeVisitingCards}
              itemName="visiting cards"
            />
          </div>
        )}

        {/* 4. GUEST RSVPs SECTION */}
        {(adminSection === 'all' || adminSection === 'rsvps') && (
          <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden space-y-4">
            <div className="p-6 border-b border-border space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <FileSpreadsheet className="size-5 text-indigo-600" />
                    {rsvpFilterSlug
                      ? <>RSVPs for: <span className="text-indigo-600">{rsvpFilterInvitation?.title || rsvpFilterSlug}</span></>
                      : <>Recorded Guest RSVPs ({rsvps?.length || 0})</>}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {rsvpFilterSlug
                      ? `Showing ${filteredRsvps.length} response${filteredRsvps.length !== 1 ? 's' : ''} for this event only.`
                      : 'Guest list responses submitted for all event invitations.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                    <Input
                      placeholder="Search RSVPs..."
                      value={rsvpSearch}
                      onChange={(e) => {
                        setRsvpSearch(e.target.value)
                        setPageRsvps(1)
                      }}
                      className="pl-8 text-xs h-8 w-44 rounded-xl"
                    />
                  </div>
                  <Button
                    onClick={() => downloadAllGuestsPdf(rsvpFilterSlug ?? undefined)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center gap-1.5 text-xs"
                  >
                    <Download className="size-4" /> PDF Report
                  </Button>
                  <Button
                    onClick={() => downloadAllGuestsCsv(rsvpFilterSlug ?? undefined)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center gap-1.5 text-xs"
                  >
                    <FileSpreadsheet className="size-4" /> Export CSV
                  </Button>
                </div>
              </div>

              {/* Event filter bar */}
              <div className="flex flex-wrap items-center gap-2">
                {/* "All events" chip */}
                <button
                  onClick={() => setRsvpFilterSlug(null)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all border',
                    !rsvpFilterSlug
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-muted/40 text-muted-foreground border-border hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Users className="size-3.5" /> All Events ({rsvps.length})
                </button>

                {/* One chip per invitation that has RSVPs */}
                {invitations
                  .filter((inv) => (inv.rsvpCount || 0) > 0 || rsvps.some((r) => r.invitationSlug === (inv.slug || inv.id)))
                  .sort((a, b) => (b.rsvpCount || 0) - (a.rsvpCount || 0))
                  .map((inv) => {
                    const count = rsvps.filter((r) => r.invitationSlug === (inv.slug || inv.id)).length
                    const isActive = rsvpFilterSlug === (inv.slug || inv.id)
                    return (
                      <button
                        key={(inv.slug || inv.id)}
                        onClick={() => setRsvpFilterSlug((inv.slug || inv.id))}
                        className={cn(
                          'flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all border max-w-[200px]',
                          isActive
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-muted/40 text-muted-foreground border-border hover:bg-muted hover:text-foreground'
                        )}
                        title={(inv.slug || inv.id)}
                      >
                        <Calendar className="size-3.5 shrink-0" />
                        <span className="truncate">{inv.title || (inv.slug || inv.id)}</span>
                        <span className={cn(
                          'shrink-0 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold',
                          isActive ? 'bg-white/20 text-white' : 'bg-indigo-500/15 text-indigo-700'
                        )}>
                          {count}
                        </span>
                      </button>
                    )
                  })}
              </div>

              {/* Selected event info banner */}
              {rsvpFilterInvitation && (
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20">
                  <div className="size-8 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <Calendar className="size-4 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-foreground truncate">{rsvpFilterInvitation.title || 'Event'}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5 space-x-3">
                      {rsvpFilterInvitation.date && <span>📅 {rsvpFilterInvitation.date}{rsvpFilterInvitation.time ? ` • ${rsvpFilterInvitation.time}` : ''}</span>}
                      {(rsvpFilterInvitation.venue || rsvpFilterInvitation.city) && <span>📍 {rsvpFilterInvitation.venue || rsvpFilterInvitation.city}</span>}
                      {rsvpFilterInvitation.hostNames && <span>👤 {rsvpFilterInvitation.hostNames}</span>}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xl font-extrabold text-indigo-600">{filteredRsvps.length}</div>
                    <div className="text-[10px] text-muted-foreground">responses</div>
                  </div>
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/40 border-b border-border text-xs uppercase font-semibold text-muted-foreground">
                  <tr>
                    <th className="py-3.5 px-4">#</th>
                    <th className="py-3.5 px-4">Guest Name</th>
                    <th className="py-3.5 px-4">Phone Number</th>
                    <th className="py-3.5 px-4">RSVP Status</th>
                    <th className="py-3.5 px-4">Guest Count</th>
                    <th className="py-3.5 px-4">Special Note</th>
                    {!rsvpFilterSlug && <th className="py-3.5 px-4">Event</th>}
                    <th className="py-3.5 px-4">Submitted When & From</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredRsvpsWithSearch.length === 0 ? (
                    <tr>
                      <td colSpan={rsvpFilterSlug ? 7 : 8} className="py-10 text-center">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <Users className="size-8 opacity-30" />
                          <p className="text-sm font-semibold">
                            {rsvpSearch ? `No RSVPs match "${rsvpSearch}".` : rsvpFilterSlug ? 'No RSVPs recorded for this event yet.' : 'No guest RSVPs recorded yet.'}
                          </p>
                          {rsvpFilterSlug && (
                            <button onClick={() => setRsvpFilterSlug(null)} className="text-xs text-indigo-600 hover:underline font-bold mt-1">
                              ← View all RSVPs
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedRsvps.map((r, idx) => {
                      const rOrigin = inferOrigin({
                        country: r.country,
                        countryCode: r.countryCode,
                        city: r.city,
                        createdLocation: r.createdLocation,
                        phone: r.phone,
                        device: r.device,
                        browser: r.browser,
                        ip: r.ip,
                      })

                      const globalIdx = (pageRsvps - 1) * pageSizeRsvps + idx + 1

                      return (
                        <tr key={r.id || idx} className="hover:bg-muted/20 transition-colors">
                          <td className="py-3.5 px-4 text-xs text-muted-foreground font-mono">{globalIdx}</td>
                          <td className="py-3.5 px-4 font-bold text-foreground">{r.guestName || 'Anonymous'}</td>
                          <td className="py-3.5 px-4 text-xs font-mono text-muted-foreground">{r.phone || '—'}</td>
                          <td className="py-3.5 px-4">
                            <span className={cn(
                              'px-2 py-0.5 rounded-full text-xs font-bold',
                              String(r.attending).toLowerCase() === 'no'
                                ? 'bg-rose-500/10 text-rose-600'
                                : String(r.attending).toLowerCase() === 'maybe'
                                ? 'bg-amber-500/10 text-amber-700'
                                : 'bg-emerald-500/10 text-emerald-700'
                            )}>
                              {r.attending || 'Yes'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-xs font-bold text-foreground">{r.guestCount || 1}</td>
                          <td className="py-3.5 px-4 text-xs text-muted-foreground max-w-[150px] truncate">{r.note || '—'}</td>
                          {!rsvpFilterSlug && (
                            <td className="py-3.5 px-4">
                              <button
                                onClick={() => { setRsvpFilterSlug(r.invitationSlug); setAdminSection('rsvps') }}
                                className="text-xs font-mono text-indigo-600 hover:underline truncate max-w-[120px] block"
                                title={r.invitationSlug}
                              >
                                {invitations.find(i => i.slug === r.invitationSlug)?.title || r.invitationSlug}
                              </button>
                            </td>
                          )}
                          <td className="py-3.5 px-4 text-xs">
                            <div className="space-y-1">
                              <div className="font-bold text-foreground flex items-center gap-1.5">
                                <Clock className="size-3.5 text-indigo-500 shrink-0" />
                                <span>{formatDateTime(r.createdAt)}</span>
                                {r.createdAt ? (
                                  <span className="text-[10px] text-muted-foreground font-medium px-1.5 py-0.5 rounded bg-muted/60">
                                    {formatRelativeTime(r.createdAt)}
                                  </span>
                                ) : null}
                              </div>
                              <div className="flex items-center gap-1.5 text-muted-foreground">
                                <span className="text-base shrink-0 leading-none">{rOrigin.flag}</span>
                                <span className="truncate max-w-[150px] font-medium">{rOrigin.locationText}</span>
                              </div>
                              {(rOrigin.device || rOrigin.ip) && (
                                <div className="text-[10px] text-muted-foreground/80">
                                  {rOrigin.device} {rOrigin.ip && rOrigin.ip !== '127.0.0.1' ? `• ${rOrigin.ip}` : ''}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Summary footer */}
            {filteredRsvpsWithSearch.length > 0 && (
              <div className="px-6 pb-2 pt-1 flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-border/60">
                <span>Total responses: <strong className="text-foreground">{filteredRsvpsWithSearch.length}</strong></span>
                <span>Attending: <strong className="text-emerald-600">{filteredRsvpsWithSearch.filter(r => !r.attending || String(r.attending).toLowerCase() === 'yes').length}</strong></span>
                <span>Not attending: <strong className="text-rose-600">{filteredRsvpsWithSearch.filter(r => String(r.attending).toLowerCase() === 'no').length}</strong></span>
                <span>Total guests: <strong className="text-foreground">{filteredRsvpsWithSearch.reduce((sum, r) => sum + (r.guestCount || 1), 0)}</strong></span>
              </div>
            )}

            <AdminTablePagination
              currentPage={pageRsvps}
              totalItems={filteredRsvpsWithSearch.length}
              pageSize={pageSizeRsvps}
              onPageChange={setPageRsvps}
              onPageSizeChange={setPageSizeRsvps}
              itemName="RSVP responses"
            />
          </div>
        )}

        {/* Global Database Export Footer */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Download className="size-5 text-indigo-600" /> Export Guest RSVP Reports
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Download printable PDF report or raw CSV export for guest lists.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={() => downloadAllGuestsPdf()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center gap-2"
              >
                <Download className="size-4" /> Download PDF Report
              </Button>
              <Button
                onClick={() => downloadAllGuestsCsv()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center gap-2"
              >
                <FileSpreadsheet className="size-4" /> Download CSV Data
              </Button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-muted/30 border border-border/80 text-xs text-muted-foreground flex items-center justify-between">
            <span>Total Active Invitations: <strong className="text-foreground">{invitations.length}</strong></span>
            <span>Total Created Wishes: <strong className="text-foreground">{wishes.length}</strong></span>
            <span>Total Recorded Guest RSVPs: <strong className="text-emerald-600">{rsvps?.length || 0}</strong></span>
          </div>
        </div>


        {/* 5. PUSH NOTIFICATIONS SECTION */}
        {adminSection === 'push_notifications' && (
          <PushNotificationsSection showToast={showToast} />
        )}

        {/* ── Delete User Confirmation Modal ─────────────────────────────── */}
        {deleteUserTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-3xl border border-rose-500/30 bg-card shadow-2xl p-7 space-y-5">
              {/* Icon + Title */}
              <div className="flex flex-col items-center text-center gap-3">
                <div className="size-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                  <Trash2 className="size-7 text-rose-600" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-foreground">Delete User Account?</h2>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    This will <strong className="text-rose-600">permanently delete</strong> the user and all their cards, invitations, and wishes. This cannot be undone.
                  </p>
                </div>
              </div>

              {/* User preview */}
              <div className="rounded-2xl border border-border bg-muted/40 p-4 space-y-1">
                <div className="text-sm font-bold text-foreground">{deleteUserTarget.name}</div>
                <div className="text-xs text-muted-foreground font-mono">{deleteUserTarget.email}</div>
                <div className="text-[11px] text-muted-foreground/70 font-mono">UID: {deleteUserTarget.uid}</div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isDeletingUser}
                  onClick={() => setDeleteUserTarget(null)}
                  className="flex-1 rounded-2xl font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  disabled={isDeletingUser}
                  onClick={handleConfirmDeleteUser}
                  className="flex-1 rounded-2xl font-extrabold bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center gap-2"
                >
                  {isDeletingUser ? (
                    <><RefreshCw className="size-4 animate-spin" /> Deleting…</>
                  ) : (
                    <><Trash2 className="size-4" /> Yes, Delete</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ── Delete Card & Cascade Modal ─────────────────────────────────── */}
        {deleteCardTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-lg rounded-3xl border border-rose-500/30 bg-card shadow-2xl p-6 sm:p-7 space-y-5">
              {/* Icon & Title */}
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                  <Trash2 className="size-6 text-rose-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 border border-rose-500/20">
                      Permanent Cascade Delete
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground uppercase">
                      {deleteCardTarget.cardType === 'invite' ? '💍 Invitation' : deleteCardTarget.cardType === 'wish' ? '🎂 Wish Card' : deleteCardTarget.cardType === 'vcard' ? '📇 Visiting Card' : deleteCardTarget.cardType === 'magic' ? '🪄 Magic Link' : '📜 Poetry'}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-foreground mt-1 truncate">
                    Delete &quot;{deleteCardTarget.title}&quot;?
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                    Slug: /{deleteCardTarget.cardType === 'invite' ? 'i' : deleteCardTarget.cardType === 'wish' ? 'w' : deleteCardTarget.cardType === 'vcard' ? 'v' : deleteCardTarget.cardType === 'magic' ? 'm' : 'p'}/{deleteCardTarget.slug}
                  </p>
                </div>
              </div>

              {/* Affected Data Breakdown */}
              <div className="rounded-2xl border border-border bg-muted/30 p-4 space-y-3">
                <div className="text-xs font-bold text-foreground flex items-center justify-between">
                  <span>Affected Analytics & Counters</span>
                  <span className="text-[11px] font-normal text-muted-foreground">Owner: {deleteCardTarget.owner || 'Guest'}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-card border border-border/80 shadow-2xs">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">Views to Erase</div>
                    <div className="text-sm sm:text-base font-black text-foreground font-mono">{deleteCardTarget.views.toLocaleString()}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-card border border-border/80 shadow-2xs">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">Shares to Erase</div>
                    <div className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">{deleteCardTarget.totalShares.toLocaleString()}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-card border border-border/80 shadow-2xs">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">Likes / Reactions</div>
                    <div className="text-sm sm:text-base font-black text-rose-600 dark:text-rose-400 font-mono">{deleteCardTarget.likes.toLocaleString()}</div>
                  </div>
                </div>

                {/* Linked Records Warning */}
                {deleteCardTarget.rsvpsCount > 0 && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 flex items-center gap-2">
                    <AlertTriangle className="size-4 shrink-0 text-amber-600" />
                    <span>
                      <strong>{deleteCardTarget.rsvpsCount} Linked RSVPs</strong> will be permanently wiped from the database.
                    </span>
                  </div>
                )}

                {deleteCardTarget.guestbookCount > 0 && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 flex items-center gap-2">
                    <AlertTriangle className="size-4 shrink-0 text-amber-600" />
                    <span>
                      <strong>{deleteCardTarget.guestbookCount} Wishes Wall entries</strong> will be permanently erased.
                    </span>
                  </div>
                )}

                <p className="text-[11px] text-muted-foreground leading-relaxed pt-1">
                  Deleting this card removes all traces from Firestore database and local storage. Global admin total views, shares, and card counts will immediately decrement.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isDeletingCard}
                  onClick={() => setDeleteCardTarget(null)}
                  className="flex-1 rounded-2xl font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  disabled={isDeletingCard}
                  onClick={executeDeleteCard}
                  className="flex-1 rounded-2xl font-extrabold bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20"
                >
                  {isDeletingCard ? (
                    <><RefreshCw className="size-4 animate-spin" /> Purging Card…</>
                  ) : (
                    <><Trash2 className="size-4" /> Purge Permanently</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ── Adjust & Sync Card Metrics Modal ────────────────────────────── */}
        {metricAdjustmentTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-lg rounded-3xl border border-indigo-500/30 bg-card shadow-2xl p-6 sm:p-7 space-y-5">
              {/* Icon & Title */}
              <div className="flex items-start justify-between gap-3 border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <Sliders className="size-5 text-indigo-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">
                        Card Metrics Controller
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-muted text-muted-foreground uppercase">
                        {metricAdjustmentTarget.cardType}
                      </span>
                    </div>
                    <h2 className="text-base font-extrabold text-foreground mt-0.5 truncate max-w-xs">
                      {metricAdjustmentTarget.title}
                    </h2>
                    <p className="text-[11px] text-muted-foreground font-mono">
                      Slug: {metricAdjustmentTarget.slug}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMetricAdjustmentTarget(null)}
                  className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                >
                  <XCircle className="size-5" />
                </button>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {/* Metric 1: Likes & Reactions */}
                <div className="p-4 rounded-2xl border border-border bg-muted/20 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Heart className="size-4 text-rose-500 fill-rose-500" />
                      Likes & Reactions
                    </span>
                    <span className="text-lg font-black text-rose-600 font-mono">
                      {metricAdjustmentTarget.likes}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={isAdjustingMetric || metricAdjustmentTarget.likes <= 0}
                      onClick={() => executeAdjustMetric('likes', 'decrement')}
                      className="rounded-xl text-xs font-bold text-rose-600 border-rose-500/20 hover:bg-rose-500/10"
                      title="Reduce likes by 1"
                    >
                      <Minus className="size-3.5 mr-1" /> -1 Like
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={isAdjustingMetric}
                      onClick={() => executeAdjustMetric('likes', 'increment')}
                      className="rounded-xl text-xs font-bold text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/10"
                      title="Add 1 like"
                    >
                      <Plus className="size-3.5 mr-1" /> +1 Like
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={isAdjustingMetric || metricAdjustmentTarget.likes === 0}
                      onClick={() => executeAdjustMetric('likes', 'reset')}
                      className="rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground"
                      title="Reset likes to 0"
                    >
                      <RotateCcw className="size-3.5 mr-1" /> Reset (0)
                    </Button>
                  </div>

                  {/* Custom Set */}
                  <div className="flex items-center gap-2 pt-1">
                    <Input
                      type="number"
                      min="0"
                      value={customLikesInput}
                      onChange={(e) => setCustomLikesInput(e.target.value)}
                      placeholder="Set exact likes"
                      className="h-8 text-xs rounded-xl bg-card border-border/80 w-32"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      disabled={isAdjustingMetric || customLikesInput === ''}
                      onClick={() => executeAdjustMetric('likes', 'set', Math.max(0, parseInt(customLikesInput) || 0))}
                      className="h-8 rounded-xl text-xs font-bold"
                    >
                      Set Likes
                    </Button>
                  </div>
                </div>

                {/* Metric 2: Views */}
                <div className="p-4 rounded-2xl border border-border bg-muted/20 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Eye className="size-4 text-amber-500" />
                      Card Views
                    </span>
                    <span className="text-lg font-black text-amber-600 font-mono">
                      {metricAdjustmentTarget.views.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={isAdjustingMetric || metricAdjustmentTarget.views <= 0}
                      onClick={() => executeAdjustMetric('views', 'decrement')}
                      className="rounded-xl text-xs font-bold text-amber-600 border-amber-500/20 hover:bg-amber-500/10"
                      title="Reduce views by 1"
                    >
                      <Minus className="size-3.5 mr-1" /> -1 View
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={isAdjustingMetric}
                      onClick={() => executeAdjustMetric('views', 'increment')}
                      className="rounded-xl text-xs font-bold text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/10"
                      title="Add 10 views"
                    >
                      <Plus className="size-3.5 mr-1" /> +10 Views
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={isAdjustingMetric || metricAdjustmentTarget.views === 0}
                      onClick={() => executeAdjustMetric('views', 'reset')}
                      className="rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground"
                      title="Reset views to 0"
                    >
                      <RotateCcw className="size-3.5 mr-1" /> Reset (0)
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Input
                      type="number"
                      min="0"
                      value={customViewsInput}
                      onChange={(e) => setCustomViewsInput(e.target.value)}
                      placeholder="Set exact views"
                      className="h-8 text-xs rounded-xl bg-card border-border/80 w-32"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      disabled={isAdjustingMetric || customViewsInput === ''}
                      onClick={() => executeAdjustMetric('views', 'set', Math.max(0, parseInt(customViewsInput) || 0))}
                      className="h-8 rounded-xl text-xs font-bold"
                    >
                      Set Views
                    </Button>
                  </div>
                </div>

                {/* Metric 3: Shares */}
                <div className="p-4 rounded-2xl border border-border bg-muted/20 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Share2 className="size-4 text-emerald-500" />
                      Total Card Shares
                    </span>
                    <span className="text-lg font-black text-emerald-600 font-mono">
                      {metricAdjustmentTarget.totalShares.toLocaleString()}
                    </span>
                  </div>

                  {Object.keys(metricAdjustmentTarget.sharesBreakdown).length > 0 && (
                    <div className="text-[11px] text-muted-foreground flex flex-wrap gap-1.5 pt-1">
                      {Object.entries(metricAdjustmentTarget.sharesBreakdown).map(([ch, count]) => (
                        <span key={ch} className="px-2 py-0.5 rounded-lg bg-card border border-border font-mono text-[10px]">
                          {ch}: <strong>{count}</strong>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={isAdjustingMetric || metricAdjustmentTarget.totalShares === 0}
                      onClick={() => executeAdjustMetric('shares', 'reset')}
                      className="rounded-xl text-xs font-bold text-rose-600 border-rose-500/20 hover:bg-rose-500/10"
                      title="Reset all shares to 0"
                    >
                      <RotateCcw className="size-3.5 mr-1" /> Reset All Shares to 0
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-border">
                <Button
                  type="button"
                  onClick={() => setMetricAdjustmentTarget(null)}
                  className="rounded-xl font-bold px-6"
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        )}
        {viewingPoetryFlyer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
            <div className="w-full max-w-4xl rounded-3xl border border-border bg-card shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="p-5 border-b border-border flex items-center justify-between gap-3 bg-muted/20">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
                    <Feather className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-extrabold text-foreground truncate">
                      Story Flyer & Verse Audit: {viewingPoetryFlyer.poem.title || viewingPoetryFlyer.activity.title}
                    </h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                      <span className="font-semibold text-foreground">{viewingPoetryFlyer.poem.poet}</span>
                      <span>•</span>
                      <span className="capitalize text-amber-500 font-bold">{viewingPoetryFlyer.activity.action?.replace('_', ' ')}</span>
                      <span>•</span>
                      <span>{viewingPoetryFlyer.activity.timestamp ? new Date(viewingPoetryFlyer.activity.timestamp).toLocaleString() : 'Recent Event'}</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setViewingPoetryFlyer(null)}
                  className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                >
                  <XCircle className="size-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Visual Story Flyer Card (Left 6 Cols) */}
                <div className="md:col-span-6 flex flex-col items-center space-y-3">
                  {/* Language Tab Switcher */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/60 border border-border text-xs w-full max-w-[340px] justify-center">
                    <button
                      type="button"
                      onClick={() => setAdminFlyerTab('original')}
                      className={cn(
                        'px-2.5 py-1 rounded-lg font-bold transition-all text-xs cursor-pointer',
                        adminFlyerTab === 'original' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      Original ({(viewingPoetryFlyer.poem.originalLanguage || 'ur').toUpperCase()})
                    </button>
                    {viewingPoetryFlyer.poem.originalLanguage !== 'ur' && (
                      <button
                        type="button"
                        onClick={() => setAdminFlyerTab('urdu')}
                        className={cn(
                          'px-2.5 py-1 rounded-lg font-bold transition-all text-xs cursor-pointer',
                          adminFlyerTab === 'urdu' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        Urdu
                      </button>
                    )}
                    {viewingPoetryFlyer.poem.romanText && (
                      <button
                        type="button"
                        onClick={() => setAdminFlyerTab('roman')}
                        className={cn(
                          'px-2.5 py-1 rounded-lg font-bold transition-all text-xs cursor-pointer',
                          adminFlyerTab === 'roman' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        Roman
                      </button>
                    )}
                    {viewingPoetryFlyer.poem.englishTranslation && (
                      <button
                        type="button"
                        onClick={() => setAdminFlyerTab('english')}
                        className={cn(
                          'px-2.5 py-1 rounded-lg font-bold transition-all text-xs cursor-pointer',
                          adminFlyerTab === 'english' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        English
                      </button>
                    )}
                  </div>

                  {/* Flyer Card Preview (Adjusted Height) */}
                  {(() => {
                    const p = viewingPoetryFlyer.poem
                    let activeText = p.originalText || p.title || ''
                    let isRtl = p.direction !== 'ltr'
                    let tabLabel = (p.originalLanguage || 'ur').toUpperCase()

                    if (adminFlyerTab === 'urdu') {
                      activeText = p.urduTranslation || p.originalText
                      isRtl = true
                      tabLabel = 'URDU'
                    } else if (adminFlyerTab === 'roman') {
                      activeText = p.romanText || p.originalText
                      isRtl = false
                      tabLabel = 'ROMAN URDU'
                    } else if (adminFlyerTab === 'english') {
                      activeText = p.englishTranslation || p.originalText
                      isRtl = false
                      tabLabel = 'ENGLISH'
                    }

                    const poetProfile = POET_PROFILES[p.poet] || Object.values(POET_PROFILES).find((pr) => pr.name.toLowerCase().includes(p.poet.toLowerCase()) || p.poet.toLowerCase().includes(pr.name.toLowerCase()))
                    const poetEra = p.poetEra || poetProfile?.era || ''
                    const poetDisplay = isRtl ? (p.poetUrdu || p.poet) : p.poet

                    return (
                      <div className="w-full max-w-[340px] rounded-3xl p-5 bg-gradient-to-br from-[#051f15] via-[#02120b] to-[#080f18] border-2 border-amber-500/60 shadow-2xl relative overflow-hidden text-center text-white space-y-3.5">
                        {/* Ornate corners */}
                        <div className="text-[10px] text-amber-400 font-bold tracking-widest flex items-center justify-between border-b border-amber-500/30 pb-2">
                          <span>✦ ❖ ✦</span>
                          <span className="text-[9px] uppercase tracking-wider text-emerald-300">
                            {p.categoryLabel || 'Masterpiece'} • {tabLabel}
                          </span>
                          <span>✦ ❖ ✦</span>
                        </div>

                        {/* Top: Poet Name & Years */}
                        <div className="space-y-0.5">
                          <h4 className={cn("text-base font-extrabold text-amber-200", isRtl ? "font-serif" : "font-serif")}>
                            {poetDisplay}
                          </h4>
                          {poetEra && (
                            <p className="text-[11px] text-slate-400 font-medium">({poetEra})</p>
                          )}
                        </div>

                        {/* Single Language Verse Box */}
                        <div className="p-4 rounded-2xl bg-black/50 border border-amber-500/30 space-y-2">
                          <p className={cn("font-medium leading-relaxed whitespace-pre-line text-xs break-words", isRtl ? "font-serif text-amber-100 text-sm" : "italic text-slate-100 font-serif")} dir={isRtl ? 'rtl' : 'ltr'}>
                            {activeText}
                          </p>
                        </div>

                        {/* Footer branding */}
                        <div className="pt-2 border-t border-amber-500/30 text-[10px] text-amber-400/90 font-mono">
                          ✦ Powered by Cardzy.online ✦
                        </div>
                      </div>
                    )
                  })()}
                </div>

                {/* Event Details & Controls (Right 6 Cols) */}
                <div className="md:col-span-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-muted/30 border border-border space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Event Interaction Metadata
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground block text-[11px]">Action Type:</span>
                          <span className="font-bold capitalize text-foreground">{viewingPoetryFlyer.activity.action?.replace('_', ' ')}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[11px]">Channel:</span>
                          <span className="font-bold text-foreground font-mono">{viewingPoetryFlyer.activity.channel || 'web'}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[11px]">Poem ID:</span>
                          <span className="font-mono text-[10px] text-muted-foreground truncate block">{viewingPoetryFlyer.poem.id}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[11px]">Language:</span>
                          <span className="font-bold uppercase text-foreground">{viewingPoetryFlyer.poem.originalLanguage || 'ur'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-foreground">Poetry Full Details:</h4>
                      <div className="p-3.5 rounded-xl bg-card border border-border text-xs space-y-2">
                        <div className="font-semibold text-foreground text-sm">{viewingPoetryFlyer.poem.title}</div>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-xs font-serif" dir="rtl">
                          {viewingPoetryFlyer.poem.originalText}
                        </p>
                        {viewingPoetryFlyer.poem.englishTranslation && (
                          <div className="pt-2 border-t border-border/60 text-muted-foreground text-[11px] italic">
                            Translation: "{viewingPoetryFlyer.poem.englishTranslation}"
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        type="button"
                        onClick={async () => {
                          const p = viewingPoetryFlyer.poem
                          let activeText = p.originalText || p.title || ''
                          let isRtl = p.direction !== 'ltr'
                          let tabLabel = (p.originalLanguage || 'ur').toUpperCase()

                          if (adminFlyerTab === 'urdu') {
                            activeText = p.urduTranslation || p.originalText
                            isRtl = true
                            tabLabel = 'URDU'
                          } else if (adminFlyerTab === 'roman') {
                            activeText = p.romanText || p.originalText
                            isRtl = false
                            tabLabel = 'ROMAN URDU'
                          } else if (adminFlyerTab === 'english') {
                            activeText = p.englishTranslation || p.originalText
                            isRtl = false
                            tabLabel = 'ENGLISH'
                          }

                          const cleanLines = (activeText || '')
                            .split('\n')
                            .map((l: string) => l.trim())
                            .filter((l: string) => l && !l.includes('شعر نمبر') && !l.startsWith('—'))

                          const poetProfile = POET_PROFILES[p.poet] || Object.values(POET_PROFILES).find((pr) => pr.name.toLowerCase().includes(p.poet.toLowerCase()) || p.poet.toLowerCase().includes(pr.name.toLowerCase()))
                          const poetEra = p.poetEra || poetProfile?.era || ''
                          const poetDisplay = isRtl ? (p.poetUrdu || p.poet) : p.poet

                          if (typeof document !== 'undefined' && document.fonts) {
                            try {
                              await document.fonts.ready
                            } catch (e) {}
                          }

                          const canvas = document.createElement('canvas')
                          canvas.width = 1080
                          const tempCtx = canvas.getContext('2d')
                          if (!tempCtx) return

                          const maxWidth = isRtl ? 820 : 840
                          const fontDeclaration = isRtl
                            ? 'bold 32px "Noto Nastaliq Urdu", "Jameel Noori Nastaleeq", "Urdu Typesetting", "Scheherazade New", "Traditional Arabic", serif'
                            : 'italic bold 28px "Georgia", "Times New Roman", serif'

                          tempCtx.font = fontDeclaration

                          const wrappedLines: string[] = []
                          cleanLines.forEach((origLine: string) => {
                            const words = origLine.split(' ')
                            let currentLine = ''
                            for (let w = 0; w < words.length; w++) {
                              const testLine = currentLine ? currentLine + ' ' + words[w] : words[w]
                              if (tempCtx.measureText(testLine).width > maxWidth && currentLine) {
                                wrappedLines.push(currentLine)
                                currentLine = words[w]
                              } else {
                                currentLine = testLine
                              }
                            }
                            if (currentLine) {
                              wrappedLines.push(currentLine)
                            }
                          })

                          const lineHeight = isRtl ? 86 : 52
                          const verseBoxHeight = Math.max(isRtl ? 190 : 160, wrappedLines.length * lineHeight + (isRtl ? 80 : 60))
                          const headerHeight = poetEra ? 215 : 185
                          const footerHeight = 110
                          const calculatedHeight = Math.max(580, headerHeight + verseBoxHeight + footerHeight)

                          canvas.height = calculatedHeight
                          const ctx = canvas.getContext('2d')
                          if (!ctx) return

                          // Background
                          const gradient = ctx.createLinearGradient(0, 0, 1080, canvas.height)
                          gradient.addColorStop(0, '#051f15')
                          gradient.addColorStop(0.4, '#02120b')
                          gradient.addColorStop(0.75, '#04161d')
                          gradient.addColorStop(1, '#080f18')
                          ctx.fillStyle = gradient
                          ctx.fillRect(0, 0, 1080, canvas.height)

                          // Double Gold Borders
                          ctx.lineWidth = 8
                          ctx.strokeStyle = '#d97706'
                          ctx.strokeRect(28, 28, 1024, canvas.height - 56)

                          ctx.lineWidth = 1.5
                          ctx.strokeStyle = '#fef08a'
                          ctx.strokeRect(40, 40, 1000, canvas.height - 80)

                          // Corner rosettes
                          ctx.fillStyle = '#fbbf24'
                          ctx.font = '24px sans-serif'
                          ctx.textAlign = 'center'
                          ctx.textBaseline = 'middle'
                          ctx.fillText('✦ ❖ ✦', 110, 75)
                          ctx.fillText('✦ ❖ ✦', 970, 75)
                          ctx.fillText('✦ ❖ ✦', 110, canvas.height - 55)
                          ctx.fillText('✦ ❖ ✦', 970, canvas.height - 55)

                          // Top: Poet Name & Years
                          let topY = 90
                          ctx.fillStyle = '#fde68a'
                          ctx.font = isRtl
                            ? 'bold 34px "Noto Nastaliq Urdu", "Traditional Arabic", serif'
                            : 'bold 32px "Georgia", "Times New Roman", serif'
                          ctx.fillText(poetDisplay, 540, topY)

                          if (poetEra) {
                            topY += 38
                            ctx.fillStyle = '#94a3b8'
                            ctx.font = 'bold 18px sans-serif'
                            ctx.fillText(`(${poetEra})`, 540, topY)
                          }

                          topY += 32
                          ctx.fillStyle = '#6ee7b7'
                          ctx.font = 'bold 15px sans-serif'
                          const catLabel = (p.categoryLabel || 'Masterpiece').toUpperCase()
                          ctx.fillText(`✦ ${catLabel} ✦`, 540, topY)

                          topY += 22
                          ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)'
                          ctx.lineWidth = 1.5
                          ctx.beginPath()
                          ctx.moveTo(220, topY)
                          ctx.lineTo(860, topY)
                          ctx.stroke()

                          // Middle: Verse Box
                          const boxTop = topY + 22
                          const boxWidth = 940
                          const boxLeft = 70

                          ctx.fillStyle = 'rgba(15, 23, 42, 0.75)'
                          ctx.fillRect(boxLeft, boxTop, boxWidth, verseBoxHeight)
                          ctx.strokeStyle = 'rgba(251, 191, 36, 0.35)'
                          ctx.lineWidth = 1.5
                          ctx.strokeRect(boxLeft, boxTop, boxWidth, verseBoxHeight)

                          // Verse text
                          ctx.fillStyle = '#ffffff'
                          ctx.font = fontDeclaration
                          ctx.textAlign = 'center'
                          ctx.textBaseline = 'middle'

                          let verseY = boxTop + (isRtl ? 45 : 35) + (lineHeight / 2)
                          wrappedLines.forEach((line) => {
                            ctx.fillText(line.trim(), 540, verseY)
                            verseY += lineHeight
                          })

                          // Footer
                          const footerY = boxTop + verseBoxHeight + 35
                          ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)'
                          ctx.beginPath()
                          ctx.moveTo(260, footerY)
                          ctx.lineTo(820, footerY)
                          ctx.stroke()

                          ctx.fillStyle = '#fef08a'
                          ctx.font = 'bold 18px sans-serif'
                          ctx.textBaseline = 'middle'
                          ctx.fillText('✦ Powered by Cardzy.online ✦', 540, footerY + 30)

                          const link = document.createElement('a')
                          link.download = `cardzy-story-card-${(p.title || 'poetry').toLowerCase().replace(/[^a-z0-9]/g, '-')}-${adminFlyerTab}.png`
                          link.href = canvas.toDataURL('image/png')
                          link.click()
                          showToast(`Story Card PNG (${tabLabel}) Downloaded!`, 'success')
                        }}
                        className="flex-1 rounded-xl font-bold bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2 text-xs"
                      >
                        <Download className="size-4" /> Download Story Card (PNG)
                      </Button>

                      <Link
                        href={`/poetry?poem=${viewingPoetryFlyer.poem.id}`}
                        target="_blank"
                        className="px-4 py-2 rounded-xl border border-border bg-muted/60 hover:bg-muted text-foreground text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="size-3.5" />
                        <span>Poetry Explorer</span>
                      </Link>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const p = viewingPoetryFlyer.poem
                            promptAdjustMetrics('poetry', { id: p.id, title: p.title, poemId: p.id })
                          }}
                          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-500/10 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer border border-indigo-500/20"
                        >
                          <Sliders className="size-3.5" />
                          Adjust Poem Metrics
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleDeletePoetryActivity(viewingPoetryFlyer.activity.id || viewingPoetryFlyer.activity.docId, viewingPoetryFlyer.activity.poemId, e)}
                          className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-500/10 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Trash2 className="size-3.5" />
                          Delete Event
                        </button>
                      </div>

                      <Button
                        variant="outline"
                        onClick={() => setViewingPoetryFlyer(null)}
                        className="rounded-xl text-xs font-bold"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Universal Share, QR & Image Export Modal */}
        <CardShareModal
          card={shareModalCard}
          onClose={() => setShareModalCard(null)}
        />
    </div>
  )
}

function StatCard({
  icon,
  title,
  value,
  subtitle,
  highlight = false,
}: {
  icon: React.ReactNode
  title: string
  value: string | number
  subtitle: string
  highlight?: boolean
}) {
  return (
    <div
      className={cn(
        'p-5 rounded-3xl border transition-all shadow-sm',
        highlight
          ? 'bg-gradient-to-br from-emerald-500/10 via-card to-card border-emerald-500/30'
          : 'bg-card border-border'
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground">{title}</span>
        <div className="p-2 rounded-2xl bg-muted/60">{icon}</div>
      </div>
      <div className="mt-3 text-2xl font-extrabold text-foreground tracking-tight">{value}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{subtitle}</div>
    </div>
  )
}

function PushNotificationsSection({ showToast }: { showToast: (msg: string, type: 'success' | 'error' | 'info') => void }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [url, setUrl] = useState('/')
  const [isSending, setIsSending] = useState(false)
  const [subscribersCount, setSubscribersCount] = useState(0)
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedNotifForDevices, setSelectedNotifForDevices] = useState<any | null>(null)
  const [subscribersList, setSubscribersList] = useState<any[]>([])

  // Search & Pagination States (Default 30 records per page)
  const [subSearch, setSubSearch] = useState('')
  const [pageSubs, setPageSubs] = useState(1)
  const [pageSizeSubs, setPageSizeSubs] = useState(30)

  const [notifSearch, setNotifSearch] = useState('')
  const [pageNotifs, setPageNotifs] = useState(1)
  const [pageSizeNotifs, setPageSizeNotifs] = useState(30)

  useEffect(() => {
    let unsubscribeNotifs = () => {}
    let unsubscribeSubs = () => {}
    
    async function loadData() {
      try {
        const firestoreDb = getFirebaseDb()
        if (!firestoreDb) return

        // Real-time listener for push subscribers
        const subQ = query(collection(firestoreDb, 'push_subscribers'), limit(500))
        unsubscribeSubs = onSnapshot(subQ, (subSnap) => {
          setSubscribersCount(subSnap.size)
          setSubscribersList(subSnap.docs.map(d => ({ id: d.id, ...d.data() })))
        }, (err) => {
          console.error("Error listening to push_subscribers", err)
        })

        // Real-time listener for notifications history
        const q = query(collection(firestoreDb, 'push_notifications'), orderBy('sentAt', 'desc'), limit(500))
        unsubscribeNotifs = onSnapshot(q, (snap) => {
          const notifs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          setNotifications(notifs)
          setLoading(false)
        }, (err) => {
          console.error("Error listening to push_notifications", err)
          setLoading(false)
        })
      } catch (err) {
        console.error("Error loading push data", err)
        setLoading(false)
      }
    }
    
    loadData()
    return () => {
      unsubscribeNotifs()
      unsubscribeSubs()
    }
  }, [])

  const filteredSubscribers = useMemo(() => {
    if (!subSearch.trim()) return subscribersList
    const q = subSearch.toLowerCase().trim()
    return subscribersList.filter(s =>
      (s.userAgent && s.userAgent.toLowerCase().includes(q)) ||
      (s.id && s.id.toLowerCase().includes(q)) ||
      (s.endpoint && s.endpoint.toLowerCase().includes(q))
    )
  }, [subscribersList, subSearch])

  const paginatedSubs = useMemo(() => {
    const start = (pageSubs - 1) * pageSizeSubs
    return filteredSubscribers.slice(start, start + pageSizeSubs)
  }, [filteredSubscribers, pageSubs, pageSizeSubs])

  const filteredNotifs = useMemo(() => {
    if (!notifSearch.trim()) return notifications
    const q = notifSearch.toLowerCase().trim()
    return notifications.filter(n =>
      (n.title && n.title.toLowerCase().includes(q)) ||
      (n.body && n.body.toLowerCase().includes(q)) ||
      (n.url && n.url.toLowerCase().includes(q)) ||
      (n.status && n.status.toLowerCase().includes(q))
    )
  }, [notifications, notifSearch])

  const paginatedNotifs = useMemo(() => {
    const start = (pageNotifs - 1) * pageSizeNotifs
    return filteredNotifs.slice(start, start + pageSizeNotifs)
  }, [filteredNotifs, pageNotifs, pageSizeNotifs])

  const handleSend = async () => {
    if (!title.trim() || !body.trim()) {
      showToast('Title and message are required', 'error')
      return
    }
    if (!confirm(`Are you sure you want to send this notification to ${subscribersCount} subscriber(s)?`)) return

    setIsSending(true)
    try {
      const res = await fetch('/api/push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), body: body.trim(), url: url.trim() || '/' })
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send')
      
      if (data.warning) {
        showToast(data.warning, 'info')
      } else {
        showToast(data.message || `Push notification dispatched to ${data.sentCount || 0} device(s)!`, 'success')
      }
      setTitle('')
      setBody('')
      setUrl('/')
    } catch (err: any) {
      console.error(err)
    } finally {
      setIsSending(false)
    }
  }

  const handleTestLocalNotification = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      showToast('Notifications are not supported in this browser.', 'error')
      return
    }

    if (Notification.permission === 'denied') {
      showToast('Notifications are BLOCKED in browser or macOS settings. Click the lock icon in address bar to Allow.', 'error')
      return
    }

    if (Notification.permission !== 'granted') {
      const perm = await Notification.requestPermission()
      if (perm !== 'granted') {
        showToast('Notification permission was not granted.', 'error')
        return
      }
    }

    if (navigator.serviceWorker && navigator.serviceWorker.ready) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.showNotification('Desktop Push Test 🔔', {
          body: 'If you see this banner, your Mac / Desktop notifications are 100% working!',
          icon: '/android-chrome-192x192.png',
          badge: '/favicon-32x32.png',
          requireInteraction: true,
          data: { url: '/admin_portal' }
        })
        showToast('Test notification banner fired! Check your Mac screen (top-right).', 'success')
      }).catch((e) => {
        showToast('Service Worker error: ' + e.message, 'error')
      })
    } else {
      try {
        new Notification('Desktop Push Test 🔔', {
          body: 'If you see this banner, your Mac / Desktop notifications are 100% working!',
          icon: '/android-chrome-192x192.png',
          badge: '/favicon-32x32.png',
        })
        showToast('Test notification banner fired! Check your Mac screen (top-right).', 'success')
      } catch (e: any) {
        showToast('Error firing notification: ' + e.message, 'error')
      }
    }
  }

  const handleDeleteNotification = async (notifId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (!confirm('Are you sure you want to delete this notification record from history?')) return
    try {
      const firestoreDb = getFirebaseDb()
      if (!firestoreDb) return
      await deleteDoc(doc(firestoreDb, 'push_notifications', notifId))
      showToast('Notification deleted from history', 'success')
      if (selectedNotifForDevices?.id === notifId) {
        setSelectedNotifForDevices(null)
      }
    } catch (err: any) {
      console.error(err)
      showToast(err.message || 'Failed to delete notification', 'error')
    }
  }

  const handleDeleteSubscriber = async (subId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (!confirm('Are you sure you want to remove this device subscriber?')) return
    try {
      const firestoreDb = getFirebaseDb()
      if (!firestoreDb) return
      await deleteDoc(doc(firestoreDb, 'push_subscribers', subId))
      showToast('Device removed from subscribers', 'success')
    } catch (err: any) {
      console.error(err)
      showToast(err.message || 'Failed to remove device', 'error')
    }
  }

  const latestNotif = notifications[0]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl border bg-card border-border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Total Subscribers</span>
            <div className="p-2 rounded-2xl bg-indigo-500/10 text-indigo-500"><Users className="size-5" /></div>
          </div>
          <div className="mt-3 text-2xl font-extrabold">{subscribersCount}</div>
          <div className="mt-0.5 text-xs text-muted-foreground">Opted-in browsers & phones</div>
        </div>
        
        {latestNotif && (
          <>
            <div className="p-5 rounded-3xl border bg-card border-border shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">Latest Dispatched</span>
                <div className="p-2 rounded-2xl bg-emerald-500/10 text-emerald-500"><Send className="size-5" /></div>
              </div>
              <div className="mt-3 text-2xl font-extrabold">{latestNotif.sentCount || 0}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">Targeted devices</div>
            </div>
            
            <div className="p-5 rounded-3xl border bg-card border-border shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">Opened / Clicked</span>
                <div className="p-2 rounded-2xl bg-amber-500/10 text-amber-500"><MousePointerClick className="size-5" /></div>
              </div>
              <div className="mt-3 text-2xl font-extrabold">{latestNotif.clickedCount || 0}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">Opened from notification</div>
            </div>

            <div className="p-5 rounded-3xl border bg-card border-border shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">Missed / Unopened</span>
                <div className="p-2 rounded-2xl bg-rose-500/10 text-rose-500"><XCircle className="size-5" /></div>
              </div>
              <div className="mt-3 text-2xl font-extrabold">{Math.max(0, (latestNotif.sentCount || 0) - (latestNotif.clickedCount || 0))}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">Not yet clicked</div>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 border border-border bg-card rounded-3xl p-6 shadow-sm space-y-4 flex flex-col">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Bell className="size-5 text-indigo-500" />
            Send New Push Notification
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Title / Heading</label>
              <Input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g. 🕌 Ramadan Mubarak Special!" 
                className="rounded-xl"
              />
            </div>
            
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Message Body</label>
              <textarea 
                className="flex w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                value={body} 
                onChange={(e) => setBody(e.target.value)} 
                placeholder="Write message to display on user's browser / phone screen..."
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Destination Page URL</label>
              <Input 
                value={url} 
                onChange={(e) => setUrl(e.target.value)} 
                placeholder="/ or /calendar or /create-wish" 
                className="rounded-xl"
              />
              <p className="text-[11px] text-muted-foreground mt-1">When user clicks notification, this tab/page will open.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <Button 
                onClick={handleSend} 
                disabled={isSending || !title || !body} 
                className="flex-1 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {isSending ? <RefreshCw className="size-4 animate-spin mr-2" /> : <Send className="size-4 mr-2" />}
                {isSending ? 'Sending to all...' : `Send to All (${subscribersCount})`}
              </Button>
              <Button 
                type="button"
                onClick={handleTestLocalNotification}
                variant="outline"
                className="rounded-xl font-bold border-indigo-500/30 text-indigo-600 hover:bg-indigo-500/10"
                title="Test native notification banner immediately on this Mac / Desktop"
              >
                🔔 Test Mac Banner
              </Button>
            </div>
          </div>

          {/* Subscribed Devices Quick List */}
          <div className="pt-3 border-t border-border/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Smartphone className="size-3.5 text-indigo-500" />
                Subscribed Devices ({filteredSubscribers.length})
              </span>
              <span className="text-[10px] text-muted-foreground">Auto-synced</span>
            </div>

            {/* Subscriber search input */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search subscribers..."
                value={subSearch}
                onChange={(e) => {
                  setSubSearch(e.target.value)
                  setPageSubs(1)
                }}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-muted/40 border border-border/60 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {filteredSubscribers.length === 0 ? (
              <p className="text-xs text-muted-foreground italic py-2">
                {subSearch ? 'No subscribers match search.' : 'No devices registered yet.'}
              </p>
            ) : (
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {paginatedSubs.map((sub, idx) => {
                  const ua = sub.userAgent || '';
                  const isIPhone = /iPhone/i.test(ua);
                  const isAndroid = /Android/i.test(ua);
                  const isMac = /Macintosh|Mac OS X/i.test(ua);
                  const isWindows = /Windows/i.test(ua);
                  const devLabel = isIPhone ? 'iPhone 📱' : isAndroid ? 'Android 📱' : isMac ? 'Mac 💻' : isWindows ? 'Windows 💻' : 'Device 📱';
                  const browserLabel = /Chrome/i.test(ua) ? 'Chrome' : /Safari/i.test(ua) ? 'Safari' : /Firefox/i.test(ua) ? 'Firefox' : /Edg/i.test(ua) ? 'Edge' : 'Browser';
                  return (
                    <div key={sub.id || idx} className="flex items-center justify-between p-2 rounded-xl bg-muted/40 text-xs border border-border/40 group hover:border-border transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{devLabel}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-background text-muted-foreground border border-border">{browserLabel}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-emerald-500 font-bold">Ready ✅</span>
                        <button
                          onClick={(e) => handleDeleteSubscriber(sub.id, e)}
                          className="p-1 rounded-md text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Remove this subscriber device"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <AdminTablePagination
              currentPage={pageSubs}
              totalItems={filteredSubscribers.length}
              pageSize={pageSizeSubs}
              onPageChange={setPageSubs}
              onPageSizeChange={setPageSizeSubs}
              itemName="devices"
            />
          </div>
        </div>

        <div className="lg:col-span-2 border border-border bg-card rounded-3xl p-6 shadow-sm overflow-hidden flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                <CheckCircle2 className="size-5 text-emerald-500" />
                Push History & Device Breakdown ({filteredNotifs.length})
              </h3>
              <span className="text-xs text-muted-foreground font-medium">Click any row to view device audit</span>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search history..."
                value={notifSearch}
                onChange={(e) => {
                  setNotifSearch(e.target.value)
                  setPageNotifs(1)
                }}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-muted/40 border border-border/80 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto flex-1 -mx-6 px-6">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/30 sticky top-0">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Title & Body</th>
                  <th className="px-4 py-3">Destination</th>
                  <th className="px-4 py-3">Dispatched</th>
                  <th className="px-4 py-3">Opened</th>
                  <th className="px-4 py-3">Missed</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-r-xl">Date & Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} className="text-center py-8 text-muted-foreground">Loading notification history...</td></tr>
                ) : filteredNotifs.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-8 text-muted-foreground">{notifSearch ? 'No push notifications match search.' : 'No push notifications sent yet.'}</td></tr>
                ) : (
                  paginatedNotifs.map((n) => (
                    <tr 
                      key={n.id} 
                      onClick={() => setSelectedNotifForDevices(n)}
                      className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer group"
                    >
                      <td className="px-4 py-3">
                        <div className="font-bold text-foreground">{n.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{n.body}</div>
                      </td>
                      <td className="px-4 py-3 text-xs text-indigo-500 truncate max-w-[120px]">{n.url || '/'}</td>
                      <td className="px-4 py-3 font-semibold text-foreground">{n.sentCount || 0}</td>
                      <td className="px-4 py-3 font-bold text-emerald-600">{n.clickedCount || 0}</td>
                      <td className="px-4 py-3 font-medium text-rose-500">{Math.max(0, (n.sentCount || 0) - (n.clickedCount || 0))}</td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase whitespace-nowrap",
                          (n.status === 'sent' || (n.deliveredCount && n.deliveredCount > 0)) ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" :
                          (n.status === 'pending_service_key' || n.status === 'missing_server_key') ? "bg-amber-500/10 text-amber-600 border border-amber-500/20" :
                          "bg-rose-500/10 text-rose-600 border border-rose-500/20"
                        )}>
                          {(n.status === 'sent' || (n.deliveredCount && n.deliveredCount > 0)) ? 'Dispatched' : (n.status === 'pending_service_key' || n.status === 'missing_server_key') ? 'Key Missing' : 'Failed'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px]">{n.sentAt ? new Date(n.sentAt).toLocaleTimeString() : '—'}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedNotifForDevices(n);
                            }}
                            className="text-[11px] bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 font-bold px-2.5 py-1 rounded-lg border border-indigo-500/20 transition-all cursor-pointer"
                          >
                            View Devices
                          </button>
                          <button
                            onClick={(e) => handleDeleteNotification(n.id, e)}
                            className="text-[11px] bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 font-bold px-2.5 py-1 rounded-lg border border-rose-500/20 transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                            title="Delete this notification record"
                          >
                            <Trash2 className="size-3.5" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <AdminTablePagination
            currentPage={pageNotifs}
            totalItems={filteredNotifs.length}
            pageSize={pageSizeNotifs}
            onPageChange={setPageNotifs}
            onPageSizeChange={setPageSizeNotifs}
            itemName="notifications"
          />
        </div>
      </div>

      {/* ── Device Delivery Audit Modal ─────────────────────────────── */}
      {selectedNotifForDevices && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-border bg-card shadow-2xl p-6 space-y-5 max-h-[85vh] flex flex-col">
            <div className="flex items-start justify-between gap-3 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Smartphone className="size-5 text-indigo-500" />
                  Targeted Devices Audit Report
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Notification: <span className="font-semibold text-foreground">{selectedNotifForDevices.title}</span> — Sent to {selectedNotifForDevices.sentCount || 0} device(s)
                </p>
              </div>
              <button
                onClick={() => setSelectedNotifForDevices(null)}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                <XCircle className="size-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 -mx-6 px-6 space-y-3">
              {selectedNotifForDevices.devices && selectedNotifForDevices.devices.length > 0 ? (
                selectedNotifForDevices.devices.map((dev: any, i: number) => (
                  <div key={i} className="p-3.5 rounded-2xl border border-border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "size-9 rounded-xl flex items-center justify-center shrink-0",
                        dev.status === 'delivered' ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                      )}>
                        {dev.deviceType === 'Mobile' ? <Smartphone className="size-4" /> : <Monitor className="size-4" />}
                      </div>
                      <div>
                        <div className="font-bold text-foreground flex items-center gap-2">
                          {dev.deviceName || 'Web Browser Device'}
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                            dev.status === 'delivered' ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                          )}>
                            {dev.status === 'delivered' ? 'Delivered ✅' : 'Failed ❌'}
                          </span>
                        </div>
                        <div className="text-muted-foreground font-mono text-[11px] mt-0.5">Token: {dev.tokenPreview}</div>
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <div className={cn(
                        "font-medium",
                        dev.status === 'delivered' ? "text-emerald-600" : "text-rose-500"
                      )}>
                        {dev.errorReason || (dev.status === 'delivered' ? 'Delivered' : 'Delivery Failed')}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl border border-border bg-muted/20 text-xs text-muted-foreground">
                    <p className="font-semibold text-foreground mb-1">Targeted Subscribers ({selectedNotifForDevices.sentCount || 0} tokens):</p>
                    <p className="text-[11px] leading-relaxed">
                      This notification was dispatched to {selectedNotifForDevices.deliveredCount || 0} active subscriber device(s). 
                      Future notifications will record granular per-device metadata in real-time.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-between">
              <button
                onClick={(e) => handleDeleteNotification(selectedNotifForDevices.id, e)}
                className="px-3.5 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-500/10 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="size-4" />
                Delete Notification Record
              </button>
              <Button
                variant="outline"
                onClick={() => setSelectedNotifForDevices(null)}
                className="rounded-xl font-bold"
              >
                Close Audit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


