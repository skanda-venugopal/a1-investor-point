import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal.jsx'

/** tone: 'navy' | 'green' | 'light' */
export default function ServiceCard({ icon: Icon, title, text, points = [], to, cta, tone = 'light', delay = 0 }) {
  const tones = {
    light: { box: 'bg-white border-navy-100/70', h: 'text-navy-700', p: 'text-ink-soft', chip: 'bg-leaf-50 text-leaf-700', dot: 'bg-leaf-500', link: 'text-navy-700 hover:text-leaf-700' },
    navy: { box: 'bg-gradient-to-br from-navy-700 to-navy-900 border-navy-800', h: '!text-white', p: 'text-navy-100', chip: 'bg-white/10 text-leaf-300', dot: 'bg-leaf-300', link: 'text-white hover:text-leaf-300' },
    green: { box: 'bg-gradient-to-br from-leaf-600 to-leaf-800 border-leaf-700', h: '!text-white', p: 'text-leaf-50', chip: 'bg-white/15 text-white', dot: 'bg-white', link: 'text-white hover:text-leaf-100' },
  }[tone]
  return (
    <Reveal delay={delay} className={`group relative flex flex-col overflow-hidden rounded-3xl border p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-9 ${tones.box}`}>
      {Icon && <span className={`mb-6 grid h-12 w-12 place-items-center rounded-2xl ${tones.chip}`}><Icon size={24} aria-hidden="true" /></span>}
      <h3 className={`text-2xl font-semibold ${tones.h}`}>{title}</h3>
      <p className={`mt-3 leading-relaxed ${tones.p}`}>{text}</p>
      {points.length > 0 && (
        <ul className={`mt-5 space-y-2.5 text-sm ${tones.p}`}>
          {points.map((p) => <li key={p} className="flex gap-3"><span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${tones.dot}`} />{p}</li>)}
        </ul>
      )}
      {to && (
        <Link to={to} className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold transition ${tones.link}`}>
          {cta} <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      )}
    </Reveal>
  )
}
