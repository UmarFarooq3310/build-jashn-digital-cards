'use client'
import { useLang } from '@/lib/lang/context'

export function CreateWishProse() {
  const { t } = useLang()
  return (
    <section className="bg-muted/40 border-t border-border/60 py-14 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">

        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{t('wishProseH2a')}</h2>
          <p className="text-base leading-relaxed text-muted-foreground">A digital wish card is an animated, interactive greeting you create online and share via a unique link — no app download required for the recipient. Unlike a plain WhatsApp text message, a Cardzy digital wish card includes a full-screen animated design, the recipient's name, a heartfelt personal message, background music, and an optional photo.</p>
          <p className="text-base leading-relaxed text-muted-foreground">Digital wish cards are ideal for Eid Mubarak greetings, birthday wishes, wedding anniversaries, Ramadan Kareem, graduation congratulations, Mother's Day, Father's Day, and virtually any occasion where you want to stand out.</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{t('wishProseH2b')}</h2>
          <ol className="space-y-3 text-base text-muted-foreground list-none">
            {[
              ['Select Your Occasion','Choose from 35+ occasions including Eid ul Fitr, Eid ul Adha, Birthday, Wedding Anniversary, Ramadan, New Year, Independence Day, Graduation, and more.'],
              ['Pick a Theme & Border','Browse dozens of animated themes — from elegant golden Mehndi patterns to playful birthday confetti and festive dholki styles.'],
              ['Enter Names & Message',"Type the recipient's name, your name, and choose your message language (18 languages supported). Use a pre-written template or write a custom message."],
              ['Upload a Photo (Optional)','Add a personal photo to make the card truly one-of-a-kind.'],
              ['Share the Link','Click Create and instantly share your card link on WhatsApp, Instagram Stories, Facebook, SMS, or email.'],
            ].map(([title, desc], i) => (
              <li key={i} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white text-sm font-extrabold">{i + 1}</span>
                <div><strong className="text-foreground">{title}:</strong> <span>{desc}</span></div>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{t('wishProseH2c')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ['Eid Mubarak Cards','Personalised Eid ul Fitr and Eid ul Adha wish cards in Urdu, Arabic, or English with crescent moon designs and heartfelt duas.'],
              ['Birthday Wish Cards',"Animated birthday greeting cards with confetti, balloons, and the recipient's name in large sparkling font."],
              ['Wedding Anniversary','Elegant anniversary cards featuring rose gold accents, couple photo frames, and romantic Urdu shayari or English poetry.'],
              ['Ramadan Kareem','Beautifully crafted crescent and lantern-themed digital cards with pre-written Ramadan duas in multiple languages.'],
              ['Graduation Congratulations','Graduation cap animations, gold star effects, and congratulatory messages for board exams and university degrees.'],
              ['New Year Greetings','Firework animations, countdown elements, and festive gold-and-navy digital greeting cards.'],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-border/70 bg-card p-5">
                <h3 className="font-bold text-foreground text-sm mb-1">{title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{t('wishProseH2d')}</h2>
          <p className="text-base leading-relaxed text-muted-foreground">Cardzy supports <strong className="text-foreground">Urdu</strong> (Nastaliq script), <strong className="text-foreground">Arabic</strong>, <strong className="text-foreground">English</strong>, <strong className="text-foreground">Hindi</strong>, <strong className="text-foreground">Spanish</strong>, <strong className="text-foreground">French</strong>, <strong className="text-foreground">Mandarin Chinese</strong>, <strong className="text-foreground">Portuguese</strong>, <strong className="text-foreground">Russian</strong>, <strong className="text-foreground">German</strong>, <strong className="text-foreground">Japanese</strong>, <strong className="text-foreground">Korean</strong>, <strong className="text-foreground">Italian</strong>, <strong className="text-foreground">Turkish</strong>, <strong className="text-foreground">Indonesian</strong>, <strong className="text-foreground">Bengali</strong>, <strong className="text-foreground">Vietnamese</strong>, and <strong className="text-foreground">Swahili</strong>.</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{t('wishProseH2e')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 text-left font-bold text-foreground">Feature</th>
                  <th className="py-3 text-center font-bold text-emerald-700">Free</th>
                  <th className="py-3 text-center font-bold text-amber-700">Pro</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[['Create & share wish cards','✓','✓'],['35+ occasions','✓','✓'],['18 languages','✓','✓'],['Classic themes','✓','✓'],['Premium & animated themes','—','✓'],['Photo upload','✓','✓'],['Background music','✓','✓'],['Remove watermark','—','✓'],['Download as image (PNG)','—','✓'],['Unlimited card storage','—','✓']].map(([f,fr,pr]) => (
                  <tr key={f} className="border-b border-border/50">
                    <td className="py-2.5">{f}</td><td className="py-2.5 text-center">{fr}</td><td className="py-2.5 text-center">{pr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{t('wishProseH2f')}</h2>
          <ul className="space-y-3 text-base text-muted-foreground">
            {["Use the recipient's full name or nickname — personalisation makes a card feel special.","Write your message in the recipient's native language. A birthday wish in someone's mother tongue carries 10× more emotional weight.",'Choose a theme that matches the occasion mood — elegant for anniversaries, bright and festive for birthdays and Eid.','Upload a high-quality photo with good lighting for the best visual result.','Send the link early — at least an hour before the celebration moment so the recipient has time to enjoy it.','For Eid cards, send on the eve of Eid (Chand Raat) for maximum emotional impact.'].map((tip, i) => (
              <li key={i} className="flex gap-3"><span className="text-emerald-600 font-bold shrink-0">•</span><span>{tip}</span></li>
            ))}
          </ul>
        </div>

        {/* Featured Guides Box for Contextual Internal Linking */}
        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6 space-y-4">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            💡 Popular Wording Guides &amp; Inspiration
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <a href="/guide/eid-wording-ideas" className="p-4 rounded-2xl bg-card border border-border hover:border-emerald-500 transition-all font-semibold text-primary">
              → Eid Mubarak Wording &amp; Replies in Urdu &amp; English
              <p className="text-xs text-muted-foreground font-normal mt-1">Copyable Eid wishes, &quot;Eid Mubarak to you too&quot; meanings, and Khair Mubarak replies.</p>
            </a>
            <a href="/blog/complete-guide-to-pakistani-wedding-invitation-wording-urdu-english" className="p-4 rounded-2xl bg-card border border-border hover:border-emerald-500 transition-all font-semibold text-primary">
              → Pakistani Wedding Invitation Card Text Guide
              <p className="text-xs text-muted-foreground font-normal mt-1">Bilingual Urdu/English wording for Nikkah, Mehndi, Barat, and Walima cards.</p>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
