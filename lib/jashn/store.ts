'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Invitation, JashnUser, Plan, Wish, RsvpGuest } from './types'
import { db, auth, isFirebaseConfigured } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth'
import {
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  increment,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from 'firebase/firestore'

/**
 * Client-side data layer for Jashn.
 *
 * This mirrors the Firestore structure described in the spec
 * (users / wishes / invitations) but persists to localStorage so the
 * whole platform works live in preview without external credentials.
 * Swap these functions for Firebase Auth + Firestore calls to go live.
 */

function slugify(): string {
  return Math.random().toString(36).slice(2, 8)
}

function uid(): string {
  return Math.random().toString(36).slice(2, 12)
}

interface JashnState {
  user: JashnUser | null
  registeredUsers: JashnUser[]
  wishes: Wish[]
  invitations: Invitation[]
  toast: { message: string; type: 'success' | 'info' | 'error' } | null
  isMuted: boolean
  toggleMuted: () => void
  isAuthLoading: boolean

  signUp: (name: string, email: string, phone: string, password: string) => Promise<boolean>
  signIn: (email: string, password: string) => Promise<boolean>
  signInOAuth: (name: string, email: string) => Promise<void>
  signInWithGoogle: () => Promise<boolean>
  resetPassword: (email: string) => Promise<boolean>
  signOut: () => void
  upgrade: (plan: Plan) => Promise<void>
  migrateGuestCards: (userId: string) => Promise<void>
  fetchUserCards: () => Promise<void>

  createWish: (data: Omit<Wish, 'id' | 'slug' | 'creatorId' | 'viewCount' | 'createdAt'>) => Promise<Wish>
  createInvitation: (
    data: Omit<Invitation, 'id' | 'slug' | 'creatorId' | 'rsvpCount' | 'viewCount' | 'createdAt'>,
  ) => Promise<Invitation>

  getWish: (slug: string) => Wish | undefined
  getInvitation: (slug: string) => Invitation | undefined
  incrementWishView: (slug: string) => void
  incrementInvitationView: (slug: string) => void
  incrementRsvp: (slug: string) => void
  deleteWish: (slug: string) => void
  deleteInvitation: (slug: string) => void
  updateWish: (slug: string, data: Partial<Wish>) => Promise<void>
  updateInvitation: (slug: string, data: Partial<Invitation>) => Promise<void>
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void
  hideToast: () => void
  rsvps: RsvpGuest[]
  adminUpdateUserPlan: (uid: string, plan: Plan, durationDays?: number) => Promise<void>
  addRsvp: (guestData: Omit<RsvpGuest, 'id' | 'createdAt'>) => Promise<void>
  getInvitationRsvps: (invitationSlug: string) => RsvpGuest[]
  downloadAllGuestsCsv: (invitationSlug?: string) => void
  isUserPlanActive: (user?: JashnUser | null) => boolean
}

export const useJashn = create<JashnState>()(
  persist(
    (set, get) => ({
      user: null,
      registeredUsers: [],
      wishes: [],
      invitations: [],
      toast: null,
      isMuted: false,
      toggleMuted: () => set((state) => ({ isMuted: !state.isMuted })),
      isAuthLoading: true,

      showToast: (message, type = 'success') => {
        set({ toast: { message, type } })
      },
      hideToast: () => set({ toast: null }),

      signUp: async (name, email, phone, password) => {
        if (!auth) return false
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          const firebaseUser = userCredential.user
          await updateProfile(firebaseUser, { displayName: name })
          
          const newUser: JashnUser = {
            uid: firebaseUser.uid,
            name,
            email,
            phone,
            plan: 'free',
            createdAt: Date.now(),
          }

          if (db) {
            try {
              await setDoc(doc(db, 'users', firebaseUser.uid), newUser)
            } catch (e) {
              console.error('Failed to save user profile to Firestore:', e)
            }
          }

          set({ user: newUser })
          await get().fetchUserCards()
          return true
        } catch (error) {
          console.error('Sign up error:', error)
          return false
        }
      },

      signIn: async (email, password) => {
        if (!auth) return false
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password)
          const firebaseUser = userCredential.user

          let userData: JashnUser | null = null
          if (db) {
            try {
              const userSnap = await getDoc(doc(db, 'users', firebaseUser.uid))
              if (userSnap.exists()) {
                userData = userSnap.data() as JashnUser
              }
            } catch (e) {
              console.error('Failed to fetch user from Firestore:', e)
            }
          }

          if (!userData) {
            userData = {
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || 'Jashn User',
              email: firebaseUser.email || email,
              plan: 'free',
              createdAt: Date.now(),
            }
          }

          set({ user: userData })
          await get().fetchUserCards()
          return true
        } catch (error) {
          console.error('Sign in error:', error)
          return false
        }
      },

      signInWithGoogle: async () => {
        if (!auth) return false
        try {
          const provider = new GoogleAuthProvider()
          provider.setCustomParameters({ prompt: 'select_account' })

          const isMobile = typeof window !== 'undefined' && (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
            window.innerWidth < 768
          )

          if (isMobile) {
            await signInWithRedirect(auth, provider)
            return true
          }

          let firebaseUser: any = null
          try {
            const result = await signInWithPopup(auth, provider)
            firebaseUser = result.user
          } catch (popupErr: any) {
            if (
              popupErr?.code === 'auth/popup-blocked' ||
              popupErr?.code === 'auth/popup-closed-by-user' ||
              popupErr?.code === 'auth/cancelled-popup-request' ||
              isMobile
            ) {
              await signInWithRedirect(auth, provider)
              return true
            }
            throw popupErr
          }

          if (firebaseUser) {
            let userData: JashnUser | null = null
            if (db) {
              try {
                const userRef = doc(db, 'users', firebaseUser.uid)
                const userSnap = await getDoc(userRef)
                if (userSnap.exists()) {
                  userData = userSnap.data() as JashnUser
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
              } catch (e) {
                console.error('Failed to sync Google user to Firestore:', e)
              }
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

            set({ user: userData })
            await get().fetchUserCards()
            return true
          }

          return false
        } catch (error: any) {
          if (
            error?.code === 'auth/popup-closed-by-user' ||
            error?.code === 'auth/cancelled-popup-request'
          ) {
            return false
          }
          console.error('Google sign-in error:', error)
          return false
        }
      },

      resetPassword: async (email) => {
        if (!auth) return false
        try {
          await sendPasswordResetEmail(auth, email)
          return true
        } catch (error) {
          console.error('Reset password error:', error)
          return false
        }
      },

      signInOAuth: async (name, email) => {
        if (!auth) return
        const uidToUse = auth.currentUser?.uid || uid()
        let userData: JashnUser | null = null

        if (db) {
          try {
            const userRef = doc(db, 'users', uidToUse)
            const userSnap = await getDoc(userRef)
            if (userSnap.exists()) {
              userData = userSnap.data() as JashnUser
            } else {
              const newUser: JashnUser = {
                uid: uidToUse,
                name,
                email,
                plan: 'free',
                createdAt: Date.now(),
              }
              await setDoc(userRef, newUser)
              userData = newUser
            }
          } catch (e) {
            console.error('Failed to sync OAuth user to Firestore:', e)
          }
        }

        if (!userData) {
          userData = {
            uid: uidToUse,
            name,
            email,
            plan: 'free',
            createdAt: Date.now(),
          }
        }

        set({ user: userData })
        await get().fetchUserCards()
      },

      signOut: async () => {
        if (auth) {
          try {
            await firebaseSignOut(auth)
          } catch (e) {
            console.error('Sign out error:', e)
          }
        }
        set({ user: null })
      },

      upgrade: async (plan) => {
        const currentUser = get().user
        if (!currentUser) return

        const updatedUser = { ...currentUser, plan }

        if (isFirebaseConfigured && db && currentUser.uid) {
          try {
            await setDoc(doc(db, 'users', currentUser.uid), { plan }, { merge: true })
          } catch (e) {
            console.error('Failed to update user plan in Firestore:', e)
          }
        }

        set((s) => ({
          user: updatedUser,
          registeredUsers: s.registeredUsers.map((u) => (u.uid === currentUser.uid ? updatedUser : u)),
        }))
      },

      migrateGuestCards: async (userId) => {
        const guestWishes = get().wishes.filter((w) => w.creatorId === 'guest')
        const guestInvs = get().invitations.filter((i) => i.creatorId === 'guest')

        set((s) => ({
          wishes: s.wishes.map((w) => (w.creatorId === 'guest' ? { ...w, creatorId: userId } : w)),
          invitations: s.invitations.map((i) => (i.creatorId === 'guest' ? { ...i, creatorId: userId } : i)),
        }))

        if (isFirebaseConfigured && db) {
          try {
            for (const wish of guestWishes) {
              const updatedWish = { ...wish, creatorId: userId }
              await setDoc(doc(db, 'wishes', wish.slug), updatedWish)
            }
            for (const inv of guestInvs) {
              const updatedInv = { ...inv, creatorId: userId }
              await setDoc(doc(db, 'invitations', inv.slug), updatedInv)
            }
          } catch (e) {
            console.error('Failed to migrate guest cards to Firestore:', e)
          }
        }
      },

      fetchUserCards: async () => {
        let currentUser = get().user
        if (!currentUser) return

        if (!currentUser.uid) {
          const generatedUid = uid()
          currentUser = { ...currentUser, uid: generatedUid }
          set({ user: currentUser })

          if (isFirebaseConfigured && db) {
            try {
              const userKey = (currentUser.email || currentUser.uid || '').toLowerCase()
              if (userKey) {
                await setDoc(doc(db, 'users', userKey), { uid: generatedUid }, { merge: true })
              }
            } catch (e) {
              console.error('Failed to update missing user uid:', e)
            }
          }
        }

        if (isFirebaseConfigured && db) {
          try {
            const invQ = query(collection(db, 'invitations'), where('creatorId', '==', currentUser.uid))
            const invSnap = await getDocs(invQ)
            const fetchedInvs = invSnap.docs.map((doc) => doc.data() as Invitation)

            const wishQ = query(collection(db, 'wishes'), where('creatorId', '==', currentUser.uid))
            const wishSnap = await getDocs(wishQ)
            const fetchedWishes = wishSnap.docs.map((doc) => doc.data() as Wish)

            set((s) => {
              const otherInvs = s.invitations.filter((li) => li.creatorId !== currentUser.uid)
              const otherWishes = s.wishes.filter((lw) => lw.creatorId !== currentUser.uid)

              const invsMap = new Map<string, Invitation>()
              otherInvs.forEach((i) => invsMap.set(i.slug, i))
              fetchedInvs.forEach((i) => invsMap.set(i.slug, i))

              const wishesMap = new Map<string, Wish>()
              otherWishes.forEach((w) => wishesMap.set(w.slug, w))
              fetchedWishes.forEach((w) => wishesMap.set(w.slug, w))

              return {
                invitations: Array.from(invsMap.values()),
                wishes: Array.from(wishesMap.values()),
              }
            })
          } catch (e) {
            console.error('Failed to fetch user cards from Firestore:', e)
          }
        }
      },

      createWish: async (data) => {
        const wish: Wish = {
          ...data,
          id: uid(),
          slug: slugify(),
          creatorId: get().user?.uid ?? 'guest',
          viewCount: 0,
          createdAt: Date.now(),
        }

        if (isFirebaseConfigured && db) {
          try {
            await setDoc(doc(db, 'wishes', wish.slug), wish)
          } catch (err) {
            console.error('Failed to save wish to Firestore:', err)
          }
        }

        set((s) => ({ wishes: [wish, ...s.wishes] }))
        return wish
      },

      createInvitation: async (data) => {
        const inv: Invitation = {
          ...data,
          id: uid(),
          slug: slugify(),
          creatorId: get().user?.uid ?? 'guest',
          rsvpCount: 0,
          viewCount: 0,
          createdAt: Date.now(),
        }

        if (isFirebaseConfigured && db) {
          try {
            await setDoc(doc(db, 'invitations', inv.slug), inv)
          } catch (err) {
            console.error('Failed to save invitation to Firestore:', err)
          }
        }

        set((s) => ({ invitations: [inv, ...s.invitations] }))
        return inv
      },

      getWish: (slug) => get().wishes.find((w) => w.slug === slug),
      getInvitation: (slug) => get().invitations.find((i) => i.slug === slug),

      incrementWishView: (slug) => {
        set((s) => ({
          wishes: s.wishes.map((w) =>
            w.slug === slug ? { ...w, viewCount: w.viewCount + 1 } : w,
          ),
        }))

        if (isFirebaseConfigured && db) {
          updateDoc(doc(db, 'wishes', slug), {
            viewCount: increment(1),
          }).catch((err) => {
            console.error('Failed to increment wish view in Firestore:', err)
          })
        }
      },

      incrementInvitationView: (slug) => {
        set((s) => ({
          invitations: s.invitations.map((i) =>
            i.slug === slug ? { ...i, viewCount: (i.viewCount || 0) + 1 } : i,
          ),
        }))

        if (isFirebaseConfigured && db) {
          updateDoc(doc(db, 'invitations', slug), {
            viewCount: increment(1),
          }).catch((err) => {
            console.error('Failed to increment invitation view in Firestore:', err)
          })
        }
      },

      incrementRsvp: (slug) => {
        set((s) => ({
          invitations: s.invitations.map((i) =>
            i.slug === slug ? { ...i, rsvpCount: i.rsvpCount + 1 } : i,
          ),
        }))

        if (isFirebaseConfigured && db) {
          updateDoc(doc(db, 'invitations', slug), {
            rsvpCount: increment(1),
          }).catch((err) => {
            console.error('Failed to increment invitation rsvp in Firestore:', err)
          })
        }
      },

      deleteWish: (slug) => {
        set((s) => ({
          wishes: s.wishes.filter((w) => w.slug !== slug),
        }))

        if (isFirebaseConfigured && db) {
          deleteDoc(doc(db, 'wishes', slug)).catch((err) => {
            console.error('Failed to delete wish from Firestore:', err)
          })
        }
      },

      deleteInvitation: (slug: string) => {
        set((s) => ({
          invitations: s.invitations.filter((i) => i.slug !== slug),
        }))

        if (isFirebaseConfigured && db) {
          deleteDoc(doc(db, 'invitations', slug)).catch((err) => {
            console.error('Failed to delete invitation from Firestore:', err)
          })
        }
      },

      updateWish: async (slug: string, data: Partial<Wish>) => {
        set((s) => ({
          wishes: s.wishes.map((w) => (w.slug === slug ? { ...w, ...data } : w)),
        }))

        if (isFirebaseConfigured && db) {
          try {
            await setDoc(doc(db, 'wishes', slug), data, { merge: true })
          } catch (err) {
            console.error('Failed to update wish in Firestore:', err)
          }
        }
      },

      updateInvitation: async (slug: string, data: Partial<Invitation>) => {
        set((s) => ({
          invitations: s.invitations.map((i) => (i.slug === slug ? { ...i, ...data } : i)),
        }))

        if (isFirebaseConfigured && db) {
          try {
            await setDoc(doc(db, 'invitations', slug), data, { merge: true })
          } catch (err) {
            console.error('Failed to update invitation in Firestore:', err)
          }
        }
      },

      rsvps: [],

      isUserPlanActive: (userToTest) => {
        const u = userToTest || get().user
        if (!u) return false
        if (u.plan === 'free') return true
        if (!u.planExpiresAt) return true // no expiry limit set
        return Date.now() < u.planExpiresAt
      },

      adminUpdateUserPlan: async (uidToUpdate, newPlan, durationDays = 30) => {
        const now = Date.now()
        const planActivatedAt = now
        // if free, no expiry limit; if pro/business set expiry date
        const planExpiresAt = newPlan === 'free' ? undefined : now + (durationDays * 24 * 60 * 60 * 1000)

        set((s) => {
          const updatedRegistered = s.registeredUsers.map((u) => {
            if (u.uid === uidToUpdate) {
              return { ...u, plan: newPlan, planActivatedAt, planExpiresAt }
            }
            return u
          })
          const isCurrent = s.user?.uid === uidToUpdate
          const updatedUser = isCurrent
            ? { ...s.user!, plan: newPlan, planActivatedAt, planExpiresAt }
            : s.user
          return { registeredUsers: updatedRegistered, user: updatedUser }
        })

        if (isFirebaseConfigured && db) {
          try {
            await setDoc(
              doc(db, 'users', uidToUpdate),
              { plan: newPlan, planActivatedAt, planExpiresAt: planExpiresAt || null },
              { merge: true }
            )
          } catch (e) {
            console.error('Failed to update user plan in Firestore:', e)
          }
        }
      },

      addRsvp: async (guestData) => {
        const newRsvp: RsvpGuest = {
          ...guestData,
          id: uid(),
          createdAt: Date.now(),
        }
        set((s) => ({ rsvps: [newRsvp, ...(s.rsvps || [])] }))
        get().incrementRsvp(guestData.invitationSlug)

        if (isFirebaseConfigured && db) {
          try {
            await setDoc(doc(db, 'rsvps', newRsvp.id), newRsvp)
          } catch (err) {
            console.error('Failed to save RSVP to Firestore:', err)
          }
        }
      },

      getInvitationRsvps: (invitationSlug) => {
        return (get().rsvps || []).filter((r) => r.invitationSlug === invitationSlug)
      },

      downloadAllGuestsCsv: (invitationSlug) => {
        const state = get()
        let filteredRsvps = state.rsvps || []
        if (invitationSlug) {
          filteredRsvps = filteredRsvps.filter((r) => r.invitationSlug === invitationSlug)
        }

        const headers = ['Invitation Slug', 'Guest Name', 'Phone Number', 'Attending', 'Guest Count', 'Special Note', 'Date Submitted']
        const rows = filteredRsvps.map((r) => [
          `"${r.invitationSlug || ''}"`,
          `"${(r.guestName || '').replace(/"/g, '""')}"`,
          `"${(r.phone || '').replace(/"/g, '""')}"`,
          `"${r.attending || 'yes'}"`,
          r.guestCount || 1,
          `"${(r.note || '').replace(/"/g, '""')}"`,
          `"${new Date(r.createdAt || Date.now()).toLocaleString()}"`,
        ])

        const csvString = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.setAttribute('href', url)
        link.setAttribute('download', `guests_rsvp_export_${invitationSlug || 'all'}_${Date.now()}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      },
    }),
    { name: 'jashn-store' },
  ),
)
