import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react'
import { GuideClientContent } from './guide-content'

export const metadata: Metadata = {
  title: 'Celebration Guides & Wording Ideas — Cardzy Digital Cards',
  description:
    'Explore our collection of expert guides for designing digital invitations, animated wish cards, wedding invitations, Eid greetings, and more. Find wording templates and tips for every occasion.',
  keywords: [
    'digital invitation templates',
    'Eid Mubarak wishes wording',
    'wedding card design guides',
    'multilingual digital cards',
    'how to design invitation cards',
    'birthday card wording ideas',
  ],
}

export default function GuideIndexPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 py-12 md:py-20">
        <GuideClientContent />
      </main>
      <SiteFooter />
    </div>
  )
}
