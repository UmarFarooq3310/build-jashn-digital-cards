import { Metadata } from 'next'
import { getPageAlternates, PUBLIC_ROBOTS } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Sign Up Free — Create Digital Cards & Invites | Cardzy',
  description: 'Create your free Cardzy account to start designing animated 3D wish cards, digital wedding invitations, and smart business cards.',
  keywords: [
    'Cardzy signup',
    'free digital cards account',
    'register Cardzy',
    'create free wish cards',
  ],
  alternates: getPageAlternates('/signup'),
  robots: PUBLIC_ROBOTS,
}

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
