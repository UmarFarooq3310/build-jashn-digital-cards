import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Eid Mubarak Special Campaign | Cardzy Digital Cards',
  description:
    'Celebrate Eid with personalized 3D animated wish cards, family photos, and custom Urdu blessings on Cardzy.',
  alternates: getPageAlternates('/campaign'),
  robots: PUBLIC_ROBOTS,
}

export default function CampaignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
