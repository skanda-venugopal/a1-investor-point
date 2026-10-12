import test from 'node:test'
import assert from 'node:assert/strict'
import { handleContactRequest } from './contact.js'

const env = {
  RESEND_API_KEY: 'test-key',
  RESEND_FROM_EMAIL: 'A1 Investors Point <website@example.com>',
  CONTACT_EMAIL: 'contact@example.com',
}

const validSubmission = {
  name: 'Asha Sharma',
  email: 'asha@example.com',
  phone: '+91 98765 43210',
  service: 'Mutual Funds',
  message: 'Please contact me.',
}

test('rejects unsupported methods and invalid submissions', async () => {
  assert.equal((await handleContactRequest('GET', validSubmission, env)).status, 405)
  assert.equal((await handleContactRequest('POST', { ...validSubmission, service: 'Unknown' }, env)).status, 400)
  assert.equal((await handleContactRequest('POST', '{invalid', env)).status, 400)
})

test('sends a formatted email with the submitter as reply-to', async (t) => {
  const originalFetch = globalThis.fetch
  let request
  globalThis.fetch = async (url, options) => {
    request = { url, options }
    return { ok: true }
  }
  t.after(() => { globalThis.fetch = originalFetch })

  const result = await handleContactRequest('POST', {
    ...validSubmission,
    name: '<Asha & Co>',
    message: '<Please reply>\nThank you.',
  }, env)

  assert.equal(result.status, 200)
  assert.equal(request.url, 'https://api.resend.com/emails')
  assert.equal(request.options.headers.Authorization, 'Bearer test-key')
  const email = JSON.parse(request.options.body)
  assert.deepEqual(email.to, ['contact@example.com'])
  assert.equal(email.reply_to, 'asha@example.com')
  assert.match(email.html, /&lt;Asha &amp; Co&gt;/)
  assert.match(email.html, /&lt;Please reply&gt;<br>Thank you\./)
  assert.match(email.text, /Name: <Asha & Co>/)
})

test('reports provider failures instead of acknowledging a failed delivery', async (t) => {
  const originalFetch = globalThis.fetch
  const originalConsoleError = console.error
  globalThis.fetch = async () => ({ ok: false, status: 429 })
  console.error = () => {}
  t.after(() => { globalThis.fetch = originalFetch })
  t.after(() => { console.error = originalConsoleError })

  const result = await handleContactRequest('POST', validSubmission, env)
  assert.equal(result.status, 502)
  assert.match(result.body.error, /could not send/)
})
