import { SERVICE_OPTIONS } from '../src/data/services.js'

const MAX_BODY_LENGTH = 10_000

function json(status, payload) {
  return { status, body: payload }
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character])
}

function parseBody(body) {
  if (typeof body === 'string') {
    if (Buffer.byteLength(body, 'utf8') > MAX_BODY_LENGTH) return null
    try {
      return JSON.parse(body)
    } catch {
      return null
    }
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null
  if (Buffer.byteLength(JSON.stringify(body), 'utf8') > MAX_BODY_LENGTH) return null
  return body
}

function validateSubmission(body) {
  const input = parseBody(body)
  if (!input) return null

  const { name, email, phone, service, message } = input
  if (
    typeof name !== 'string' || name.trim().length < 1 || name.trim().length > 120 ||
    typeof email !== 'string' || email.trim().length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    (phone !== undefined && (typeof phone !== 'string' || phone.trim().length > 30)) ||
    typeof service !== 'string' || !SERVICE_OPTIONS.includes(service) ||
    typeof message !== 'string' || message.trim().length < 1 || message.trim().length > 2000
  ) return null

  return {
    name: name.trim(),
    email: email.trim(),
    phone: typeof phone === 'string' ? phone.trim() : '',
    service,
    message: message.trim(),
  }
}

export async function handleContactRequest(method, body, env = process.env) {
  if (method !== 'POST') return json(405, { error: 'Method not allowed.' })

  const submission = validateSubmission(body)
  if (!submission) return json(400, { error: 'Please check the form fields and try again.' })

  const { RESEND_API_KEY, RESEND_FROM_EMAIL, CONTACT_EMAIL } = env
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !CONTACT_EMAIL) {
    console.error('Contact email service is missing RESEND_API_KEY, RESEND_FROM_EMAIL, or CONTACT_EMAIL.')
    return json(503, { error: 'The message service is not configured. Please contact us by phone or email.' })
  }

  const safe = Object.fromEntries(Object.entries(submission).map(([key, value]) => [key, escapeHtml(value)]))
  const text = [
    'New website enquiry',
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone || 'Not provided'}`,
    `Service: ${submission.service}`,
    '',
    'Message:',
    submission.message,
  ].join('\n')
  const html = `<h2>New website enquiry</h2>
    <p><strong>Name:</strong> ${safe.name}</p>
    <p><strong>Email:</strong> ${safe.email}</p>
    <p><strong>Phone:</strong> ${safe.phone || 'Not provided'}</p>
    <p><strong>Service:</strong> ${safe.service}</p>
    <p><strong>Message:</strong><br>${safe.message.replace(/\n/g, '<br>')}</p>`

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: [CONTACT_EMAIL],
        reply_to: submission.email,
        subject: `Website enquiry: ${submission.service}`,
        text,
        html,
      }),
    })

    if (!response.ok) {
      console.error(`Contact email provider returned HTTP ${response.status}.`)
      return json(502, { error: 'We could not send your message right now. Please try again later.' })
    }
  } catch (error) {
    console.error('Contact email provider request failed.', error)
    return json(502, { error: 'We could not send your message right now. Please try again later.' })
  }

  return json(200, { message: 'Message sent.' })
}

export default async function contactApi(req, res) {
  const result = await handleContactRequest(req.method, req.body)
  return res.status(result.status).json(result.body)
}
