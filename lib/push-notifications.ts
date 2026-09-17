import { getFirebaseApp, getFirebaseDb } from './firebase'
import { collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc } from 'firebase/firestore'

const DEFAULT_VAPID_KEY = 'BLizHv0HbwPdCZfcA_VMBfFcat6DFhnDWdWCu1mfZrxUlaQ7NNnYAb_yI2WXpCSOyJEAX4dV-4ScwsNzSSUVbuI'

function cleanVapidKey(key?: string): string {
  const raw = (key || DEFAULT_VAPID_KEY).trim()
  // Clean all invalid characters, quotes, whitespace, keeping only valid base64url characters
  return raw.replace(/[^A-Za-z0-9\-_]/g, '')
}

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

export function getOrCreateDeviceId(): string {
  if (typeof window === 'undefined') return 'unknown_device';
  let id = localStorage.getItem('cardzy_device_id');
  if (!id) {
    id = 'dev_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
    localStorage.setItem('cardzy_device_id', id);
  }
  return id;
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
          ? 'Permission was denied. Please tap the lock icon in your address bar and set Notifications to Allow.' 
          : 'Permission prompt was dismissed.' 
      }
    }

    const { getMessaging, getToken, deleteToken } = await import('firebase/messaging')
    const app = getFirebaseApp()
    if (!app) {
      const msg = 'Firebase App initialization failed.'
      await sendDebugLog('firebase_app_missing', {})
      return { success: false, error: msg }
    }

    const messaging = getMessaging(app)

    // Register service worker and await active state
    let swReg: ServiceWorkerRegistration | undefined
    try {
      swReg = await navigator.serviceWorker.register('/firebase-messaging-sw.js', { scope: '/' })
      await navigator.serviceWorker.ready
      await sendDebugLog('service_worker_registered', { scope: swReg?.scope, active: !!swReg?.active })
    } catch (swErr: any) {
      await sendDebugLog('service_worker_error', { message: swErr.message || String(swErr) })
    }

    const vapidKey = cleanVapidKey(process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY)
    await sendDebugLog('using_vapid_key', { length: vapidKey.length, sample: vapidKey.substring(0, 10) })

    let token: string | null = null

    // Attempt 1: Standard getToken
    try {
      token = await getToken(messaging, {
        vapidKey,
        serviceWorkerRegistration: swReg,
      })
      await sendDebugLog('get_token_success', { tokenPreview: token ? token.substring(0, 15) + '...' : null })
    } catch (primaryErr: any) {
      const primaryMsg = primaryErr?.message || String(primaryErr)
      await sendDebugLog('primary_get_token_failed', { message: primaryMsg })

      // Attempt 2: Clear stale token cache and retry
      try {
        try {
          await deleteToken(messaging)
        } catch (_) {}

        if (typeof indexedDB !== 'undefined') {
          try {
            indexedDB.deleteDatabase('fcm_token_details_db')
          } catch (_) {}
        }

        token = await getToken(messaging, {
          vapidKey,
          serviceWorkerRegistration: swReg,
        })
        await sendDebugLog('retry_after_cleanup_success', { tokenPreview: token ? token.substring(0, 15) + '...' : null })
      } catch (retryErr: any) {
        // Attempt 3: Direct browser pushManager subscription fallback
        try {
          if (swReg && swReg.pushManager) {
            // Convert URL-safe base64 to Uint8Array safely
            const padding = '='.repeat((4 - (vapidKey.length % 4)) % 4)
            const base64 = (vapidKey + padding).replace(/-/g, '+').replace(/_/g, '/')
            const rawData = window.atob(base64)
            const outputArray = new Uint8Array(rawData.length)
            for (let i = 0; i < rawData.length; ++i) {
              outputArray[i] = rawData.charCodeAt(i)
            }

            const rawSub = await swReg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: outputArray,
            })

            // The endpoint suffix or full endpoint as token
            token = rawSub.endpoint.split('/').pop() || rawSub.endpoint
            await sendDebugLog('raw_pushmanager_fallback_success', { tokenPreview: token ? token.substring(0, 15) + '...' : null })
          }
        } catch (rawErr: any) {
          const finalErrMsg = retryErr?.message || rawErr?.message || primaryMsg
          await sendDebugLog('all_token_attempts_failed', { error: finalErrMsg })
          return { success: false, error: `FCM Token Error: ${finalErrMsg}` }
        }
      }
    }

    if (!token) {
      return { success: false, error: 'Could not obtain push registration token from browser.' }
    }

    const deviceId = getOrCreateDeviceId()

    // Save token to Server DB with single authoritative deduplication
    try {
      const res = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          deviceId,
          userAgent: navigator.userAgent,
        }),
      })
      const apiRes = await res.json()
      await sendDebugLog('server_api_subscribe_result', apiRes)
    } catch (apiErr: any) {
      await sendDebugLog('server_api_subscribe_error', { message: apiErr.message })
    }

    localStorage.setItem('cardzy_push_subscribed', 'true')
    return { success: true, token }
  } catch (error: any) {
    const errorMsg = error?.message || String(error)
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
