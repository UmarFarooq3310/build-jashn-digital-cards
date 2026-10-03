export type AudioCategory =
  | 'all'
  | 'wedding'
  | 'islamic'
  | 'birthday'
  | 'romantic'
  | 'festive'
  | 'milestone'
  | 'ambient'

export interface AudioTrack {
  id: string
  name: string
  description: string
  category: AudioCategory
  tag: string
  src: string
  icon: string
}

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'none',
    name: 'No Music (Silent)',
    description: 'Keep card completely silent with no background playback',
    category: 'all',
    tag: 'Silent',
    src: '',
    icon: 'VolumeX',
  },
  // --- 1. Wedding & Classical Celebrations (4 tracks) ---
  {
    id: 'wedding-shehnai',
    name: 'Royal Wedding Shehnai & Dholki 💍',
    description: 'Majestic shehnai & festive dholak for Baraat, Nikkah, Shaadi & Walima',
    category: 'wedding',
    tag: 'Wedding / Nikkah',
    src: '/sounds/wedding-shehnai.m4a',
    icon: 'Music',
  },
  {
    id: 'punjabi-bhangra',
    name: 'Punjabi Dhol Beats & Bhangra 🥁',
    description: 'High-energy live Punjabi dhol rhythm for Mehndi, Sangeet & Mayun',
    category: 'wedding',
    tag: 'Mehndi / Sangeet',
    src: '/sounds/mehndi-dholki.m4a',
    icon: 'Music',
  },
  {
    id: 'indian-sitar',
    name: 'Traditional Sitar & Classical Raag 🪕',
    description: 'Serene Indian classical sitar & tanpura for Pooja, Mandap & Mushaira',
    category: 'wedding',
    tag: 'Classical / Mandap',
    src: '/sounds/wedding.m4a',
    icon: 'Music',
  },
  {
    id: 'dholak-tappe',
    name: 'Folk Dholak & Ladies Sangeet Tappe 🌸',
    description: 'Traditional folk dholak rhythm for Haldi, Ladies Sangeet & Dholki',
    category: 'wedding',
    tag: 'Dholki / Haldi',
    src: '/sounds/dholki.m4a',
    icon: 'Flower2',
  },

  // --- 2. Islamic & Spiritual Celebrations (3 tracks) ---
  {
    id: 'islamic-oud',
    name: 'Spiritual Oud & Nay Melody 🌙',
    description: 'Peaceful Middle Eastern oud and soulful flute for Eid, Ramadan & Chand Raat',
    category: 'islamic',
    tag: 'Eid & Ramadan',
    src: '/sounds/eid-chime.m4a',
    icon: 'Moon',
  },
  {
    id: 'islamic-chime',
    name: 'Peaceful Islamic Blessing Chimes 🕌',
    description: 'Subtle spiritual chimes for Jumma, Hajj, Umrah, Milad & Roza Kushai',
    category: 'islamic',
    tag: 'Jumma & Blessings',
    src: '/sounds/islamic.m4a',
    icon: 'Sparkles',
  },
  {
    id: 'sufi-harmonium',
    name: 'Soulful Sufi Harmonium & Qawwali ✨',
    description: 'Rich devotional harmonium drone and phrasing for Sufi Mehfils & Urs',
    category: 'islamic',
    tag: 'Sufi Mehfil',
    src: '/sounds/sufi-harmonium.m4a',
    icon: 'Sun',
  },

  // --- 3. Birthdays & Milestones (3 tracks) ---
  {
    id: 'birthday-festive',
    name: 'Festive Birthday Dholki Tune 🎂',
    description: 'Upbeat birthday celebration with joyful rhythm for birthday parties',
    category: 'birthday',
    tag: 'Birthday Party',
    src: '/sounds/birthday-dholki.m4a',
    icon: 'Cake',
  },
  {
    id: 'birthday-chime',
    name: 'Gentle Happy Birthday Chime 🎈',
    description: 'Sweet music box glockenspiel birthday chime for kids and loved ones',
    category: 'birthday',
    tag: 'Sweet Birthday',
    src: '/sounds/birthday.m4a',
    icon: 'Gift',
  },
  {
    id: 'baby-lullaby',
    name: 'Music Box Baby Lullaby 🍼',
    description: 'Gentle acoustic music box chime for Baby Shower, New Baby & Aqiqah',
    category: 'birthday',
    tag: 'Baby Shower',
    src: '/sounds/baby-lullaby.m4a',
    icon: 'Gift',
  },

  // --- 4. Romance & Anniversaries (3 tracks) ---
  {
    id: 'romantic-piano',
    name: 'Romantic Grand Piano Ballad 🎹',
    description: 'Lush piano arpeggios for Anniversaries, Proposals & Valentine’s Day',
    category: 'romantic',
    tag: 'Anniversary & Love',
    src: '/sounds/romantic-piano.m4a',
    icon: 'Heart',
  },
  {
    id: 'romantic-strings',
    name: 'Acoustic Romance & Warm Strings 💖',
    description: 'Gentle acoustic guitar and warm orchestral strings for love wishes',
    category: 'romantic',
    tag: 'Romance & Love',
    src: '/sounds/romantic-strings.m4a',
    icon: 'Heart',
  },
  {
    id: 'friendship-soft',
    name: 'Soft Violin Friendship Melody 🎻',
    description: 'Heartwarming violin & piano for Friendship Day, Thank You & Family',
    category: 'romantic',
    tag: 'Friendship & Family',
    src: '/sounds/friendship-soft.m4a',
    icon: 'Heart',
  },

  // --- 5. Cultural Festivals & Global Holidays (3 tracks) ---
  {
    id: 'festive-garba',
    name: 'Dandiya & Garba Festive Dhol 🪘',
    description: 'Vibrant celebratory rhythm for Navratri, Garba, Dandiya & Holi',
    category: 'festive',
    tag: 'Festivals & Garba',
    src: '/sounds/festive.m4a',
    icon: 'Sparkles',
  },
  {
    id: 'celebration-party',
    name: 'Celebration Party Brass & Fanfare 🎉',
    description: 'Energetic party brass and fanfare stabs for New Year & bashes',
    category: 'festive',
    tag: 'Party & New Year',
    src: '/sounds/celebration-party.m4a',
    icon: 'PartyPopper',
  },
  {
    id: 'holiday-bells',
    name: 'Christmas Bells & Holiday Sparkle 🔔',
    description: 'Joyous holiday sleigh bells and chime harmony for Christmas',
    category: 'festive',
    tag: 'Christmas Holidays',
    src: '/sounds/holiday-bells.m4a',
    icon: 'TreePine',
  },

  // --- 6. Achievements & Victory (2 tracks) ---
  {
    id: 'achievement-brass',
    name: 'Graduation & Victory Fanfare 🎓',
    description: 'Triumphant horns and fanfare for Graduation, Promotion & New Job',
    category: 'milestone',
    tag: 'Success & Victory',
    src: '/sounds/achievement-brass.m4a',
    icon: 'Trophy',
  },
  {
    id: 'gaming-victory',
    name: 'Esports Victory Anthem 🏆',
    description: 'Fast-paced victorious synth chords for Gaming Cards & Tournaments',
    category: 'milestone',
    tag: 'Gaming & Esports',
    src: '/sounds/gaming-victory.m4a',
    icon: 'Trophy',
  },

  // --- 7. Business & Universal (2 tracks) ---
  {
    id: 'corporate-ambient',
    name: 'Modern Executive Ambient 💼',
    description: 'Sleek lo-fi Rhodes ambient tone for Digital Visiting Cards & Business',
    category: 'ambient',
    tag: 'Corporate & vCards',
    src: '/sounds/corporate-ambient.m4a',
    icon: 'Briefcase',
  },
  {
    id: 'universal-cheer',
    name: 'Universal Celebration Chimes 🌟',
    description: 'Uplifting crystal chimes for Farewell, Good Luck & Milestones',
    category: 'ambient',
    tag: 'Universal Blessings',
    src: '/sounds/general.m4a',
    icon: 'Sparkles',
  },
]

