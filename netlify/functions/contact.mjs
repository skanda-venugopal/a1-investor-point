import { handleContactRequest } from '../../api/contact.js'

export async function handler(event) {
  const body = typeof event.body === 'string' && event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf8')
    : event.body
  const result = await handleContactRequest(event.httpMethod, body)

  return {
    statusCode: result.status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result.body),
  }
}
