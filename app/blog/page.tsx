import { Metadata } from 'next'
import { BLOG_POSTS } from '@/lib/blog/data'
import { BlogIndexClient } from '@/components/blog/blog-index-client'
import { getPageAlternates, PUBLIC_ROBOTS, SITE_URL, SITE_PUBLISHER } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Wedding Card Wording & Digital Card Guides | Cardzy Blog',
  description:
    'Expert guides on wedding card wording in Urdu & English, 3D animated Eid wishes, and WhatsApp RSVP tools. Explore free wording templates and start creating!',
  keywords: [
    'wedding card wording',
    'Urdu Eid wishes',
    'digital invitation guides',
    'Pakistani wedding card wording',
    'Eid wish card tutorial',
    'smart digital visiting cards',
    'WhatsApp RSVP tracking',
    'animated greeting card ideas',
    'Cardzy blog',
  ],
  publisher: SITE_PUBLISHER,
  alternates: getPageAlternates('/blog'),
  robots: PUBLIC_ROBOTS,
  openGraph: {
    title: 'Wedding Card Wording & Digital Card Guides | Cardzy Blog',
    description:
      'Expert guides on wedding card wording in Urdu & English, 3D animated Eid wishes, and WhatsApp RSVP tools. Explore free wording templates and start creating!',
    url: `${SITE_URL}/blog`,
    siteName: 'Cardzy Digital Cards',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Card Wording & Digital Card Guides | Cardzy Blog',
    description:
      'Expert guides on wedding card wording in Urdu & English, 3D animated Eid wishes, and WhatsApp RSVP tools. Explore free wording templates and start creating!',
    images: ['/og-image.jpg'],
  },
}

export default function BlogIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Cardzy Digital Cards Blog',
    description: 'Guides, tips, and inspiration for royal digital invitations, Eid wishes, and business vCards.',
    url: 'https://cardzy.online/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Cardzy',
      logo: 'https://cardzy.online/favicon.svg',
    },
    blogPost: BLOG_POSTS.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.metaDescription,
      url: `https://cardzy.online/blog/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: {
        '@type': 'Person',
        name: post.author.name,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogIndexClient />
    </>
  )
}
