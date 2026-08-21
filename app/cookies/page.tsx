import type { Metadata } from 'next'
import Link from 'next/link'
import { Cookie, Shield, BarChart3, Megaphone, Settings, ExternalLink, Lock, Info } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Cookie Policy | Cardzy',
  description:
    'Learn how Cardzy uses cookies and similar technologies to enhance your experience, analyze traffic, and serve relevant ads. Find out how to manage your preferences.',
  alternates: { canonical: 'https://cardzy.online/cookies' },
  robots: { index: true, follow: true },
}

const cookieJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Cookie Policy — Cardzy',
  url: 'https://cardzy.online/cookies',
  description:
    'Cardzy cookie policy explaining essential, analytics, and advertising cookies, third-party vendors, and how users can manage their preferences.',
  publisher: {
    '@type': 'Organization',
    name: 'Cardzy',
    url: 'https://cardzy.online',
  },
}

function Section({
  id,
  icon,
  title,
  badge,
  badgeColor,
  children,
}: {
  id: string
  icon: React.ReactNode
  title: string
  badge?: string
  badgeColor?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-start gap-3 mb-3">
        <div className="size-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
          {icon}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          {badge && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${badgeColor}`}>
              {badge}
            </span>
          )}
        </div>
      </div>
      <div className="pl-12 space-y-3 text-sm text-muted-foreground leading-relaxed">
        {children}
      </div>
    </section>
  )
}

function CookieRow({
  name,
  provider,
  purpose,
  duration,
  type,
}: {
  name: string
  provider: string
  purpose: string
  duration: string
  type: string
}) {
  return (
    <tr className="border-b border-border/50 last:border-0">
      <td className="py-2.5 pr-4 font-mono text-xs text-foreground font-semibold">{name}</td>
      <td className="py-2.5 pr-4 text-xs">{provider}</td>
      <td className="py-2.5 pr-4 text-xs">{purpose}</td>
      <td className="py-2.5 pr-4 text-xs whitespace-nowrap">{duration}</td>
      <td className="py-2.5 text-xs">
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-muted border border-border">
          {type}
        </span>
      </td>
    </tr>
  )
}

export default function CookiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cookieJsonLd) }}
      />

      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <Breadcrumbs items={[{ label: 'Cookie Policy', href: '/cookies' }]} />

          {/* Header */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm mb-10 mt-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-4">
              <Cookie className="size-3.5" /> Cookie Policy
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-2">
              Cookie &amp; Tracking Technology Policy
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-muted-foreground mb-4">
              Last updated: August 20, 2026 &nbsp;·&nbsp; Effective immediately
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              This Cookie Policy explains what cookies are, which types Cardzy
              (<strong>cardzy.online</strong>) uses, why we use them, and how you can control or
              delete them. By continuing to use our website, you consent to the use of cookies as
              described below, in accordance with our{' '}
              <Link href="/privacy-policy" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">
                Privacy Policy
              </Link>
              .
            </p>

            {/* Quick TOC */}
            <nav className="mt-6 rounded-2xl border border-border bg-muted/40 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Jump to Section</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
                {[
                  ['#what-are-cookies', 'What Are Cookies?'],
                  ['#essential', 'Essential Cookies'],
                  ['#analytics', 'Analytics Cookies'],
                  ['#advertising', 'Advertising & AdSense Cookies'],
                  ['#third-parties', 'Third-Party Vendors'],
                  ['#manage', 'How to Manage Cookies'],
                  ['#do-not-track', 'Do Not Track'],
                  ['#contact', 'Contact Us'],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-amber-600 dark:text-amber-400 hover:underline font-medium"
                    >
                      → {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Sections */}
          <div className="space-y-10">

            {/* What Are Cookies */}
            <Section id="what-are-cookies" icon={<Info className="size-4" />} title="What Are Cookies?">
              <p>
                Cookies are small text files placed on your device (computer, smartphone, or tablet)
                when you visit a website. They are widely used to make websites work, improve
                efficiency, and provide information to site owners.
              </p>
              <p>
                Cookies do not contain personally identifiable information by themselves. They store
                small pieces of data — such as a session ID, language preference, or consent status
                — that help the website remember your choices.
              </p>
              <p>
                In addition to cookies, Cardzy may use similar technologies such as{' '}
                <strong>web beacons</strong> (transparent pixel images used to track email opens or
                page visits), <strong>local storage</strong> (browser-side key-value storage for
                consent preferences), and <strong>session storage</strong>.
              </p>
            </Section>

            {/* Essential Cookies */}
            <Section
              id="essential"
              icon={<Lock className="size-4" />}
              title="Strictly Essential Cookies"
              badge="Always Active"
              badgeColor="bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
            >
              <p>
                These cookies are <strong>necessary for the website to function</strong> and cannot
                be switched off. They are typically set in response to actions you take — such as
                logging in, saving a card draft, or setting your language preference. You can set
                your browser to block these cookies, but parts of the site will not work as a
                result.
              </p>

              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="bg-muted/50 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <th className="py-2.5 px-3">Cookie Name</th>
                      <th className="py-2.5 px-3">Provider</th>
                      <th className="py-2.5 px-3">Purpose</th>
                      <th className="py-2.5 px-3">Duration</th>
                      <th className="py-2.5 px-3">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 px-3">
                    <CookieRow
                      name="cardzy_cookie_consent"
                      provider="Cardzy"
                      purpose="Stores your cookie consent decision (accepted/declined)"
                      duration="1 year"
                      type="First-party"
                    />
                    <CookieRow
                      name="cardzy_consent_v3"
                      provider="Cardzy"
                      purpose="Stores granular cookie preference object (essential/analytics/advertising)"
                      duration="1 year"
                      type="First-party"
                    />
                    <CookieRow
                      name="cookie_consent"
                      provider="Cardzy"
                      purpose="Legacy consent flag (accepted/declined)"
                      duration="1 year"
                      type="First-party"
                    />
                    <CookieRow
                      name="__session"
                      provider="Firebase / Google"
                      purpose="Firebase Authentication session token for logged-in users"
                      duration="Session"
                      type="First-party"
                    />
                    <CookieRow
                      name="lang"
                      provider="Cardzy"
                      purpose="Stores your selected display language (e.g. 'ur', 'en', 'ar')"
                      duration="1 year"
                      type="First-party"
                    />
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Analytics */}
            <Section
              id="analytics"
              icon={<BarChart3 className="size-4" />}
              title="Performance & Analytics Cookies"
              badge="Optional"
              badgeColor="bg-cyan-500/10 border-cyan-500/30 text-cyan-700 dark:text-cyan-400"
            >
              <p>
                These cookies collect information about how visitors use our website — for example,
                which pages are visited most often and whether users receive error messages. All
                information is <strong>aggregated and anonymous</strong>; no individual is
                identified. These cookies help us continually improve the site.
              </p>
              <p>
                We use <strong>Google Analytics 4 (GA4)</strong> for this purpose. GA4 uses cookies
                to distinguish users and sessions. If you decline analytics cookies, we will not
                load GA4 and no analytics data will be sent to Google.
              </p>

              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="bg-muted/50 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <th className="py-2.5 px-3">Cookie Name</th>
                      <th className="py-2.5 px-3">Provider</th>
                      <th className="py-2.5 px-3">Purpose</th>
                      <th className="py-2.5 px-3">Duration</th>
                      <th className="py-2.5 px-3">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <CookieRow
                      name="_ga"
                      provider="Google Analytics"
                      purpose="Distinguishes unique users by assigning a randomly generated number as a client identifier"
                      duration="2 years"
                      type="Third-party"
                    />
                    <CookieRow
                      name="_ga_*"
                      provider="Google Analytics 4"
                      purpose="Persists session state across page requests for GA4"
                      duration="2 years"
                      type="Third-party"
                    />
                    <CookieRow
                      name="_gid"
                      provider="Google Analytics"
                      purpose="Distinguishes users (24-hour session identifier)"
                      duration="24 hours"
                      type="Third-party"
                    />
                  </tbody>
                </table>
              </div>

              <p className="text-xs">
                Google Analytics privacy information:{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-0.5"
                >
                  policies.google.com/privacy <ExternalLink className="size-3" />
                </a>
              </p>
            </Section>

            {/* Advertising */}
            <Section
              id="advertising"
              icon={<Megaphone className="size-4" />}
              title="Advertising & Google AdSense Cookies"
              badge="Optional"
              badgeColor="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400"
            >
              <p>
                Cardzy is a free platform supported by advertising. We use{' '}
                <strong>Google AdSense</strong> to display relevant, family-safe advertisements.
                Google AdSense and its partners use cookies to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Show ads that are relevant to you based on your browsing history</li>
                <li>Limit the number of times you see the same ad</li>
                <li>Measure the effectiveness of advertising campaigns</li>
                <li>Prevent fraudulent ad impressions (ad quality and safety)</li>
              </ul>
              <p>
                If you decline advertising cookies, Google will still display ads, but they will be
                non-personalized (contextual only). You can opt out of personalized advertising at
                any time via{' '}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-0.5"
                >
                  Google Ad Settings <ExternalLink className="size-3" />
                </a>
                .
              </p>

              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="bg-muted/50 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <th className="py-2.5 px-3">Cookie / Technology</th>
                      <th className="py-2.5 px-3">Provider</th>
                      <th className="py-2.5 px-3">Purpose</th>
                      <th className="py-2.5 px-3">Duration</th>
                      <th className="py-2.5 px-3">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <CookieRow
                      name="IDE"
                      provider="Google DoubleClick"
                      purpose="Used for targeting, optimizing, reporting and attributing online advertising"
                      duration="1 year"
                      type="Third-party"
                    />
                    <CookieRow
                      name="test_cookie"
                      provider="Google DoubleClick"
                      purpose="Checks if the user's browser supports cookies"
                      duration="15 minutes"
                      type="Third-party"
                    />
                    <CookieRow
                      name="ANID"
                      provider="Google"
                      purpose="Used for advertising based on what's relevant to the user"
                      duration="13 months"
                      type="Third-party"
                    />
                    <CookieRow
                      name="NID"
                      provider="Google"
                      purpose="Registers a unique ID to remember preferences and for ads personalization"
                      duration="6 months"
                      type="Third-party"
                    />
                    <CookieRow
                      name="CONSENT"
                      provider="Google"
                      purpose="Stores user's cookie consent state for current domain"
                      duration="2 years"
                      type="Third-party"
                    />
                  </tbody>
                </table>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs">
                <strong className="text-amber-700 dark:text-amber-400">Google Consent Mode v2:</strong>{' '}
                Cardzy implements Google Consent Mode v2. When you decline advertising cookies, we
                send a <code className="font-mono bg-muted px-1 rounded">denied</code> signal to
                Google for <code className="font-mono bg-muted px-1 rounded">ad_storage</code>,{' '}
                <code className="font-mono bg-muted px-1 rounded">ad_user_data</code>, and{' '}
                <code className="font-mono bg-muted px-1 rounded">ad_personalization</code>. Google
                will use modelled conversions only and will not set advertising cookies on your
                device.
              </div>
            </Section>

            {/* Third Parties */}
            <Section
              id="third-parties"
              icon={<Shield className="size-4" />}
              title="Third-Party Vendors & Partners"
            >
              <p>
                In addition to Google, the following third-party services may set cookies or access
                device storage when you use Cardzy:
              </p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="bg-muted/50 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <th className="py-2.5 px-3">Vendor</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Purpose</th>
                      <th className="py-2.5 px-3">Privacy Policy</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-border/50">
                    {[
                      {
                        vendor: 'Google AdSense',
                        category: 'Advertising',
                        purpose: 'Display relevant ads and measure ad performance',
                        link: 'https://policies.google.com/privacy',
                      },
                      {
                        vendor: 'Google Analytics 4',
                        category: 'Analytics',
                        purpose: 'Website traffic analysis and user behaviour insights',
                        link: 'https://policies.google.com/privacy',
                      },
                      {
                        vendor: 'Firebase / Google',
                        category: 'Essential',
                        purpose: 'User authentication, real-time database, and card storage',
                        link: 'https://firebase.google.com/support/privacy',
                      },
                      {
                        vendor: 'Vercel',
                        category: 'Infrastructure',
                        purpose: 'Hosting, edge delivery, and performance analytics',
                        link: 'https://vercel.com/legal/privacy-policy',
                      },
                    ].map((row) => (
                      <tr key={row.vendor} className="border-b border-border/50 last:border-0">
                        <td className="py-2.5 px-3 font-semibold text-foreground">{row.vendor}</td>
                        <td className="py-2.5 px-3">{row.category}</td>
                        <td className="py-2.5 px-3">{row.purpose}</td>
                        <td className="py-2.5 px-3">
                          <a
                            href={row.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-0.5"
                          >
                            View <ExternalLink className="size-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* How to Manage */}
            <Section
              id="manage"
              icon={<Settings className="size-4" />}
              title="How to Manage & Disable Cookies"
            >
              <p>
                You have several options for controlling cookies. Note that disabling certain cookies
                may affect the functionality of Cardzy.
              </p>

              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-card p-4">
                  <h3 className="font-bold text-foreground text-sm mb-2">1. Cardzy Cookie Preferences</h3>
                  <p>
                    You can review and change your consent at any time by clearing your browser
                    cookies and reloading the page — our consent banner will reappear on your first
                    visit. You can then choose to Accept All, Decline Non-Essential, or customise
                    individual categories.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-4">
                  <h3 className="font-bold text-foreground text-sm mb-2">2. Browser Settings</h3>
                  <p className="mb-2">
                    Most browsers allow you to refuse, delete, or block cookies through their
                    settings. Here are direct links for major browsers:
                  </p>
                  <ul className="space-y-1.5">
                    {[
                      ['Google Chrome', 'https://support.google.com/chrome/answer/95647'],
                      ['Mozilla Firefox', 'https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer'],
                      ['Safari (macOS / iOS)', 'https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac'],
                      ['Microsoft Edge', 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406'],
                      ['Opera', 'https://help.opera.com/en/latest/web-preferences/#cookies'],
                    ].map(([browser, link]) => (
                      <li key={browser}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1 text-xs"
                        >
                          {browser} <ExternalLink className="size-3" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-border bg-card p-4">
                  <h3 className="font-bold text-foreground text-sm mb-2">3. Google Ad Settings</h3>
                  <p>
                    To opt out of personalized ads from Google across all websites, visit{' '}
                    <a
                      href="https://adssettings.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-0.5"
                    >
                      Google Ad Settings <ExternalLink className="size-3" />
                    </a>{' '}
                    or install the{' '}
                    <a
                      href="https://tools.google.com/dlpage/gaoptout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-0.5"
                    >
                      Google Analytics Opt-out Browser Add-on <ExternalLink className="size-3" />
                    </a>
                    .
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-4">
                  <h3 className="font-bold text-foreground text-sm mb-2">
                    4. Network Advertising Initiative (NAI) Opt-Out
                  </h3>
                  <p>
                    You can opt out of interest-based advertising from NAI member companies at{' '}
                    <a
                      href="https://optout.networkadvertising.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-0.5"
                    >
                      optout.networkadvertising.org <ExternalLink className="size-3" />
                    </a>
                    .
                  </p>
                </div>
              </div>
            </Section>

            {/* Do Not Track */}
            <Section id="do-not-track" icon={<Shield className="size-4" />} title="Do Not Track (DNT)">
              <p>
                Some browsers include a "Do Not Track" (DNT) feature that sends a signal to websites
                you visit, requesting that they do not track you. There is currently no universally
                accepted standard for responding to DNT signals. Cardzy does not currently respond
                to DNT signals; however, you may use the cookie management options above to limit
                tracking.
              </p>
            </Section>

            {/* Changes */}
            <Section id="changes" icon={<Info className="size-4" />} title="Changes to This Policy">
              <p>
                We may update this Cookie Policy periodically to reflect changes in our practices or
                for operational, legal, or regulatory reasons. We will post any changes on this page
                with an updated "Last updated" date. We encourage you to review this page
                periodically.
              </p>
            </Section>

            {/* Contact */}
            <Section id="contact" icon={<Shield className="size-4" />} title="Contact Us">
              <p>
                If you have questions about our use of cookies or this Cookie Policy, please
                contact us:
              </p>
              <div className="rounded-xl border border-border bg-card p-4 space-y-2 text-sm">
                <p>
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:cardzyonline@gmail.com"
                    className="text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    cardzyonline@gmail.com
                  </a>
                </p>
                <p>
                  <strong>Website:</strong>{' '}
                  <Link href="/contact" className="text-amber-600 dark:text-amber-400 hover:underline">
                    cardzy.online/contact
                  </Link>
                </p>
                <p>
                  <strong>Registered:</strong> Islamabad / Rawalpindi, Pakistan
                </p>
              </div>
              <p>
                For your full privacy rights, see our{' '}
                <Link
                  href="/privacy-policy"
                  className="text-amber-600 dark:text-amber-400 font-semibold hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </Section>
          </div>
        </div>
      </main>
    </>
  )
}
