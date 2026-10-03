'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Sparkles, MailOpen, Wand2, CreditCard } from 'lucide-react'
import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'

interface DockItem {
  href: string
  labelKey: string
  defaultLabel: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  color: string
}

const DOCK_ITEMS: DockItem[] = [
  { href: '/', labelKey: 'home', defaultLabel: 'Home', icon: Home, color: 'text-emerald-500' },
  { href: '/create-wish', labelKey: 'wishes', defaultLabel: 'Wishes', icon: Sparkles, color: 'text-rose-500' },
  { href: '/create-invitation', labelKey: 'invitations', defaultLabel: 'Invites', icon: MailOpen, badge: 'RSVP', color: 'text-amber-500' },
  { href: '/create-magic-link', labelKey: 'navMagicLink', defaultLabel: 'Magic', icon: Wand2, badge: 'NEW', color: 'text-purple-500' },
  { href: '/create-visiting-card', labelKey: 'visitingCards', defaultLabel: 'vCards', icon: CreditCard, color: 'text-[#D4AF37]' },
]

export function MobileBottomDock() {
  const pathname = usePathname()
  const { t } = useLang()

  // Hide on public card receiver / sender screens
  const isCardRoute =
    pathname?.startsWith('/w/') ||
    pathname?.startsWith('/i/') ||
    pathname?.startsWith('/v/') ||
    pathname?.startsWith('/m/')

  // Hide on creation forms so keyboard and form action buttons have full screen
  const isCreationRoute =
    pathname === '/create-wish' ||
    pathname === '/create-invitation' ||
    pathname === '/create-magic-link' ||
    pathname === '/create-visiting-card'

  if (isCardRoute || isCreationRoute) return null

  return (
    <nav
      aria-label="Mobile Navigation Dock"
      className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-background/90 backdrop-blur-xl border-t border-border/80 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] px-2 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {DOCK_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          const label = t(item.labelKey, item.defaultLabel)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all select-none',
                isActive
                  ? 'text-foreground font-extrabold scale-105'
                  : 'text-muted-foreground hover:text-foreground font-medium'
              )}
            >
              <div className="relative">
                <Icon
                  className={cn(
                    'size-5 transition-transform',
                    isActive ? item.color : 'text-muted-foreground'
                  )}
                />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-3 px-1 py-0.2 rounded-full text-[8px] font-black uppercase tracking-tight bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-2xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
                {label}
              </span>
              {isActive && (
                <span className="absolute -bottom-1 size-1 rounded-full bg-emerald-500" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
