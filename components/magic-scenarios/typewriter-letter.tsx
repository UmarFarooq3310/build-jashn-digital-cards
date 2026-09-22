import React, { useState, useEffect, useRef } from 'react'

interface TypewriterLetterProps {
  englishText: string;
  urduText?: string;
  signatureText?: string;
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
    <div className={className} onClick={handleSkip}>
      <span style={{ whiteSpace: 'pre-wrap' }}>{englishText.slice(0, displayedChars)}</span>
      {!isComplete && (
        <span 
          className="inline-block w-1.5 h-3.5 ml-0.5 animate-pulse align-middle" 
          style={{ backgroundColor: cursorColor }}
        />
      )}
      {isComplete && urduText && (
        <div className={`animate-in fade-in duration-700 ${urduClassName}`}>
          {urduText}
        </div>
      )}
      {isComplete && signatureText && (
        <div className={`animate-in fade-in duration-700 delay-300 fill-mode-both ${signatureClassName}`}>
          {signatureText}
        </div>
      )}
    </div>
  )
}
