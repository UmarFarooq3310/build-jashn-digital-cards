'use client'

import React from 'react'

interface DecorAccentsProps {
  keys?: string[]
}

export function CardDecorAccents({ keys = [] }: DecorAccentsProps) {
  if (!keys || keys.length === 0) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem] z-[2]" aria-hidden="true">
      {keys.map((key) => {
        switch (key) {
          case 'moon':
            return (
              <div key={key} className="absolute right-6 top-8 animate-[bounce_4s_ease-in-out_infinite] text-[var(--c-accent)] opacity-80">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3a9 9 0 1 0 9 9 9.75 9.75 0 0 0-.67-3.4 6.75 6.75 0 0 1-7.93-7.93A9.75 9.75 0 0 0 12 3Z" />
                </svg>
              </div>
            )
          case 'star-cluster':
            return (
              <div key={key} className="absolute inset-0 text-[var(--c-accent)]">
                {/* Twinkling stars scattered in corners */}
                <div className="absolute left-10 top-12 animate-[pulse_1.5s_infinite] opacity-60">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                </div>
                <div className="absolute right-12 top-20 animate-[pulse_2s_infinite] [animation-delay:0.5s] opacity-70">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                </div>
                <div className="absolute left-8 bottom-24 animate-[pulse_1.8s_infinite] [animation-delay:0.3s] opacity-50">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                </div>
                <div className="absolute right-10 bottom-28 animate-[pulse_2.2s_infinite] [animation-delay:0.7s] opacity-60">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                </div>
              </div>
            )
          case 'dholak':
            return (
              <div key={key} className="absolute left-4 bottom-6 text-[var(--c-accent)] opacity-85 rotate-[15deg] animate-[wiggle_6s_ease-in-out_infinite]">
                <svg width="64" height="40" viewBox="0 0 80 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {/* Dholak body */}
                  <path d="M15 10 C30 5, 50 5, 65 10 L65 40 C50 45, 30 45, 15 40 Z" fill="currentColor" fillOpacity="0.15" />
                  {/* Left head */}
                  <ellipse cx="15" cy="25" rx="5" ry="15" fill="currentColor" fillOpacity="0.4" />
                  {/* Right head */}
                  <ellipse cx="65" cy="25" rx="5" ry="15" fill="currentColor" fillOpacity="0.4" />
                  {/* Straps / cords */}
                  <path d="M15 10 L30 43 L45 7 L65 10 M15 40 L30 7 L45 43 L65 40" strokeWidth="1.5" />
                  <path d="M30 7 L30 43 M45 7 L45 43" strokeWidth="1" strokeDasharray="2 2" />
                </svg>
              </div>
            )
          case 'shehnai':
            return (
              <div key={key} className="absolute right-4 top-8 text-[var(--c-accent)] opacity-85 rotate-[-30deg] animate-[bounce_5s_ease-in-out_infinite]">
                <svg width="56" height="56" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Main tube */}
                  <path d="M12 52 L36 28 M8 56 L38 26" />
                  {/* Flared bell */}
                  <path d="M36 28 L48 16 C52 12, 60 20, 56 24 L44 36 Z" fill="currentColor" fillOpacity="0.2" />
                  {/* Mouthpiece */}
                  <path d="M8 56 L4 60 L2 58 L6 54 Z" fill="currentColor" />
                  {/* Sound holes */}
                  <circle cx="20" cy="44" r="1.5" fill="currentColor" />
                  <circle cx="26" cy="38" r="1.5" fill="currentColor" />
                  <circle cx="32" cy="32" r="1.5" fill="currentColor" />
                  {/* Decorative tassel */}
                  <path d="M42 34 Q36 40 38 48" strokeWidth="1.5" strokeDasharray="2 2" />
                  <path d="M37 47 L39 49 M39 47 L37 49" />
                </svg>
              </div>
            )
          case 'floral-borders':
            return (
              <div key={key} className="absolute inset-0 text-[var(--c-accent)] opacity-70 pointer-events-none">
                {/* Top-left floral corner */}
                <div className="absolute top-4 left-4 rotate-0">
                  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M10 10 Q35 15 40 40 Q15 35 10 10 Z" fill="currentColor" fillOpacity="0.1" />
                    <path d="M10 10 Q15 35 40 40" />
                    <circle cx="40" cy="40" r="4" fill="currentColor" />
                    <path d="M10 10 Q50 20 60 10" />
                    <path d="M10 10 Q20 50 10 60" />
                    <circle cx="60" cy="10" r="2.5" fill="currentColor" />
                    <circle cx="10" cy="60" r="2.5" fill="currentColor" />
                  </svg>
                </div>
                {/* Top-right floral corner */}
                <div className="absolute top-4 right-4 rotate-90">
                  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M10 10 Q35 15 40 40 Q15 35 10 10 Z" fill="currentColor" fillOpacity="0.1" />
                    <path d="M10 10 Q15 35 40 40" />
                    <circle cx="40" cy="40" r="4" fill="currentColor" />
                    <path d="M10 10 Q50 20 60 10" />
                    <path d="M10 10 Q20 50 10 60" />
                    <circle cx="60" cy="10" r="2.5" fill="currentColor" />
                    <circle cx="10" cy="60" r="2.5" fill="currentColor" />
                  </svg>
                </div>
              </div>
            )
          case 'foliage':
            return (
              <div key={key} className="absolute inset-0 text-[var(--c-accent)] opacity-60">
                {/* Left side leaves */}
                <div className="absolute left-2 top-1/3 -translate-y-1/2 rotate-[15deg] animate-[swing_5s_ease-in-out_infinite]">
                  <svg width="32" height="64" viewBox="0 0 32 64" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 60 Q16 30 16 4" />
                    {/* Leaf pairs */}
                    <path d="M16 48 Q26 40 24 35 Q16 42 16 48 Z" fill="currentColor" fillOpacity="0.15" />
                    <path d="M16 48 Q6 40 8 35 Q16 42 16 48 Z" fill="currentColor" fillOpacity="0.15" />
                    <path d="M16 32 Q28 24 26 18 Q16 26 16 32 Z" fill="currentColor" fillOpacity="0.15" />
                    <path d="M16 32 Q4 24 6 18 Q16 26 16 32 Z" fill="currentColor" fillOpacity="0.15" />
                    <path d="M16 16 Q26 8 24 4 Q16 10 16 16 Z" fill="currentColor" fillOpacity="0.15" />
                    <path d="M16 16 Q6 8 8 4 Q16 10 16 16 Z" fill="currentColor" fillOpacity="0.15" />
                  </svg>
                </div>
                {/* Right side leaves */}
                <div className="absolute right-2 top-1/3 -translate-y-1/2 rotate-[-15deg] scale-x-[-1] animate-[swing_5s_ease-in-out_infinite] [animation-delay:1.5s]">
                  <svg width="32" height="64" viewBox="0 0 32 64" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 60 Q16 30 16 4" />
                    <path d="M16 48 Q26 40 24 35 Q16 42 16 48 Z" fill="currentColor" fillOpacity="0.15" />
                    <path d="M16 48 Q6 40 8 35 Q16 42 16 48 Z" fill="currentColor" fillOpacity="0.15" />
                    <path d="M16 32 Q28 24 26 18 Q16 26 16 32 Z" fill="currentColor" fillOpacity="0.15" />
                    <path d="M16 32 Q4 24 6 18 Q16 26 16 32 Z" fill="currentColor" fillOpacity="0.15" />
                    <path d="M16 16 Q26 8 24 4 Q16 10 16 16 Z" fill="currentColor" fillOpacity="0.15" />
                    <path d="M16 16 Q6 8 8 4 Q16 10 16 16 Z" fill="currentColor" fillOpacity="0.15" />
                  </svg>
                </div>
              </div>
            )
          case 'heart':
            return (
              <div key={key} className="absolute left-6 top-8 text-[var(--c-accent)] opacity-80 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] [animation-duration:3s]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            )
          case 'sparkles':
            return (
              <div key={key} className="absolute inset-0 text-[var(--c-accent)] opacity-70">
                <div className="absolute left-6 top-24 animate-[pulse_1.2s_infinite] [animation-delay:0.1s]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2L22 11.6l-5.2 5.2L18.4 22 12 18.4 5.6 22l1.6-5.2-5.2-5.2 7.6-2.4L12 2z" /></svg>
                </div>
                <div className="absolute right-8 top-16 animate-[pulse_1.5s_infinite] [animation-delay:0.4s]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2L22 11.6l-5.2 5.2L18.4 22 12 18.4 5.6 22l1.6-5.2-5.2-5.2 7.6-2.4L12 2z" /></svg>
                </div>
              </div>
            )
          case 'confetti':
            return (
              <div key={key} className="absolute top-0 inset-x-0 h-16 pointer-events-none opacity-80 text-[var(--c-accent)]">
                {/* Left side streamers */}
                <div className="absolute left-8 top-4 rotate-[15deg]">
                  <svg width="24" height="32" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 2 Q10 10 4 18 Q12 24 8 30" strokeDasharray="3 3" />
                  </svg>
                </div>
                {/* Right side streamers */}
                <div className="absolute right-8 top-3 rotate-[-15deg] scale-x-[-1]">
                  <svg width="24" height="32" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 2 Q10 10 4 18 Q12 24 8 30" strokeDasharray="3 3" />
                  </svg>
                </div>
                {/* Small bits */}
                <div className="absolute left-1/4 top-3 w-1.5 h-3 bg-red-400 rounded-full rotate-45 animate-bounce" />
                <div className="absolute right-1/4 top-5 w-2 h-2 bg-yellow-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                <div className="absolute left-1/3 top-6 w-3 h-1.5 bg-blue-400 rounded-full -rotate-12 animate-bounce [animation-delay:0.6s]" />
              </div>
            )
          case 'balloons':
            return (
              <div key={key} className="absolute left-3 top-1/4 -translate-y-1/2 flex flex-col items-center opacity-75 text-[var(--c-accent)]">
                <div className="relative w-8 h-10 animate-[bounce_4s_ease-in-out_infinite]">
                  <svg viewBox="0 0 24 30" fill="currentColor">
                    <ellipse cx="12" cy="13" rx="10" ry="12" />
                    <path d="M12 25 L12 30" stroke="currentColor" strokeWidth="1.5" />
                    <polygon points="12,25 10,27 14,27" />
                  </svg>
                  {/* Overlapping small balloon */}
                  <div className="absolute -right-3 top-2 w-6 h-8 text-[var(--c-glow)] opacity-90 animate-[bounce_3s_ease-in-out_infinite_alternate]">
                    <svg viewBox="0 0 24 30" fill="currentColor">
                      <ellipse cx="12" cy="13" rx="10" ry="12" />
                      <path d="M12 25 L12 30" stroke="currentColor" strokeWidth="1.5" />
                      <polygon points="12,25 10,27 14,27" />
                    </svg>
                  </div>
                </div>
              </div>
            )
          case 'achievement-badge':
            return (
              <div key={key} className="absolute right-5 top-8 text-[var(--c-accent)] opacity-85 rotate-[-10deg] animate-[pulse_3s_infinite]">
                <svg width="40" height="52" viewBox="0 0 40 52" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  {/* Ribbons */}
                  <path d="M14 26 L10 46 L20 40 L30 46 L26 26" fill="currentColor" fillOpacity="0.2" />
                  {/* Circle outer */}
                  <circle cx="20" cy="20" r="14" fill="currentColor" fillOpacity="0.1" />
                  <circle cx="20" cy="20" r="10" strokeWidth="1.5" strokeDasharray="2 2" />
                  {/* Star center */}
                  <path d="M20 14 L22 18 L27 18.5 L23.5 21.5 L24.5 26 L20 23.5 L15.5 26 L16.5 21.5 L13 18.5 L18 18 Z" fill="currentColor" />
                </svg>
              </div>
            )
          case 'kite':
            return (
              <div key={key} className="absolute right-6 top-10 text-[var(--c-accent)] opacity-85 rotate-[15deg] animate-[bounce_5s_ease-in-out_infinite]">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                  {/* Diamond body */}
                  <path d="M24 4 L40 20 L24 36 L8 20 Z" fill="currentColor" fillOpacity="0.15" />
                  {/* Cross struts */}
                  <path d="M24 4 L24 36 M8 20 L40 20" />
                  {/* Curved bow strut */}
                  <path d="M8 20 Q24 8 40 20" />
                  {/* Tail triangle */}
                  <path d="M24 36 L20 42 L28 42 Z" fill="currentColor" />
                  {/* String */}
                  <path d="M24 42 Q20 45 22 48" strokeWidth="1" />
                </svg>
              </div>
            )
          case 'flowers':
            return (
              <div key={key} className="absolute inset-0 text-[var(--c-accent)] opacity-70">
                {/* Floating floral motifs */}
                <div className="absolute left-6 top-1/4 animate-[spin_10s_linear_infinite]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="3" />
                    <circle cx="12" cy="6" r="3" />
                    <circle cx="12" cy="18" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="12" r="3" />
                  </svg>
                </div>
                <div className="absolute right-6 bottom-1/4 animate-[spin_12s_linear_infinite_reverse]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="3.5" />
                    <circle cx="12" cy="5" r="3.5" />
                    <circle cx="12" cy="19" r="3.5" />
                    <circle cx="5" cy="12" r="3.5" />
                    <circle cx="19" cy="12" r="3.5" />
                  </svg>
                </div>
              </div>
            )
          case 'nodes':
            return (
              <div key={key} className="absolute inset-0 text-[var(--c-accent)] opacity-40">
                {/* Simple network nodes and connections */}
                <svg className="absolute inset-0 w-full h-full" stroke="currentColor" strokeWidth="1">
                  <line x1="15%" y1="10%" x2="25%" y2="20%" />
                  <line x1="25%" y1="20%" x2="10%" y2="25%" />
                  <line x1="85%" y1="75%" x2="90%" y2="60%" />
                  <line x1="90%" y1="60%" x2="75%" y2="65%" />
                  
                  {/* Nodes as circles */}
                  <circle cx="15%" cy="10%" r="3" fill="currentColor" />
                  <circle cx="25%" cy="20%" r="4.5" fill="currentColor" />
                  <circle cx="10%" cy="25%" r="3" fill="currentColor" />
                  <circle cx="85%" cy="75%" r="4" fill="currentColor" />
                  <circle cx="90%" cy="60%" r="3" fill="currentColor" />
                  <circle cx="75%" cy="65%" r="4.5" fill="currentColor" />
                </svg>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
