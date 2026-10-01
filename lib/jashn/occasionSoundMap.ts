/**
 * occasionSoundMap.ts
 *
 * Maps every Jashn occasion ID and invitation type ID to a sound file
 * served from /public/sounds/. Returns null for occasions that should
 * play no sound (e.g. condolence, mourning).
 */

// ---------------------------------------------------------------------------
// Occasion sound map (Wishes, Magic Links & Cards)
// ---------------------------------------------------------------------------
export const OCCASION_SOUND_MAP: Record<string, string | null> = {
  // ── Islamic & Spiritual Occasions ─────────────────────────────────────────
  'eid-ul-fitr': '/sounds/eid-chime.m4a',
  'eid-ul-adha': '/sounds/eid-chime.m4a',
  ramadan: '/sounds/eid-chime.m4a',
  'chand-raat': '/sounds/eid-chime.m4a',
  jumma: '/sounds/islamic.m4a',
  hajj: '/sounds/islamic.m4a',
  umrah: '/sounds/islamic.m4a',
  milad: '/sounds/islamic.m4a',
  'roza-kushai': '/sounds/islamic.m4a',
  'shab-e-miraj': '/sounds/islamic.m4a',
  'shab-e-barat': '/sounds/islamic.m4a',
  'laylat-al-qadr': '/sounds/islamic.m4a',
  'day-of-arafah': '/sounds/islamic.m4a',
  'islamic-new-year': '/sounds/islamic.m4a',
  'gyarvi-sharif': '/sounds/sufi-harmonium.m4a',
  'youm-e-ali': '/sounds/sufi-harmonium.m4a',
  urs: '/sounds/sufi-harmonium.m4a',

  // ── Wedding & Folk Pre-wedding ────────────────────────────────────────────
  nikah: '/sounds/wedding-shehnai.m4a',
  shaadi: '/sounds/wedding-shehnai.m4a',
  'wedding-gala': '/sounds/wedding-shehnai.m4a',
  'reception-party': '/sounds/wedding-shehnai.m4a',
  'baat-pakki': '/sounds/wedding-shehnai.m4a',
  mehndi: '/sounds/mehndi-dholki.m4a',
  dholki: '/sounds/dholki.m4a',
  vaisakhi: '/sounds/mehndi-dholki.m4a',
  basant: '/sounds/mehndi-dholki.m4a',

  // ── Traditional Indian Celebrations & Classical Music ─────────────────────
  diwali: '/sounds/wedding.m4a',
  'raksha-bandhan': '/sounds/wedding.m4a',
  janmashtami: '/sounds/wedding.m4a',
  'maha-shivratri': '/sounds/wedding.m4a',
  'buddha-purnima': '/sounds/wedding.m4a',
  'qawwali-night': '/sounds/sufi-harmonium.m4a',
  'mushaira-evening': '/sounds/sufi-harmonium.m4a',
  holi: '/sounds/festive.m4a',
  garba: '/sounds/festive.m4a',
  dandiya: '/sounds/festive.m4a',

  // ── Birthdays & Kids ──────────────────────────────────────────────────────
  birthday: '/sounds/birthday-dholki.m4a',
  'milestone-birthday': '/sounds/birthday-dholki.m4a',
  'new-baby': '/sounds/baby-lullaby.m4a',
  'gender-reveal': '/sounds/baby-lullaby.m4a',
  'baby-shower': '/sounds/baby-lullaby.m4a',

  // ── Romance & Anniversaries ───────────────────────────────────────────────
  anniversary: '/sounds/romantic-piano.m4a',
  'golden-anniversary': '/sounds/romantic-piano.m4a',
  valentines: '/sounds/romantic-strings.m4a',

  // ── Global Holidays & Party ───────────────────────────────────────────────
  christmas: '/sounds/holiday-bells.m4a',
  'boxing-day': '/sounds/holiday-bells.m4a',
  'orthodox-christmas': '/sounds/holiday-bells.m4a',
  'new-year': '/sounds/celebration-party.m4a',

  // ── Achievements & Milestones ─────────────────────────────────────────────
  graduation: '/sounds/achievement-brass.m4a',
  'new-job': '/sounds/achievement-brass.m4a',
  promotion: '/sounds/achievement-brass.m4a',
  'exam-pass': '/sounds/achievement-brass.m4a',
  'phd-defense': '/sounds/achievement-brass.m4a',
  'driving-license': '/sounds/achievement-brass.m4a',
  'sports-trophy': '/sounds/achievement-brass.m4a',
  'visa-approved': '/sounds/achievement-brass.m4a',
  congratulations: '/sounds/celebration-party.m4a',

  // ── Business & Corporate ──────────────────────────────────────────────────
  'business-launch': '/sounds/corporate-ambient.m4a',
  'new-home': '/sounds/general.m4a',
  'housewarming-blessings': '/sounds/general.m4a',

  // ── Warm / Personal / Friendship ──────────────────────────────────────────
  'friendship-day': '/sounds/friendship-soft.m4a',
  'thank-you': '/sounds/friendship-soft.m4a',
  'miss-you': '/sounds/friendship-soft.m4a',
  'mothers-day': '/sounds/friendship-soft.m4a',
  'fathers-day': '/sounds/friendship-soft.m4a',
  'get-well-soon': '/sounds/friendship-soft.m4a',
  'welcome-back': '/sounds/friendship-soft.m4a',
  'good-luck': '/sounds/general.m4a',
  farewell: '/sounds/general.m4a',
  retirement: '/sounds/general.m4a',
  'daughters-day': '/sounds/friendship-soft.m4a',
  'siblings-day': '/sounds/friendship-soft.m4a',
  'parents-day': '/sounds/friendship-soft.m4a',
  'sisters-day': '/sounds/friendship-soft.m4a',
  'grandparents-day': '/sounds/friendship-soft.m4a',
  'world-smile-day': '/sounds/general.m4a',

  // ── Universal Calendar Events ─────────────────────────────────────────────
  thanksgiving: '/sounds/general.m4a',
  halloween: '/sounds/general.m4a',
  easter: '/sounds/general.m4a',
  hanukkah: '/sounds/general.m4a',
  'lunar-new-year': '/sounds/celebration-party.m4a',
  'st-patricks-day': '/sounds/general.m4a',
  'earth-day': '/sounds/general.m4a',
  'all-saints-day': '/sounds/general.m4a',
  'makar-sankranti': '/sounds/general.m4a',
  'lantern-festival': '/sounds/general.m4a',
  nowruz: '/sounds/general.m4a',
  purim: '/sounds/general.m4a',
  'good-friday': '/sounds/general.m4a',
  passover: '/sounds/general.m4a',

  // ── National Days (Universal Dignified Chime - No National Anthems) ───────
  'independence-day': '/sounds/general.m4a',
  'kashmir-day': '/sounds/general.m4a',
  'pakistan-day': '/sounds/general.m4a',
  'defence-day': '/sounds/general.m4a',
  'quaid-day': '/sounds/general.m4a',
  'iqbal-day': '/sounds/general.m4a',
  'india-republic-day': '/sounds/general.m4a',
  'india-independence-day': '/sounds/general.m4a',

  // ── Solemn / Mourning / Condolence (Strictly Silent) ───────────────────────
  condolence: null,
  sympathy: null,
  ashura: null,
  chehlum: null,
}

