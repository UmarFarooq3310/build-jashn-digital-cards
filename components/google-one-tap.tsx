'use client'

import { useEffect, useRef } from 'react'
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
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
    if (!clientId || !auth) return
    if (promptActive) return

    // FedCM (forced by Chrome) requires HTTPS — skip on localhost to avoid
    // the NetworkError noise. One Tap is active on production (HTTPS) only.
    const isLocalhost = typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    if (isLocalhost) return

    promptActive = true

    function initOneTap() {
      if (!window.google) return

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredential,
        auto_select: false,
        cancel_on_tap_outside: true,
        use_fedcm_for_prompt: false,
      })

      setTimeout(() => {
        window.google?.accounts.id.prompt((n) => {
          if (n.isNotDisplayed()) {
            console.info('[OneTap] not displayed:', n.getNotDisplayedReason())
            promptActive = false
          }
          if (n.isSkippedMoment()) {
            console.info('[OneTap] skipped:', n.getSkippedReason())
            promptActive = false
          }
        })
      }, 800)
    }

    async function handleCredential(response: { credential: string }) {
      try {
        // Sign in with Firebase using the Google ID token
        const credential = GoogleAuthProvider.credential(response.credential)
        const result = await signInWithCredential(auth!, credential)
        const firebaseUser = result.user

        // Sync / create Firestore user doc
        let userData: JashnUser | null = null
        if (db) {
          const userRef = doc(db, 'users', firebaseUser.uid)
          const snap = await getDoc(userRef)
          if (snap.exists()) {
            userData = snap.data() as JashnUser
          } else {
            userData = {
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || 'Jashn User',
              email: firebaseUser.email || '',
              plan: 'free',
              createdAt: Date.now(),
            }
            await setDoc(userRef, userData)
          }
        }

        if (!userData) {
          userData = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || 'Jashn User',
            email: firebaseUser.email || '',
            plan: 'free',
            createdAt: Date.now(),
          }
        }

        // Set auth cookie so middleware lets us through
        document.cookie = 'jashn_authed=1; path=/; max-age=1209600; SameSite=Lax'

        // Set Zustand state directly — FirebaseAuthListener will also
        // pick this up via onAuthStateChanged, but we set it here too
        // so the redirect landing page has it immediately.
        useJashn.setState({ user: userData, isAuthLoading: false })

        // Migrate any guest cards to the new user
        await useJashn.getState().migrateGuestCards(userData.uid)
        await useJashn.getState().fetchUserCards()

        promptActive = false

        // Hard redirect — avoids any React router state race conditions
        window.location.href = redirectRef.current
      } catch (err: any) {
        console.error('[OneTap] sign-in error:', err?.code, err?.message)
        promptActive = false
      }
    }

    if (window.google) {
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
        document.head.appendChild(script)
      } else {
        existing.addEventListener('load', initOneTap, { once: true })
      }
    }

    return () => {
      window.google?.accounts.id.cancel()
      promptActive = false
    }
  }, [clientId])

  return null
}
