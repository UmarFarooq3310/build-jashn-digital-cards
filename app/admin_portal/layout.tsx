import { Metadata } from 'next'
import { PRIVATE_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Admin Security Portal — Cardzy Management Hub',
  description: 'Internal administration management portal for Cardzy.',
  robots: PRIVATE_ROBOTS,
}

export default function AdminPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
