import { getFirebaseApp, getFirebaseDb } from './firebase'
import { collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc } from 'firebase/firestore'

const DEFAULT_VAPID_KEY = 'BLizHv0HbwPdCZfcA_VMBfFcat6DFhnDWdWCu1mfZrxUlaQ7NNnYAb_yI2WXpCSOyJEAX4dV-4ScwsNzSSUVbuI'

async function sendDebugLog(step: string, details: any) {
  try {
    if (typeof window !== 'undefined') {
      fetch('/api/push/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          step,
          details,
          userAgent: navigator.userAgent,
          permission: typeof Notification !== 'undefined' ? Notification.permission : 'unsupported',
          timestamp: new Date().toISOString()
        })
      }).catch(() => {})
    }
  } catch (_) {}
}

export interface SubscribeResult {
  success: boolean
  token?: string
  error?: string
}

export async function subscribeToPushWithResult(): Promise<SubscribeResult> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('Notification' in window)) {
    const msg = 'Push notifications are not supported on this browser.'
    await sendDebugLog('unsupported_environment', { error: msg })
    return { success: false, error: msg }
  }

  try {
    await sendDebugLog('requesting_permission', { current: Notification.permission })
    const permission = await Notification.requestPermission()
    await sendDebugLog('permission_response', { permission })

    if (permission !== 'granted') {
      return { 
        success: false, 
        error: permission === 'denied' 
          ? 'Permission was denied. Please allow notifications in your browser settings.' 
          : 'Permission prompt was dismissed.' 
      }
    }

    const { getMessaging, getToken } = await import('firebase/messaging')
    const app = getFirebaseApp()
    if (!app) {
      const msg = 'Firebase App initialization failed.'
      await sendDebugLog('firebase_app_missing', {})
      return { success: false, error: msg }
    }

    const messaging = getMessaging(app)

    // Register service worker
    let swReg: ServiceWorkerRegistration | undefined
    try {
      swReg = await navigator.serviceWorker.register('/firebase-messaging-sw.js', { scope: '/' })
      await navigator.serviceWorker.ready
      await sendDebugLog('service_worker_registered', { scope: swReg?.scope, active: !!swReg?.active })
    } catch (swErr: any) {
      await sendDebugLog('service_worker_error', { message: swErr.message || String(swErr) })
    }

    const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || DEFAULT_VAPID_KEY

    let token: string | null = null
    try {
      token = await getToken(messaging, {
        vapidKey,
        serviceWorkerRegistration: swReg,
      })
      await sendDebugLog('get_token_success', { tokenPreview: token ? token.substring(0, 15) + '...' : null })
    } catch (tokenErr: any) {
      await sendDebugLog('get_token_with_sw_failed', { message: tokenErr.message || String(tokenErr) })
      // Fallback: try without passing serviceWorkerRegistration
      try {
        token = await getToken(messaging, { vapidKey })
        await sendDebugLog('get_token_fallback_success', { tokenPreview: token ? token.substring(0, 15) + '...' : null })
      } catch (fallbackErr: any) {
        const errMsg = fallbackErr.message || String(fallbackErr)
        await sendDebugLog('get_token_fallback_failed', { message: errMsg })
        return { success: false, error: `FCM Token Error: ${errMsg}` }
      }
    }

    if (!token) {
      return { success: false, error: 'Could not obtain push registration token from browser.' }
    }

    // 1. Save via Server-side API endpoint
    try {
      const res = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          userAgent: navigator.userAgent,
        }),
      })
      const apiRes = await res.json()
      await sendDebugLog('server_api_subscribe_result', apiRes)
    } catch (apiErr: any) {
      await sendDebugLog('server_api_subscribe_error', { message: apiErr.message })
    }

    // 2. Also save to client Firestore directly
    try {
      const db = getFirebaseDb()
      if (db) {
        const subsRef = collection(db, 'push_subscribers')
        const q = query(subsRef, where('token', '==', token))
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
          await addDoc(subsRef, {
            token,
            createdAt: serverTimestamp(),
            userAgent: navigator.userAgent,
            lastActive: serverTimestamp(),
          })
        } else {
          querySnapshot.forEach(async (docSnap) => {
            await updateDoc(docSnap.ref, { lastActive: serverTimestamp() })
          })
        }
        await sendDebugLog('client_firestore_saved', {})
      }
    } catch (dbErr: any) {
      await sendDebugLog('client_firestore_error', { message: dbErr.message })
    }

    localStorage.setItem('cardzy_push_subscribed', 'true')
    return { success: true, token }
  } catch (error: any) {
    const errorMsg = error.message || String(error)
    console.error('Error subscribing to push notifications on this device:', error)
    await sendDebugLog('fatal_subscribe_error', { message: errorMsg, stack: error.stack })
    return { success: false, error: errorMsg }
  }
}

export async function subscribeToPush(): Promise<string | null> {
  const result = await subscribeToPushWithResult()
  return result.token || null
}

export function isSubscribed(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('cardzy_push_subscribed') === 'true'
}

export async function unsubscribeFromPush(): Promise<void> {
  if (typeof window === 'undefined') return
  localStorage.removeItem('cardzy_push_subscribed')
}
