'use client'

import { useEffect } from 'react'
import { useJashn } from '@/lib/jashn/store'
import type { JashnUser } from '@/lib/jashn/types'

function setAuthCookie(authed: boolean) {
  if (typeof document === 'undefined') return
  if (authed) {
    document.cookie = 'jashn_authed=1; path=/; max-age=1209600; SameSite=Lax'
  } else {
    document.cookie = 'jashn_authed=; path=/; max-age=0; SameSite=Lax'
  }
}

export function FirebaseAuthListener() {
  const fetchUserCards = useJashn((s) => s.fetchUserCards)

  useEffect(() => {
    let unsubscribe: (() => void) | undefined
    let isCancelled = false

    const initAuth = async () => {
      if (isCancelled) return

      try {
        const { getFirebaseAuth, getFirebaseDb } = await import('@/lib/firebase')
        const auth = getFirebaseAuth()
        const db = getFirebaseDb()
        if (!auth || isCancelled) {
          useJashn.setState({ isAuthLoading: false })
          return
        }

        const { onAuthStateChanged, getRedirectResult } = await import('firebase/auth')

        const syncFirestoreUser = async (firebaseUser: {
          uid: string
          displayName: string | null
          email: string | null
          phoneNumber: string | null
        }): Promise<JashnUser> => {
          let userData: JashnUser | null = null

          if (db) {
            try {
              const { doc, getDoc, setDoc } = await import('firebase/firestore')
              
              // 3.5s timeout race to prevent long 10s offline hangs
              const fetchPromise = getDoc(doc(db, 'users', firebaseUser.uid))
              const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3500))
              
              const userDoc = await Promise.race([fetchPromise, timeoutPromise])

              if (userDoc && 'exists' in userDoc && userDoc.exists()) {
                userData = userDoc.data() as JashnUser
              } else if (userDoc && 'exists' in userDoc) {
                userData = {
                  uid: firebaseUser.uid,
                  name: firebaseUser.displayName || firebaseUser.phoneNumber || 'Cardzy User',
                  email: firebaseUser.email || '',
                  phone: firebaseUser.phoneNumber || '',
                  plan: 'free',
                  createdAt: Date.now(),
                }
                setDoc(doc(db, 'users', firebaseUser.uid), userData).catch((err: any) => {
                  console.warn('Firestore setDoc notice (operating offline):', err?.message || err)
                })
              }
            } catch (err: any) {
              console.warn('Firestore user sync notice (operating offline):', err?.message || err)
            }
          }

          if (!userData) {
            userData = {
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.phoneNumber || 'Cardzy User',
              email: firebaseUser.email || '',
              phone: firebaseUser.phoneNumber || '',
              plan: 'free',
              createdAt: Date.now(),
            }
          }

          return userData
        }

        // 1. Check for Google Auth redirect result immediately
        try {
          const redirectResult = await getRedirectResult(auth)
          if (redirectResult?.user && !isCancelled) {
            const userData = await syncFirestoreUser(redirectResult.user)
            setAuthCookie(true)
            useJashn.setState((s) => {
              const existing = s.registeredUsers || []
              const idx = existing.findIndex((item) => item.uid === userData.uid || (item.email && item.email.toLowerCase() === userData.email?.toLowerCase()))
              const updated = idx >= 0 ? existing.map((u, i) => (i === idx ? { ...u, ...userData } : u)) : [userData, ...existing]
              return { user: userData, registeredUsers: updated, isAuthLoading: false }
            })
            await useJashn.getState().migrateGuestCards(userData.uid)
            await useJashn.getState().fetchUserCards()

            // Auto-redirect if user landed on /login or /signup after Google OAuth selection
            if (typeof window !== 'undefined') {
              const pathname = window.location.pathname
              if (pathname === '/login' || pathname === '/signup') {
                const searchParams = new URLSearchParams(window.location.search)
                const targetRedirect = searchParams.get('redirect') || '/dashboard'
                window.location.href = targetRedirect
                return
              }
            }
          }
        } catch (err: any) {
          const code = err?.code || ''
          if (code !== 'auth/internal-error' && code !== 'auth/null-user' && code !== 'auth/no-auth-event') {
            console.warn('Redirect auth result info:', err?.message || err)
          }
        }

        // 2. Set up auth state change listener
        unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (isCancelled) return
          if (firebaseUser) {
            const userData = await syncFirestoreUser(firebaseUser)
            setAuthCookie(true)
            useJashn.setState((s) => {
              const existing = s.registeredUsers || []
              const idx = existing.findIndex((item) => item.uid === userData.uid || (item.email && item.email.toLowerCase() === userData.email?.toLowerCase()))
              const updated = idx >= 0 ? existing.map((u, i) => (i === idx ? { ...u, ...userData } : u)) : [userData, ...existing]
              return { user: userData, registeredUsers: updated, isAuthLoading: false }
            })
            await useJashn.getState().migrateGuestCards(userData.uid)
            fetchUserCards()

            // Auto-redirect if user landed on /login or /signup after Google OAuth selection
            if (typeof window !== 'undefined') {
              const pathname = window.location.pathname
              if (pathname === '/login' || pathname === '/signup') {
                const searchParams = new URLSearchParams(window.location.search)
                const targetRedirect = searchParams.get('redirect') || '/dashboard'
                window.location.href = targetRedirect
              }
            }
          } else {
            useJashn.setState({ isAuthLoading: false })
            const currentUser = useJashn.getState().user
            if (!currentUser) {
              setAuthCookie(false)
            }
          }
        })
      } catch (e) {
        console.error('Error in initAuth:', e)
        useJashn.setState({ isAuthLoading: false })
      }
    }

    initAuth()

    return () => {
      isCancelled = true
      if (unsubscribe) unsubscribe()
    }
  }, [fetchUserCards])

  return null
}

