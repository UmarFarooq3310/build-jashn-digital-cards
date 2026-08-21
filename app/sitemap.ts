import { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blog/data'
import { SITE_URL, getLanguageAlternates } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  const staticRoutePaths = [
    { path: '/', changeFrequency: 'daily' as const, priority: 1.0 },
    { path: '/blog', changeFrequency: 'daily' as const, priority: 0.9 },
    { path: '/custom-order', changeFrequency: 'daily' as const, priority: 0.9 },
    { path: '/create-wish', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/create-invitation', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/create-visiting-card', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/pricing', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/faq', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/guide', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/guide/eid-wording-ideas', changeFrequency: 'daily' as const, priority: 0.9 },
    { path: '/guide/pakistani-wedding-invitations', changeFrequency: 'daily' as const, priority: 0.9 },
    { path: '/guide/birthday-wishes-wording', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/eid-mubarak-cards', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/authors', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/authors/umar-farooq', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/authors/kainat', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/authors/hasnain', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/cookies', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/privacy-policy', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/disclaimer', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/terms-of-service', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/campaign', changeFrequency: 'weekly' as const, priority: 0.8 },
  ]

  const staticRoutes: MetadataRoute.Sitemap = staticRoutePaths.map((route) => ({
    url: route.path === '/' ? SITE_URL : `${SITE_URL}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: getLanguageAlternates(route.path),
    },
  }))

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
    alternates: {
      languages: getLanguageAlternates(`/blog/${post.slug}`),
    },
  }))

  return [...staticRoutes, ...blogRoutes]
}

