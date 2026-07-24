'use client'

import { useEffect } from 'react'
import { onAuthStateChanged, getRedirectResult } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { useJashn } from '@/lib/jashn/store'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import type { JashnUser } from '@/lib/jashn/types'

function setAuthCookie(authed: boolean) {
  if (authed) {
    document.cookie = 'jashn_authed=1; path=/; max-age=1209600; SameSite=Lax'
  } else {
    document.cookie = 'jashn_authed=; path=/; max-age=0; SameSite=Lax'
  }
}

async function syncFirestoreUser(firebaseUser: {
  uid: string
  displayName: string | null
  email: string | null
  phoneNumber: string | null
}): Promise<JashnUser> {
  let userData: JashnUser | null = null

  if (db) {
    try {
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

export function FirebaseAuthListener() {
  const fetchUserCards = useJashn((s) => s.fetchUserCards)

  useEffect(() => {
    if (!auth) return

    let unsubscribe: (() => void) | undefined
    let isCancelled = false

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

    return () => {
      isCancelled = true
      if (unsubscribe) unsubscribe()
    }
  }, [fetchUserCards])

  return null
}
