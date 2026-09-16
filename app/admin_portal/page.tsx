'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useJashn } from '@/lib/jashn/store'
import { db, getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase'
import { collection, getDocs, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { cn } from '@/lib/utils'
import type { JashnUser, Plan, Invitation, Wish, VisitingCard, RsvpGuest } from '@/lib/jashn/types'
import { SiteHeader } from '@/components/site-header'

function formatDateStandard(timestamp?: number): string {
  if (!timestamp) return '—'
  const d = new Date(timestamp)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function formatDateTime(timestamp?: number | string): string {
  if (!timestamp) return '—'
  const t = typeof timestamp === 'string' ? Number(timestamp) || Date.parse(timestamp) : timestamp
  if (!t || isNaN(t)) return '—'
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

function formatRelativeTime(timestamp?: number | string): string {
  if (!timestamp) return ''
  const t = typeof timestamp === 'string' ? Number(timestamp) || Date.parse(timestamp) : timestamp
  if (!t || isNaN(t)) return ''
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
  // If explicitly tracked and valid
  if (item.createdLocation && item.createdLocation !== 'Web Client' && item.createdLocation !== 'Unknown Country') {
    const flag = getCountryFlag(item.countryCode || item.country)
    return {
      locationText: item.createdLocation,
      flag,
      country: item.country || '',
      city: item.cityOrigin || item.city || '',
      device: item.device,
      browser: item.browser,
      ip: item.ip,
    }
  }

  // Check phone code
  const phone = item.phone || item.rsvpPhone || ''
  if (phone.startsWith('+92') || phone.startsWith('03') || phone.startsWith('92')) {
    return {
      locationText: item.city ? `${item.city}, Pakistan` : 'Pakistan',
      flag: '🇵🇰',
      country: 'Pakistan',
      city: item.city || '',
      device: item.device,
      browser: item.browser,
      ip: item.ip,
    }
  }
  if (phone.startsWith('+971')) {
    return {
      locationText: 'Dubai, UAE',
      flag: '🇦🇪',
      country: 'UAE',
      city: item.city || 'Dubai',
      device: item.device,
      browser: item.browser,
      ip: item.ip,
    }
  }
  if (phone.startsWith('+966')) {
    return {
      locationText: 'Saudi Arabia',
      flag: '🇸🇦',
      country: 'Saudi Arabia',
      city: item.city || 'Riyadh',
      device: item.device,
      browser: item.browser,
      ip: item.ip,
    }
  }
  if (phone.startsWith('+1')) {
    return {
      locationText: 'United States',
      flag: '🇺🇸',
      country: 'USA',
      city: item.city || '',
      device: item.device,
      browser: item.browser,
      ip: item.ip,
    }
  }
  if (phone.startsWith('+44')) {
    return {
      locationText: 'United Kingdom',
      flag: '🇬🇧',
      country: 'UK',
      city: item.city || 'London',
      device: item.device,
      browser: item.browser,
      ip: item.ip,
    }
  }

  // Check venue or city or address
  const textToCheck = `${item.city || ''} ${item.venue || ''} ${item.address || ''}`.toLowerCase()
  if (
    textToCheck.includes('lahore') ||
    textToCheck.includes('karachi') ||
    textToCheck.includes('islamabad') ||
    textToCheck.includes('rawalpindi') ||
    textToCheck.includes('faisalabad') ||
    textToCheck.includes('multan') ||
    textToCheck.includes('peshawar') ||
    textToCheck.includes('quetta')
  ) {
    return {
      locationText: item.city ? `${item.city}, Pakistan` : 'Pakistan',
      flag: '🇵🇰',
      country: 'Pakistan',
      city: item.city || '',
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

export default function AdminPortalPage() {
  const [mounted, setMounted] = useState(false)
  const [isAdminAuthorized, setIsAdminAuthorized] = useState(true)
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

  const [adminSection, setAdminSection] = useState<'all' | 'invitations' | 'wishes' | 'visiting_cards' | 'rsvps' | 'users' | 'push_notifications' | 'live_users'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  // Which invitation's RSVPs to show — null means all
  const [rsvpFilterSlug, setRsvpFilterSlug] = useState<string | null>(null)

  // ── Real-Time Active Users State (Live Presence) ─────────────────────────
  const [liveActiveSessions, setLiveActiveSessions] = useState<any[]>([])

  useEffect(() => {
    let unsub = () => {}
    async function listenLivePresence() {
      try {
        const firestoreDb = getFirebaseDb()
        if (!firestoreDb) return
        const collRef = collection(firestoreDb, 'active_sessions')
        unsub = onSnapshot(collRef, (snap) => {
          const threshold = Date.now() - 65000 // Active within the last 65 seconds
          const sessions = snap.docs
            .map((doc) => ({ id: doc.id, ...doc.data() } as any))
            .filter((s) => s.lastSeen && s.lastSeen >= threshold)
            .sort((a, b) => (b.lastSeen || 0) - (a.lastSeen || 0))
          setLiveActiveSessions(sessions)
        })
      } catch (err) {
        console.warn('Presence listener notice:', err)
      }
    }

    listenLivePresence()

    // Interval to prune stale sessions in local state
    const interval = setInterval(() => {
      setLiveActiveSessions((prev) => {
        const threshold = Date.now() - 65000
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

  function handleDeleteInv(slug: string) {
    if (confirm(`Are you sure you want to delete invitation "${slug}"? This action cannot be undone.`)) {
      deleteInvitation(slug)
      setFirestoreInvitations((prev) => prev.filter((i) => i.slug !== slug && i.id !== slug))
      showToast('Invitation deleted by Admin', 'info')
    }
  }

  function handleDeleteWishCard(slug: string) {
    if (confirm(`Are you sure you want to delete wish card "${slug}"? This action cannot be undone.`)) {
      deleteWish(slug)
      setFirestoreWishes((prev) => prev.filter((w) => w.slug !== slug && w.id !== slug))
      showToast('Wish card deleted by Admin', 'info')
    }
  }

  function handleDeleteVisitingCard(slug: string, fullName?: string) {
    if (confirm(`Are you sure you want to delete visiting card "${fullName || slug}"? This action cannot be undone.`)) {
      deleteVisitingCard(slug)
      setFirestoreVisitingCards((prev) => prev.filter((vc) => vc.slug !== slug && vc.id !== slug))
      showToast('Visiting card deleted by Admin', 'info')
    }
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
    const ALLOWED_EMAILS = ['admin@cardzy.online', 'cardzyonline@gmail.com', 'admin@jashn.online']
    if (currentUser?.email && ALLOWED_EMAILS.includes(currentUser.email.toLowerCase())) {
      setIsAdminAuthorized(true)
    }
  }, [currentUser])

  // Auto-lock when the 30-minute session window expires
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
    // Password:         CardzyAdmin2026!
    // ────────────────────────────────────────────────────────────────────
    const ALLOWED_EMAILS = ['admin@cardzy.online', 'cardzyonline@gmail.com', 'admin@jashn.online']
    const ADMIN_PASSWORD = 'CardzyAdmin2026!'

    const emailOk = ALLOWED_EMAILS.includes(email)
    const passOk = pass === ADMIN_PASSWORD

    if (emailOk && passOk) {
      setIsAdminAuthorized(true)
      if (typeof window !== 'undefined') {
        // Session valid for 30 minutes
        const expiresAt = Date.now() + 30 * 60 * 1000
        sessionStorage.setItem('cardzy_admin_session', JSON.stringify({ authed: true, expiresAt }))
      }
      setAdminError('')
      showToast('Admin Portal Unlocked — session valid for 30 min', 'success')
    } else {
      setAdminError('Access denied: Invalid admin email or password.')
    }
  }

  function handleAdminLock() {
    setIsAdminAuthorized(false)
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('cardzy_admin_session')
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
  const [isFirestoreLoading, setIsFirestoreLoading] = useState(false)
  const [firestoreError, setFirestoreError] = useState<string | null>(null)
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null)

  const loadFirestoreAll = useCallback(async () => {
    const activeDb = getFirebaseDb() || db
    if (!isFirebaseConfigured || !activeDb) {
      setFirestoreError(
        'Cloud Database (Firebase) is not connected on this deployment. Missing NEXT_PUBLIC_FIREBASE_* environment variables.'
      )
      return
    }

    setIsFirestoreLoading(true)
    setFirestoreError(null)

    try {
      // 1. Users
      try {
        const snap = await getDocs(collection(activeDb, 'users'))
        const list: JashnUser[] = []
        snap.forEach((docSnap) => {
          if (docSnap.exists()) list.push(docSnap.data() as JashnUser)
        })
        setFirestoreUsers(list)
      } catch (e: any) {
        console.error('Failed to fetch users from Firestore:', e)
      }

      // 2. Invitations
      try {
        const snap = await getDocs(collection(activeDb, 'invitations'))
        const list: Invitation[] = []
        snap.forEach((docSnap) => {
          if (docSnap.exists()) list.push(docSnap.data() as Invitation)
        })
        setFirestoreInvitations(list)
      } catch (e: any) {
        console.error('Failed to fetch invitations from Firestore:', e)
      }

      // 3. Wishes
      try {
        const snap = await getDocs(collection(activeDb, 'wishes'))
        const list: Wish[] = []
        snap.forEach((docSnap) => {
          if (docSnap.exists()) list.push(docSnap.data() as Wish)
        })
        setFirestoreWishes(list)
      } catch (e: any) {
        console.error('Failed to fetch wishes from Firestore:', e)
      }

      // 4. Visiting Cards
      try {
        const snap = await getDocs(collection(activeDb, 'visitingCards'))
        const list: VisitingCard[] = []
        snap.forEach((docSnap) => {
          if (docSnap.exists()) list.push(docSnap.data() as VisitingCard)
        })
        setFirestoreVisitingCards(list)
      } catch (e: any) {
        console.error('Failed to fetch visiting cards from Firestore:', e)
      }

      // 5. RSVPs
      try {
        const snap = await getDocs(collection(activeDb, 'rsvps'))
        const list: RsvpGuest[] = []
        snap.forEach((docSnap) => {
          if (docSnap.exists()) list.push(docSnap.data() as RsvpGuest)
        })
        setFirestoreRsvps(list)
      } catch (e: any) {
        console.error('Failed to fetch RSVPs from Firestore:', e)
      }

      setLastSyncedAt(Date.now())
    } catch (err: any) {
      console.error('Failed to load Firestore data:', err)
      setFirestoreError(err?.message || 'Failed to sync with cloud database')
    } finally {
      setIsFirestoreLoading(false)
    }
  }, [])

  useEffect(() => {
    loadFirestoreAll()
  }, [loadFirestoreAll])

  // Merged Invitations list (store + Firestore)
  const invitations = useMemo(() => {
    const map = new Map<string, Invitation>()
    storeInvitations.forEach((i) => {
      const key = i.slug || i.id
      if (key) map.set(key, i)
    })
    firestoreInvitations.forEach((i) => {
      const key = i.slug || i.id
      if (key) {
        const existing = map.get(key)
        map.set(key, existing ? { ...existing, ...i } : i)
      }
    })
    return Array.from(map.values()).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
  }, [storeInvitations, firestoreInvitations])

  // Merged Wishes list (store + Firestore)
  const wishes = useMemo(() => {
    const map = new Map<string, Wish>()
    storeWishes.forEach((w) => {
      const key = w.slug || w.id
      if (key) map.set(key, w)
    })
    firestoreWishes.forEach((w) => {
      const key = w.slug || w.id
      if (key) {
        const existing = map.get(key)
        map.set(key, existing ? { ...existing, ...w } : w)
      }
    })
    return Array.from(map.values()).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
  }, [storeWishes, firestoreWishes])

  // Merged Visiting Cards list (store + Firestore)
  const visitingCards = useMemo(() => {
    const map = new Map<string, VisitingCard>()
    const localVcList = storeVisitingCards || []
    localVcList.forEach((vc: VisitingCard) => {
      const key = vc.slug || vc.id
      if (key) map.set(key, vc)
    })
    firestoreVisitingCards.forEach((vc: VisitingCard) => {
      const key = vc.slug || vc.id
      if (key) {
        const existing = map.get(key)
        map.set(key, existing ? { ...existing, ...vc } : vc)
      }
    })
    return Array.from(map.values()).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
  }, [storeVisitingCards, firestoreVisitingCards])

  // Merged RSVPs list (store + Firestore)
  const rsvps = useMemo(() => {
    const map = new Map<string, RsvpGuest>()
    const localRsvpList = storeRsvps || []
    localRsvpList.forEach((r: RsvpGuest) => {
      if (r.id) map.set(r.id, r)
    })
    firestoreRsvps.forEach((r: RsvpGuest) => {
      if (r.id) {
        const existing = map.get(r.id)
        map.set(r.id, existing ? { ...existing, ...r } : r)
      }
    })
    return Array.from(map.values()).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
  }, [storeRsvps, firestoreRsvps])

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

  // Merge registered list, firestore list, current user, and card creators
  const allUsersList = useMemo(() => {
    const map = new Map<string, JashnUser>()
    
    // 1. Registered users in store
    registeredUsers.forEach((u) => {
      const key = u.uid || u.email
      if (key) map.set(key, u)
    })

    // 2. Firestore users (rich merge)
    firestoreUsers.forEach((u) => {
      const key = u.uid || u.email
      if (key) {
        const existing = map.get(key)
        map.set(key, existing ? { ...existing, ...u } : u)
      }
    })

    // 3. Current user
    if (currentUser) {
      const key = currentUser.uid || currentUser.email
      if (key) {
        const existing = map.get(key)
        map.set(key, existing ? { ...existing, ...currentUser } : currentUser)
      }
    }

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

    return Array.from(map.values()).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
  }, [registeredUsers, firestoreUsers, currentUser, invitations, wishes, visitingCards])

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
      type: 'user' | 'invitation' | 'wish' | 'visiting_card'
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
          link: `/i/${inv.slug}`,
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
          link: `/w/${w.slug}`,
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
          link: `/v/${vc.slug}`,
        })
      }
    })

    return items.sort((a, b) => (b.time || 0) - (a.time || 0))
  }, [allUsersList, invitations, wishes, visitingCards])

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

        {!isFirebaseConfigured && (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200 flex items-start gap-3">
            <AlertTriangle className="size-5 shrink-0 text-amber-400 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-sm text-amber-100">Firebase Cloud Database Not Connected</p>
              <p className="text-amber-200/80 leading-relaxed">
                This deployment is missing the required Firebase environment variables (<code className="bg-amber-900/40 px-1.5 py-0.5 rounded text-amber-300 font-mono text-[11px]">NEXT_PUBLIC_FIREBASE_*</code>). Currently, you are viewing local browser data only. To see real-time submissions from all users across the published site, add these environment variables in your Vercel Project Settings and redeploy.
              </p>
            </div>
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

        {/* Section Navigation Bar */}
        <div className="flex border-b border-border gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: `✨ All Database Overview`, icon: FileSpreadsheet },
            { id: 'live_users', label: `🟢 Live Online (${liveActiveSessions.length})`, icon: Activity },
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
                Chronological timeline of latest user registrations, event invitations, greeting wishes, and visiting cards.
              </p>

              <div className="divide-y divide-border/60">
                {recentActivities.length === 0 ? (
                  <div className="py-8 text-center text-xs text-muted-foreground">
                    No activity recorded yet.
                  </div>
                ) : (
                  recentActivities.slice(0, 5).map((act, i) => (
                    <div key={i} className="py-3 first:pt-1 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className={cn(
                          "size-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
                          act.type === 'user' ? 'bg-indigo-500/10 text-indigo-600' :
                          act.type === 'invitation' ? 'bg-emerald-500/10 text-emerald-600' :
                          act.type === 'wish' ? 'bg-amber-500/10 text-amber-600' :
                          'bg-purple-500/10 text-purple-600'
                        )}>
                          {act.type === 'user' ? <Users className="size-4" /> :
                           act.type === 'invitation' ? <Calendar className="size-4" /> :
                           act.type === 'wish' ? <Sparkles className="size-4" /> :
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
            <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  Live Active Users Online Right Now ({liveActiveSessions.length})
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Real-time heartbeat presence connected directly to Firebase Firestore. Shows users currently browsing Cardzy.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-1.5">
                  <Activity className="size-3.5 animate-pulse" /> Live Pulse Active
                </span>
              </div>
            </div>

            <div className="p-6 pt-0">
              {liveActiveSessions.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground space-y-2">
                  <Activity className="size-8 mx-auto opacity-30 animate-pulse text-emerald-500" />
                  <p className="text-sm font-semibold">No other active visitors browsing right now.</p>
                  <p className="text-xs text-muted-foreground">When visitors open Cardzy in any tab or mobile browser, they appear here instantly.</p>
                </div>
              ) : (
                <div className="overflow-x-auto -mx-6 px-6">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
                      <tr>
                        <th className="px-4 py-3 rounded-l-xl">User / Visitor</th>
                        <th className="px-4 py-3">Current Active Page</th>
                        <th className="px-4 py-3">Device</th>
                        <th className="px-4 py-3">Location / Timezone</th>
                        <th className="px-4 py-3">Referrer</th>
                        <th className="px-4 py-3 rounded-r-xl">Last Heartbeat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {liveActiveSessions.map((session) => {
                        const secondsAgo = Math.max(0, Math.round((Date.now() - (session.lastSeen || Date.now())) / 1000))
                        return (
                          <tr key={session.sessionId || session.id} className="hover:bg-muted/20 transition-colors">
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-2.5">
                                <span className="relative flex h-2.5 w-2.5 shrink-0">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </span>
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
                              <div className="font-medium text-foreground">{session.timezone || 'Unknown'}</div>
                              <div className="text-[10px]">Lang: {session.language || 'en'}</div>
                            </td>
                            <td className="px-4 py-3.5 text-xs text-muted-foreground truncate max-w-[120px]">
                              {session.referrer === 'Direct' ? 'Direct URL' : session.referrer || 'Direct'}
                            </td>
                            <td className="px-4 py-3.5 text-xs font-bold text-emerald-600 whitespace-nowrap">
                              {secondsAgo <= 5 ? 'Just now (live)' : `${secondsAgo}s ago`}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
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
                    filteredUsers.map((u) => {
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
          </div>
        )}

        {/* 2. ACTIVE INVITATIONS SECTION */}
        {(adminSection === 'all' || adminSection === 'invitations') && (
          <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Calendar className="size-5 text-emerald-600" /> Active Event & Wedding Invitations ({invitations.length})
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Full control panel to manage, edit, view, and delete all invitations.
                </p>
              </div>
              <Link href="/create-invitation" className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-xs font-bold shadow-md">
                + Create New Invite
              </Link>
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
                  {invitations.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-muted-foreground">No active invitations found.</td>
                    </tr>
                  ) : (
                    invitations.map((inv) => {
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
                        <tr key={inv.id} className="hover:bg-muted/20 transition-colors">
                          <td className="py-4 px-4">
                            <div className="font-bold text-foreground">{inv.title || 'Event Invitation'}</div>
                            {(inv.groom || inv.bride) && (
                              <div className="text-xs font-medium text-emerald-700">{inv.groom || ''} & {inv.bride || ''}</div>
                            )}
                            <div className="text-[10px] text-muted-foreground font-mono">Slug: {inv.slug}</div>
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
                          <div className="text-muted-foreground">{inv.viewCount || 1} views</div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setRsvpFilterSlug(inv.slug)
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
                              href={`/i/${inv.slug}`}
                              target="_blank"
                              className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 text-xs font-bold flex items-center gap-1"
                              title="View Live Card"
                            >
                              <ExternalLink className="size-3.5" /> View
                            </Link>
                            <Link
                              href={`/create-invitation?edit=${inv.slug}`}
                              rel="nofollow"
                              className="p-1.5 rounded-lg bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 text-xs font-bold flex items-center gap-1"
                              title="Edit Invitation"
                            >
                              <Edit3 className="size-3.5" /> Edit
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDeleteInv(inv.slug)}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 text-xs font-bold flex items-center gap-1"
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
          </div>
        )}

        {/* 3. CREATED WISHES SECTION */}
        {(adminSection === 'all' || adminSection === 'wishes') && (
          <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="size-5 text-amber-500" /> Created Greeting Wishes & Cards ({wishes.length})
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Complete database of all animated wish cards sent across Cardzy.
                </p>
              </div>
              <Link href="/create-wish" className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-xs font-bold shadow-md">
                + Create New Wish
              </Link>
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
                  {wishes.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-muted-foreground">No wishes recorded.</td>
                    </tr>
                  ) : (
                    wishes.map((w) => {
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
                        <tr key={w.id} className="hover:bg-muted/20 transition-colors">
                          <td className="py-4 px-4 font-bold text-foreground">{w.senderName || 'Well Wisher'}</td>
                          <td className="py-4 px-4">
                            <div className="font-semibold text-foreground">{w.recipientName || 'Friend'}</div>
                            {w.relation && <div className="text-[11px] text-muted-foreground">Relation: {w.relation}</div>}
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
                        <td className="py-4 px-4 text-xs text-muted-foreground max-w-xs leading-snug">{w.message}</td>
                        <td className="py-4 px-4 text-xs font-bold text-foreground">{w.viewCount}</td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/w/${w.slug}`}
                              target="_blank"
                              className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-xs font-bold flex items-center gap-1"
                              title="View Live Greeting"
                            >
                              <ExternalLink className="size-3.5" /> View
                            </Link>
                            <Link
                              href={`/create-wish?edit=${w.slug}`}
                              rel="nofollow"
                              className="p-1.5 rounded-lg bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 text-xs font-bold flex items-center gap-1"
                              title="Edit Wish"
                            >
                              <Edit3 className="size-3.5" /> Edit
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDeleteWishCard(w.slug)}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 text-xs font-bold flex items-center gap-1"
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
              <Link
                href="/create-visiting-card"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0 shadow-md"
              >
                <CreditCard className="size-4" />
                <span>+ Create Visiting Card</span>
              </Link>
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
                  {(!visitingCards || visitingCards.length === 0) ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-xs text-muted-foreground">
                        No visiting cards created yet.
                      </td>
                    </tr>
                  ) : (
                    visitingCards.map((vc) => {
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
                        <tr key={vc.id} className="hover:bg-muted/20 transition-colors">
                          <td className="py-4 px-4">
                            <div className="font-bold text-foreground text-sm">{vc.fullName}</div>
                            <div className="text-xs text-muted-foreground font-medium">{vc.title}</div>
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
                          <td className="py-4 px-4 text-xs font-bold text-foreground">{vc.viewCount || 0}</td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/v/${vc.slug}`}
                              target="_blank"
                              className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 text-xs font-bold flex items-center gap-1"
                              title="View Live Card"
                            >
                              <ExternalLink className="size-3.5" /> View
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDeleteVisitingCard(vc.slug, vc.fullName)}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 text-xs font-bold flex items-center gap-1"
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
                  .filter((inv) => (inv.rsvpCount || 0) > 0 || rsvps.some((r) => r.invitationSlug === inv.slug))
                  .sort((a, b) => (b.rsvpCount || 0) - (a.rsvpCount || 0))
                  .map((inv) => {
                    const count = rsvps.filter((r) => r.invitationSlug === inv.slug).length
                    const isActive = rsvpFilterSlug === inv.slug
                    return (
                      <button
                        key={inv.slug}
                        onClick={() => setRsvpFilterSlug(inv.slug)}
                        className={cn(
                          'flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all border max-w-[200px]',
                          isActive
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-muted/40 text-muted-foreground border-border hover:bg-muted hover:text-foreground'
                        )}
                        title={inv.slug}
                      >
                        <Calendar className="size-3.5 shrink-0" />
                        <span className="truncate">{inv.title || inv.slug}</span>
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
                  {filteredRsvps.length === 0 ? (
                    <tr>
                      <td colSpan={rsvpFilterSlug ? 7 : 8} className="py-10 text-center">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <Users className="size-8 opacity-30" />
                          <p className="text-sm font-semibold">
                            {rsvpFilterSlug ? 'No RSVPs recorded for this event yet.' : 'No guest RSVPs recorded yet.'}
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
                    filteredRsvps.map((r, idx) => {
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

                      return (
                        <tr key={r.id || idx} className="hover:bg-muted/20 transition-colors">
                          <td className="py-3.5 px-4 text-xs text-muted-foreground font-mono">{idx + 1}</td>
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
            {filteredRsvps.length > 0 && (
              <div className="px-6 pb-5 pt-1 flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-border/60">
                <span>Total responses: <strong className="text-foreground">{filteredRsvps.length}</strong></span>
                <span>Attending: <strong className="text-emerald-600">{filteredRsvps.filter(r => !r.attending || String(r.attending).toLowerCase() === 'yes').length}</strong></span>
                <span>Not attending: <strong className="text-rose-600">{filteredRsvps.filter(r => String(r.attending).toLowerCase() === 'no').length}</strong></span>
                <span>Total guests: <strong className="text-foreground">{filteredRsvps.reduce((sum, r) => sum + (r.guestCount || 1), 0)}</strong></span>
              </div>
            )}
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

  useEffect(() => {
    let unsubscribe = () => {}
    
    async function loadData() {
      try {
        const firestoreDb = getFirebaseDb()
        if (!firestoreDb) return

        // Get subscriber count and list
        const subSnap = await getDocs(collection(firestoreDb, 'push_subscribers'))
        setSubscribersCount(subSnap.size)
        setSubscribersList(subSnap.docs.map(d => ({ id: d.id, ...d.data() })))

        // Listen to notifications
        const q = query(collection(firestoreDb, 'push_notifications'), orderBy('sentAt', 'desc'), limit(20))
        unsubscribe = onSnapshot(q, (snap) => {
          const notifs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          setNotifications(notifs)
          setLoading(false)
        })
      } catch (err) {
        console.error("Error loading push data", err)
        setLoading(false)
      }
    }
    
    loadData()
    return () => unsubscribe()
  }, [])

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
      showToast(err.message || 'Error sending notification', 'error')
    } finally {
      setIsSending(false)
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
        <div className="lg:col-span-1 border border-border bg-card rounded-3xl p-6 shadow-sm space-y-4">
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

            <Button 
              onClick={handleSend} 
              disabled={isSending || !title || !body} 
              className="w-full rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white mt-2"
            >
              {isSending ? <RefreshCw className="size-4 animate-spin mr-2" /> : <Send className="size-4 mr-2" />}
              {isSending ? 'Sending to all devices...' : `Send to All (${subscribersCount})`}
            </Button>
          </div>
        </div>

        <div className="lg:col-span-2 border border-border bg-card rounded-3xl p-6 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <CheckCircle2 className="size-5 text-emerald-500" />
              Push History & Device Breakdown
            </h3>
            <span className="text-xs text-muted-foreground font-medium">Click any row to view device audit</span>
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
                ) : notifications.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-8 text-muted-foreground">No push notifications sent yet.</td></tr>
                ) : (
                  notifications.map((n) => (
                    <tr 
                      key={n.id} 
                      onClick={() => setSelectedNotifForDevices(n)}
                      className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
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
                          <span>{n.sentAt ? new Date(n.sentAt).toLocaleTimeString() : '—'}</span>
                          <span className="text-[10px] bg-indigo-500/10 text-indigo-600 font-bold px-1.5 py-0.5 rounded">View Devices</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
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

            <div className="pt-2 border-t border-border flex justify-end">
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

