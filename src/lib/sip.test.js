import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateSip, futureValue, validateSipInputs, formatINR } from './sip.js'

const close = (a, b, eps = 0.01) => assert.ok(Math.abs(a - b) < eps, `${a} !≈ ${b}`)

test('zero return: FV = P × n and gains = 0', () => {
  const r = calculateSip({ monthly: 5000, annualRate: 0, years: 10 })
  assert.equal(r.invested, 600000)
  assert.equal(r.futureValue, 600000)
  assert.equal(r.gains, 0)
})

test('normal inputs: 10,000/month, 12% p.a., 10 years (annuity-due)', () => {
  // r = 0.01, n = 120 → 10000 × ((1.01^120 − 1)/0.01) × 1.01 ≈ 2,323,391.4
  const r = calculateSip({ monthly: 10000, annualRate: 12, years: 10 })
  assert.equal(r.invested, 1200000)
  close(r.futureValue, 2323391.4, 1)
  close(r.gains, r.futureValue - 1200000)
})

test('single month: contribution grows one period (beginning-of-month)', () => {
  close(futureValue(1000, 12, 1), 1010) // 1000 × 1.01
})

test('different durations are monotonic and series ends on the total', () => {
  const a = calculateSip({ monthly: 5000, annualRate: 10, years: 5 })
  const b = calculateSip({ monthly: 5000, annualRate: 10, years: 15 })
  const c = calculateSip({ monthly: 5000, annualRate: 10, years: 30 })
  assert.ok(a.futureValue < b.futureValue && b.futureValue < c.futureValue)
  assert.equal(c.series.length, 31)
  close(c.series.at(-1).value, c.futureValue)
  assert.equal(c.series[0].value, 0)
})

test('invalid inputs are rejected', () => {
  assert.ok(validateSipInputs({ monthly: '', annualRate: 10, years: 5 }).monthly)
  assert.ok(validateSipInputs({ monthly: 100, annualRate: 10, years: 5 }).monthly)
  assert.ok(validateSipInputs({ monthly: 5000, annualRate: -1, years: 5 }).annualRate)
  assert.ok(validateSipInputs({ monthly: 5000, annualRate: 40, years: 5 }).annualRate)
  assert.ok(validateSipInputs({ monthly: 5000, annualRate: 10, years: 0 }).years)
  assert.ok(validateSipInputs({ monthly: 5000, annualRate: 10, years: 2.5 }).years)
  assert.ok(validateSipInputs({ monthly: 5000, annualRate: 'abc', years: 5 }).annualRate)
  assert.deepEqual(validateSipInputs({ monthly: 5000, annualRate: 0, years: 5 }), {})
})

test('INR formatting uses Indian grouping', () => {
  assert.match(formatINR(2323391), /23,23,391/)
})
