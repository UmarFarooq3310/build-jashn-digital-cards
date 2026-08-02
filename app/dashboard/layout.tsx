import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cardzy User Dashboard — Manage Cards & RSVPs',
  description: 'Manage your created digital cards, event invitations, and RSVP responses.',
  alternates: {
    canonical: 'https://cardzy.online/dashboard',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
