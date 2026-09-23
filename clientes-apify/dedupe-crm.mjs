import 'dotenv/config';
import { CRM_BASE, login } from './crm-client.js';

// Limpieza única de prospectos de Instagram duplicados (ver sesión del
// 2026-09-23). Por cada grupo de mismo phone "IG: @usuario":
//   1. Trae el detalle de cada copia (para saber si tiene CallLog reales).
//   2. Elige la copia "ganadora": más registros de llamadas > estado más
//      avanzado en el pipeline > notas más largas > más antigua (createdAt).
//   3. Fusiona las notas de las copias perdedoras dentro de la ganadora,
//      para no perder información aunque no tengan CallLog.
//   4. Borra las copias perdedoras (nunca la que tiene más CallLog reales,
//      porque el borrado hace cascade sobre CallLog).
// No se ejecuta como parte del pipeline normal — es un script de un solo uso.

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const DELAY_MS = 1100;

const STATUS_RANK = {
  CLOSED_WON: 6,
  MEETING_SCHEDULED: 5,
  INTERESTED: 4,
  CONTACTED: 3,
  NOT_INTERESTED: 2,
  CLOSED_LOST: 2,
  NOT_CONTACTED: 0,
};

async function apiGet(path, accessToken, attempt = 1) {
  const res = await fetch(`${CRM_BASE}${path}`, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (res.status === 429 && attempt < 6) {
    await sleep(attempt * 2000);
    return apiGet(path, accessToken, attempt + 1);
  }
  if (!res.ok) throw new Error(`GET ${path}: ${res.status} ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

async function apiPatch(path, body, accessToken, attempt = 1) {
  const res = await fetch(`${CRM_BASE}${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(body),
  });
  if (res.status === 429 && attempt < 6) {
    await sleep(attempt * 2000);
    return apiPatch(path, body, accessToken, attempt + 1);
  }
  if (!res.ok) throw new Error(`PATCH ${path}: ${res.status} ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

async function apiDelete(path, accessToken, attempt = 1) {
  const res = await fetch(`${CRM_BASE}${path}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({}),
  });
  if (res.status === 429 && attempt < 6) {
    await sleep(attempt * 2000);
    return apiDelete(path, accessToken, attempt + 1);
  }
  if (res.status !== 204 && !res.ok) throw new Error(`DELETE ${path}: ${res.status} ${(await res.text()).slice(0, 200)}`);
}

async function main() {
  const accessToken = await login();

  const all = await apiGet('/prospects', accessToken);
  await sleep(DELAY_MS);

  const ig = all.filter((p) => typeof p.phone === 'string' && p.phone.toLowerCase().startsWith('ig: @'));
  const groups = new Map();
  for (const p of ig) {
    const key = p.phone.toLowerCase();
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(p);
  }
  const dupeGroups = [...groups.entries()].filter(([, arr]) => arr.length > 1);

  console.log(`Grupos duplicados encontrados: ${dupeGroups.length}`);

  let groupsProcessed = 0;
  let rowsDeleted = 0;
  let notesMerged = 0;
  let errors = 0;

  for (const [phone, group] of dupeGroups) {
    try {
      const detailed = [];
      for (const p of group) {
        const full = await apiGet(`/prospects/${p.id}`, accessToken);
        detailed.push(full);
        await sleep(DELAY_MS);
      }

      const scored = detailed.map((p) => ({
        p,
        callLogCount: (p.callLogs || []).length,
        statusRank: STATUS_RANK[p.status] ?? 0,
        notesLen: (p.notes || '').length,
      }));

      scored.sort((a, b) => {
        if (b.callLogCount !== a.callLogCount) return b.callLogCount - a.callLogCount;
        if (b.statusRank !== a.statusRank) return b.statusRank - a.statusRank;
        if (b.notesLen !== a.notesLen) return b.notesLen - a.notesLen;
        return new Date(a.p.createdAt) - new Date(b.p.createdAt);
      });

      const winner = scored[0].p;
      const losers = scored.slice(1).map((s) => s.p);

      let mergedNotes = winner.notes || '';
      for (const loser of losers) {
        const loserNotes = (loser.notes || '').trim();
        if (loserNotes && loserNotes !== (winner.notes || '').trim()) {
          mergedNotes += `\n\n[Fusionado de duplicado eliminado ${loser.id}, creado ${loser.createdAt}]\n${loserNotes}`;
        }
      }

      if (mergedNotes !== (winner.notes || '')) {
        await apiPatch(`/prospects/${winner.id}`, { notes: mergedNotes }, accessToken);
        notesMerged++;
        await sleep(DELAY_MS);
      }

      for (const loser of losers) {
        await apiDelete(`/prospects/${loser.id}`, accessToken);
        rowsDeleted++;
        await sleep(DELAY_MS);
      }

      groupsProcessed++;
      console.log(
        `OK ${phone}: conservado ${winner.id} (${winner.businessName}, ${winner.status}, ${scored[0].callLogCount} llamadas) — ${losers.length} borrados`,
      );
    } catch (e) {
      errors++;
      console.log(`ERROR en grupo ${phone}:`, e.message);
    }
  }

  console.log(
    `\nGrupos procesados: ${groupsProcessed}/${dupeGroups.length} | Filas borradas: ${rowsDeleted} | Notas fusionadas: ${notesMerged} | Errores: ${errors}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
