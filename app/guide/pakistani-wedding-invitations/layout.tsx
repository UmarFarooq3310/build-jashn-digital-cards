import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pakistani & Islamic Wedding Wording Guide — Cardzy',
  description:
    'Complete guide to Pakistani wedding invitation wording in Urdu and English for Nikkah, Mehndi, Barat, and Walima with Quranic verses and RSVP etiquette.',
  alternates: {
    canonical: 'https://cardzy.online/guide/pakistani-wedding-invitations',
  },
}

export default function WeddingGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
