import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const frequentUpdateDate = new Date('2026-09-27')
  const monthlyUpdateDate = new Date('2026-09-01')
  const yearlyUpdateDate = new Date('2026-06-15')

  // ─── Static pages ────────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    // Core app pages
    {
      url: SITE_URL,
      lastModified: frequentUpdateDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/poetry`,
      lastModified: frequentUpdateDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/calendar`,
      lastModified: frequentUpdateDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: frequentUpdateDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/custom-order`,
      lastModified: frequentUpdateDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/create-wish`,
      lastModified: monthlyUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/create-invitation`,
      lastModified: monthlyUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/create-magic-link`,
      lastModified: frequentUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/create-visiting-card`,
      lastModified: monthlyUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Utility pages
    {
      url: `${SITE_URL}/pricing`,
      lastModified: monthlyUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: monthlyUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/eid-mubarak-cards`,
      lastModified: monthlyUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Guide pages
    {
      url: `${SITE_URL}/guide`,
      lastModified: frequentUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guide/eid-wording-ideas`,
      lastModified: frequentUpdateDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/guide/pakistani-wedding-invitations`,
      lastModified: frequentUpdateDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/guide/poetry-for-cards-and-invitations`,
      lastModified: frequentUpdateDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/guide/birthday-wishes-wording`,
      lastModified: monthlyUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guide/magic-links-guide`,
      lastModified: frequentUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Company / info pages
    {
      url: `${SITE_URL}/about`,
      lastModified: monthlyUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/authors`,
      lastModified: monthlyUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/authors/umar-farooq`,
      lastModified: monthlyUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/authors/kainat`,
      lastModified: monthlyUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/authors/hasnain`,
      lastModified: monthlyUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: monthlyUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/campaign`,
      lastModified: monthlyUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Legal pages
    {
      url: `${SITE_URL}/cookies`,
      lastModified: yearlyUpdateDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: yearlyUpdateDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified: yearlyUpdateDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/terms-of-service`,
      lastModified: yearlyUpdateDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ]

  // ─── Blog posts (all 28 — hardcoded so Google always detects them) ───────────
  const blogRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog/the-ultimate-guide-to-cardzy-poetry-treasury-and-story-cards`,
      lastModified: new Date('2026-09-24'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog/top-10-creative-ways-to-use-magic-links-for-digital-cards`,
      lastModified: new Date('2026-09-21'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog/how-read-receipts-are-changing-digital-invitations`,
      lastModified: new Date('2026-09-21'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog/magic-links-real-time-view-tracking-digital-cards`,
      lastModified: new Date('2026-09-21'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog/complete-guide-to-pakistani-wedding-invitation-wording-urdu-english`,
      lastModified: new Date('2026-08-06'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/digital-vs-paper-wedding-invitations-cost-eco-comparison`,
      lastModified: new Date('2026-08-07'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/step-by-step-guide-to-creating-personalized-eid-wishes-cards-with-photo`,
      lastModified: new Date('2026-08-09'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/smart-digital-business-cards-for-pakistani-entrepreneurs-and-executives`,
      lastModified: new Date('2026-08-10'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/how-to-manage-wedding-guest-lists-and-whatsapp-rsvps-effortlessly`,
      lastModified: new Date('2026-08-12'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/ultimate-guide-to-creating-online-invitation-cards-with-whatsapp-rsvp`,
      lastModified: new Date('2026-08-14'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/how-to-design-custom-3d-animated-wish-cards-for-birthdays-eid-anniversaries`,
      lastModified: new Date('2026-08-16'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/ultimate-guide-to-global-holiday-ecards-christmas-thanksgiving-newyear`,
      lastModified: new Date('2026-08-18'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/how-to-create-animated-birthday-wish-cards-and-party-invitations-online`,
      lastModified: new Date('2026-08-20'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/the-future-of-networking-smart-digital-business-cards-with-vcf-download`,
      lastModified: new Date('2026-08-22'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/digital-invitation-etiquette-whatsapp-social-media-sharing-tips`,
      lastModified: new Date('2026-08-24'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/mehndi-and-dholki-digital-card-ideas-music-themes-wording`,
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/best-eid-ul-adha-qurbani-wishes-cards-urdu-arabic-english`,
      lastModified: new Date('2026-08-28'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/smart-vcard-for-doctors-lawyers-engineers-smart-business-cards`,
      lastModified: new Date('2026-08-30'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/how-to-write-heartfelt-wedding-anniversary-wishes-digital-cards`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/baby-shower-aqiqah-digital-invitation-ideas-bilingual-templates`,
      lastModified: new Date('2026-09-02'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/how-to-create-free-digital-wedding-invitation-online-2026`,
      lastModified: new Date('2026-09-03'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/ramadan-mubarak-wishes-greetings-cards-iftar-party-invitations`,
      lastModified: new Date('2026-09-05'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/graduation-farewell-digital-cards-wishes-invitation-ideas`,
      lastModified: new Date('2026-09-06'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/whatsapp-rsvp-wedding-guest-management-complete-guide`,
      lastModified: new Date('2026-09-07'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/pakistani-and-islamic-wedding-timeline-etiquette-guide`,
      lastModified: new Date('2026-09-08'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/custom-gaming-victory-cards-pubg-free-fire-esports-hud`,
      lastModified: new Date('2026-09-09'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/housewarming-dawat-and-roza-kushai-digital-invitation-guide`,
      lastModified: new Date('2026-09-10'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/nfc-metal-cards-vs-smart-digital-vcards-comparison-2026`,
      lastModified: new Date('2026-09-11'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  return [...staticRoutes, ...blogRoutes]
}
