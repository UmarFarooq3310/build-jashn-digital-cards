'use client'
import { useLang } from '@/lib/lang/context'

export function CreateInvitationProse() {
  const { t } = useLang()
  return (
    <section className="bg-muted/40 border-t border-border/60 py-14 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">

        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{t('inviteProseH2a')}</h2>
          <p className="text-base leading-relaxed text-muted-foreground">A digital event invitation is a full-screen, animated invitation website that you build in minutes and share via a simple link. Unlike a printed wedding card that takes days to produce, a Cardzy digital invitation is instant and packed with features paper can never offer — live RSVP tracking, WhatsApp one-click RSVP, Google Maps venue pins, and a countdown timer.</p>
          <p className="text-base leading-relaxed text-muted-foreground">Guests open the link on their phone and see an immersive animated invitation with all event details. They can tap to confirm attendance, open the venue in Google Maps, or play a featured nasheed or dholki music track.</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{t('inviteProseH2b')}</h2>
          <ol className="space-y-3 text-base text-muted-foreground list-none">
            {[
              ['Choose Your Invitation Type','Select from Nikkah, Mehndi, Dholki, Barat, Walima, Birthday Party, Iftaar, Event Khatam, Graduation Party, Baby Shower, and 10+ more.'],
              ['Enter Event Details','Add host names, event title, date and time, venue name, and address. Cardzy automatically generates a Google Maps link.'],
              ['Write Your Message',"Use one of our elegant pre-written templates or write your own. Templates available in formal Urdu Nastaliq, bilingual Urdu-English, and modern English."],
              ['Customise the Design','Pick an animated theme, decorative borders, and optional background music.'],
              ['Add RSVP Contact','Enter your WhatsApp number. Cardzy generates a pre-filled WhatsApp RSVP button so guests can confirm with one tap.'],
              ['Share Your Invitation','Get your unique invitation link and share it in WhatsApp groups, Instagram, SMS, or email. Track views and RSVPs in your dashboard.'],
            ].map(([title, desc], i) => (
              <li key={i} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white text-sm font-extrabold">{i + 1}</span>
                <div><strong className="text-foreground">{title}:</strong> <span>{desc}</span></div>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{t('inviteProseH2c')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ['Nikkah Ceremony','Formal, sacred designs with Bismillah calligraphy, Islamic geometric patterns, and bilingual Urdu-English wording.'],
              ['Mehndi & Dholki','Vibrant designs in mustard, magenta, and emerald capturing the joyful atmosphere of Mehndi nights.'],
              ['Barat Reception',"Grand, regal design themes for the main wedding gala hosted by the bride's family."],
              ['Walima Feast',"Clean, elegant designs for the groom's family Walima sunnah feast with Islamic opening invocations."],
              ['Iftaar Party','Warm Ramadan lantern and crescent-themed designs with iftar timing notes.'],
              ['Birthday & Kids Parties','Colourful confetti, balloon, and cake animations for birthday invitations.'],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-border/70 bg-card p-5">
                <h3 className="font-bold text-foreground text-sm mb-1">{title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{t('inviteProseH2d')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ['Live RSVP Tracking','See exactly how many guests have confirmed in real time. Export the full guest list to CSV for seating and catering planning.'],
              ['Google Maps Integration',"Guests tap the venue address to open Google Maps navigation directly — eliminating the 'I can't find the venue' problem."],
              ['WhatsApp One-Tap RSVP','A pre-filled WhatsApp message is generated for each invitation, increasing RSVP response rates.'],
              ['Countdown Timer','A live countdown to the event day builds excitement and serves as a constant reminder.'],
              ['18 Language Support','Send invitations to family members who prefer Urdu, Arabic, Hindi, or any of the 15 other supported languages.'],
              ['Instant Sharing','No printing wait time, no courier cost. Your invitation is live the moment you click create.'],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-border/70 bg-card p-5">
                <h3 className="font-bold text-foreground text-sm mb-1">{title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{t('inviteProseH2e')}</h2>
          <ul className="space-y-3 text-base text-muted-foreground">
            {['Send wedding invitations 10–14 days before the event. For Mehndi and Dholki, 5–7 days is sufficient.','Use formal host name formatting: both parents\' names (e.g., "Mr. & Mrs. Tariq Mahmood" hosting on behalf of the bride).','Include a clear RSVP deadline to improve your headcount accuracy for catering.','For bilingual families, use the English-Urdu hybrid wording template so both elders and younger relatives feel addressed.','Always double-check the venue address before sharing — once the link is out to 200 family members, corrections require a new message.','Send a reminder 2 days before the event — it often doubles RSVP confirmation rates.'].map((tip, i) => (
              <li key={i} className="flex gap-3"><span className="text-emerald-600 font-bold shrink-0">•</span><span>{tip}</span></li>
            ))}
          </ul>
        </div>

        {/* Featured Wedding Guides Box for Contextual Internal Linking */}
        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6 space-y-4">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            💡 Wedding Invitation Wording &amp; RSVP Guides
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <a href="/blog/complete-guide-to-pakistani-wedding-invitation-wording-urdu-english" className="p-4 rounded-2xl bg-card border border-border hover:border-emerald-500 transition-all font-semibold text-primary">
              → Complete Pakistani Wedding Invitation Wording Guide
              <p className="text-xs text-muted-foreground font-normal mt-1">Bilingual Urdu/English templates for Nikkah, Mehndi, Barat &amp; Walima cards with Bismillah calligraphy.</p>
            </a>
            <a href="/blog/how-to-manage-wedding-guest-lists-and-whatsapp-rsvps-effortlessly" className="p-4 rounded-2xl bg-card border border-border hover:border-emerald-500 transition-all font-semibold text-primary">
              → How to Manage Wedding Guest Lists &amp; WhatsApp RSVPs
              <p className="text-xs text-muted-foreground font-normal mt-1">Master guest headcounts, dietary tracking, and automated WhatsApp reminders for your wedding.</p>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
