'use client'

import { useEffect, useRef } from 'react'
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db, getFirebaseAuth, getFirebaseDb } from '@/lib/firebase'
import { useJashn } from '@/lib/jashn/store'
import type { JashnUser } from '@/lib/jashn/types'

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: object) => void
          prompt: (cb?: (n: {
            isNotDisplayed: () => boolean
            isSkippedMoment: () => boolean
            getNotDisplayedReason: () => string
            getSkippedReason: () => string
          }) => void) => void
          cancel: () => void
        }
      }
    }
  }
}

let promptActive = false

interface Props {
  redirectTo?: string
}

export function GoogleOneTap({ redirectTo = '/dashboard' }: Props) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  // Keep a ref so the callback always has the latest value without re-running the effect
  const redirectRef = useRef(redirectTo)
  redirectRef.current = redirectTo

  useEffect(() => {
    const authObj = getFirebaseAuth() || auth
    if (!clientId || !authObj) return
    if (promptActive) return

    // FedCM (forced by Chrome) requires HTTPS — skip on localhost to avoid
    // the NetworkError noise. One Tap is active on production (HTTPS) only.
    const isLocalhost = typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    if (isLocalhost) return

    promptActive = true

    function initOneTap() {
      try {
        if (!window.google?.accounts?.id) return

        // Ensure container exists in DOM
        const container = document.getElementById('google-one-tap-container')

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredential,
          auto_select: false,
          cancel_on_tap_outside: true,
          prompt_parent_id: container ? 'google-one-tap-container' : undefined,
          use_fedcm_for_prompt: true,
        })

        setTimeout(() => {
          try {
            window.google?.accounts?.id?.prompt((n) => {
              try {
                if (n.isNotDisplayed()) {
                  const reason = n.getNotDisplayedReason()
                  if (reason !== 'no_div' && reason !== 'suppressed_by_user') {
                    console.info('[OneTap] not displayed:', reason)
                  }
                  promptActive = false
                }
                if (n.isSkippedMoment()) {
                  promptActive = false
                }
              } catch {
                promptActive = false
              }
            })
          } catch {
            promptActive = false
          }
        }, 800)
      } catch (e) {
        console.warn('[OneTap] init notice:', e)
        promptActive = false
      }
    }

    async function handleCredential(response: { credential: string }) {
      try {
        const currentAuth = getFirebaseAuth() || auth
        if (!currentAuth) return

        // Sign in with Firebase using the Google ID token
        const credential = GoogleAuthProvider.credential(response.credential)
        const result = await signInWithCredential(currentAuth, credential)
        const firebaseUser = result.user

        // Sync / create Firestore user doc
        let userData: JashnUser | null = null
        const currentDb = getFirebaseDb() || db
        if (currentDb) {
          try {
            const userRef = doc(currentDb, 'users', firebaseUser.uid)
            const snap = await getDoc(userRef)
            if (snap.exists()) {
              userData = snap.data() as JashnUser
            } else {
              userData = {
                uid: firebaseUser.uid,
                name: firebaseUser.displayName || 'Cardzy User',
                email: firebaseUser.email || '',
                plan: 'free',
                createdAt: Date.now(),
              }
              await setDoc(userRef, userData)
            }
          } catch {}
        }

        if (!userData) {
          userData = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || 'Cardzy User',
            email: firebaseUser.email || '',
            plan: 'free',
            createdAt: Date.now(),
          }
        }

        // Set auth cookie so middleware lets us through
        try {
          document.cookie = 'jashn_authed=1; path=/; max-age=1209600; SameSite=Lax'
        } catch {}

        // Set Zustand state directly — FirebaseAuthListener will also
        // pick this up via onAuthStateChanged, but we set it here too
        // so the redirect landing page has it immediately.
        useJashn.setState({ user: userData, isAuthLoading: false })

        // Migrate any guest cards to the new user
        try {
          await useJashn.getState().migrateGuestCards(userData.uid)
          await useJashn.getState().fetchUserCards()
        } catch {}

        promptActive = false

        // Hard redirect — avoids any React router state race conditions
        window.location.href = redirectRef.current
      } catch (err: any) {
        console.error('[OneTap] sign-in error:', err?.code, err?.message)
        promptActive = false
      }
    }

    if (window.google?.accounts?.id) {
      initOneTap()
    } else {
      const existing = document.getElementById('gsi-script')
      if (!existing) {
        const script = document.createElement('script')
        script.id = 'gsi-script'
        script.src = 'https://accounts.google.com/gsi/client'
        script.async = true
        script.defer = true
        script.onload = initOneTap
        script.onerror = () => {
          promptActive = false
        }
        document.head.appendChild(script)
      } else {
        existing.addEventListener('load', initOneTap, { once: true })
      }
    }

    return () => {
      try {
        window.google?.accounts?.id?.cancel()
      } catch {}
      promptActive = false
    }
  }, [clientId])

  return (
    <div
      id="google-one-tap-container"
      className="fixed top-4 right-4 z-[999999] pointer-events-auto"
      aria-hidden="true"
    />
  )
}
