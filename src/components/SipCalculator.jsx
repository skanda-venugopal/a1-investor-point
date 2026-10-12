import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { calculateSip, validateSipInputs, formatINR, formatINRShort, LIMITS } from '../lib/sip.js'
import Disclaimer from './Disclaimer.jsx'

const pct = (v, { min, max }) => `${Math.min(100, Math.max(0, ((Number(v) - min) / (max - min)) * 100))}%`

function NumberRow({ id, label, unit, prefix, value, onChange, limits, error, hint }) {
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <label htmlFor={id} className="text-sm font-semibold text-navy-700">{label}</label>
        <div className={`flex items-center rounded-xl border bg-white px-3 py-1.5 focus-within:ring-2 focus-within:ring-teal-500/30 ${error ? 'border-red-500' : 'border-navy-200 focus-within:border-teal-500'}`}>
          {prefix && <span className="mr-1 text-sm text-ink-mute" aria-hidden="true">{prefix}</span>}
          <input id={id} type="number" inputMode="decimal" className="w-24 bg-transparent text-right text-base font-semibold text-navy-700 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            value={value} min={limits.min} max={limits.max} step={limits.step} onChange={(e) => onChange(e.target.value)}
            aria-invalid={!!error} aria-describedby={error ? `${id}-err` : `${id}-hint`} />
          <span className="ml-1 text-sm text-ink-mute" aria-hidden="true">{unit}</span>
        </div>
      </div>
      <input type="range" className="range mt-4" aria-label={`${label} slider`} min={limits.min} max={limits.max} step={limits.step}
        value={Number.isFinite(Number(value)) && value !== '' ? value : limits.min} style={{ '--p': pct(value, limits) }} onChange={(e) => onChange(e.target.value)} />
      {error ? <p id={`${id}-err`} role="alert" className="mt-2 text-sm font-medium text-red-700">{error}</p> : <p id={`${id}-hint`} className="mt-2 text-xs text-ink-mute">{hint}</p>}
    </div>
  )
}

