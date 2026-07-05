/**
 * RelationAvatar — 2D illustrated SVG characters for each relation type.
 * Each avatar is a self-contained inline SVG with themed colors via CSS vars.
 */

export type RelationType =
  | 'bride'
  | 'groom'
  | 'father'
  | 'mother'
  | 'friend'
  | 'baby'
  | 'graduate'
  | 'sister'
  | 'brother'
  | 'grandmother'
  | 'grandfather'
  | 'couple'
  | 'default'

/** Map a free-text relation string to a RelationType key */
export function detectRelation(relation?: string): RelationType {
  if (!relation) return 'default'
  const r = relation.toLowerCase().trim()
  if (r.includes('bride') || r.includes('dulhan')) return 'bride'
  if (r.includes('groom') || r.includes('dulha')) return 'groom'
  if (r.includes('father') || r.includes('baba') || r.includes('dad') || r.includes('abu')) return 'father'
  if (r.includes('mother') || r.includes('mama') || r.includes('mom') || r.includes('ammi') || r.includes('amma')) return 'mother'
  if (r.includes('grand') && (r.includes('ma') || r.includes('nani') || r.includes('dadi'))) return 'grandmother'
  if (r.includes('grand') && (r.includes('pa') || r.includes('nana') || r.includes('dada'))) return 'grandfather'
  if (r.includes('sister') || r.includes('baji') || r.includes('apa')) return 'sister'
  if (r.includes('brother') || r.includes('bhai')) return 'brother'
  if (r.includes('baby') || r.includes('beti') || r.includes('beta') || r.includes('child')) return 'baby'
  if (r.includes('graduate') || r.includes('student')) return 'graduate'
  if (r.includes('couple') || r.includes('husband') || r.includes('wife') || r.includes('shauhar') || r.includes('biwi')) return 'couple'
  if (r.includes('friend') || r.includes('dost') || r.includes('yaar')) return 'friend'
  return 'default'
}

// ─── Individual SVG Avatars ────────────────────────────────────────────────

function BrideAvatar({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Bride">
      {/* veil */}
      <ellipse cx="40" cy="18" rx="22" ry="10" fill="var(--c-accent)" opacity="0.25" />
      <path d="M18 18 Q20 8 40 6 Q60 8 62 18 Q54 14 40 15 Q26 14 18 18Z" fill="var(--c-accent)" opacity="0.7" />
      {/* veil sides */}
      <path d="M18 18 Q12 30 14 48" stroke="var(--c-accent)" strokeWidth="2" opacity="0.5" fill="none" />
      <path d="M62 18 Q68 30 66 48" stroke="var(--c-accent)" strokeWidth="2" opacity="0.5" fill="none" />
      {/* face */}
      <ellipse cx="40" cy="30" rx="12" ry="13" fill="#FDDBB4" />
      {/* hair */}
      <path d="M28 26 Q28 14 40 14 Q52 14 52 26" fill="#5C3317" />
      {/* eyes */}
      <ellipse cx="35.5" cy="28" rx="2" ry="2.2" fill="#2C1810" />
      <ellipse cx="44.5" cy="28" rx="2" ry="2.2" fill="#2C1810" />
      <circle cx="36.2" cy="27.2" r="0.6" fill="white" />
      <circle cx="45.2" cy="27.2" r="0.6" fill="white" />
      {/* blush */}
      <ellipse cx="33" cy="32" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.6" />
      <ellipse cx="47" cy="32" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.6" />
      {/* nose */}
      <ellipse cx="40" cy="32" rx="1.2" ry="0.8" fill="#E8A882" />
      {/* mouth */}
      <path d="M36.5 35.5 Q40 38 43.5 35.5" stroke="#C0625A" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* bindi */}
      <circle cx="40" cy="22" r="1.2" fill="var(--c-accent)" />
      {/* necklace */}
      <path d="M30 43 Q40 48 50 43" stroke="var(--c-accent)" strokeWidth="1.5" fill="none" />
      <circle cx="40" cy="47.5" r="2" fill="var(--c-accent)" />
      {/* dress top */}
      <path d="M28 43 Q24 52 22 70 L58 70 Q56 52 52 43 Q40 50 28 43Z" fill="var(--c-accent)" opacity="0.8" />
      {/* embroidery dots */}
      <circle cx="35" cy="55" r="1.2" fill="white" opacity="0.5" />
      <circle cx="40" cy="58" r="1.2" fill="white" opacity="0.5" />
      <circle cx="45" cy="55" r="1.2" fill="white" opacity="0.5" />
    </svg>
  )
}

