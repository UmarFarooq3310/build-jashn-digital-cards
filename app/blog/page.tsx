import { Metadata } from 'next'
import { BLOG_POSTS } from '@/lib/blog/data'
import { BlogIndexClient } from '@/components/blog/blog-index-client'

export const metadata: Metadata = {
  title: 'Cardzy Blog — Digital Cards & Event Wording Guides',
  description:
    'Explore expert guides on creating Pakistani wedding invitations, Eid wish cards with photo, NFC digital business cards, and WhatsApp RSVP management.',
  alternates: {
    canonical: 'https://cardzy.online/blog',
  },
  keywords: [
    'Pakistani wedding invitations blog',
    'Eid Mubarak wishes guide',
    'Digital business card tips',
    'Nikkah card wording ideas',
    'WhatsApp RSVP tracking guide',
  ],
  openGraph: {
    title: 'Cardzy Blog - Guides & Tips for Digital Cards',
    description: 'Expert tips on royal digital invitations, Eid wishes, and smart digital business cards.',
    url: 'https://cardzy.online/blog',
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
