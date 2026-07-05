'use client'

import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
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
          name: firebaseUser.displayName || firebaseUser.phoneNumber || 'Jashn User',
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
      name: firebaseUser.displayName || firebaseUser.phoneNumber || 'Jashn User',
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

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await syncFirestoreUser(firebaseUser)
        setAuthCookie(true)
        useJashn.setState({ user: userData, isAuthLoading: false })
        fetchUserCards()
      } else {
        setAuthCookie(false)
        useJashn.setState({ user: null, isAuthLoading: false })
      }
    })

    return () => unsubscribe()
  }, [fetchUserCards])

  return null
}
