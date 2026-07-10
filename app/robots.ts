import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/faq',
        '/guide',
        '/guide/eid-wording-ideas',
        '/guide/pakistani-wedding-invitations',
      ],
      disallow: [
        '/login',
        '/signup',
        '/dashboard',
        '/create-wish',
        '/create-invitation',
        '/pricing',
        '/privacy',
        '/i/',
        '/w/',
      ],
    },
    sitemap: 'https://jashn.app/sitemap.xml',
  }
}
