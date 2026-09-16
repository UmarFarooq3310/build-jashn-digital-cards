import { getFirebaseApp, getFirebaseDb } from './firebase'
import { collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc } from 'firebase/firestore'

export async function subscribeToPush(): Promise<string | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('Notification' in window)) {
    return null
  }

  try {
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') return null

    const { getMessaging, getToken } = await import('firebase/messaging')
    const app = getFirebaseApp()
    if (!app) return null

    const messaging = getMessaging(app)
    const swRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')

    const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY

    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: swRegistration,
    })

    if (token) {
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

      localStorage.setItem('cardzy_push_subscribed', 'true')
      return token
    }
    return null
  } catch (error) {
    console.error('Error subscribing to push notifications:', error)
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
