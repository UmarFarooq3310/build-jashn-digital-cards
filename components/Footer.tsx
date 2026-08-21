import Link from 'next/link'
import { CardzyLogo } from '@/components/ui/logo'

export function Footer() {
  return (
    <footer className="border-t border-emerald-900/40 bg-emerald-950 text-emerald-100 overflow-x-hidden" aria-label="Site Footer">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
              <CardzyLogo className="size-8" />
              <span className="text-xl font-extrabold bg-gradient-to-r from-amber-400 to-emerald-300 bg-clip-text text-transparent">
                Cardzy
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
              Create, customize, and share interactive 3D digital wish cards, wedding invitations with automated WhatsApp RSVP tracking, and smart paperless visiting cards.
            </p>
            <div className="text-xs text-emerald-200/70 space-y-1.5 pt-2">
              <p>📍 <strong>HQ:</strong> Cardzy Digital Solutions, Islamabad / Rawalpindi, Pakistan</p>
              <p>
                ✉️ <a href="mailto:cardzyonline@gmail.com" className="hover:text-amber-400 underline">cardzyonline@gmail.com</a>
              </p>
              <p>
                💬 <a href="https://wa.me/923093518796" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 underline">WhatsApp: +92 309 3518796</a>
              </p>
            </div>
          </div>

          {/* Column 1: Products */}
          <div className="space-y-3">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400">
              Digital Cards
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-200/80">
              <li>
                <a href="/create-wish" className="hover:text-amber-300 transition-colors inline-flex items-center min-h-[48px] py-1">
                  3D Wish Cards
                </a>
              </li>
              <li>
                <a href="/create-invitation" className="hover:text-amber-300 transition-colors inline-flex items-center min-h-[48px] py-1">
                  Wedding Invitations
                </a>
              </li>
              <li>
                <a href="/create-visiting-card" className="hover:text-amber-300 transition-colors inline-flex items-center min-h-[48px] py-1">
                  Smart Digital vCards
                </a>
              </li>
              <li>
                <a href="/custom-order" className="hover:text-amber-300 transition-colors inline-flex items-center min-h-[48px] py-1">
                  Custom Orders
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Guides & Ideas */}
          <div className="space-y-3">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400">
              Celebration Guides
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-200/80">
              <li>
                <a href="/guide/eid-wording-ideas" className="hover:text-amber-300 transition-colors inline-flex items-center min-h-[48px] py-1">
                  Eid Mubarak Wording &amp; Wishes
                </a>
              </li>
              <li>
                <a href="/guide/pakistani-wedding-invitations" className="hover:text-amber-300 transition-colors inline-flex items-center min-h-[48px] py-1">
                  Pakistani Wedding Card Wording
                </a>
              </li>
              <li>
                <a href="/authors" className="hover:text-amber-300 transition-colors inline-flex items-center min-h-[48px] py-1">
                  Editorial Authors &amp; Stylists
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-amber-300 transition-colors inline-flex items-center min-h-[48px] py-1">
                  Guides &amp; Celebration Ideas
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-amber-300 transition-colors inline-flex items-center min-h-[48px] py-1">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Legal (Crawlable standard anchor tags) */}
          <div className="space-y-3">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400">
              Company &amp; Legal
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-200/80">
              <li>
                <a href="/contact" className="hover:text-amber-300 transition-colors inline-flex items-center min-h-[48px] py-1">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-amber-300 transition-colors inline-flex items-center min-h-[48px] py-1">
                  About Us
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-amber-300 transition-colors inline-flex items-center min-h-[48px] py-1">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/cookies" className="hover:text-amber-300 transition-colors inline-flex items-center min-h-[48px] py-1">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="hover:text-amber-300 transition-colors inline-flex items-center min-h-[48px] py-1">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/disclaimer" className="hover:text-amber-300 transition-colors inline-flex items-center min-h-[48px] py-1">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-emerald-900/60 pt-6 text-center text-xs sm:text-sm text-emerald-200/70 flex flex-wrap items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} Cardzy Digital Solutions. All rights reserved.</span>
          <span className="text-xs text-emerald-300/60">
            Smart digital celebration cards &amp; contactless executive business vCards.
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
