'use client'

import { useEffect, useState } from 'react'

function diff(target: number) {
  const ms = Math.max(0, target - Date.now())
  const days = Math.floor(ms / 86400000)
  const hours = Math.floor((ms % 86400000) / 3600000)
  const minutes = Math.floor((ms % 3600000) / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return { days, hours, minutes, seconds, done: ms === 0 }
}

export function Countdown({ date, time }: { date: string; time?: string }) {
  const target = new Date(`${date}T${time || '00:00'}`).getTime()
  const [t, setT] = useState(() => diff(target))

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  if (Number.isNaN(target)) return null

  if (t.done) {
    return (
      <p className="shimmer-text text-center text-xl font-bold">
        The day has arrived!
      </p>
    )
  }

  const units = [
    { v: t.days, l: 'Days' },
    { v: t.hours, l: 'Hours' },
    { v: t.minutes, l: 'Mins' },
    { v: t.seconds, l: 'Secs' },
  ]

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {units.map((u) => (
        <div
          key={u.l}
          className="flex min-w-[58px] flex-col items-center rounded-xl border px-2 py-2"
          style={{
            borderColor: 'color-mix(in oklab, var(--c-accent) 45%, transparent)',
            background: 'color-mix(in oklab, var(--c-accent) 10%, transparent)',
          }}
        >
          <span className="text-2xl font-extrabold tabular-nums sm:text-3xl">
            {String(u.v).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase tracking-widest opacity-75">
            {u.l}
          </span>
        </div>
      ))}
    </div>
  )
}
