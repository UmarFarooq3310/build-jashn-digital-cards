import { MetadataRoute } from 'next'

const DISALLOWED_PATHS = [
  '/admin_portal',
  '/admin_portal/',
  '/dashboard',
  '/dashboard/',
  '/api/',
  '/i/',
  '/w/',
  '/v/',
]

const AI_AGENTS = [
  'Amazonbot',
  'Applebot-Extended',
  'Bytespider',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'Googlebot-Extended',
  'Google-Extended',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'FacebookBot',
  'PerplexityBot',
  'cohere-ai',
  'CCBot',
  'Diffbot',
  'Mediapartners-Google',
]

export default function robots(): MetadataRoute.Robots {
  const rules = [
    {
      userAgent: '*',
      allow: '/',
      disallow: DISALLOWED_PATHS,
    },
    ...AI_AGENTS.map((agent) => ({
      userAgent: agent,
      allow: '/',
      disallow: DISALLOWED_PATHS,
    })),
  ]

  return {
    rules,
    sitemap: 'https://cardzy.online/sitemap.xml',
    host: 'https://cardzy.online',
  }
}
