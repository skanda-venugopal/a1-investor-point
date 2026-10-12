import { ChevronDown } from 'lucide-react'

export default function Faq({ items }) {
  return (
    <div className="divide-y divide-navy-100 rounded-2xl border border-navy-100 bg-white shadow-card">
      {items.map((it) => (
        <details key={it.q} className="group p-5 sm:px-7">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg font-semibold text-navy-700 [&::-webkit-details-marker]:hidden">
            {it.q}
            <ChevronDown size={20} className="shrink-0 text-leaf-600 transition group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="mt-3 leading-relaxed text-ink-soft">{it.a}</p>
        </details>
      ))}
    </div>
  )
}