// Legacy ID aliases mapping for backward compatibility
const AUDIO_ALIASES: Record<string, string> = {
  'punjabi-bhangra-dhol': 'punjabi-bhangra',
  'punjabi-tappe-dholki': 'dholak-tappe',
  'indian-sitar-classical': 'indian-sitar',
  'general': 'universal-cheer',
  'festive': 'festive-garba',
  'dholki': 'dholak-tappe',
  'wedding': 'wedding-shehnai',
  'birthday': 'birthday-chime',
  'islamic': 'islamic-chime',
  'eid-chime': 'islamic-oud',
}

export function getAudioTrack(id: string | undefined): AudioTrack {
  if (!id) return AUDIO_TRACKS[1]
  const resolvedId = AUDIO_ALIASES[id] || id
  return AUDIO_TRACKS.find((t) => t.id === resolvedId) || AUDIO_TRACKS[1]
}

/**
 * Categorize any occasion or invitation ID into high-level event groupings
 */
export function getOccasionGroup(id: string | undefined): 'islamic' | 'wedding' | 'birthday' | 'romantic' | 'festive' | 'milestone' | 'ambient' {
  if (!id) return 'birthday'
  const cleanId = id.toLowerCase().trim()

  // 1. Mourning / Condolence (Handled separately)
  if (
    cleanId.includes('condolence') ||
    cleanId.includes('sympathy') ||
    cleanId.includes('chehlum') ||
    cleanId.includes('chelum') ||
    cleanId.includes('ashura') ||
    cleanId.includes('majlis')
  ) {
    return 'ambient'
  }

  // 2. Islamic & Spiritual
  if (
    cleanId.includes('eid') ||
    cleanId.includes('ramadan') ||
    cleanId.includes('hajj') ||
    cleanId.includes('umrah') ||
    cleanId.includes('jumma') ||
    cleanId.includes('quran') ||
    cleanId.includes('milad') ||
    cleanId.includes('roza') ||
    cleanId.includes('shab-e') ||
    cleanId.includes('arafah') ||
    cleanId.includes('gyarvi') ||
    cleanId.includes('youm-e-ali') ||
    cleanId.includes('iftaar') ||
    cleanId.includes('urs') ||
    cleanId.includes('islamic')
  ) {
    return 'islamic'
  }

  // 3. Weddings & Folk Pre-wedding
  if (
    cleanId.includes('nikah') ||
    cleanId.includes('nikkah') ||
    cleanId.includes('shaadi') ||
    cleanId.includes('barat') ||
    cleanId.includes('baraat') ||
    cleanId.includes('walima') ||
    cleanId.includes('wedding') ||
    cleanId.includes('engagement') ||
    cleanId.includes('baat-pakki') ||
    cleanId.includes('mehndi') ||
    cleanId.includes('dholki') ||
    cleanId.includes('sangeet') ||
    cleanId.includes('mayun') ||
    cleanId.includes('haldi') ||
    cleanId.includes('bridal-shower') ||
    cleanId.includes('reception')
  ) {
    return 'wedding'
  }

  // 4. Romantic & Anniversaries
  if (
    cleanId.includes('anniversary') ||
    cleanId.includes('valentine') ||
    cleanId.includes('proposal') ||
    cleanId.includes('love') ||
    cleanId.includes('poetry') ||
    cleanId.includes('shayari')
  ) {
    return 'romantic'
  }

  // 5. Birthdays & Baby
  if (
    cleanId.includes('birthday') ||
    cleanId.includes('baby') ||
    cleanId.includes('gender-reveal') ||
    cleanId.includes('aqiqah')
  ) {
    return 'birthday'
  }

  // 6. Cultural Festivals & Global Holidays
  if (
    cleanId.includes('diwali') ||
    cleanId.includes('holi') ||
    cleanId.includes('navratri') ||
    cleanId.includes('garba') ||
    cleanId.includes('dandiya') ||
    cleanId.includes('janmashtami') ||
    cleanId.includes('raksha-bandhan') ||
    cleanId.includes('maha-shivratri') ||
    cleanId.includes('baisakhi') ||
    cleanId.includes('vaisakhi') ||
    cleanId.includes('basant') ||
    cleanId.includes('christmas') ||
    cleanId.includes('new-year') ||
    cleanId.includes('halloween') ||
    cleanId.includes('easter') ||
    cleanId.includes('nowruz') ||
    cleanId.includes('lantern') ||
    cleanId.includes('lohri') ||
    cleanId.includes('purim')
  ) {
    return 'festive'
  }

  // 7. Achievements & Milestones & Gaming
  if (
    cleanId.includes('graduation') ||
    cleanId.includes('job') ||
    cleanId.includes('promotion') ||
    cleanId.includes('exam') ||
    cleanId.includes('phd') ||
    cleanId.includes('license') ||
    cleanId.includes('trophy') ||
    cleanId.includes('visa') ||
    cleanId.includes('sports') ||
    cleanId.includes('gaming') ||
    cleanId.includes('esports') ||
    cleanId.includes('pubg') ||
    cleanId.includes('winner')
  ) {
    return 'milestone'
  }

  // 8. Professional & Corporate
  if (
    cleanId.includes('business') ||
    cleanId.includes('shop') ||
    cleanId.includes('office') ||
    cleanId.includes('seminar') ||
    cleanId.includes('product-launch') ||
    cleanId.includes('vcard') ||
    cleanId.includes('corporate')
  ) {
    return 'ambient'
  }

  return 'birthday'
}

