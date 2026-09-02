import { Metadata } from 'next'
import { PRIVATE_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Log In to Cardzy — Manage Your Digital Cards Account',
  description: 'Log in to your Cardzy account to manage your digital wish cards, wedding invitations, and RSVP guest responses.',
  robots: PRIVATE_ROBOTS,
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
