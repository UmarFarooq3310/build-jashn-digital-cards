import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cardzy | 3D Animated Digital Wish Cards & Wedding Invitations',
    short_name: 'Cardzy',
    description: 'Design, personalize, and share interactive 3D digital cards with music, photo upload, and instant WhatsApp RSVP tracking.',
    start_url: '/',
    display: 'standalone',
    background_color: '#064e3b',
    theme_color: '#064e3b',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
