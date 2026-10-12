/**
 * Illustrative SIP calculator maths (client-side only; nothing is stored).
 *
 * Contributions are assumed at the BEGINNING of each month (annuity-due):
 *   FV = P × (((1 + r)^n − 1) / r) × (1 + r)      where r = annualRate / 12 / 100
 *   If r = 0, FV = P × n
 */

export const LIMITS = {
  monthly: { min: 500, max: 1000000, step: 500 },
  rate: { min: 0, max: 30, step: 0.5 },
  years: { min: 1, max: 40, step: 1 },
}

export function validateSipInputs({ monthly, annualRate, years }) {
  const errors = {}
  const num = (v) => (typeof v === 'string' && v.trim() === '' ? NaN : Number(v))
  const m = num(monthly), r = num(annualRate), y = num(years)

  if (!Number.isFinite(m)) errors.monthly = 'Enter a monthly amount.'
  else if (m < LIMITS.monthly.min || m > LIMITS.monthly.max)
    errors.monthly = `Enter an amount between ${formatINR(LIMITS.monthly.min)} and ${formatINR(LIMITS.monthly.max)}.`

  if (!Number.isFinite(r)) errors.annualRate = 'Enter an assumed annual return.'
  else if (r < LIMITS.rate.min || r > LIMITS.rate.max)
    errors.annualRate = `Enter a rate between ${LIMITS.rate.min}% and ${LIMITS.rate.max}%.`

  if (!Number.isFinite(y)) errors.years = 'Enter a duration in years.'
  else if (!Number.isInteger(y) || y < LIMITS.years.min || y > LIMITS.years.max)
    errors.years = `Enter whole years between ${LIMITS.years.min} and ${LIMITS.years.max}.`

  return errors
}

/** Future value after `months` monthly contributions of `monthly`, beginning-of-month. */
export function futureValue(monthly, annualRate, months) {
  const r = annualRate / 12 / 100
  if (r === 0) return monthly * months
  return monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r)
}

export function calculateSip({ monthly, annualRate, years }) {
  const P = Number(monthly), rate = Number(annualRate), y = Number(years)
  const n = y * 12
  const invested = P * n
  const fv = futureValue(P, rate, n)
  const series = []
  for (let k = 0; k <= y; k++) {
    series.push({ year: k, invested: P * k * 12, value: futureValue(P, rate, k * 12) })
  }
  return { invested, futureValue: fv, gains: fv - invested, months: n, series }
}

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
export const formatINR = (v) => inr.format(Math.round(v))

/** Short Indian-style label, e.g. ₹12.5 L, ₹1.2 Cr */
export function formatINRShort(v) {
  const n = Math.abs(v)
  const s = (x) => x.toFixed(x >= 100 ? 0 : x >= 10 ? 1 : 2).replace(/\.?0+$/, '')
  if (n >= 1e7) return `₹${s(v / 1e7)} Cr`
  if (n >= 1e5) return `₹${s(v / 1e5)} L`
  if (n >= 1e3) return `₹${s(v / 1e3)}K`
  return `₹${Math.round(v)}`
}
