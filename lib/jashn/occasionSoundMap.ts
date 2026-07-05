/**
 * occasionSoundMap.ts
 *
 * Maps every Jashn occasion ID and invitation type ID to a sound file
 * served from /public/sounds/. Returns null for occasions that should
 * play no sound (e.g. condolence).
 */

// ---------------------------------------------------------------------------
// Occasion sound map
// ---------------------------------------------------------------------------
// Covers all IDs defined in lib/jashn/occasions.ts + lib/jashn/invitations.ts

export const OCCASION_SOUND_MAP: Record<string, string | null> = {
  // ── Celebratory / Achievements → birthday-dholki ──────────────────────────
  birthday: '/sounds/birthday-dholki.mp3',
  'new-baby': '/sounds/birthday-dholki.mp3',
  'new-year': '/sounds/birthday-dholki.mp3',
  graduation: '/sounds/birthday-dholki.mp3',
  'new-job': '/sounds/birthday-dholki.mp3',
  promotion: '/sounds/birthday-dholki.mp3',
  'exam-pass': '/sounds/birthday-dholki.mp3',
  'business-launch': '/sounds/birthday-dholki.mp3',
  congratulations: '/sounds/birthday-dholki.mp3',

  // ── Wedding / Nikah / Anniversary / New-home → wedding-shehnai ────────────
  // (mehndi is overridden below to mehndi-dholki)
  nikah: '/sounds/wedding-shehnai.mp3',
  shaadi: '/sounds/wedding-shehnai.mp3',
  anniversary: '/sounds/wedding-shehnai.mp3',
  'new-home': '/sounds/wedding-shehnai.mp3',

  // ── Mehndi (specifically) → mehndi-dholki ─────────────────────────────────
  mehndi: '/sounds/mehndi-dholki.mp3',

  // ── Islamic / Religious → eid-chime ───────────────────────────────────────
  'eid-ul-fitr': '/sounds/eid-chime.mp3',
  'eid-ul-adha': '/sounds/eid-chime.mp3',
  ramadan: '/sounds/eid-chime.mp3',
  jumma: '/sounds/eid-chime.mp3',
  hajj: '/sounds/eid-chime.mp3',
  umrah: '/sounds/eid-chime.mp3',
  milad: '/sounds/eid-chime.mp3',

  // ── Warm / Personal / Friendship → friendship-soft ────────────────────────
  'friendship-day': '/sounds/friendship-soft.mp3',
  'thank-you': '/sounds/friendship-soft.mp3',
  'miss-you': '/sounds/friendship-soft.mp3',
  valentines: '/sounds/friendship-soft.mp3',
  'mothers-day': '/sounds/friendship-soft.mp3',
  'fathers-day': '/sounds/friendship-soft.mp3',
  'get-well-soon': '/sounds/friendship-soft.mp3',
  'welcome-back': '/sounds/friendship-soft.mp3',
  'good-luck': '/sounds/friendship-soft.mp3',
  farewell: '/sounds/friendship-soft.mp3',

  // ── National / Seasonal → general ─────────────────────────────────────────
  'independence-day': '/sounds/general.mp3',
  'kashmir-day': '/sounds/general.mp3',
  basant: '/sounds/general.mp3',

  // ── Condolence → no sound ─────────────────────────────────────────────────
  condolence: null,
}

// ---------------------------------------------------------------------------
// Invitation type sound map
// (covers all IDs in lib/jashn/invitations.ts → INVITATION_TYPES)
// ---------------------------------------------------------------------------
export const INVITATION_TYPE_SOUND_MAP: Record<string, string | null> = {
  // Wedding category
  mehndi: '/sounds/mehndi-dholki.mp3',
  dholki: '/sounds/mehndi-dholki.mp3',
  nikkah: '/sounds/wedding-shehnai.mp3',
  barat: '/sounds/wedding-shehnai.mp3',
  walima: '/sounds/wedding-shehnai.mp3',
  engagement: '/sounds/wedding-shehnai.mp3',

  // Religious
  'eid-party': '/sounds/eid-chime.mp3',
  milad: '/sounds/eid-chime.mp3',
  'quran-khatam': '/sounds/eid-chime.mp3',
  iftaar: '/sounds/eid-chime.mp3',
  chelum: null, // mourning/condolence-adjacent — no sound

  // Social
  'birthday-party': '/sounds/birthday-dholki.mp3',
  'graduation-party': '/sounds/birthday-dholki.mp3',
  'family-reunion': '/sounds/friendship-soft.mp3',
  'baby-shower': '/sounds/birthday-dholki.mp3',
  'kids-party': '/sounds/birthday-dholki.mp3',
  'house-warming': '/sounds/birthday-dholki.mp3',

  // Professional
  'shop-opening': '/sounds/birthday-dholki.mp3',
  'office-party': '/sounds/friendship-soft.mp3',
  seminar: '/sounds/general.mp3',
  'product-launch': '/sounds/birthday-dholki.mp3',
  'school-function': '/sounds/friendship-soft.mp3',
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Returns the /sounds/ path for the given occasion ID, or null if no sound
 * should play (condolence), or the general fallback for unmapped IDs.
 */
export function getSoundForOccasion(occasionId: string): string | null {
  if (occasionId in OCCASION_SOUND_MAP) {
    return OCCASION_SOUND_MAP[occasionId]
  }
  // Unknown occasion IDs default to general
  return '/sounds/general.mp3'
}

/**
 * Returns the /sounds/ path for the given invitation type ID, or the general
 * fallback for unmapped types. Returns null for silent types (e.g. chelum).
 */
export function getSoundForInvitationType(typeId: string): string | null {
  if (typeId in INVITATION_TYPE_SOUND_MAP) {
    return INVITATION_TYPE_SOUND_MAP[typeId]
  }
  // Unknown invitation type IDs default to general
  return '/sounds/general.mp3'
}
