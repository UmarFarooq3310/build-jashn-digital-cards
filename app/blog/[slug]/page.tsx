import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BLOG_POSTS, getBlogPost, getLocalizedPost } from '@/lib/blog/data'
import { BlogPostClient } from '@/components/blog/blog-post-client'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ lang?: string }>
}

const SUPPORTED_LANGS = [
  'en', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de',
  'ja', 'ko', 'it', 'tr', 'id', 'ur', 'bn', 'vi', 'sw'
]

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const lang = resolvedSearchParams.lang || 'en'
  const rawPost = getBlogPost(slug)

  if (!rawPost) {
    return {
      title: 'Article Not Found | Cardzy Blog',
    }
  }

  const post = getLocalizedPost(rawPost, lang)

  const baseTitle = post.seoTitle.includes('Cardzy') ? post.seoTitle : `${post.seoTitle} — Cardzy`
  const title = baseTitle.length > 68 ? baseTitle.slice(0, 65) + '...' : baseTitle
  const description = post.metaDescription.length > 165 ? post.metaDescription.slice(0, 162) + '...' : post.metaDescription

  const languageAlternates: Record<string, string> = {}
  SUPPORTED_LANGS.forEach((l) => {
    languageAlternates[l] = l === 'en' 
      ? `https://cardzy.online/blog/${post.slug}` 
      : `https://cardzy.online/blog/${post.slug}?lang=${l}`
  })

  return {
    title,
    description,
    keywords: post.tags,
    alternates: {
      canonical: `https://cardzy.online/blog/${post.slug}${lang !== 'en' ? `?lang=${lang}` : ''}`,
      languages: languageAlternates,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `https://cardzy.online/blog/${post.slug}${lang !== 'en' ? `?lang=${lang}` : ''}`,
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

export default async function BlogPostPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const lang = resolvedSearchParams.lang || 'en'
  const rawPost = getBlogPost(slug)

  if (!rawPost) {
    notFound()
  }

  const post = getLocalizedPost(rawPost, lang)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    image: [post.featuredImage],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: lang,
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
      '@id': `https://cardzy.online/blog/${post.slug}${lang !== 'en' ? `?lang=${lang}` : ''}`,
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
