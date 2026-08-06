import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Cardzy — Our Story, Mission & Team',
  description: 'Learn about Cardzy, the global digital card and invitation platform built for South Asian families worldwide. Our mission, story, features, and the team behind the platform.',
  alternates: { canonical: 'https://cardzy.online/about' },
  openGraph: {
    title: 'About Cardzy — Digital Wish Cards & Event Invitations',
    description: 'Cardzy is a multilingual digital celebration platform serving over 60 countries.',
    url: 'https://cardzy.online/about',
    siteName: 'Cardzy Digital Cards',
    type: 'website',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

