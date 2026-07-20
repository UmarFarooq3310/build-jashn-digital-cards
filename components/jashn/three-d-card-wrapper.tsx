'use client'

import { useState, useRef } from 'react'
import { Sparkles, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang/context'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

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
  const { t, lang } = useLang()
  const [isOpen, setIsOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!isOpen) return

    const occasion = occasionIdOrCategory.toLowerCase().trim()
    const isIslamicCategory =
      occasion === 'islamic' ||
      occasion === 'eid-ul-fitr' ||
      occasion === 'eid-ul-adha' ||
      occasion === 'ramadan' ||
      occasion === 'jumma' ||
      occasion === 'eid' ||
      isIslamic

    const isFriendshipCategory =
      occasion === 'friendship-day' ||
      occasion === 'friendship' ||
      occasion === 'thank-you' ||
      occasion === 'thankyou' ||
      occasion === 'miss-you' ||
      occasion === 'missyou' ||
      occasion === 'love' ||
      occasion === 'valentines' ||
      occasion === 'mothers-day' ||
      occasion === 'fathers-day' ||
      occasion === 'congratulations'

    const isWeddingCategory =
      occasion === 'wedding' ||
      occasion === 'shaadi' ||
      occasion === 'nikah' ||
      occasion === 'mehndi' ||
      occasion === 'dholki' ||
      occasion === 'barat' ||
      occasion === 'walima' ||
      occasion === 'family' ||
      occasion === 'marriage'

    // General Card Fade-in
    gsap.fromTo('.jashn-card', 
      { scale: 0.93, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1.0, ease: 'power2.out' }
    )

    // General Text animations
    gsap.fromTo('h1, p, .site-header, .site-footer', 
      { y: 15, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2, stagger: 0.08 }
    )

    // Wedding / Nikah Animations
    if (isWeddingCategory) {
      // Elegant Mughal-arch reveal
      gsap.fromTo('.mughal-arch',
        { scale: 0.85, opacity: 0, borderWidth: '0px' },
        { scale: 1, opacity: 1, borderWidth: '2px', duration: 1.4, ease: 'power3.out', delay: 0.1 }
      )
      
      // Floating petals
      gsap.fromTo('.petal',
        { y: -60, x: 'random(-30, 30)', rotation: 0, opacity: 0 },
        { 
          y: 'random(350, 550)', 
          x: 'random(-60, 60)', 
          rotation: 'random(180, 360)', 
          opacity: 'random(0.5, 0.95)', 
          duration: 'random(4.5, 7.5)', 
          repeat: -1, 
          ease: 'sine.inOut',
          stagger: 0.15 
        }
      )

      // Shimmering calligraphy
      gsap.fromTo('.font-urdu, .shimmer-text',
        { opacity: 0, filter: 'drop-shadow(0 0 15px rgba(230,181,74,0))' },
        { opacity: 1, filter: 'drop-shadow(0 0 8px rgba(230,181,74,0.7))', duration: 1.6, ease: 'power1.inOut', delay: 0.3 }
      )
    }

    // Birthday Animations
    if (occasion === 'birthday') {
      // Bounce-in Cake
      gsap.fromTo('.birthday-cake',
        { scale: 0, rotation: -25, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.7)', delay: 0.4 }
      )

      // Candle Flicker
      gsap.to('.candle-flame', {
        scaleY: 1.25,
        scaleX: 0.85,
        opacity: 0.75,
        duration: 0.12,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      })

      // Confetti burst
      gsap.fromTo('.confetti-dot',
        { x: 0, y: 0, scale: 0, opacity: 1 },
        {
          x: 'random(-140, 140)',
          y: 'random(-220, 80)',
          scale: 'random(0.6, 1.4)',
          rotation: 'random(0, 360)',
          opacity: 0,
          duration: 'random(1.2, 2.8)',
          ease: 'power3.out',
          stagger: { each: 0.02 }
        }
      )
    }

    // Islamic / Eid Animations
    if (isIslamicCategory) {
      // Crescent Glow
      gsap.to('.crescent-float', {
        filter: 'drop-shadow(0 0 16px rgba(230,196,90,0.85))',
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      // Swaying lanterns
      gsap.fromTo('.hanging-lantern',
        { rotation: -5 },
        { rotation: 5, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut' }
      )

      // Soft light-sweep
      gsap.fromTo('.light-sweep',
        { x: '-100%' },
        { x: '100%', duration: 2.0, ease: 'power2.inOut', delay: 0.4 }
      )
    }

    // Friendship Animations
    if (isFriendshipCategory) {
      // Floating hearts
      gsap.fromTo('.floating-heart',
        { y: 150, x: 'random(-30, 30)', scale: 0, opacity: 0 },
        {
          y: -150,
          x: 'random(-80, 80)',
          scale: 'random(0.6, 1.3)',
          opacity: 'random(0.4, 0.85)',
          duration: 'random(3.2, 5.2)',
          stagger: 0.25,
          repeat: -1,
          ease: 'sine.out'
        }
      )
    }

    // National / Independence Day animations
    if (
      occasion === 'national' ||
      occasion === 'independence-day' ||
      occasion === 'kashmir-day' ||
      occasion === 'basant'
    ) {
      // Flag-themed confetti burst
      gsap.fromTo('.national-star',
        { x: 0, y: 0, scale: 0, opacity: 1, rotation: 0 },
        {
          x: 'random(-120, 120)',
          y: 'random(-200, 60)',
          scale: 'random(0.5, 1.3)',
          rotation: 'random(0, 360)',
          opacity: 0,
          duration: 'random(1.4, 2.6)',
          ease: 'power3.out',
          stagger: { each: 0.05 }
        }
      )
    }

    // Anniversary Animations
    if (occasion === 'anniversary') {
      // Spinning rings
      gsap.fromTo('.anniversary-rings',
        { scale: 0, rotation: -40, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.4, ease: 'back.out(1.5)', delay: 0.5 }
      )
    }
  }, { dependencies: [isOpen, occasionIdOrCategory], scope: containerRef })
  
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

  const handleOpen = () => {
    if (isOpen) return
    setIsOpen(true)
    setHasOpened(true)
    setTilt({ rx: 0, ry: 0, px: 50, py: 50 }) // Reset tilt immediately on open

    if (onOpened) {
      onOpened()
    }
  }

  // Cover styling options
  let coverBg = 'linear-gradient(145deg, #8e0f24 0%, #4a0510 100%)' // Wedding Red
  let coverBorderColor = '#e6b54a' // Gold
  let coverTextColor = '#fff4e6'
  let badgeLabel = t(`type_${occasionIdOrCategory?.replace(/-/g, '_')}`) || t(`occ_${occasionIdOrCategory?.replace(/-/g, '_')}`) || (lang === 'ur' ? 'مبارک ہو' : 'Mubarak ho')

  if (isSensitive) {
    coverBg = 'linear-gradient(145deg, #27272a 0%, #18181b 100%)' // Muted Zinc
    coverBorderColor = '#52525b'
    coverTextColor = '#e4e4e7'
    badgeLabel = t('badgeCondolences') || (lang === 'ur' ? 'تعزیت' : 'Condolences')
  } else if (isIslamic) {
    coverBg = 'linear-gradient(145deg, #1B5E20 0%, #08300c 100%)' // Islamic Emerald
    coverBorderColor = '#e6c45a'
    coverTextColor = '#f1fff0'
    badgeLabel = t(`type_${occasionIdOrCategory?.replace(/-/g, '_')}`) || t(`occ_${occasionIdOrCategory?.replace(/-/g, '_')}`) || (lang === 'ur' ? 'عید مبارک' : 'Eid Mubarak')
  } else if (occasionIdOrCategory === 'birthday' || occasionIdOrCategory === 'birthday-party') {
    coverBg = 'linear-gradient(145deg, #1a237e 0%, #0a0e3d 100%)' // Birthday Royal Blue
    coverBorderColor = '#aab4ff'
    coverTextColor = '#eef1ff'
    badgeLabel = t('occ_birthday') || t('type_birthday_party') || (lang === 'ur' ? 'سالگرہ' : 'Birthday')
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
              {lang === 'ur' ? `${recipientName} ${t('forRecipient')}` : `${t('forRecipient')} ${recipientName}`}
            </p>
          ) : null}
          
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5 drop-shadow-sm" style={{ color: coverBorderColor }}>
            {t('tapToOpenCard')}
          </p>
        </div>
      </div>

      {/* =========================================================
          THE ACTUAL CARD SURFACE (Sitting behind the folding doors)
          ========================================================= */}
      <div
        className={cn(
          "w-full rounded-[2.5rem] z-10 no-scrollbar relative",
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

        {/* Dynamic Animated Overlay elements */}
        {isOpen && (
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-[2.5rem]">
            {/* Confetti (Birthday) */}
            {occasionIdOrCategory.toLowerCase().trim() === 'birthday' && Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="confetti-dot absolute left-1/2 top-1/2 size-2.5 rounded-full" style={{ backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'][i % 5] }} />
            ))}

            {/* Birthday Cake */}
            {occasionIdOrCategory.toLowerCase().trim() === 'birthday' && (
              <div className="birthday-cake absolute bottom-12 right-6 size-16 drop-shadow-md">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M20 70 h60 v15 a5 5 0 0 1 -5 5 h-50 a5 5 0 0 1 -5 -5 z" fill="#f43f5e" />
                  <path d="M25 50 h50 v20 h-50 z" fill="#fb7185" />
                  <path d="M25 50 q5 5 10 0 q5 5 10 0 q5 5 10 0 q5 5 10 0 q5 5 10 0" fill="#fff" stroke="#fff" strokeWidth="3" />
                  <rect x="47" y="25" width="6" height="25" fill="#f59e0b" />
                  <path className="candle-flame origin-bottom" d="M50 10 q-4 8 0 15 q4 -7 0 -15" fill="#ef4444" />
                </svg>
              </div>
            )}

            {/* Hanging Lanterns (Islamic) */}
            {(occasionIdOrCategory.toLowerCase().trim() === 'islamic' ||
              occasionIdOrCategory.toLowerCase().trim() === 'eid-ul-fitr' ||
              occasionIdOrCategory.toLowerCase().trim() === 'eid-ul-adha' ||
              occasionIdOrCategory.toLowerCase().trim() === 'ramadan' ||
              occasionIdOrCategory.toLowerCase().trim() === 'jumma' ||
              occasionIdOrCategory.toLowerCase().trim() === 'eid' ||
              isIslamic) && (
              <>
                <div className="hanging-lantern absolute left-8 top-0 w-8 h-20 origin-top">
                  <div className="w-px h-10 bg-amber-500/60 mx-auto" />
                  <svg viewBox="0 0 100 120" className="w-full h-10 text-amber-500 fill-current drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">
                    <path d="M50 10 L30 40 L30 80 L50 110 L70 80 L70 40 Z" />
                    <circle cx="50" cy="60" r="15" fill="#fff" className="animate-pulse" />
                  </svg>
                </div>
                <div className="hanging-lantern absolute right-8 top-0 w-8 h-24 origin-top">
                  <div className="w-px h-14 bg-amber-500/60 mx-auto" />
                  <svg viewBox="0 0 100 120" className="w-full h-10 text-amber-500 fill-current drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">
                    <path d="M50 10 L30 40 L30 80 L50 110 L70 80 L70 40 Z" />
                    <circle cx="50" cy="60" r="15" fill="#fff" className="animate-pulse" />
                  </svg>
                </div>
              </>
            )}

            {/* Light Sweep (Islamic) */}
            {(occasionIdOrCategory.toLowerCase().trim() === 'islamic' ||
              occasionIdOrCategory.toLowerCase().trim() === 'eid-ul-fitr' ||
              occasionIdOrCategory.toLowerCase().trim() === 'eid-ul-adha' ||
              occasionIdOrCategory.toLowerCase().trim() === 'ramadan' ||
              occasionIdOrCategory.toLowerCase().trim() === 'jumma' ||
              occasionIdOrCategory.toLowerCase().trim() === 'eid' ||
              isIslamic) && (
              <div className="light-sweep absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
            )}

            {/* Floating Hearts (Friendship/Love/Thank-you/Miss-you) */}
            {(occasionIdOrCategory.toLowerCase().trim() === 'friendship-day' ||
              occasionIdOrCategory.toLowerCase().trim() === 'friendship' ||
              occasionIdOrCategory.toLowerCase().trim() === 'thank-you' ||
              occasionIdOrCategory.toLowerCase().trim() === 'thankyou' ||
              occasionIdOrCategory.toLowerCase().trim() === 'miss-you' ||
              occasionIdOrCategory.toLowerCase().trim() === 'missyou' ||
              occasionIdOrCategory.toLowerCase().trim() === 'valentines' ||
              occasionIdOrCategory.toLowerCase().trim() === 'mothers-day' ||
              occasionIdOrCategory.toLowerCase().trim() === 'fathers-day' ||
              occasionIdOrCategory.toLowerCase().trim() === 'love' ||
              occasionIdOrCategory.toLowerCase().trim() === 'congratulations') && 
              Array.from({ length: 8 }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" className="floating-heart absolute bottom-0 left-[20%] text-rose-500 fill-current size-5" style={{ left: `${15 + i * 10}%` }}>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            ))}

            {/* National Stars / Crescent confetti (Independence Day / Kashmir Day / Basant) */}
            {(occasionIdOrCategory.toLowerCase().trim() === 'national' ||
              occasionIdOrCategory.toLowerCase().trim() === 'independence-day' ||
              occasionIdOrCategory.toLowerCase().trim() === 'kashmir-day' ||
              occasionIdOrCategory.toLowerCase().trim() === 'basant') &&
              Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={i}
                  className="national-star absolute left-1/2 top-1/2"
                  style={{
                    color: i % 3 === 0 ? '#FFFFFF' : i % 3 === 1 ? '#01411C' : '#f5d020',
                  }}
                >
                  <svg viewBox="0 0 24 24" className="fill-current" style={{ width: `${10 + (i % 4) * 4}px`, height: `${10 + (i % 4) * 4}px` }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              ))}

            {/* Golden Rings (Anniversary) */}
            {occasionIdOrCategory.toLowerCase().trim() === 'anniversary' && (
              <div className="anniversary-rings absolute bottom-12 right-8 size-16 drop-shadow-md">
                <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500 fill-none stroke-current" strokeWidth="6">
                  <circle cx="40" cy="50" r="23" />
                  <circle cx="60" cy="50" r="23" />
                  <polygon points="40,22 44,26 40,30 36,26" fill="#fff" stroke="none" />
                </svg>
              </div>
            )}
          </div>
        )}

        {/* Global Mute/Unmute Audio button removed */}
      </div>
    </div>
  )
}
