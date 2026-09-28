import { SITE } from "@/data/site";
import { PRICE_TIERS, formatUsd, tierRange } from "@/lib/pricing";

export interface FaqItem {
  question: string;
  answer: string;
}

const BASE_FAQ: FaqItem[] = [
  {
    question: "¿La traducción tiene que estar notarizada?",
    answer:
      "No. USCIS pide una traducción completa al inglés con la certificación del traductor, en la que declara que es competente para traducir y que la traducción es completa y exacta. No exige notario.",
  },
  {
    question: "¿Qué recibo exactamente?",
    answer:
      "Un PDF con la traducción al inglés del documento completo, incluidos sellos, firmas y notas al margen, más la certificación firmada por el traductor con su nombre, firma y fecha. Lo presentas junto a una copia del documento original.",
  },
  {
    question: "¿Cómo envío mis documentos?",
    answer:
      "Por WhatsApp, como foto o PDF. Basta con que se lea todo el documento: con buena luz, sin cortes y sin reflejos sobre los sellos.",
  },
  {
    question: "¿Cuánto se demora?",
    answer: SITE.turnaround
      ? `El plazo habitual es de ${SITE.turnaround}. Si lo necesitas antes, indica la fecha al hacer tu pedido.`
      : "Te confirmamos el plazo exacto al cotizar, según el tipo de documento y la cantidad de páginas. Si tienes una fecha límite, indícala en el formulario.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer: PRICE_TIERS.length
      ? `Precios en dólares. ${PRICE_TIERS.map((t) => `${tierRange(t)}: ${formatUsd(t.perPage)} por página`).join(". ")}. La tarifa depende del total de páginas del pedido y se aplica a todas. Cada cara con texto cuenta como una página.`
      : "Depende del documento y del número de páginas. La cotización no tiene costo y te llega antes de que empecemos a traducir.",
  },
  {
    question: "¿Son parte de USCIS?",
    answer:
      "No. Somos un servicio privado de traducción. No estamos afiliados a USCIS ni al gobierno de Estados Unidos, y no damos asesoría legal migratoria.",
  },
];

const PAYMENT_FAQ: FaqItem = {
  question: "¿Cómo pago?",
  answer:
    "Con tarjeta de crédito o débito, Apple Pay o Google Pay, en la página de pago de Stripe, al hacer tu pedido en esta web. El cobro se calcula con el número de páginas que indicas. Todas las compras son finales y no tienen reembolso.",
};

const ONLINE_UPLOAD_ANSWER =
  "Después de pagar, los subes en la misma página: fotos o PDF, desde el celular o el computador. Basta con que se lea todo el documento: con buena luz, sin cortes y sin reflejos sobre los sellos.";

export function getFaq({ payments, online }: { payments: boolean; online: boolean }): FaqItem[] {
  const items = BASE_FAQ.map((item) =>
    online && item.question === "¿Cómo envío mis documentos?" ? { ...item, answer: ONLINE_UPLOAD_ANSWER } : item,
  );
  // Payment sits just before the closing "not affiliated with USCIS" answer.
  return payments ? [...items.slice(0, -1), PAYMENT_FAQ, ...items.slice(-1)] : items;
}
