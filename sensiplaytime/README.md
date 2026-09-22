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
cp .env.example .env.local   # y completa el número de WhatsApp real
npm run dev
```

## Antes de producción

1. **Número de WhatsApp**: `NEXT_PUBLIC_WHATSAPP_NUMBER` en `.env.local`
   (o como variable de entorno en Vercel) sigue en un valor de ejemplo
   (`56900000000`). Cámbialo por el número real del negocio.
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
