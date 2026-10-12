import { HeartPulse, Shield, Stethoscope, ClipboardList, PhoneCall, FileSearch, FileCheck2 } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import Reveal from '../components/Reveal.jsx'
import Faq from '../components/Faq.jsx'
import Disclaimer from '../components/Disclaimer.jsx'
import ContactStrip from '../components/ContactStrip.jsx'
import { useSeo } from '../hooks/useSeo.js'
import { INSURERS, FLAGS, INSURANCE_STATEMENT } from '../data/site.js'

const process = [
  { icon: PhoneCall, title: 'Get in touch', text: 'Call, email or send us a message to talk about the cover you’re considering.' },
  { icon: ClipboardList, title: 'Share your needs', text: 'Tell us who needs cover and any existing policies, so the conversation is relevant.' },
  { icon: FileSearch, title: 'Understand the options', text: 'We walk you through available plans, features, exclusions and waiting periods in everyday words.' },
  { icon: FileCheck2, title: 'Proceed at your pace', text: 'If you choose to go ahead, we assist with the application. The insurer decides underwriting and claims.' },
]

const faqs = [
  { q: 'Can you guarantee my application or claim will be approved?', a: 'No. Acceptance, premiums and claim decisions are made by the insurer based on its terms and underwriting. We can help you understand the process and the paperwork.' },
  { q: 'Will I get the lowest premium?', a: 'Premiums depend on age, health, sum assured, plan and insurer. We can explain the options available, but we can’t promise the lowest price in the market.' },
  { q: 'Which insurers do you work with?', a: 'We assist with enquiries for Aditya Birla Sun Life Insurance (life), Star Health Insurance (health) and ICICI Lombard (medical insurance). Please contact us to confirm what is currently available.' },
  { q: 'I’m an existing customer. Can you help?', a: 'Send us a message on our contact page or call us, and we’ll help with service queries where we’re able to.' },
]

export default function Insurance() {
  useSeo({
    title: 'Life, Health & Medical Insurance in Bokaro',
    description: 'Insurance enquiry and policy support in Bokaro with Aditya Birla Sun Life Insurance, Star Health Insurance and ICICI Lombard. Understand your options without the jargon.',
    path: '/insurance',
  })
  return (
    <>
      <PageHeader eyebrow="Insurance" title="Life, health and medical insurance">
        Life, health and medical insurance enquiries and policy support, explained clearly, from our office in Bokaro.
      </PageHeader>

      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Cover we assist with" title="Life, health and medical insurance" align="center">
            We help you understand and apply for cover offered by the insurers below.
          </SectionHeading>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <ServiceCard icon={Shield} tone="navy" title="Life insurance" text="Cover designed to provide financial support to your family. We assist with enquiries for Aditya Birla Sun Life Insurance." points={['Understand plan types and features', 'Help with proposal paperwork', 'Policy service queries']} />
            <ServiceCard icon={HeartPulse} tone="green" delay={100} title="Health insurance" text="Cover for hospitalisation and related medical costs. We assist with enquiries for Star Health Insurance." points={['Compare coverage, waiting periods and exclusions', 'Guidance on documentation', 'Renewal and service queries']} />
            <ServiceCard icon={Stethoscope} tone="light" delay={200} title="Medical insurance" text="Medical insurance enquiries with ICICI Lombard. Ask us what is currently available." points={['Explanation of cover and limits', 'Help with the application process', 'Support for common queries']} />
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Insurer details" title="Who we work with" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {INSURERS.map((i, n) => (
              <Reveal key={i.name} delay={n * 90} className="card !p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-leaf-600">{i.category}</p>
                <h3 className="mt-2 text-xl font-semibold">{i.name}</h3>
                <p className="mt-3 text-sm text-ink-soft">Associated with <b className="text-navy-700">{i.associate}</b></p>
                {FLAGS.showInsurerCodes && i.id && (
                  <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-navy-50 px-3 py-1.5 text-sm text-navy-700"><span className="text-ink-mute">{i.idLabel}:</span><b className="font-semibold tracking-wide">{i.id}</b></p>
                )}
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-xs text-ink-mute">Codes and IDs are shown for reference to identify our association with each insurer. Insurer names are used only to describe the services we assist with.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="The enquiry process" title="What to expect" />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90} className="relative rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                <span className="absolute right-5 top-4 font-serif text-5xl font-bold text-navy-100" aria-hidden="true">{i + 1}</span>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-leaf-600 text-white"><s.icon size={22} aria-hidden="true" /></span>
                <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <SectionHeading eyebrow="Questions" title="Common questions" />
          <Reveal delay={100}><Faq items={faqs} /></Reveal>
        </div>
      </section>

      <div className="container-page py-10"><Disclaimer>{INSURANCE_STATEMENT} We do not guarantee claim approval, lowest premiums or specific policy benefits.</Disclaimer></div>
      <ContactStrip />
    </>
  )
}
