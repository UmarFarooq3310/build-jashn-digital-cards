import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Privacy Policy & User Data Protection Notice | Cardzy',
  description:
    "Read Cardzy's Privacy Policy. Learn how we protect personal data, enforce Google AdSense & GDPR compliance, and manage cookies securely.",
  keywords: [
    'privacy policy',
    'Cardzy data protection',
    'GDPR compliance',
    'Google AdSense privacy',
    'cookie policy',
    'user data security',
  ],
  alternates: getPageAlternates('/privacy-policy'),
  robots: PUBLIC_ROBOTS,
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
