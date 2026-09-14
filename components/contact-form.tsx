'use client'

import { useState } from 'react'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { useLang } from '@/lib/lang/context'
import { CONTACT_T, pt } from '@/lib/lang/page-translations'

export function ContactForm() {
  const { lang } = useLang()
  const isUrdu = lang === 'ur' || lang === 'ar'

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const emailSubject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name} - Cardzy`)
      const emailBody = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
      
      // Dispatch via standard mailto directly to Cardzy Support
      if (typeof window !== 'undefined') {
        window.location.href = `mailto:cardzyonline@gmail.com?subject=${emailSubject}&body=${emailBody}`
      }
      setStatus('success')
    } catch {
      setStatus('success')
    }
  }

  return (
    <div className={`rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs ${isUrdu ? 'font-urdu' : ''}`}>
      {status === 'success' ? (
        <div className="text-center py-8 space-y-4 animate-fadeIn">
          <div className="mx-auto size-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground">{pt(CONTACT_T.msgReceived, lang)}</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            {pt(CONTACT_T.msgReceivedDesc, lang)}
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 transition-colors cursor-pointer"
          >
            {pt(CONTACT_T.sendAnother, lang)}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === 'error' && (
            <div className="flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs sm:text-sm text-rose-700 dark:text-rose-400">
              <AlertCircle className="size-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs sm:text-sm font-bold text-foreground mb-1.5"
            >
              {pt(CONTACT_T.fullNameLabel, lang)} <span className="text-rose-500" aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              placeholder={pt(CONTACT_T.fullNamePlaceholder, lang)}
              className="w-full min-h-[48px] rounded-xl border border-border bg-background px-4 py-3 text-base md:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm font-bold text-foreground mb-1.5"
            >
              {pt(CONTACT_T.emailLabel, lang)} <span className="text-rose-500" aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder={pt(CONTACT_T.emailPlaceholder, lang)}
              className="w-full min-h-[48px] rounded-xl border border-border bg-background px-4 py-3 text-base md:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block text-xs sm:text-sm font-bold text-foreground mb-1.5"
            >
              {pt(CONTACT_T.subjectLabel, lang)} <span className="text-rose-500" aria-hidden="true">*</span>
            </label>
            <select
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full min-h-[48px] rounded-xl border border-border bg-background px-4 py-3 text-base md:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="">{pt(CONTACT_T.selectTopic, lang)}</option>
              <option value="General Support">{pt(CONTACT_T.topicGeneral, lang)}</option>
              <option value="Digital Wish Cards">{pt(CONTACT_T.topicWish, lang)}</option>
              <option value="Wedding Invitation & RSVP">{pt(CONTACT_T.topicWedding, lang)}</option>
              <option value="Smart Digital Visiting Card">{pt(CONTACT_T.topicVCard, lang)}</option>
              <option value="Custom Order Concierge">{pt(CONTACT_T.topicConcierge, lang)}</option>
              <option value="Billing & Plans">{pt(CONTACT_T.topicBilling, lang)}</option>
              <option value="Privacy & Data Inquiry">{pt(CONTACT_T.topicPrivacy, lang)}</option>
              <option value="Other">{pt(CONTACT_T.topicOther, lang)}</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs sm:text-sm font-bold text-foreground mb-1.5"
            >
              {pt(CONTACT_T.messageLabel, lang)} <span className="text-rose-500" aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder={pt(CONTACT_T.messagePlaceholder, lang)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base md:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full min-h-[48px] rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold py-3.5 text-sm sm:text-base transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>{pt(CONTACT_T.sendingMessage, lang)}</span>
              </>
            ) : (
              <>
                <Send className="size-4" />
                <span>{pt(CONTACT_T.sendMessageBtn, lang)}</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}
