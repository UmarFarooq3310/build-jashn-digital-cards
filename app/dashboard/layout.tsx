import { Metadata } from 'next'
import { PRIVATE_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Cardzy User Dashboard — Manage Digital Cards & RSVPs',
  description: 'Manage your created digital cards, event invitations, and RSVP responses.',
  robots: PRIVATE_ROBOTS,
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
