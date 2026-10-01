import type { Plan } from './types'

export interface PlanLimits {
  maxWishCards: number       // max wish cards (free: 5, pro: unlimited)
  maxInvitations: number     // max event invitations (free: 5, pro: unlimited)
  maxVisitingCards: number   // max visiting cards (free: 5, pro: unlimited)
  maxMagicLinks: number      // max magic links (free: 5, pro: unlimited)
  premiumThemes: boolean     // access to isPremium themes & animated themes
  removeWatermark: boolean   // no Cardzy branding on shared cards
  downloadImage: boolean     // PNG/image download — available for ALL plans
  photoUpload: boolean       // custom photo upload
  backgroundMusic: boolean   // audio track on cards
  unlimitedStorage: boolean  // keep cards indefinitely (no 30-day expiry)
  prioritySupport: boolean
}

export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free: {
    maxWishCards: 5,
    maxInvitations: 5,
    maxVisitingCards: 5,      // 5 free visiting cards allowed (no login required)
    maxMagicLinks: 5,
    premiumThemes: false,
    removeWatermark: false,
    downloadImage: true,      // Downloads available for ALL members
    photoUpload: true,
    backgroundMusic: true,
    unlimitedStorage: false,  // Free cards stored for 30 days, then auto-cleaned
    prioritySupport: false,
  },
  pro: {
    maxWishCards: Infinity,
    maxInvitations: Infinity,
    maxVisitingCards: Infinity,
    maxMagicLinks: Infinity,
    premiumThemes: true,
    removeWatermark: true,
    downloadImage: true,
    photoUpload: true,
    backgroundMusic: true,
    unlimitedStorage: true,
    prioritySupport: true,
  },
  business: {
    maxWishCards: Infinity,
    maxInvitations: Infinity,
    maxVisitingCards: Infinity,
    maxMagicLinks: Infinity,
    premiumThemes: true,
    removeWatermark: true,
    downloadImage: true,
    photoUpload: true,
    backgroundMusic: true,
    unlimitedStorage: true,
    prioritySupport: true,
  },
}

export function getPlanLimits(plan: Plan): PlanLimits {
  return PLAN_LIMITS[plan] ?? PLAN_LIMITS.free
}

// ── Persistent Guest Card Tracking in LocalStorage ────────────────────────────
// Allows guests (not logged in) to create up to 5 cards of each type.
// Pro users are detected only when logged into a paid account.
const GUEST_COUNTS_KEY = 'cardzy_guest_card_counts'

export function getGuestCardCount(cardType: 'wish' | 'invite' | 'vcard' | 'magic'): number {
  if (typeof window === 'undefined') return 0
  try {
    const raw = localStorage.getItem(GUEST_COUNTS_KEY)
    if (!raw) return 0
    const counts = JSON.parse(raw)
    return Number(counts[cardType] || 0)
  } catch {
    return 0
  }
}

export function recordGuestCardCreated(cardType: 'wish' | 'invite' | 'vcard' | 'magic'): void {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem(GUEST_COUNTS_KEY)
    const counts = raw ? JSON.parse(raw) : {}
    counts[cardType] = Number(counts[cardType] || 0) + 1
    localStorage.setItem(GUEST_COUNTS_KEY, JSON.stringify(counts))
  } catch {}
}

export function clearGuestCardCounts(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(GUEST_COUNTS_KEY)
  } catch {}
}

/**
 * Check if a user (logged-in or guest) can create another card.
 *
 * For guests (not logged in):
 *   - Checked against the free plan limit of 5.
 *   - Returns a friendly message prompting them to log in if they already have a Pro account,
 *     or upgrade if they want unlimited.
 */
export function canCreateCard(
  plan: Plan,
  cardType: 'wish' | 'invite' | 'vcard' | 'magic',
  currentCount: number,
  isLoggedIn: boolean = false
): { allowed: boolean; limit: number; reason?: string } {
  // Pro and business subscribers always have unlimited access
  if (plan === 'pro' || plan === 'business') {
    return { allowed: true, limit: Infinity }
  }

  const limits = getPlanLimits(plan)
  const limitMap: Record<string, number> = {
    wish: limits.maxWishCards,
    invite: limits.maxInvitations,
    vcard: limits.maxVisitingCards,
    magic: limits.maxMagicLinks,
  }
  const limit = limitMap[cardType] ?? 5

  if (currentCount >= limit) {
    const cardLabel =
      cardType === 'wish' ? 'wish cards' :
      cardType === 'invite' ? 'invitations' :
      cardType === 'vcard' ? 'visiting cards' :
      'magic links'

    if (!isLoggedIn) {
      return {
        allowed: false,
        limit,
        reason: `You've reached the free limit of ${limit} ${cardLabel}. Log in to your Pro account or upgrade to create unlimited cards.`,
      }
    }

    return {
      allowed: false,
      limit,
      reason: `Free plan allows ${limit} ${cardLabel}. Upgrade to Pro for unlimited cards.`,
    }
  }

  return { allowed: true, limit }
}

/**
 * Check if a card has expired (free cards expire after 30 days unless creator is Pro/Business)
 */
export function isCardExpired(createdAt?: number, creatorPlan?: Plan): boolean {
  if (!createdAt) return false
  if (creatorPlan === 'pro' || creatorPlan === 'business') return false
  const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000
  return Date.now() - createdAt > THIRTY_DAYS_MS
}

// ── Pricing recommendation ────────────────────────────────────────────────────
// Monthly: PKR 499/mo  (approx $1.80 USD — accessible for Pakistan)
// Annual:  PKR 3,999/yr (saves ~33% vs monthly = PKR 5,988/yr)
// USD equivalent: ~$14.99/yr annual, ~$1.99/mo monthly
export const PRICING = {
  monthly: {
    pkr: 499,
    usd: 1.99,
    durationDays: 30,
    label: 'Monthly',
    tag: null,
  },
  annual: {
    pkr: 3999,
    usd: 14.99,
    durationDays: 365,
    label: 'Annual',
    tag: 'Save 33%',
    monthlyEquivalent: { pkr: 333, usd: 1.25 },
  },
}

// Feature comparison table for pricing page
export const FREE_FEATURES = [
  { label: 'Create & share cards', included: true },
  { label: '5 wish cards', included: true },
  { label: '5 event invitations', included: true },
  { label: '5 digital visiting cards', included: true },
  { label: '5 magic surprise links', included: true },
  { label: '35+ occasions', included: true },
  { label: '18 languages', included: true },
  { label: 'Classic themes', included: true },
  { label: 'Photo upload', included: true },
  { label: 'Background music', included: true },
  { label: 'Download as image (PNG)', included: true },
  { label: 'Premium & animated themes', included: false },
  { label: 'Remove watermark', included: false },
  { label: 'Unlimited card storage', included: false },
  { label: 'Priority support', included: false },
]

export const PRO_FEATURES = [
  { label: 'Create & share cards', included: true },
  { label: 'Unlimited wish cards', included: true },
  { label: 'Unlimited event invitations', included: true },
  { label: 'Unlimited digital visiting cards', included: true },
  { label: 'Unlimited magic links', included: true },
  { label: '35+ occasions', included: true },
  { label: '18 languages', included: true },
  { label: 'Classic themes', included: true },
  { label: 'Photo upload', included: true },
  { label: 'Background music', included: true },
  { label: 'Download as image (PNG)', included: true },
  { label: 'Premium & animated themes', included: true },
  { label: 'Remove watermark', included: true },
  { label: 'Unlimited card storage', included: true },
  { label: 'Priority support', included: true },
]
