'use client'
import { useLang } from '@/lib/lang/context'

export function CreateWishProse() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const steps = [
    { title: t('wishStep1Title', 'Select Your Occasion'), desc: t('wishStep1Desc', 'Choose from 35+ occasions including Eid ul Fitr, Eid ul Adha, Birthday, Wedding Anniversary, Ramadan, New Year, Independence Day, Graduation, and more.') },
    { title: t('wishStep2Title', 'Pick a Theme & Border'), desc: t('wishStep2Desc', 'Browse dozens of animated themes — from elegant golden Mehndi patterns to playful birthday confetti and festive dholki styles.') },
    { title: t('wishStep3Title', 'Enter Names & Message'), desc: t('wishStep3Desc', "Type the recipient's name, your name, and choose your message language (18 languages supported). Use a pre-written template or write a custom message.") },
    { title: t('wishStep4Title', 'Upload a Photo (Optional)'), desc: t('wishStep4Desc', 'Add a personal photo to make the card truly one-of-a-kind.') },
    { title: t('wishStep5Title', 'Share the Link'), desc: t('wishStep5Desc', 'Click Create and instantly share your card link on WhatsApp, Instagram Stories, Facebook, SMS, or email.') },
  ]

  const popularOccasions = [
    { title: t('wishOcc1Title', 'Eid Mubarak Cards'), desc: t('wishOcc1Desc', 'Personalised Eid ul Fitr and Eid ul Adha wish cards in Urdu, Arabic, or English with crescent moon designs and heartfelt duas.') },
    { title: t('wishOcc2Title', 'Birthday Wish Cards'), desc: t('wishOcc2Desc', "Animated birthday greeting cards with confetti, balloons, and the recipient's name in large sparkling font.") },
    { title: t('wishOcc3Title', 'Wedding Anniversary'), desc: t('wishOcc3Desc', 'Elegant anniversary cards featuring rose gold accents, couple photo frames, and romantic Urdu shayari or English poetry.') },
    { title: t('wishOcc4Title', 'Ramadan Kareem'), desc: t('wishOcc4Desc', 'Beautifully crafted crescent and lantern-themed digital cards with pre-written Ramadan duas in multiple languages.') },
    { title: t('wishOcc5Title', 'Graduation Congratulations'), desc: t('wishOcc5Desc', 'Graduation cap animations, gold star effects, and congratulatory messages for board exams and university degrees.') },
    { title: t('wishOcc6Title', 'New Year Greetings'), desc: t('wishOcc6Desc', 'Firework animations, countdown elements, and festive gold-and-navy digital greeting cards.') },
  ]

  const tableRows = [
    { feature: t('tableRowCreateShare', 'Create & share wish cards'), free: '✓', pro: '✓' },
    { feature: t('tableRow35Occasions', '35+ occasions'), free: '✓', pro: '✓' },
    { feature: t('tableRow18Languages', '18 languages'), free: '✓', pro: '✓' },
    { feature: t('tableRowClassicThemes', 'Classic themes'), free: '✓', pro: '✓' },
    { feature: t('tableRowPremiumThemes', 'Premium & animated themes'), free: '—', pro: '✓' },
    { feature: t('tableRowPhotoUpload', 'Photo upload'), free: '✓', pro: '✓' },
    { feature: t('tableRowBgMusic', 'Background music'), free: '✓', pro: '✓' },
    { feature: t('tableRowRemoveWatermark', 'Remove watermark'), free: '—', pro: '✓' },
    { feature: t('tableRowDownloadImage', 'Download as image (PNG)'), free: '—', pro: '✓' },
    { feature: t('tableRowUnlimitedStorage', 'Unlimited card storage'), free: '—', pro: '✓' },
  ]

  const tips = [
    t('wishTip1', "Use the recipient's full name or nickname — personalisation makes a card feel special."),
    t('wishTip2', "Write your message in the recipient's native language. A birthday wish in someone's mother tongue carries 10× more emotional weight."),
    t('wishTip3', "Choose a theme that matches the occasion mood — elegant for anniversaries, bright and festive for birthdays and Eid."),
    t('wishTip4', "Upload a high-quality photo with good lighting for the best visual result."),
    t('wishTip5', "Send the link early — at least an hour before the celebration moment so the recipient has time to enjoy it."),
    t('wishTip6', "For Eid cards, send on the eve of Eid (Chand Raat) for maximum emotional impact."),
  ]

  return (
    <section className="bg-muted/40 border-t border-border/60 py-14 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">

        <div className="space-y-4">
          <h2 className={`text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>{t('wishProseH2a')}</h2>
          <p className={`text-base leading-relaxed text-muted-foreground ${isUrdu ? 'font-urdu text-lg leading-relaxed' : ''}`}>{t('wishProseP1')}</p>
          <p className={`text-base leading-relaxed text-muted-foreground ${isUrdu ? 'font-urdu text-lg leading-relaxed' : ''}`}>{t('wishProseP2')}</p>
        </div>

        <div className="space-y-4">
          <h2 className={`text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>{t('wishProseH2b')}</h2>
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
          <h2 className={`text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>{t('wishProseH2c')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {popularOccasions.map((occ) => (
              <div key={occ.title} className="rounded-2xl border border-border/70 bg-card p-5">
                <h3 className={`font-bold text-foreground text-sm mb-1 ${isUrdu ? 'font-urdu text-base' : ''}`}>{occ.title}</h3>
                <p className={`text-xs leading-relaxed text-muted-foreground ${isUrdu ? 'font-urdu text-sm leading-relaxed' : ''}`}>{occ.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className={`text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>{t('wishProseH2d')}</h2>
          <p className={`text-base leading-relaxed text-muted-foreground ${isUrdu ? 'font-urdu text-lg leading-relaxed' : ''}`}>
            {t('wishLanguagesSupportDesc')}
          </p>
        </div>

        <div className="space-y-4">
          <h2 className={`text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>{t('wishProseH2e')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className={`py-3 text-left font-bold text-foreground ${isUrdu ? 'font-urdu text-right' : ''}`}>{t('tableHeaderFeature', 'Feature')}</th>
                  <th className="py-3 text-center font-bold text-emerald-700">{t('tableHeaderFree', 'Free')}</th>
                  <th className="py-3 text-center font-bold text-amber-700">{t('tableHeaderPro', 'Pro')}</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {tableRows.map((row) => (
                  <tr key={row.feature} className="border-b border-border/50">
                    <td className={`py-2.5 ${isUrdu ? 'font-urdu text-sm text-right' : ''}`}>{row.feature}</td>
                    <td className="py-2.5 text-center">{row.free}</td>
                    <td className="py-2.5 text-center">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className={`text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>{t('wishProseH2f')}</h2>
          <ul className="space-y-3 text-base text-muted-foreground">
            {tips.map((tip, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-emerald-600 font-bold shrink-0">•</span>
                <span className={isUrdu ? 'font-urdu text-base leading-relaxed' : ''}>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured Guides Box for Contextual Internal Linking */}
        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6 space-y-4">
          <h3 className={`text-xl font-bold text-foreground flex items-center gap-2 ${isUrdu ? 'font-urdu text-2xl' : ''}`}>
            {t('popularGuidesHeading', '💡 Popular Wording Guides & Inspiration')}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <a href="/guide/eid-wording-ideas" className="p-4 rounded-2xl bg-card border border-border hover:border-emerald-500 transition-all font-semibold text-primary">
              <span className={isUrdu ? 'font-urdu text-base font-bold' : ''}>{t('guideEidTitle')}</span>
              <p className={`text-xs text-muted-foreground font-normal mt-1 ${isUrdu ? 'font-urdu text-xs leading-relaxed' : ''}`}>
                {t('guideEidDesc')}
              </p>
            </a>
            <a href="/blog/complete-guide-to-pakistani-wedding-invitation-wording-urdu-english" className="p-4 rounded-2xl bg-card border border-border hover:border-emerald-500 transition-all font-semibold text-primary">
              <span className={isUrdu ? 'font-urdu text-base font-bold' : ''}>{t('guideWeddingTitle')}</span>
              <p className={`text-xs text-muted-foreground font-normal mt-1 ${isUrdu ? 'font-urdu text-xs leading-relaxed' : ''}`}>
                {t('guideWeddingDesc')}
              </p>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
