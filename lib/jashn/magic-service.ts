import { db, getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase'
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  increment,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import type { MagicLinkData, MagicResponseData } from './magic-types'
import { markCardAsCreatedByMe } from './view-tracker'
import { getClientTracking } from './tracking'
import { syncRecordToServer } from './server-sync'

const LOCAL_STORAGE_KEY = 'cardzy_local_magic_links'

function getLocalLinks(): Record<string, MagicLinkData> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      const obj: Record<string, MagicLinkData> = {}
      parsed.forEach((item: any, idx: number) => {
        const k = item?.slug || item?.id || `magic_${idx}`
        if (item) obj[k] = { ...item, slug: k }
      })
      return obj
    }
    if (parsed && typeof parsed === 'object') {
      const obj: Record<string, MagicLinkData> = {}
      for (const [k, v] of Object.entries(parsed)) {
        if (v && typeof v === 'object') {
          const s = (v as any).slug || (v as any).id || k
          obj[s] = { ...(v as any), slug: s }
        }
      }
      return obj
    }
    return {}
  } catch {
    return {}
  }
}

function saveLocalLink(slug: string, data: MagicLinkData) {
  if (typeof window === 'undefined') return
  try {
    const links = getLocalLinks()
    links[slug] = data
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(links))
  } catch (e) {
    console.error('Failed to save to localStorage:', e)
  }
}

export type CardShareChannel = 'whatsapp' | 'sms' | 'copy' | 'qr' | 'image' | 'video' | 'app'

export function cleanForFirestore<T>(data: T): T {
  if (data === null || data === undefined) return data
  if (typeof data !== 'object') return data
  if ((data as any).constructor?.name === 'ServerTimestampFieldValueImpl' || (data as any).constructor?.name === 'Timestamp' || ('_methodName' in (data as any))) return data
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

export function generateShortSlug(_name?: string): string {
  // Generate an 8-character random string for the magic link slug to keep it fully anonymous
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let rand = ''
  for (let i = 0; i < 8; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return rand
}

/**
 * Creates and stores a new Magic Link in Firestore (with localStorage fallback)
 */
export async function createMagicLink(data: Omit<MagicLinkData, 'slug' | 'createdAt'>): Promise<string> {
  const slug = generateShortSlug(data.recipientName)
  const tracking = await getClientTracking()
  const payload: MagicLinkData = {
    ...data,
    slug,
    createdLocation: tracking.createdLocation,
    country: tracking.country,
    countryCode: tracking.countryCode,
    city: tracking.city,
    region: tracking.region,
    ip: tracking.ip,
    device: tracking.device,
    browser: tracking.browser,
    os: tracking.os,
    viewsCount: 0,
    shares: { whatsapp: 0, sms: 0, copy: 0, qr: 0, image: 0, video: 0, app: 0 },
    createdAt: Date.now(),
  }

  // Always save to localStorage as instant offline cache
  saveLocalLink(slug, payload)
  markCardAsCreatedByMe(slug)

  // Guaranteed Server Admin SDK sync to Firestore
  syncRecordToServer('sync_magic', payload)

  const activeDb = getFirebaseDb() || db
  if (isFirebaseConfigured && activeDb) {
    try {
      const docRef = doc(activeDb, 'magic_links', slug)
      // Strip any undefined properties before writing to Firestore
      const firestorePayload = cleanForFirestore({
        ...payload,
        createdAt: serverTimestamp(),
      })
      await setDoc(docRef, firestorePayload)
    } catch (err) {
      console.error('Firestore write error for magic link:', err)
    }
  }

  return slug
}

/**
 * Records a share event for any card type (magic, invite, wish, vcard) across all channels:
 * whatsapp, sms, copy link, qr code scan/download, or flyer image export.
 */
export async function recordCardShare(
  cardType: 'wish' | 'invite' | 'vcard' | 'magic',
  slug: string,
  channel: CardShareChannel
): Promise<void> {
  if (!slug) return
  const cleanSlug = String(slug).replace(/^\/?(i|w|v|m)\//, '').trim()

  const collectionName =
    cardType === 'invite'
      ? 'invitations'
      : cardType === 'wish'
      ? 'wishes'
      : cardType === 'vcard'
      ? 'visitingCards'
      : 'magic_links'

  // 1. Primary: Server API logging (authoritative increment via Firebase Admin SDK)
  let serverOk = false
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/card-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardType, slug: cleanSlug, action: 'share', channel }),
      })
      if (res.ok) serverOk = true
    } catch {}
  }

  // 2. Fallback: If server API was unreachable, update via client Firestore
  if (!serverOk) {
    const activeDb = getFirebaseDb() || db
    if (isFirebaseConfigured && activeDb) {
      try {
        const docRef = doc(activeDb, collectionName, cleanSlug)
        await updateDoc(docRef, {
          [`shares.${channel}`]: increment(1),
          lastSharedAt: Date.now(),
        }).catch(async () => {
          await setDoc(
            docRef,
            {
              shares: {
                [channel]: increment(1),
              },
              lastSharedAt: Date.now(),
            },
            { merge: true }
          )
        })
      } catch {}
    }
  }

  // 3. Notify live listeners in window
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('cardzy_shares_updated', {
        detail: { cardType, slug: cleanSlug, channel },
      })
    )
  }

  // 3. Update localStorage cache
  if (typeof window !== 'undefined') {
    if (cardType === 'magic') {
      try {
        const links = getLocalLinks()
        if (links[slug]) {
          if (!links[slug].shares) {
            links[slug].shares = { whatsapp: 0, sms: 0, copy: 0, qr: 0, image: 0, video: 0, app: 0 }
          }
          links[slug].shares[channel] = (links[slug].shares[channel] || 0) + 1
          saveLocalLink(slug, links[slug])
        }
      } catch {}
    }

    // Update zustand store in localStorage
    try {
      const storeRaw = localStorage.getItem('jashn_store_v1')
      if (storeRaw) {
        const parsed = JSON.parse(storeRaw)
        if (parsed?.state) {
          const listName =
            cardType === 'invite'
              ? 'invitations'
              : cardType === 'wish'
              ? 'wishes'
              : cardType === 'vcard'
              ? 'visitingCards'
              : null
          if (listName && Array.isArray(parsed.state[listName])) {
            parsed.state[listName] = parsed.state[listName].map((card: any) => {
              if (card.slug === slug) {
                const s = card.shares || { whatsapp: 0, sms: 0, copy: 0, qr: 0, image: 0, video: 0, app: 0 }
                return {
                  ...card,
                  shares: {
                    ...s,
                    [channel]: (s[channel] || 0) + 1,
                  },
                }
              }
              return card
            })
            localStorage.setItem('jashn_store_v1', JSON.stringify(parsed))
          }
        }
      }
    } catch {}

    try {
      const storageKey = `cardzy_shares_${cardType}_${slug}`
      const existing = JSON.parse(localStorage.getItem(storageKey) || '{}')
      existing[channel] = (existing[channel] || 0) + 1
      localStorage.setItem(storageKey, JSON.stringify(existing))
    } catch {}

    try {
      window.dispatchEvent(new CustomEvent('cardzy_shares_updated', { detail: { cardType, slug, channel } }))
    } catch {}
  }
}

