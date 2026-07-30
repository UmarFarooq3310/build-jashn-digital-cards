import { Sparkles, Heart } from 'lucide-react'

export function HeroStaticCard() {
  return (
    <div className="relative w-full py-1">
      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-full opacity-30 blur-3xl bg-[radial-gradient(circle,#ffd700_0%,transparent_70%)]" />
      <div className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-xl rounded-3xl px-5 py-6 text-center shadow-2xl border border-amber-500/30 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 text-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f59e0b15,transparent_60%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-3.5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            Dearest You & Family
          </p>

          <div className="flex size-12 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400 shadow-md">
            <Sparkles className="size-6 text-amber-400" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
            Eid Mubarak
          </h2>

          <span className="block h-px w-20 bg-amber-500/40" />

          <div className="w-full rounded-2xl p-4 text-center border border-amber-500/20 bg-amber-500/5">
            <p className="text-sm sm:text-base leading-relaxed text-emerald-100">
              “May this blessed Eid bring joy, peace and prosperity to you and your loved ones.”
            </p>
          </div>

          <p className="text-sm text-emerald-200/90">
            <span className="opacity-75">With love, </span>
            <span className="font-bold text-amber-300">Ahmed Family</span>
          </p>

          <div className="mt-2 w-full border-t border-amber-500/20 pt-3">
            <p className="text-xs font-semibold text-emerald-300/80">
              Cardzy · Create yours free
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
