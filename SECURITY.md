# Notas de seguridad — automalytics.com

Contexto para futuros cambios. Nada aquí es secreto.

## `.vercelignore`
Vercel publica como archivo estático **cualquier** cosa que despliegue. Todo lo
que no sea parte del sitio público va en `.vercelignore`, o queda accesible en
`https://www.automalytics.com/<ruta>`. Antes de agregar carpetas internas al
repo (scrapers, workflows de n8n, notas), agrégalas también ahí.

## Content-Security-Policy (`vercel.json`)
La CSP **no** se aplica a `/dashboard`: esa ruta es un rewrite que sirve el
frontend del CRM, que carga sus propios assets y llama a su propia API. El
`source` usa un negative lookahead (`/((?!dashboard).*)`) justamente para
excluirla. Si algún día el dashboard deja de cargar, revisar esto primero.

La política permite `'unsafe-inline'` en scripts y estilos porque `index.html`
tiene todo el CSS/JS inline y 15 handlers `onclick=`. Sin un paso de build no
hay forma de usar nonces, y usar hashes obligaría a recalcularlos en cada
edición. Si alguna vez se agrega un build, conviene eliminar `'unsafe-inline'`.

Si se agrega un servicio externo nuevo (un chat, un pixel, otra fuente), hay que
agregar su origen a la directiva correspondiente o el navegador lo bloqueará
en silencio.

## `api/lead.js`
Es el único endpoint que escribe. Valida largo máximo, formato de teléfono y
email, limpia caracteres de control, revisa el honeypot `website` y aplica un
rate limit por IP **antes** de llamar al CRM. Eso último importa porque el
throttle del CRM se cuenta contra la IP de salida de Vercel, no la del
visitante: una inundación aquí bloquearía los leads reales.
