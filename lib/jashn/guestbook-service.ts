import { db, getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase'
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore'

export interface GuestbookWish {
  id: string
  cardSlug: string
  cardType?: 'magic' | 'invite' | 'wish'
  cardTitle?: string
  guestName: string
  message: string
  emoji?: string
  createdAt: number
  ip?: string
  device?: string
  city?: string
  country?: string
}

const LOCAL_STORAGE_PREFIX = 'cardzy_guestbook_'

// List of prohibited spam patterns to keep comments 100% Google AdSense family-friendly
const LINK_REGEX = /(https?:\/\/|www\.|\.com|\.net|\.org|\.io|\.xyz|\.app|\.biz|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/i

const PROFANITY_LIST = [
  'casino', 'crypto', 'viagra', 'porn', 'xxx', 'sex', 'nude', 'loan', 'whatsapp me', 'telegram',
  'fuck', 'bitch', 'asshole', 'shit', 'scam', 'hack'
]

function getLocalWishes(slug: string): GuestbookWish[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${slug}`)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveLocalWishes(slug: string, wishes: GuestbookWish[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${slug}`, JSON.stringify(wishes.slice(0, 100)))
  } catch (e) {
    console.error('Error saving guestbook wishes locally:', e)
  }
}

/**
 * Validates message content against spam & AdSense UGC safety rules
 */
export function validateWishContent(guestName: string, message: string): { valid: boolean; error?: string } {
  const trimmedName = guestName.trim()
  const trimmedMsg = message.trim()

  if (!trimmedName || trimmedName.length < 2) {
    return { valid: false, error: 'Please enter your name (at least 2 characters).' }
  }
  if (trimmedName.length > 40) {
    return { valid: false, error: 'Name is too long (maximum 40 characters).' }
  }
  if (!trimmedMsg || trimmedMsg.length < 3) {
    return { valid: false, error: 'Please write a heartfelt wish or blessing (at least 3 characters).' }
  }
  if (trimmedMsg.length > 400) {
    return { valid: false, error: 'Wish is too long (maximum 400 characters).' }
  }

  // 1. Block external links to prevent spam and protect Google AdSense
  if (LINK_REGEX.test(trimmedMsg) || LINK_REGEX.test(trimmedName)) {
    return {
      valid: false,
      error: 'For safety and family-friendly standards, website links or URLs are not permitted.',
    }
  }

  // 2. Block prohibited abusive words
  const lowerMsg = `${trimmedName} ${trimmedMsg}`.toLowerCase()
  for (const word of PROFANITY_LIST) {
    if (lowerMsg.includes(word)) {
      return {
        valid: false,
        error: 'Please keep your wishes polite, positive, and celebratory.',
      }
    }
  }

  return { valid: true }
}

/**
 * Posts a new wish to the Card Guestbook / Wishes Wall
 */
