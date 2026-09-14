import Link from 'next/link'
import { Sparkles, Home, Mail, CreditCard, Search } from 'lucide-react'
import { CardzyLogo } from '@/components/ui/logo'

export const metadata = {
  title: 'Page Not Found | Cardzy',
  description: 'The celebration card or page you are looking for does not exist or has been moved.',
}

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="size-20 rounded-3xl bg-emerald-950/10 border border-emerald-800/20 flex items-center justify-center text-emerald-700 shadow-sm">
              <CardzyLogo className="size-12" />
            </div>
            <span className="absolute -bottom-2 -right-2 rounded-full bg-amber-500 text-white text-xs font-black px-2 py-0.5 shadow">
              404
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Lost in Celebration?
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Page Not Found
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            The celebration card, invitation, or page you were looking for doesn’t exist or may have been moved.
          </p>
        </div>

        {/* Quick Recovery Pathways */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-left">
          <Link
            href="/create-wish"
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-emerald-900/10 bg-card hover:bg-emerald-950/5 hover:border-emerald-800/30 transition-all shadow-xs group min-h-[48px]"
          >
            <div className="size-9 rounded-xl bg-emerald-700/10 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles className="size-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">3D Wish Cards</div>
              <div className="text-[11px] text-muted-foreground">Animated greetings</div>
            </div>
          </Link>

          <Link
            href="/create-invitation"
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-emerald-900/10 bg-card hover:bg-emerald-950/5 hover:border-emerald-800/30 transition-all shadow-xs group min-h-[48px]"
          >
            <div className="size-9 rounded-xl bg-amber-700/10 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Mail className="size-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">Invitations</div>
              <div className="text-[11px] text-muted-foreground">With WhatsApp RSVP</div>
            </div>
          </Link>

          <Link
            href="/create-visiting-card"
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-emerald-900/10 bg-card hover:bg-emerald-950/5 hover:border-emerald-800/30 transition-all shadow-xs group min-h-[48px]"
          >
            <div className="size-9 rounded-xl bg-blue-700/10 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <CreditCard className="size-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">Smart vCards</div>
              <div className="text-[11px] text-muted-foreground">Digital business card</div>
            </div>
          </Link>
        </div>

        {/* Primary Return Button */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 px-6 py-3 text-sm font-bold text-white shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <Home className="size-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/blog"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-border bg-secondary/60 hover:bg-secondary px-5 py-3 text-sm font-semibold text-foreground transition-all cursor-pointer"
          >
            <Search className="size-4 text-amber-500" />
            <span>Browse Guides & Ideas</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
