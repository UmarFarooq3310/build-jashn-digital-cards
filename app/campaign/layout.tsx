import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Eid Mubarak Special Campaign | Cardzy Digital Cards',
  description:
    'Celebrate Eid with personalized 3D animated wish cards, family photos, and custom Urdu blessings on Cardzy.',
  alternates: {
    canonical: 'https://cardzy.online/campaign',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CampaignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
