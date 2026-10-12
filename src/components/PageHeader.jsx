import { PeakMotif } from './Motif.jsx'

export default function PageHeader({ eyebrow, title, children }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-800 via-navy-700 to-navy-900 text-white">
      <PeakMotif className="pointer-events-none absolute -right-10 -top-6 h-[120%] w-auto text-white/[.07]" />
      <div className="container-page relative py-16 sm:py-24">
        <p className="eyebrow !text-leaf-300 before:!bg-leaf-300">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] !text-white sm:text-5xl">{title}</h1>
        {children && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100">{children}</p>}
      </div>
    </section>
  )
}
