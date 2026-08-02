import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Log In to Cardzy — Digital Cards Account',
  description: 'Log in to your Cardzy account to manage your digital wish cards, wedding invitations, and RSVP guest responses.',
  alternates: {
    canonical: 'https://cardzy.online/login',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
