import { Info } from 'lucide-react'

export default function Disclaimer({ children, className = '' }) {
  return (
    <div role="note" className={`flex gap-3 rounded-2xl border border-navy-100 bg-navy-50/60 p-4 text-sm leading-relaxed text-ink-soft ${className}`}>
      <Info size={18} className="mt-0.5 shrink-0 text-navy-500" aria-hidden="true" />
      <p>{children}</p>
    </div>
  )
}
