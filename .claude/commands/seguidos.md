---
description: Trae al CRM las cuentas que sigue una cuenta pública de Instagram (Apify)
---

El usuario quiere importar al CRM las cuentas que sigue una cuenta pública de Instagram. Argumentos recibidos: `$ARGUMENTS`

Formato: `/seguidos "<cuenta_objetivo>" [maxResultados]`
- **cuenta_objetivo**: username de Instagram (sin @) de la cuenta pública cuya lista de seguidos quieres traer. Debe ser pública — si es privada, el actor no va a traer nada.
- **maxResultados**: tope de cuentas seguidas a traer (default 200).

Si falta la cuenta objetivo, pregunta antes de correr nada.

Pasos:

1. `cd clientes-apify`
2. Si no existe `.env` o falta `APIFY_API_TOKEN`/`PROSPECTOS_CRM_USER`/`PROSPECTOS_CRM_PASSWORD`, avisa y pide el dato faltante en vez de adivinar.
3. Corre: `node scrape-following.js "<cuenta_objetivo>" <maxResultados>`
   - El script ya se salta solo las cuentas que el CRM tiene cargadas (dedup antes de gastar créditos enriqueciendo) — no hace falta chequear eso a mano.
   - Si avisa que no encontró ninguna cuenta seguida, la cuenta objetivo probablemente es privada — avisa al usuario y detente ahí, no hay nada que cargar.
4. Abre el JSON generado en `resultados/following-<cuenta_objetivo>.json`:
   - Cuenta cuántas quedaron marcadas `possiblyPersonal: true` y muéstraselas al usuario (nombre completo + @usuario) — es una sugerencia (nombre con pinta de persona, sin categoría de negocio), no una verdad absoluta, así que avísale antes de cargar en vez de decidir por tu cuenta.
   - Pregúntale si quiere cargar todo, solo las que no quedaron marcadas, o revisar caso por caso él mismo.
5. Según lo que decida, arma un archivo filtrado (o usa el original completo si pidió todo) y corre: `node load-to-crm.js resultados/<archivo>.json`.
6. Reporta en el mismo formato de siempre: cuántas cuentas sigue el objetivo en total, cuántas ya estaban en el CRM (se filtraron antes de enriquecer), cuántas se marcaron como posible personal, cuántas se crearon/duplicadas/fallidas al cargar, y pregunta si sigue con otra cuenta objetivo.

No inventes datos de cuentas ni completes campos que Apify no trajo (sin teléfono real disponible acá — el campo `phone` siempre es `IG: @usuario`).
