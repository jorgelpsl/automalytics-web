// Server-only switches, read from the Vercel environment. Each feature stays
// off, and the site falls back to WhatsApp, until its credential exists.

export function paymentsEnabled(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

// Stores connected from the Vercel dashboard authenticate through OIDC and
// only set BLOB_STORE_ID; older ones use a read-write token.
export function uploadsEnabled(): boolean {
  return Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN);
}

/** Pay and upload documents on the site, no WhatsApp needed. */
export function onlineOrdersEnabled(): boolean {
  return paymentsEnabled() && uploadsEnabled();
}

export function adminEnabled(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD) && uploadsEnabled();
}
