'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Invitation, JashnUser, Plan, Wish, RsvpGuest, VisitingCard } from './types'
import { getClientTracking } from './tracking'
import { markCardAsCreatedByMe } from './view-tracker'
import { db, auth, isFirebaseConfigured, getFirebaseAuth, getFirebaseDb } from '../firebase'
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

function setAuthCookie(authed: boolean) {
  if (typeof document === 'undefined') return
  if (authed) {
    document.cookie = 'jashn_authed=1; path=/; max-age=1209600; SameSite=Lax'
  } else {
    document.cookie = 'jashn_authed=; path=/; max-age=0; SameSite=Lax'
  }
}

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

function cleanForFirestore<T>(data: T): T {
  if (data === null || data === undefined) return data
  if (typeof data !== 'object') return data
  if (Array.isArray(data)) {
    return data.map((item) => cleanForFirestore(item)) as unknown as T
  }
  const result: Record<string, any> = {}
  for (const [key, val] of Object.entries(data as Record<string, any>)) {
    if (val !== undefined) {
      result[key] = typeof val === 'object' && val !== null ? cleanForFirestore(val) : val
    }
  }
  return result as T
}

interface JashnState {
  user: JashnUser | null
  registeredUsers: JashnUser[]
  wishes: Wish[]
  invitations: Invitation[]
  visitingCards: VisitingCard[]
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
  createVisitingCard: (
    data: Omit<VisitingCard, 'id' | 'slug' | 'creatorId' | 'viewCount' | 'createdAt'>,
  ) => Promise<VisitingCard>

  getWish: (slug: string) => Wish | undefined
  getInvitation: (slug: string) => Invitation | undefined
  getVisitingCard: (slug: string) => VisitingCard | undefined
  incrementWishView: (slug: string) => void
  incrementInvitationView: (slug: string) => void
  incrementVisitingCardView: (slug: string) => void
  incrementRsvp: (slug: string) => void
  deleteWish: (slug: string) => void
  deleteInvitation: (slug: string) => void
  deleteVisitingCard: (slug: string) => void
  updateWish: (slug: string, data: Partial<Wish>) => Promise<void>
  updateInvitation: (slug: string, data: Partial<Invitation>) => Promise<void>
  updateVisitingCard: (slug: string, data: Partial<VisitingCard>) => Promise<void>
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void
  hideToast: () => void
  rsvps: RsvpGuest[]
  adminUpdateUserPlan: (uid: string, plan: Plan, durationDays?: number) => Promise<void>
  adminDeleteUser: (uid: string) => Promise<void>
  addRsvp: (guestData: Omit<RsvpGuest, 'id' | 'createdAt'>) => Promise<void>
  getInvitationRsvps: (invitationSlug: string) => RsvpGuest[]
  downloadAllGuestsCsv: (invitationSlug?: string) => void
  downloadAllGuestsPdf: (invitationSlug?: string) => void
  isUserPlanActive: (user?: JashnUser | null) => boolean
  recordCardShare: (
    cardType: 'wish' | 'invite' | 'vcard' | 'magic',
    slug: string,
    channel: 'whatsapp' | 'sms' | 'copy' | 'qr' | 'image'
  ) => Promise<void>
}

