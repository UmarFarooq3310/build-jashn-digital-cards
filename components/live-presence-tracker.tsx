'use client'

import { useEffect } from 'react'
import { useJashn } from '@/lib/jashn/store'
import { getClientTracking } from '@/lib/jashn/tracking'

import { isDeviceAdmin, purgeAdminPresence } from '@/lib/jashn/admin-presence'

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  try {
    if (isDeviceAdmin()) return ''
    let id = sessionStorage.getItem('cardzy_live_session_id')
    if (!id) {
      id = 's_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36)
      sessionStorage.setItem('cardzy_live_session_id', id)
    }
    return id
  } catch {
    return ''
  }
}

export function LivePresenceTracker() {
  const user = useJashn((s) => s.user)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // If device or user is admin, immediately purge any sessions from Firebase and abort tracking
    if (isDeviceAdmin(user?.email)) {
      purgeAdminPresence()
      return
    }

    const sessionId = getSessionId()
    if (!sessionId) return

    let intervalId: NodeJS.Timeout | undefined

    const updatePresence = async () => {
      try {
        const isAdmin = isDeviceAdmin(user?.email)
        const pathname = window.location.pathname

        // If user is admin or browsing admin portal, DO NOT record presence and clean up any existing doc
        if (isAdmin || pathname.startsWith('/admin_portal')) {
          await purgeAdminPresence(sessionId)
          return
        }

        const { getFirebaseDb } = await import('@/lib/firebase')
        const db = getFirebaseDb()
        if (!db) return

        const { doc, setDoc } = await import('firebase/firestore')

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        const tracking = await getClientTracking()
        const exactLocation = tracking.createdLocation || (tracking.city ? `${tracking.city}, ${tracking.country || 'Pakistan'}` : tracking.country || 'Pakistan')
        const language = navigator.language || 'en'

        await setDoc(
          doc(db, 'active_sessions', sessionId),
          {
            sessionId,
            lastSeen: Date.now(),
            page: window.location.pathname,
            title: document.title || 'Cardzy',
            device: isMobile ? 'Mobile' : 'Desktop',
            location: exactLocation,
            timezone: exactLocation,
            city: tracking.city || '',
            region: tracking.region || '',
            country: tracking.country || 'Pakistan',
            countryCode: tracking.countryCode || 'PK',
            ip: tracking.ip || '',
            language,
            userId: user?.uid || null,
            userEmail: user?.email || 'Guest Visitor',
            userName: user?.name || 'Guest',
            referrer: document.referrer || 'Direct',
          },
          { merge: true }
        )
      } catch {
        // Ignore presence sync errors silently
      }
    }

    // Initial heartbeat
    updatePresence()

    // Pulse heartbeat every 25 seconds
    intervalId = setInterval(updatePresence, 25000)

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updatePresence()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      if (intervalId) clearInterval(intervalId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [user])

  return null
}
