'use client'
import { useLang } from '@/lib/lang/context'

export function CreateVisitingCardProse() {
  const { t } = useLang()
  return (
    <section className="bg-muted/40 border-t border-border/60 py-14 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">

        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{t('vcardProseH2a')}</h2>
          <p className="text-base leading-relaxed text-muted-foreground">A digital visiting card — also called a smart vCard or digital business card — is an interactive web page containing all your professional contact information in a beautifully designed layout. Instead of handing out a paper card that gets lost, you share a link or QR code that instantly opens your digital card on any smartphone — no app required.</p>
          <p className="text-base leading-relaxed text-muted-foreground">Your card includes your name, designation, company, phone, WhatsApp, email, website, address, bio, and a direct "Save to Contacts" button that adds your details to the recipient's phone in one tap. Update it any time — no reprinting required.</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{t('vcardProseH2b')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ['Business Executives & Entrepreneurs','Share your company name, LinkedIn, and WhatsApp with prospects at networking events. A single QR code scan replaces the paper card exchange.'],
              ['Doctors & Medical Professionals','Display clinic name, specialisation, MBBS/FCPS credentials, consultation hours, and appointment WhatsApp on a clean medical-themed card.'],
              ['Lawyers & Legal Professionals','Include bar registration details, practice areas, firm name, and office address. The navy and gold legal theme projects authority and trust.'],
              ['Real Estate Agents','Feature property listings link, office address with Google Maps, phone, and WhatsApp — everything a potential buyer needs.'],
              ['IT & Tech Professionals','Add portfolio website link, GitHub, LinkedIn, and professional email on clean minimal tech themes.'],
              ['Freelancers & Creatives','Photographers and designers can feature their portfolio link, Instagram, and contact number on vibrant card designs.'],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-border/70 bg-card p-5">
                <h3 className="font-bold text-foreground text-sm mb-1">{title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{t('vcardProseH2c')}</h2>
          <ol className="space-y-3 text-base text-muted-foreground list-none">
            {[
              ['Select Your Category','Choose from Business, Medical, Legal, Real Estate, Tech, or General. Each category pre-selects a matching professional theme.'],
              ['Enter Your Details','Fill in your name, designation, company, phone, WhatsApp, email, website, address, and a short bio. All fields are optional.'],
              ['Choose a Theme','Pick from 12+ professional themes including Executive Gold, Corporate Navy, Medical White, and Legal Charcoal.'],
              ['Create & Share','Click Create to generate your unique card URL and QR code. Share on LinkedIn, WhatsApp, email signatures, or print materials.'],
            ].map(([title, desc], i) => (
              <li key={i} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white text-sm font-extrabold">{i + 1}</span>
                <div><strong className="text-foreground">{title}:</strong> <span>{desc}</span></div>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{t('vcardProseH2d')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ['Always Up to Date','Changed your phone number or job title? Update your digital card instantly — your existing QR code and link reflect the latest info automatically.'],
              ['Zero Printing Cost','Traditional business cards cost Rs. 2,000–5,000 per batch and become outdated quickly. Your Cardzy digital card costs nothing and never runs out.'],
              ['One-Tap Contact Save',"Recipients tap 'Save to Contacts' and your full details are added to their phone in a standard vCard format — compatible with every smartphone."],
              ['Works Offline via QR','Print your QR code on conference badges, brochures, or shop signage. Anyone who scans it opens your digital card.'],
              ['Analytics & Tracking','With a Cardzy Pro account, see how many times your card has been viewed and from which countries.'],
              ['Eco-Friendly','Every year, billions of business cards are printed and discarded within days. A digital card eliminates this waste entirely.'],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-border/70 bg-card p-5">
                <h3 className="font-bold text-foreground text-sm mb-1">{title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{t('vcardProseH2e')}</h2>
          <ul className="space-y-3 text-base text-muted-foreground">
            {[
              'Add your digital card link to your email signature. Every email becomes an opportunity for the recipient to save your contact.',
              'Print your QR code on the back of your physical card so recipients have both options — scan the QR or keep the paper.',
              'Write a concise bio (2–3 sentences) that clearly states who you help and how. This is far more effective than just a job title.',
              'Include your WhatsApp number separately from your office phone — most clients in Pakistan prefer WhatsApp for initial contact.',
              'Use a professional headshot or company logo as your card avatar. Visual identity significantly increases perceived credibility.',
              'Share your card link on LinkedIn as your "website" URL so your network can always access your latest contact details.',
            ].map((tip, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-emerald-600 font-bold shrink-0">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
