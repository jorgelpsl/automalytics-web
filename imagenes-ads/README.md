# imagenes-ads

Genera las imágenes de los 5 creativos de la campaña de Meta Ads de Automalytics enfocada en un solo dolor: negocios pequeños que no tienen sitio web propio y no aparecen en Google, vía la API de imágenes de OpenAI.

## 1. Setup (una sola vez)

```
cd imagenes-ads
npm install
cp .env.example .env
```

La `OPENAI_API_KEY` ya está configurada como variable de entorno en el proyecto de Vercel. Para tenerla también en local, dos opciones:

- Traerla desde Vercel: `vercel env pull .env` (requiere `vercel link` una vez en la raíz del repo).
- O pegarla vos mismo en `.env` directamente (nunca la subas a git — `.env` ya está en `.gitignore`).

`OPENAI_IMAGE_MODEL` viene seteado a `gpt-image-1` por defecto porque es el ID de modelo confirmado. Si tu cuenta de OpenAI ya tiene acceso a un modelo más nuevo (ej. "GPT Image 2"), confirma el ID exacto en tu dashboard de OpenAI y actualiza esa variable — el nombre comercial no siempre coincide con el ID que espera la API.

## 2. Generar imágenes

```
npm run generar                # los 5 creativos
node generar.js w2              # solo el creativo w2
```

Las imágenes quedan en `salidas/` (no se sube a git).

## Qué hay en `prompts.json`

Cada entrada es un creativo del plan de campaña, con:
- `negocio` / `dolor`: qué tipo de negocio se muestra y a qué punto de dolor le habla (todos: no tener sitio web / no aparecer en Google)
- `formato` / `angulo`: cómo está pensado en el plan de producción original
- `overlay`: el texto que debe aparecer renderizado en la imagen
- `prompt`: la descripción visual completa que se le manda al modelo

Para los formatos que no son estáticos (video corto, UGC, carrusel), la imagen generada es un **frame/mockup de referencia** para brief de producción — no reemplaza grabar el video o carrusel real.

## Notas

- Costo aproximado por imagen: revisa el pricing vigente de OpenAI para el modelo que uses (varía según calidad y resolución).
- Si un creativo falla (por ejemplo, contenido rechazado por policy), el script sigue con el resto y te avisa al final cuál falló.
