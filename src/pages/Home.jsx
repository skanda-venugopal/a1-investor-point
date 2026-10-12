import { Link } from 'react-router-dom'
import { TrendingUp, ShieldCheck, Ear, Compass, HandHelping, LifeBuoy, ArrowRight, Calculator } from 'lucide-react'
import HeroSection from '../components/HeroSection.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import ContactStrip from '../components/ContactStrip.jsx'
import Reveal from '../components/Reveal.jsx'
import Disclaimer from '../components/Disclaimer.jsx'
import { useSeo } from '../hooks/useSeo.js'
import { SITE, FLAGS, RISK_STATEMENT, PEOPLE } from '../data/site.js'

const steps = [
  { icon: Ear, title: 'We listen', text: 'We start with your goals, your timeline and your comfort with risk, not with a product.' },
  { icon: Compass, title: 'We explain', text: 'Options, costs and risks explained simply, so you can decide without guessing.' },
  { icon: HandHelping, title: 'We help you start', text: 'Guidance with the paperwork and process for mutual fund investments and insurance enquiries.' },
  { icon: LifeBuoy, title: 'We stay available', text: 'Service support when you need it. A local team you can call or visit.' },
]

export default function Home() {
  useSeo({
    title: null,
    description: 'A1 Investors Point: mutual fund distribution and insurance services in Bokaro, Jharkhand. In the business since 2002. Explore mutual funds, insurance and a SIP calculator.',
    path: '/',
  })
  return (
    <>
      <HeroSection />

      <section className="section bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <SectionHeading eyebrow="Welcome" title="A local team for your mutual fund and insurance needs">
            A1 Investors Point is a financial-services business based in Bokaro. Founder and CEO {PEOPLE.founder.name} has been in the business since {SITE.foundedYear}, and the firm’s approach has stayed the same: explain things clearly, respect your goals, and be there after the first meeting.
          </SectionHeading>
          <Reveal delay={120} className="grid gap-4 sm:grid-cols-2">
            {[
              ['Clear', 'Simple explanations, no jargon.'],
              ['Unhurried', 'You set the pace. We never pressure you to decide.'],
              ['Transparent', 'Risks and limitations are always spelled out.'],
              ['Local', 'A Bokaro office and people you can actually reach.'],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-navy-100 bg-paper p-5">
                <h3 className="text-xl font-semibold">{t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="What we do" title="Mutual funds and insurance, same team" align="center">
            Starting a SIP or looking at cover for your family? You can talk to one team for both.
          </SectionHeading>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <ServiceCard tone="navy" icon={TrendingUp} title="Mutual fund distribution"
              text="Support to understand mutual funds and SIPs, and to invest through a registered mutual fund distributor."
              points={['SIP and lump-sum investing support', 'Help with onboarding and paperwork', 'Ongoing service and queries']}
              to="/mutual-funds" cta="Explore mutual funds" />
            <ServiceCard tone="green" icon={ShieldCheck} delay={120} title="Insurance services"
              text="Enquiry and policy support across life, health and medical insurance with leading insurers."
              points={['Aditya Birla Sun Life Insurance', 'Star Health Insurance', 'ICICI Lombard medical insurance']}
              to="/insurance" cta="Explore insurance" />
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="How we work" title="What a typical meeting looks like" />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90} className="relative rounded-2xl border border-navy-100 bg-paper p-6">
                <span className="absolute right-5 top-4 font-serif text-5xl font-bold text-navy-100" aria-hidden="true">{i + 1}</span>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-700 text-white"><s.icon size={22} aria-hidden="true" /></span>
                <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Experience" title={`In the business since ${SITE.foundedYear}`}>
              More than two decades in financial services have taught us that good outcomes come from patience, discipline and honest conversations{FLAGS.showClientCount ? `. We’ve helped ${FLAGS.clientCountText} clients along the way.` : '.'}
            </SectionHeading>
            <Reveal delay={100}><Link to="/about" className="mt-8 inline-flex items-center gap-2 font-semibold text-navy-700 hover:text-leaf-700">Meet the team <ArrowRight size={16} aria-hidden="true" /></Link></Reveal>
          </div>
          <Reveal delay={120} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-leaf-50 to-navy-50 p-8 sm:p-10">
            <Calculator className="text-leaf-600" size={30} aria-hidden="true" />
            <h3 className="mt-4 text-2xl font-semibold">See what a monthly SIP might add up to</h3>
            <p className="mt-2 text-ink-soft">Try our illustrative SIP calculator. It’s a planning aid, not a promise. Actual market returns vary.</p>
            <Link to="/calculators" className="btn btn-primary mt-6">Open the SIP calculator</Link>
          </Reveal>
        </div>
      </section>

      <div className="container-page pb-8"><Disclaimer>{RISK_STATEMENT}</Disclaimer></div>
      <ContactStrip />
    </>
  )
}
