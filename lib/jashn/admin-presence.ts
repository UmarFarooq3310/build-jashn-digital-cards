'use client'

import { getFirebaseDb } from '@/lib/firebase'
import { collection, doc, getDocs, deleteDoc, query, where } from 'firebase/firestore'

export const ADMIN_EMAILS = ['cardzyonline@gmail.com']

/**
 * Checks if the current browser / device or user email is an admin on the admin portal.
 */
export function isDeviceAdmin(userEmail?: string | null): boolean {
  if (typeof window === 'undefined') return false
  if (window.location.pathname.startsWith('/admin_portal')) return true
  if (userEmail && ADMIN_EMAILS.includes(userEmail.toLowerCase().trim())) return true
  try {
    if (localStorage.getItem('cardzy_is_admin') === '1' || sessionStorage.getItem('cardzy_is_admin') === '1') {
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
 * and purges all active session documents from Firebase Firestore for this device and admin accounts.
 */
export async function purgeAdminPresence(explicitSessionId?: string, explicitDeviceId?: string): Promise<void> {
  if (typeof window === 'undefined') return

  let sessionId = explicitSessionId
  let deviceId = explicitDeviceId
  try {
    sessionStorage.setItem('cardzy_is_admin', '1')
    localStorage.setItem('cardzy_is_admin', '1')
    if (!sessionId) {
      sessionId = sessionStorage.getItem('cardzy_live_session_id') || localStorage.getItem('cardzy_live_session_id') || undefined
    }
    if (!deviceId) {
      deviceId = localStorage.getItem('cardzy_device_id') || undefined
    }
    sessionStorage.removeItem('cardzy_live_session_id')
    localStorage.removeItem('cardzy_live_session_id')
  } catch {}

  try {
    const db = getFirebaseDb()
    if (!db) return

    const deletePromises: Promise<any>[] = []

    // 1. Delete explicit / local session document immediately
    if (sessionId) {
      deletePromises.push(deleteDoc(doc(db, 'active_sessions', sessionId)).catch(() => {}))
    }

    // 2. Query and delete all active sessions associated with admin email, admin portal, or this admin device
    const collRef = collection(db, 'active_sessions')
    const snap = await getDocs(collRef)
    
    snap.docs.forEach((d) => {
      const data = d.data()
      const email = (data.userEmail || '').toLowerCase().trim()
      const page = data.page || ''
      const docDeviceId = data.deviceId || ''
      const isDocAdmin =
        ADMIN_EMAILS.includes(email) ||
        page.startsWith('/admin_portal') ||
        (sessionId && d.id === sessionId) ||
        (deviceId && docDeviceId && docDeviceId === deviceId)

      if (isDocAdmin) {
        deletePromises.push(deleteDoc(doc(db, 'active_sessions', d.id)).catch(() => {}))
      }
    })

    await Promise.all(deletePromises)
  } catch (err) {
    // Non-blocking catch
    console.debug('Admin presence purge completed with notice:', err)
  }
}
