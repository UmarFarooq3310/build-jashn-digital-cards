import type { Metadata } from 'next'
import Link from 'next/link'
import { Award, BookOpen, ExternalLink, GraduationCap, MapPin, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Users } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Editorial Team & Authors | Cardzy',
  description:
    "Meet Cardzy's editorial team and cultural stylists. Experts in wedding invitation styling, event tech, and digital card wording.",
  alternates: { canonical: 'https://cardzy.online/authors' },
  robots: { index: true, follow: true },
}

const authorsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Cardzy Editorial Team & Authors',
  url: 'https://cardzy.online/authors',
  description:
    'Editorial team at Cardzy providing expert celebration wording guides, wedding invitation styling, and paperless digital card tech.',
  publisher: {
    '@type': 'Organization',
    name: 'Cardzy Digital Solutions',
    url: 'https://cardzy.online',
  },
}

const AUTHORS = [
  {
    name: 'Umar Farooq',
    slug: 'umar-farooq',
    role: 'Senior Cultural Event & Wedding Stylist',
    badge: 'Editorial Lead',
    experience: '8+ Years Experience',
    initials: 'UF',
    gradient: 'from-emerald-800 via-teal-900 to-amber-900',
    initialsColor: 'text-amber-300',
    education: 'B.S. Communication & Design (NUST)',
    location: 'Islamabad / Rawalpindi, Pakistan',
    bio: 'Leads South Asian and Islamic wedding invitation wording, Urdu Nastaliq calligraphy styling, and WhatsApp RSVP event workflows.',
    expertise: ['Pakistani Wedding Protocols', 'Urdu Nastaliq Calligraphy', 'WhatsApp RSVP Management'],
    articleCount: '12+ Master Guides',
  },
  {
    name: 'Kainat',
    slug: 'kainat',
    role: 'Tech & Digital Product Strategist',
    badge: 'Tech Lead',
    experience: '6+ Years Experience',
    initials: 'K',
    gradient: 'from-amber-700 via-orange-800 to-rose-900',
    initialsColor: 'text-amber-300',
    education: 'M.S. Information Technology (LUMS)',
    location: 'Lahore / Islamabad, Pakistan',
    bio: 'Specializes in smart digital visiting cards (vCards), paperless corporate networking, QR code synchronization, and mobile UX design.',
    expertise: ['Smart vCards (.vcf protocol)', 'Paperless Corporate Networking', 'Mobile UI/UX Optimization'],
    articleCount: '8+ In-Depth Guides',
  },
  {
    name: 'Hasnain',
    slug: 'hasnain',
    role: 'Creative & Cultural Events Editor',
    badge: 'Creative Editor',
    experience: '5+ Years Experience',
    initials: 'H',
    gradient: 'from-blue-800 via-indigo-900 to-sky-900',
    initialsColor: 'text-blue-300',
    education: 'B.A. Media Arts (UoK)',
    location: 'Karachi / Islamabad, Pakistan',
    bio: 'Crafts guides on 3D animated holiday e-cards (Eid, Christmas, Diwali, New Year), birthday party invitations, and digital sharing etiquette.',
    expertise: ['3D Animated Greeting Cards', 'Holiday E-Card Traditions', 'Multilingual Digital Storytelling'],
    articleCount: '10+ Celebration Guides',
  },
]

export default function AuthorsIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorsJsonLd) }}
      />

      <main className="min-h-screen bg-background">
        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: 'Editorial Team & Authors', href: '/authors' }]} />
            <div className="mt-6 text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-300 uppercase tracking-wider">
                <Users className="size-3.5 text-amber-400" /> Editorial Standards &amp; E-E-A-T
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Cardzy Editorial Team &amp; Authors
              </h1>
              <p className="text-sm sm:text-base text-emerald-100/85 leading-relaxed">
                Meet the cultural stylists, technology strategists, and creative editors behind Cardzy&rsquo;s celebratory guides and digital card innovations.
              </p>
            </div>
          </div>
        </section>

        {/* ── Editorial Mission ──────────────────────────────────────── */}
        <section className="py-8 md:py-12 bg-muted/40 border-b border-border/60">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-base">
                <ShieldCheck className="size-5" />
                <h2>Our Editorial Integrity &amp; Quality Commitment</h2>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Every guide, wording template, and cultural recommendation published on <strong className="text-foreground">Cardzy (cardzy.online)</strong> is researched and written by domain experts with authentic lived experience in cultural event planning, typography, and paperless communications. We adhere to rigorous fact-checking and respect diverse regional traditions.
              </p>
            </div>
          </div>
        </section>

        {/* ── Authors Grid ───────────────────────────────────────────── */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {AUTHORS.map((author) => (
                <div
                  key={author.slug}
                  className="rounded-3xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-md transition-all space-y-6"
                >
                  <div className="space-y-4">
                    {/* Author Avatar Header */}
                    <div className="flex items-center gap-4">
                      <div className={`size-16 rounded-2xl bg-gradient-to-br ${author.gradient} p-0.5 shadow-md shrink-0 overflow-hidden`}>
                        <img
                          src={`/authors/${author.slug}.svg`}
                          alt={`${author.name} - ${author.role}`}
                          width={64}
                          height={64}
                          className="size-full rounded-[14px] object-cover"
                        />
                      </div>
                      <div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                          <Award className="size-3" /> {author.badge}
                        </span>
                        <h2 className="text-lg font-extrabold text-foreground pt-1">
                          <Link href={`/authors/${author.slug}`} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                            {author.name}
                          </Link>
                        </h2>
                        <p className="text-xs text-muted-foreground font-medium">
                          {author.experience}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                      {author.role}
                    </p>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {author.bio}
                    </p>

                    {/* Qualifications */}
                    <div className="space-y-1.5 pt-2 border-t border-border/60 text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <GraduationCap className="size-3.5 text-emerald-600 shrink-0" />
                        <span>{author.education}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-amber-600 shrink-0" />
                        <span>{author.location}</span>
                      </div>
                    </div>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {author.expertise.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-muted/60 text-[10px] font-medium text-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Profile Link Action */}
                  <Link
                    href={`/authors/${author.slug}`}
                    className="inline-flex min-h-[48px] items-center justify-between w-full rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 transition-colors shadow-2xs cursor-pointer"
                  >
                    <span>View Full Bio &amp; Articles</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
