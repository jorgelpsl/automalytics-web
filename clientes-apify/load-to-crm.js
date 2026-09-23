import { readFileSync } from 'fs';
import 'dotenv/config';
import { CRM_BASE, login, checkPhone } from './crm-client.js';

// Uso: node load-to-crm.js resultados/<archivo>.json

const [, , filePath] = process.argv;
if (!filePath) {
  console.error('Uso: node load-to-crm.js resultados/<archivo>.json');
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// El backend acepta 60 requests/min por IP (ver AppModule en el backend) y
// cada prospecto acá dispara dos (checkPhone + POST). Sin pausa, un lote de
// más de ~30 prospectos empieza a pegarle al límite a mitad de camino.
const DELAY_BETWEEN_PROSPECTS_MS = 1100;

async function createProspect(p, accessToken, attempt = 1) {
  const res = await fetch(`${CRM_BASE}/prospects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(p),
  });
  if (res.status === 429 && attempt < 5) {
    await sleep(attempt * 2000);
    return createProspect(p, accessToken, attempt + 1);
  }
  return res;
}

async function main() {
  const prospects = JSON.parse(readFileSync(filePath, 'utf8'));
  const accessToken = await login();

  let created = 0, skipped = 0, failed = 0;
  for (const p of prospects) {
    if (await checkPhone(p.phone, accessToken)) {
      skipped++;
      await sleep(DELAY_BETWEEN_PROSPECTS_MS);
      continue;
    }

    const res = await createProspect(p, accessToken);
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
    await sleep(DELAY_BETWEEN_PROSPECTS_MS);
  }

  console.log(`\nCreados: ${created} | Duplicados/omitidos: ${skipped} | Fallidos: ${failed} | Total: ${prospects.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
