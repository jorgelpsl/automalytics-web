// Serverless proxy for the hero chat form. Keeps WEB_LEAD_SECRET out of the
// browser: the page calls this same-origin endpoint, and only this function
// (running server-side on Vercel) ever holds the real CRM credential.
const CRM_URL = 'https://prospectos-crm-backend.vercel.app/prospects/website-lead';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (name.length < 2 || phone.length < 6) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  if (!process.env.WEB_LEAD_SECRET) {
    console.error('WEB_LEAD_SECRET is not set');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  try {
    const crmRes = await fetch(CRM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-lead-key': process.env.WEB_LEAD_SECRET,
      },
      body: JSON.stringify({
        name,
        phone,
        email: email || undefined,
        message: message || undefined,
      }),
    });

    if (!crmRes.ok) {
      const detail = await crmRes.text().catch(() => '');
      console.error('CRM rejected lead:', crmRes.status, detail.slice(0, 300));
      return res.status(502).json({ error: 'CRM error' });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('CRM unreachable:', e);
    return res.status(502).json({ error: 'CRM unreachable' });
  }
};
