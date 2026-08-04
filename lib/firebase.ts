import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getAuth, Auth } from 'firebase/auth'

const cleanEnvVar = (val: string | undefined) => {
  if (!val) return val
  return val.replace(/^["']|["']$/g, '').trim()
}

const firebaseConfig = {
  apiKey: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
  authDomain: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
  projectId: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
  storageBucket: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
  appId: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
}

export const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId
)

let app: FirebaseApp | null = null
let db: Firestore | null = null
let auth: Auth | null = null

export function getFirebaseApp(): FirebaseApp | null {
  if (!isFirebaseConfigured) return null
  if (!app) {
    try {
      app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
    } catch (e) {
      console.error('Error initializing Firebase App:', e)
    }
  }
  return app
}

export function getFirebaseAuth(): Auth | null {
  if (typeof window === 'undefined') return null
  if (!auth) {
    const a = getFirebaseApp()
    if (a) {
      try { auth = getAuth(a) } catch (e) { console.error('Error initializing Firebase Auth:', e) }
    }
  }
  return auth
}

export function getFirebaseDb(): Firestore | null {
  if (typeof window === 'undefined') return null
  if (!db) {
    const a = getFirebaseApp()
    if (a) {
      try {
        db = getFirestore(a)
      } catch (e: any) {
        console.warn('Firebase Firestore is not enabled or available:', e?.message || e)
        db = null
      }
    }
  }
  return db
}

// Initialize real Firebase instances immediately on client load
if (typeof window !== 'undefined' && isFirebaseConfigured) {
  try {
    app = getFirebaseApp()
    auth = getFirebaseAuth()
    db = getFirebaseDb()
  } catch (e) {
    console.warn('Firebase initialization notice:', e)
  }
}

export { app, db, auth }

