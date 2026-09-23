import { ApifyClient } from 'apify-client';
import { writeFileSync, mkdirSync } from 'fs';
import 'dotenv/config';
import { login, checkPhone } from './crm-client.js';

// Uso: node scrape-following.js "<cuenta_publica_objetivo>" [maxResultados]
// Ej:  node scrape-following.js "automalytics" 200
//
// Trae TODAS las cuentas que sigue una cuenta pública de Instagram y las
// deja listas para cargar al CRM. A diferencia de scrape-instagram.js (que
// parte de una búsqueda por rubro y filtra agresivo), acá no se descarta
// nada por rubro ni país — se guarda todo lo que la cuenta objetivo sigue,
// tal como se pidió. Solo se aplican dos cosas automáticas: no repetir
// cuentas que el CRM ya tiene, y marcar (sin borrar) lo que parece cuenta
// personal en vez de negocio, para que la revisión manual sea más rápida.

const [, , targetAccount, maxResultsArg] = process.argv;

if (!targetAccount) {
  console.error('Uso: node scrape-following.js "<cuenta_publica_objetivo>" [maxResultados]');
  process.exit(1);
}

const token = process.env.APIFY_API_TOKEN;
if (!token) {
  console.error('Falta APIFY_API_TOKEN. Copia .env.example a .env y pega tu token de Apify.');
  process.exit(1);
}

const maxResults = Number(maxResultsArg) || 200;
const client = new ApifyClient({ token });

// Actores públicos de Apify Store — ninguno de los dos necesita login ni
// cookies para cuentas objetivo públicas (probado en vivo).
const FOLLOWING_ACTOR_ID = 'datadoping/instagram-following-scraper';
const PROFILE_ACTOR_ID = 'apify/instagram-profile-scraper';

const ACTION_NOTE =
  'Contactar por mensaje directo de Instagram si no hay teléfono. Verificar si tienen WhatsApp para contactar por ahí también. Revisar la bio: si tienen link a página web, evaluar si es básica/gratuita y "upgradeable" (Linktree, plantilla gratuita, etc.) o si ya tienen un sitio propio bien armado.';

// Palabras que casi nunca aparecen en el nombre de una persona pero sí en
// el de un negocio — si el fullName trae alguna de estas, no se marca como
// posible cuenta personal aunque no tenga isBusinessAccount/categoría.
const BUSINESS_KEYWORDS = [
  'taller', 'clinica', 'clínica', 'salon', 'salón', 'tienda', 'studio', 'estudio',
  'spa', 'boutique', 'peluqueria', 'peluquería', 'gimnasio', 'gym', 'restaurante',
  'restaurant', 'cafe', 'café', 'centro', 'instituto', 'estetica', 'estética',
  'belleza', 'nails', 'uñas', 'barberia', 'barbería', 'consultorio', 'farmacia',
  'ferreteria', 'ferretería', 'panaderia', 'panadería', 'store', 'shop', 'chile',
];

// Heurística de sugerencia (no un filtro que borra nada — pedido explícito
// de Jorge, que quiere ver TODAS las cuentas, solo marcadas para revisar
// rápido). Se marca posible-personal solo cuando se cumplen las tres señales
// a la vez: isBusinessAccount no vino en true, no trae categoría de negocio,
// y el nombre completo tiene forma de "Nombre Apellido" sin ninguna palabra
// de negocio. isBusinessAccount solo no alcanza (probado con datos reales:
// negocios chicos reales lo traen en false igual) — por eso nunca se usa
// como única señal.
function looksLikePersonalName(fullName) {
  if (!fullName) return false;
  const lower = fullName.toLowerCase();
  if (BUSINESS_KEYWORDS.some((kw) => lower.includes(kw))) return false;
  // Dos o tres palabras, cada una empieza con mayúscula, sin dígitos ni
  // símbolos de negocio típicos (|, separadores de eslogan, emojis de
  // ubicación, etc.)
  return /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ'-]+(\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ'-]+){1,2}$/.test(fullName.trim());
}

