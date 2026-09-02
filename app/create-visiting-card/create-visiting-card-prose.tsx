'use client'
import { useLang } from '@/lib/lang/context'

export function CreateVisitingCardProse() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const professions = [
    { title: t('vcardProf1Title', 'Business Executives & Entrepreneurs'), desc: t('vcardProf1Desc', 'Share your company name, LinkedIn, and WhatsApp with prospects at networking events. A single QR code scan replaces the paper card exchange.') },
    { title: t('vcardProf2Title', 'Doctors & Medical Professionals'), desc: t('vcardProf2Desc', 'Display clinic name, specialisation, MBBS/FCPS credentials, consultation hours, and appointment WhatsApp on a clean medical-themed card.') },
    { title: t('vcardProf3Title', 'Lawyers & Legal Professionals'), desc: t('vcardProf3Desc', 'Include bar registration details, practice areas, firm name, and office address. The navy and gold legal theme projects authority and trust.') },
    { title: t('vcardProf4Title', 'Real Estate Agents'), desc: t('vcardProf4Desc', 'Feature property listings link, office address with Google Maps, phone, and WhatsApp — everything a potential buyer needs.') },
    { title: t('vcardProf5Title', 'IT & Tech Professionals'), desc: t('vcardProf5Desc', 'Add portfolio website link, GitHub, LinkedIn, and professional email on clean minimal tech themes.') },
    { title: t('vcardProf6Title', 'Freelancers & Creatives'), desc: t('vcardProf6Desc', 'Photographers and designers can feature their portfolio link, Instagram, and contact number on vibrant card designs.') },
  ]

  const steps = [
    { title: t('vcardStep1Title', 'Select Your Category'), desc: t('vcardStep1Desc', 'Choose from Business, Medical, Legal, Real Estate, Tech, or General. Each category pre-selects a matching professional theme.') },
    { title: t('vcardStep2Title', 'Enter Your Details'), desc: t('vcardStep2Desc', 'Fill in your name, designation, company, phone, WhatsApp, email, website, address, and a short bio. All fields are optional.') },
    { title: t('vcardStep3Title', 'Choose a Theme'), desc: t('vcardStep3Desc', 'Pick from 12+ professional themes including Executive Gold, Corporate Navy, Medical White, and Legal Charcoal.') },
    { title: t('vcardStep4Title', 'Create & Share'), desc: t('vcardStep4Desc', 'Click Create to generate your unique card URL and QR code. Share on LinkedIn, WhatsApp, email signatures, or print materials.') },
  ]

  const features = [
    { title: t('vcardFeat1Title', 'Always Up to Date'), desc: t('vcardFeat1Desc', 'Changed your phone number or job title? Update your digital card instantly — your existing QR code and link reflect the latest info automatically.') },
    { title: t('vcardFeat2Title', 'Zero Printing Cost'), desc: t('vcardFeat2Desc', 'Traditional business cards cost Rs. 2,000–5,000 per batch and become outdated quickly. Your Cardzy digital card costs nothing and never runs out.') },
    { title: t('vcardFeat3Title', 'One-Tap Contact Save'), desc: t('vcardFeat3Desc', "Recipients tap 'Save to Contacts' and your full details are added to their phone in a standard vCard format — compatible with every smartphone.") },
    { title: t('vcardFeat4Title', 'Works Offline via QR'), desc: t('vcardFeat4Desc', 'Print your QR code on conference badges, brochures, or shop signage. Anyone who scans it opens your digital card.') },
    { title: t('vcardFeat5Title', 'Analytics & Tracking'), desc: t('vcardFeat5Desc', 'With a Cardzy Pro account, see how many times your card has been viewed and from which countries.') },
    { title: t('vcardFeat6Title', 'Eco-Friendly'), desc: t('vcardFeat6Desc', 'Every year, billions of business cards are printed and discarded within days. A digital card eliminates this waste entirely.') },
  ]

  const tips = [
    t('vcardTip1', 'Add your digital card link to your email signature. Every email becomes an opportunity for the recipient to save your contact.'),
    t('vcardTip2', 'Print your QR code on the back of your physical card so recipients have both options — scan the QR or keep the paper.'),
    t('vcardTip3', 'Write a concise bio (2–3 sentences) that clearly states who you help and how. This is far more effective than just a job title.'),
    t('vcardTip4', 'Include your WhatsApp number separately from your office phone — most clients in Pakistan prefer WhatsApp for initial contact.'),
    t('vcardTip5', 'Use a professional headshot or company logo as your card avatar. Visual identity significantly increases perceived credibility.'),
    t('vcardTip6', 'Share your card link on LinkedIn as your "website" URL so your network can always access your latest contact details.'),
  ]

  return (
    <section className="bg-muted/40 border-t border-border/60 py-14 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">

        <div className="space-y-4">
          <h2 className={`text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>{t('vcardProseH2a')}</h2>
          <p className={`text-base leading-relaxed text-muted-foreground ${isUrdu ? 'font-urdu text-lg leading-relaxed' : ''}`}>{t('vcardProseP1')}</p>
          <p className={`text-base leading-relaxed text-muted-foreground ${isUrdu ? 'font-urdu text-lg leading-relaxed' : ''}`}>{t('vcardProseP2')}</p>
        </div>

        <div className="space-y-4">
          <h2 className={`text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>{t('vcardProseH2b')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {professions.map((prof) => (
              <div key={prof.title} className="rounded-2xl border border-border/70 bg-card p-5">
                <h3 className={`font-bold text-foreground text-sm mb-1 ${isUrdu ? 'font-urdu text-base' : ''}`}>{prof.title}</h3>
                <p className={`text-xs leading-relaxed text-muted-foreground ${isUrdu ? 'font-urdu text-sm leading-relaxed' : ''}`}>{prof.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className={`text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>{t('vcardProseH2c')}</h2>
          <ol className="space-y-3 text-base text-muted-foreground list-none">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white text-sm font-extrabold">{i + 1}</span>
                <div className={isUrdu ? 'font-urdu text-base leading-relaxed text-right w-full' : ''}>
                  <strong className="text-foreground">{step.title}:</strong> <span>{step.desc}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-4">
          <h2 className={`text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>{t('vcardProseH2d')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feat) => (
              <div key={feat.title} className="rounded-2xl border border-border/70 bg-card p-5">
                <h3 className={`font-bold text-foreground text-sm mb-1 ${isUrdu ? 'font-urdu text-base' : ''}`}>{feat.title}</h3>
                <p className={`text-xs leading-relaxed text-muted-foreground ${isUrdu ? 'font-urdu text-sm leading-relaxed' : ''}`}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className={`text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>{t('vcardProseH2e')}</h2>
          <ul className="space-y-3 text-base text-muted-foreground">
            {tips.map((tip, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-emerald-600 font-bold shrink-0">•</span>
                <span className={isUrdu ? 'font-urdu text-base leading-relaxed' : ''}>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
