/**
 * Invitation Type Theme Registry
 * Maps each invitation typeId to a premium visual identity:
 * - CSS class for the .jashn-card element (type-specific overrides)
 * - Decor motif for type-specific floating elements
 * - Animation profile for GSAP
 */

export interface InvitationTypeTheme {
  /** CSS class applied to .jashn-card alongside the user-selected generic theme */
  typeClass: string
  /** Which decorative elements to render */
  decor: InvitationDecorType
  /** GSAP animation profile name */
  animProfile: AnimProfile
  /** Particle color override (falls back to --c-glow) */
  particleColor?: string
  /** Whether to show animated gradient mesh */
  gradientMesh?: boolean
}

export type InvitationDecorType =
  | 'mehndi-floral'
  | 'dholki-music'
  | 'nikkah-islamic'
  | 'barat-royal'
  | 'walima-crystal'
  | 'engagement-roses'
  | 'eid-lanterns'
  | 'milad-light'
  | 'quran-geometric'
  | 'iftaar-sunset'
  | 'chelum-minimal'
  | 'birthday-balloons'
  | 'graduation-caps'
  | 'family-leaves'
  | 'baby-clouds'
  | 'kids-candy'
  | 'house-plants'
  | 'shop-spotlight'
  | 'office-shapes'
  | 'seminar-nodes'
  | 'launch-neon'
  | 'school-books'

export type AnimProfile =
  | 'bloom'
  | 'bounce-beat'
  | 'shimmer-fade'
  | 'royal-entrance'
  | 'float-up'
  | 'heart-burst'
  | 'lantern-swing'
  | 'gentle-glow'
  | 'confetti-pop'
  | 'cap-toss'
  | 'leaf-drift'
  | 'cloud-drift'
  | 'candy-spin'
  | 'spotlight-sweep'
  | 'slide-reveal'
  | 'node-connect'
  | 'rocket-launch'
  | 'book-open'
  | 'sunset-shift'
  | 'mist-fade'

export const INVITATION_TYPE_THEMES: Record<string, InvitationTypeTheme> = {
  // ── WEDDING ──────────────────────────────────────────────────────────────
  mehndi: {
    typeClass: 'inv-type-mehndi',
    decor: 'mehndi-floral',
    animProfile: 'bloom',
    particleColor: '#f9c74f',
    gradientMesh: true,
  },
  dholki: {
    typeClass: 'inv-type-dholki',
    decor: 'dholki-music',
    animProfile: 'bounce-beat',
    particleColor: '#f72585',
    gradientMesh: true,
  },
  nikkah: {
    typeClass: 'inv-type-nikkah',
    decor: 'nikkah-islamic',
    animProfile: 'shimmer-fade',
    particleColor: '#ffd700',
    gradientMesh: false,
  },
  barat: {
    typeClass: 'inv-type-barat',
    decor: 'barat-royal',
    animProfile: 'royal-entrance',
    particleColor: '#d4af37',
    gradientMesh: true,
  },
  walima: {
    typeClass: 'inv-type-walima',
    decor: 'walima-crystal',
    animProfile: 'float-up',
    particleColor: '#f4e5c2',
    gradientMesh: false,
  },
  engagement: {
    typeClass: 'inv-type-engagement',
    decor: 'engagement-roses',
    animProfile: 'heart-burst',
    particleColor: '#ff85a1',
    gradientMesh: true,
  },

  // ── RELIGIOUS ────────────────────────────────────────────────────────────
  'eid-party': {
    typeClass: 'inv-type-eid',
    decor: 'eid-lanterns',
    animProfile: 'lantern-swing',
    particleColor: '#ffd700',
    gradientMesh: false,
  },
  milad: {
    typeClass: 'inv-type-milad',
    decor: 'milad-light',
    animProfile: 'gentle-glow',
    particleColor: '#b5ead7',
    gradientMesh: false,
  },
  'quran-khatam': {
    typeClass: 'inv-type-quran',
    decor: 'quran-geometric',
    animProfile: 'gentle-glow',
    particleColor: '#a8d8a8',
    gradientMesh: false,
  },
  // handle the typo variant in invitations.ts
  'quran-khatamå': {
    typeClass: 'inv-type-quran',
    decor: 'quran-geometric',
    animProfile: 'gentle-glow',
    particleColor: '#a8d8a8',
    gradientMesh: false,
  },
  iftaar: {
    typeClass: 'inv-type-iftaar',
    decor: 'iftaar-sunset',
    animProfile: 'sunset-shift',
    particleColor: '#ffc107',
    gradientMesh: true,
  },
  chelum: {
    typeClass: 'inv-type-chelum',
    decor: 'chelum-minimal',
    animProfile: 'mist-fade',
    particleColor: '#b0bec5',
    gradientMesh: false,
  },

  // ── SOCIAL ───────────────────────────────────────────────────────────────
  'birthday-party': {
    typeClass: 'inv-type-birthday',
    decor: 'birthday-balloons',
    animProfile: 'confetti-pop',
    particleColor: '#ff6b9d',
    gradientMesh: true,
  },
  'graduation-party': {
    typeClass: 'inv-type-graduation',
    decor: 'graduation-caps',
    animProfile: 'cap-toss',
    particleColor: '#ffd700',
    gradientMesh: false,
  },
  'family-reunion': {
    typeClass: 'inv-type-family',
    decor: 'family-leaves',
    animProfile: 'leaf-drift',
    particleColor: '#ff9f1c',
    gradientMesh: false,
  },
  'baby-shower': {
    typeClass: 'inv-type-baby',
    decor: 'baby-clouds',
    animProfile: 'cloud-drift',
    particleColor: '#c9daf8',
    gradientMesh: false,
  },
  'kids-party': {
    typeClass: 'inv-type-kids',
    decor: 'kids-candy',
    animProfile: 'candy-spin',
    particleColor: '#ff6b6b',
    gradientMesh: true,
  },
  'house-warming': {
    typeClass: 'inv-type-house',
    decor: 'house-plants',
    animProfile: 'gentle-glow',
    particleColor: '#f4a261',
    gradientMesh: false,
  },

  // ── PROFESSIONAL ─────────────────────────────────────────────────────────
  'shop-opening': {
    typeClass: 'inv-type-shop',
    decor: 'shop-spotlight',
    animProfile: 'spotlight-sweep',
    particleColor: '#ffd700',
    gradientMesh: false,
  },
  'office-party': {
    typeClass: 'inv-type-office',
    decor: 'office-shapes',
    animProfile: 'slide-reveal',
    particleColor: '#90caf9',
    gradientMesh: false,
  },
  seminar: {
    typeClass: 'inv-type-seminar',
    decor: 'seminar-nodes',
    animProfile: 'node-connect',
    particleColor: '#7986cb',
    gradientMesh: true,
  },
  'product-launch': {
    typeClass: 'inv-type-launch',
    decor: 'launch-neon',
    animProfile: 'rocket-launch',
    particleColor: '#00f5ff',
    gradientMesh: true,
  },
  'school-function': {
    typeClass: 'inv-type-school',
    decor: 'school-books',
    animProfile: 'book-open',
    particleColor: '#81c784',
    gradientMesh: false,
  },
}

export function getInvitationTypeTheme(typeId: string | undefined): InvitationTypeTheme | null {
  if (!typeId) return null
  return INVITATION_TYPE_THEMES[typeId] ?? null
}
