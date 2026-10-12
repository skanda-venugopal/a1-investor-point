import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { useSeo } from '../hooks/useSeo.js'
import { CONTACT, SITE, RISK_STATEMENT, INSURANCE_STATEMENT, FLAGS, ARNS } from '../data/site.js'

const Draft = () => (
  <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
    Draft for review: this text is a starting point and must be reviewed and approved by the business or its compliance adviser before launch.
  </p>
)

export function Privacy() {
  useSeo({ title: 'Privacy Policy', description: 'How A1 Investors Point collects, uses and protects the personal data you share through our website enquiry form.', path: '/privacy-policy' })
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <section className="section">
        <div className="container-page max-w-3xl prose-legal">
          <Draft />
          <h2>What we collect</h2>
          <p>When you send an enquiry through this website, we receive your name, email address, the service you are asking about, your message, and your phone number if you provide one. We ask only for what we need to respond. Please do not send passwords, OTPs, PAN/Aadhaar, or bank or card details.</p>
          <h2>Why we collect it</h2>
          <p>To respond to your enquiry and provide the mutual fund or insurance support you ask about. We do not use your enquiry to send unrelated marketing without your consent.</p>
          <h2>Who processes it</h2>
          <p>We use Resend, an email delivery service, to send your enquiry to our team. Resend processes the information on our behalf to deliver the email. We do not run a database of website enquiries.</p>
          <h2>The SIP calculator</h2>
          <p>Values entered in the SIP calculator are processed in your browser only and are not sent to or stored by us.</p>
          <h2>Retention and your rights</h2>
          <p>We keep enquiry details only as long as needed to handle your request and meet our legal and record-keeping obligations. You may ask us to access, correct or delete your personal data, subject to applicable law.</p>
          <h2>Contact about your data</h2>
          <p>Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>. Postal address: {CONTACT.addressLines.join(', ')}.</p>
          <p className="text-sm">Last updated: October 2026.</p>
        </div>
      </section>
    </>
  )
}

export function Disclosures() {
  useSeo({ title: 'Disclosures', description: 'Regulatory and risk disclosures for A1 Investors Point’s mutual fund distribution and insurance services.', path: '/disclosures' })
  return (
    <>
      <PageHeader eyebrow="Legal" title="Disclosures" />
      <section className="section">
        <div className="container-page max-w-3xl prose-legal">
          <Draft />
          <h2>Mutual funds</h2>
          <p>{RISK_STATEMENT}</p>
          {FLAGS.showArn && <p>{SITE.name} provides mutual fund distribution services. ARN (AMFI Registration Number) details: {ARNS.map((a) => `${a.code} (${a.holder})`).join('; ')}. An ARN identifies a mutual fund distributor; it is not a SEBI investment-adviser registration, and {SITE.name} does not hold itself out as an investment adviser. Distributors may receive commissions from fund houses; details are available on request.</p>}
          <h2>Insurance</h2>
          <p>{INSURANCE_STATEMENT} Insurer names and codes are shown to describe our association with those insurers. Acceptance of proposals, premiums and claim settlement are determined by the insurer.</p>
          <h2>No advice, no guarantees</h2>
          <p>Content on this website, including the SIP calculator, is for general information and illustration only. It is not personalised investment, tax or legal advice, and it does not guarantee returns or outcomes.</p>
          <h2>Third-party names</h2>
          <p>Names of insurers and fund houses belong to their respective owners and are used only to describe the services we assist with.</p>
          <p>See also our <Link to="/privacy-policy">Privacy Policy</Link>.</p>
        </div>
      </section>
    </>
  )
}
