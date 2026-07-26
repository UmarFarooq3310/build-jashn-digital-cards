import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BLOG_POSTS, getBlogPost } from '@/lib/blog/data'
import { BlogPostClient } from '@/components/blog/blog-post-client'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: 'Article Not Found | Cardzy Blog',
    }
  }

  return {
    title: `${post.seoTitle} | Cardzy`,
    description: post.metaDescription,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `https://cardzy.online/blog/${post.slug}`,
      siteName: 'Cardzy Digital Cards',
      images: [{ url: post.featuredImage, width: 1200, height: 630 }],
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: [post.featuredImage],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    image: [post.featuredImage],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cardzy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cardzy.online/favicon.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://cardzy.online/blog/${post.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogPostClient initialPost={post} />
    </>
  )
}
