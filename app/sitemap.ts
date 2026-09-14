import { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blog/data'
import { SITE_URL, getLanguageAlternates } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  // Use fixed dates for static pages to prevent Google from distrusting lastmod
  // Only blog routes use their actual updatedAt timestamps
  const frequentUpdateDate = new Date('2026-09-10')
  const monthlyUpdateDate = new Date('2026-09-01')
  const yearlyUpdateDate = new Date('2026-06-15')

  const staticRoutePaths = [
    { path: '/', changeFrequency: 'daily' as const, priority: 1.0, lastModified: frequentUpdateDate },
    { path: '/calendar', changeFrequency: 'daily' as const, priority: 0.9, lastModified: frequentUpdateDate },
    { path: '/blog', changeFrequency: 'daily' as const, priority: 0.9, lastModified: frequentUpdateDate },
    { path: '/custom-order', changeFrequency: 'daily' as const, priority: 0.9, lastModified: frequentUpdateDate },
    { path: '/create-wish', changeFrequency: 'weekly' as const, priority: 0.9, lastModified: monthlyUpdateDate },
    { path: '/create-invitation', changeFrequency: 'weekly' as const, priority: 0.9, lastModified: monthlyUpdateDate },
    { path: '/create-visiting-card', changeFrequency: 'weekly' as const, priority: 0.8, lastModified: monthlyUpdateDate },
    { path: '/pricing', changeFrequency: 'weekly' as const, priority: 0.8, lastModified: monthlyUpdateDate },
    { path: '/faq', changeFrequency: 'monthly' as const, priority: 0.8, lastModified: monthlyUpdateDate },
    { path: '/guide', changeFrequency: 'weekly' as const, priority: 0.8, lastModified: frequentUpdateDate },
    { path: '/guide/eid-wording-ideas', changeFrequency: 'daily' as const, priority: 0.9, lastModified: frequentUpdateDate },
    { path: '/guide/pakistani-wedding-invitations', changeFrequency: 'daily' as const, priority: 0.9, lastModified: frequentUpdateDate },
    { path: '/guide/birthday-wishes-wording', changeFrequency: 'weekly' as const, priority: 0.8, lastModified: monthlyUpdateDate },
    { path: '/eid-mubarak-cards', changeFrequency: 'weekly' as const, priority: 0.9, lastModified: monthlyUpdateDate },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8, lastModified: monthlyUpdateDate },
    { path: '/authors', changeFrequency: 'monthly' as const, priority: 0.8, lastModified: monthlyUpdateDate },
    { path: '/authors/umar-farooq', changeFrequency: 'monthly' as const, priority: 0.7, lastModified: monthlyUpdateDate },
    { path: '/authors/kainat', changeFrequency: 'monthly' as const, priority: 0.7, lastModified: monthlyUpdateDate },
    { path: '/authors/hasnain', changeFrequency: 'monthly' as const, priority: 0.7, lastModified: monthlyUpdateDate },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.8, lastModified: monthlyUpdateDate },
    { path: '/cookies', changeFrequency: 'monthly' as const, priority: 0.7, lastModified: yearlyUpdateDate },
    { path: '/privacy-policy', changeFrequency: 'yearly' as const, priority: 0.5, lastModified: yearlyUpdateDate },
    { path: '/disclaimer', changeFrequency: 'yearly' as const, priority: 0.5, lastModified: yearlyUpdateDate },
    { path: '/terms-of-service', changeFrequency: 'yearly' as const, priority: 0.5, lastModified: yearlyUpdateDate },
    { path: '/campaign', changeFrequency: 'weekly' as const, priority: 0.8, lastModified: monthlyUpdateDate },
  ]

  const staticRoutes: MetadataRoute.Sitemap = staticRoutePaths.map((route) => ({
    url: route.path === '/' ? SITE_URL : `${SITE_URL}${route.path}`,
    lastModified: route.lastModified,
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

