import type { Metadata } from 'next'
import { CreateWishWrapper } from './create-wish-wrapper'
import { CreateWishProse } from './create-wish-prose'

export const metadata: Metadata = {
  title: 'Create 3D Animated Wish Cards | Cardzy',
  description: 'Design and personalize 3D animated greeting cards for Eid, Birthdays, Anniversaries, and Ramadan with photos, music, and WhatsApp sharing.',
  alternates: {
    canonical: 'https://cardzy.online/create-wish',
  },
}

export default function CreateWishPage() {
  return (
    <>
      <CreateWishWrapper />
      <CreateWishProse />
    </>
  )
}
