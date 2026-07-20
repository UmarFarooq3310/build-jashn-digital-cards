'use client'

import Link from 'next/link'
import { CardzyLogo } from '@/components/ui/logo'
import { useLang } from '@/lib/lang/context'

export function SiteFooter() {
  const { t } = useLang()

  return (
    <footer className="border-t border-emerald-900/40 bg-emerald-950 text-emerald-100 overflow-x-hidden">
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
                className="hover:text-amber-400 transition-colors flex items-center gap-1"
              >
                ✉️ cardzyonline@gmail.com
              </a>
              <a
                href="https://wa.me/923093518796"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors flex items-center gap-1"
              >
                💬 WhatsApp: +92 309 3518796
              </a>
            </div>

            {/* Social Media Links */}
            <div className="mt-4 flex items-center gap-2.5">
              {[
                { name: 'TikTok', href: 'https://tiktok.com/@cardzy.online', icon: <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.34V9.05a8.16 8.16 0 0 0 4.91 1.63V7.23a4.85 4.85 0 0 1-1-.54z"/> },
                { name: 'Instagram', href: 'https://instagram.com/cardzy.online', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/> },
                { name: 'Facebook', href: 'https://facebook.com/cardzy.online', icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/> },
                // { name: 'X', href: 'https://x.com/cardzy_online', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/> },
                // { name: 'YouTube', href: 'https://youtube.com/@cardzyonline', icon: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/> },
                // { name: 'LinkedIn', href: 'https://linkedin.com/company/cardzy-online', icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/> }
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="size-7 rounded-full bg-emerald-900/60 border border-emerald-800/40 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-white transition-all shadow-xs"
                >
                  <svg className="size-3.5 fill-current" viewBox="0 0 24 24">{s.icon}</svg>
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
                { href: '/pricing', label: t('footerPlans') },
                { href: '/faq', label: t('faqs') },
                { href: '/guide', label: t('guides') },
                { href: '/privacy', label: t('footerPrivacy') },
              ]}
            />
          </div>
        </div>

        <div className="mt-6 border-t border-emerald-900/50 pt-4 text-center text-xs text-emerald-200/60">
          {t('footerCopyright')}{' '}
          <Link href="/privacy" className="hover:text-amber-400 underline">{t('footerPrivacy')}</Link>
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
    <div>
      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400">{title}</h4>
      <ul className="mt-2.5 space-y-1.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="text-xs sm:text-sm text-emerald-200/80 transition-colors hover:text-amber-300"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
