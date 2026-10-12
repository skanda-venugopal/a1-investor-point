/** Decorative geometry echoing the logo's peak + rising arrow. Purely ornamental (aria-hidden). */
export function PeakMotif({ className = '', stroke = 'currentColor' }) {
  return (
    <svg viewBox="0 0 400 300" fill="none" aria-hidden="true" className={className}>
      <path d="M20 280 L150 60 L210 150" stroke={stroke} strokeWidth="1.5" />
      <path d="M90 280 L180 130 L240 220 L380 20" stroke={stroke} strokeWidth="1.5" />
      <path d="M340 20 H380 V60" stroke={stroke} strokeWidth="1.5" />
      <path d="M210 280 L290 150" stroke={stroke} strokeWidth="1.5" />
    </svg>
  )
}

export function ArrowRise({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <path d="M6 36 L18 22 L26 30 L42 12" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 12 H42 V22" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