function GroomAvatar({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Groom">
      {/* sehra / floral headpiece */}
      <path d="M26 18 Q28 10 40 9 Q52 10 54 18" fill="var(--c-accent)" opacity="0.3" />
      <circle cx="32" cy="13" r="2.5" fill="var(--c-accent)" opacity="0.7" />
      <circle cx="40" cy="10" r="2.5" fill="var(--c-accent)" opacity="0.7" />
      <circle cx="48" cy="13" r="2.5" fill="var(--c-accent)" opacity="0.7" />
      {/* strings of sehra */}
      <line x1="28" y1="18" x2="22" y2="42" stroke="var(--c-accent)" strokeWidth="1" opacity="0.5" />
      <line x1="52" y1="18" x2="58" y2="42" stroke="var(--c-accent)" strokeWidth="1" opacity="0.5" />
      {/* face */}
      <ellipse cx="40" cy="30" rx="12" ry="13" fill="#FDDBB4" />
      {/* hair */}
      <path d="M28 24 Q28 14 40 14 Q52 14 52 24 Q48 20 40 20 Q32 20 28 24Z" fill="#2C1810" />
      {/* eyes */}
      <ellipse cx="35.5" cy="28.5" rx="2" ry="2" fill="#2C1810" />
      <ellipse cx="44.5" cy="28.5" rx="2" ry="2" fill="#2C1810" />
      <circle cx="36.2" cy="27.8" r="0.6" fill="white" />
      <circle cx="45.2" cy="27.8" r="0.6" fill="white" />
      {/* eyebrows */}
      <path d="M33 25 Q35.5 23.5 38 25" stroke="#2C1810" strokeWidth="1.2" fill="none" />
      <path d="M42 25 Q44.5 23.5 47 25" stroke="#2C1810" strokeWidth="1.2" fill="none" />
      {/* nose */}
      <ellipse cx="40" cy="32" rx="1.2" ry="0.8" fill="#E8A882" />
      {/* mouth */}
      <path d="M37 35.5 Q40 37.5 43 35.5" stroke="#A0522D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* sherwani collar */}
      <path d="M28 43 L34 43 L40 47 L46 43 L52 43 L56 70 L24 70Z" fill="var(--c-accent)" opacity="0.15" />
      <path d="M28 43 L34 43 L40 47 L46 43 L52 43" stroke="var(--c-accent)" strokeWidth="1.5" fill="none" />
      {/* sherwani body */}
      <path d="M24 43 Q22 55 22 70 L58 70 Q58 55 56 43Z" fill="#2C1810" opacity="0.85" />
      {/* buttons */}
      <circle cx="40" cy="52" r="1.2" fill="var(--c-accent)" />
      <circle cx="40" cy="58" r="1.2" fill="var(--c-accent)" />
      <circle cx="40" cy="64" r="1.2" fill="var(--c-accent)" />
    </svg>
  )
}

function FatherAvatar({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Father">
      {/* kufi cap */}
      <path d="M27 22 Q27 10 40 10 Q53 10 53 22 Q53 18 40 18 Q27 18 27 22Z" fill="var(--c-accent)" opacity="0.75" />
      <rect x="27" y="20" width="26" height="4" rx="2" fill="var(--c-accent)" opacity="0.5" />
      {/* face */}
      <ellipse cx="40" cy="33" rx="12" ry="13" fill="#C68642" />
      {/* beard */}
      <path d="M29 38 Q28 50 40 54 Q52 50 51 38 Q44 42 40 42 Q36 42 29 38Z" fill="#5C3317" opacity="0.85" />
      {/* moustache */}
      <path d="M34 38 Q37 40 40 39 Q43 40 46 38" fill="#3C1F10" />
      {/* eyes */}
      <ellipse cx="35.5" cy="30" rx="2" ry="2.2" fill="#2C1810" />
      <ellipse cx="44.5" cy="30" rx="2" ry="2.2" fill="#2C1810" />
      <circle cx="36.2" cy="29.2" r="0.6" fill="white" />
      <circle cx="45.2" cy="29.2" r="0.6" fill="white" />
      {/* eyebrows */}
      <path d="M32.5 27 Q35.5 25 38.5 27" stroke="#3C1F10" strokeWidth="1.4" fill="none" />
      <path d="M41.5 27 Q44.5 25 47.5 27" stroke="#3C1F10" strokeWidth="1.4" fill="none" />
      {/* shalwar kameez */}
      <path d="M24 54 Q22 62 22 70 L58 70 Q58 62 56 54 Z" fill="var(--c-accent)" opacity="0.6" />
      <rect x="24" y="53" width="32" height="4" rx="2" fill="var(--c-accent)" opacity="0.4" />
    </svg>
  )
}

