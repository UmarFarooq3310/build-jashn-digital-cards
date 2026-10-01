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
  birthday: '/sounds/birthday-dholki.m4a',
  'new-baby': '/sounds/birthday-dholki.m4a',
  'new-year': '/sounds/birthday-dholki.m4a',
  graduation: '/sounds/birthday-dholki.m4a',
  'new-job': '/sounds/birthday-dholki.m4a',
  promotion: '/sounds/birthday-dholki.m4a',
  'exam-pass': '/sounds/birthday-dholki.m4a',
  'business-launch': '/sounds/birthday-dholki.m4a',
  congratulations: '/sounds/birthday-dholki.m4a',

  // ── Wedding / Nikah / Anniversary / New-home → wedding-shehnai ────────────
  // (mehndi is overridden below to mehndi-dholki)
  nikah: '/sounds/wedding-shehnai.m4a',
  shaadi: '/sounds/wedding-shehnai.m4a',
  'wedding-gala': '/sounds/wedding-shehnai.m4a',
  'reception-party': '/sounds/wedding-shehnai.m4a',
  'baat-pakki': '/sounds/wedding-shehnai.m4a',
  anniversary: '/sounds/wedding-shehnai.m4a',
  'golden-anniversary': '/sounds/wedding-shehnai.m4a',
  'new-home': '/sounds/wedding-shehnai.m4a',
  'housewarming-blessings': '/sounds/wedding-shehnai.m4a',

  // ── Punjabi / Folk / Dholki Celebrations → mehndi-dholki ─────────────────
  mehndi: '/sounds/mehndi-dholki.m4a',
  dholki: '/sounds/mehndi-dholki.m4a',
  vaisakhi: '/sounds/mehndi-dholki.m4a',
  'makar-sankranti': '/sounds/mehndi-dholki.m4a',
  basant: '/sounds/mehndi-dholki.m4a',
  'chand-raat': '/sounds/mehndi-dholki.m4a',
  'chand-raat-mela': '/sounds/mehndi-dholki.m4a',
  'kitty-party': '/sounds/mehndi-dholki.m4a',

  // ── Traditional Indian Celebrations & Classical Music → wedding (sitar) ───
  diwali: '/sounds/wedding.m4a',
  'diwali-party': '/sounds/wedding.m4a',
  holi: '/sounds/wedding.m4a',
  'holi-celebration': '/sounds/wedding.m4a',
  'raksha-bandhan': '/sounds/wedding.m4a',
  janmashtami: '/sounds/wedding.m4a',
  'maha-shivratri': '/sounds/wedding.m4a',
  'buddha-purnima': '/sounds/wedding.m4a',
  'sangeet-night': '/sounds/mehndi-dholki.m4a',
  'qawwali-night': '/sounds/wedding.m4a',
  'mushaira-evening': '/sounds/wedding.m4a',

  // ── Islamic / Religious → eid-chime ───────────────────────────────────────
  'eid-ul-fitr': '/sounds/eid-chime.m4a',
  'eid-ul-adha': '/sounds/eid-chime.m4a',
  ramadan: '/sounds/eid-chime.m4a',
  jumma: '/sounds/eid-chime.m4a',
  hajj: '/sounds/eid-chime.m4a',
  umrah: '/sounds/eid-chime.m4a',
  milad: '/sounds/eid-chime.m4a',
  'roza-kushai': '/sounds/eid-chime.m4a',
  'shab-e-miraj': '/sounds/eid-chime.m4a',
  'shab-e-barat': '/sounds/eid-chime.m4a',
  'laylat-al-qadr': '/sounds/eid-chime.m4a',
  'day-of-arafah': '/sounds/eid-chime.m4a',
  'islamic-new-year': '/sounds/eid-chime.m4a',
  'gyarvi-sharif': '/sounds/eid-chime.m4a',
  'youm-e-ali': '/sounds/eid-chime.m4a',
  urs: '/sounds/eid-chime.m4a',

  // ── Warm / Personal / Friendship → friendship-soft ────────────────────────
  'friendship-day': '/sounds/friendship-soft.m4a',
  'thank-you': '/sounds/friendship-soft.m4a',
  'miss-you': '/sounds/friendship-soft.m4a',
  valentines: '/sounds/friendship-soft.m4a',
  'mothers-day': '/sounds/friendship-soft.m4a',
  'fathers-day': '/sounds/friendship-soft.m4a',
  'get-well-soon': '/sounds/friendship-soft.m4a',
  'welcome-back': '/sounds/friendship-soft.m4a',
  'good-luck': '/sounds/friendship-soft.m4a',
  farewell: '/sounds/friendship-soft.m4a',
  'daughters-day': '/sounds/friendship-soft.m4a',
  'siblings-day': '/sounds/friendship-soft.m4a',
  'parents-day': '/sounds/friendship-soft.m4a',
  'sisters-day': '/sounds/friendship-soft.m4a',
  'grandparents-day': '/sounds/friendship-soft.m4a',

  // ── National / Seasonal → general ─────────────────────────────────────────
  'independence-day': '/sounds/general.m4a',
  'kashmir-day': '/sounds/general.m4a',
  'pakistan-day': '/sounds/general.m4a',
  'defence-day': '/sounds/general.m4a',
  'quaid-day': '/sounds/general.m4a',
  'iqbal-day': '/sounds/general.m4a',
  'india-republic-day': '/sounds/general.m4a',
  'india-independence-day': '/sounds/general.m4a',

  // ── Condolence / Mourning → no sound ──────────────────────────────────────
  condolence: null,
  ashura: null,
  chehlum: null,
  sympathy: null,
}

