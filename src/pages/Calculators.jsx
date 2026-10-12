import PageHeader from '../components/PageHeader.jsx'
import SipCalculator from '../components/SipCalculator.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import { useSeo } from '../hooks/useSeo.js'

export default function Calculators() {
  useSeo({
    title: 'SIP Calculator: illustrative estimates',
    description: 'Use the free SIP calculator from A1 Investors Point to see an illustrative estimate of a monthly SIP. Estimates are not guaranteed; mutual fund investments are subject to market risks.',
    path: '/calculators',
  })
  return (
    <>
      <PageHeader eyebrow="Calculators" title="SIP calculator">An illustrative look at how regular monthly investing could add up over time under assumed returns.</PageHeader>
      <section className="section">
        <div className="container-page"><SipCalculator /></div>
      </section>
      <section className="section bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <SectionHeading eyebrow="How it works" title="Assumptions behind the numbers" />
          <Reveal delay={100} className="space-y-5 text-ink-soft">
            <p>The calculator uses the standard future-value formula for a series of equal monthly investments made at the <b>beginning</b> of each month:</p>
            <p className="rounded-2xl bg-navy-50 p-5 font-mono text-sm text-navy-700">FV = P × [((1 + r)<sup>n</sup> − 1) ÷ r] × (1 + r)</p>
            <ul className="list-disc space-y-2 pl-5">
              <li><b>P</b> is your monthly investment; <b>n</b> is the number of monthly instalments (years × 12).</li>
              <li><b>r</b> is the assumed monthly rate = annual return ÷ 12 ÷ 100. If the rate is 0%, FV = P × n.</li>
              <li>Returns are assumed constant. Real markets move up and down, and actual results can be lower or higher, or even negative.</li>
              <li>Charges, exit loads, taxes and inflation are not included.</li>
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  )
}
