import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Cardzy Digital Cards',
  description:
    'Read Cardzy Privacy Policy to understand how we handle user data, security, authentication, and Google AdSense compliance.',
  alternates: {
    canonical: 'https://cardzy.online/privacy',
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
