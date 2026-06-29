import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — Jashn',
  description: 'Privacy Policy for Jashn.app — how we collect, use, and protect your data.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-12 md:py-16">
        <h1 className="text-3xl font-extrabold text-primary mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: June 29, 2026</p>

        <Section title="1. Introduction">
          Welcome to Jashn (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We operate the website jashn.app (the &quot;Service&quot;). This Privacy Policy explains how we collect, use, and protect information when you use our Service.
        </Section>

        <Section title="2. Information We Collect">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Account information:</strong> Name, email address, and phone number when you register.</li>
            <li><strong>Card content:</strong> Messages, event details, and names you enter when creating wish cards or invitations.</li>
            <li><strong>Usage data:</strong> Page views, card view counts, RSVP counts, and general analytics.</li>
            <li><strong>Device data:</strong> Browser type, IP address, and device information collected automatically.</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul className="list-disc pl-5 space-y-1">
            <li>To provide and operate the Service (creating, storing, and sharing cards).</li>
            <li>To manage your account and authenticate you.</li>
            <li>To improve our platform and user experience.</li>
            <li>To send service-related communications (no spam).</li>
            <li>To display relevant advertisements through Google AdSense.</li>
          </ul>
        </Section>

        <Section title="4. Google AdSense & Cookies">
          We use Google AdSense to display advertisements. Google may use cookies and web beacons to serve ads based on your prior visits to our site or other sites on the internet. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-primary underline">Google Ads Settings</a>. We also use cookies for session management and analytics.
        </Section>

        <Section title="5. Data Sharing">
          We do not sell your personal information. We may share data with:
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Firebase / Google:</strong> For database storage and authentication.</li>
            <li><strong>Google AdSense:</strong> For serving advertisements.</li>
            <li><strong>Vercel:</strong> For website hosting and analytics.</li>
            <li><strong>Law enforcement:</strong> When required by law.</li>
          </ul>
        </Section>

        <Section title="6. Data Retention">
          We retain your account data and cards as long as your account is active. You can delete your cards at any time from the dashboard. To delete your account, contact us at the email below.
        </Section>

        <Section title="7. Children's Privacy">
          Our Service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such data, please contact us immediately.
        </Section>

        <Section title="8. Your Rights">
          You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at <a href="mailto:privacy@jashn.app" className="text-primary underline">privacy@jashn.app</a>.
        </Section>

        <Section title="9. Security">
          We implement reasonable security measures to protect your data. However, no method of internet transmission is 100% secure.
        </Section>

        <Section title="10. Changes to This Policy">
          We may update this Privacy Policy from time to time. We will notify you by updating the &quot;Last updated&quot; date above. Continued use of the Service after changes constitutes acceptance.
        </Section>

        <Section title="11. Contact Us">
          If you have any questions about this Privacy Policy, contact us at:<br />
          <a href="mailto:privacy@jashn.app" className="text-primary underline">privacy@jashn.app</a>
        </Section>
      </main>
      <SiteFooter />
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-foreground mb-2">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
    </section>
  )
}
