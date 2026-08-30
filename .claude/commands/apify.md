---
description: Busca prospectos con Apify (Google Maps o Instagram) y los carga al CRM
---

El usuario quiere buscar prospectos con Apify. Argumentos recibidos: `$ARGUMENTS`

Formato: `/apify "rubro" "ciudad o país" "plataforma" "cantidad"`
- **rubro**: categoría del negocio (ej. "peluquería", "clínica dental")
- **ciudad o país**: ubicación (ej. "Santiago, Chile", "Chile")
- **plataforma**: `maps` (default si se omite) o `instagram`
- **cantidad**: cuántos negocios que SÍ califiquen quieres al final (default 30) — no es un tope crudo de Apify. En `maps`, el script amplía la búsqueda solo automáticamente hasta juntar esa cantidad de negocios sin sitio propio (o hasta que Maps se quede sin más lugares para esa búsqueda, en cuyo caso avisa y entrega menos).

Si falta rubro o ubicación, pregunta antes de correr nada. Si falta plataforma o cantidad, usa los defaults sin preguntar.

Pasos:

1. `cd clientes-apify`
2. Si no existe `.env` o falta `APIFY_API_TOKEN`/`PROSPECTOS_CRM_PASSWORD`, avisa y pide el dato faltante en vez de adivinar.
3. Según plataforma:
   - `maps` → `node scrape-google-maps.js "<rubro>" "<ciudad o país>" <cantidad>`
   - `instagram` → `node scrape-instagram.js "<rubro>" "<ciudad o país>" <cantidad>`
4. Abre el JSON generado en `resultados/` y revisa cada entrada a mano antes de cargar:
   - `maps`: descarta lo que no sea del rubro correcto (Google a veces mezcla categorías) o sea un lugar público mal etiquetado.
   - `instagram`: descarta perfiles que no correspondan al rubro/país, o cuentas grandes/cadenas que seguro ya tienen sitio propio. Esta búsqueda no filtra por ubicación de forma estricta — verifica que cada perfil sea realmente del país/ciudad pedido.
5. Corre: `node load-to-crm.js resultados/<archivo>.json`
6. Reporta en el mismo formato de siempre: qué se encontró, qué se excluyó y por qué, cuántos se crearon/duplicados/fallidos, y pregunta si sigue con otro rubro, ciudad o plataforma.

No inventes datos de negocios ni completes campos que Apify no trajo.
