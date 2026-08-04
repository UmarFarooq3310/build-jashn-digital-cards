export interface AudioTrack {
  id: string
  name: string
  category: 'festive' | 'wedding' | 'gaming' | 'islamic' | 'romantic'
  src: string
  icon: string
}

export const AUDIO_TRACKS: AudioTrack[] = [
  { id: 'none', name: 'No Music (Silent)', category: 'festive', src: '', icon: 'VolumeX' },
  { id: 'birthday-festive', name: 'Festive Birthday Tune 🎂', category: 'festive', src: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c82a20b0.mp3', icon: 'Music' },
  { id: 'wedding-shehnai', name: 'Wedding Shehnai & Dholki 💍', category: 'wedding', src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3', icon: 'Music' },
  { id: 'gaming-victory', name: 'Esports Victory Fanfare 🏆', category: 'gaming', src: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3', icon: 'Trophy' },
  { id: 'islamic-oud', name: 'Peaceful Oud & Nasheed 🌙', category: 'islamic', src: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c35b6b1580.mp3', icon: 'Moon' },
  { id: 'romantic-strings', name: 'Romantic Violin & Piano 💖', category: 'romantic', src: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939b4d812.mp3', icon: 'Heart' },
]

export function getAudioTrack(id: string | undefined): AudioTrack {
  return AUDIO_TRACKS.find((t) => t.id === id) || AUDIO_TRACKS[0]
}
