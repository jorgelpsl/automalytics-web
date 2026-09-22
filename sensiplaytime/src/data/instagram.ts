import type { InstagramPost } from "@/types";

// Visual placeholders standing in for real Instagram posts — no post here
// claims to be an actual publication. `url` is left unset until a real
// permalink is configured, at which point that tile becomes clickable.
export const INSTAGRAM_POSTS: InstagramPost[] = [
  { id: "ig-1", illustrationVariant: "tablero", bgClass: "bg-brand-coral/15", caption: "Tablero sensorial" },
  { id: "ig-2", illustrationVariant: "llavero", bgClass: "bg-brand-lavender/20", caption: "Llaveros personalizados" },
  { id: "ig-3", illustrationVariant: "cubo", bgClass: "bg-sky-100", caption: "Infinity cubo" },
  { id: "ig-4", illustrationVariant: "cadena", bgClass: "bg-brand-mint/25", caption: "Cadena articulada" },
  { id: "ig-5", illustrationVariant: "corazon", bgClass: "bg-brand-coral/10", caption: "Sensi, nuestra mascota" },
  { id: "ig-6", illustrationVariant: "estrella", bgClass: "bg-brand-yellow/20", caption: "Piezas impresas en 3D" },
  { id: "ig-7", illustrationVariant: "engranajes", bgClass: "bg-brand-lavender/15", caption: "Set de engranajes" },
  { id: "ig-8", illustrationVariant: "blob", bgClass: "bg-brand-mint/20", caption: "Stress blob" },
];
