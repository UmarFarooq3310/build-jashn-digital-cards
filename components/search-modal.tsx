'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Search,
  X,
  BookOpen,
  Mail,
  CreditCard,
  Heart,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Command,
} from 'lucide-react'
import { BLOG_POSTS } from '@/lib/blog/data'
import { INVITATION_TYPES } from '@/lib/jashn/invitations'
import { OCCASIONS } from '@/lib/jashn/occasions'
import { VISITING_CARD_THEMES, VISITING_CARD_CATEGORIES } from '@/lib/jashn/visiting-card-themes'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'

export type SearchCategory = 'all' | 'blog' | 'invitations' | 'wishes' | 'vcards'

interface SearchItem {
  id: string
  title: string
  subtitle: string
  category: 'blog' | 'invitations' | 'wishes' | 'vcards'
  badge: string
  href: string
  tags?: string[]
  iconType: string
}

export function SearchModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const router = useRouter()
  const { lang, t } = useLang()
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<SearchCategory>('all')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Build searchable catalog
  const allItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = []

    // 1. Blog Posts & Master Guides
    BLOG_POSTS.forEach((post) => {
      items.push({
        id: `blog-${post.slug}`,
        title: post.title,
        subtitle: post.subtitle || post.metaDescription,
        category: 'blog',
        badge: post.category,
        href: `/blog/${post.slug}`,
        tags: post.tags,
        iconType: 'book',
      })
    })

    // Special Guides
    items.push({
      id: 'guide-wedding',
      title: 'How to Design the Perfect Digital Wedding Invitation (Pakistani Traditions)',
      subtitle: 'Complete wording templates, timeline tips, and theme selection for Mehndi, Barat & Walima.',
      category: 'blog',
      badge: 'Wedding Guide',
      href: '/guide/pakistani-wedding-invitations',
      tags: ['wedding guide', 'shaadi', 'wording', 'invitation'],
      iconType: 'book',
    })
    items.push({
      id: 'guide-eid',
      title: 'Eid Mubarak Wishes, Card Wording & Islamic Replies Guide',
      subtitle: 'Heartfelt Eid ul Fitr & Eid ul Adha greetings in Urdu and English with instant copy buttons.',
      category: 'blog',
      badge: 'Holiday Guide',
      href: '/guide/eid-wording-ideas',
      tags: ['eid', 'ramadan', 'wishes', 'urdu'],
      iconType: 'book',
    })
    items.push({
      id: 'guide-birthday',
      title: 'Heartfelt Birthday Wishes & Greeting Card Messages Guide',
      subtitle: 'Creative birthday wishes for family, friends, milestone birthdays & kids parties.',
      category: 'blog',
      badge: 'Celebration Guide',
      href: '/guide/birthday-wishes-wording',
      tags: ['birthday', 'wishes', 'quotes'],
      iconType: 'book',
    })

    // 2. Invitation Card Templates
    INVITATION_TYPES.forEach((inv) => {
      items.push({
        id: `inv-${inv.id}`,
        title: inv.label,
        subtitle: `Digital ${inv.category || 'Celebration'} Invitation with WhatsApp RSVP tracking & audio music.`,
        category: 'invitations',
        badge: inv.category || 'Invitation',
        href: `/create-invitation?type=${inv.id}`,
        tags: [inv.label, inv.category || '', 'invitation', 'card', 'rsvp'],
        iconType: 'mail',
      })
    })

    // 3. Wish Card Templates
    OCCASIONS.forEach((occ) => {
      items.push({
        id: `occ-${occ.id}`,
        title: occ.label,
        subtitle: `${occ.tagline} — 3D animated digital wish card with custom music and photo unboxing.`,
        category: 'wishes',
        badge: occ.category || 'Wish Card',
        href: `/create-wish?occasion=${occ.id}`,
        tags: [occ.label, occ.tagline || '', occ.urdu || '', 'greeting', 'wish'],
        iconType: 'heart',
      })
    })

    // 4. Visiting Card Themes & Professions
    VISITING_CARD_THEMES.forEach((theme) => {
      items.push({
        id: `vcard-theme-${theme.id}`,
        title: `${theme.name} Digital Business Card`,
        subtitle: 'Interactive vCard with tap-to-call, WhatsApp direct connect, and ISO scannable QR Code.',
        category: 'vcards',
        badge: theme.isPremium ? 'Royal vCard' : 'Digital vCard',
        href: `/create-visiting-card?theme=${theme.id}`,
        tags: [theme.name, 'business card', 'vcard', 'visiting card', 'nfc'],
        iconType: 'credit-card',
      })
    })

    VISITING_CARD_CATEGORIES.forEach((cat) => {
      items.push({
        id: `vcard-cat-${cat.id}`,
        title: `${cat.label} Digital Card`,
        subtitle: cat.tagline,
        category: 'vcards',
        badge: 'Professional',
        href: `/create-visiting-card?category=${cat.id}`,
        tags: [cat.label, cat.tagline, 'vcard', 'professional'],
        iconType: 'credit-card',
      })
    })

    return items
  }, [])

  // Filter items based on active tab and query
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allItems.filter((item) => {
      if (activeTab !== 'all' && item.category !== activeTab) {
        return false
      }
      if (!q) return true
      const matchesTitle = item.title.toLowerCase().includes(q)
      const matchesSub = item.subtitle.toLowerCase().includes(q)
      const matchesBadge = item.badge.toLowerCase().includes(q)
      const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(q))
      return matchesTitle || matchesSub || matchesBadge || matchesTags
    })
  }, [allItems, query, activeTab])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
      setSelectedIndex(0)
    } else {
      setQuery('')
      setActiveTab('all')
    }
  }, [open])

  // Keyboard navigation inside search results
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredItems[selectedIndex]) {
          const selected = filteredItems[selectedIndex]
          router.push(selected.href)
          onClose()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, filteredItems, selectedIndex, router, onClose])

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.children[selectedIndex] as HTMLElement
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex])

  if (!open) return null

  const renderIcon = (type: string) => {
    switch (type) {
      case 'book':
        return <BookOpen className="size-4 text-amber-400" />
      case 'mail':
        return <Mail className="size-4 text-emerald-400" />
      case 'heart':
        return <Heart className="size-4 text-rose-400" />
      case 'credit-card':
        return <CreditCard className="size-4 text-blue-400" />
      default:
        return <Sparkles className="size-4 text-amber-400" />
    }
  }

  const highlightMatch = (text: string, match: string) => {
    if (!match.trim()) return text
    const regex = new RegExp(`(${match.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-amber-400/30 text-amber-200 font-bold px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    )
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Cardzy articles and card templates"
      className="fixed inset-0 z-[99999] flex items-start justify-center p-3 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-3xl border border-amber-500/40 bg-[#090b10] shadow-[0_25px_70px_rgba(0,0,0,0.9)] ring-1 ring-white/10 overflow-hidden flex flex-col max-h-[85vh] animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input Bar */}
        <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-white/10 bg-slate-950/60">
          <Search className="size-5 text-amber-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Search guides, wedding invitations, Eid wishes, vCards..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none"
            aria-label="Search query"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Clear query"
            >
              <X className="size-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-zinc-300 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 px-4 sm:px-6 py-2.5 border-b border-white/10 bg-slate-950/40 overflow-x-auto scrollbar-none text-xs">
          {[
            { id: 'all', label: 'All Results', count: allItems.length },
            { id: 'blog', label: 'Guides & Articles', count: BLOG_POSTS.length + 3 },
            { id: 'invitations', label: 'Invitations', count: INVITATION_TYPES.length },
            { id: 'wishes', label: 'Wish Cards', count: OCCASIONS.length },
            { id: 'vcards', label: 'Digital vCards', count: VISITING_CARD_THEMES.length + VISITING_CARD_CATEGORIES.length },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id as SearchCategory)
                setSelectedIndex(0)
              }}
              className={cn(
                'px-3 py-1.5 rounded-full font-bold transition-all whitespace-nowrap text-xs flex items-center gap-1.5',
                activeTab === tab.id
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-white/10'
              )}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1.5 divide-y divide-white/5">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    'group flex items-start gap-3.5 p-3 sm:p-3.5 rounded-2xl transition-all block',
                    isSelected
                      ? 'bg-white/10 border border-amber-500/40 text-white'
                      : 'hover:bg-white/5 text-zinc-300'
                  )}
                >
                  <div
                    className={cn(
                      'size-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border transition-colors',
                      isSelected
                        ? 'bg-amber-400/20 border-amber-400/60'
                        : 'bg-white/5 border-white/10'
                    )}
                  >
                    {renderIcon(item.iconType)}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                        {highlightMatch(item.title, query)}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/10 text-amber-400 border border-amber-400/30">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-1 leading-normal">
                      {highlightMatch(item.subtitle, query)}
                    </p>
                  </div>

                  <div className="shrink-0 self-center">
                    <ArrowRight
                      className={cn(
                        'size-4 text-amber-400 transition-transform',
                        isSelected ? 'translate-x-1 opacity-100' : 'opacity-0'
                      )}
                    />
                  </div>
                </Link>
              )
            })
          ) : (
            <div className="text-center py-12 space-y-3">
              <div className="size-12 rounded-full bg-white/5 text-zinc-400 flex items-center justify-center mx-auto">
                <Search className="size-6" />
              </div>
              <h3 className="text-sm font-bold text-white">No results found for &ldquo;{query}&rdquo;</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Try searching for keywords like &ldquo;nikkah&rdquo;, &ldquo;wedding invitation&rdquo;, &ldquo;eid wishes&rdquo;, or &ldquo;visiting card&rdquo;.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Hotkey Hint */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-t border-white/10 bg-slate-950/80 text-[11px] text-zinc-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-white">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-white">↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-white">↵</kbd> Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-white">ESC</kbd> Close
            </span>
          </div>
          <span className="font-bold text-amber-400 hidden sm:inline">Cardzy Knowledge & Templates</span>
        </div>
      </div>
    </div>
  )
}