// ---------------------------------------------------------------------------
// Invitation type sound map
// (covers all IDs in lib/jashn/invitations.ts → INVITATION_TYPES)
// ---------------------------------------------------------------------------
export const INVITATION_TYPE_SOUND_MAP: Record<string, string | null> = {
  // Wedding category
  mehndi: '/sounds/mehndi-dholki.m4a',
  dholki: '/sounds/mehndi-dholki.m4a',
  'sangeet-night': '/sounds/mehndi-dholki.m4a',
  'qawwali-night': '/sounds/wedding.m4a',
  nikkah: '/sounds/wedding-shehnai.m4a',
  barat: '/sounds/wedding-shehnai.m4a',
  baraat: '/sounds/wedding-shehnai.m4a',
  walima: '/sounds/wedding-shehnai.m4a',
  engagement: '/sounds/wedding-shehnai.m4a',
  'bridal-shower': '/sounds/wedding-shehnai.m4a',
  'wedding-gala': '/sounds/wedding-shehnai.m4a',
  'reception-party': '/sounds/wedding-shehnai.m4a',

  // Indian Traditional & Religious Gatherings
  'diwali-party': '/sounds/wedding.m4a',
  'holi-celebration': '/sounds/mehndi-dholki.m4a',
  'mushaira-evening': '/sounds/wedding.m4a',

  // Religious
  'eid-party': '/sounds/eid-chime.m4a',
  milad: '/sounds/eid-chime.m4a',
  'milad-mehfil': '/sounds/eid-chime.m4a',
  'quran-khatam': '/sounds/eid-chime.m4a',
  'dars-quran': '/sounds/eid-chime.m4a',
  'dua-khatam': '/sounds/eid-chime.m4a',
  iftaar: '/sounds/eid-chime.m4a',
  'roza-kushai': '/sounds/eid-chime.m4a',
  'hajj-dinner': '/sounds/eid-chime.m4a',
  'chand-raat-mela': '/sounds/mehndi-dholki.m4a',
  'aqiqah-party': '/sounds/birthday-dholki.m4a',
  chelum: null, // mourning/condolence-adjacent — no sound
  'majlis-aza': null,

  // Social
  'birthday-party': '/sounds/birthday-dholki.m4a',
  'graduation-party': '/sounds/birthday-dholki.m4a',
  'family-reunion': '/sounds/friendship-soft.m4a',
  'baby-shower': '/sounds/birthday-dholki.m4a',
  'kids-party': '/sounds/birthday-dholki.m4a',
  'house-warming': '/sounds/birthday-dholki.m4a',
  'kitty-party': '/sounds/mehndi-dholki.m4a',
  'anniversary-party': '/sounds/wedding-shehnai.m4a',
  'prom-farewell': '/sounds/friendship-soft.m4a',

  // Professional
  'shop-opening': '/sounds/birthday-dholki.m4a',
  'office-party': '/sounds/friendship-soft.m4a',
  seminar: '/sounds/general.m4a',
  'product-launch': '/sounds/birthday-dholki.m4a',
  'school-function': '/sounds/friendship-soft.m4a',
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
  return '/sounds/general.m4a'
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
  return '/sounds/general.m4a'
}
