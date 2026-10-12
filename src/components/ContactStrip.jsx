import { Link } from 'react-router-dom'
import { Phone, Mail } from 'lucide-react'
import { CONTACT } from '../data/site.js'
import Reveal from './Reveal.jsx'

export default function ContactStrip({ title = 'Talk to us', text = 'Call, email or send us a message. We’ll get back to you and explain the options clearly.' }) {
  return (
    <section className="section pt-0">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-700 to-navy-950 px-7 py-12 text-white shadow-lift sm:px-14 sm:py-16">
          <div aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-leaf-500/25 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold !text-white sm:text-4xl">{title}</h2>
              <p className="mt-3 max-w-xl text-navy-100">{text}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
              <a href={CONTACT.phoneHref} className="btn btn-light"><Phone size={16} aria-hidden="true" />{CONTACT.phoneDisplay}</a>
              <a href={`mailto:${CONTACT.email}`} className="btn btn-outline-light"><Mail size={16} aria-hidden="true" />Email us</a>
              <Link to="/contact" className="btn btn-green">Contact us</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
