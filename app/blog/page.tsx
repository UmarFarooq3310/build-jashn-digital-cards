import { Metadata } from 'next'
import { BLOG_POSTS } from '@/lib/blog/data'
import { BlogIndexClient } from '@/components/blog/blog-index-client'
import { getPageAlternates, PUBLIC_ROBOTS, SITE_URL, SITE_PUBLISHER } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Cardzy Blog — Digital Cards & Event Wording Guides',
  description:
    'Expert guides on Pakistani wedding invitations, Eid wish cards, smart digital business cards (vCards), and WhatsApp RSVP management.',
  keywords: [
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
    title: 'Cardzy Blog - Guides & Tips for Digital Cards',
    description: 'Expert tips on royal digital invitations, Eid wishes, and smart digital business cards.',
    url: `${SITE_URL}/blog`,
    siteName: 'Cardzy Digital Cards',
    type: 'website',
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
