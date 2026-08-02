import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up Free — Cardzy Digital Cards',
  description: 'Create your free Cardzy account to start designing animated 3D wish cards, digital wedding invitations, and smart business cards.',
  alternates: {
    canonical: 'https://cardzy.online/signup',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
