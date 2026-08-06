import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Birthday Wish Wording Ideas & Messages — Cardzy',
  description:
    'Heartfelt, funny, and formal birthday wishes for every kind of card. Copy-ready messages for family, friends, coworkers, and kids, plus tips for animated birthday cards.',
  alternates: {
    canonical: 'https://cardzy.online/guide/birthday-wishes-wording',
  },
  keywords: [
    'birthday wishes wording',
    'birthday card messages',
    'funny birthday wishes',
    'birthday message for friend',
    'happy birthday quotes',
    'digital birthday card ideas',
  ],
}

export default function BirthdayGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
