import { readFileSync } from 'fs';
import 'dotenv/config';

// Uso: node load-to-crm.js resultados/<archivo>.json

const [, , filePath] = process.argv;
if (!filePath) {
  console.error('Uso: node load-to-crm.js resultados/<archivo>.json');
  process.exit(1);
}

const BASE = process.env.PROSPECTOS_CRM_URL || 'https://prospectos-crm-backend.vercel.app';
const USERNAME = process.env.PROSPECTOS_CRM_USER;
const PASSWORD = process.env.PROSPECTOS_CRM_PASSWORD;

if (!USERNAME || !PASSWORD) {
  console.error('Faltan PROSPECTOS_CRM_USER / PROSPECTOS_CRM_PASSWORD en .env');
  process.exit(1);
}

async function main() {
  const prospects = JSON.parse(readFileSync(filePath, 'utf8'));

  const loginRes = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: USERNAME, password: PASSWORD }),
  });
  const { accessToken } = await loginRes.json();
  if (!accessToken) throw new Error('Login falló contra el CRM');

  let created = 0, skipped = 0, failed = 0;
  for (const p of prospects) {
    const res = await fetch(`${BASE}/prospects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(p),
    });
    if (res.ok) {
      created++;
    } else {
      const body = await res.text();
      if (res.status === 409 || /duplicat/i.test(body)) {
        skipped++;
      } else {
        failed++;
        console.log('FAIL:', p.businessName, res.status, body.slice(0, 200));
      }
    }
  }

  console.log(`\nCreados: ${created} | Duplicados/omitidos: ${skipped} | Fallidos: ${failed} | Total: ${prospects.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
