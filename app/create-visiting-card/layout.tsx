import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Smart Digital Business Card Maker (vCard) | Cardzy',
  description:
    'Create interactive smart digital business cards for executives and entrepreneurs in Pakistan. Share via QR code & WhatsApp with 1-tap contact save.',
  alternates: {
    canonical: 'https://cardzy.online/create-visiting-card',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CreateVisitingCardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
