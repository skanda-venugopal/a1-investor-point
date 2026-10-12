import { Link } from 'react-router-dom'
import mark from '../assets/logo-mark.png'
import { SITE } from '../data/site.js'

/** Compact brand lockup for header/footer: logo mark (aspect ratio preserved) + wordmark. */
export default function Logo({ light = false }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-3" aria-label={`${SITE.name} home`}>
      <img src={mark} alt="" width="48" height="39" className="h-10 w-auto sm:h-11" />
      <span className="leading-none">
        <span className={`block font-serif text-xl font-bold tracking-tight sm:text-[1.4rem] ${light ? 'text-white' : 'text-navy-700'}`}>A1</span>
        <span className={`mt-1 block text-[.62rem] font-semibold uppercase tracking-[.2em] ${light ? 'text-leaf-300' : 'text-leaf-600'}`}>Investors Point</span>
      </span>
    </Link>
  )
}