function isPossiblyPersonal(profile) {
  if (profile.isBusinessAccount) return false;
  if (profile.businessCategoryName) return false;
  return looksLikePersonalName(profile.fullName);
}

async function main() {
  console.log(`Buscando cuentas que sigue @${targetAccount} (máx ${maxResults})...`);

  const followRun = await client.actor(FOLLOWING_ACTOR_ID).call({
    usernames: [targetAccount],
    max_count: Math.max(maxResults, 50),
  });
  const { items: followItems } = await client.dataset(followRun.defaultDatasetId).listItems();

  if (followItems.length === 0) {
    console.error(
      `No se encontró ninguna cuenta seguida por @${targetAccount}. La cuenta objetivo debe ser ` +
        'pública — si es privada, este método no puede ver su lista de seguidos.',
    );
    process.exit(1);
  }

  console.log(`  -> @${targetAccount} sigue ${followItems.length} cuentas.`);

  // Antes de gastar créditos enriqueciendo, saca las que el CRM ya tiene
  // cargadas (mismo formato de teléfono IG: @usuario que usa todo lo demás).
  // Con pausa entre cada chequeo: el backend acepta 60 requests/min por IP,
  // y una lista de seguidos larga sin pausa termina pegándole al límite —
  // lo que antes producía "no hay match" silencioso en vez de la respuesta
  // real, y colaba cuentas que en realidad ya estaban cargadas.
  const accessToken = await login();
  const newUsernames = [];
  let alreadyInCrm = 0;
  for (const item of followItems) {
    const exists = await checkPhone(`IG: @${item.username}`, accessToken);
    if (exists) {
      alreadyInCrm++;
    } else {
      newUsernames.push(item.username);
    }
    await new Promise((r) => setTimeout(r, 1100));
  }
  if (alreadyInCrm > 0) {
    console.log(`  -> ${alreadyInCrm} ya estaban en el CRM, se omiten antes de enriquecer.`);
  }
  if (newUsernames.length === 0) {
    console.log('Todas las cuentas seguidas ya estaban cargadas — nada nuevo que traer.');
    return;
  }

  console.log(`  Enriqueciendo ${newUsernames.length} cuentas nuevas...`);
  const profileRun = await client.actor(PROFILE_ACTOR_ID).call({ usernames: newUsernames });
  const { items: profiles } = await client.dataset(profileRun.defaultDatasetId).listItems();

  let personalCount = 0;
  const prospects = profiles.map((profile) => {
    const username = profile.username;
    const possiblyPersonal = isPossiblyPersonal(profile);
    if (possiblyPersonal) personalCount++;

    const notesParts = [];
    if (possiblyPersonal) {
      notesParts.push('⚠️ Parece cuenta personal, no negocio — revisar antes de cargar.');
    }
    if (profile.biography) notesParts.push(profile.biography.replace(/\n+/g, ' ') + '.');
    notesParts.push(
      `Instagram: instagram.com/${username}${profile.followersCount ? ` (~${profile.followersCount} seguidores)` : ''}.`,
    );
    if (profile.businessCategoryName) notesParts.push(`Categoría en Instagram: ${profile.businessCategoryName}.`);
    if (profile.externalUrl) notesParts.push(`Sitio web propio: ${profile.externalUrl}.`);
    notesParts.push(ACTION_NOTE);

    const prospect = {
      businessName: profile.fullName || username,
      phone: `IG: @${username}`,
      notes: notesParts.join(' '),
      source: `Apify - Instagram (seguidos de @${targetAccount})`,
      possiblyPersonal,
    };
    if (profile.externalUrl) prospect.website = profile.externalUrl;
    return prospect;
  });

  mkdirSync('resultados', { recursive: true });
  const slug = `following-${targetAccount}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const outPath = `resultados/${slug}.json`;
  writeFileSync(outPath, JSON.stringify(prospects, null, 2), 'utf-8');

  console.log(`Guardado: ${outPath} (${prospects.length} cuentas nuevas)`);
  console.log(`${personalCount} de ${prospects.length} marcadas como posible cuenta personal — revísalas antes de cargar.`);
  console.log(`Siguiente paso: node load-to-crm.js ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
