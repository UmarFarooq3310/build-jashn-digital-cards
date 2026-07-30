import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Cardzy Digital Cards',
  description:
    'Terms of service and user agreement for Cardzy digital wish cards and event invitation platform.',
  alternates: {
    canonical: 'https://cardzy.online/terms',
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
