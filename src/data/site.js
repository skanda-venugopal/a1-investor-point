import { SERVICE_OPTIONS } from './services.js'

/**
 * SINGLE SOURCE OF TRUTH for business facts.
 * Everything shown on the site (header, footer, contact page, credentials) reads from here.
 * Items marked VERIFY come from the requirements doc and must be confirmed by the business before launch.
 */

export const SITE = {
  name: 'A1 Investors Point',
  tagline: 'Your Gateway to Mutual Funds | Investments',
  shortDescription:
    'Mutual fund distribution and insurance services in Bokaro, helping families and individuals with investments and cover.',
  foundedYear: 2002,
  url: (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, ''),
}

export const CONTACT = {
  email: 'aonectps@gmail.com',
  phoneDisplay: '+91 74887 36823',
  phoneHref: 'tel:+917488736823',
  addressLines: ['CF3, 1st Floor, Harshwardhan Plaza', 'Sector 4, Bokaro', 'Jharkhand 827004, India'],
}

/**
 * Display switches. Flip to `true` only once the business has verified the item.
 */
export const FLAGS = {
  // VERIFY: "has helped 1,200+ clients". Supplied by the business, needs substantiation.
  showClientCount: false,
  clientCountText: '1,200+',
  // VERIFY: ARN codes. Confirm names, current validity and permitted public display.
  showArn: true,
  // VERIFY: insurer code / user ID. Confirm meaning and permission to display.
  showInsurerCodes: true,
}

export const PEOPLE = {
  founder: {
    name: 'Sandeep Kumar',
    role: 'Founder & CEO',
    initials: 'SK',
    bio: `Sandeep Kumar founded A1 Investors Point and has been in the business since ${SITE.foundedYear}. He leads the firm's mutual fund distribution and insurance services, with a focus on clear explanations and long-term service.`,
  },
  // VERIFY: add job titles / bios only after confirmation.
  team: [
    { name: 'Ajay Kumar', initials: 'AK' },
    { name: 'Varsha Kumari', initials: 'VK' },
  ],
}

export const ARNS = [
  { code: '80433', holder: 'Sandeep Kumar' },
  { code: '185958', holder: 'Preety Kumari Barnwal' },
]

export const INSURERS = [
  {
    name: 'Aditya Birla Sun Life Insurance',
    category: 'Life insurance',
    idLabel: 'Code',
    id: 'LH4127',
    associate: 'Preety Kumari Barnwal',
  },
  {
    name: 'Star Health Insurance',
    category: 'Health insurance',
    idLabel: 'User ID',
    id: 'BA0000409993',
    associate: 'Preety Kumari Barnwal',
  },
  {
    name: 'ICICI Lombard',
    category: 'Medical insurance',
    idLabel: null,
    id: null,
    associate: 'Sandeep Kumar',
  },
]

export const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/mutual-funds', label: 'Mutual Funds' },
  { to: '/insurance', label: 'Insurance' },
  { to: '/about', label: 'About Us' },
  { to: '/calculators', label: 'Calculators' },
  { to: '/contact', label: 'Contact Us' },
]

export const FOOTER_LEGAL = [
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/disclosures', label: 'Disclosures' },
]

export const RISK_STATEMENT =
  'Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. Past performance is not indicative of future returns.'

export const INSURANCE_STATEMENT =
  'Insurance is the subject matter of solicitation. Policy features, benefits, exclusions and premiums are as per the insurer’s policy document; please read it carefully before buying.'

export { SERVICE_OPTIONS }
