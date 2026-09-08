# Dani

Sub-agente que busca prospectos (negocios sin sitio web) en Google Maps e
Instagram usando [Scrapling](https://github.com/D4Vinci/Scrapling) en vez
de Apify, y los deja listos para cargar al mismo Prospectos CRM que usa
`clientes-apify`.

## Por qué existe (y por qué corre en tu compu, no en Claude Code Cloud)

Google Maps e Instagram cargan sus datos por JavaScript — no existe una
versión "solo HTML" que se pueda leer con un simple `fetch`. Hace falta un
navegador real. Las sesiones de Claude Code en la nube (Anthropic-hosted)
pasan todas por un proxy de seguridad que bloquea justamente ese tipo de
tráfico (navegador headless, fingerprint de navegador), así que Dani no
puede scrapear en vivo desde ahí. Tu computador no tiene ese proxy de por
medio, así que ahí sí funciona.

Lo que SÍ puedes hacer desde una sesión cloud: pedirle a Claude que revise/
cure un archivo de resultados ya generado y lo cargue al CRM (ese paso es
solo una llamada HTTP normal, no necesita navegador).

## 1. Setup (una sola vez, en tu compu)

```
cd dani
pip install -r requirements.txt
scrapling install     # descarga el navegador que usa Scrapling
```

No necesita `.env` ni token — a diferencia de Apify, no hay una API de por
medio; el navegador visita las páginas directamente.

## 2. Buscar prospectos en Google Maps

```
python scrape-google-maps.py "clínica dental" "Temuco, Chile" 30
```

Abre Google Maps en un navegador headless, scrollea el panel de resultados,
entra a cada negocio y se queda solo con los que **no tienen sitio web
propio** (o solo tienen Facebook/Instagram/Linktree) y sí tienen teléfono
— mismo criterio que `clientes-apify/scrape-google-maps.js`. Guarda el
resultado en `resultados/`.

Si un día deja de traer resultados, lo más probable es que Google haya
cambiado las clases CSS que usa (pasa cada tanto — por eso Apify cobra por
mantener su actor). Corre con un navegador visible para revisar
(`headless=False` dentro del script) y avísame el HTML actual para
actualizar los selectores.

## 3. Buscar prospectos en Instagram

A diferencia de Maps, Instagram no tiene una búsqueda pública fácil de
scrapear — hay que descubrir las cuentas a mano (buscando en la app,
revisando hashtags del rubro, etc.) y pasarle la lista de usuarios a Dani:

```
python scrape-instagram.py "peluquería" "peluqueria_temuco,estudio_capilar_cl"
```

Visita cada perfil público, saca nombre, bio, seguidores y teléfono (si
está en la bio), y guarda el resultado en `resultados/`. Instagram limita
cuántos perfiles puedes ver sin sesión iniciada en poco tiempo — si
empiezan a fallar todos de golpe, espera un rato entre tandas.

## 4. Cargar al CRM

Se reutiliza el mismo cargador que usa Apify — no hay que duplicar esa
lógica (login, chequeo de duplicados, etc.):

```
cd ../clientes-apify
node load-to-crm.js ../dani/resultados/<archivo>.json
```

(Necesita el `.env` de `clientes-apify` con `PROSPECTOS_CRM_USER` /
`PROSPECTOS_CRM_PASSWORD` ya configurado — ver `clientes-apify/README.md`.)

## Notas

- `resultados/` no se sube a git (ver `.gitignore`).
- Instagram: los perfiles sin `og:description` visible (privados, o
  Instagram bloqueando el request) se omiten — revisa el aviso en consola.
- Estos scripts no se han probado contra Google/Instagram en vivo desde
  Claude (esta sesión no tiene el acceso de red necesario) — están escritos
  a partir de la estructura conocida de esas páginas. Prueba con una
  búsqueda chica primero y avísame si algún selector no encuentra nada.
