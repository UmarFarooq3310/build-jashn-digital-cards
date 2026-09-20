import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app'
import { getFirestore, initializeFirestore, Firestore } from 'firebase/firestore'
import { getAuth, Auth } from 'firebase/auth'

const cleanEnvVar = (val: string | undefined): string | undefined => {
  if (!val) return undefined
  const cleaned = val.replace(/^["']|["']$/g, '').trim()
  return cleaned || undefined
}

const DEFAULT_FIREBASE_CONFIG = {
  apiKey: 'AIzaSyD0asLsaVAmvj2RX_rJmGq5AIyg_MffyEs',
  authDomain: 'jashn-app-e3888.firebaseapp.com',
  projectId: 'jashn-app-e3888',
  storageBucket: 'jashn-app-e3888.firebasestorage.app',
  messagingSenderId: '399759583542',
  appId: '1:399759583542:web:5f2947d5dfbd1be3aeeb97',
}

const firebaseConfig = {
  apiKey: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_API_KEY) || DEFAULT_FIREBASE_CONFIG.apiKey,
  authDomain: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) || DEFAULT_FIREBASE_CONFIG.authDomain,
  projectId: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) || DEFAULT_FIREBASE_CONFIG.projectId,
  storageBucket: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) || DEFAULT_FIREBASE_CONFIG.storageBucket,
  messagingSenderId: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID) || DEFAULT_FIREBASE_CONFIG.messagingSenderId,
  appId: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_APP_ID) || DEFAULT_FIREBASE_CONFIG.appId,
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

// Filter Firestore's benign offline notice from triggering Next.js development error overlay
if (typeof window !== 'undefined') {
  const origConsoleError = console.error
  console.error = function (...args: any[]) {
    const msg = args
      .map((a) => (typeof a === 'string' ? a : (a?.message || '')))
      .join(' ')
    if (
      msg.includes('Could not reach Cloud Firestore backend') ||
      msg.includes('The client will operate in offline mode')
    ) {
      console.warn('[Firestore Offline Notice]:', ...args)
      return
    }
    origConsoleError.apply(console, args)
  }
}

export function getFirebaseDb(): Firestore | null {
  if (typeof window === 'undefined') return null
  if (!db) {
    const activeApp = getFirebaseApp()
    if (activeApp) {
      try {
        db = initializeFirestore(activeApp, {
          experimentalAutoDetectLongPolling: true,
        })
      } catch (e: any) {
        try {
          db = getFirestore(activeApp)
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
