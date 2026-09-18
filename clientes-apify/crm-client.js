import 'dotenv/config';

// Cliente chico compartido para hablar con el Prospectos CRM — login y
// chequeo de duplicados por teléfono. Usado por load-to-crm.js (antes de
// crear cada prospecto) y por scrape-following.js (antes de gastar
// créditos de Apify enriqueciendo cuentas que el CRM ya tiene).

export const CRM_BASE = process.env.PROSPECTOS_CRM_URL || 'https://prospectos-crm-backend.vercel.app';

export async function login() {
  const username = process.env.PROSPECTOS_CRM_USER;
  const password = process.env.PROSPECTOS_CRM_PASSWORD;
  if (!username || !password) {
    throw new Error('Faltan PROSPECTOS_CRM_USER / PROSPECTOS_CRM_PASSWORD en .env');
  }

  const res = await fetch(`${CRM_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const { accessToken } = await res.json();
  if (!accessToken) throw new Error('Login falló contra el CRM');
  return accessToken;
}

// El backend no aplica unicidad de teléfono en POST /prospects (ese chequeo
// solo corre del lado del cliente, en el formulario del CRM) — sin esto,
// volver a correr una búsqueda que resurface el mismo negocio crea una fila
// duplicada en vez de omitirla.
export async function checkPhone(phone, accessToken) {
  const res = await fetch(`${CRM_BASE}/prospects/check-phone?phone=${encodeURIComponent(phone)}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const { match } = await res.json();
  return Boolean(match);
}
