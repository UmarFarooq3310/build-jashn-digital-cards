import type { Metadata } from 'next'
import { CreateMagicLinkWrapper } from './create-magic-link-wrapper'
import { CreateMagicLinkProse } from './create-magic-link-prose'
import { getPageAlternates, PUBLIC_ROBOTS, SITE_PUBLISHER } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Create 3D Animated Magic Links & Love Proposal Cards | Cardzy',
  description:
    'Create interactive 3D magic links with velvet ring box proposal, blowable birthday candles, popping balloons & love confessions. Free 1-click WhatsApp sharing!',
  keywords: [
    'marriage proposal card online',
    '3D ring box online proposal',
    'will you marry me card',
    'interactive magic link',
    'animated birthday card link',
    'digital love confession card',
    'WhatsApp magic celebration link',
    'online anniversary surprise',
    'Cardzy magic link',
  ],
  publisher: SITE_PUBLISHER,
  alternates: getPageAlternates('/create-magic-link'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Create 3D Animated Magic Links & Love Proposal Cards | Cardzy',
    description:
      'Create interactive 3D magic links with velvet ring box proposal, blowable birthday candles, popping balloons & love confessions. Free 1-click WhatsApp sharing!',
    url: 'https://cardzy.online/create-magic-link',
    siteName: 'Cardzy',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Create 3D Animated Magic Links — Cardzy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create 3D Animated Magic Links & Love Proposal Cards | Cardzy',
    description:
      'Create interactive 3D magic links with velvet ring box proposal, blowable birthday candles, popping balloons & love confessions. Free 1-click WhatsApp sharing!',
    images: ['/og-image.jpg'],
  },
}

export default function CreateMagicLinkPage() {
  return (
    <>
      <CreateMagicLinkWrapper />
      <CreateMagicLinkProse />
    </>
  )
}
