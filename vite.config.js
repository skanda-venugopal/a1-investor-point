import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { handleContactRequest } from './api/contact.js'

function contactApi(emailConfig) {
  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        const chunks = []
        let bodyLength = 0

        try {
          for await (const chunk of req) {
            bodyLength += chunk.length
            if (bodyLength > 10_000) {
              res.statusCode = 413
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'The submitted message is too large.' }))
              return
            }
            chunks.push(chunk)
          }

          const result = await handleContactRequest(
            req.method,
            Buffer.concat(chunks).toString('utf8'),
            emailConfig,
          )
          res.statusCode = result.status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result.body))
        } catch (error) {
          server.config.logger.error('Contact API request failed.', { error })
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'The message service encountered an error. Please try again.' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const emailConfig = {
    RESEND_API_KEY: env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: env.RESEND_FROM_EMAIL,
    CONTACT_EMAIL: env.CONTACT_EMAIL,
  }

  return {
    plugins: [react(), contactApi(emailConfig)],
    build: { sourcemap: false, target: 'es2019' },
  }
})