/**
 * Fetches a Magic Link by its unique slug.
 * View count will ONLY increment if shouldCountView is true (i.e. receiver view, not sender preview).
 */
export async function getMagicLink(slug: string, shouldCountView: boolean = false): Promise<MagicLinkData | null> {
  const activeDb = getFirebaseDb() || db
  if (isFirebaseConfigured && activeDb) {
    try {
      const docRef = doc(activeDb, 'magic_links', slug)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const docData = { id: docSnap.id, ...(docSnap.data() as MagicLinkData) }
        // Only increment view count if viewing as receiver
        if (shouldCountView) {
          docData.viewsCount = (docData.viewsCount || 0) + 1
          saveLocalLink(slug, docData)

          // Direct Client Firestore Increment
          setDoc(
            docRef,
            { viewsCount: increment(1), lastViewedAt: Date.now() },
            { merge: true }
          ).catch(() => {})

          // Server API activity logging removed to prevent double-increment with Client SDK
        }
        return docData
      }
    } catch (err) {
      console.warn('Firestore read error, checking local storage:', err)
    }
  }

  // Fallback to localStorage
  const local = getLocalLinks()
  const found = local[slug]
  if (found) {
    if (shouldCountView) {
      found.viewsCount = (found.viewsCount || 0) + 1
      saveLocalLink(slug, found)
    }
    return found
  }
  return null
}

/**
 * Normalizes phone numbers for WhatsApp API links (replaces leading 03 with 92 for Pakistan)
 */
export function normalizeWhatsAppNumber(phone?: string): string {
  if (!phone) return ''
  let cleaned = phone.replace(/[^0-9]/g, '')
  if (cleaned.startsWith('00')) {
    cleaned = cleaned.slice(2)
  }
  if (cleaned.startsWith('03') && cleaned.length === 11) {
    cleaned = '92' + cleaned.slice(1)
  }
  return cleaned
}

/**
 * Builds direct WhatsApp redirect URL with prefilled celebration response
 */
