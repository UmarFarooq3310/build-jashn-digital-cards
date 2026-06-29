import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

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

// Check if Firebase is configured
const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId
)

let app: any = null
let db: any = null
let auth: any = null

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
    db = getFirestore(app)
    auth = getAuth(app)
  } catch (error) {
    console.error('Failed to initialize Firebase:', error)
  }
} else {
  if (typeof window !== 'undefined') {
    console.warn(
      'Firebase environment variables are missing. Please add them to your .env.local file to enable sharing and database synchronization.',
      '\nLoaded Config:', firebaseConfig
    )
  }
}

export { app, db, auth, isFirebaseConfigured }
