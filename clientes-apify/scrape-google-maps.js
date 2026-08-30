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

async function main() {
  console.log(`Buscando "${category}" en "${location}" (máx ${maxResults})...`);

  const run = await client.actor(ACTOR_ID).call({
    searchStringsArray: [category],
    locationQuery: location,
    maxCrawledPlacesPerSearch: maxResults,
    language: 'es',
  });

  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  console.log(`Apify devolvió ${items.length} lugares.`);

  const sinWeb = items.filter((p) => !hasRealWebsite(p) && p.phone);
  console.log(`De esos, ${sinWeb.length} no tienen sitio web propio y sí tienen teléfono.`);

  const prospects = sinWeb.map((p) => ({
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

  console.log(`Guardado: ${outPath} (${prospects.length} prospectos listos para cargar)`);
  console.log(`Siguiente paso: node load-to-crm.js ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
