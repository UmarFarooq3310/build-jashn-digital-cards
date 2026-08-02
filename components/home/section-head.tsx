'use client'

import { useLang } from '@/lib/lang/context'
import { cn } from '@/lib/utils'

export function SectionHead({
  kicker,
  title,
  desc,
  kickerColor = 'text-amber-600 dark:text-amber-400',
  className,
}: {
  kicker: string
  title: string
  desc?: string
  kickerColor?: string
  className?: string
}) {
  const { lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'
  return (
    <div className={cn("mx-auto mb-10 max-w-2xl text-center", className)}>
      <p className={cn("text-xs font-bold uppercase tracking-[0.2em]", kickerColor, isUrdu && "font-urdu tracking-normal text-sm")}>
        {kicker}
      </p>
      <h2 className={cn("mt-2 text-balance font-extrabold tracking-tight text-foreground", isUrdu ? "font-urdu text-2xl sm:text-3xl md:text-4xl leading-[2.2] py-2" : "text-3xl sm:text-4xl leading-tight")}>
        {title}
      </h2>
      {desc ? (
        <p className={cn("mx-auto mt-3 max-w-xl text-pretty text-muted-foreground", isUrdu ? "font-urdu text-base sm:text-lg leading-[2.2] py-2" : "text-sm sm:text-base leading-relaxed")}>
          {desc}
        </p>
      ) : null}
    </div>
  )
}
