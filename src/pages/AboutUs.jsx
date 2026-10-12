import { Eye, Scale, Heart, Handshake } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import ContactStrip from '../components/ContactStrip.jsx'
import { useSeo } from '../hooks/useSeo.js'
import { PEOPLE, SITE, FLAGS } from '../data/site.js'

const values = [
  { icon: Eye, title: 'Clarity', text: 'We explain products, costs and risks in everyday language.' },
  { icon: Scale, title: 'Honesty', text: 'No guaranteed-return promises. We tell you what a product can and cannot do.' },
  { icon: Heart, title: 'Care', text: 'Your goals and your family’s security come before any sale.' },
  { icon: Handshake, title: 'Relationships', text: 'We aim to stay in touch over the years, not disappear after one sale.' },
]

function Avatar({ initials, big }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-navy-700 to-leaf-600 font-serif font-semibold text-white ${big ? 'h-28 w-28 text-4xl' : 'h-16 w-16 text-xl'}`} aria-hidden="true">{initials}</span>
  )
}

export default function AboutUs() {
  useSeo({
    title: 'About Us: Sandeep Kumar and team',
    description: `Meet the team at A1 Investors Point in Bokaro. Founder and CEO Sandeep Kumar has been in the business since ${SITE.foundedYear}.`,
    path: '/about',
  })
  const f = PEOPLE.founder
  return (
    <>
      <PageHeader eyebrow="About us" title="The team in Bokaro">
        A1 Investors Point provides mutual fund distribution and insurance services with a simple promise: we explain things clearly and we pick up the phone.
      </PageHeader>

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <SectionHeading eyebrow="Our story" title="Helping families in Bokaro with mutual funds and insurance">
            A1 Investors Point was built to make mutual funds and insurance easier to understand for families and individuals in Bokaro and nearby. We believe good financial decisions start with good information, so we take the time to listen, explain and follow up.
            {FLAGS.showClientCount && ` Over the years we’ve supported ${FLAGS.clientCountText} clients with their investments.`}
          </SectionHeading>
          <Reveal delay={100} className="grid grid-cols-2 gap-4">
            <div className="card !p-6"><p className="font-serif text-4xl font-semibold text-navy-700">{SITE.foundedYear}</p><p className="mt-1 text-sm text-ink-soft">Founder in the business since</p></div>
            {FLAGS.showClientCount
              ? <div className="card !p-6"><p className="font-serif text-4xl font-semibold text-navy-700">{FLAGS.clientCountText}</p><p className="mt-1 text-sm text-ink-soft">Clients helped</p></div>
              : <div className="card !p-6"><p className="font-serif text-4xl font-semibold text-navy-700">2</p><p className="mt-1 text-sm text-ink-soft">Core services</p></div>}
            <div className="card col-span-2 !p-6"><p className="font-serif text-2xl font-semibold text-navy-700">Mutual funds + Insurance</p><p className="mt-1 text-sm text-ink-soft">Under one roof at Sector 4, Bokaro.</p></div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Leadership" title="Founder & CEO" />
          <Reveal className="mt-10 flex flex-col gap-8 rounded-3xl border border-navy-100 bg-paper p-8 sm:flex-row sm:items-center sm:p-12">
            <Avatar initials={f.initials} big />
            <div>
              <h3 className="text-3xl font-semibold">{f.name}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-leaf-600">{f.role} · Since {SITE.foundedYear}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">{f.bio}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="The team" title="The people you’ll speak with" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PEOPLE.team.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 90} className="card flex items-center gap-5 !p-6">
                <Avatar initials={p.initials} />
                <div><h3 className="text-xl font-semibold">{p.name}</h3><p className="text-sm text-ink-mute">A1 Investors Point team</p></div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Our approach" title="How we work with you" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90} className="rounded-2xl border border-navy-100 bg-paper p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-leaf-100 text-leaf-700"><v.icon size={22} aria-hidden="true" /></span>
                <h3 className="mt-4 text-xl font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <div className="pt-16"><ContactStrip title="Come and say hello" text="Visit our Sector 4 office in Bokaro, or reach us by phone or email." /></div>
    </>
  )
}