function MotherAvatar({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mother">
      {/* dupatta */}
      <path d="M16 20 Q22 10 40 10 Q58 10 64 20 Q56 16 40 17 Q24 16 16 20Z" fill="var(--c-accent)" opacity="0.65" />
      <path d="M16 20 Q14 35 16 55" stroke="var(--c-accent)" strokeWidth="3" opacity="0.4" fill="none" />
      <path d="M64 20 Q66 35 64 55" stroke="var(--c-accent)" strokeWidth="3" opacity="0.4" fill="none" />
      {/* face */}
      <ellipse cx="40" cy="32" rx="12" ry="13" fill="#FDDBB4" />
      {/* hair */}
      <path d="M28 28 Q28 14 40 14 Q52 14 52 28 Q48 22 40 22 Q32 22 28 28Z" fill="#2C1810" />
      {/* bun */}
      <circle cx="40" cy="16" r="5" fill="#2C1810" />
      {/* eyes */}
      <ellipse cx="35.5" cy="30" rx="2" ry="2.2" fill="#2C1810" />
      <ellipse cx="44.5" cy="30" rx="2" ry="2.2" fill="#2C1810" />
      <circle cx="36.2" cy="29.2" r="0.6" fill="white" />
      <circle cx="45.2" cy="29.2" r="0.6" fill="white" />
      {/* blush */}
      <ellipse cx="33" cy="34" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.6" />
      <ellipse cx="47" cy="34" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.6" />
      {/* nose */}
      <ellipse cx="40" cy="33.5" rx="1.2" ry="0.8" fill="#E8A882" />
      {/* mouth */}
      <path d="M37 37 Q40 39.5 43 37" stroke="#C0625A" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* kameez */}
      <path d="M26 45 Q22 57 22 70 L58 70 Q58 57 54 45 Q40 52 26 45Z" fill="var(--c-accent)" opacity="0.7" />
      {/* embroidery */}
      <path d="M30 55 Q40 60 50 55" stroke="white" strokeWidth="0.8" opacity="0.4" fill="none" />
    </svg>
  )
}

function GrandmotherAvatar({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Grandmother">
      {/* dupatta */}
      <path d="M16 22 Q22 12 40 12 Q58 12 64 22 Q56 18 40 19 Q24 18 16 22Z" fill="var(--c-accent)" opacity="0.5" />
      {/* face */}
      <ellipse cx="40" cy="33" rx="12" ry="13" fill="#D4956A" />
      {/* white hair */}
      <path d="M28 28 Q28 14 40 14 Q52 14 52 28 Q48 22 40 22 Q32 22 28 28Z" fill="#E8E8E8" />
      <circle cx="40" cy="16" r="5" fill="#D8D8D8" />
      {/* wrinkle lines */}
      <path d="M31 30 Q33 29 35 30" stroke="#C07A50" strokeWidth="0.7" fill="none" />
      <path d="M45 30 Q47 29 49 30" stroke="#C07A50" strokeWidth="0.7" fill="none" />
      <path d="M36 38 Q40 39 44 38" stroke="#C07A50" strokeWidth="0.7" fill="none" />
      {/* eyes */}
      <ellipse cx="35.5" cy="30" rx="1.8" ry="2" fill="#2C1810" />
      <ellipse cx="44.5" cy="30" rx="1.8" ry="2" fill="#2C1810" />
      {/* glasses */}
      <rect x="31" y="27" width="8" height="5.5" rx="2.5" stroke="var(--c-accent)" strokeWidth="1" fill="none" />
      <rect x="41" y="27" width="8" height="5.5" rx="2.5" stroke="var(--c-accent)" strokeWidth="1" fill="none" />
      <line x1="39" y1="29.5" x2="41" y2="29.5" stroke="var(--c-accent)" strokeWidth="1" />
      {/* nose */}
      <ellipse cx="40" cy="34" rx="1.2" ry="0.8" fill="#C07A50" />
      {/* mouth */}
      <path d="M37 37 Q40 38.5 43 37" stroke="#A0522D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* kameez */}
      <path d="M26 45 Q22 57 22 70 L58 70 Q58 57 54 45 Q40 52 26 45Z" fill="var(--c-accent)" opacity="0.55" />
    </svg>
  )
}

