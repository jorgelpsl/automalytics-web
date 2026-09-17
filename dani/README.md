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

Instagram no tiene una búsqueda pública fácil de scrapear (su buscador real
vive detrás de sesión iniciada), así que hay dos formas de encontrar cuentas:

### 3a. Automático — Dani busca las cuentas por ti

```
python discover-instagram.py "peluquería" "Temuco, Chile" 15
```

Busca en DuckDuckGo (no en Instagram directamente) links a `instagram.com`
que mencionen el rubro y la ciudad, saca el `@usuario` de cada resultado, y
visita cada perfil candidato para sacarle nombre, bio, seguidores y teléfono
— igual que el paso 3b. Guarda el resultado en `resultados/`.

**La relevancia de la búsqueda no es perfecta** — un resultado puede ser de
otra ciudad, una cuenta personal, o no tener nada que ver. Por eso cada
entrada queda con una nota pidiendo verificar rubro/ciudad a mano — revisa
igual de estricto que con una lista armada por ti.

### 3b. Manual — tú ya tienes la lista de cuentas

Si prefieres descubrir las cuentas a mano (buscando en la app, revisando
hashtags del rubro, etc.) y solo quieres que Dani visite esos perfiles:

```
python scrape-instagram.py "peluquería" "peluqueria_temuco,estudio_capilar_cl"
```

En ambos casos: Instagram limita cuántos perfiles puedes ver sin sesión
iniciada en poco tiempo — si empiezan a fallar todos de golpe, espera un
rato entre tandas.

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
- La API de Scrapling que usan los scripts (`StealthyFetcher.fetch(...)` /
  `Fetcher.get(...)` con sus argumentos, y los selectores CSS
  `.css()`/`.attrib`/`.getall()`) está verificada contra la versión
  instalable actual (0.4.15) — no es solo una suposición de cómo debería
  funcionar. La lógica de `discover-instagram.py` que extrae el `@usuario`
  de un link y desenvuelve el redirect de DuckDuckGo también está probada
  con datos simulados. Lo que NO se pudo probar desde Claude es el fetch
  real contra Google Maps/Instagram/DuckDuckGo: el proxy de seguridad de
  Claude Code Cloud bloquea ese tráfico (confirmado al intentarlo — el
  fetch se cuelga y no responde), así que el HTML real de esas páginas solo
  se puede validar corriendo el script en tu compu. Prueba primero con una
  búsqueda chica (5-10 resultados) y avísame si algún selector no encuentra
  nada — lo más probable es que Google/Instagram/DuckDuckGo haya cambiado
  una clase CSS, no un problema de la librería.
