import { SITE } from "@/data/site";
import type { Category, Product } from "@/types";

// Every WhatsApp link in the app goes through one of these builders instead
// of hand-rolling a wa.me URL per component — keeps the number and the
// message wording in one place.
function buildWhatsAppUrl(message: string): string {
  const digits = SITE.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function generalWhatsAppUrl(): string {
  return buildWhatsAppUrl("Hola SensiPlayTime 👋 Estoy interesado en comprar un producto.");
}

export function productWhatsAppUrl(product: Product): string {
  return buildWhatsAppUrl(`Hola SensiPlayTime 👋 Me interesa el producto: ${product.name}.`);
}

export function categoryWhatsAppUrl(category: Category): string {
  return buildWhatsAppUrl(`Hola SensiPlayTime 👋 Quiero ver productos de ${category.name}.`);
}