/**
 * Returns an appropriate default audio track based on the occasion or invitation type ID.
 */
export function getDefaultAudioTrackForOccasion(id: string | undefined): string {
  if (!id) return 'birthday-festive'
  const cleanId = id.toLowerCase().trim()

  // Condolence / Solemn remembrance → Silent default
  if (
    cleanId.includes('condolence') ||
    cleanId.includes('sympathy') ||
    cleanId.includes('ashura') ||
    cleanId.includes('chehlum') ||
    cleanId.includes('chelum') ||
    cleanId.includes('majlis')
  ) {
    return 'none'
  }

  // Islamic Events
  if (
    cleanId.includes('eid') ||
    cleanId.includes('ramadan') ||
    cleanId.includes('chand-raat')
  ) {
    return 'islamic-oud'
  }

  if (
    cleanId.includes('jumma') ||
    cleanId.includes('hajj') ||
    cleanId.includes('umrah') ||
    cleanId.includes('milad') ||
    cleanId.includes('quran') ||
    cleanId.includes('roza') ||
    cleanId.includes('shab-e') ||
    cleanId.includes('arafah') ||
    cleanId.includes('iftaar')
  ) {
    return 'islamic-chime'
  }

  if (cleanId.includes('qawwali') || cleanId.includes('mushaira') || cleanId.includes('urs') || cleanId.includes('gyarvi')) {
    return 'sufi-harmonium'
  }

  // Punjabi & Folk celebrations
  if (
    cleanId.includes('mehndi') ||
    cleanId.includes('sangeet') ||
    cleanId.includes('bhangra') ||
    cleanId.includes('basant') ||
    cleanId.includes('vaisakhi') ||
    cleanId.includes('baisakhi')
  ) {
    return 'punjabi-bhangra'
  }

  if (cleanId.includes('dholki') || cleanId.includes('haldi') || cleanId.includes('mayun') || cleanId.includes('kitty-party')) {
    return 'dholak-tappe'
  }

  // Classical Indian
  if (
    cleanId.includes('diwali') ||
    cleanId.includes('janmashtami') ||
    cleanId.includes('raksha-bandhan') ||
    cleanId.includes('maha-shivratri') ||
    cleanId.includes('buddha-purnima')
  ) {
    return 'indian-sitar'
  }

  // Garba & Navratri
  if (cleanId.includes('garba') || cleanId.includes('dandiya') || cleanId.includes('holi')) {
    return 'festive-garba'
  }

  // Wedding Core
  if (
    cleanId.includes('nikah') ||
    cleanId.includes('nikkah') ||
    cleanId.includes('barat') ||
    cleanId.includes('baraat') ||
    cleanId.includes('walima') ||
    cleanId.includes('shaadi') ||
    cleanId.includes('wedding') ||
    cleanId.includes('engagement') ||
    cleanId.includes('baat-pakki') ||
    cleanId.includes('reception') ||
    cleanId.includes('bridal-shower')
  ) {
    return 'wedding-shehnai'
  }

  // Baby & Kids
  if (cleanId.includes('baby') || cleanId.includes('gender-reveal') || cleanId.includes('aqiqah')) {
    return 'baby-lullaby'
  }

  // Romance & Anniversaries
  if (cleanId.includes('anniversary') || cleanId.includes('golden-anniversary')) {
    return 'romantic-piano'
  }

  if (cleanId.includes('valentine') || cleanId.includes('proposal') || cleanId.includes('love') || cleanId.includes('poetry') || cleanId.includes('shayari')) {
    return 'romantic-strings'
  }

  // Christmas & Holidays
  if (cleanId.includes('christmas')) {
    return 'holiday-bells'
  }

  // New Year & Party
  if (cleanId.includes('new-year') || cleanId.includes('party')) {
    return 'celebration-party'
  }

  // Gaming
  if (cleanId.includes('gaming') || cleanId.includes('esports') || cleanId.includes('pubg') || cleanId.includes('free-fire')) {
    return 'gaming-victory'
  }

  // Achievements & Milestones
  if (
    cleanId.includes('graduation') ||
    cleanId.includes('promotion') ||
    cleanId.includes('job') ||
    cleanId.includes('exam') ||
    cleanId.includes('defense') ||
    cleanId.includes('trophy') ||
    cleanId.includes('license')
  ) {
    return 'achievement-brass'
  }

  // Corporate & Professional vCards
  if (
    cleanId.includes('business') ||
    cleanId.includes('shop') ||
    cleanId.includes('office') ||
    cleanId.includes('seminar') ||
    cleanId.includes('corporate') ||
    cleanId.includes('vcard')
  ) {
    return 'corporate-ambient'
  }

  // Warm Friendship & Family
  if (
    cleanId.includes('friendship') ||
    cleanId.includes('mothers-day') ||
    cleanId.includes('fathers-day') ||
    cleanId.includes('thank-you') ||
    cleanId.includes('miss-you') ||
    cleanId.includes('get-well') ||
    cleanId.includes('parents') ||
    cleanId.includes('daughters') ||
    cleanId.includes('sisters') ||
    cleanId.includes('family')
  ) {
    return 'friendship-soft'
  }

  // Birthdays default
  return 'birthday-festive'
}

