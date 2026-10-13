import { Phone, Mail, MapPin, ShieldAlert } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import ContactForm from '../components/ContactForm.jsx'
import Reveal from '../components/Reveal.jsx'
import { useSeo } from '../hooks/useSeo.js'
import { CONTACT } from '../data/site.js'

export default function ContactUs() {
  useSeo({
    title: 'Contact Us, Bokaro Office',
    description: 'Contact A1 Investors Point in Bokaro, Jharkhand by phone, email or the enquiry form for mutual fund and insurance services.',
    path: '/contact',
  })
  const items = [
    { icon: Phone, label: 'Phone', node: <a className="font-semibold text-navy-700 hover:text-leaf-700" href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a> },
    { icon: Mail, label: 'Email', node: <a className="break-all font-semibold text-navy-700 hover:text-leaf-700" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> },
    { icon: MapPin, label: 'Office', node: <address className="not-italic leading-relaxed text-ink">{CONTACT.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address> },
  ]
  return (
    <>
      <PageHeader eyebrow="Contact us" title="Call, email or visit the office">Call us, email us, or send a message. We’ll get back to you.</PageHeader>
      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div className="space-y-5">
            {items.map((it, i) => (
              <Reveal key={it.label} id={it.label === 'Phone' ? 'phone' : undefined} delay={i * 80} className="card flex gap-4 !p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-leaf-50 text-leaf-600"><it.icon size={22} aria-hidden="true" /></span>
                <div><h2 className="font-sans text-xs font-semibold uppercase tracking-wider !text-ink-mute">{it.label}</h2><div className="mt-1">{it.node}</div></div>
              </Reveal>
            ))}
            <Reveal delay={240} className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
              <ShieldAlert size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
              <p><b>Stay safe.</b> We will never ask for your passwords, OTPs, or card/bank credentials by phone, email or when you contact us.</p>
            </Reveal>
          </div>
          <Reveal delay={100}><ContactForm /></Reveal>
        </div>
      </section>
    </>
  )
}
