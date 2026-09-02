'use client'
import { useLang } from '@/lib/lang/context'

export function CreateInvitationProse() {
  const { t, lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const steps = [
    { title: t('inviteStep1Title', 'Choose Your Invitation Type'), desc: t('inviteStep1Desc', 'Select from Nikkah, Mehndi, Dholki, Barat, Walima, Birthday Party, Iftaar, Event Khatam, Graduation Party, Baby Shower, and 10+ more.') },
    { title: t('inviteStep2Title', 'Enter Event Details'), desc: t('inviteStep2Desc', 'Add host names, event title, date and time, venue name, and address. Cardzy automatically generates a Google Maps link.') },
    { title: t('inviteStep3Title', 'Write Your Message'), desc: t('inviteStep3Desc', 'Use one of our elegant pre-written templates or write your own. Templates available in formal Urdu Nastaliq, bilingual Urdu-English, and modern English.') },
    { title: t('inviteStep4Title', 'Customise the Design'), desc: t('inviteStep4Desc', 'Pick an animated theme, decorative borders, and optional background music.') },
    { title: t('inviteStep5Title', 'Add RSVP Contact'), desc: t('inviteStep5Desc', 'Enter your WhatsApp number. Cardzy generates a pre-filled WhatsApp RSVP button so guests can confirm with one tap.') },
    { title: t('inviteStep6Title', 'Share Your Invitation'), desc: t('inviteStep6Desc', 'Get your unique invitation link and share it in WhatsApp groups, Instagram, SMS, or email. Track views and RSVPs in your dashboard.') },
  ]

  const types = [
    { title: t('inviteType1Title', 'Nikkah Ceremony'), desc: t('inviteType1Desc', 'Formal, sacred designs with Bismillah calligraphy, Islamic geometric patterns, and bilingual Urdu-English wording.') },
    { title: t('inviteType2Title', 'Mehndi & Dholki'), desc: t('inviteType2Desc', 'Vibrant designs in mustard, magenta, and emerald capturing the joyful atmosphere of Mehndi nights.') },
    { title: t('inviteType3Title', 'Barat Reception'), desc: t('inviteType3Desc', "Grand, regal design themes for the main wedding gala hosted by the bride's family.") },
    { title: t('inviteType4Title', 'Walima Feast'), desc: t('inviteType4Desc', "Clean, elegant designs for the groom's family Walima sunnah feast with Islamic opening invocations.") },
    { title: t('inviteType5Title', 'Iftaar Party'), desc: t('inviteType5Desc', 'Warm Ramadan lantern and crescent-themed designs with iftar timing notes.') },
    { title: t('inviteType6Title', 'Birthday & Kids Parties'), desc: t('inviteType6Desc', 'Colourful confetti, balloon, and cake animations for birthday invitations.') },
  ]

  const features = [
    { title: t('inviteFeat1Title', 'Live RSVP Tracking'), desc: t('inviteFeat1Desc', 'See exactly how many guests have confirmed in real time. Export the full guest list to CSV for seating and catering planning.') },
    { title: t('inviteFeat2Title', 'Google Maps Integration'), desc: t('inviteFeat2Desc', "Guests tap the venue address to open Google Maps navigation directly — eliminating the 'I can't find the venue' problem.") },
    { title: t('inviteFeat3Title', 'WhatsApp One-Tap RSVP'), desc: t('inviteFeat3Desc', 'A pre-filled WhatsApp message is generated for each invitation, increasing RSVP response rates.') },
    { title: t('inviteFeat4Title', 'Countdown Timer'), desc: t('inviteFeat4Desc', 'A live countdown to the event day builds excitement and serves as a constant reminder.') },
    { title: t('inviteFeat5Title', '18 Language Support'), desc: t('inviteFeat5Desc', 'Send invitations to family members who prefer Urdu, Arabic, Hindi, or any of the 15 other supported languages.') },
    { title: t('inviteFeat6Title', 'Instant Sharing'), desc: t('inviteFeat6Desc', 'No printing wait time, no courier cost. Your invitation is live the moment you click create.') },
  ]

  const tips = [
    t('inviteTip1', 'Send wedding invitations 10–14 days before the event. For Mehndi and Dholki, 5–7 days is sufficient.'),
    t('inviteTip2', "Use formal host name formatting: both parents' names (e.g., 'Mr. & Mrs. Tariq Mahmood' hosting on behalf of the bride)."),
    t('inviteTip3', 'Include a clear RSVP deadline to improve your headcount accuracy for catering.'),
    t('inviteTip4', 'For bilingual families, use the English-Urdu hybrid wording template so both elders and younger relatives feel addressed.'),
    t('inviteTip5', 'Always double-check the venue address before sharing — once the link is out to 200 family members, corrections require a new message.'),
    t('inviteTip6', 'Send a reminder 2 days before the event — it often doubles RSVP confirmation rates.'),
  ]

  return (
    <section className="bg-muted/40 border-t border-border/60 py-14 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">

        <div className="space-y-4">
          <h2 className={`text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>{t('inviteProseH2a')}</h2>
          <p className={`text-base leading-relaxed text-muted-foreground ${isUrdu ? 'font-urdu text-lg leading-relaxed' : ''}`}>{t('inviteProseP1')}</p>
          <p className={`text-base leading-relaxed text-muted-foreground ${isUrdu ? 'font-urdu text-lg leading-relaxed' : ''}`}>{t('inviteProseP2')}</p>
        </div>

        <div className="space-y-4">
          <h2 className={`text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>{t('inviteProseH2b')}</h2>
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
          <h2 className={`text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>{t('inviteProseH2c')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {types.map((type) => (
              <div key={type.title} className="rounded-2xl border border-border/70 bg-card p-5">
                <h3 className={`font-bold text-foreground text-sm mb-1 ${isUrdu ? 'font-urdu text-base' : ''}`}>{type.title}</h3>
                <p className={`text-xs leading-relaxed text-muted-foreground ${isUrdu ? 'font-urdu text-sm leading-relaxed' : ''}`}>{type.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className={`text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>{t('inviteProseH2d')}</h2>
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
          <h2 className={`text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>{t('inviteProseH2e')}</h2>
          <ul className="space-y-3 text-base text-muted-foreground">
            {tips.map((tip, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-emerald-600 font-bold shrink-0">•</span>
                <span className={isUrdu ? 'font-urdu text-base leading-relaxed' : ''}>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured Wedding Guides Box for Contextual Internal Linking */}
        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6 space-y-4">
          <h3 className={`text-xl font-bold text-foreground flex items-center gap-2 ${isUrdu ? 'font-urdu text-2xl' : ''}`}>
            {t('inviteGuidesHeading', '💡 Wedding Invitation Wording & RSVP Guides')}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <a href="/blog/complete-guide-to-pakistani-wedding-invitation-wording-urdu-english" className="p-4 rounded-2xl bg-card border border-border hover:border-emerald-500 transition-all font-semibold text-primary">
              <span className={isUrdu ? 'font-urdu text-base font-bold' : ''}>{t('guideWeddingTitle')}</span>
              <p className={`text-xs text-muted-foreground font-normal mt-1 ${isUrdu ? 'font-urdu text-xs leading-relaxed' : ''}`}>
                {t('guideWeddingDesc')}
              </p>
            </a>
            <a href="/blog/how-to-manage-wedding-guest-lists-and-whatsapp-rsvps-effortlessly" className="p-4 rounded-2xl bg-card border border-border hover:border-emerald-500 transition-all font-semibold text-primary">
              <span className={isUrdu ? 'font-urdu text-base font-bold' : ''}>{t('guideRsvpTitle')}</span>
              <p className={`text-xs text-muted-foreground font-normal mt-1 ${isUrdu ? 'font-urdu text-xs leading-relaxed' : ''}`}>
                {t('guideRsvpDesc')}
              </p>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
