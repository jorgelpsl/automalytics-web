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

async function main() {
  const searchTerm = `${category} ${location}`;
  console.log(`Buscando perfiles de Instagram para "${searchTerm}" (máx ${maxResults})...`);

  const run = await client.actor(ACTOR_ID).call({
    search: searchTerm,
    searchType: 'user',
    searchLimit: maxResults,
  });

  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  console.log(`Apify devolvió ${items.length} perfiles.`);

  // Solo perfiles con handle real; el resto de la calificación (¿es del rubro?, ¿país correcto?,
  // ¿ya tiene sitio propio en la bio?) se revisa a mano antes de cargar al CRM.
  const phoneRegex = /(?:\+?56\s?)?9\s?\d{4}\s?\d{4}|\+\d{9,14}/;

  const prospects = items
    .filter((u) => u.username)
    .map((u) => {
      const bio = u.biography || '';
      const phoneMatch = bio.match(phoneRegex);
      const realPhone = phoneMatch ? phoneMatch[0].replace(/\s+/g, '') : null;
      return {
        businessName: u.fullName || u.username,
        phone: realPhone || `IG: @${u.username}`,
        industry: category,
        notes: `${bio ? bio.replace(/\n+/g, ' ') + '. ' : ''}Instagram: instagram.com/${u.username}${u.followersCount ? ` (~${u.followersCount} seguidores)` : ''}.${realPhone ? ' Tiene teléfono en la bio — priorizar llamada directa.' : ''} ${ACTION_NOTE}`,
        source: 'Apify - Instagram',
      };
    });

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