export const useJashn = create<JashnState>()(
  persist(
    (set, get) => ({
      user: null,
      registeredUsers: [],
      wishes: [],
      invitations: [],
      visitingCards: [],
      toast: null,
      isMuted: false,
      toggleMuted: () => set((state) => ({ isMuted: !state.isMuted })),
      isAuthLoading: true,

      showToast: (message, type = 'success') => {
        const toastObj = { message, type, id: Date.now() + Math.random() }
        set({ toast: toastObj as any })
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('jashn-toast', { detail: toastObj }))
        }
      },
      hideToast: () => set({ toast: null }),

      signUp: async (name, email, phone, password) => {
        const activeAuth = getFirebaseAuth() || auth
        if (!activeAuth) return false
        try {
          const userCredential = await createUserWithEmailAndPassword(activeAuth, email, password)
          const firebaseUser = userCredential.user
          await updateProfile(firebaseUser, { displayName: name })
          
          const tracking = await getClientTracking()
          const newUser: JashnUser = {
            uid: firebaseUser.uid,
            name,
            email,
            phone,
            plan: 'free',
            createdAt: Date.now(),
            createdLocation: tracking.createdLocation,
            country: tracking.country,
            countryCode: tracking.countryCode,
            city: tracking.city,
            region: tracking.region,
            ip: tracking.ip,
            device: tracking.device,
            browser: tracking.browser,
            os: tracking.os,
          }

          const activeDb = getFirebaseDb() || db
          if (activeDb) {
            try {
              await setDoc(doc(activeDb, 'users', firebaseUser.uid), cleanForFirestore(newUser))
            } catch (e: any) {
              console.warn('Firestore setDoc notice (operating offline):', e?.message || e)
            }
          }

          setAuthCookie(true)
          set((s) => {
            const existing = s.registeredUsers || []
            const idx = existing.findIndex((u) => u.uid === newUser.uid || (u.email && u.email.toLowerCase() === newUser.email?.toLowerCase()))
            const updated = idx >= 0 ? existing.map((u, i) => (i === idx ? { ...u, ...newUser } : u)) : [newUser, ...existing]
            return { user: newUser, registeredUsers: updated, isAuthLoading: false }
          })
          await get().fetchUserCards()
          return true
        } catch (error) {
          console.error('Sign up error:', error)
          return false
        }
      },

      signIn: async (email, password) => {
        const activeAuth = getFirebaseAuth() || auth
        if (!activeAuth) return false
        try {
          const userCredential = await signInWithEmailAndPassword(activeAuth, email, password)
          const firebaseUser = userCredential.user

          let userData: JashnUser | null = null
          const activeDb = getFirebaseDb() || db
          if (activeDb) {
            try {
              const fetchPromise = getDoc(doc(activeDb, 'users', firebaseUser.uid))
              const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3500))
              const userSnap = await Promise.race([fetchPromise, timeoutPromise])
              if (userSnap && 'exists' in userSnap && userSnap.exists()) {
                userData = userSnap.data() as JashnUser
              }
            } catch (e: any) {
              console.warn('Firestore getDoc notice (operating offline):', e?.message || e)
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

          setAuthCookie(true)
          set((s) => {
            const existing = s.registeredUsers || []
            const idx = existing.findIndex((u) => u.uid === userData.uid || (u.email && u.email.toLowerCase() === userData.email?.toLowerCase()))
            const updated = idx >= 0 ? existing.map((u, i) => (i === idx ? { ...u, ...userData } : u)) : [userData, ...existing]
            return { user: userData, registeredUsers: updated, isAuthLoading: false }
          })
          await get().fetchUserCards()
          return true
        } catch (error: any) {
          const errCode = error?.code || error?.message || ''
          if (
            errCode.includes('invalid-credential') ||
            errCode.includes('user-not-found') ||
            errCode.includes('wrong-password') ||
            errCode.includes('invalid-email')
          ) {
            console.warn('Sign-in notice: Invalid credentials provided.')
          } else {
            console.error('Sign in error:', error)
          }
          return false
        }
      },

      signInWithGoogle: async () => {
        const activeAuth = getFirebaseAuth() || auth
        if (!activeAuth) {
          console.error('Firebase Auth is not available')
          return false
        }

        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        provider.addScope('email')
        provider.addScope('profile')

        // ── Helper: turn a Firebase user into our JashnUser and persist it ──
        const finalizeUser = async (firebaseUser: any): Promise<boolean> => {
          let userData: JashnUser | null = null
          const activeDb = getFirebaseDb() || db
          if (activeDb) {
            try {
              const userRef = doc(activeDb, 'users', firebaseUser.uid)
              const userSnap = await getDoc(userRef)
              if (userSnap.exists()) {
                userData = userSnap.data() as JashnUser
              } else {
                const tracking = await getClientTracking()
                userData = {
                  uid: firebaseUser.uid,
                  name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Cardzy User',
                  email: firebaseUser.email || '',
                  plan: 'free',
                  createdAt: Date.now(),
                  createdLocation: tracking.createdLocation,
                  country: tracking.country,
                  countryCode: tracking.countryCode,
                  city: tracking.city,
                  region: tracking.region,
                  ip: tracking.ip,
                  device: tracking.device,
                  browser: tracking.browser,
                  os: tracking.os,
                }
                await setDoc(userRef, cleanForFirestore(userData))
              }
            } catch (e) {
              console.error('Failed to sync Google user to Firestore:', e)
            }
          }

          if (!userData) {
            const tracking = await getClientTracking()
            userData = {
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Cardzy User',
              email: firebaseUser.email || '',
              plan: 'free',
              createdAt: Date.now(),
              createdLocation: tracking.createdLocation,
              country: tracking.country,
              countryCode: tracking.countryCode,
              city: tracking.city,
              region: tracking.region,
              ip: tracking.ip,
              device: tracking.device,
              browser: tracking.browser,
              os: tracking.os,
            }
          }

          setAuthCookie(true)
          set((s) => {
            const existing = s.registeredUsers || []
            const idx = existing.findIndex((u) => u.uid === userData!.uid || (u.email && u.email.toLowerCase() === userData!.email?.toLowerCase()))
            const updated = idx >= 0 ? existing.map((u, i) => (i === idx ? { ...u, ...userData } : u)) : [userData!, ...existing]
            return { user: userData, registeredUsers: updated, isAuthLoading: false }
          })
          await get().fetchUserCards()
          return true
        }

        // ── Try popup first ──
        try {
          const result = await signInWithPopup(activeAuth, provider)
          if (result?.user) {
            return await finalizeUser(result.user)
          }
          return false
        } catch (popupErr: any) {
          const code = popupErr?.code || ''
          console.warn('[Google Sign-In] popup error:', code, popupErr?.message)

          // User deliberately closed or cancelled → don't show an error
          if (
            code === 'auth/popup-closed-by-user' ||
            code === 'auth/cancelled-popup-request'
          ) {
            return false
          }

          // Popup was blocked, COOP restricted, or encountered an internal error → fall back to redirect
          if (
            code === 'auth/popup-blocked' ||
            code === 'auth/internal-error' ||
            code === 'auth/operation-not-supported-in-this-environment'
          ) {
            console.info('[Google Sign-In] popup error (' + code + '), falling back to redirect')
            try {
              await signInWithRedirect(activeAuth, provider)
              // Page navigates away — this line never executes
              return false
            } catch (redirErr: any) {
              console.error('[Google Sign-In] redirect fallback error:', redirErr?.code, redirErr?.message)
              throw redirErr // Bubble up so the login page can show the error
            }
          }

          // Any other error (unauthorized-domain, network, etc.) — surface it
          console.error('[Google Sign-In] unexpected error:', code, popupErr?.message)
          throw popupErr
        }
      },

      resetPassword: async (email) => {
        const activeAuth = getFirebaseAuth() || auth
        if (!activeAuth) return false
        try {
          await sendPasswordResetEmail(activeAuth, email)
          return true
        } catch (error) {
          console.error('Reset password error:', error)
          return false
        }
      },

      signInOAuth: async (name, email) => {
        const activeAuth = getFirebaseAuth() || auth
        if (!activeAuth) return
        const uidToUse = activeAuth.currentUser?.uid || uid()
        let userData: JashnUser | null = null

        const activeDb = getFirebaseDb() || db
        if (activeDb) {
          try {
            const userRef = doc(activeDb, 'users', uidToUse)
            const userSnap = await getDoc(userRef)
            if (userSnap.exists()) {
              userData = userSnap.data() as JashnUser
            } else {
              const tracking = await getClientTracking()
              const newUser: JashnUser = {
                uid: uidToUse,
                name,
                email,
                plan: 'free',
                createdAt: Date.now(),
                createdLocation: tracking.createdLocation,
                country: tracking.country,
                countryCode: tracking.countryCode,
                city: tracking.city,
                region: tracking.region,
                ip: tracking.ip,
                device: tracking.device,
                browser: tracking.browser,
                os: tracking.os,
              }
              await setDoc(userRef, cleanForFirestore(newUser))
              userData = newUser
            }
          } catch (e) {
            console.error('Failed to sync OAuth user to Firestore:', e)
          }
        }

        if (!userData) {
          const tracking = await getClientTracking()
          userData = {
            uid: uidToUse,
            name,
            email,
            plan: 'free',
            createdAt: Date.now(),
            createdLocation: tracking.createdLocation,
            country: tracking.country,
            countryCode: tracking.countryCode,
            city: tracking.city,
            region: tracking.region,
            ip: tracking.ip,
            device: tracking.device,
            browser: tracking.browser,
            os: tracking.os,
          }
        }

        set((s) => {
          const existing = s.registeredUsers || []
          const idx = existing.findIndex((u) => u.uid === userData.uid || (u.email && u.email.toLowerCase() === userData.email?.toLowerCase()))
          const updated = idx >= 0 ? existing.map((u, i) => (i === idx ? { ...u, ...userData } : u)) : [userData, ...existing]
          return { user: userData, registeredUsers: updated }
        })
        await get().fetchUserCards()
      },

      signOut: async () => {
        const activeAuth = getFirebaseAuth() || auth
        if (activeAuth) {
          try {
            await firebaseSignOut(activeAuth)
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

        const activeDb = getFirebaseDb() || db
        if (isFirebaseConfigured && activeDb && currentUser.uid) {
          try {
            await setDoc(doc(activeDb, 'users', currentUser.uid), { plan }, { merge: true })
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

        const activeDb = getFirebaseDb() || db
        if (isFirebaseConfigured && activeDb) {
          try {
            for (const wish of guestWishes) {
              const updatedWish = { ...wish, creatorId: userId }
              await setDoc(doc(activeDb, 'wishes', wish.slug), cleanForFirestore(updatedWish))
            }
            for (const inv of guestInvs) {
              const updatedInv = { ...inv, creatorId: userId }
              await setDoc(doc(activeDb, 'invitations', inv.slug), cleanForFirestore(updatedInv))
            }
          } catch (e) {
            console.error('Failed to migrate guest cards to Firestore:', e)
          }
        }
      },

      fetchUserCards: async () => {
        let currentUser = get().user
        if (!currentUser) return

        const activeDb = getFirebaseDb() || db
        if (!currentUser.uid) {
          const generatedUid = uid()
          currentUser = { ...currentUser, uid: generatedUid }
          set({ user: currentUser })

          if (isFirebaseConfigured && activeDb) {
            try {
              const userKey = (currentUser.email || currentUser.uid || '').toLowerCase()
              if (userKey) {
                await setDoc(doc(activeDb, 'users', userKey), cleanForFirestore({ uid: generatedUid }), { merge: true })
              }
            } catch (e) {
              console.error('Failed to update missing user uid:', e)
            }
          }
        }

        if (isFirebaseConfigured && activeDb) {
          try {
            const invQ = query(collection(activeDb, 'invitations'), where('creatorId', '==', currentUser.uid))
            const invSnap = await getDocs(invQ)
            const fetchedInvs = invSnap.docs.map((doc) => {
              const d = doc.data() as Invitation
              if (!d.typeId || (d.typeId === 'iftaar' && (d.groom || d.bride))) {
                d.typeId = 'nikkah'
              }
              return d
            })

            const wishQ = query(collection(activeDb, 'wishes'), where('creatorId', '==', currentUser.uid))
            const wishSnap = await getDocs(wishQ)
            const fetchedWishes = wishSnap.docs.map((doc) => doc.data() as Wish)

            const vcQ = query(collection(activeDb, 'visitingCards'), where('creatorId', '==', currentUser.uid))
            const vcSnap = await getDocs(vcQ)
            const fetchedVcs = vcSnap.docs.map((doc) => doc.data() as VisitingCard)

            set((s) => {
              const otherInvs = s.invitations.filter((li) => li.creatorId !== currentUser.uid)
              const otherWishes = s.wishes.filter((lw) => lw.creatorId !== currentUser.uid)
              const otherVcs = (s.visitingCards || []).filter((lvc) => lvc.creatorId !== currentUser.uid)

              const invsMap = new Map<string, Invitation>()
              otherInvs.forEach((i) => invsMap.set(i.slug, i))
              fetchedInvs.forEach((i) => invsMap.set(i.slug, i))

              const wishesMap = new Map<string, Wish>()
              otherWishes.forEach((w) => wishesMap.set(w.slug, w))
              fetchedWishes.forEach((w) => wishesMap.set(w.slug, w))

              const vcsMap = new Map<string, VisitingCard>()
              otherVcs.forEach((vc) => vcsMap.set(vc.slug, vc))
              fetchedVcs.forEach((vc) => vcsMap.set(vc.slug, vc))

              return {
                invitations: Array.from(invsMap.values()),
                wishes: Array.from(wishesMap.values()),
                visitingCards: Array.from(vcsMap.values()),
              }
            })
          } catch (e) {
            console.error('Failed to fetch user cards from Firestore:', e)
          }
        }
      },

      createWish: async (data) => {
        const tracking = await getClientTracking()
        const wish: Wish = {
          ...data,
          id: uid(),
          slug: slugify(),
          creatorId: get().user?.uid ?? 'guest',
          viewCount: 0,
          shares: { whatsapp: 0, sms: 0, copy: 0, qr: 0, image: 0 },
          createdAt: Date.now(),
          createdLocation: tracking.createdLocation,
          country: tracking.country,
          countryCode: tracking.countryCode,
          city: tracking.city,
          region: tracking.region,
          ip: tracking.ip,
          device: tracking.device,
          browser: tracking.browser,
          os: tracking.os,
        }

        const activeDb = getFirebaseDb() || db
        if (isFirebaseConfigured && activeDb) {
          try {
            await setDoc(doc(activeDb, 'wishes', wish.slug), cleanForFirestore(wish))
          } catch (err) {
            console.error('Failed to save wish to Firestore:', err)
          }
        }

        markCardAsCreatedByMe(wish.slug)
        set((s) => ({ wishes: [wish, ...s.wishes] }))
        return wish
      },

      createInvitation: async (data) => {
        const tracking = await getClientTracking()
        const inv: Invitation = {
          ...data,
          id: uid(),
          slug: slugify(),
          creatorId: get().user?.uid ?? 'guest',
          rsvpCount: 0,
          viewCount: 0,
          shares: { whatsapp: 0, sms: 0, copy: 0, qr: 0, image: 0 },
          createdAt: Date.now(),
          createdLocation: tracking.createdLocation,
          country: tracking.country,
          countryCode: tracking.countryCode,
          cityOrigin: tracking.city,
          region: tracking.region,
          ip: tracking.ip,
          device: tracking.device,
          browser: tracking.browser,
          os: tracking.os,
        }

        const activeDb = getFirebaseDb() || db
        if (isFirebaseConfigured && activeDb) {
          try {
            await setDoc(doc(activeDb, 'invitations', inv.slug), cleanForFirestore(inv))
          } catch (err) {
            console.error('Failed to save invitation to Firestore:', err)
          }
        }

        markCardAsCreatedByMe(inv.slug)
        set((s) => ({ invitations: [inv, ...s.invitations] }))
        return inv
      },

      createVisitingCard: async (data) => {
        const tracking = await getClientTracking()
        const vc: VisitingCard = {
          ...data,
          id: uid(),
          slug: slugify(),
          creatorId: get().user?.uid ?? 'guest',
          viewCount: 0,
          shares: { whatsapp: 0, sms: 0, copy: 0, qr: 0, image: 0 },
          createdAt: Date.now(),
          createdLocation: tracking.createdLocation,
          country: tracking.country,
          countryCode: tracking.countryCode,
          city: tracking.city,
          region: tracking.region,
          ip: tracking.ip,
          device: tracking.device,
          browser: tracking.browser,
          os: tracking.os,
        }

        const activeDb = getFirebaseDb() || db
        if (isFirebaseConfigured && activeDb) {
          try {
            await setDoc(doc(activeDb, 'visitingCards', vc.slug), cleanForFirestore(vc))
          } catch (err) {
            console.error('Failed to save visiting card to Firestore:', err)
          }
        }

        markCardAsCreatedByMe(vc.slug)
        set((s) => ({ visitingCards: [vc, ...s.visitingCards] }))
        return vc
      },

      getWish: (slug) => get().wishes.find((w) => w.slug === slug),
      getInvitation: (slug) => get().invitations.find((i) => i.slug === slug),
      getVisitingCard: (slug) => get().visitingCards.find((v) => v.slug === slug),

      incrementWishView: (slug) => {
        set((s) => ({
          wishes: s.wishes.map((w) =>
            w.slug === slug ? { ...w, viewCount: (w.viewCount || 0) + 1 } : w,
          ),
        }))

        // Sync to localStorage
        try {
          const raw = localStorage.getItem('jashn_store_v1')
          if (raw) {
            const parsed = JSON.parse(raw)
            if (parsed?.state?.wishes) {
              parsed.state.wishes = parsed.state.wishes.map((w: any) =>
                w.slug === slug ? { ...w, viewCount: (w.viewCount || 0) + 1 } : w
              )
              localStorage.setItem('jashn_store_v1', JSON.stringify(parsed))
            }
          }
        } catch {}

        // Primary: Server API increment (guaranteed single Firebase Admin execution)
        if (typeof window !== 'undefined') {
          fetch('/api/card-activity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cardType: 'wish', slug, action: 'view' }),
          })
            .then((res) => {
              if (!res.ok) {
                // Fallback: Client Firestore only if server API was unreachable
                const activeDb = getFirebaseDb() || db
                if (isFirebaseConfigured && activeDb) {
                  setDoc(
                    doc(activeDb, 'wishes', slug),
                    { viewCount: increment(1), lastViewedAt: Date.now() },
                    { merge: true }
                  ).catch((err) => {
                    console.error('Failed to increment wish view in Firestore:', err)
                  })
                }
              }
            })
            .catch(() => {
              // Fallback: Client Firestore on network failure
              const activeDb = getFirebaseDb() || db
              if (isFirebaseConfigured && activeDb) {
                setDoc(
                  doc(activeDb, 'wishes', slug),
                  { viewCount: increment(1), lastViewedAt: Date.now() },
                  { merge: true }
                ).catch((err) => {
                  console.error('Failed to increment wish view in Firestore:', err)
                })
              }
            })
        }
      },

      incrementInvitationView: (slug) => {
        set((s) => ({
          invitations: s.invitations.map((i) =>
            i.slug === slug ? { ...i, viewCount: (i.viewCount || 0) + 1 } : i,
          ),
        }))

        // Sync to localStorage
        try {
          const raw = localStorage.getItem('jashn_store_v1')
          if (raw) {
            const parsed = JSON.parse(raw)
            if (parsed?.state?.invitations) {
              parsed.state.invitations = parsed.state.invitations.map((i: any) =>
                i.slug === slug ? { ...i, viewCount: (i.viewCount || 0) + 1 } : i
              )
              localStorage.setItem('jashn_store_v1', JSON.stringify(parsed))
            }
          }
        } catch {}

        // Primary: Server API increment (guaranteed single Firebase Admin execution)
        if (typeof window !== 'undefined') {
          fetch('/api/card-activity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cardType: 'invite', slug, action: 'view' }),
          })
            .then((res) => {
              if (!res.ok) {
                // Fallback: Client Firestore only if server API was unreachable
                const activeDb = getFirebaseDb() || db
                if (isFirebaseConfigured && activeDb) {
                  setDoc(
                    doc(activeDb, 'invitations', slug),
                    { viewCount: increment(1), lastViewedAt: Date.now() },
                    { merge: true }
                  ).catch((err) => {
                    console.error('Failed to increment invitation view in Firestore:', err)
                  })
                }
              }
            })
            .catch(() => {
              // Fallback: Client Firestore on network failure
              const activeDb = getFirebaseDb() || db
              if (isFirebaseConfigured && activeDb) {
                setDoc(
                  doc(activeDb, 'invitations', slug),
                  { viewCount: increment(1), lastViewedAt: Date.now() },
                  { merge: true }
                ).catch((err) => {
                  console.error('Failed to increment invitation view in Firestore:', err)
                })
              }
            })
        }
      },

      incrementVisitingCardView: (slug) => {
        set((s) => ({
          visitingCards: s.visitingCards.map((v) =>
            v.slug === slug ? { ...v, viewCount: (v.viewCount || 0) + 1 } : v,
          ),
        }))

        // Sync to localStorage
        try {
          const raw = localStorage.getItem('jashn_store_v1')
          if (raw) {
            const parsed = JSON.parse(raw)
            if (parsed?.state?.visitingCards) {
              parsed.state.visitingCards = parsed.state.visitingCards.map((v: any) =>
                v.slug === slug ? { ...v, viewCount: (v.viewCount || 0) + 1 } : v
              )
              localStorage.setItem('jashn_store_v1', JSON.stringify(parsed))
            }
          }
        } catch {}

        // Primary: Server API increment (guaranteed single Firebase Admin execution)
        if (typeof window !== 'undefined') {
          fetch('/api/card-activity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cardType: 'vcard', slug, action: 'view' }),
          })
            .then((res) => {
              if (!res.ok) {
                // Fallback: Client Firestore only if server API was unreachable
                const activeDb = getFirebaseDb() || db
                if (isFirebaseConfigured && activeDb) {
                  setDoc(
                    doc(activeDb, 'visitingCards', slug),
                    { viewCount: increment(1), lastViewedAt: Date.now() },
                    { merge: true }
                  ).catch((err) => {
                    console.error('Failed to increment visiting card view in Firestore:', err)
                  })
                }
              }
            })
            .catch(() => {
              // Fallback: Client Firestore on network failure
              const activeDb = getFirebaseDb() || db
              if (isFirebaseConfigured && activeDb) {
                setDoc(
                  doc(activeDb, 'visitingCards', slug),
                  { viewCount: increment(1), lastViewedAt: Date.now() },
                  { merge: true }
                ).catch((err) => {
                  console.error('Failed to increment visiting card view in Firestore:', err)
                })
              }
            })
        }
      },

      incrementRsvp: (slug) => {
        set((s) => ({
          invitations: s.invitations.map((i) =>
            i.slug === slug ? { ...i, rsvpCount: i.rsvpCount + 1 } : i,
          ),
        }))

        const activeDb = getFirebaseDb() || db
        if (isFirebaseConfigured && activeDb) {
          updateDoc(doc(activeDb, 'invitations', slug), {
            rsvpCount: increment(1),
          }).catch((err) => {
            console.error('Failed to increment invitation rsvp in Firestore:', err)
          })
        }
      },

      recordCardShare: async (cardType, slug, channel) => {
        set((s) => {
          if (cardType === 'wish') {
            return {
              wishes: s.wishes.map((w) => {
                if (w.slug === slug) {
                  const shares = { ...(w.shares || { whatsapp: 0, sms: 0, copy: 0, qr: 0, image: 0 }) }
                  shares[channel] = (shares[channel] || 0) + 1
                  return { ...w, shares }
                }
                return w
              }),
            }
          }
          if (cardType === 'invite') {
            return {
              invitations: s.invitations.map((i) => {
                if (i.slug === slug) {
                  const shares = { ...(i.shares || { whatsapp: 0, sms: 0, copy: 0, qr: 0, image: 0 }) }
                  shares[channel] = (shares[channel] || 0) + 1
                  return { ...i, shares }
                }
                return i
              }),
            }
          }
          if (cardType === 'vcard') {
            return {
              visitingCards: s.visitingCards.map((v) => {
                if (v.slug === slug) {
                  const shares = { ...(v.shares || { whatsapp: 0, sms: 0, copy: 0, qr: 0, image: 0 }) }
                  shares[channel] = (shares[channel] || 0) + 1
                  return { ...v, shares }
                }
                return v
              }),
            }
          }
          return {}
        })

        const { recordCardShare: recordExternalShare } = await import('./magic-service')
        await recordExternalShare(cardType, slug, channel)
      },

      deleteWish: (slug) => {
        set((s) => ({
          wishes: s.wishes.filter((w) => w.slug !== slug),
        }))

        const activeDb = getFirebaseDb() || db
        if (isFirebaseConfigured && activeDb) {
          deleteDoc(doc(activeDb, 'wishes', slug)).catch((err) => {
            console.error('Failed to delete wish from Firestore:', err)
          })
        }
      },

      deleteInvitation: (slug: string) => {
        set((s) => ({
          invitations: s.invitations.filter((i) => i.slug !== slug),
        }))

        const activeDb = getFirebaseDb() || db
        if (isFirebaseConfigured && activeDb) {
          deleteDoc(doc(activeDb, 'invitations', slug)).catch((err) => {
            console.error('Failed to delete invitation from Firestore:', err)
          })
        }
      },

      deleteVisitingCard: (slug: string) => {
        set((s) => ({
          visitingCards: s.visitingCards.filter((v) => v.slug !== slug),
        }))

        const activeDb = getFirebaseDb() || db
        if (isFirebaseConfigured && activeDb) {
          deleteDoc(doc(activeDb, 'visitingCards', slug)).catch((err) => {
            console.error('Failed to delete visiting card from Firestore:', err)
          })
        }
      },

      updateWish: async (slug: string, data: Partial<Wish>) => {
        set((s) => ({
          wishes: s.wishes.map((w) => (w.slug === slug ? { ...w, ...data } : w)),
        }))

        const activeDb = getFirebaseDb() || db
        if (isFirebaseConfigured && activeDb) {
          try {
            await setDoc(doc(activeDb, 'wishes', slug), cleanForFirestore(data), { merge: true })
          } catch (err) {
            console.error('Failed to update wish in Firestore:', err)
          }
        }
      },

      updateInvitation: async (slug: string, data: Partial<Invitation>) => {
        set((s) => ({
          invitations: s.invitations.map((i) => (i.slug === slug ? { ...i, ...data } : i)),
        }))

        const activeDb = getFirebaseDb() || db
        if (isFirebaseConfigured && activeDb) {
          try {
            await setDoc(doc(activeDb, 'invitations', slug), cleanForFirestore(data), { merge: true })
          } catch (err) {
            console.error('Failed to update invitation in Firestore:', err)
          }
        }
      },

      updateVisitingCard: async (slug: string, data: Partial<VisitingCard>) => {
        set((s) => ({
          visitingCards: s.visitingCards.map((v) => (v.slug === slug ? { ...v, ...data } : v)),
        }))

        const activeDb = getFirebaseDb() || db
        if (isFirebaseConfigured && activeDb) {
          try {
            await setDoc(doc(activeDb, 'visitingCards', slug), cleanForFirestore(data), { merge: true })
          } catch (err) {
            console.error('Failed to update visiting card in Firestore:', err)
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

        const activeDb = getFirebaseDb() || db
        if (isFirebaseConfigured && activeDb) {
          try {
            await setDoc(
              doc(activeDb, 'users', uidToUpdate),
              cleanForFirestore({ plan: newPlan, planActivatedAt, planExpiresAt: planExpiresAt || null }),
              { merge: true }
            )
          } catch (e) {
            console.error('Failed to update user plan in Firestore:', e)
          }
        }
      },

      adminDeleteUser: async (uidToDelete) => {
        // 1. Remove from Zustand state immediately (optimistic update)
        set((s) => ({
          registeredUsers: s.registeredUsers.filter((u) => u.uid !== uidToDelete),
          // If the deleted user is somehow the current session user, sign them out too
          user: s.user?.uid === uidToDelete ? null : s.user,
        }))

        // 2. Delete from Firestore: user doc + all their cards/wishes/invitations
        const activeDb = getFirebaseDb() || db
        if (activeDb) {
          try {
            // Delete user document
            await deleteDoc(doc(activeDb, 'users', uidToDelete))
          } catch (e) {
            console.error('Failed to delete user doc from Firestore:', e)
          }

          // Delete all invitations belonging to this user
          try {
            const { query, where, getDocs: getDocsQ, collection: col } = await import('firebase/firestore')
            const invSnap = await getDocsQ(query(col(activeDb, 'invitations'), where('creatorId', '==', uidToDelete)))
            const invDeletes = invSnap.docs.map((d) => deleteDoc(d.ref))
            await Promise.all(invDeletes)
          } catch (e) {
            console.error('Failed to delete user invitations from Firestore:', e)
          }

          // Delete all wishes belonging to this user
          try {
            const { query, where, getDocs: getDocsQ, collection: col } = await import('firebase/firestore')
            const wishSnap = await getDocsQ(query(col(activeDb, 'wishes'), where('creatorId', '==', uidToDelete)))
            const wishDeletes = wishSnap.docs.map((d) => deleteDoc(d.ref))
            await Promise.all(wishDeletes)
          } catch (e) {
            console.error('Failed to delete user wishes from Firestore:', e)
          }

          // Delete all visiting cards belonging to this user
          try {
            const { query, where, getDocs: getDocsQ, collection: col } = await import('firebase/firestore')
            const vcSnap = await getDocsQ(query(col(activeDb, 'visitingCards'), where('creatorId', '==', uidToDelete)))
            const vcDeletes = vcSnap.docs.map((d) => deleteDoc(d.ref))
            await Promise.all(vcDeletes)
          } catch (e) {
            console.error('Failed to delete user visiting cards from Firestore:', e)
          }
        }

        // 3. Also clean up from local Zustand lists (invitations/wishes/visitingCards)
        set((s) => ({
          invitations: s.invitations.filter((i) => i.creatorId !== uidToDelete),
          wishes: s.wishes.filter((w) => w.creatorId !== uidToDelete),
          visitingCards: s.visitingCards.filter((vc) => vc.creatorId !== uidToDelete),
        }))
      },

      addRsvp: async (guestData) => {
        const tracking = await getClientTracking()
        const newRsvp: RsvpGuest = {
          ...guestData,
          id: uid(),
          createdAt: Date.now(),
          createdLocation: tracking.createdLocation,
          country: tracking.country,
          countryCode: tracking.countryCode,
          city: tracking.city,
          ip: tracking.ip,
          device: tracking.device,
          browser: tracking.browser,
        }
        set((s) => ({ rsvps: [newRsvp, ...(s.rsvps || [])] }))
        get().incrementRsvp(guestData.invitationSlug)

        const activeDb = getFirebaseDb() || db
        if (isFirebaseConfigured && activeDb) {
          try {
            await setDoc(doc(activeDb, 'rsvps', newRsvp.id), cleanForFirestore(newRsvp))
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

      downloadAllGuestsPdf: (invitationSlug) => {
        const state = get()

        let filteredRsvps = state.rsvps || []
        if (invitationSlug) {
          filteredRsvps = filteredRsvps.filter((r) => r.invitationSlug === invitationSlug)
        }

        const printWindow = window.open('', '_blank')
        if (!printWindow) return

        const rowsHtml = filteredRsvps.length === 0
          ? `<tr><td colspan="7" style="text-align:center; padding: 25px; color: #64748b;">No guest RSVPs recorded yet.</td></tr>`
          : filteredRsvps.map((r, idx) => `
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px 12px;">${idx + 1}</td>
                <td style="padding: 10px 12px; font-weight: 700; color: #0f172a;">${r.guestName || 'Anonymous'}</td>
                <td style="padding: 10px 12px;">${r.phone || 'N/A'}</td>
                <td style="padding: 10px 12px;"><span style="display:inline-block; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 700; background: #dcfce7; color: #15803d;">${r.attending || 'Yes'}</span></td>
                <td style="padding: 10px 12px; font-weight: 600;">${r.guestCount || 1}</td>
                <td style="padding: 10px 12px; color: #475569;">${r.note || '—'}</td>
                <td style="padding: 10px 12px; color: #64748b; font-size: 11px;">${new Date(r.createdAt || Date.now()).toLocaleString()}</td>
              </tr>
            `).join('')

        const html = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>Cardzy — Official Guest RSVP Report</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 35px; color: #1e293b; background: #fff; }
                .header { border-bottom: 3px solid #7A1E2B; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: flex-end; }
                .brand { font-size: 26px; font-weight: 900; color: #7A1E2B; tracking-tight; }
                .meta { font-size: 12px; color: #64748b; text-align: right; }
                .summary { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 15px; margin-bottom: 25px; display: flex; gap: 30px; font-size: 13px; }
                .summary-item strong { color: #7A1E2B; font-size: 16px; display: block; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
                th { background-color: #7A1E2B; color: #ffffff; font-weight: 700; text-align: left; padding: 10px 12px; text-transform: uppercase; font-size: 11px; tracking-wider; }
                tr:nth-child(even) { background-color: #f8fafc; }
                .footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #94a3b8; }
                @media print {
                  body { padding: 0; }
                  @page { margin: 1.5cm; }
                }
              </style>
            </head>
            <body>
              <div class="header">
                <div>
                  <div class="brand">Cardzy.online</div>
                  <div style="font-size: 14px; font-weight: 700; color: #334155; margin-top: 4px;">Official Guest RSVP & Attendee Report</div>
                </div>
                <div class="meta">
                  <div><strong>Generated:</strong> ${new Date().toLocaleString()}</div>
                  <div><strong>Scope:</strong> ${invitationSlug ? `Invitation ${invitationSlug}` : 'All Events & Cards'}</div>
                </div>
              </div>

              <div class="summary">
                <div class="summary-item">Total RSVPs Recorded: <strong>${filteredRsvps.length} Guests</strong></div>
                <div class="summary-item">Report Status: <strong>Verified Admin PDF Export</strong></div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Guest Name</th>
                    <th>Phone / Contact</th>
                    <th>RSVP Status</th>
                    <th>Guests</th>
                    <th>Special Notes</th>
                    <th>Submission Date</th>
                  </tr>
                </thead>
                <tbody>
                  ${rowsHtml}
                </tbody>
              </table>

              <div class="footer">
                Cardzy.online • Digital Wishes & Event Invitations Portal
              </div>

              <script>
                window.onload = function() {
                  setTimeout(function() {
                    window.print();
                  }, 400);
                }
              </script>
            </body>
          </html>
        `

        printWindow.document.write(html)
        printWindow.document.close()
      },
    }),
    {
      name: 'jashn-store',
      partialize: (state) => {
        const { toast, ...rest } = state
        return rest
      },
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isAuthLoading = false
          state.toast = null
        }
      },
    },
  ),
)
