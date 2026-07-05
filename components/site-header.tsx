'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, LogOut } from 'lucide-react'
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
  const router = useRouter()
  const user = useJashn((s) => s.user)
  const signOut = useJashn((s) => s.signOut)
  const [open, setOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

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
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-full border border-border/80 bg-secondary/50 px-3 py-1 text-sm font-semibold transition-all hover:bg-secondary"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-r from-primary to-emerald-600 text-xs font-bold text-white uppercase shadow-sm">
                  {(user.name || 'U').charAt(0)}
                </span>
                <span className="text-foreground max-w-[120px] truncate">
                  {(user.name || 'User').split(' ')[0]}
                </span>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/40 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
                aria-label="Sign out"
              >
                <LogOut className="size-3.5" />
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
                Log in
              </Link>
              <Link href="/signup" className={buttonVariants({ variant: 'outline', size: 'sm', className: 'font-semibold' })}>
                Sign Up Free
              </Link>
            </>
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
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
                >
                  <span className="flex size-6 items-center justify-center rounded-full bg-gradient-to-r from-primary to-emerald-600 text-[10px] font-bold text-white uppercase">
                    {(user.name || 'U').charAt(0)}
                  </span>
                  <span>Dashboard ({(user.name || 'User').split(' ')[0]})</span>
                </Link>
                <button
                  onClick={() => { setOpen(false); handleSignOut() }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <LogOut className="size-4" /> Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-primary hover:bg-secondary"
                >
                  Sign Up Free →
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