function GrandfatherAvatar({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Grandfather">
      {/* white kufi */}
      <path d="M28 22 Q28 11 40 11 Q52 11 52 22 Q52 18 40 18 Q28 18 28 22Z" fill="#E8E8E8" />
      <rect x="28" y="20" width="24" height="4" rx="2" fill="#D0D0D0" />
      {/* face */}
      <ellipse cx="40" cy="33" rx="12" ry="13" fill="#C68642" />
      {/* white beard */}
      <path d="M29 40 Q28 52 40 56 Q52 52 51 40 Q44 44 40 44 Q36 44 29 40Z" fill="#E8E8E8" opacity="0.95" />
      {/* moustache */}
      <path d="M34 39 Q37 41 40 40 Q43 41 46 39" fill="#C8C8C8" />
      {/* eyes */}
      <ellipse cx="35.5" cy="30" rx="1.8" ry="2" fill="#2C1810" />
      <ellipse cx="44.5" cy="30" rx="1.8" ry="2" fill="#2C1810" />
      {/* glasses */}
      <rect x="31" y="27" width="8" height="5.5" rx="2.5" stroke="var(--c-accent)" strokeWidth="1" fill="none" />
      <rect x="41" y="27" width="8" height="5.5" rx="2.5" stroke="var(--c-accent)" strokeWidth="1" fill="none" />
      <line x1="39" y1="29.5" x2="41" y2="29.5" stroke="var(--c-accent)" strokeWidth="1" />
      {/* kameez */}
      <path d="M24 54 Q22 62 22 70 L58 70 Q58 62 56 54 Z" fill="var(--c-accent)" opacity="0.5" />
      <rect x="24" y="52" width="32" height="5" rx="2" fill="var(--c-accent)" opacity="0.35" />
    </svg>
  )
}

function FriendAvatar({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Friend">
      {/* hair — fun wavy */}
      <path d="M27 27 Q26 14 40 13 Q54 14 53 27 Q50 18 40 19 Q30 18 27 27Z" fill="#8B4513" />
      {/* side curls */}
      <path d="M27 27 Q24 32 26 38" stroke="#8B4513" strokeWidth="3" fill="none" />
      <path d="M53 27 Q56 32 54 38" stroke="#8B4513" strokeWidth="3" fill="none" />
      {/* face */}
      <ellipse cx="40" cy="32" rx="13" ry="14" fill="#FDDBB4" />
      {/* eyes — big happy */}
      <ellipse cx="35" cy="29" rx="2.5" ry="2.8" fill="#2C1810" />
      <ellipse cx="45" cy="29" rx="2.5" ry="2.8" fill="#2C1810" />
      <circle cx="35.9" cy="28" r="0.9" fill="white" />
      <circle cx="45.9" cy="28" r="0.9" fill="white" />
      {/* blush */}
      <ellipse cx="31" cy="34" rx="3.5" ry="2" fill="#F4A0A0" opacity="0.65" />
      <ellipse cx="49" cy="34" rx="3.5" ry="2" fill="#F4A0A0" opacity="0.65" />
      {/* nose */}
      <ellipse cx="40" cy="33" rx="1.3" ry="0.9" fill="#E8A882" />
      {/* big smile */}
      <path d="M34 37 Q40 43 46 37" stroke="#C0625A" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* t-shirt */}
      <path d="M26 46 Q22 56 22 70 L58 70 Q58 56 54 46 Q46 52 40 51 Q34 52 26 46Z" fill="var(--c-accent)" opacity="0.7" />
      {/* heart on shirt */}
      <path d="M37 55 Q37 52 40 54 Q43 52 43 55 Q43 58 40 60 Q37 58 37 55Z" fill="white" opacity="0.5" />
    </svg>
  )
}

