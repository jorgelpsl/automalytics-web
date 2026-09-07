// Serverless proxy for the hero chat form. Keeps WEB_LEAD_SECRET out of the
// browser: the page calls this same-origin endpoint, and only this function
// (running server-side on Vercel) ever holds the real CRM credential.
//
// This is the site's only writable endpoint, so it is also where abuse gets
// stopped: everything below runs before the CRM is ever contacted, because a
// request that reaches the CRM consumes the CRM's own shared 10/min quota —
// which is keyed on *our* egress IP, not the visitor's, so a flood here would
// lock real leads out.
const CRM_URL = 'https://prospectos-crm-backend.vercel.app/prospects/website-lead';

// Generous enough for any real lead, small enough that nobody can use the
// form to push a payload into the CRM's database or its logs.
const LIMITS = { name: 80, phone: 25, email: 120, message: 1000 };

// Per-instance sliding window. Vercel may run several instances, so this is a
// speed bump rather than a hard guarantee — it still turns a single-source
// flood into a trickle, and the CRM's own throttle backstops the rest.
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = new Map();

function clientIp(req) {
  // Vercel appends the real client IP as the last entry of x-forwarded-for;
  // earlier entries are attacker-controlled, so only the last is trustworthy.
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length > 0) {
    const parts = fwd.split(',');
    return parts[parts.length - 1].trim();
  }
  return req.headers['x-real-ip'] || 'unknown';
}

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);

  // Drop windows that have fully expired so a long-lived instance doesn't
  // accumulate an entry per IP forever.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT.max;
}

// Strips control characters (including newlines) so nothing submitted here can
// forge extra lines in our logs or in the CRM's chat thread.
function clean(value, max) {
  if (typeof value !== 'string') return '';
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = clientIp(req);
  if (rateLimited(ip)) {
    console.warn('Rate limited lead submission from', ip);
    return res.status(429).json({ error: 'Demasiados envíos, intenta más tarde' });
  }

  const body = req.body || {};

  // Honeypot: the form ships a hidden `website` field that real visitors never
  // see. The page already refuses to submit when it's filled; checking it here
  // too means a bot posting straight at this endpoint gets caught as well.
  // Answer 200 so the bot can't tell the honeypot from a successful send.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    console.warn('Honeypot triggered from', ip);
    return res.status(200).json({ ok: true });
  }

  const name = clean(body.name, LIMITS.name);
  const phone = clean(body.phone, LIMITS.phone);
  const email = clean(body.email, LIMITS.email);
  const message = clean(body.message, LIMITS.message);

  if (name.length < 2 || phone.length < 6) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  // A phone is digits plus the usual separators — anything else is a bot
  // stuffing another field's worth of text into it.
  if (!/^[\d\s+()\-.]{6,}$/.test(phone) || (phone.match(/\d/g) || []).length < 6) {
    return res.status(400).json({ error: 'Teléfono inválido' });
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email inválido' });
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
