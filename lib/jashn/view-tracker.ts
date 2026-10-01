/**
 * Cardzy Jashn - Intelligent View Tracking System
 *
 * Rules:
 * 1. SENDER / CREATOR / OWNER: Never counted as a view. They create the card,
 *    preview it, copy the clean link, and share it.
 * 2. ADMIN: Never counted as a view. Admin preview mode is always zero-impact.
 * 3. RECIPIENT: Authentic recipient visits (clean public URL on another device/browser)
 *    are counted with a debounce to prevent double-counting.
 */

import { isDeviceAdmin } from './admin-presence'

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
  currentUserId?: string | null,
  currentUserEmail?: string | null
): boolean {
  if (typeof window === 'undefined') return false

  // 0. Complete Admin Device & Account Protection (Never count views for admin)
  if (isDeviceAdmin(currentUserEmail)) {
    return true
  }

  // 1. Explicit sender, preview, or host role in query parameters (Sender Control Mode)
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

  // 3. Admin Check: Admin previews and visits NEVER count as views
  try {
    if (
      localStorage.getItem('cardzy_is_admin') === '1' ||
      sessionStorage.getItem('cardzy_is_admin') === '1' ||
      sessionStorage.getItem('cardzy_admin_session')
    ) {
      return true
    }
  } catch {}

  // 4. Authenticated creator check: If current logged-in user is the creator of this card
  if (currentUserId && creatorId && currentUserId === creatorId) {
    return true
  }

  // 5. Local storage ownership check: Browser that created this card
  try {
    if (localStorage.getItem(`cardzy_owner_${slug}`) === '1') {
      return true
    }
    const rawMyCards = localStorage.getItem('cardzy_my_cards')
    if (rawMyCards) {
      const myCards: string[] = JSON.parse(rawMyCards)
      if (Array.isArray(myCards) && myCards.includes(slug)) {
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
  currentUserId?: string | null,
  currentUserEmail?: string | null
): boolean {
  if (typeof window === 'undefined' || !slug) return false

  // 1. NEVER increment if viewer is the sender, owner, creator, or admin!
  if (isSenderOrOwner(slug, creatorId, searchParams, currentUserId, currentUserEmail)) {
    return false
  }

  // 2. Direct Admin Check
  if (isDeviceAdmin(currentUserEmail)) {
    return false
  }

  // 2. Debounce by 5 seconds per browser tab to avoid double-counting on refresh
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
