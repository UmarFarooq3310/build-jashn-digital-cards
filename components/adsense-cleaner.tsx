'use client'

import { useEffect } from 'react'

export function AdSenseCleaner() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Trap third-party AdSense TagErrors & no_div errors globally
    const isAdError = (msg: any, src?: any) => {
      if (!msg && !src) return false
      const str = (String(msg || '') + ' ' + String(src || '')).toLowerCase()
      return (
        str.indexOf('adsbygoogle') !== -1 ||
        str.indexOf('tagerror') !== -1 ||
        str.indexOf('all \'ins\' elements') !== -1 ||
        str.indexOf('already have ads') !== -1 ||
        str.indexOf('no_div') !== -1 ||
        str.indexOf('pagead2') !== -1
      )
    }

    const handleError = (e: any) => {
      const msg = e?.message || e?.error?.message || String(e)
      const src = e?.filename || ''
      if (isAdError(msg, src)) {
        if (e.stopImmediatePropagation) e.stopImmediatePropagation()
        if (e.preventDefault) e.preventDefault()
        return true
      }
    }

    const handleRejection = (e: any) => {
      const reason = e?.reason?.message || e?.reason || ''
      if (isAdError(reason)) {
        if (e.stopImmediatePropagation) e.stopImmediatePropagation()
        if (e.preventDefault) e.preventDefault()
        return true
      }
    }

    window.addEventListener('error', handleError, true)
    window.addEventListener('unhandledrejection', handleRejection, true)

        const origConsoleError = console.error
    console.error = function (...args) {
      if (args[0] && typeof args[0] === 'string' && isAdError(args[0])) {
        return
      }
      origConsoleError.apply(this, args)
    }

    const origOnError = window.onerror
    window.onerror = function (message, source, lineno, colno, error) {
      if (isAdError(message, source) || (error && isAdError(error.message, source))) {
        return true
      }
      if (origOnError) {
        return origOnError.call(this, message, source, lineno, colno, error)
      }
      return false
    }

    // Configure AdSense auto-ads object safely
    try {
      // @ts-ignore
      const existing = window.adsbygoogle || []
      const wrapPush = (arr: any) => {
        if (!arr || arr._isWrapped) return arr
        const rawPush = arr.push
        arr.push = function (...args: any[]) {
          try {
            return rawPush.apply(this, args)
          } catch (err: any) {
            if (isAdError(err?.message || err)) {
              return 0
            }
            return 0
          }
        }
        arr._isWrapped = true
        return arr
      }
      // @ts-ignore
      window.adsbygoogle = wrapPush(existing)
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
