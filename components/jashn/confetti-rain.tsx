'use client'

import { useEffect, useRef } from 'react'

interface ConfettiRainProps {
  active: boolean
}

export function ConfettiRain({ active }: ConfettiRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Particle Classes
    interface Particle {
      x: number
      y: number
      size: number
      color: string
      speedY: number
      speedX: number
      rotation: number
      rotationSpeed: number
      opacity: number
      type: 'confetti' | 'sparkle'
    }

    const particles: Particle[] = []
    const colors = [
      '#e6b54a', // Gold
      '#c2185b', // Pink
      '#1b5e20', // Emerald Green
      '#1a237e', // Royal Blue
      '#e0a899', // Peach
      '#ffffff', // White
      '#ffd700', // Yellow
    ]

    // Create initial particles
    const initParticles = () => {
      const particleCount = 120
      for (let i = 0; i < particleCount; i++) {
        const type = Math.random() > 0.45 ? 'confetti' : 'sparkle'
        particles.push({
          x: Math.random() * width,
          y: Math.random() * -height - 20, // Start above the viewport
          size: type === 'confetti' ? Math.random() * 8 + 6 : Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedY: Math.random() * 3 + 2,
          speedX: Math.random() * 2 - 1,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 4 - 2,
          opacity: 1,
          type,
        })
      }
    }

    initParticles()

    let startTime = Date.now()
    const duration = 7500 // Run for 7.5 seconds

    const animate = () => {
      const elapsed = Date.now() - startTime
      if (elapsed > duration) {
        // Slow down and fade out remaining particles
        particles.forEach((p) => {
          p.opacity -= 0.01
        })
      }

      ctx.clearRect(0, 0, width, height)

      // Filter out dead particles
      const activeParticles = particles.filter((p) => p.opacity > 0 && p.y < height + 50)
      if (activeParticles.length === 0) {
        cancelAnimationFrame(animationFrameId)
        return
      }

      activeParticles.forEach((p) => {
        // Update positions
        p.y += p.speedY
        p.x += p.speedX + Math.sin(p.y / 30) * 0.5 // Sway effect
        p.rotation += p.rotationSpeed

        ctx.save()
        ctx.globalAlpha = p.opacity

        if (p.type === 'confetti') {
          // Draw rotating rectangle
          ctx.translate(p.x, p.y)
          ctx.rotate((p.rotation * Math.PI) / 180)
          ctx.fillStyle = p.color
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        } else {
          // Draw soft glowing sparkle
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.shadowBlur = 10
          ctx.shadowColor = p.color
          ctx.fill()
        }

        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
