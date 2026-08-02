import { Sparkles, PartyPopper } from 'lucide-react'

export function HeroStaticCard() {
  return (
    <div className="relative w-full py-1">
      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-full opacity-30 blur-3xl bg-[radial-gradient(circle,#10b981_0%,transparent_70%)]" />
      <div className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-xl rounded-3xl px-5 py-6 text-center shadow-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950 text-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#10b98120,transparent_60%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-3.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
            <Sparkles className="size-3.5 text-amber-400 animate-pulse" />
            Special Celebration 🌟
          </span>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
            Sending Warmest Wishes
          </p>

          <div className="flex size-12 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 shadow-md">
            <PartyPopper className="size-6 text-emerald-300" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-200 via-teal-200 to-amber-200 bg-clip-text text-transparent">
            Warmest Wishes & Joy!
          </h2>

          <span className="block h-px w-20 bg-emerald-500/40" />

          <div className="w-full rounded-2xl p-4 text-center border border-emerald-500/20 bg-emerald-500/10">
            <p className="text-sm sm:text-base leading-relaxed text-emerald-100">
              “May your day be filled with laughter, happiness, and unforgettable moments. Wishing you all the best today and always!”
            </p>
          </div>

          <p className="text-sm text-emerald-200/90">
            <span className="opacity-75">With warm regards, </span>
            <span className="font-bold text-amber-300">Friends & Family</span>
          </p>

          <div className="mt-2 w-full border-t border-emerald-500/20 pt-3">
            <p className="text-xs font-semibold text-emerald-300/80">
              Cardzy · Interactive 3D Digital Cards
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
