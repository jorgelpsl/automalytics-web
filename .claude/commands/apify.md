---
description: Busca prospectos con Apify (Google Maps) y los carga al CRM
---

El usuario quiere buscar prospectos con Apify. Argumentos recibidos: `$ARGUMENTS`

Formato esperado: `<categoría>` `<ciudad, Chile>` [máximo, default 30]. Si `$ARGUMENTS` no trae categoría y ciudad claras, pregunta antes de correr nada.

Pasos:

1. `cd clientes-apify`
2. Si no existe `.env` o falta `APIFY_API_TOKEN`/`PROSPECTOS_CRM_PASSWORD`, avisa y pide el dato faltante en vez de adivinar.
3. Corre: `node scrape-google-maps.js "<categoría>" "<ciudad>" <máximo>`
4. Abre el JSON generado en `resultados/` y revisa los resultados: descarta a mano cualquier entrada claramente mal identificada (rubro equivocado, otro país, cadena grande que seguro ya tiene sitio propio) antes de cargar — igual que se hizo con los lotes de Instagram/TomTom anteriores.
5. Corre: `node load-to-crm.js resultados/<archivo>.json`
6. Reporta en el mismo formato de siempre: qué se encontró, qué se excluyó y por qué, cuántos se crearon/duplicados/fallidos, y pregunta si sigue con otro rubro o ciudad.

No inventes datos de negocios ni completes campos que Apify no trajo.
