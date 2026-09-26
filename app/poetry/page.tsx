import { Metadata } from 'next'
import { PoetryClient } from './poetry-client'
import { POETRY_DATABASE, POET_PROFILES } from '@/lib/jashn/poetry-data'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Poetry & Shayari Explorer — Urdu Ghazals, Translations & Card Wording | Cardzy',
  description:
    'Explore verified Urdu & classical poetry by Allama Iqbal, Mirza Ghalib, Faiz Ahmad Faiz, Jaun Elia, Ahmad Faraz, Parveen Shakir & Rumi. Includes Nastaliq Urdu, Roman transliterations, English translations, and 1-click 3D Card creation.',
  keywords: [
    'urdu poetry',
    'shayari',
    'allama iqbal shayari',
    'mirza ghalib ghazal',
    'faiz ahmad faiz poetry',
    'jaun elia shayari',
    'ahmad faraz ghazal',
    'parveen shakir khushboo',
    'wedding poetry urdu',
    'nikkah shayari',
    'love poetry urdu english',
    'sufi poetry rumi bulleh shah',
    'birthday shayari',
    'urdu quotes for wedding invitation',
    'cardzy poetry explorer',
  ],
  alternates: {
    canonical: `${SITE_URL}/poetry`,
  },
  openGraph: {
    title: 'Poetry & Shayari Explorer — Urdu Ghazals, Translations & Card Wording | Cardzy',
    description:
      'Curated public-domain poetry treasury with authentic Nastaliq Urdu, Roman Urdu, English translations, and instant 1-click 3D card generator.',
    url: `${SITE_URL}/poetry`,
    siteName: 'Cardzy',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Cardzy Poetry & Shayari Treasury',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Poetry & Shayari Explorer — Urdu Ghazals & Card Generator | Cardzy',
    description:
      'Discover verified classical poetry from Iqbal, Ghalib, Faiz, Jaun Elia, Faraz, Parveen Shakir & Rumi with translations & 1-click card tools.',
    images: [`${SITE_URL}/og-image.png`],
  },
}

import { Suspense } from 'react'

export default function PoetryPage() {
  // Generate JSON-LD Schema for rich search snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/poetry#webpage`,
        url: `${SITE_URL}/poetry`,
        name: 'Poetry & Shayari Explorer — Classical & Modern Poetry Treasury',
        description:
          'Verified Urdu, Punjabi, Persian and English classical poetry with translations and 1-click 3D greeting card bridges.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          name: 'Cardzy',
          url: SITE_URL,
        },
        inLanguage: ['ur', 'en', 'fa', 'pa', 'ar'],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Poetry Explorer',
            item: `${SITE_URL}/poetry`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        itemListElement: POETRY_DATABASE.slice(0, 10).map((poem, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            name: poem.title,
            author: {
              '@type': 'Person',
              name: poem.poet,
            },
            inLanguage: poem.originalLanguage,
            text: poem.originalText,
            abstract: poem.englishTranslation,
            genre: poem.categoryLabel,
          },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-amber-300 text-sm">Loading Poetry Treasury...</div>}>
        <PoetryClient />
      </Suspense>
    </>
  )
}
