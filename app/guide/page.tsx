import type { Metadata } from 'next'
import { GuideClientContent } from './guide-content'

export const metadata: Metadata = {
  title: 'Celebration Guides & Wording Ideas — Cardzy Digital Cards',
  description:
    'Explore our collection of expert guides for designing digital invitations, animated wish cards, wedding invitations, Eid greetings, and more. Find wording templates and tips for every occasion.',
  alternates: {
    canonical: 'https://cardzy.online/guide',
  },
  }

export default function GuideIndexPage() {
  return (
    <div className="py-12 md:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <GuideClientContent />
    </div>
  )
}
