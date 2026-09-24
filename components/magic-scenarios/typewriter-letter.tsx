import React, { useState, useEffect, useRef } from 'react'
import { ZoomableImageBadge } from '@/components/ui/image-lightbox'

interface TypewriterLetterProps {
  englishText: string;
  urduText?: string;
  signatureText?: string;
  photoUrl?: string;
  className?: string;
  urduClassName?: string;
  signatureClassName?: string;
  speed?: number;
  cursorColor?: string;
}

export function TypewriterLetter({ 
  englishText, 
  urduText, 
  signatureText, 
  photoUrl,
  className = "magic-letter text-xs text-slate-100 max-h-48 overflow-y-auto cursor-pointer", 
  urduClassName = "mt-2.5 text-right font-nastaliq text-sm text-amber-200", 
  signatureClassName = "mt-3 text-right font-serif italic text-amber-300",
  speed = 20, 
  cursorColor = '#f5c451' 
}: TypewriterLetterProps) {
  
  const [displayedChars, setDisplayedChars] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setDisplayedChars(0)
    setIsComplete(false)
    let currentIdx = 0
    timerRef.current = setInterval(() => {
      currentIdx += 1
      setDisplayedChars(currentIdx)
      if (currentIdx >= englishText.length) {
        if (timerRef.current) clearInterval(timerRef.current)
        setIsComplete(true)
      }
    }, speed)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [englishText, speed])

  const handleSkip = () => {
    if (!isComplete) {
      if (timerRef.current) clearInterval(timerRef.current)
      setDisplayedChars(englishText.length)
      setIsComplete(true)
    }
  }

  return (
    <div className={`break-words break-all [overflow-wrap:anywhere] [word-break:break-word] ${className}`} onClick={handleSkip}>
      {photoUrl && (
        <div className="mb-3 flex justify-center" onClick={(e) => e.stopPropagation()}>
          <ZoomableImageBadge
            src={photoUrl}
            alt="Attached Magic Card Photo"
            badgeText="Tap to Enlarge"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-xl cursor-zoom-in"
            imgClassName="size-full object-cover"
          />
        </div>
      )}
      <span style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', wordBreak: 'break-word' }} className="break-words break-all">
        {englishText.slice(0, displayedChars)}
      </span>
      {!isComplete && (
        <span 
          className="inline-block w-1.5 h-3.5 ml-0.5 animate-pulse align-middle shrink-0" 
          style={{ backgroundColor: cursorColor }}
        />
      )}
      {isComplete && urduText && (
        <div className={`animate-in fade-in duration-700 break-words break-all [overflow-wrap:anywhere] ${urduClassName}`}>
          {urduText}
        </div>
      )}
      {isComplete && signatureText && (
        <div className={`animate-in fade-in duration-700 delay-300 fill-mode-both break-words break-all [overflow-wrap:anywhere] ${signatureClassName}`}>
          {signatureText}
        </div>
      )}
    </div>
  )
}
