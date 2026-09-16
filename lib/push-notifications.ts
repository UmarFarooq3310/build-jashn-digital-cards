import { getFirebaseApp, getFirebaseDb } from './firebase'
import { collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc } from 'firebase/firestore'

const DEFAULT_VAPID_KEY = 'BLizHv0HbwPdCZfcA_VMBfFcat6DFhnDWdWCu1mfZrxUlaQ7NNnYAb_yI2WXpCSOyJEAX4dV-4ScwsNzSSUVbuI'

export async function subscribeToPush(): Promise<string | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('Notification' in window)) {
    console.warn('Web Push Notifications are not supported in this browser environment.')
    return null
  }

  try {
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') {
      console.warn('Push notification permission was denied or dismissed:', permission)
      return null
    }

    const { getMessaging, getToken } = await import('firebase/messaging')
    const app = getFirebaseApp()
    if (!app) {
      console.warn('Firebase app is not initialized')
      return null
    }

    const messaging = getMessaging(app)

    // Register service worker and wait until it is fully active
    await navigator.serviceWorker.register('/firebase-messaging-sw.js', { scope: '/' })
    const swRegistration = await navigator.serviceWorker.ready

    const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || DEFAULT_VAPID_KEY

    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: swRegistration,
    })

    if (token) {
      // 1. Save via robust Server-side API endpoint (guaranteed to succeed on mobile)
      try {
        await fetch('/api/push/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token,
            userAgent: navigator.userAgent,
          }),
        })
      } catch (apiErr) {
        console.warn('Server push subscribe sync notice:', apiErr)
      }

      // 2. Also save to client Firestore if available
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
        }
      } catch (dbErr) {
        console.warn('Client Firestore push sync notice:', dbErr)
      }

      localStorage.setItem('cardzy_push_subscribed', 'true')
      return token
    }
    return null
  } catch (error) {
    console.error('Error subscribing to push notifications on this device:', error)
    return null
  }
}

export function isSubscribed(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('cardzy_push_subscribed') === 'true'
}

export async function unsubscribeFromPush(): Promise<void> {
  if (typeof window === 'undefined') return
  localStorage.removeItem('cardzy_push_subscribed')
}
