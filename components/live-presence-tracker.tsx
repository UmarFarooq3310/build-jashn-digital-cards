'use client'

import { useEffect } from 'react'
import { useJashn } from '@/lib/jashn/store'

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = sessionStorage.getItem('cardzy_live_session_id')
  if (!id) {
    id = 's_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36)
    sessionStorage.setItem('cardzy_live_session_id', id)
  }
  return id
}

export function LivePresenceTracker() {
  const user = useJashn((s) => s.user)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const sessionId = getSessionId()
    if (!sessionId) return

    let intervalId: NodeJS.Timeout | undefined

    const updatePresence = async () => {
      try {
        const { getFirebaseDb } = await import('@/lib/firebase')
        const db = getFirebaseDb()
        if (!db) return

        const { doc, setDoc } = await import('firebase/firestore')

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown'
        const language = navigator.language || 'en'

        await setDoc(
          doc(db, 'active_sessions', sessionId),
          {
            sessionId,
            lastSeen: Date.now(),
            page: window.location.pathname,
            title: document.title || 'Cardzy',
            device: isMobile ? 'Mobile' : 'Desktop',
            timezone,
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
