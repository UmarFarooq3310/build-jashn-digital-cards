'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, LogOut, Globe, ChevronDown } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useJashn } from '@/lib/jashn/store'
import { useLang, LANGUAGES } from '@/lib/lang/context'
import { cn } from '@/lib/utils'
import { CardzyLogo } from '@/components/ui/logo'

function SiteHeaderInner() {
  const pathname = usePathname()
  const router = useRouter()
  const user = useJashn((s) => s.user)
  const signOut = useJashn((s) => s.signOut)
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const { lang, setLang, t } = useLang()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0]

  return (
    <header className="sticky top-0 z-[100] border-b border-emerald-900/20 bg-background/95 backdrop-blur-md shadow-sm transition-all">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <CardzyLogo className="size-9 transition-transform group-hover:scale-105" />
          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-800 to-amber-600 dark:from-emerald-400 dark:to-amber-400 bg-clip-text text-transparent">
            Cardzy
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {[
            { href: '/', key: 'home', fallback: 'Home' },
            { href: '/create-wish', key: 'sendWish', fallback: 'Send Wish' },
            { href: '/create-invitation', key: 'createInvitation', fallback: 'Invitations' },
            { href: '/create-visiting-card', key: 'createVisitingCard', fallback: 'Visiting Cards' },
            { href: '/pricing', key: 'pricing', fallback: 'Pricing' },
            { href: '/faq', key: 'faqs', fallback: 'FAQs' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-muted-foreground transition-all hover:bg-emerald-950/10 hover:text-emerald-800 dark:hover:text-amber-400',
                pathname === item.href && 'text-emerald-800 dark:text-amber-400 font-bold bg-emerald-950/5',
              )}
            >
              {t(item.key as any) || item.fallback}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {/* Language Switcher */}
          <div className="relative z-[9999]">
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 transition-all hover:bg-amber-500/20 shadow-xs"
              aria-label="Select language"
            >
              <Globe className="size-3.5 text-amber-600" />
              <span>{currentLang.label}</span>
              <ChevronDown className={cn('size-3 transition-transform', langOpen && 'rotate-180')} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 z-[9999] w-56 rounded-2xl border border-amber-500/40 bg-card shadow-2xl p-2.5 max-h-80 overflow-y-auto ring-1 ring-black/5">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false) }}
                    className={cn(
                      'w-full text-left rounded-xl px-3 py-2 text-xs sm:text-sm font-medium transition-colors hover:bg-emerald-950/10',
                      lang === l.code ? 'font-bold text-emerald-800 bg-emerald-950/10' : 'text-foreground'
                    )}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-emerald-950/10 px-3.5 py-1 text-sm font-semibold transition-all hover:bg-emerald-950/20"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-r from-emerald-700 to-amber-600 text-xs font-bold text-white uppercase shadow-sm">
                  {(user.name || 'U').charAt(0)}
                </span>
                <span className="text-foreground max-w-[120px] truncate">
                  {(user.name || 'User').split(' ')[0]}
                </span>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/40 px-3.5 py-1.5 text-xs font-semibold text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
                aria-label="Sign out"
              >
                <LogOut className="size-3.5" />
                {t('signOut')}
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={buttonVariants({ variant: 'ghost', size: 'sm', className: 'font-semibold' })}>
                {t('logIn')}
              </Link>
              <Link href="/signup" className={buttonVariants({ variant: 'outline', size: 'sm', className: 'font-bold border-amber-500/30 text-amber-700 hover:bg-amber-500/10' })}>
                {t('signUpFree')}
              </Link>
            </>
          )}
          <Link href="/create-wish" className={buttonVariants({ size: 'sm', className: 'font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm rounded-xl' })}>
            {t('getStarted')}
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
            {[
              { href: '/', key: 'home', fallback: 'Home' },
              { href: '/create-wish', key: 'sendWish', fallback: 'Send Wish' },
              { href: '/create-invitation', key: 'createInvitation', fallback: 'Invitations' },
              { href: '/create-visiting-card', key: 'createVisitingCard', fallback: 'Visiting Cards' },
              { href: '/pricing', key: 'pricing', fallback: 'Pricing' },
              { href: '/faq', key: 'faqs', fallback: 'FAQs' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {t(item.key as any) || item.fallback}
              </Link>
            ))}

            {/* Mobile language picker */}
            <div className="mt-2 pt-2 border-t border-border">
              <p className="px-3 pb-1 text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="size-3.5" /> {t('languageLabel')}
              </p>
              <div className="grid grid-cols-2 gap-1">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setOpen(false) }}
                    className={cn(
                      'rounded-lg px-3 py-2 text-xs font-medium text-left transition-colors hover:bg-secondary',
                      lang === l.code ? 'bg-primary/10 text-primary font-bold' : 'text-foreground'
                    )}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

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
                  <LogOut className="size-4" /> {t('signOut')}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  {t('logIn')}
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-primary hover:bg-secondary"
                >
                  {t('signUpFree')} →
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

// NAV labels resolved via t() inside component

export function SiteHeader() {
  return <SiteHeaderInner />
}
