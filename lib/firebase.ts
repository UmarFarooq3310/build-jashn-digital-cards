import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app'
import { getFirestore, initializeFirestore, Firestore } from 'firebase/firestore'
import { getAuth, Auth } from 'firebase/auth'

const cleanEnvVar = (val: string | undefined): string | undefined => {
  if (!val) return undefined
  const cleaned = val.replace(/^["']|["']$/g, '').trim()
  return cleaned || undefined
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
      return null
    }
  }
  return app
}

export function getFirebaseAuth(): Auth | null {
  if (typeof window === 'undefined') return null
  if (!auth) {
    const activeApp = getFirebaseApp()
    if (activeApp) {
      try {
        auth = getAuth(activeApp)
      } catch (e) {
        console.error('Error initializing Firebase Auth:', e)
      }
    }
  }
  return auth
}

export function getFirebaseDb(): Firestore | null {
  if (typeof window === 'undefined') return null
  if (!db) {
    const activeApp = getFirebaseApp()
    if (activeApp) {
      try {
        db = getFirestore(activeApp)
      } catch (e: any) {
        try {
          db = initializeFirestore(activeApp, {})
        } catch (initErr: any) {
          console.warn(
            'Firebase Firestore notice:',
            initErr?.message || e?.message || initErr || e
          )
          db = null
        }
      }
    }
  }
  return db
}

// Pre-initialize client instances on module evaluation safely
if (typeof window !== 'undefined' && isFirebaseConfigured) {
  try {
    getFirebaseApp()
    getFirebaseAuth()
    getFirebaseDb()
  } catch (e) {
    // Ignore client boot notice
  }
}

export { app, db, auth }
