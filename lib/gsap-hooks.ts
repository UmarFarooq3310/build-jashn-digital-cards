'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Reusable scroll reveal animation hook.
 * Fades + slides element up by 20px with power2.out ease (0.6s).
 * Respects prefers-reduced-motion.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: {
    y?: number
    duration?: number
    delay?: number
    start?: string
  } = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Check prefers-reduced-motion or small mobile screens for fast rendering
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768
    if (prefersReducedMotion || isMobile) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    const { y = 20, duration = 0.6, delay = 0, start = 'top 85%' } = options

    const anim = gsap.fromTo(
      el,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      anim.kill()
    }
  }, [options.y, options.duration, options.delay, options.start])

  return ref
}

/**
 * Reusable staggered children reveal animation hook.
 * Staggers matching child items 0.08s - 0.12s apart.
 * Respects prefers-reduced-motion.
 */
export function useStaggerChildren<T extends HTMLElement = HTMLElement>(
  selector: string,
  options: {
    stagger?: number
    duration?: number
    y?: number
    start?: string
  } = {}
) {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const children = container.querySelectorAll(selector)
    if (!children.length) return

    if (prefersReducedMotion) {
      gsap.set(children, { opacity: 1, y: 0 })
      return
    }

    const { stagger = 0.09, duration = 0.55, y = 20, start = 'top 85%' } = options

    const anim = gsap.fromTo(
      children,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      anim.kill()
    }
  }, [selector, options.stagger, options.duration, options.y, options.start])

  return containerRef
}
