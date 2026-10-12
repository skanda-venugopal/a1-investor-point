# A1 Investors Point — Website

React + Vite + Tailwind CSS website with a small serverless contact-email endpoint (no database).

## Run it
```bash
npm install
npm run dev        # http://localhost:5173
npm test           # SIP calculator and contact-email endpoint tests
npm run build      # production build -> dist/
npm run preview    # test the production build locally
```

## Folder structure
```
a1-investors-point/
├─ index.html                 # fonts, default meta, Organization JSON-LD
├─ package.json  vite.config.js  tailwind.config.js  postcss.config.js
├─ netlify.toml  vercel.json  # SPA rewrites so refresh on /contact etc. works
├─ .env.example               # site settings and server-side Resend email credentials
├─ api/contact.js             # validates contact submissions and sends enquiry email via Resend
├─ netlify/functions/         # Netlify adapter for the contact-email endpoint
├─ public/
│  ├─ _redirects              # Netlify SPA fallback
│  ├─ robots.txt  sitemap.xml # replace example.com with your domain
│  ├─ favicon.png  apple-touch-icon.png  og-image.png
└─ src/
   ├─ main.jsx  App.jsx  index.css      # entry, routes, design tokens/utilities
   ├─ assets/    logo-full.png  logo-mark.png   # transparent versions of your logo
   ├─ data/site.js            # ONE source of truth: contact, ARNs, insurers, people, flags
   ├─ lib/       sip.js  sip.test.js    # calculator maths + tests
   ├─ hooks/     useSeo.js  useReveal.js
   ├─ components/ Navbar Footer Logo HeroSection ServiceCard SectionHeading
   │              ContactForm SipCalculator ContactStrip PageHeader Faq Disclaimer Reveal Motif
   └─ pages/     Home MutualFunds Insurance AboutUs ContactUs Calculators Legal(Privacy, Disclosures) NotFound
```

## Before launch (from the requirements doc)
1. **Contact email**: create a Resend account, verify a sending domain, and set `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (a sender address on that verified domain), and `CONTACT_EMAIL` in Netlify/Vercel environment variables. The endpoint emails enquiries to `CONTACT_EMAIL`; keep these server-side values unprefixed by `VITE_`.
   For local development, copy `.env.example` to `.env` and set the same Resend values there. The Vite dev server serves `/api/contact` locally.
2. **Domain**: set `VITE_SITE_URL`, update `public/sitemap.xml` and `robots.txt`.
3. **Verify facts** in `src/data/site.js` → `FLAGS`:
   - `showClientCount` (1,200+ clients) is **false** until substantiated.
   - `showArn` and `showInsurerCodes` are on; set to false if the business hasn't confirmed public display.
4. Add titles for Ajay Kumar / Varsha Kumari only after confirmation (`PEOPLE.team`).
5. Privacy Policy and Disclosures are **drafts** — get them approved.
6. Deploy: Netlify (function adapter included) or Vercel (`/api/contact` included); enable HTTPS.
