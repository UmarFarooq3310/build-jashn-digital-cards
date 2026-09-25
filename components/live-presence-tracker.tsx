'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useJashn } from '@/lib/jashn/store'
import { getClientTracking } from '@/lib/jashn/tracking'
import { isDeviceAdmin, purgeAdminPresence } from '@/lib/jashn/admin-presence'

function getDeviceId(): string {
  if (typeof window === 'undefined') return ''
  try {
    let id = localStorage.getItem('cardzy_device_id')
    if (!id) {
      id = 'dev_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36)
      localStorage.setItem('cardzy_device_id', id)
    }
    return id
  } catch {
    return ''
  }
}

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  try {
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
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    // If currently on admin portal or admin device, purge presence and abort
    if (pathname.startsWith('/admin_portal') || isDeviceAdmin(user?.email)) {
      purgeAdminPresence(undefined, getDeviceId())
      return
    }

    const sessionId = getSessionId()
    if (!sessionId) return

    let intervalId: NodeJS.Timeout | undefined

    const updatePresence = async () => {
      try {
        const currentPath = window.location.pathname

        // Do not record presence if on admin portal or admin device
        if (currentPath.startsWith('/admin_portal') || isDeviceAdmin(user?.email)) {
          await purgeAdminPresence(sessionId, getDeviceId())
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
        const deviceId = getDeviceId()

        await setDoc(
          doc(db, 'active_sessions', sessionId),
          {
            sessionId,
            deviceId,
            lastSeen: Date.now(),
            page: currentPath,
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

    // Trigger immediate presence update
    updatePresence()

    // Pulse heartbeat every 35 seconds to keep active session fresh while within Firestore limits
    intervalId = setInterval(updatePresence, 35000)

    const handleActivity = () => {
      if (document.visibilityState === 'visible') {
        updatePresence()
      }
    }

    document.addEventListener('visibilitychange', handleActivity)
    window.addEventListener('focus', handleActivity)

    return () => {
      if (intervalId) clearInterval(intervalId)
      document.removeEventListener('visibilitychange', handleActivity)
      window.removeEventListener('focus', handleActivity)
    }
  }, [user, pathname])

  return null
}