function BabyAvatar({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Baby">
      {/* baby bonnet */}
      <path d="M24 30 Q24 13 40 12 Q56 13 56 30 Q52 22 40 22 Q28 22 24 30Z" fill="var(--c-accent)" opacity="0.6" />
      <path d="M24 30 Q20 33 22 38" stroke="var(--c-accent)" strokeWidth="2.5" fill="none" opacity="0.5" />
      <path d="M56 30 Q60 33 58 38" stroke="var(--c-accent)" strokeWidth="2.5" fill="none" opacity="0.5" />
      {/* bow on bonnet */}
      <path d="M36 13 L38 16 L40 13 L42 16 L44 13" stroke="var(--c-accent)" strokeWidth="1.5" fill="none" />
      {/* chubby face */}
      <ellipse cx="40" cy="36" rx="15" ry="15" fill="#FFDFC0" />
      {/* chubby cheeks */}
      <ellipse cx="29" cy="38" rx="5" ry="4" fill="#FFB8A0" opacity="0.4" />
      <ellipse cx="51" cy="38" rx="5" ry="4" fill="#FFB8A0" opacity="0.4" />
      {/* eyes — cute dots */}
      <circle cx="35" cy="33" r="2.5" fill="#2C1810" />
      <circle cx="45" cy="33" r="2.5" fill="#2C1810" />
      <circle cx="35.9" cy="32" r="0.9" fill="white" />
      <circle cx="45.9" cy="32" r="0.9" fill="white" />
      {/* tiny nose */}
      <ellipse cx="40" cy="37" rx="1.5" ry="1" fill="#E8A882" />
      {/* tiny smile */}
      <path d="M37 40.5 Q40 43 43 40.5" stroke="#C0625A" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* onesie */}
      <path d="M28 50 Q24 58 24 70 L56 70 Q56 58 52 50 Q46 55 40 54 Q34 55 28 50Z" fill="var(--c-accent)" opacity="0.55" />
      <circle cx="40" cy="56" r="1.5" fill="white" opacity="0.5" />
    </svg>
  )
}

function GraduateAvatar({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Graduate">
      {/* mortarboard hat */}
      <rect x="26" y="18" width="28" height="5" rx="1.5" fill="var(--c-accent)" />
      <path d="M40 10 L26 18 L40 22 L54 18Z" fill="var(--c-accent)" opacity="0.9" />
      {/* tassel */}
      <line x1="54" y1="18" x2="58" y2="22" stroke="var(--c-accent)" strokeWidth="1.5" />
      <line x1="58" y1="22" x2="58" y2="30" stroke="var(--c-accent)" strokeWidth="1.5" />
      <ellipse cx="58" cy="31" rx="2" ry="1" fill="var(--c-accent)" opacity="0.8" />
      {/* face */}
      <ellipse cx="40" cy="34" rx="12" ry="13" fill="#FDDBB4" />
      {/* eyes */}
      <ellipse cx="35.5" cy="31" rx="2" ry="2.2" fill="#2C1810" />
      <ellipse cx="44.5" cy="31" rx="2" ry="2.2" fill="#2C1810" />
      <circle cx="36.2" cy="30.2" r="0.7" fill="white" />
      <circle cx="45.2" cy="30.2" r="0.7" fill="white" />
      {/* smile */}
      <path d="M36 37 Q40 41 44 37" stroke="#C0625A" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* gown */}
      <path d="M26 47 Q22 57 22 70 L58 70 Q58 57 54 47 Q46 54 40 53 Q34 54 26 47Z" fill="#1a237e" opacity="0.85" />
      {/* diploma scroll */}
      <rect x="28" y="57" width="10" height="7" rx="1.5" fill="white" opacity="0.6" />
      <line x1="29.5" y1="59.5" x2="36.5" y2="59.5" stroke="var(--c-accent)" strokeWidth="0.8" />
      <line x1="29.5" y1="61.5" x2="36.5" y2="61.5" stroke="var(--c-accent)" strokeWidth="0.8" />
    </svg>
  )
}

