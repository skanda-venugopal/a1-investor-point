import Reveal from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, children, align = 'left', light = false, as: H = 'h2' }) {
  const center = align === 'center'
  return (
    <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className={`eyebrow ${light ? '!text-leaf-300 before:!bg-leaf-300' : ''} ${center ? 'justify-center' : ''}`}>{eyebrow}</p>}
      <H className={`mt-3 text-3xl font-semibold leading-tight sm:text-4xl ${light ? '!text-white' : ''}`}>{title}</H>
      {children && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? 'text-navy-100' : 'text-ink-soft'}`}>{children}</p>}
    </Reveal>
  )
}
