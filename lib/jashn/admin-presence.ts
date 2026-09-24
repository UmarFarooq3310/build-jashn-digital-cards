'use client'

import { getFirebaseDb } from '@/lib/firebase'
import { collection, doc, getDocs, deleteDoc, query, where } from 'firebase/firestore'

export const ADMIN_EMAILS = ['cardzyonline@gmail.com']

/**
 * Checks if the current browser / device or user email is an admin.
 */
export function isDeviceAdmin(userEmail?: string | null): boolean {
  if (typeof window === 'undefined') return false
  if (userEmail && ADMIN_EMAILS.includes(userEmail.trim().toLowerCase())) return true
  if (window.location.pathname.startsWith('/admin_portal')) return true
  try {
    if (sessionStorage.getItem('cardzy_is_admin') === '1') return true
    if (localStorage.getItem('cardzy_is_admin') === '1') return true
    if (sessionStorage.getItem('cardzy_admin_session')) return true
  } catch {}
  return false
}

/**
 * Marks this device permanently as an admin device, clears local session identifiers,
 * and purges all active session documents from Firebase Firestore for this device and admin accounts.
 */
export async function purgeAdminPresence(explicitSessionId?: string): Promise<void> {
  if (typeof window === 'undefined') return

  let sessionId = explicitSessionId
  try {
    sessionStorage.setItem('cardzy_is_admin', '1')
    localStorage.setItem('cardzy_is_admin', '1')
    if (!sessionId) {
      sessionId = sessionStorage.getItem('cardzy_live_session_id') || localStorage.getItem('cardzy_live_session_id') || undefined
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

    // 2. Query and delete all active sessions associated with admin email or admin portal
    const collRef = collection(db, 'active_sessions')
    const snap = await getDocs(collRef)
    
    snap.docs.forEach((d) => {
      const data = d.data()
      const email = (data.userEmail || '').toLowerCase().trim()
      const page = data.page || ''
      const isDocAdmin =
        ADMIN_EMAILS.includes(email) ||
        page.startsWith('/admin_portal') ||
        (sessionId && d.id === sessionId)

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