/**
 * Returns filtered list of audio tracks specifically matched to the occasion,
 * while always including the silent option.
 */
export function getAudioTracksForOccasion(id: string | undefined): AudioTrack[] {
  const group = getOccasionGroup(id)
  const silent = AUDIO_TRACKS[0] // 'none'

  const tracksByGroup: Record<string, string[]> = {
    islamic: ['islamic-oud', 'islamic-chime', 'sufi-harmonium', 'universal-cheer'],
    wedding: ['wedding-shehnai', 'punjabi-bhangra', 'indian-sitar', 'dholak-tappe', 'romantic-piano'],
    birthday: ['birthday-festive', 'birthday-chime', 'celebration-party', 'baby-lullaby'],
    romantic: ['romantic-piano', 'romantic-strings', 'friendship-soft', 'wedding-shehnai'],
    festive: ['festive-garba', 'indian-sitar', 'punjabi-bhangra', 'celebration-party', 'holiday-bells'],
    milestone: ['achievement-brass', 'celebration-party', 'gaming-victory', 'universal-cheer'],
    ambient: ['corporate-ambient', 'universal-cheer', 'friendship-soft', 'romantic-piano'],
  }

  const allowedIds = tracksByGroup[group] || ['birthday-festive', 'birthday-chime', 'celebration-party']
  const matched = AUDIO_TRACKS.filter((t) => allowedIds.includes(t.id))

  // Ensure current default for this specific occasion is at the front
  const defaultId = getDefaultAudioTrackForOccasion(id)
  matched.sort((a, b) => (a.id === defaultId ? -1 : b.id === defaultId ? 1 : 0))

  return [silent, ...matched]
}
