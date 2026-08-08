import { Metadata } from 'next'
import { getLanguageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Security — Cardzy',
  description:
    'Learn how Cardzy protects user privacy, collects data responsibly, enforces AdSense compliance, and secures your digital cards.',
  alternates: {
    canonical: 'https://cardzy.online/privacy',
    languages: getLanguageAlternates('/privacy'),
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
