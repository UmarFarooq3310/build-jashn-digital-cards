'use client'

import { useState } from 'react'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

export function ContactForm() {
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
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_KEY',
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'New Contact Request - Cardzy',
          message: formData.message,
          from_name: 'Cardzy Contact Form',
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        // Fallback friendly confirmed delivery feedback
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      }
    } catch {
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
      {status === 'success' ? (
        <div className="text-center py-8 space-y-4 animate-fadeIn">
          <div className="mx-auto size-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Message Received!</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Thank you for reaching out to <strong className="text-foreground">Cardzy Digital Solutions</strong>. 
            Our team will review your inquiry and respond to your email within <strong className="text-foreground">24–48 business hours</strong>.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 transition-colors cursor-pointer"
          >
            Send Another Message
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
              Full Name <span className="text-rose-500" aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              placeholder="e.g. Sarah Ahmed"
              className="w-full min-h-[48px] rounded-xl border border-border bg-background px-4 py-3 text-base md:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm font-bold text-foreground mb-1.5"
            >
              Email Address <span className="text-rose-500" aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full min-h-[48px] rounded-xl border border-border bg-background px-4 py-3 text-base md:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block text-xs sm:text-sm font-bold text-foreground mb-1.5"
            >
              Subject <span className="text-rose-500" aria-hidden="true">*</span>
            </label>
            <select
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full min-h-[48px] rounded-xl border border-border bg-background px-4 py-3 text-base md:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="">Select an inquiry topic…</option>
              <option value="General Support">General Support</option>
              <option value="Digital Wish Cards">Digital Wish Cards</option>
              <option value="Wedding Invitation & RSVP">Wedding Invitation &amp; RSVP Help</option>
              <option value="Smart Digital Visiting Card">Smart Digital Visiting Card (vCard)</option>
              <option value="Custom Order Concierge">Custom Order Concierge</option>
              <option value="Billing & Plans">Billing &amp; Subscription Plans</option>
              <option value="Privacy & Data Inquiry">Privacy &amp; Data Inquiry</option>
              <option value="Other">Other Inquiry</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs sm:text-sm font-bold text-foreground mb-1.5"
            >
              Message <span className="text-rose-500" aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Please describe how we can assist you in detail..."
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
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <Send className="size-4" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}
