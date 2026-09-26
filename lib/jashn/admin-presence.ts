'use client'

import { getFirebaseDb } from '@/lib/firebase'
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore'

export const ADMIN_EMAILS = ['cardzyonline@gmail.com']

/**
 * Permanently stamps this browser / device as the admin device.
 * Stores persistent flags in localStorage, sessionStorage, 1-year cookies,
 * and notifies all open tabs in this browser via BroadcastChannel.
 */
export function markDeviceAsAdmin(deviceId?: string): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('cardzy_is_admin', '1')
    localStorage.setItem('cardzy_admin_device', '1')
    sessionStorage.setItem('cardzy_is_admin', '1')
    sessionStorage.setItem('cardzy_admin_device', '1')
    document.cookie = 'cardzy_admin_device=1; path=/; max-age=31536000; SameSite=Lax'
    document.cookie = 'cardzy_is_admin=1; path=/; max-age=31536000; SameSite=Lax'

    const finalDevId = deviceId || localStorage.getItem('cardzy_device_id')
    if (finalDevId) {
      localStorage.setItem('cardzy_admin_device_id', finalDevId)
    }

    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('cardzy_presence_channel')
        bc.postMessage({ action: 'ADMIN_ACTIVE', deviceId: finalDevId })
        bc.close()
      }
    } catch {}
  } catch {}
}

/**
 * Checks if the current browser / device or user email belongs to the admin.
 * If true, this device is never logged into active or offline sessions on ANY page.
 */
export function isDeviceAdmin(userEmail?: string | null): boolean {
  if (typeof window === 'undefined') return false
  if (window.location.pathname.startsWith('/admin_portal')) {
    markDeviceAsAdmin()
    return true
  }
  if (userEmail && ADMIN_EMAILS.includes(userEmail.toLowerCase().trim())) {
    markDeviceAsAdmin()
    return true
  }
  try {
    if (
      localStorage.getItem('cardzy_is_admin') === '1' ||
      localStorage.getItem('cardzy_admin_device') === '1' ||
      sessionStorage.getItem('cardzy_is_admin') === '1' ||
      sessionStorage.getItem('cardzy_admin_device') === '1' ||
      document.cookie.includes('cardzy_admin_device=1') ||
      document.cookie.includes('cardzy_is_admin=1')
    ) {
      return true
    }
    const adminSession = sessionStorage.getItem('cardzy_admin_session')
    if (adminSession) {
      const parsed = JSON.parse(adminSession)
      if (parsed.authed) return true
    }
  } catch {}
  return false
}

/**
 * Marks this device permanently as an admin device, clears local session identifiers,
 * and purges all active/offline session documents from Firebase Firestore for this device and admin accounts.
 */
export async function purgeAdminPresence(explicitSessionId?: string, explicitDeviceId?: string): Promise<void> {
  if (typeof window === 'undefined') return

  markDeviceAsAdmin(explicitDeviceId)

  let sessionId = explicitSessionId
  let deviceId = explicitDeviceId
  try {
    if (!sessionId) {
      sessionId = sessionStorage.getItem('cardzy_live_session_id') || localStorage.getItem('cardzy_live_session_id') || undefined
    }
    if (!deviceId) {
      deviceId = localStorage.getItem('cardzy_device_id') || localStorage.getItem('cardzy_admin_device_id') || undefined
    }
    sessionStorage.removeItem('cardzy_live_session_id')
    localStorage.removeItem('cardzy_live_session_id')
  } catch {}

  const isLocal = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.startsWith('192.168.')
  )

  // 1. Asynchronously call server endpoint for authoritative cascading deletion via Firebase Admin SDK
  try {
    fetch('/api/admin-card-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'purge_admin_sessions',
        deviceId,
        sessionId,
        isLocalhost: isLocal,
      }),
    }).catch(() => {})
  } catch {}

  // 2. Client-side Firestore delete fallback
  try {
    const db = getFirebaseDb()
    if (!db) return

    const deletePromises: Promise<any>[] = []

    if (sessionId) {
      deletePromises.push(deleteDoc(doc(db, 'active_sessions', sessionId)).catch(() => {}))
    }

    const collRef = collection(db, 'active_sessions')
    const snap = await getDocs(collRef)
    
    snap.docs.forEach((d) => {
      const data = d.data()
      const email = (data.userEmail || '').toLowerCase().trim()
      const page = data.page || ''
      const docDeviceId = data.deviceId || ''
      const ref = data.referrer || ''
      const ip = data.ip || ''

      const isDocAdmin =
        ADMIN_EMAILS.includes(email) ||
        page.startsWith('/admin_portal') ||
        (sessionId && d.id === sessionId) ||
        (deviceId && docDeviceId && docDeviceId === deviceId) ||
        (isLocal && (ref.includes('localhost') || ip === '127.0.0.1' || ip === '::1' || ip === 'localhost'))

      if (isDocAdmin) {
        deletePromises.push(deleteDoc(doc(db, 'active_sessions', d.id)).catch(() => {}))
      }
    })

    await Promise.all(deletePromises)
  } catch (err) {
    console.debug('Admin presence purge notice:', err)
  }
}
