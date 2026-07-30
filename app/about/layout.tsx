import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Connecting Celebrations Worldwide | Cardzy',
  description:
    'Learn about Cardzy, our mission, and how we empower families and businesses worldwide with 4K animated wish cards and digital event invitations.',
  alternates: {
    canonical: 'https://cardzy.online/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
