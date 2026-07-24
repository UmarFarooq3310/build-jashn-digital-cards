'use client'

import { useState, useMemo, useEffect } from 'react'
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
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useJashn } from '@/lib/jashn/store'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { cn } from '@/lib/utils'
import type { JashnUser, Plan, Invitation, Wish, VisitingCard, RsvpGuest } from '@/lib/jashn/types'

function formatDateStandard(timestamp?: number): string {
  if (!timestamp) return '—'
  const d = new Date(timestamp)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
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
    downloadAllGuestsCsv,
    downloadAllGuestsPdf,
    deleteInvitation,
    deleteWish,
    deleteVisitingCard,
    showToast,
  } = useJashn()

  const [adminSection, setAdminSection] = useState<'all' | 'invitations' | 'wishes' | 'visiting_cards' | 'rsvps' | 'users'>('all')
  const [searchTerm, setSearchTerm] = useState('')

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

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const isAuthed = sessionStorage.getItem('cardzy_admin_session') === 'true'
      if (isAuthed) {
        setIsAdminAuthorized(true)
      }
    }
  }, [])

  useEffect(() => {
    const ALLOWED_EMAILS = ['admin@cardzy.online', 'cardzyonline@gmail.com', 'admin@jashn.online']
    if (currentUser?.email && ALLOWED_EMAILS.includes(currentUser.email.toLowerCase())) {
      setIsAdminAuthorized(true)
    }
  }, [currentUser])

  function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault()
    const email = adminEmailInput.trim().toLowerCase()
    const pass = adminPasswordInput.trim()

    const ALLOWED_EMAILS = ['admin@cardzy.online', 'cardzyonline@gmail.com', 'admin@jashn.online']
    const SECRET_KEY = 'CardzyAdmin2026!'

    if (ALLOWED_EMAILS.includes(email) || pass === SECRET_KEY) {
      setIsAdminAuthorized(true)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('cardzy_admin_session', 'true')
      }
      setAdminError('')
      showToast('Admin Portal Unlocked', 'success')
    } else {
      setAdminError('Access denied: Invalid Admin email or secret passcode.')
    }
  }

  function handleAdminLock() {
    setIsAdminAuthorized(false)
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('cardzy_admin_session')
    }
    showToast('Admin Portal Locked', 'info')
  }

  const [filterPlan, setFilterPlan] = useState<'all' | 'free' | 'pro' | 'business' | 'expired'>('all')
  const [selectedDurationDays, setSelectedDurationDays] = useState<number>(30)

  const [firestoreUsers, setFirestoreUsers] = useState<JashnUser[]>([])
  const [firestoreInvitations, setFirestoreInvitations] = useState<Invitation[]>([])
  const [firestoreWishes, setFirestoreWishes] = useState<Wish[]>([])
  const [firestoreVisitingCards, setFirestoreVisitingCards] = useState<VisitingCard[]>([])
  const [firestoreRsvps, setFirestoreRsvps] = useState<RsvpGuest[]>([])

  useEffect(() => {
    async function loadFirestoreAll() {
      if (!db) return

      // 1. Users
      try {
        const snap = await getDocs(collection(db, 'users'))
        const list: JashnUser[] = []
        snap.forEach((docSnap) => {
          if (docSnap.exists()) list.push(docSnap.data() as JashnUser)
        })
        if (list.length > 0) setFirestoreUsers(list)
      } catch (e) {
        console.error('Failed to fetch users from Firestore:', e)
      }

      // 2. Invitations
      try {
        const snap = await getDocs(collection(db, 'invitations'))
        const list: Invitation[] = []
        snap.forEach((docSnap) => {
          if (docSnap.exists()) list.push(docSnap.data() as Invitation)
        })
        if (list.length > 0) setFirestoreInvitations(list)
      } catch (e) {
        console.error('Failed to fetch invitations from Firestore:', e)
      }

      // 3. Wishes
      try {
        const snap = await getDocs(collection(db, 'wishes'))
        const list: Wish[] = []
        snap.forEach((docSnap) => {
          if (docSnap.exists()) list.push(docSnap.data() as Wish)
        })
        if (list.length > 0) setFirestoreWishes(list)
      } catch (e) {
        console.error('Failed to fetch wishes from Firestore:', e)
      }

      // 4. Visiting Cards
      try {
        const snap = await getDocs(collection(db, 'visitingCards'))
        const list: VisitingCard[] = []
        snap.forEach((docSnap) => {
          if (docSnap.exists()) list.push(docSnap.data() as VisitingCard)
        })
        if (list.length > 0) setFirestoreVisitingCards(list)
      } catch (e) {
        console.error('Failed to fetch visiting cards from Firestore:', e)
      }

      // 5. RSVPs
      try {
        const snap = await getDocs(collection(db, 'rsvps'))
        const list: RsvpGuest[] = []
        snap.forEach((docSnap) => {
          if (docSnap.exists()) list.push(docSnap.data() as RsvpGuest)
        })
        if (list.length > 0) setFirestoreRsvps(list)
      } catch (e) {
        console.error('Failed to fetch RSVPs from Firestore:', e)
      }
    }
    loadFirestoreAll()
  }, [])

  // Merged Invitations list (store + Firestore)
  const invitations = useMemo(() => {
    const map = new Map<string, Invitation>()
    storeInvitations.forEach((i) => {
      const key = i.slug || i.id
      if (key) map.set(key, i)
    })
    firestoreInvitations.forEach((i) => {
      const key = i.slug || i.id
      if (key) map.set(key, i)
    })
    return Array.from(map.values())
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
      if (key) map.set(key, w)
    })
    return Array.from(map.values())
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
      if (key) map.set(key, vc)
    })
    return Array.from(map.values())
  }, [storeVisitingCards, firestoreVisitingCards])

  // Merged RSVPs list (store + Firestore)
  const rsvps = useMemo(() => {
    const map = new Map<string, RsvpGuest>()
    const localRsvpList = storeRsvps || []
    localRsvpList.forEach((r: RsvpGuest) => {
      if (r.id) map.set(r.id, r)
    })
    firestoreRsvps.forEach((r: RsvpGuest) => {
      if (r.id) map.set(r.id, r)
    })
    return Array.from(map.values())
  }, [storeRsvps, firestoreRsvps])

  // Merge registered list, firestore list, current user, and card creators
  const allUsersList = useMemo(() => {
    const map = new Map<string, JashnUser>()
    
    // 1. Registered users in store
    registeredUsers.forEach((u) => {
      const key = u.uid || u.email
      if (key) map.set(key, u)
    })

    // 2. Firestore users
    firestoreUsers.forEach((u) => {
      const key = u.uid || u.email
      if (key) map.set(key, u)
    })

    // 3. Current user
    if (currentUser) {
      const key = currentUser.uid || currentUser.email
      if (key) map.set(key, currentUser)
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
          })
        }
      }
    })

    return Array.from(map.values())
  }, [registeredUsers, firestoreUsers, currentUser, invitations, wishes])

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
        return matchName || matchEmail || matchUid
      }
      return true
    })
  }, [allUsersList, filterPlan, searchTerm])

  const handleUpdateUserPlan = async (uid: string, plan: Plan) => {
    await adminUpdateUserPlan(uid, plan, selectedDurationDays)
    showToast(`Updated user plan to ${plan.toUpperCase()} for ${selectedDurationDays} days!`, 'success')
  }

  // 🔒 Render Admin Login Lock Gate if not authorized
  if (!mounted) return null

  if (!isAdminAuthorized) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center p-4 py-16">
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

            <form onSubmit={handleAdminLogin} className="space-y-4">
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
        </main>
        <SiteFooter />
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
      ? `<tr><td colspan="7" style="text-align:center; padding: 25px; color: #64748b;">No active invitations recorded.</td></tr>`
      : invitations.map((i, idx) => `
          <tr>
            <td>${idx + 1}</td>
            <td><strong>${i.title || 'Invitation'}</strong><br/><span style="font-size: 11px; color: #64748b;">${i.groom || ''} & ${i.bride || ''}</span></td>
            <td><strong>${i.hostNames || 'Host'}</strong><br/><span style="font-size: 11px; color: #64748b;">ID: ${i.creatorId}</span></td>
            <td><span style="padding: 2px 8px; border-radius: 10px; background: #e0e7ff; color: #3730a3; font-weight: 700; font-size: 10px;">${(i.typeId || 'event').toUpperCase()}</span></td>
            <td>${i.date || 'TBD'} ${i.time || ''}<br/><span style="font-size: 11px; color: #64748b;">${i.venue || i.city || '—'}</span></td>
            <td><strong>${i.rsvpPhone || '—'}</strong></td>
            <td><strong>${i.rsvpCount} RSVPs</strong><br/><span style="font-size: 11px; color: #64748b;">${i.viewCount || 1} views</span></td>
          </tr>
        `).join('')

    printPdfReport(
      'Active Invitations Database Report',
      'Event & Wedding Cards Audit',
      [
        { label: 'Total Active Invitations', value: `${invitations.length} Cards` },
        { label: 'Total RSVPs Received', value: `${invitations.reduce((a, b) => a + (b.rsvpCount || 0), 0)} Responses` },
      ],
      ['#', 'Event & Couple', 'Host / Creator', 'Category', 'Date & Venue', 'RSVP Contact', 'Stats'],
      rowsHtml
    )
  }

  function handleDownloadWishesPdf() {
    const rowsHtml = wishes.length === 0
      ? `<tr><td colspan="6" style="text-align:center; padding: 25px; color: #64748b;">No wish cards recorded.</td></tr>`
      : wishes.map((w, idx) => `
          <tr>
            <td>${idx + 1}</td>
            <td><strong>${w.senderName || 'Well Wisher'}</strong></td>
            <td><strong>${w.recipientName || 'Friend'}</strong><br/><span style="font-size: 11px; color: #64748b;">Relation: ${w.relation || '—'}</span></td>
            <td><span style="padding: 2px 8px; border-radius: 10px; background: #fef3c7; color: #92400e; font-weight: 700; font-size: 10px;">${(w.occasionId || 'wish').toUpperCase()}</span></td>
            <td style="max-width: 250px; font-size: 11px; color: #475569;">${w.message}</td>
            <td><strong>${w.viewCount} views</strong></td>
          </tr>
        `).join('')

    printPdfReport(
      'Greeting Wishes & Cards Database Report',
      'Sent Wish Cards Audit',
      [
        { label: 'Total Wishes Created', value: `${wishes.length} Cards` },
        { label: 'Total Views Tracked', value: `${wishes.reduce((a, b) => a + (b.viewCount || 0), 0)} Views` },
      ],
      ['#', 'Sender (Who Sent)', 'Recipient (Who Received)', 'Occasion', 'Wish Message Text', 'Views'],
      rowsHtml
    )
  }

  function handleDownloadUsersPdf() {
    const rowsHtml = allUsersList.length === 0
      ? `<tr><td colspan="6" style="text-align:center; padding: 25px; color: #64748b;">No registered users found.</td></tr>`
      : allUsersList.map((u, idx) => {
          const now = Date.now()
          const isExpired = u.planExpiresAt ? now > u.planExpiresAt : false
          return `
            <tr>
              <td>${idx + 1}</td>
              <td><strong>${u.name || 'Jashn User'}</strong><br/><span style="font-size: 11px; color: #64748b;">${u.email}</span></td>
              <td>${u.phone || 'N/A'}</td>
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
      ['#', 'User Name & Email', 'Phone', 'Subscription Plan', 'Activated Date', 'Plan Expiry Status'],
      rowsHtml
    )
  }

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Secret Admin Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-2xl border border-indigo-500/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 text-xs font-semibold tracking-wider uppercase">
                <ShieldCheck className="size-4 text-amber-400" /> Master Admin Data Control
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Cardzy Management Hub
              </h1>
              <p className="text-slate-300 text-sm max-w-2xl">
                Generate printable PDF reports for all system databases (Guest RSVPs, Invitations, Wish Cards, and User Accounts).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
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

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
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
            { id: 'invitations', label: `Active Invitations (${invitations.length})`, icon: Calendar },
            { id: 'wishes', label: `Created Wishes (${wishes.length})`, icon: Sparkles },
            { id: 'visiting_cards', label: `Visiting Cards (${visitingCards?.length || 0})`, icon: CreditCard },
            { id: 'rsvps', label: `Recorded RSVPs (${rsvps?.length || 0})`, icon: FileSpreadsheet },
            { id: 'users', label: `User Accounts (${allUsersList.length})`, icon: Users },
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
                    <th className="py-3.5 px-4">Current Package</th>
                    <th className="py-3.5 px-4">Activated Date</th>
                    <th className="py-3.5 px-4">Package Expiry</th>
                    <th className="py-3.5 px-4 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">
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

                      return (
                        <tr key={u.uid || u.email} className="hover:bg-muted/20 transition-colors">
                          <td className="py-4 px-4">
                            <div className="font-bold text-foreground">{u.name || 'Jashn User'}</div>
                            <div className="text-xs text-muted-foreground font-mono">{u.email}</div>
                            {u.phone && <div className="text-[11px] text-muted-foreground/80">{u.phone}</div>}
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
                    <th className="py-3.5 px-4">RSVP Contact</th>
                    <th className="py-3.5 px-4">Stats</th>
                    <th className="py-3.5 px-4 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {invitations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-muted-foreground">No active invitations found.</td>
                    </tr>
                  ) : (
                    invitations.map((inv) => (
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
                    ))
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
                    <th className="py-3.5 px-4">Card Message</th>
                    <th className="py-3.5 px-4">Views</th>
                    <th className="py-3.5 px-4 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {wishes.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-muted-foreground">No wishes recorded.</td>
                    </tr>
                  ) : (
                    wishes.map((w) => (
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
                    ))
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
                    <th className="py-3.5 px-4">Views</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {(!visitingCards || visitingCards.length === 0) ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-xs text-muted-foreground">
                        No visiting cards created yet.
                      </td>
                    </tr>
                  ) : (
                    visitingCards.map((vc) => (
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
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. GUEST RSVPs SECTION */}
        {(adminSection === 'all' || adminSection === 'rsvps') && (
          <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden space-y-4">
            <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <FileSpreadsheet className="size-5 text-indigo-600" /> Recorded Guest RSVPs ({rsvps?.length || 0})
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Guest list responses submitted for event invitations.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  onClick={() => downloadAllGuestsPdf()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center gap-1.5 text-xs"
                >
                  <Download className="size-4" /> Download PDF Report
                </Button>
                <Button
                  onClick={() => downloadAllGuestsCsv()}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center gap-1.5 text-xs"
                >
                  <FileSpreadsheet className="size-4" /> Export CSV
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/40 border-b border-border text-xs uppercase font-semibold text-muted-foreground">
                  <tr>
                    <th className="py-3.5 px-4">Guest Name</th>
                    <th className="py-3.5 px-4">Phone Number</th>
                    <th className="py-3.5 px-4">RSVP Status</th>
                    <th className="py-3.5 px-4">Guest Count</th>
                    <th className="py-3.5 px-4">Special Note</th>
                    <th className="py-3.5 px-4">Invitation Slug</th>
                    <th className="py-3.5 px-4">Date Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {(!rsvps || rsvps.length === 0) ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-muted-foreground">No guest RSVPs recorded yet.</td>
                    </tr>
                  ) : (
                    rsvps.map((r, idx) => (
                      <tr key={r.id || idx} className="hover:bg-muted/20 transition-colors">
                        <td className="py-4 px-4 font-bold text-foreground">{r.guestName || 'Anonymous'}</td>
                        <td className="py-4 px-4 text-xs font-mono text-muted-foreground">{r.phone || '—'}</td>
                        <td className="py-4 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-bold">{r.attending || 'Yes'}</span></td>
                        <td className="py-4 px-4 text-xs font-bold text-foreground">{r.guestCount || 1}</td>
                        <td className="py-4 px-4 text-xs text-muted-foreground">{r.note || '—'}</td>
                        <td className="py-4 px-4 text-xs font-mono text-muted-foreground">{r.invitationSlug}</td>
                        <td className="py-4 px-4 text-xs text-muted-foreground">{new Date(r.createdAt || Date.now()).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
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
      </main>

      <SiteFooter />
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