function SisterAvatar({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Sister">
      {/* long hair */}
      <path d="M27 26 Q26 14 40 13 Q54 14 53 26 Q50 18 40 18 Q30 18 27 26Z" fill="#3C1810" />
      <path d="M27 26 Q24 40 26 60" stroke="#3C1810" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M53 26 Q56 40 54 60" stroke="#3C1810" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* hair ribbon */}
      <path d="M35 14 Q37 12 39 14 Q37 16 35 14Z" fill="var(--c-accent)" />
      <path d="M41 14 Q43 12 45 14 Q43 16 41 14Z" fill="var(--c-accent)" />
      <circle cx="40" cy="14" r="1.5" fill="var(--c-accent)" />
      {/* face */}
      <ellipse cx="40" cy="32" rx="12" ry="13" fill="#FDDBB4" />
      {/* eyes */}
      <ellipse cx="35.5" cy="29" rx="2.2" ry="2.5" fill="#2C1810" />
      <ellipse cx="44.5" cy="29" rx="2.2" ry="2.5" fill="#2C1810" />
      <circle cx="36.2" cy="28" r="0.7" fill="white" />
      <circle cx="45.2" cy="28" r="0.7" fill="white" />
      {/* blush */}
      <ellipse cx="33" cy="33" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.6" />
      <ellipse cx="47" cy="33" rx="3" ry="1.5" fill="#F4A0A0" opacity="0.6" />
      {/* nose + mouth */}
      <ellipse cx="40" cy="33" rx="1.2" ry="0.8" fill="#E8A882" />
      <path d="M36.5 36.5 Q40 39 43.5 36.5" stroke="#C0625A" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* kameez */}
      <path d="M26 45 Q22 57 22 70 L58 70 Q58 57 54 45 Q46 52 40 51 Q34 52 26 45Z" fill="var(--c-accent)" opacity="0.7" />
    </svg>
  )
}

function BrotherAvatar({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Brother">
      {/* hair */}
      <path d="M27 25 Q27 13 40 13 Q53 13 53 25 Q50 19 40 19 Q30 19 27 25Z" fill="#2C1810" />
      {/* face */}
      <ellipse cx="40" cy="33" rx="12" ry="13" fill="#FDDBB4" />
      {/* eyes */}
      <ellipse cx="35.5" cy="30" rx="2" ry="2.2" fill="#2C1810" />
      <ellipse cx="44.5" cy="30" rx="2" ry="2.2" fill="#2C1810" />
      <circle cx="36.2" cy="29.2" r="0.6" fill="white" />
      <circle cx="45.2" cy="29.2" r="0.6" fill="white" />
      {/* eyebrows */}
      <path d="M33 27 Q35.5 25.5 38 27" stroke="#2C1810" strokeWidth="1.2" fill="none" />
      <path d="M42 27 Q44.5 25.5 47 27" stroke="#2C1810" strokeWidth="1.2" fill="none" />
      {/* nose + smile */}
      <ellipse cx="40" cy="33" rx="1.2" ry="0.8" fill="#E8A882" />
      <path d="M37 36.5 Q40 38.5 43 36.5" stroke="#A0522D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* shirt */}
      <path d="M26 46 Q22 57 22 70 L58 70 Q58 57 54 46 Q46 53 40 52 Q34 53 26 46Z" fill="var(--c-accent)" opacity="0.65" />
      <rect x="38" y="48" width="4" height="14" fill="white" opacity="0.2" />
    </svg>
  )
}

