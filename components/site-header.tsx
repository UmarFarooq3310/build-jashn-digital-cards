'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useJashn } from '@/lib/jashn/store'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/create-wish', label: 'Send a Wish' },
  { href: '/create-invitation', label: 'Create Invitation' },
  { href: '/pricing', label: 'Pricing' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const user = useJashn((s) => s.user)
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/icon.svg" alt="Jashn" className="size-9 rounded-xl" />
          <span className="text-xl font-extrabold tracking-tight text-primary">
            Jashn
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
                pathname === item.href && 'text-foreground',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <Link
              href="/dashboard"
              className={buttonVariants({ variant: 'secondary', size: 'sm' })}
            >
              {(user.name || 'User').split(' ')[0]}&apos;s Dashboard
            </Link>
          ) : (
            <Link href="/login" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
              Log in
            </Link>
          )}
          <Link href="/create-wish" className={buttonVariants({ size: 'sm' })}>
            Get Started
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-foreground md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={user ? '/dashboard' : '/login'}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
            >
              {user ? 'Dashboard' : 'Log in'}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
