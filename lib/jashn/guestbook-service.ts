import { db, getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase'
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  limit,
  orderBy,
  startAfter,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  type DocumentSnapshot,
} from 'firebase/firestore'

export interface GuestbookWish {
  id: string
  cardSlug: string
  cardType?: 'magic' | 'invite' | 'wish' | 'vcard'
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

// List of prohibited spam patterns to keep comments 100% Google AdSense family-friendly
const LINK_REGEX = /(https?:\/\/|www\.|\.com|\.net|\.org|\.io|\.xyz|\.app|\.biz|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/i

const PROFANITY_LIST = [
  'casino', 'crypto', 'viagra', 'porn', 'xxx', 'sex', 'nude', 'loan', 'whatsapp me', 'telegram',
  'fuck', 'bitch', 'asshole', 'shit', 'scam', 'hack'
]

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
 * Posts a new wish to the Card Guestbook / Wishes Wall (Directly to Firebase Firestore)
 */
export async function postGuestbookWish(params: {
  cardSlug: string
  cardType?: 'magic' | 'invite' | 'wish' | 'vcard'
  cardTitle?: string
  guestName: string
  message: string
  emoji?: string
}): Promise<GuestbookWish> {
  const validation = validateWishContent(params.guestName, params.message)
  if (!validation.valid) {
    throw new Error(validation.error || 'Invalid wish content.')
  }

  // Anti-spam flood cooldown (8 seconds per browser session)
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

  // Save directly to Firebase Firestore
  const activeDb = getFirebaseDb() || db
  if (isFirebaseConfigured && activeDb) {
    try {
      const docRef = doc(activeDb, 'guestbook_wishes', id)
      await setDoc(docRef, {
        ...wish,
        createdAt: Date.now(),
        serverTime: serverTimestamp(),
      })

      // Notify admin
      fetch('/api/push/notify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `New Guestbook Wish! ${wish.emoji}`,
          body: `${wish.guestName} left a message on "${wish.cardTitle || wish.cardSlug}"`,
          url: `/admin_portal`
        })
      }).catch(() => {});

      // Notify card creator
      fetch('/api/push/notify-creator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardSlug: wish.cardSlug,
          cardType: wish.cardType || 'magic',
          title: `New wish on your card! ${wish.emoji}`,
          body: `${wish.guestName}: "${wish.message.slice(0, 80)}${wish.message.length > 80 ? '…' : ''}"`,
          url: '/dashboard'
        })
      }).catch(() => {});

    } catch (err) {
      console.error('Firestore guestbook write error:', err)
    }
  }

  return wish
}

/**
 * Subscribes to real-time wishes for a specific card slug from Firebase Firestore
 */
export function subscribeCardWishes(
  cardSlug: string,
  onUpdate: (wishes: GuestbookWish[]) => void
): () => void {
  const activeDb = getFirebaseDb() || db
  if (!isFirebaseConfigured || !activeDb) {
    onUpdate([])
    return () => {}
  }

  try {
    const collRef = collection(activeDb, 'guestbook_wishes')
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

        firestoreWishes.sort(
          (a, b) => (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0)
        )

        onUpdate(firestoreWishes)
      },
      (err) => {
        console.warn('Guestbook snapshot notice:', err)
        onUpdate([])
      }
    )

    return unsubscribe
  } catch (err) {
    console.warn('Error setting up guestbook listener:', err)
    onUpdate([])
    return () => {}
  }
}

/**
 * ADMIN: Subscribes to the latest 5 guestbook wishes in real time from Firebase Firestore.
 * Returns an unsubscribe function AND a `loadMore` function to fetch the next 5 with a cursor.
 * This prevents loading 500 docs on every admin portal mount.
 *
 * The callback now receives a third argument — `lastDoc` — which the admin page stores so
 * `fetchMoreGuestbookWishes(lastDoc, pageSize)` can fetch the exact next page via startAfter().
 */
