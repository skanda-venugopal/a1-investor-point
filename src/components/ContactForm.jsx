import { useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SERVICE_OPTIONS } from '../data/site.js'

const initialStatus = { type: 'idle', message: '' }

export default function ContactForm() {
  const [status, setStatus] = useState(initialStatus)
  const [isSending, setIsSending] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSending(true)
    setStatus(initialStatus)

    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form).entries())

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      let result
      try {
        result = await response.json()
      } catch {
        throw new Error('The message service returned an invalid response. Please check the server setup and try again.')
      }
      if (!response.ok) throw new Error(result.error || 'Unable to send your message.')

      form.reset()
      setStatus({ type: 'success', message: 'Thanks for reaching out. Your message has been sent.' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to send your message. Please try again.',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="card">
      <div className="mb-6 space-y-2">
        <h2 className="text-2xl font-semibold">Send us a message</h2>
        <p className="text-sm leading-relaxed text-ink-soft">
          Tell us how we can help and our team will get back to you. Please don’t include passwords,
          OTPs, PAN/Aadhaar, or bank or card details.
        </p>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="contact-name">Your name</label>
          <input className="field" id="contact-name" name="name" type="text" autoComplete="name" maxLength={120} required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="contact-email">Email address</label>
          <input className="field" id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="contact-phone">Phone number <span className="font-normal text-ink-mute">(optional)</span></label>
          <input className="field" id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="contact-service">What can we help with?</label>
          <select className="field" id="contact-service" name="service" defaultValue="" required>
            <option value="" disabled>Select a service</option>
            {SERVICE_OPTIONS.map((service) => <option key={service} value={service}>{service}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="contact-message">Message</label>
          <textarea className="field min-h-32 resize-y" id="contact-message" name="message" rows="4" maxLength={2000} required />
        </div>
        <button className="btn btn-primary w-full sm:w-auto" type="submit" disabled={isSending}>
          <Send size={16} aria-hidden="true" />
          {isSending ? 'Sending…' : 'Send message'}
        </button>
        {status.message && (
          <p className={`flex items-start gap-2 text-sm ${status.type === 'success' ? 'text-leaf-700' : 'text-red-700'}`} role={status.type === 'error' ? 'alert' : 'status'}>
            {status.type === 'success' && <CheckCircle2 size={18} className="shrink-0" aria-hidden="true" />}
            {status.message}
          </p>
        )}
      </form>
      <p className="mt-6 border-t border-navy-100 pt-4 text-xs leading-relaxed text-ink-mute">
        We’ll use these details only to respond to your enquiry. See our <Link to="/privacy-policy" className="font-semibold text-navy-700 underline">Privacy Policy</Link>.
      </p>
    </div>
  )
}
