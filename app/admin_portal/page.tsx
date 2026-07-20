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
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useJashn } from '@/lib/jashn/store'
import type { Plan, JashnUser } from '@/lib/jashn/types'
import { cn } from '@/lib/utils'

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
  useEffect(() => {
    setMounted(true)
  }, [])

  const {
    user: currentUser,
    registeredUsers,
    wishes,
    invitations,
    rsvps,
    adminUpdateUserPlan,
    downloadAllGuestsCsv,
    showToast,
  } = useJashn()

  const [searchTerm, setSearchTerm] = useState('')
  const [filterPlan, setFilterPlan] = useState<'all' | 'free' | 'pro' | 'business' | 'expired'>('all')
  const [selectedDurationDays, setSelectedDurationDays] = useState<number>(30)

  // Merge current user into registered list if missing
  const allUsersList = useMemo(() => {
    const map = new Map<string, JashnUser>()
    registeredUsers.forEach((u) => map.set(u.uid || u.email, u))
    if (currentUser) {
      map.set(currentUser.uid || currentUser.email, currentUser)
    }

    return Array.from(map.values())
  }, [registeredUsers, currentUser])

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

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Secret Admin Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-2xl border border-indigo-500/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 text-xs font-semibold tracking-wider uppercase">
                <ShieldCheck className="size-4 text-amber-400" /> Hidden Administration Portal
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Cardzy Management Hub
              </h1>
              <p className="text-slate-300 text-sm max-w-2xl">
                Manage all registered users, upgrade/downgrade subscription packages, track plan expiry dates, and bulk download all guest RSVP records.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={() => downloadAllGuestsCsv()}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2"
              >
                <FileSpreadsheet className="size-4" /> Download All Guests (CSV)
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

        {/* Main User Control Panel */}
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
                        {/* User Details */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-foreground">{u.name || 'Jashn User'}</div>
                          <div className="text-xs text-muted-foreground font-mono">{u.email}</div>
                          {u.phone && <div className="text-[11px] text-muted-foreground/80">{u.phone}</div>}
                        </td>

                        {/* Current Package */}
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

                        {/* Activated Date */}
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

                        {/* Package Expiry */}
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

                        {/* 
                         Action Buttons */}
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

        {/* Global RSVPs Export Section */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <FileSpreadsheet className="size-5 text-emerald-600" /> Guest RSVPs Central Database
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Download all guest RSVP entries across all wedding and event invitations created on Cardzy.
              </p>
            </div>

            <Button
              onClick={() => downloadAllGuestsCsv()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center gap-2"
            >
              <Download className="size-4" /> Download Complete Guest Database (CSV)
            </Button>
          </div>

          <div className="p-4 rounded-2xl bg-muted/30 border border-border/80 text-xs text-muted-foreground flex items-center justify-between">
            <span>Total Invitations Active: <strong className="text-foreground">{invitations.length}</strong></span>
            <span>Total Wishes Created: <strong className="text-foreground">{wishes.length}</strong></span>
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
