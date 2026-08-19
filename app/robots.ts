import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin_portal',
          '/admin_portal/',
          '/dashboard',
          '/dashboard/',
          '/api/',
          '/i/',
          '/w/',
          '/v/',
        ],
      },
      {
        userAgent: 'Mediapartners-Google',
        allow: '/',
      },
    ],
    sitemap: 'https://cardzy.online/sitemap.xml',
  }
}