export async function postGuestbookWish(params: {
  cardSlug: string
  cardType?: 'magic' | 'invite' | 'wish'
  cardTitle?: string
  guestName: string
  message: string
  emoji?: string
}): Promise<GuestbookWish> {
  const validation = validateWishContent(params.guestName, params.message)
  if (!validation.valid) {
    throw new Error(validation.error || 'Invalid wish content.')
  }

  // Anti-spam flood cooldown (8 seconds per browser)
  if (typeof window !== 'undefined') {
    const lastPostKey = `cardzy_guestbook_cooldown_${params.cardSlug}`
    const lastTime = Number(sessionStorage.getItem(lastPostKey) || '0')
    if (Date.now() - lastTime < 8000) {
      throw new Error('Please wait a few seconds before posting another wish.')
    }
    sessionStorage.setItem(lastPostKey, String(Date.now()))
  }

  const id = `wish_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  const wish: GuestbookWish = {
    id,
    cardSlug: params.cardSlug,
    cardType: params.cardType || 'magic',
    cardTitle: params.cardTitle || 'Celebration',
    guestName: params.guestName.trim(),
    message: params.message.trim(),
    emoji: params.emoji || '💖',
    createdAt: Date.now(),
  }

  // Save to local storage cache immediately
  const existingLocal = getLocalWishes(params.cardSlug)
  const dedupedLocal = [wish, ...existingLocal.filter((w) => w.id !== id)]
  saveLocalWishes(params.cardSlug, dedupedLocal)

  // Save to Firebase Firestore if configured
  const activeDb = getFirebaseDb() || db
  if (isFirebaseConfigured && activeDb) {
    try {
      const docRef = doc(activeDb, 'guestbook_wishes', id)
      await setDoc(docRef, {
        ...wish,
        createdAt: Date.now(),
        serverTime: serverTimestamp(),
      })
    } catch (err) {
      console.warn('Firestore guestbook write fallback to local storage:', err)
    }
  }

  return wish
}

/**
 * Subscribes to real-time wishes for a specific card slug
 * Fetches all wishes for the card and merges local and remote entries
 */
export function subscribeCardWishes(
  cardSlug: string,
  onUpdate: (wishes: GuestbookWish[]) => void
): () => void {
  // Emit local cache immediately so UI is instant
  const local = getLocalWishes(cardSlug)
  if (local.length > 0) {
    onUpdate(local)
  }

  const activeDb = getFirebaseDb() || db
  if (!isFirebaseConfigured || !activeDb) {
    onUpdate(local)
    return () => {}
  }

  try {
    const collRef = collection(activeDb, 'guestbook_wishes')
    // Query by cardSlug only (avoid composite index requirement on cardSlug + createdAt)
    const q = query(
      collRef,
      where('cardSlug', '==', cardSlug)
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const firestoreWishes: GuestbookWish[] = snapshot.docs.map((d) => {
          const data = d.data()
          let parsedTime = Date.now()
          if (typeof data.createdAt === 'number') {
            parsedTime = data.createdAt
          } else if (data.createdAt?.toMillis) {
            parsedTime = data.createdAt.toMillis()
          } else if (data.serverTime?.toMillis) {
            parsedTime = data.serverTime.toMillis()
          }

          return {
            id: d.id,
            cardSlug: data.cardSlug || cardSlug,
            cardType: data.cardType || 'magic',
            cardTitle: data.cardTitle,
            guestName: data.guestName || 'Anonymous Friend',
            message: data.message || '',
            emoji: data.emoji || '💖',
            createdAt: parsedTime,
            city: data.city,
            country: data.country,
          }
        })

        // Merge Firestore wishes and local storage wishes to ensure nothing is missed
        const currentLocal = getLocalWishes(cardSlug)
        const map = new Map<string, GuestbookWish>()
        
        firestoreWishes.forEach((w) => map.set(w.id, w))
        currentLocal.forEach((w) => {
          if (!map.has(w.id)) {
            map.set(w.id, w)
          }
        })

        const allWishes = Array.from(map.values()).sort(
          (a, b) => (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0)
        )

        if (allWishes.length > 0) {
          saveLocalWishes(cardSlug, allWishes)
          onUpdate(allWishes)
        } else {
          onUpdate([])
        }
      },
      (err) => {
        console.warn('Guestbook snapshot notice, using local cache:', err)
        onUpdate(getLocalWishes(cardSlug))
      }
    )

    return unsubscribe
  } catch (err) {
    console.warn('Error setting up guestbook listener:', err)
    onUpdate(local)
    return () => {}
  }
}

/**
 * ADMIN: Subscribes to all guestbook wishes across all cards in real time
 */
export function listenAllGuestbookWishes(
  onUpdate: (wishes: GuestbookWish[]) => void
): () => void {
  const activeDb = getFirebaseDb() || db
  if (!isFirebaseConfigured || !activeDb) {
    onUpdate([])
    return () => {}
  }

  try {
    const collRef = collection(activeDb, 'guestbook_wishes')
    const q = query(collRef, limit(500))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const wishes: GuestbookWish[] = snapshot.docs.map((d) => {
          const data = d.data()
          let parsedTime = Date.now()
          if (typeof data.createdAt === 'number') {
            parsedTime = data.createdAt
          } else if (data.createdAt?.toMillis) {
            parsedTime = data.createdAt.toMillis()
          } else if (data.serverTime?.toMillis) {
            parsedTime = data.serverTime.toMillis()
          }

          return {
            id: d.id,
            cardSlug: data.cardSlug || 'unknown',
            cardType: data.cardType || 'magic',
            cardTitle: data.cardTitle,
            guestName: data.guestName || 'Guest',
            message: data.message || '',
            emoji: data.emoji || '💖',
            createdAt: parsedTime,
            city: data.city,
            country: data.country,
          }
        })

        wishes.sort((a, b) => (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0))
        onUpdate(wishes)
      },
      (err) => {
        console.warn('Admin guestbook listener notice:', err)
      }
    )

    return unsubscribe
  } catch (err) {
    console.warn('Error setting up admin guestbook listener:', err)
    return () => {}
  }
}

/**
 * ADMIN: Deletes a single guestbook wish
 */
export async function deleteGuestbookWish(id: string, cardSlug?: string): Promise<void> {
  const activeDb = getFirebaseDb() || db
  if (isFirebaseConfigured && activeDb) {
    try {
      const docRef = doc(activeDb, 'guestbook_wishes', id)
      await deleteDoc(docRef)
    } catch (err) {
      console.error('Error deleting wish from Firestore:', err)
    }
  }

  if (cardSlug && typeof window !== 'undefined') {
    const existing = getLocalWishes(cardSlug)
    saveLocalWishes(
      cardSlug,
      existing.filter((w) => w.id !== id)
    )
  }
}

/**
 * ADMIN: Batch deletes wishes older than X days (e.g. 30 days) to keep database clean
 */
export async function deleteOldGuestbookWishes(olderThanDays: number = 30): Promise<number> {
  const cutoffTime = Date.now() - olderThanDays * 24 * 60 * 60 * 1000
  let deletedCount = 0

  const activeDb = getFirebaseDb() || db
  if (isFirebaseConfigured && activeDb) {
    try {
      const collRef = collection(activeDb, 'guestbook_wishes')
      const snapshot = await getDocs(collRef)

      const deletePromises: Promise<void>[] = []
      snapshot.docs.forEach((docSnap) => {
        const data = docSnap.data()
        const t =
          typeof data.createdAt === 'number'
            ? data.createdAt
            : data.createdAt?.toMillis?.() || (data.createdAt?.toDate ? data.createdAt.toDate().getTime() : 0)
        if (t && t <= cutoffTime) {
          deletePromises.push(
            deleteDoc(docSnap.ref).then(() => {
              deletedCount++
            })
          )
        }
      })
      await Promise.all(deletePromises)
    } catch (err) {
      console.error('Error deleting old guestbook wishes:', err)
    }
  }

  // Also clean local storage if available
  if (typeof window !== 'undefined') {
    try {
      const keysToProcess: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith(LOCAL_STORAGE_PREFIX)) {
          keysToProcess.push(key)
        }
      }
      keysToProcess.forEach((k) => {
        const raw = localStorage.getItem(k)
        if (raw) {
          try {
            const list: GuestbookWish[] = JSON.parse(raw)
            const filtered = list.filter((w) => w.createdAt > cutoffTime)
            if (filtered.length === 0) {
              localStorage.removeItem(k)
            } else {
              localStorage.setItem(k, JSON.stringify(filtered))
            }
          } catch {
            // ignore
          }
        }
      })
    } catch (e) {
      // ignore
    }
  }

  return deletedCount
}

/**
 * ADMIN: Deletes all wishes for a specific card
 */
export async function deleteCardGuestbookWishes(cardSlug: string): Promise<number> {
  let deletedCount = 0
  const activeDb = getFirebaseDb() || db
  if (isFirebaseConfigured && activeDb) {
    try {
      const collRef = collection(activeDb, 'guestbook_wishes')
      const q = query(collRef, where('cardSlug', '==', cardSlug))
      const snapshot = await getDocs(q)

      const deletePromises = snapshot.docs.map(async (docSnap) => {
        await deleteDoc(docSnap.ref)
        deletedCount++
      })
      await Promise.all(deletePromises)
    } catch (err) {
      console.error('Error clearing card guestbook wishes:', err)
    }
  }

  if (typeof window !== 'undefined') {
    localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}${cardSlug}`)
  }

  return deletedCount
}