export function listenAllGuestbookWishes(
  onUpdate: (wishes: GuestbookWish[], hasMore: boolean, lastDoc: DocumentSnapshot | null) => void,
  pageSize: number = 5
): () => void {
  const activeDb = getFirebaseDb() || db
  if (!isFirebaseConfigured || !activeDb) {
    onUpdate([], false, null)
    return () => {}
  }

  try {
    const collRef = collection(activeDb, 'guestbook_wishes')
    const q = query(collRef, orderBy('createdAt', 'desc'), limit(pageSize + 1))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const allDocs = snapshot.docs
        // Fetch one extra to know if there are more pages
        const hasMore = allDocs.length > pageSize
        const visibleDocs = hasMore ? allDocs.slice(0, pageSize) : allDocs
        // The last visible doc is the cursor for the next page
        const lastDoc = visibleDocs.length > 0 ? visibleDocs[visibleDocs.length - 1] : null

        const wishes: GuestbookWish[] = visibleDocs.map((d) => {
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

        onUpdate(wishes, hasMore, lastDoc)
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
 * ADMIN: Fetches the next page of guestbook wishes using a Firestore cursor (startAfter).
 * Used for server-side pagination — only fetches the next 5 docs, not the entire collection.
 */
export async function fetchMoreGuestbookWishes(
  afterDoc: DocumentSnapshot,
  pageSize: number = 5
): Promise<{ wishes: GuestbookWish[]; hasMore: boolean; lastDoc: DocumentSnapshot | null }> {
  const activeDb = getFirebaseDb() || db
  if (!isFirebaseConfigured || !activeDb) {
    return { wishes: [], hasMore: false, lastDoc: null }
  }

  try {
    const collRef = collection(activeDb, 'guestbook_wishes')
    const q = query(collRef, orderBy('createdAt', 'desc'), startAfter(afterDoc), limit(pageSize + 1))
    const snapshot = await getDocs(q)

    const allDocs = snapshot.docs
    const hasMore = allDocs.length > pageSize
    const visibleDocs = hasMore ? allDocs.slice(0, pageSize) : allDocs

    const wishes: GuestbookWish[] = visibleDocs.map((d) => {
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

    return {
      wishes,
      hasMore,
      lastDoc: visibleDocs.length > 0 ? visibleDocs[visibleDocs.length - 1] : null,
    }
  } catch (err) {
    console.warn('fetchMoreGuestbookWishes error:', err)
    return { wishes: [], hasMore: false, lastDoc: null }
  }
}

/**
 * ADMIN: Deletes a single guestbook wish from Firebase Firestore
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
}

/**
 * ADMIN: Batch deletes wishes older than X days (e.g. 30 days) to keep database clean.
 * Uses a Firestore `where('createdAt', '<=', cutoffTime)` query so only matching docs
 * are read — the entire collection is never downloaded.
 */
export async function deleteOldGuestbookWishes(olderThanDays: number = 30): Promise<number> {
  const cutoffTime = Date.now() - olderThanDays * 24 * 60 * 60 * 1000
  let deletedCount = 0

  const activeDb = getFirebaseDb() || db
  if (isFirebaseConfigured && activeDb) {
    try {
      const collRef = collection(activeDb, 'guestbook_wishes')
      // Server-side filter: only fetch documents older than the cutoff date.
      // This prevents reading the entire collection just to find old entries.
      const q = query(collRef, where('createdAt', '<=', cutoffTime))
      const snapshot = await getDocs(q)

      const deletePromises: Promise<void>[] = snapshot.docs.map((docSnap) =>
        deleteDoc(docSnap.ref).then(() => {
          deletedCount++
        })
      )
      await Promise.all(deletePromises)
    } catch (err) {
      console.error('Error deleting old guestbook wishes:', err)
    }
  }

  return deletedCount
}

/**
 * ADMIN: Deletes all wishes for a specific card from Firebase Firestore
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

  return deletedCount
}
