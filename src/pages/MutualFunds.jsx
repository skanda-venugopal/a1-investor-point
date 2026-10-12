import { Link } from 'react-router-dom'
import { PiggyBank, Layers, Hourglass, Gauge, Repeat, Users2, BadgeCheck } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Faq from '../components/Faq.jsx'
import Disclaimer from '../components/Disclaimer.jsx'
import ContactStrip from '../components/ContactStrip.jsx'
import { useSeo } from '../hooks/useSeo.js'
import { ARNS, FLAGS, RISK_STATEMENT } from '../data/site.js'

const concepts = [
  { icon: Hourglass, title: 'Investment horizon', text: 'How long you can stay invested matters. Market-linked investments can move up and down in the short term, so goals and time frames should be considered together.' },
  { icon: Layers, title: 'Diversification', text: 'A mutual fund spreads money across many securities. Diversification may reduce the impact of any single holding, but it does not remove market risk.' },
  { icon: Gauge, title: 'Risk profile', text: 'Every investor’s comfort with ups and downs is different. Understanding yours helps you choose how much market risk you are willing to accept.' },
]

const faqs = [
  { q: 'What is a mutual fund?', a: 'A mutual fund pools money from many investors and invests it in securities such as shares and bonds, managed by a professional fund manager according to the scheme’s stated objective. Returns depend on market performance and are not guaranteed.' },
  { q: 'What is a SIP?', a: 'A Systematic Investment Plan (SIP) lets you invest a fixed amount in a mutual fund scheme at regular intervals, typically monthly. It is a method of investing, not a separate product, and it does not guarantee profit or protect against loss.' },
  { q: 'Do I need a large amount to start?', a: 'Many schemes allow SIPs with modest monthly amounts. Minimum amounts differ by scheme, so check the scheme documents or ask us.' },
  { q: 'What does a distributor do?', a: 'A mutual fund distributor helps investors with information about schemes, onboarding, transactions and service support. Distributors earn commission from fund houses; please ask us if you’d like details of how we are remunerated.' },
  { q: 'Can you tell me which fund to buy?', a: 'We’re happy to explain how different categories of funds work and answer your questions. Online content and calculators on this site are general information, not personalised investment advice.' },
]

export default function MutualFunds() {
  useSeo({
    title: 'Mutual Funds & SIP Support in Bokaro',
    description: 'Understand mutual funds and SIPs without the jargon. A1 Investors Point provides mutual fund distribution and service support in Bokaro, Jharkhand. Mutual fund investments are subject to market risks.',
    path: '/mutual-funds',
  })
  return (
    <>
      <PageHeader eyebrow="Mutual funds" title="Mutual funds, explained simply, and supported locally">
        We help you understand your options and invest through a registered mutual fund distributor, with service support along the way.
      </PageHeader>

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <SectionHeading eyebrow="The basics" title="What are mutual funds and SIPs?">
            A mutual fund collects money from many investors and invests it in a portfolio of securities, run by a professional fund manager. A SIP is a way to invest a fixed amount regularly, helping you build the habit of investing over time.
          </SectionHeading>
          <Reveal delay={100} className="grid gap-4 sm:grid-cols-2">
            <div className="card !p-6"><PiggyBank className="text-leaf-600" aria-hidden="true" /><h3 className="mt-3 text-xl font-semibold">Start small</h3><p className="mt-1.5 text-sm text-ink-soft">SIPs let you begin with a monthly amount that suits your budget.</p></div>
            <div className="card !p-6"><Repeat className="text-leaf-600" aria-hidden="true" /><h3 className="mt-3 text-xl font-semibold">Stay regular</h3><p className="mt-1.5 text-sm text-ink-soft">Investing at fixed intervals brings routine to your plan.</p></div>
            <div className="card !p-6 sm:col-span-2"><Users2 className="text-leaf-600" aria-hidden="true" /><h3 className="mt-3 text-xl font-semibold">How A1 Investors Point helps</h3><p className="mt-1.5 text-sm text-ink-soft">As a mutual fund distributor, we help with scheme information, onboarding, paperwork, transactions and ongoing service queries.</p></div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Good to know" title="Three ideas behind sensible investing" align="center">General education to help you ask better questions, not a recommendation.</SectionHeading>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {concepts.map((c, i) => (
              <Reveal key={c.title} delay={i * 100} className="rounded-3xl border border-navy-100 bg-paper p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-700 text-white"><c.icon size={24} aria-hidden="true" /></span>
                <h3 className="mt-5 text-2xl font-semibold">{c.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{c.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {FLAGS.showArn && (
        <section className="section">
          <div className="container-page grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <SectionHeading eyebrow="Distributor details" title="Our mutual fund distributor registrations">
              An ARN is the AMFI Registration Number issued to mutual fund distributors. It identifies us as a distributor of mutual fund products; it is not an investment-adviser registration.
            </SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2">
              {ARNS.map((a, i) => (
                <Reveal key={a.code} delay={i * 100} className="card !p-6">
                  <BadgeCheck className="text-leaf-600" aria-hidden="true" />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-ink-mute">ARN</p>
                  <p className="font-serif text-3xl font-semibold text-navy-700">{a.code}</p>
                  <p className="mt-1 text-sm text-ink-soft">{a.holder}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <SectionHeading eyebrow="Questions" title="Common questions" />
          <Reveal delay={100}><Faq items={faqs} /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-page space-y-6">
          <div className="flex flex-wrap gap-3"><Link to="/calculators" className="btn btn-primary">Try the SIP calculator</Link><Link to="/contact" className="btn btn-ghost">Speak with us</Link></div>
          <Disclaimer>{RISK_STATEMENT} A1 Investors Point acts as a mutual fund distributor and does not guarantee returns or protect against loss. Content on this page is general information and not personalised investment advice.</Disclaimer>
        </div>
      </section>
      <ContactStrip />
    </>
  )
}
