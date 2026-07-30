import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Cardzy',
  description:
    'Find answers to common questions about creating digital wish cards, wedding invitations, WhatsApp RSVPs, pricing, and custom photos on Cardzy.',
  alternates: {
    canonical: 'https://cardzy.online/faq',
  },
}

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
