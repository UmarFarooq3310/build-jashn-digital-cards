'use client'

import Link from 'next/link'
import { CardzyLogo } from '@/components/ui/logo'
import { useLang } from '@/lib/lang/context'

export function SiteFooter() {
  const { t } = useLang()

  return (
    <footer className="border-t border-emerald-900/40 bg-emerald-950 text-emerald-100 overflow-x-hidden" suppressHydrationWarning>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <CardzyLogo className="size-8" />
              <span className="text-xl font-extrabold bg-gradient-to-r from-amber-400 to-emerald-300 bg-clip-text text-transparent">Cardzy</span>
            </div>
            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-emerald-200/80">
              {t('footerTagline')}
            </p>
            <div className="mt-3 flex flex-col gap-1.5 text-xs text-emerald-200/70">
              <span>📍 Global HQ: Islamabad / Rawalpindi, Pakistan</span>
              <a
                href="mailto:cardzyonline@gmail.com"
                suppressHydrationWarning
                className="hover:text-amber-400 transition-colors flex items-center gap-1"
              >
                ✉️ cardzyonline@gmail.com
              </a>
              <a
                href="https://wa.me/923093518796"
                target="_blank"
                rel="noopener noreferrer"
                suppressHydrationWarning
                className="hover:text-amber-400 transition-colors flex items-center gap-1"
              >
                💬 WhatsApp: +92 309 3518796
              </a>
            </div>

            {/* Social Media Links */}
            <div className="mt-4 flex items-center gap-3">
              {[
                { name: 'TikTok', href: 'https://www.tiktok.com/@cardzyonline?_r=1&_t=ZS-98C2zxEx30S', icon: <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.34V9.05a8.16 8.16 0 0 0 4.91 1.63V7.23a4.85 4.85 0 0 1-1-.54z"/> },
                { name: 'Instagram', href: 'https://www.instagram.com/cardzyonline', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/> },
                { name: 'Facebook', href: 'https://www.facebook.com/share/1bPTaFnxDz/', icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/> },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="min-h-[48px] min-w-[48px] size-12 rounded-full bg-emerald-900/60 border border-emerald-800/40 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-white transition-all shadow-xs p-3"
                >
                  <svg className="size-4 fill-current" viewBox="0 0 24 24">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            <FooterCol
              title={t('footerCards')}
              links={[
                { href: '/create-wish', label: t('sendWish') },
                { href: '/create-invitation', label: t('createInvitation') },
              ]}
            />
            <FooterCol
              title={t('footerAccount')}
              links={[
                { href: '/dashboard', label: t('dashboard') },
                { href: '/pricing', label: t('pricing') },
                { href: '/login', label: t('logIn') },
              ]}
            />
            <FooterCol
              title={t('footerPlatform')}
              links={[
                { href: '/', label: t('home') },
                { href: '/about', label: t('footerAbout') },
                { href: '/pricing', label: t('footerPlans') },
                { href: '/faq', label: t('faqs') },
                { href: '/guide', label: t('guides') },
                { href: '/privacy', label: t('footerPrivacy') },
                { href: '/terms', label: t('footerTerms') },
              ]}
            />
          </div>
        </div>

        <div className="mt-6 border-t border-emerald-900/50 pt-4 text-center text-xs text-emerald-200/60 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <span>{t('footerCopyright')}</span>
          <Link href="/about" className="hover:text-amber-400 underline py-2 min-h-[44px] flex items-center">{t('footerAbout')}</Link>
          <span>•</span>
          <Link href="/privacy" className="hover:text-amber-400 underline py-2 min-h-[44px] flex items-center">{t('footerPrivacy')}</Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-amber-400 underline py-2 min-h-[44px] flex items-center">{t('footerTerms')}</Link>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: { href: string; label: string }[]
}) {
  return (
    <div suppressHydrationWarning>
      <h4 suppressHydrationWarning className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400">{title}</h4>
      <ul className="mt-2.5 space-y-1">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="text-xs sm:text-sm text-emerald-200/80 transition-colors hover:text-amber-300 inline-flex items-center py-2 min-h-[44px]"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