function GrowthChart({ series }) {
  const W = 640, H = 240, padL = 46, padB = 28, padT = 12, padR = 12
  const maxV = Math.max(...series.map((s) => s.value), 1)
  const x = (i) => padL + (i / (series.length - 1)) * (W - padL - padR)
  const y = (v) => padT + (1 - v / maxV) * (H - padT - padB)
  const line = (k) => series.map((s, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(s[k]).toFixed(1)}`).join(' ')
  const area = `${line('value')} L${x(series.length - 1)} ${y(0)} L${x(0)} ${y(0)} Z`
  const ticks = [0, 0.5, 1]
  const step = Math.max(1, Math.ceil((series.length - 1) / 6))
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Chart of total amount invested versus illustrative estimated value, year by year" className="h-auto w-full">
      <defs><linearGradient id="gv" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#498744" stopOpacity=".35" /><stop offset="1" stopColor="#498744" stopOpacity="0" /></linearGradient></defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={W - padR} y1={y(maxV * t)} y2={y(maxV * t)} stroke="#d9e4f0" strokeDasharray="3 4" />
          <text x={padL - 8} y={y(maxV * t) + 4} textAnchor="end" fontSize="11" fill="#6b7a8e">{formatINRShort(maxV * t)}</text>
        </g>
      ))}
      {series.map((s, i) => (i % step === 0 || i === series.length - 1) && (
        <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="#6b7a8e">{s.year}y</text>
      ))}
      <path d={area} fill="url(#gv)" />
      <path d={line('value')} fill="none" stroke="#3a6f37" strokeWidth="2.5" strokeLinejoin="round" />
      <path d={line('invested')} fill="none" stroke="#0d3863" strokeWidth="2.5" strokeDasharray="6 4" strokeLinejoin="round" />
    </svg>
  )
}

export default function SipCalculator({ compact = false }) {
  const [monthly, setMonthly] = useState('10000')
  const [annualRate, setRate] = useState('12')
  const [years, setYears] = useState('10')

  const errors = useMemo(() => validateSipInputs({ monthly, annualRate, years }), [monthly, annualRate, years])
  const valid = Object.keys(errors).length === 0
  const result = useMemo(() => (valid ? calculateSip({ monthly, annualRate, years }) : null), [valid, monthly, annualRate, years])
  const gainShare = result && result.futureValue > 0 ? (result.gains / result.futureValue) * 100 : 0

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
      <form className="card space-y-8" onSubmit={(e) => e.preventDefault()} aria-label="SIP calculator inputs">
        <NumberRow id="sip-monthly" label="Monthly investment" prefix="₹" value={monthly} onChange={setMonthly} limits={LIMITS.monthly} error={errors.monthly} hint={`Between ${formatINR(LIMITS.monthly.min)} and ${formatINR(LIMITS.monthly.max)}`} />
        <NumberRow id="sip-rate" label="Assumed annual return" unit="% p.a." value={annualRate} onChange={setRate} limits={LIMITS.rate} error={errors.annualRate} hint="An assumption for illustration, not a forecast. Try 0% to see only your own contributions." />
        <NumberRow id="sip-years" label="Investment duration" unit="years" value={years} onChange={setYears} limits={LIMITS.years} error={errors.years} hint="Whole years, 1 to 40" />
      </form>

      <div className="card bg-gradient-to-br from-navy-700 to-navy-900 text-white" aria-live="polite">
        <p className="eyebrow !text-leaf-300 before:!bg-leaf-300">Illustrative result</p>
        {result ? (
          <>
            <p className="mt-3 text-sm text-navy-200">Estimated future value</p>
            <p className="font-serif text-4xl font-semibold sm:text-5xl" data-testid="sip-fv">{formatINR(result.futureValue)}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/10 p-4"><dt className="text-xs uppercase tracking-wider text-navy-200">Amount invested</dt><dd className="mt-1 text-lg font-semibold" data-testid="sip-invested">{formatINR(result.invested)}</dd></div>
              <div className="rounded-2xl bg-leaf-500/25 p-4"><dt className="text-xs uppercase tracking-wider text-leaf-100">Estimated gains</dt><dd className="mt-1 text-lg font-semibold" data-testid="sip-gains">{formatINR(result.gains)}</dd></div>
            </dl>
            <div className="mt-6" aria-hidden="true">
              <div className="flex h-3 overflow-hidden rounded-full bg-white/15">
                <span className="bg-navy-300 transition-all duration-500" style={{ width: `${100 - gainShare}%` }} />
                <span className="bg-leaf-400 transition-all duration-500" style={{ width: `${gainShare}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-xs text-navy-200"><span>Invested {Math.round(100 - gainShare)}%</span><span>Gains {Math.round(gainShare)}%</span></div>
            </div>
            {!compact && (
              <div className="mt-6 rounded-2xl bg-white p-4">
                <GrowthChart series={result.series} />
                <p className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink-soft"><span><span className="mr-1.5 inline-block h-0.5 w-5 border-t-2 border-dashed border-navy-700 align-middle" />Invested</span><span><span className="mr-1.5 inline-block h-0.5 w-5 bg-leaf-600 align-middle" />Estimated value</span></p>
              </div>
            )}
          </>
        ) : (
          <p className="mt-6 rounded-2xl bg-white/10 p-5 text-navy-100">Please correct the highlighted inputs to see an illustration.</p>
        )}
      </div>

      <div className="space-y-4 lg:col-span-2">
        <Disclaimer>
          <b>Illustration only.</b> Actual market returns vary and are not guaranteed; mutual fund investments are subject to market risks. This tool assumes a constant annual return, equal contributions at the <i>beginning</i> of each month, monthly compounding (rate ÷ 12), and ignores expense ratios, exit loads, taxes and inflation. Nothing here is investment advice, and your entries are not stored.
        </Disclaimer>
        <p className="text-center text-sm text-ink-soft">Want to talk it through? <Link to="/contact" className="font-semibold text-navy-700 underline underline-offset-2 hover:text-leaf-700">Contact A1 Investors Point</Link></p>
      </div>
    </div>
  )
}
