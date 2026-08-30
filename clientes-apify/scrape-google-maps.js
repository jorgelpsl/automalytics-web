import { ApifyClient } from 'apify-client';
import { writeFileSync, mkdirSync } from 'fs';
import 'dotenv/config';

// Uso: node scrape-google-maps.js "<categoría>" "<ciudad, país>" [maxResultados]
// Ej:  node scrape-google-maps.js "clínica dental" "Temuco, Chile" 30

const [, , category, location, maxResultsArg] = process.argv;

if (!category || !location) {
  console.error('Uso: node scrape-google-maps.js "<categoría>" "<ciudad, país>" [maxResultados]');
  process.exit(1);
}

const token = process.env.APIFY_API_TOKEN;
if (!token) {
  console.error('Falta APIFY_API_TOKEN. Copia .env.example a .env y pega tu token de Apify.');
  process.exit(1);
}

const maxResults = Number(maxResultsArg) || 30;
const client = new ApifyClient({ token });

// Actor público de Apify Store: "Google Maps Scraper" (compass/crawler-google-places)
const ACTOR_ID = 'compass/crawler-google-places';

function hasRealWebsite(place) {
  const url = (place.website || '').toLowerCase();
  if (!url) return false;
  if (url.includes('facebook.com') || url.includes('instagram.com') || url.includes('linktr.ee')) return false;
  return true;
}

async function crawlOnce(crawlSize) {
  const run = await client.actor(ACTOR_ID).call({
    searchStringsArray: [category],
    locationQuery: location,
    maxCrawledPlacesPerSearch: crawlSize,
    language: 'es',
  });
  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  return items;
}

async function main() {
  console.log(`Buscando "${category}" en "${location}" — objetivo: ${maxResults} negocios sin sitio web...`);

  // maxResults es la cantidad de negocios QUE CALIFICAN (sin sitio propio,
  // con teléfono) que queremos, no la cantidad cruda que Maps devuelve —
  // como la mayoría de los lugares sí tienen sitio, hay que pedirle a Maps
  // bastantes más de los que necesitamos y, si aun así no alcanza, volver
  // a rastrear con un radio de búsqueda más amplio (crawlSize mayor).
  const CAP = Math.max(maxResults * 8, 100);
  let crawlSize = maxResults * 2;
  let items = [];
  let qualifying = [];

  while (true) {
    console.log(`  Rastreando hasta ${crawlSize} lugares en Maps...`);
    items = await crawlOnce(crawlSize);
    qualifying = items.filter((p) => !hasRealWebsite(p) && p.phone);
    console.log(`  -> ${items.length} lugares encontrados, ${qualifying.length} califican (sin sitio propio, con teléfono).`);

    if (qualifying.length >= maxResults) break;
    if (crawlSize >= CAP) break;
    // Maps devolvió menos de lo pedido: se quedó sin lugares para esta
    // búsqueda en esta zona, así que pedir más no va a traer más.
    if (items.length < crawlSize) break;

    crawlSize = Math.min(crawlSize * 2, CAP);
  }

  if (qualifying.length < maxResults) {
    console.log(
      `Aviso: solo se encontraron ${qualifying.length} de los ${maxResults} pedidos — Maps no tiene más lugares para "${category}" en "${location}".`,
    );
  }

  const selected = qualifying.slice(0, maxResults);

  const prospects = selected.map((p) => ({
    businessName: p.title,
    phone: (p.phone || '').replace(/\s+/g, ''),
    industry: category,
    notes: `${p.address || location}. ${p.website ? `Solo tiene: ${p.website}` : 'Sin sitio web.'}${p.totalScore ? ` Rating: ${p.totalScore} (${p.reviewsCount || 0} reseñas).` : ''}`,
    source: 'Apify - Google Maps',
    hasNoWebsite: true,
  }));

  mkdirSync('resultados', { recursive: true });
  const slug = `${category}-${location}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const outPath = `resultados/${slug}.json`;
  writeFileSync(outPath, JSON.stringify(prospects, null, 2));

  console.log(`Guardado: ${outPath} (${prospects.length} de ${maxResults} pedidos, listos para cargar)`);
  console.log(`Siguiente paso: node load-to-crm.js ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