function CoupleAvatar({ size = 100 }: { size?: number }) {
  // Two small side-by-side figures
  const s = size * 0.55
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 110 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Couple">
      {/* Bride left */}
      <g transform="translate(0,0) scale(0.65)">
        <ellipse cx="35" cy="30" rx="11" ry="12" fill="#FDDBB4" />
        <path d="M24 26 Q24 14 35 13 Q46 14 46 26 Q42 20 35 20 Q28 20 24 26Z" fill="var(--c-accent)" opacity="0.7" />
        <ellipse cx="30" cy="28" rx="1.8" ry="2" fill="#2C1810" />
        <ellipse cx="40" cy="28" rx="1.8" ry="2" fill="#2C1810" />
        <path d="M32 34 Q35 37 38 34" stroke="#C0625A" strokeWidth="1.1" fill="none" strokeLinecap="round" />
        <path d="M22 42 Q20 56 20 68 L50 68 Q50 56 48 42 Q35 49 22 42Z" fill="var(--c-accent)" opacity="0.75" />
      </g>
      {/* Heart between them */}
      <path d="M48 30 Q48 26 52 28 Q56 26 56 30 Q56 34 52 37 Q48 34 48 30Z" fill="var(--c-accent)" opacity="0.9" />
      {/* Groom right */}
      <g transform="translate(57,0) scale(0.65)">
        <ellipse cx="35" cy="30" rx="11" ry="12" fill="#FDDBB4" />
        <path d="M24 24 Q24 13 35 12 Q46 13 46 24 Q42 19 35 19 Q28 19 24 24Z" fill="#2C1810" opacity="0.85" />
        <ellipse cx="30" cy="28" rx="1.8" ry="2" fill="#2C1810" />
        <ellipse cx="40" cy="28" rx="1.8" ry="2" fill="#2C1810" />
        <path d="M32 34 Q35 36.5 38 34" stroke="#A0522D" strokeWidth="1.1" fill="none" strokeLinecap="round" />
        <path d="M22 42 Q20 56 20 68 L50 68 Q50 56 48 42Z" fill="#2C1810" opacity="0.8" />
        <circle cx="35" cy="52" r="1.1" fill="var(--c-accent)" />
        <circle cx="35" cy="58" r="1.1" fill="var(--c-accent)" />
      </g>
    </svg>
  )
}

function DefaultAvatar({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Person">
      {/* head */}
      <ellipse cx="40" cy="30" rx="14" ry="15" fill="#FDDBB4" />
      {/* hair */}
      <path d="M26 26 Q26 12 40 12 Q54 12 54 26 Q50 20 40 20 Q30 20 26 26Z" fill="#3C1810" />
      {/* eyes */}
      <ellipse cx="35" cy="28" rx="2.2" ry="2.4" fill="#2C1810" />
      <ellipse cx="45" cy="28" rx="2.2" ry="2.4" fill="#2C1810" />
      <circle cx="35.8" cy="27" r="0.7" fill="white" />
      <circle cx="45.8" cy="27" r="0.7" fill="white" />
      {/* nose + smile */}
      <ellipse cx="40" cy="32" rx="1.3" ry="0.9" fill="#E8A882" />
      <path d="M36 36 Q40 40 44 36" stroke="#C0625A" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* body */}
      <path d="M24 45 Q20 57 20 70 L60 70 Q60 57 56 45 Q46 53 40 52 Q34 53 24 45Z" fill="var(--c-accent)" opacity="0.65" />
    </svg>
  )
}

// ─── Main Export ────────────────────────────────────────────────────────────

export function RelationAvatar({
  relation,
  size = 80,
  className = '',
}: {
  relation?: string
  size?: number
  className?: string
}) {
  const type = detectRelation(relation)

  const avatarMap: Record<RelationType, React.ReactNode> = {
    bride: <BrideAvatar size={size} />,
    groom: <GroomAvatar size={size} />,
    father: <FatherAvatar size={size} />,
    mother: <MotherAvatar size={size} />,
    grandmother: <GrandmotherAvatar size={size} />,
    grandfather: <GrandfatherAvatar size={size} />,
    friend: <FriendAvatar size={size} />,
    baby: <BabyAvatar size={size} />,
    graduate: <GraduateAvatar size={size} />,
    sister: <SisterAvatar size={size} />,
    brother: <BrotherAvatar size={size} />,
    couple: <CoupleAvatar size={size} />,
    default: <DefaultAvatar size={size} />,
  }

  return (
    <span
      className={`relation-avatar-wrap inline-flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {avatarMap[type]}
    </span>
  )
}
