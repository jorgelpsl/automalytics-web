# SensiPlayTime

Tienda online de SensiPlayTime — fidgets, productos sensoriales, personalizados
e impresión 3D, hecha en Maipú, Santiago de Chile.

Next.js (App Router) + TypeScript + Tailwind CSS, con carrito (estado local +
localStorage), buscador, filtros por categoría, y compra por WhatsApp. Sin
integración de pagos todavía — el flujo de compra actual termina en un
mensaje de WhatsApp con el pedido armado.

## Correr en local

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Antes de producción

1. **Número de WhatsApp**: por ahora usa el número de Automalytics
   (`56932954075`, el mismo de las otras demos) vía
   `NEXT_PUBLIC_WHATSAPP_NUMBER`. Cuando SensiPlayTime tenga su propio
   WhatsApp Business, cambia esa variable en `.env.local` (o en Vercel).
2. **Imágenes de producto**: no existen fotos reales todavía, así que cada
   producto/categoría usa una ilustración vectorial propia
   (`src/components/ToyIllustration.tsx`) en vez de una foto. Para
   reemplazarlas por fotos reales, cambia `image.kind` a `"photo"` en
   `src/data/products.ts` y agrega el archivo en `public/`.
3. **Precios y catálogo**: todo está centralizado en `src/data/products.ts`
   — los 6 productos actuales son de demostración.
4. **Instagram**: los posts de la grilla (`src/data/instagram.ts`) no tienen
   `url` todavía — agrégala cuando existan publicaciones reales para que la
   grilla enlace a Instagram.

## Estructura

```
src/
  app/            rutas (App Router)
  components/     componentes de UI reutilizables
  context/        estado del carrito (React Context + localStorage)
  data/           catálogo, categorías, FAQ, config del sitio — todo editable
  lib/            helpers (WhatsApp, formato de moneda)
  types/          tipos compartidos
```
