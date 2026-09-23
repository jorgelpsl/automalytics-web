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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// El backend no aplica unicidad de teléfono en POST /prospects (ese chequeo
// solo corre del lado del cliente, en el formulario del CRM) — sin esto,
// volver a correr una búsqueda que resurface el mismo negocio crea una fila
// duplicada en vez de omitirla. Por eso un 429 acá no puede interpretarse
// como "no hay match": eso es exactamente lo que dejó pasar duplicados
// aunque el chequeo del lado del servidor ya estaba bien — se reintenta con
// backoff hasta tener una respuesta real, y si nunca la hay, se corta el
// import en vez de asumir silenciosamente que el prospecto es nuevo.
export async function checkPhone(phone, accessToken, attempt = 1) {
  const res = await fetch(`${CRM_BASE}/prospects/check-phone?phone=${encodeURIComponent(phone)}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (res.status === 429) {
    if (attempt >= 5) {
      throw new Error(`checkPhone: demasiados 429 seguidos para "${phone}", abortando en vez de asumir que no hay duplicado`);
    }
    await sleep(attempt * 2000);
    return checkPhone(phone, accessToken, attempt + 1);
  }
  if (!res.ok) {
    throw new Error(`checkPhone: ${res.status} ${(await res.text()).slice(0, 200)}`);
  }
  const { match } = await res.json();
  return Boolean(match);
}