// ---------------------------------------------------------------------------
// Invitation type sound map (Events & RSVPs)
// ---------------------------------------------------------------------------
export const INVITATION_TYPE_SOUND_MAP: Record<string, string | null> = {
  // Wedding category
  mehndi: '/sounds/mehndi-dholki.m4a',
  dholki: '/sounds/dholki.m4a',
  'sangeet-night': '/sounds/mehndi-dholki.m4a',
  'qawwali-night': '/sounds/sufi-harmonium.m4a',
  nikkah: '/sounds/wedding-shehnai.m4a',
  barat: '/sounds/wedding-shehnai.m4a',
  baraat: '/sounds/wedding-shehnai.m4a',
  walima: '/sounds/wedding-shehnai.m4a',
  engagement: '/sounds/wedding-shehnai.m4a',
  'bridal-shower': '/sounds/wedding-shehnai.m4a',
  'wedding-gala': '/sounds/wedding-shehnai.m4a',
  'reception-party': '/sounds/wedding-shehnai.m4a',

  // Traditional & Festive Gatherings
  'diwali-party': '/sounds/wedding.m4a',
  'holi-celebration': '/sounds/festive.m4a',
  'mushaira-evening': '/sounds/sufi-harmonium.m4a',

  // Religious & Islamic
  'eid-party': '/sounds/eid-chime.m4a',
  milad: '/sounds/islamic.m4a',
  'milad-mehfil': '/sounds/islamic.m4a',
  'quran-khatam': '/sounds/islamic.m4a',
  'dars-quran': '/sounds/islamic.m4a',
  'dua-khatam': '/sounds/islamic.m4a',
  iftaar: '/sounds/islamic.m4a',
  'roza-kushai': '/sounds/islamic.m4a',
  'hajj-dinner': '/sounds/islamic.m4a',
  'chand-raat-mela': '/sounds/eid-chime.m4a',
  'aqiqah-party': '/sounds/baby-lullaby.m4a',
  chelum: null,
  'majlis-aza': null,

  // Social & Family
  'birthday-party': '/sounds/birthday-dholki.m4a',
  'graduation-party': '/sounds/achievement-brass.m4a',
  'family-reunion': '/sounds/friendship-soft.m4a',
  'baby-shower': '/sounds/baby-lullaby.m4a',
  'kids-party': '/sounds/birthday.m4a',
  'house-warming': '/sounds/general.m4a',
  'kitty-party': '/sounds/dholki.m4a',
  'anniversary-party': '/sounds/romantic-piano.m4a',
  'prom-farewell': '/sounds/friendship-soft.m4a',

  // Professional & Business
  'shop-opening': '/sounds/corporate-ambient.m4a',
  'office-party': '/sounds/celebration-party.m4a',
  seminar: '/sounds/corporate-ambient.m4a',
  'product-launch': '/sounds/corporate-ambient.m4a',
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
  return '/sounds/general.m4a'
}
