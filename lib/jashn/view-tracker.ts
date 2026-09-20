/**
 * Cardzy Jashn - Intelligent View Tracking System
 * - Sender mode (?mode=sender, ?preview=true, ?role=sender): Never increment view count.
 * - Receiver view (clean public URL): Increments view count with a 5-second debounce
 *   to ensure authentic recipient visits always count reliably.
 */

export function markCardAsCreatedByMe(slug: string) {
  if (typeof window === 'undefined' || !slug) return
  try {
    const raw = localStorage.getItem('cardzy_my_cards') || '[]'
    const list: string[] = JSON.parse(raw)
    if (!list.includes(slug)) {
      list.push(slug)
      localStorage.setItem('cardzy_my_cards', JSON.stringify(list))
    }
    localStorage.setItem(`cardzy_owner_${slug}`, '1')
  } catch {}
}

export function isSenderOrOwner(
  slug: string,
  creatorId?: string | null,
  searchParams?: { get: (key: string) => string | null } | null,
  currentUserId?: string | null
): boolean {
  if (typeof window === 'undefined') return false

  // 1. Explicit sender, preview, or host role in query parameters
  if (searchParams) {
    const mode = searchParams.get('mode')
    const preview = searchParams.get('preview')
    const role = searchParams.get('role')
    if (
      mode === 'sender' ||
      mode === 'preview' ||
      preview === 'true' ||
      role === 'sender' ||
      role === 'owner'
    ) {
      return true
    }
  }

  // 2. Direct check on window.location.search if searchParams hook didn't capture it
  try {
    const params = new URLSearchParams(window.location.search)
    const mode = params.get('mode')
    const preview = params.get('preview')
    const role = params.get('role')
    if (
      mode === 'sender' ||
      mode === 'preview' ||
      preview === 'true' ||
      role === 'sender' ||
      role === 'owner'
    ) {
      return true
    }
  } catch {}

  // 3. Current authenticated user matches card creator
  if (creatorId && currentUserId && creatorId === currentUserId) {
    return true
  }

  // 4. LocalStorage owner flag: cards created on this device / browser
  try {
    if (slug) {
      if (localStorage.getItem(`cardzy_owner_${slug}`) === '1') {
        return true
      }
      const raw = localStorage.getItem('cardzy_my_cards') || '[]'
      const list: string[] = JSON.parse(raw)
      if (list.includes(slug)) {
        return true
      }
    }
  } catch {}

  return false
}

export function shouldIncrementView(
  slug: string,
  cardType: 'wish' | 'invite' | 'vcard' | 'magic',
  creatorId?: string | null,
  searchParams?: { get: (key: string) => string | null } | null,
  currentUserId?: string | null
): boolean {
  if (typeof window === 'undefined' || !slug) return false

  // 1. NEVER increment if explicitly on the sender control screen / preview mode
  if (isSenderOrOwner(slug, creatorId, searchParams, currentUserId)) {
    return false
  }

  // 2. Debounce by 5 seconds per browser tab to avoid React StrictMode double-fire
  try {
    const sessionKey = `cardzy_last_view_${cardType}_${slug}`
    const lastViewed = Number(sessionStorage.getItem(sessionKey) || '0')
    const now = Date.now()
    if (now - lastViewed < 5000) {
      return false
    }
    sessionStorage.setItem(sessionKey, String(now))
    return true
  } catch {
    return true
  }
}
