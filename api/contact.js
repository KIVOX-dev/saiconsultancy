// Vercel serverless function: POST /api/contact  -> emails the enquiry to admin via Brevo.
// Env vars (Vercel > Settings > Environment Variables):
//   BREVO_API_KEY   Brevo API key (server-side only)
//   CONTACT_TO      inbox that receives enquiries (default admin@saiconsultancy.in)
//   CONTACT_FROM    a sender verified in Brevo (default admin@saiconsultancy.in)
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }
  const { name, email, message, website } = req.body || {}
  if (website) return res.status(200).json({ ok: true }) // honeypot: silently drop bots
  const n = String(name || '').trim().slice(0, 100)
  const e = String(email || '').trim().slice(0, 150)
  const m = String(message || '').trim().slice(0, 3000)
  if (!n || !m || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return res.status(400).json({ error: 'Please fill in all fields correctly.' })
  if (!process.env.BREVO_API_KEY) return res.status(503).json({ error: 'Email service is not configured.' })

  const to = process.env.CONTACT_TO || 'admin@saiconsultancy.in'
  const from = process.env.CONTACT_FROM || 'admin@saiconsultancy.in'
  const r = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': process.env.BREVO_API_KEY, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      sender: { name: 'SAI Consultancy Website', email: from },
      to: [{ email: to }],
      replyTo: { email: e, name: n },
      subject: `Website enquiry from ${n}`,
      htmlContent: `<p><b>Name:</b> ${esc(n)}<br><b>Email:</b> ${esc(e)}</p><p>${esc(m).replace(/\n/g, '<br>')}</p>`,
    }),
  }).catch(() => null)
  if (!r || !r.ok) console.error('Brevo send failed:', r ? r.status : 'network error', r ? await r.text() : '')
  if (!r || !r.ok) return res.status(502).json({ error: 'Could not send your message. Please email or call us.' })
  return res.status(200).json({ ok: true })
}
