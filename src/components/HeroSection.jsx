import { Link } from 'react-router-dom'
import { ArrowRight, Phone, ShieldCheck, MapPin, CalendarDays } from 'lucide-react'
import logo from '../assets/logo-full.png'
import { PeakMotif } from './Motif.jsx'
import { SITE, CONTACT, FLAGS } from '../data/site.js'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="grain absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div aria-hidden="true" className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-leaf-200/50 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-24 -top-10 h-[28rem] w-[28rem] rounded-full bg-navy-100/70 blur-3xl" />
      <PeakMotif className="pointer-events-none absolute bottom-0 left-1/2 hidden h-72 w-auto -translate-x-1/2 text-navy-700/[.06] lg:block" />

      <div className="container-page relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_.85fr] lg:gap-8 lg:py-28">
        <div>
          <p className="eyebrow">Mutual funds &amp; insurance · Bokaro</p>
          <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.05] sm:text-6xl lg:text-[4.1rem]">
            Your gateway to <span className="text-leaf-600">mutual funds</span> and <span className="relative whitespace-nowrap">insurance<svg aria-hidden="true" viewBox="0 0 200 12" className="absolute -bottom-2 left-0 w-full text-leaf-400" preserveAspectRatio="none"><path d="M2 8 Q 50 1 100 6 T 198 4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg></span>.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
            A1 Investors Point helps families and individuals in Bokaro understand their options and get help after they start. Serving clients since {SITE.foundedYear}.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/mutual-funds" className="btn btn-primary">Explore Mutual Funds <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link to="/insurance" className="btn btn-green">Explore Insurance <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link to="/contact" className="btn btn-ghost">Contact Us</Link>
          </div>
          <dl className="mt-12 grid max-w-xl grid-cols-1 gap-5 border-t border-navy-100 pt-8 sm:grid-cols-3">
            <div><dt className="text-xs font-semibold uppercase tracking-wider text-ink-mute">In the business</dt><dd className="mt-1 font-serif text-2xl font-semibold text-navy-700">Since {SITE.foundedYear}</dd></div>
            {FLAGS.showClientCount && <div><dt className="text-xs font-semibold uppercase tracking-wider text-ink-mute">Clients helped</dt><dd className="mt-1 font-serif text-2xl font-semibold text-navy-700">{FLAGS.clientCountText}</dd></div>}
            <div><dt className="text-xs font-semibold uppercase tracking-wider text-ink-mute">Services</dt><dd className="mt-1 font-serif text-2xl font-semibold text-navy-700">Funds &amp; Insurance</dd></div>
            <div><dt className="text-xs font-semibold uppercase tracking-wider text-ink-mute">Based in</dt><dd className="mt-1 font-serif text-2xl font-semibold text-navy-700">Bokaro</dd></div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div aria-hidden="true" className="absolute inset-6 -rotate-3 rounded-[2.5rem] bg-gradient-to-br from-navy-700 to-leaf-600 opacity-90" />
          <div className="relative rounded-[2.5rem] border border-white bg-white p-8 shadow-lift sm:p-12">
            <img src={logo} alt="A1 Investors Point logo: a rising arrow forming the letter A, with the tagline “Your Gateway to Mutual Funds | Investments”" width="756" height="848" className="mx-auto h-auto max-h-[26rem] w-auto" />
          </div>
          <div className="float-slow absolute -left-3 top-10 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lift sm:flex">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-leaf-50 text-leaf-600"><CalendarDays size={20} aria-hidden="true" /></span>
            <span className="text-sm leading-tight"><b className="block text-navy-700">Since {SITE.foundedYear}</b><span className="text-ink-mute">in the business</span></span>
          </div>
          <div className="float-slow absolute -bottom-5 -right-3 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lift [animation-delay:-4s] sm:flex">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-50 text-navy-600"><MapPin size={20} aria-hidden="true" /></span>
            <span className="text-sm leading-tight"><b className="block text-navy-700">Bokaro, Jharkhand</b><span className="text-ink-mute">Sector 4 office</span></span>
          </div>
        </div>
      </div>
    </section>
  )
}
