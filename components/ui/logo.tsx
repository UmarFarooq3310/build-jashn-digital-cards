import React from 'react'

export function CardzyLogo({ className = 'size-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cardzy logo"
    >
      <defs>
        <linearGradient id="cz-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#064e3b" />
          <stop offset="100%" stopColor="#022c22" />
        </linearGradient>
        <linearGradient id="cz-shine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cz-spark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Rounded background */}
      <rect width="100" height="100" rx="24" fill="url(#cz-bg)" />

      {/* Subtle top-left shine */}
      <rect width="100" height="100" rx="24" fill="url(#cz-shine)" />

      {/* Card body */}
      <rect
        x="18" y="30" width="64" height="42"
        rx="8"
        fill="white" fillOpacity="0.15"
        stroke="white" strokeWidth="3" strokeLinejoin="round"
      />

      {/* Envelope flap line */}
      <path
        d="M18 38 L49 54 L82 38"
        stroke="white" strokeWidth="3"
        strokeLinecap="round" strokeLinejoin="round"
      />

      {/* Heart in centre of card */}
      <path
        d="M50 65 C50 65 40 57 40 51 C40 47.7 42.7 45 46 45 C47.8 45 49.4 45.9 50 47 C50.6 45.9 52.2 45 54 45 C57.3 45 60 47.7 60 51 C60 57 50 65 50 65 Z"
        fill="white" fillOpacity="0.85"
      />

      {/* Sparkle top-right */}
      <path
        d="M76 16 C76 19.6 77.8 21.2 81.5 21.2 C77.8 21.2 76 22.8 76 26.5 C76 22.8 74.2 21.2 70.5 21.2 C74.2 21.2 76 19.6 76 16Z"
        fill="url(#cz-spark)"
      />
    </svg>
  )
}
