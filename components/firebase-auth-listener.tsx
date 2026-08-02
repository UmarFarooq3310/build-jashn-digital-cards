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
        const { auth, db } = await import('@/lib/firebase')
        if (!auth || isCancelled) return

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
              const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
              if (userDoc.exists()) {
                userData = userDoc.data() as JashnUser
              } else {
                userData = {
                  uid: firebaseUser.uid,
                  name: firebaseUser.displayName || firebaseUser.phoneNumber || 'Cardzy User',
                  email: firebaseUser.email || '',
                  phone: firebaseUser.phoneNumber || '',
                  plan: 'free',
                  createdAt: Date.now(),
                }
                await setDoc(doc(db, 'users', firebaseUser.uid), userData)
              }
            } catch (err) {
              console.error('Failed to sync user with Firestore:', err)
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

        // Handle Google Auth redirect result immediately on Mobile / Android
        getRedirectResult(auth).then(async (result) => {
          if (result?.user && !isCancelled) {
            const userData = await syncFirestoreUser(result.user)
            setAuthCookie(true)
            useJashn.setState((s) => {
              const existing = s.registeredUsers || []
              const idx = existing.findIndex((item) => item.uid === userData.uid || (item.email && item.email.toLowerCase() === userData.email?.toLowerCase()))
              const updated = idx >= 0 ? existing.map((u, i) => (i === idx ? { ...u, ...userData } : u)) : [userData, ...existing]
              return { user: userData, registeredUsers: updated, isAuthLoading: false }
            })
            useJashn.getState().fetchUserCards()
          }
        }).catch((err) => {
          console.error('Redirect auth result error:', err)
        })

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
            fetchUserCards()
          } else {
            setAuthCookie(false)
            useJashn.setState({ user: null, isAuthLoading: false })
          }
        })
      } catch (e) {
        console.error('Error in initAuth:', e)
      }
    }

    // Delay Firebase auth initialization so it doesn't block initial page load / LCP
    const timer = setTimeout(initAuth, 1500)

    return () => {
      isCancelled = true
      clearTimeout(timer)
      if (unsubscribe) unsubscribe()
    }
  }, [fetchUserCards])

  return null
}

