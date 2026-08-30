# clientes-apify

Busca prospectos (negocios sin sitio web) con Apify y los carga directo a Prospectos CRM.

## 1. Setup (una sola vez)

```
cd clientes-apify
npm install
cp .env.example .env
```

Edita `.env` y completa:
- `APIFY_API_TOKEN` — tu token de Apify (Settings → Integrations en apify.com)
- `PROSPECTOS_CRM_PASSWORD` — la contraseña del usuario `roman` del CRM

## 2. Buscar prospectos

```
node scrape-google-maps.js "clínica dental" "Temuco, Chile" 30
```

Esto busca en Google Maps vía Apify, se queda solo con los negocios que **no tienen sitio web propio** (o solo tienen Facebook/Instagram) y sí tienen teléfono, y guarda el resultado en `resultados/`.

## 3. Cargar al CRM

```
node load-to-crm.js resultados/clinica-dental-temuco-chile.json
```

Salta duplicados automáticamente (mismo negocio ya cargado).

## Notas

- El actor usado es `compass/crawler-google-places` (Google Maps Scraper, público en Apify Store). Tiene costo por resultado en Apify — revisa tu plan antes de correr búsquedas grandes.
- `resultados/` y `.env` no se suben a git (ver `.gitignore`).
