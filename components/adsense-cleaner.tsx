'use client'

import { useEffect } from 'react'

export function AdSenseCleaner() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Trap third-party AdSense TagErrors & no_div errors globally
    const isAdError = (msg: any) => {
      if (!msg) return false
      const str = String(msg).toLowerCase()
      return str.indexOf('adsbygoogle') !== -1 || str.indexOf('no_div') !== -1 || str.indexOf('tagerror') !== -1
    }

    const handleError = (e: ErrorEvent) => {
      if (e && (isAdError(e.message) || isAdError(e.filename) || isAdError(e.error))) {
        if (e.stopImmediatePropagation) e.stopImmediatePropagation()
        if (e.preventDefault) e.preventDefault()
        return true
      }
    }

    const handleRejection = (e: PromiseRejectionEvent) => {
      if (e && isAdError(e.reason)) {
        if (e.stopImmediatePropagation) e.stopImmediatePropagation()
        if (e.preventDefault) e.preventDefault()
      }
    }

    window.addEventListener('error', handleError, true)
    window.addEventListener('unhandledrejection', handleRejection, true)

    // Configure AdSense auto-ads object safely
    try {
      // @ts-ignore
      window.adsbygoogle = window.adsbygoogle || []
    } catch (e) {}

    const cleanTopMargin = () => {
      try {
        const targets = [document.body, document.documentElement]
        for (let i = 0; i < targets.length; i++) {
          const el = targets[i]
          if (el) {
            if (el.style.top && el.style.top !== '0px') el.style.setProperty('top', '0px', 'important')
            if (el.style.marginTop && el.style.marginTop !== '0px') el.style.setProperty('margin-top', '0px', 'important')
            if (el.style.paddingTop && el.style.paddingTop !== '0px') el.style.setProperty('padding-top', '0px', 'important')
          }
        }
        const topAds = document.querySelectorAll('body > .google-auto-placed, body > iframe[name^="google_ads_"], .goog-te-banner-frame')
        topAds.forEach((node: any) => {
          node.style.setProperty('display', 'none', 'important')
          node.style.setProperty('height', '0px', 'important')
        })
      } catch (e) {}
    }

    cleanTopMargin()

    let observer: MutationObserver | null = null
    if (window.MutationObserver) {
      observer = new MutationObserver(() => cleanTopMargin())
      if (document.body) {
        observer.observe(document.body, { attributes: true, attributeFilter: ['style'], childList: true })
      }
      if (document.documentElement) {
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] })
      }
    }

    const origPushState = history.pushState
    if (origPushState) {
      history.pushState = function (...args) {
        const res = origPushState.apply(this, args)
        cleanTopMargin()
        setTimeout(cleanTopMargin, 0)
        setTimeout(cleanTopMargin, 50)
        setTimeout(cleanTopMargin, 200)
        setTimeout(cleanTopMargin, 500)
        return res
      }
    }

    const origReplaceState = history.replaceState
    if (origReplaceState) {
      history.replaceState = function (...args) {
        const res = origReplaceState.apply(this, args)
        cleanTopMargin()
        setTimeout(cleanTopMargin, 0)
        setTimeout(cleanTopMargin, 50)
        setTimeout(cleanTopMargin, 200)
        setTimeout(cleanTopMargin, 500)
        return res
      }
    }

    const handlePopState = () => {
      cleanTopMargin()
      setTimeout(cleanTopMargin, 50)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('error', handleError, true)
      window.removeEventListener('unhandledrejection', handleRejection, true)
      window.removeEventListener('popstate', handlePopState)
      if (observer) observer.disconnect()
    }
  }, [])

  return null
}
