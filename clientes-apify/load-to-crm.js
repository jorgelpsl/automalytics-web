import { readFileSync } from 'fs';
import 'dotenv/config';
import { CRM_BASE, login, checkPhone } from './crm-client.js';

// Uso: node load-to-crm.js resultados/<archivo>.json

const [, , filePath] = process.argv;
if (!filePath) {
  console.error('Uso: node load-to-crm.js resultados/<archivo>.json');
  process.exit(1);
}

async function main() {
  const prospects = JSON.parse(readFileSync(filePath, 'utf8'));
  const accessToken = await login();

  let created = 0, skipped = 0, failed = 0;
  for (const p of prospects) {
    if (await checkPhone(p.phone, accessToken)) {
      skipped++;
      continue;
    }

    const res = await fetch(`${CRM_BASE}/prospects`, {
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
