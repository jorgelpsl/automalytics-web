# SensiPlayTime

Landing page de SensiPlayTime — fidgets, productos sensoriales, personalizados
e impresión 3D, hecha en Maipú, Santiago de Chile.

Next.js (App Router) + TypeScript + Tailwind CSS. Sitio informativo, no
tienda: los productos se muestran como catálogo destacado y cada compra o
consulta se coordina por WhatsApp — no hay carrito, checkout ni páginas de
producto individuales.

Páginas: inicio, `/sobre-nosotros`, `/faq`, `/contacto`.

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
2. **Precios y catálogo**: todo está centralizado en `src/data/products.ts`
   — los 6 productos actuales son de demostración.
3. **Instagram**: los posts de la grilla (`src/data/instagram.ts`) no tienen
   `url` todavía — agrégala cuando existan publicaciones reales para que la
   grilla enlace a Instagram.
4. **Imágenes**: el hero (`public/hero-sensiplaytime.webp`) y el ícono de
   Sensi en el header/footer (`public/mascot-icon.webp`) son fotos reales
   entregadas por el cliente. Los productos del catálogo destacado todavía
   usan ilustraciones vectoriales propias
   (`src/components/ToyIllustration.tsx`) porque no hay fotos reales de cada
   producto — reemplázalas cuando existan.

## Estructura

```
src/
  app/            rutas (App Router): inicio, sobre-nosotros, faq, contacto
  components/     componentes de UI reutilizables
  data/           catálogo, categorías, FAQ, config del sitio — todo editable
  lib/            helpers (WhatsApp, formato de moneda)
  types/          tipos compartidos
public/           imágenes reales (hero, logo/mascota)
```
