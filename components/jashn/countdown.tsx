'use client'

import { useEffect, useRef, useState } from 'react'

function diff(target: number) {
  const ms = Math.max(0, target - Date.now())
  const days    = Math.floor(ms / 86400000)
  const hours   = Math.floor((ms % 86400000) / 3600000)
  const minutes = Math.floor((ms % 3600000) / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return { days, hours, minutes, seconds, done: ms === 0 }
}

/** Single animated flip unit */
function FlipUnit({ value, label }: { value: number; label: string }) {
  const str = String(value).padStart(2, '0')
  const prevRef = useRef(str)
  const [flip, setFlip] = useState(false)

  useEffect(() => {
    if (prevRef.current !== str) {
      setFlip(true)
      const id = setTimeout(() => {
        setFlip(false)
        prevRef.current = str
      }, 360)
      return () => clearTimeout(id)
    }
  }, [str])

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Flip card wrapper */}
      <div
        className="countdown-unit-bg relative flex items-center justify-center overflow-hidden rounded-xl select-none"
        style={{
          width: 54,
          height: 52,
          background: 'color-mix(in oklab, var(--c-accent) 12%, rgba(0,0,0,0.25))',
          border: '1px solid color-mix(in oklab, var(--c-accent) 35%, transparent)',
          boxShadow:
            '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
          perspective: '300px',
        }}
      >
        {/* Horizontal mid-line crease */}
        <div
          className="absolute inset-x-0 z-10 pointer-events-none"
          style={{
            top: '50%',
            height: '1px',
            background: 'rgba(0,0,0,0.2)',
          }}
        />

        {/* Top half — static current value */}
        <div
          className="countdown-unit-top-half absolute top-0 inset-x-0 flex items-end justify-center pb-0.5 overflow-hidden"
          style={{
            height: '50%',
            background: 'color-mix(in oklab, var(--c-accent) 8%, rgba(0,0,0,0.18))',
          }}
        >
          <span
            className="text-2xl font-extrabold tabular-nums leading-none"
            style={{ color: 'var(--c-ink)' }}
          >
            {str}
          </span>
        </div>

        {/* Bottom half — static current value */}
        <div
          className="absolute bottom-0 inset-x-0 flex items-start justify-center pt-0.5 overflow-hidden"
          style={{ height: '50%' }}
        >
          <span
            className="text-2xl font-extrabold tabular-nums leading-none"
            style={{ color: 'var(--c-ink)', opacity: 0.85 }}
          >
            {str}
          </span>
        </div>

        {/* Flip animation overlay — old value flipping away */}
        {flip && (
          <div
            className="countdown-unit-flip-overlay absolute inset-0 flex items-center justify-center"
            style={{
              animation: 'flip-in 0.36s cubic-bezier(0.34,1.56,0.64,1) both',
              background: 'color-mix(in oklab, var(--c-accent) 14%, rgba(0,0,0,0.25))',
              borderRadius: 'inherit',
              zIndex: 5,
            }}
          >
            <span
              className="text-2xl font-extrabold tabular-nums"
              style={{ color: 'var(--c-glow)' }}
            >
              {str}
            </span>
          </div>
        )}

        {/* Shine glint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)',
            borderRadius: 'inherit',
            zIndex: 3,
          }}
        />
      </div>

      {/* Label */}
      <span
        className="text-[9px] font-semibold uppercase tracking-[0.2em]"
        style={{ color: 'var(--c-accent)', opacity: 0.8 }}
      >
        {label}
      </span>
    </div>
  )
}

/** Separator colon */
function Sep() {
  return (
    <div
      className="flex flex-col gap-1.5 pb-5"
      aria-hidden="true"
    >
      <div
        className="w-1 h-1 rounded-full"
        style={{ background: 'var(--c-accent)', opacity: 0.6 }}
      />
      <div
        className="w-1 h-1 rounded-full"
        style={{ background: 'var(--c-accent)', opacity: 0.6 }}
      />
    </div>
  )
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
      <p className="shimmer-gold text-center text-lg font-bold">
        🎉 The day has arrived!
      </p>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Label */}
      <p
        className="text-[10px] uppercase tracking-[0.25em] font-medium opacity-55"
        style={{ color: 'var(--c-ink)' }}
      >
        Counting down to the big day
      </p>

      {/* Flip units */}
      <div className="flex items-end gap-1.5">
        <FlipUnit value={t.days}    label="Days" />
        <Sep />
        <FlipUnit value={t.hours}   label="Hrs" />
        <Sep />
        <FlipUnit value={t.minutes} label="Min" />
        <Sep />
        <FlipUnit value={t.seconds} label="Sec" />
      </div>
    </div>
  )
}