export function getMagicWhatsAppUrl(data: MagicLinkData, responseText: string, returnUrl?: string): string {
  const raw = (data as any)?.whatsappNumber || data.wishContent?.whatsappNumber || (data.inviteContent as any)?.whatsappNumber || ''
  const phone = normalizeWhatsAppNumber(raw)
  const celebrationUrl = returnUrl || (typeof window !== 'undefined' ? `${window.location.origin}/m/${data.slug || (data as any).id}` : '')
  const message = `Hey ${data.senderName || 'there'}! ✨ ${data.recipientName} responded to your 3D Magic Celebration on Cardzy: ${responseText}\n\nView celebration: ${celebrationUrl}`
  const encoded = encodeURIComponent(message)
  return phone ? `https://wa.me/${phone}?text=${encoded}` : `https://api.whatsapp.com/send?text=${encoded}`
}

/**
 * Submits a recipient reaction (e.g. "Sent Love Back") or RSVP to Firestore
 */
export async function submitMagicResponse(response: Omit<MagicResponseData, 'timestamp'>): Promise<boolean> {
  const tracking = await getClientTracking().catch(() => ({} as any))
  const respId = response.id || `mresp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  const cleanSlug = String(response.linkId || '').replace(/^\/?m\//, '').trim()

  const fullResp: MagicResponseData = {
    ...response,
    id: respId,
    linkId: cleanSlug || response.linkId,
    createdLocation: tracking.createdLocation,
    country: tracking.country,
    countryCode: tracking.countryCode,
    city: tracking.city,
    region: tracking.region,
    ip: tracking.ip,
    device: tracking.device,
    browser: tracking.browser,
    os: tracking.os,
    createdAt: Date.now(),
    timestamp: Date.now(),
  }

  // Guaranteed Server Admin SDK sync to Firestore
  syncRecordToServer('sync_magic_response', fullResp)

  const activeDb = getFirebaseDb() || db
  if (isFirebaseConfigured && activeDb) {
    try {
      // 1. Write to magic_link_responses collection with guaranteed fixed ID
      await setDoc(doc(activeDb, 'magic_link_responses', respId), {
        ...fullResp,
        timestamp: serverTimestamp(),
      })

      // 2. Increment responsesCount on parent magic_links document
      if (cleanSlug) {
        const linkDocRef = doc(activeDb, 'magic_links', cleanSlug)
        await updateDoc(linkDocRef, {
          responsesCount: increment(1),
          lastResponseAt: Date.now(),
        }).catch(() => {})
      }

      return true
    } catch (err) {
      console.warn('Firestore response submission error:', err)
    }
  }

  return true
}

/**
 * Fetches all Magic Links created by a specific user (for Dashboard / Admin view)
 */
export async function getUserMagicLinks(userId?: string): Promise<MagicLinkData[]> {
  const links: MagicLinkData[] = []
  const activeDb = getFirebaseDb() || db

  if (isFirebaseConfigured && activeDb && userId) {
    try {
      const colRef = collection(activeDb, 'magic_links')
      const q = query(colRef, where('senderId', '==', userId))
      const querySnap = await getDocs(q)
      querySnap.forEach((d) => {
        links.push({ id: d.id, ...(d.data() as MagicLinkData) })
      })
    } catch (err) {
      console.warn('Error querying user magic links from Firestore:', err)
    }
  }

  // Sort newest first
  return links.sort((a, b) => {
    const timeA = typeof a.createdAt === 'number' ? a.createdAt : a.createdAt?.toMillis ? a.createdAt.toMillis() : 0
    const timeB = typeof b.createdAt === 'number' ? b.createdAt : b.createdAt?.toMillis ? b.createdAt.toMillis() : 0
    return timeB - timeA
  })
}

/**
 * Updates an existing Magic Link in Firestore (and localStorage cache)
 */
export async function updateMagicLink(slug: string, data: Partial<MagicLinkData>): Promise<void> {
  // Update local storage
  const local = getLocalLinks()
  if (local[slug]) {
    local[slug] = { ...local[slug], ...data }
    saveLocalLink(slug, local[slug])
  }

  // Guaranteed Server Admin SDK sync to Firestore
  syncRecordToServer('sync_magic', { slug, ...data })

  const activeDb = getFirebaseDb() || db
  if (isFirebaseConfigured && activeDb) {
    try {
      const docRef = doc(activeDb, 'magic_links', slug)
      const firestorePayload = cleanForFirestore({
        ...data,
        updatedAt: serverTimestamp(),
      })
      await setDoc(docRef, firestorePayload, { merge: true })
    } catch (err) {
      console.error('Firestore update error for magic link:', err)
    }
  }
}

