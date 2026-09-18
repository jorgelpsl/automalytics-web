import { ApifyClient } from 'apify-client';
import { writeFileSync, mkdirSync } from 'fs';
import 'dotenv/config';

// Uso: node scrape-instagram.js "<categoría>" "<ciudad o país>" [maxResultados]
// Ej:  node scrape-instagram.js "clínica dental" "Temuco, Chile" 30

const [, , category, location, maxResultsArg] = process.argv;

if (!category || !location) {
  console.error('Uso: node scrape-instagram.js "<categoría>" "<ciudad o país>" [maxResultados]');
  process.exit(1);
}

const token = process.env.APIFY_API_TOKEN;
if (!token) {
  console.error('Falta APIFY_API_TOKEN. Copia .env.example a .env y pega tu token de Apify.');
  process.exit(1);
}

const maxResults = Number(maxResultsArg) || 30;
const client = new ApifyClient({ token });

// Actor público de Apify Store: "Instagram Search Scraper" (apify/instagram-search-scraper)
const ACTOR_ID = 'apify/instagram-search-scraper';

const ACTION_NOTE =
  'Contactar por mensaje directo de Instagram si no hay teléfono. Verificar si tienen WhatsApp para contactar por ahí también. Revisar la bio: si tienen link a página web, evaluar si es básica/gratuita y "upgradeable" (Linktree, plantilla gratuita, etc.) o si ya tienen un sitio propio bien armado.';

const phoneRegex = /(?:\+?56\s?)?9\s?\d{4}\s?\d{4}|\+\d{9,14}/;

// El actor devuelve dos formas de item distintas según qué tan directo fue
// el match (probado en vivo, no documentado por Apify):
// - "lugar": { name, category, phone, location_address, ig_business: { profile: { username } } }
// - "perfil directo": { username, fullName, biography, followersCount, isBusinessAccount }
// (a veces resuelve directo a la cuenta de negocio en vez de a una ficha de lugar).
// Esta función soporta ambas formas para no perder resultados.
function extractProspect(item, category) {
  const isProfileShaped = typeof item.username === 'string' && typeof item.biography !== 'undefined';
  const username = isProfileShaped ? item.username : item.ig_business?.profile?.username;
  if (!username) return null;

  const businessName = isProfileShaped ? item.fullName || username : item.name || username;
  const bio = (isProfileShaped ? item.biography : '') || '';
  const rawPhone = item.phone || '';
  const phoneMatch = bio.match(phoneRegex) || String(rawPhone).match(phoneRegex);
  const realPhone = phoneMatch ? phoneMatch[0].replace(/\s+/g, '') : null;

  const extraBits = [];
  if (!isProfileShaped && item.category) extraBits.push(`Categoría en Instagram: ${item.category}.`);
  if (!isProfileShaped && item.location_address) extraBits.push(`Dirección: ${item.location_address}.`);
  if (!isProfileShaped && (item.lat || item.lng)) {
    extraBits.push(`Coordenadas: ${item.lat}, ${item.lng} — verificar que correspondan a la ciudad pedida (la búsqueda no descarta lugares con el mismo nombre en otro país).`);
  }

  const notesParts = [];
  if (bio) notesParts.push(bio.replace(/\n+/g, ' ') + '.');
  notesParts.push(`Instagram: instagram.com/${username}${item.followersCount ? ` (~${item.followersCount} seguidores)` : ''}.`);
  if (realPhone) notesParts.push('Tiene teléfono en la bio/ficha — priorizar llamada directa.');
  notesParts.push(...extraBits);
  notesParts.push(ACTION_NOTE);

  return {
    businessName,
    phone: realPhone || `IG: @${username}`,
    industry: category,
    notes: notesParts.join(' '),
    source: 'Apify - Instagram',
  };
}

async function main() {
  // Términos cortos separados por coma en vez de una frase larga — el
  // actor hace mejor matching con keywords (como lo que escribirías en un
  // buscador) que con una oración completa armada por concatenación.
  // searchType 'place' busca negocios/lugares reales con ubicación
  // etiquetada (probado en vivo: encuentra negocios reales), muy distinto
  // de 'user' — que termina buscando en el autocompletado de intereses de
  // Facebook Ads y en usuarios de Threads, y trae celebridades sin
  // ninguna relación con el rubro o la ciudad.
  const searchTerms = [`${category} ${location}`, category].join(', ');
  console.log(`Buscando lugares de Instagram para "${searchTerms}" (máx ${maxResults})...`);

  const run = await client.actor(ACTOR_ID).call({
    search: searchTerms,
    searchType: 'place',
    searchLimit: maxResults,
  });

  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  console.log(`Apify devolvió ${items.length} resultados.`);

  const prospects = items.map((item) => extractProspect(item, category)).filter(Boolean);

  mkdirSync('resultados', { recursive: true });
  const slug = `ig-${category}-${location}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const outPath = `resultados/${slug}.json`;
  writeFileSync(outPath, JSON.stringify(prospects, null, 2));

  console.log(`Guardado: ${outPath} (${prospects.length} perfiles — revísalos a mano antes de cargar, esto no filtra rubro/país automáticamente)`);
  console.log(`Siguiente paso: node load-to-crm.js ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
