import { SITE } from "@/data/site";
import { type Lang } from "@/i18n/config";
import { PRICE_TIERS, formatUsd, tierRange } from "@/lib/pricing";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCopy {
  eyebrow: string;
  headingPayments: string;
  headingQuote: string;
  /** Answers that depend on how the site is set up, as functions of those settings. */
  how: { question: string; whatsapp: string; online: string };
  turnaround: { question: string; known: (time: string) => string; unknown: string };
  price: { question: string; known: (tiers: string) => string; unknown: string };
  items: { notarized: FaqItem; receive: FaqItem; affiliated: FaqItem; payment: FaqItem };
  perPage: string;
}

const COPY: Record<Lang, FaqCopy> = {
  es: {
    eyebrow: "Preguntas frecuentes",
    headingPayments: "Antes de comprar.",
    headingQuote: "Antes de cotizar.",
    how: {
      question: "¿Cómo envío mis documentos?",
      whatsapp:
        "Por WhatsApp, como foto o PDF. Basta con que se lea todo el documento: con buena luz, sin cortes y sin reflejos sobre los sellos.",
      online:
        "Después de pagar, los subes en la misma página: fotos o PDF, desde el celular o el computador. Basta con que se lea todo el documento: con buena luz, sin cortes y sin reflejos sobre los sellos.",
    },
    turnaround: {
      question: "¿Cuánto se demora?",
      known: (time) => `El plazo habitual es de ${time}. Si lo necesitas antes, indica la fecha al hacer tu pedido.`,
      unknown:
        "Te confirmamos el plazo exacto al cotizar, según el tipo de documento y la cantidad de páginas. Si tienes una fecha límite, indícala en el formulario.",
    },
    price: {
      question: "¿Cuánto cuesta?",
      known: (tiers) =>
        `Precios en dólares. ${tiers}. La tarifa depende del total de páginas del pedido y se aplica a todas. Cada cara con texto cuenta como una página.`,
      unknown:
        "Depende del documento y del número de páginas. La cotización no tiene costo y te llega antes de que empecemos a traducir.",
    },
    perPage: "por página",
    items: {
      notarized: {
        question: "¿La traducción tiene que estar notarizada?",
        answer:
          "No. USCIS pide una traducción completa al inglés con la certificación del traductor, en la que declara que es competente para traducir y que la traducción es completa y exacta. No exige notario.",
      },
      receive: {
        question: "¿Qué recibo exactamente?",
        answer:
          "Un PDF con la traducción al inglés del documento completo, incluidos sellos, firmas y notas al margen, más la certificación firmada por el traductor con su nombre, firma y fecha. Lo presentas junto a una copia del documento original.",
      },
      affiliated: {
        question: "¿Son parte de USCIS?",
        answer:
          "No. Somos un servicio privado de traducción. No estamos afiliados a USCIS ni al gobierno de Estados Unidos, y no damos asesoría legal migratoria.",
      },
      payment: {
        question: "¿Cómo pago?",
        answer:
          "Con tarjeta de crédito o débito, Apple Pay o Google Pay, en la página de pago de Stripe, al hacer tu pedido en esta web. El cobro se calcula con el número de páginas que indicas. Todas las compras son finales y no tienen reembolso.",
      },
    },
  },
  en: {
    eyebrow: "Frequently asked questions",
    headingPayments: "Before you buy.",
    headingQuote: "Before you ask for a quote.",
    how: {
      question: "How do I send my documents?",
      whatsapp:
        "On WhatsApp, as a photo or PDF. As long as the whole document is readable: good light, nothing cropped and no glare over the seals.",
      online:
        "After you pay, you upload them on the same page: photos or PDF, from your phone or computer. As long as the whole document is readable: good light, nothing cropped and no glare over the seals.",
    },
    turnaround: {
      question: "How long does it take?",
      known: (time) => `The usual turnaround is ${time}. If you need it sooner, give us the date when you place your order.`,
      unknown:
        "We confirm the exact turnaround when we quote, based on the document type and the number of pages. If you have a deadline, put it in the form.",
    },
    price: {
      question: "How much does it cost?",
      known: (tiers) =>
        `Prices are in U.S. dollars. ${tiers}. The rate depends on the total pages in your order and applies to all of them. Each side with text counts as one page.`,
      unknown:
        "It depends on the document and the number of pages. The quote is free and reaches you before we start translating.",
    },
    perPage: "per page",
    items: {
      notarized: {
        question: "Does the translation need to be notarized?",
        answer:
          "No. USCIS requires a complete English translation with the translator's certification, in which they state that they are competent to translate and that the translation is complete and accurate. It does not require a notary.",
      },
      receive: {
        question: "What exactly do I receive?",
        answer:
          "A PDF with the English translation of the entire document, including seals, signatures and marginal notes, plus the certification signed by the translator with their name, signature and date. You submit it together with a copy of the original document.",
      },
      affiliated: {
        question: "Are you part of USCIS?",
        answer:
          "No. We are a private translation service. We are not affiliated with USCIS or the U.S. government, and we do not give immigration legal advice.",
      },
      payment: {
        question: "How do I pay?",
        answer:
          "By credit or debit card, Apple Pay or Google Pay, on Stripe's payment page, when you place your order on this website. The charge is calculated from the number of pages you indicate. All purchases are final and non-refundable.",
      },
    },
  },
};

export function faqHeading(lang: Lang, payments: boolean): { eyebrow: string; heading: string } {
  const copy = COPY[lang];
  return { eyebrow: copy.eyebrow, heading: payments ? copy.headingPayments : copy.headingQuote };
}

export function getFaq({ lang = "es", payments, online }: { lang?: Lang; payments: boolean; online: boolean }): FaqItem[] {
  const copy = COPY[lang];
  const turnaround = lang === "en" ? SITE.turnaroundEn : SITE.turnaround;
  const items: FaqItem[] = [
    copy.items.notarized,
    copy.items.receive,
    { question: copy.how.question, answer: online ? copy.how.online : copy.how.whatsapp },
    {
      question: copy.turnaround.question,
      answer: turnaround ? copy.turnaround.known(turnaround) : copy.turnaround.unknown,
    },
    {
      question: copy.price.question,
      answer: PRICE_TIERS.length
        ? copy.price.known(PRICE_TIERS.map((t) => `${tierRange(t, lang)}: ${formatUsd(t.perPage)} ${copy.perPage}`).join(". "))
        : copy.price.unknown,
    },
  ];
  // Payment sits just before the closing "not affiliated with USCIS" answer.
  return payments ? [...items, copy.items.payment, copy.items.affiliated] : [...items, copy.items.affiliated];
}
