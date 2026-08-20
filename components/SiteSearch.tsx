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

export interface SearchItem {
  id: string
  title: string
  subtitle: string
  category: 'blog' | 'invitations' | 'wishes' | 'vcards'
  badge: string
  href: string
  tags?: string[]
  iconType: string
}

export function SiteSearch({
  variant = 'button',
  className,
}: {
  variant?: 'button' | 'inline'
  className?: string
}) {
  const router = useRouter()
  const { lang, t } = useLang()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<SearchCategory>('all')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Global keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      } else if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setSelectedIndex(0)
    } else {
      setQuery('')
      setActiveTab('all')
    }
  }, [open])

  // Build comprehensive searchable index
  const allItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = []

    // 1. Blog Posts & Guides
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

    // 2. Curated guides
    items.push(
      {
        id: 'guide-wedding',
        title: 'Complete Pakistani Wedding Invitation Wording Guide (Urdu & English)',
        subtitle: 'Bilingual Nikkah, Mehndi, Barat, and Walima card wording samples with RSVP.',
        category: 'blog',
        badge: 'Wedding Guide',
        href: '/guide/pakistani-wedding-invitations',
        tags: ['wedding', 'pakistani', 'nikkah', 'walima', 'wording', 'urdu', 'mehndi'],
        iconType: 'book',
      },
      {
        id: 'guide-eid',
        title: 'Creative Wording & Message Ideas for Eid Mubarak Wish Cards',
        subtitle: 'Traditional Urdu, English, and Arabic Eid greetings and reply etiquette.',
        category: 'blog',
        badge: 'Eid Guide',
        href: '/guide/eid-wording-ideas',
        tags: ['eid', 'mubarak', 'eid-ul-fitr', 'eid-ul-adha', 'wishes', 'dua', 'urdu'],
        iconType: 'book',
      },
      {
        id: 'guide-birthday',
        title: 'Heartfelt Birthday Card Wishes & WhatsApp Message Ideas',
        subtitle: 'Funny, formal, and loving birthday greeting wording for cards.',
        category: 'blog',
        badge: 'Birthday Guide',
        href: '/guide/birthday-wishes-wording',
        tags: ['birthday', 'wishes', 'celebration', 'party', 'greetings'],
        iconType: 'book',
      }
    )

    // 3. Wedding & Party Invitation Templates
    INVITATION_TYPES.forEach((inv) => {
      items.push({
        id: `inv-${inv.id}`,
        title: `${inv.label} Invitation Template`,
        subtitle: `Create an animated ${inv.label} digital invitation with live WhatsApp RSVP.`,
        category: 'invitations',
        badge: inv.category === 'Wedding' ? 'Wedding Invitation' : `${inv.category} Invitation`,
        href: `/create-invitation?type=${inv.id}`,
        tags: [inv.label.toLowerCase(), inv.category.toLowerCase(), 'rsvp', 'template'],
        iconType: 'mail',
      })
    })

    // 4. Digital Wish Card Occasions
    OCCASIONS.forEach((occ) => {
      items.push({
        id: `occ-${occ.id}`,
        title: `${occ.label} Animated Wish Card`,
        subtitle: `Personalize a 3D animated ${occ.label} card with music and photo.`,
        category: 'wishes',
        badge: occ.category ? occ.category.toUpperCase() : 'Wish Card',
        href: `/create-wish?occasion=${occ.id}`,
        tags: [occ.label.toLowerCase(), occ.category, 'greeting', 'wish'],
        iconType: 'heart',
      })
    })

    // 5. Digital Visiting Cards (vCards)
    VISITING_CARD_THEMES.forEach((theme) => {
      items.push({
        id: `vcard-${theme.id}`,
        title: `${theme.name} Digital Business Card Theme`,
        subtitle: `${theme.name} — Interactive smart contact card with 1-click save.`,
        category: 'vcards',
        badge: 'Digital vCard',
        href: `/create-visiting-card?theme=${theme.id}`,
        tags: [theme.name.toLowerCase(), 'business card', 'vcard', 'networking', 'qr code'],
        iconType: 'card',
      })
    })

    return items
  }, [])

  // Filtered search results
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allItems.filter((item) => {
      if (activeTab !== 'all' && item.category !== activeTab) {
        return false
      }
      if (!q) return true
      const inTitle = item.title.toLowerCase().includes(q)
      const inSub = item.subtitle.toLowerCase().includes(q)
      const inBadge = item.badge.toLowerCase().includes(q)
      const inTags = item.tags?.some((t) => t.toLowerCase().includes(q))
      return inTitle || inSub || inBadge || inTags
    })
  }, [allItems, query, activeTab])

  const handleSelect = (item: SearchItem) => {
    setOpen(false)
    router.push(item.href)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex])
      }
    }
  }

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'book':
        return <BookOpen className="size-4 text-amber-400" />
      case 'mail':
        return <Mail className="size-4 text-emerald-400" />
      case 'heart':
        return <Heart className="size-4 text-rose-400" />
      case 'card':
        return <CreditCard className="size-4 text-blue-400" />
      default:
        return <Sparkles className="size-4 text-amber-400" />
    }
  }

  return (
    <>
      {/* Schema.org SearchAction structured markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Cardzy',
            url: 'https://cardzy.online',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://cardzy.online/blog?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      {/* Trigger Button or Inline Form */}
      {variant === 'button' ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            'inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-secondary/80 px-3.5 py-1.5 text-xs text-muted-foreground hover:border-amber-500/60 hover:text-foreground transition-all cursor-pointer shadow-2xs',
            className
          )}
          aria-label="Search site articles and templates (Ctrl+K)"
        >
          <Search className="size-3.5 text-amber-500" />
          <span className="hidden sm:inline">Search cards &amp; guides...</span>
          <span className="sm:hidden">Search...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border/80 bg-background/80 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground font-semibold">
            <Command className="size-2.5" />K
          </kbd>
        </button>
      ) : (
        <div className={cn('relative flex items-center w-full', className)}>
          <Search className="absolute left-3 size-4 text-amber-500" />
          <input
            type="text"
            onClick={() => setOpen(true)}
            placeholder="Search wedding templates, wish cards, guides..."
            className="w-full rounded-2xl border border-amber-500/40 bg-card/90 py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-500 shadow-sm"
            readOnly
          />
        </div>
      )}

      {/* Full Accessible Search Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site Search"
          className="fixed inset-0 z-[999999] flex items-start justify-center p-3 sm:p-6 md:p-10 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          <div className="relative w-full max-w-2xl rounded-3xl border border-amber-500/40 bg-[#0d0f15] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-white animate-in zoom-in-95 duration-200">
            {/* Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-slate-950/80">
              <Search className="size-5 text-amber-400 shrink-0 ml-1" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search wedding cards, Eid wishes, RSVP guides, vCards..."
                className="w-full bg-transparent px-3 text-base text-white placeholder:text-zinc-500 focus:outline-none"
                aria-label="Search query"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X className="size-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="ml-2 rounded-xl p-2 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close search modal"
              >
                <kbd className="hidden sm:inline text-[11px] font-mono bg-white/10 border border-white/15 px-1.5 py-0.5 rounded">
                  ESC
                </kbd>
                <X className="size-5 sm:hidden" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10 bg-[#0a0a0c] overflow-x-auto text-xs scrollbar-none">
              {(
                [
                  { key: 'all', label: 'All Catalog' },
                  { key: 'blog', label: 'Articles & Guides' },
                  { key: 'invitations', label: 'Invitations' },
                  { key: 'wishes', label: 'Wish Cards' },
                  { key: 'vcards', label: 'Digital vCards' },
                ] as { key: SearchCategory; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.key)
                    setSelectedIndex(0)
                  }}
                  className={cn(
                    'px-3 py-1.5 rounded-full font-bold transition-all whitespace-nowrap',
                    activeTab === tab.key
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Results List */}
            <div ref={listRef} className="flex-1 overflow-y-auto p-3 space-y-1.5 divide-y divide-white/5">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => {
                  const isSelected = selectedIndex === index
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        'group flex items-center justify-between gap-3 p-3 rounded-2xl cursor-pointer transition-all',
                        isSelected ? 'bg-amber-500/15 border border-amber-500/40' : 'hover:bg-white/5 border border-transparent'
                      )}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0 mt-0.5">
                          {getItemIcon(item.iconType)}
                        </div>
                        <div className="min-w-0 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                              {item.title}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-amber-300 shrink-0 border border-white/10">
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 line-clamp-1 leading-relaxed">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="size-4 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-12 px-4 space-y-2 text-zinc-400">
                  <Search className="size-8 text-zinc-600 mx-auto" />
                  <p className="text-sm font-bold text-white">No results found for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs">Try searching for &ldquo;wedding&rdquo;, &ldquo;nikkah&rdquo;, &ldquo;eid&rdquo;, &ldquo;rsvp&rdquo;, or &ldquo;vcard&rdquo;.</p>
                </div>
              )}
            </div>

            {/* Bottom Footer Info */}
            <div className="px-4 py-2.5 border-t border-white/10 bg-slate-950 text-[11px] text-zinc-400 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>Navigate <kbd className="font-mono bg-white/10 px-1 rounded">↑</kbd><kbd className="font-mono bg-white/10 px-1 rounded">↓</kbd></span>
                <span>Select <kbd className="font-mono bg-white/10 px-1 rounded">↵</kbd></span>
              </div>
              <span>{filteredItems.length} items in index</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
