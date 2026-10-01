export interface AudioTrack {
  id: string
  name: string
  category: 'festive' | 'wedding' | 'gaming' | 'islamic' | 'romantic' | 'traditional' | 'punjabi'

  src: string
  icon: string
}

export const AUDIO_TRACKS: AudioTrack[] = [
  { id: 'none', name: 'No Music (Silent)', category: 'festive', src: '', icon: 'VolumeX' },
  { id: 'wedding-shehnai', name: 'Royal Wedding Shehnai & Dholki 💍', category: 'wedding', src: '/sounds/wedding-shehnai.m4a', icon: 'Music' },
  { id: 'punjabi-bhangra-dhol', name: 'Punjabi Dhol Beats & Bhangra 🥁', category: 'punjabi', src: '/sounds/mehndi-dholki.m4a', icon: 'Music' },
  { id: 'indian-sitar-classical', name: 'Traditional Indian Sitar & Raag 🪕', category: 'traditional', src: '/sounds/wedding.m4a', icon: 'Music' },
  { id: 'punjabi-tappe-dholki', name: 'Punjabi Mehndi Tappe & Dholak 🌸', category: 'punjabi', src: '/sounds/mehndi-dholki.m4a', icon: 'Flower2' },
  { id: 'birthday-festive', name: 'Festive Birthday Dholki Tune 🎂', category: 'festive', src: '/sounds/birthday-dholki.m4a', icon: 'Music' },
  { id: 'islamic-oud', name: 'Peaceful Chime & Spiritual Oud 🌙', category: 'islamic', src: '/sounds/eid-chime.m4a', icon: 'Moon' },
  { id: 'romantic-strings', name: 'Romantic Violin & Soft Melody 💖', category: 'romantic', src: '/sounds/friendship-soft.m4a', icon: 'Heart' },
  { id: 'gaming-victory', name: 'Esports Victory Fanfare 🏆', category: 'gaming', src: '/sounds/gaming-victory.m4a', icon: 'Trophy' },
]

export function getAudioTrack(id: string | undefined): AudioTrack {
  return AUDIO_TRACKS.find((t) => t.id === id) || AUDIO_TRACKS[1]
}

/**
 * Returns an appropriate default audio track based on the occasion or invitation type ID.
 */
export function getDefaultAudioTrackForOccasion(id: string | undefined): string {
  if (!id) return 'birthday-festive'
  const cleanId = id.toLowerCase().trim()

  // Punjabi & folk celebration occasions
  if (
    cleanId.includes('bhangra') ||
    cleanId.includes('baisakhi') ||
    cleanId.includes('vaisakhi') ||
    cleanId.includes('lohri') ||
    cleanId.includes('basant') ||
    cleanId.includes('dholki') ||
    cleanId.includes('sangeet') ||
    cleanId.includes('mehndi')
  ) {
    return 'punjabi-bhangra-dhol'
  }

  // Weddings & Indian classical / traditional ceremonies
  if (
    cleanId.includes('shaadi') ||
    cleanId.includes('nikkah') ||
    cleanId.includes('nikah') ||
    cleanId.includes('barat') ||
    cleanId.includes('baraat') ||
    cleanId.includes('walima') ||
    cleanId.includes('wedding') ||
    cleanId.includes('engagement') ||
    cleanId.includes('baat-pakki')
  ) {
    return 'wedding-shehnai'
  }

  // Traditional Indian cultural & festive occasions
  if (
    cleanId.includes('diwali') ||
    cleanId.includes('holi') ||
    cleanId.includes('janmashtami') ||
    cleanId.includes('raksha-bandhan') ||
    cleanId.includes('maha-shivratri') ||
    cleanId.includes('nowruz') ||
    cleanId.includes('qawwali') ||
    cleanId.includes('mushaira') ||
    cleanId.includes('garba') ||
    cleanId.includes('dandiya')
  ) {
    return 'indian-sitar-classical'
  }

  // Islamic & spiritual occasions
  if (
    cleanId.includes('eid') ||
    cleanId.includes('ramadan') ||
    cleanId.includes('hajj') ||
    cleanId.includes('umrah') ||
    cleanId.includes('jumma') ||
    cleanId.includes('quran') ||
    cleanId.includes('milad') ||
    cleanId.includes('roza')
  ) {
    return 'islamic-oud'
  }

  // Romantic occasions
  if (
    cleanId.includes('anniversary') ||
    cleanId.includes('valentine') ||
    cleanId.includes('love') ||
    cleanId.includes('proposal')
  ) {
    return 'romantic-strings'
  }

  // Gaming
  if (
    cleanId.includes('gaming') ||
    cleanId.includes('pubg') ||
    cleanId.includes('free-fire') ||
    cleanId.includes('ludo') ||
    cleanId.includes('winner') ||
    cleanId.includes('esports')
  ) {
    return 'gaming-victory'
  }

  return 'birthday-festive'
}

