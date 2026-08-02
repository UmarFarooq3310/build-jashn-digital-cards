import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service & Usage Policy — Cardzy',
  description:
    'Read Cardzy terms of service, user account agreement, acceptable use guidelines, and digital card creator policies.',
  alternates: {
    canonical: 'https://cardzy.online/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
