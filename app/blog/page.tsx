import { Metadata } from 'next'
import { BLOG_POSTS } from '@/lib/blog/data'
import { BlogIndexClient } from '@/components/blog/blog-index-client'
import { getPageAlternates, PUBLIC_ROBOTS, SITE_URL } from '@/lib/seo'

interface PageProps {
  searchParams?: Promise<{ lang?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const lang = resolvedSearchParams.lang

  return {
    title: 'Cardzy Blog — Digital Cards & Event Wording Guides',
    description:
      'Explore expert guides on creating Pakistani wedding invitations, Eid wish cards with photo, smart digital business cards, and WhatsApp RSVP management.',
    alternates: getPageAlternates('/blog', lang),
    robots: PUBLIC_ROBOTS,
    openGraph: {
      title: 'Cardzy Blog - Guides & Tips for Digital Cards',
      description: 'Expert tips on royal digital invitations, Eid wishes, and smart digital business cards.',
      url: lang ? `${SITE_URL}/blog?lang=${lang}` : `${SITE_URL}/blog`,
      siteName: 'Cardzy Digital Cards',
      type: 'website',
    },
  }
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
