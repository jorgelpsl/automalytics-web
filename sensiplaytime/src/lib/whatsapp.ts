import { SITE } from "@/data/site";
import type { CartLine, Product } from "@/types";
import { formatCLP } from "@/lib/format";

// Every WhatsApp link in the app goes through one of these three builders
// instead of hand-rolling a wa.me URL per component — keeps the number and
// the message wording in one place.
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

export function cartWhatsAppUrl(lines: CartLine[], products: Product[]): string {
  if (lines.length === 0) return generalWhatsAppUrl();

  const rows = lines.map((line) => {
    const product = products.find((p) => p.id === line.productId);
    if (!product) return null;
    return `• ${product.name} x${line.quantity} — ${formatCLP(product.price * line.quantity)}`;
  });

  const total = lines.reduce((sum, line) => {
    const product = products.find((p) => p.id === line.productId);
    return sum + (product ? product.price * line.quantity : 0);
  }, 0);

  const message = [
    "Hola SensiPlayTime 👋 Quiero comprar estos productos:",
    "",
    ...rows.filter((r): r is string => Boolean(r)),
    "",
    `Total: ${formatCLP(total)}`,
  ].join("\n");

  return buildWhatsAppUrl(message);
}
