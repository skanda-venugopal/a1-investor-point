import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import Logo from './Logo.jsx'
import { NAV, FOOTER_LEGAL, CONTACT, SITE, RISK_STATEMENT, INSURANCE_STATEMENT } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="mt-auto bg-navy-950 text-navy-100">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-200">{SITE.shortDescription}</p>
          <p className="mt-4 font-serif text-lg italic text-leaf-300">{SITE.tagline}</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[.18em] !text-leaf-300">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map((n) => <li key={n.to}><Link className="text-navy-100 transition hover:text-white" to={n.to}>{n.label}</Link></li>)}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[.18em] !text-leaf-300">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3"><Phone size={17} className="mt-0.5 shrink-0 text-leaf-300" aria-hidden="true" /><a className="hover:text-white" href={CONTACT.phoneHref}>Call our office</a></li>
            <li className="flex gap-3"><Mail size={17} className="mt-0.5 shrink-0 text-leaf-300" aria-hidden="true" /><a className="break-all hover:text-white" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            <li className="flex gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-leaf-300" aria-hidden="true" /><address className="not-italic leading-relaxed">{CONTACT.addressLines.join(', ')}</address></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page space-y-3 py-8 text-xs leading-relaxed text-navy-300">
          <p>{RISK_STATEMENT}</p>
          <p>{INSURANCE_STATEMENT}</p>
          <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
            <ul className="flex gap-5">
              {FOOTER_LEGAL.map((l) => <li key={l.to}><Link className="underline-offset-2 hover:text-white hover:underline" to={l.to}>{l.label}</Link></li>)}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
