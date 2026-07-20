import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/create-wish',
        '/create-invitation',
        '/pricing',
        '/faq',
        '/guide',
        '/guide/eid-wording-ideas',
        '/guide/pakistani-wedding-invitations',
        '/privacy',
      ],
      disallow: [
        '/dashboard',
        '/login',
        '/signup',
      ],
    },
    sitemap: 'https://cardzy.online/sitemap.xml',
  }
}
