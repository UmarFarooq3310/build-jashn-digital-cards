'use client'

import { useLang } from '@/lib/lang/context'

export function CreateMagicLinkProse() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const steps = [
    {
      title: '1. Select Your Occasion & Experience',
      desc: 'Pick from romantic marriage proposals, birthday bashes, royal wedding invites, Eid celebrations, graduation, or milestone anniversaries.',
    },
    {
      title: '2. Personalize 3D Interactive Features',
      desc: 'Customize the 3D velvet diamond ring box, blowable cake candles, floating message balloons, and personal handwritten confession notes.',
    },
    {
      title: '3. Choose a Royal Palette & Music',
      desc: 'Select from Romantic Rose, Cardzy Emerald Gold, Mughal 24K Gold, Ruby Velvet, or Royal Sapphire themes with spatial chime audio.',
    },
    {
      title: '4. Instant 1-Click WhatsApp Sharing',
      desc: 'Generate your link instantly with zero signup required. Send it directly to your recipient on WhatsApp, SMS, or download high-resolution QR codes.',
    },
  ]

  const occasions = [
    {
      title: '💍 Forever Proposal & Love Confession',
      desc: 'The ultimate viral surprise for proposing to your partner. Features an interactive velvet ring box that opens to reveal a sparkling diamond ring, romantic poetry, and an interactive "YES! A Thousand Times YES" button.',
    },
    {
      title: '🎂 Interactive Birthday Celebration',
      desc: 'Blow out real cake candles, pop floating memory balloons, unlock hidden heartfelt notes, and explore cosmic life milestone statistics.',
    },
    {
      title: '👑 Royal Wedding & Shaadi Invitations',
      desc: 'Mughal-style gold digital wedding invitations with Google Maps venue integration, instant WhatsApp RSVP tracking, and dress code information.',
    },
    {
      title: '🌙 Eid Mubarak & Ramadan Greetings',
      desc: 'Crescent moon lanterns, sacred Dua reflections, and festive Chand Raat greetings in genuine Nastaliq Urdu calligraphy.',
    },
  ]

  return (
    <section className="bg-muted/40 border-t border-border/60 py-14 md:py-20 mt-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Intro */}
        <div className="space-y-4">
          <h2
            className={`text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl ${
              isUrdu ? 'font-urdu leading-relaxed' : ''
            }`}
          >
            What is a Cardzy Magic Link?
          </h2>
          <p
            className={`text-base leading-relaxed text-muted-foreground ${
              isUrdu ? 'font-urdu text-lg leading-relaxed' : ''
            }`}
          >
            A Magic Link is an interactive, animated celebration microsite tailored for your loved ones. Unlike static pictures or plain text messages, opening a Magic Link unfolds a centered 3D luxury capsule on any smartphone or computer — complete with unboxings, sparkling diamond rings, popping balloon secrets, and instant real-time reactions.
          </p>
          <p
            className={`text-base leading-relaxed text-muted-foreground ${
              isUrdu ? 'font-urdu text-lg leading-relaxed' : ''
            }`}
          >
            Whether asking the most important question of your life (&ldquo;Will You Marry Me?&rdquo;) or wishing someone a memorable birthday, Cardzy Magic Links turn ordinary messages into unforgettable, cinematic moments.
          </p>
        </div>

        {/* How It Works */}
        <div className="space-y-4">
          <h2
            className={`text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl ${
              isUrdu ? 'font-urdu leading-relaxed' : ''
            }`}
          >
            How to Create Your Magic Link in 4 Easy Steps
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0">
            {steps.map((s, idx) => (
              <li
                key={idx}
                className="p-4 rounded-2xl bg-card border border-border/70 shadow-sm space-y-1.5"
              >
                <h3 className="text-sm font-bold text-[#7B0D1E]">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Featured Occasions */}
        <div className="space-y-4">
          <h2
            className={`text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl ${
              isUrdu ? 'font-urdu leading-relaxed' : ''
            }`}
          >
            Popular Magic Link Occasions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {occasions.map((o, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-card border border-border/70 shadow-sm space-y-1.5"
              >
                <h3 className="text-sm font-bold text-foreground">{o.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h2
            className={`text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl ${
              isUrdu ? 'font-urdu leading-relaxed' : ''
            }`}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-card border border-border/70">
              <h4 className="text-sm font-bold text-foreground mb-1">
                Does my recipient need to download an app or log in?
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                No! The Magic Link works immediately in any web browser (Safari, Chrome, WhatsApp in-app browser). No apps or logins required.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border/70">
              <h4 className="text-sm font-bold text-foreground mb-1">
                Will I know when my partner or recipient says YES or opens the card?
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes! When they say YES or send love, real-time counters and reactions update instantly. They can also tap the 1-click WhatsApp response button to share their joy directly with you.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border/70">
              <h4 className="text-sm font-bold text-foreground mb-1">
                Is creating a Magic Link really free?
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes! Anyone can create and share unlimited Magic Links for free with no credit card required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
