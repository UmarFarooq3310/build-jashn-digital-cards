import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Security — Cardzy',
  description:
    'Learn how Cardzy protects user privacy, collects data responsibly, enforces AdSense compliance, and secures your digital cards.',
  alternates: getPageAlternates('/privacy'),
  robots: PUBLIC_ROBOTS,
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
