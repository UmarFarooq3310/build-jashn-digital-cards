'use client'

import { useState, useRef } from 'react'
import { Sparkles, Volume2, BookOpen } from 'lucide-react'
import { playContextualSound } from '@/lib/jashn/audio'
import { cn } from '@/lib/utils'

interface ThreeDCardWrapperProps {
  children: React.ReactNode
  recipientName?: string
  eventTitle: string
  occasionIdOrCategory: string
  isIslamic?: boolean
  isSensitive?: boolean
  onOpened?: () => void
}

export function ThreeDCardWrapper({
  children,
  recipientName,
  eventTitle,
  occasionIdOrCategory,
  isIslamic = false,
  isSensitive = false,
  onOpened,
}: ThreeDCardWrapperProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Interactive 3D tilt & shine values
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, px: 50, py: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOpen || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Max 12 degrees tilt to avoid clipping
    const rx = ((y / rect.height) - 0.5) * -12
    const ry = ((x / rect.width) - 0.5) * 12
    
    const px = (x / rect.width) * 100
    const py = (y / rect.height) * 100
    
    setTilt({ rx, ry, px, py })
  }

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, px: 50, py: 50 })
  }

  const handleOpen = async () => {
    if (isOpen) return
    setIsOpen(true)
    setHasOpened(true)
    setTilt({ rx: 0, ry: 0, px: 50, py: 50 }) // Reset tilt immediately on open

    // Trigger audio play immediately on user interaction
    if (!isSensitive) {
      try {
        await playContextualSound(occasionIdOrCategory)
      } catch (err) {
        console.warn('Autoplay sound was prevented:', err)
      }
    }

    if (onOpened) {
      onOpened()
    }
  }

  // Cover styling options
  let coverBg = 'linear-gradient(145deg, #8e0f24 0%, #4a0510 100%)' // Wedding Red
  let coverBorderColor = '#e6b54a' // Gold
  let coverTextColor = '#fff4e6'
  let badgeLabel = 'Mubarak ho'

  if (isSensitive) {
    coverBg = 'linear-gradient(145deg, #27272a 0%, #18181b 100%)' // Muted Zinc
    coverBorderColor = '#52525b'
    coverTextColor = '#e4e4e7'
    badgeLabel = 'Condolences'
  } else if (isIslamic) {
    coverBg = 'linear-gradient(145deg, #1B5E20 0%, #08300c 100%)' // Islamic Emerald
    coverBorderColor = '#e6c45a'
    coverTextColor = '#f1fff0'
    badgeLabel = 'Eid Mubarak'
  } else if (occasionIdOrCategory === 'birthday') {
    coverBg = 'linear-gradient(145deg, #1a237e 0%, #0a0e3d 100%)' // Birthday Royal Blue
    coverBorderColor = '#aab4ff'
    coverTextColor = '#eef1ff'
    badgeLabel = 'Saalgirah'
  }

  const SealIcon = isSensitive ? BookOpen : Sparkles

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={!isOpen ? handleOpen : undefined}
      className={cn(
        "relative w-full max-w-[420px] mx-auto rounded-[2.5rem] select-none",
        isOpen ? "cursor-default" : "cursor-pointer",
        "transition-shadow duration-300",
        !isOpen && "hover:shadow-[0_45px_70px_-15px_rgba(0,0,0,0.65)]"
      )}
      style={{
        perspective: '1100px', // Stronger 3D perspective depth (closer virtual camera)
        transformStyle: 'preserve-3d',
        transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
      }}
    >
      {/* Envelope Cover Container (determines parent height when closed, transitions out when open) */}
      <div
        className={cn(
          "w-full aspect-[3/4.4] sm:aspect-[3/4.2] rounded-[2.5rem] transition-all duration-[1.2s] ease-out",
          isOpen ? "absolute inset-x-0 top-0 opacity-0 pointer-events-none" : "relative"
        )}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* 3D Reflection Lighting Shine (Only visible when closed) */}
        {!isOpen && (
          <div
            className="absolute inset-0 rounded-[2.5rem] pointer-events-none z-50 mix-blend-overlay opacity-50 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${tilt.px}% ${tilt.py}%, rgba(255, 255, 255, 0.4) 0%, rgba(255,255,255,0) 60%)`,
            }}
          />
        )}

        {/* =========================================================
            3D GATEFOLD DOUBLE-DOOR COVER SYSTEM (Hinged Left & Right)
            ========================================================= */}

        {/* LEFT FLAP (Hinged Left, width 50%) */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[50%] rounded-l-[2.5rem] border-2 border-r-0 z-30 transition-all duration-[1.2s] ease-out origin-left"
          style={{
            background: coverBg,
            borderColor: coverBorderColor,
            transform: isOpen ? 'rotateY(-140deg)' : 'rotateY(0deg)',
            opacity: isOpen ? 0 : 1,
            pointerEvents: isOpen ? 'none' : 'auto',
            transformStyle: 'preserve-3d',
            boxShadow: !isOpen ? 'inset -5px 0 10px rgba(0,0,0,0.2)' : 'none',
            transition: 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s ease-in-out',
            transitionDelay: isOpen ? '0s, 0.2s' : '0s, 0s',
          }}
        >
          {/* Front face (Left half of invitation) */}
          <div 
            className="absolute inset-0 p-6 flex flex-col justify-between items-end text-right overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Dashed Border floating slightly at Z = 10px */}
            <div 
              className="absolute inset-2 border border-dashed rounded-l-[1.8rem] opacity-20 pointer-events-none" 
              style={{ 
                borderColor: coverBorderColor,
                transform: 'translateZ(10px)',
              }} 
            />
            
            {/* Left half of the 3D central wax seal floating at Z = 30px */}
            <div className="absolute right-0 top-1/2 size-20 rounded-full border-4 flex items-center justify-center shadow-lg"
              style={{
                background: `radial-gradient(circle at 35% 35%, ${coverBorderColor} 0%, #a17724 75%, #59420f 100%)`,
                borderColor: `${coverBorderColor}cc`,
                clipPath: 'inset(0px 40px 0px 0px)', // Clip right side (keep left half)
                transform: 'translate3d(40px, -50%, 30px)', // Center vertically, offset horizontally, float in 3D
              }}
            >
              <SealIcon className="size-8 text-white/90 animate-pulse" />
            </div>
          </div>

          {/* Back face (Inside left flap, revealed on open) */}
          <div 
            className="absolute inset-0 rounded-l-[2.5rem] bg-gradient-to-br from-[#ffe9a6] to-[#b88e39]"
            style={{ 
              boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.3)',
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div className="absolute inset-2 border border-[#8a6822]/20 rounded-l-[1.8rem] opacity-35" />
          </div>
        </div>

        {/* RIGHT FLAP (Hinged Right, width 50%) */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[50%] rounded-r-[2.5rem] border-2 border-l-0 z-30 transition-all duration-[1.2s] ease-out origin-right"
          style={{
            background: coverBg,
            borderColor: coverBorderColor,
            transform: isOpen ? 'rotateY(140deg)' : 'rotateY(0deg)',
            opacity: isOpen ? 0 : 1,
            pointerEvents: isOpen ? 'none' : 'auto',
            transformStyle: 'preserve-3d',
            boxShadow: !isOpen ? 'inset 5px 0 10px rgba(0,0,0,0.2)' : 'none',
            transition: 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s ease-in-out',
            transitionDelay: isOpen ? '0s, 0.2s' : '0s, 0s',
          }}
        >
          {/* Front face (Right half of invitation) */}
          <div 
            className="absolute inset-0 p-6 flex flex-col justify-between items-start text-left overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Dashed Border floating slightly at Z = 10px */}
            <div 
              className="absolute inset-2 border border-dashed rounded-r-[1.8rem] opacity-20 pointer-events-none" 
              style={{ 
                borderColor: coverBorderColor,
                transform: 'translateZ(10px)',
              }} 
            />
            
            {/* Right half of the 3D central wax seal floating at Z = 30px */}
            <div className="absolute left-0 top-1/2 size-20 rounded-full border-4 flex items-center justify-center shadow-lg"
              style={{
                background: `radial-gradient(circle at 35% 35%, ${coverBorderColor} 0%, #a17724 75%, #59420f 100%)`,
                borderColor: `${coverBorderColor}cc`,
                clipPath: 'inset(0px 0px 0px 40px)', // Clip left side (keep right half)
                transform: 'translate3d(-40px, -50%, 30px)', // Center vertically, offset horizontally, float in 3D
              }}
            >
              <SealIcon className="size-8 text-white/90 animate-pulse" />
            </div>
          </div>

          {/* Back face (Inside right flap, revealed on open) */}
          <div 
            className="absolute inset-0 rounded-r-[2.5rem] bg-gradient-to-br from-[#ffe9a6] to-[#b88e39]"
            style={{ 
              boxShadow: 'inset 5px 0 15px rgba(0,0,0,0.3)',
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div className="absolute inset-2 border border-[#8a6822]/20 rounded-r-[1.8rem] opacity-35" />
          </div>
        </div>

        {/* =========================================================
            CENTERED COVER OVERLAYS (Floating at Z = 45px, fades and slides)
            ========================================================= */}
        
        {/* Centered Top Cover Overlay */}
        <div
          className={cn(
            "absolute inset-x-0 top-12 z-40 flex flex-col items-center text-center px-6 pointer-events-none"
          )}
          style={{
            transform: isOpen ? 'translate3d(0, -40px, 0px)' : 'translate3d(0, 0, 45px)',
            opacity: isOpen ? 0 : 1,
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out',
          }}
        >
          <span
            className="px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.2em] uppercase border bg-white/5 backdrop-blur-sm shadow-sm"
            style={{ borderColor: `${coverBorderColor}40`, color: coverBorderColor }}
          >
            {badgeLabel}
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight mt-3 font-heading leading-tight drop-shadow-md text-balance" style={{ color: coverTextColor }}>
            {eventTitle}
          </h2>
        </div>

        {/* Centered Bottom Cover Overlay */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-10 z-40 flex flex-col items-center text-center px-6 pointer-events-none"
          )}
          style={{
            transform: isOpen ? 'translate3d(0, 40px, 0px)' : 'translate3d(0, 0, 45px)',
            opacity: isOpen ? 0 : 1,
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out',
          }}
        >
          {recipientName ? (
            <p className="text-[11px] font-semibold line-clamp-1 max-w-[200px] mb-2 drop-shadow-sm" style={{ color: coverTextColor }}>
              For {recipientName}
            </p>
          ) : null}
          
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5 drop-shadow-sm" style={{ color: coverBorderColor }}>
            {isSensitive ? 'Click to open' : 'Tap to open card'}
          </p>

          <p className="text-[9px] opacity-60 flex items-center gap-1.5" style={{ color: coverTextColor }}>
            <Volume2 className="size-3 shrink-0" /> Sound active
          </p>
        </div>
      </div>

      {/* =========================================================
          THE ACTUAL CARD SURFACE (Sitting behind the folding doors)
          ========================================================= */}
      <div
        className={cn(
          "w-full rounded-[2.5rem] z-10 no-scrollbar",
          "transition-all duration-700",
          isOpen 
            ? "relative h-auto opacity-100 pointer-events-auto scale-100" 
            : "absolute inset-0 h-full opacity-0 pointer-events-none scale-95 overflow-hidden"
        )}
        style={{
          boxShadow: '0 25px 55px -12px rgba(0, 0, 0, 0.45)',
        }}
      >
        {children}
      </div>
    </div>
  )
}
