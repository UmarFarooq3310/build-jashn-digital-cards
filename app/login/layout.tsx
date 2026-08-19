import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Log In to Cardzy — Digital Cards Account',
  description: 'Log in to your Cardzy account to manage your digital wish cards, wedding invitations, and RSVP guest responses.',
  keywords: [
    'Cardzy login',
    'digital cards account',
    'manage invitations',
    'RSVP tracking login',
  ],
  alternates: getPageAlternates('/login'),
  robots: PUBLIC_ROBOTS,
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
