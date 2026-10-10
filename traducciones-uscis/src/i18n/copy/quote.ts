import { type Lang } from "@/i18n/config";

// Copy of the order form (a client component, so it imports this directly).

export interface QuoteCopy {
  included: { complete: string; certified: string; pdfIn: (time: string) => string; pdfPlain: string };
  errors: {
    name: string;
    documentType: string;
    pages: (max: number) => string;
    deadlinePast: string;
  };
  payError: string;
  eyebrowPay: string;
  eyebrowQuote: string;
  title: string;
  introUpload: string;
  introPay: string;
  introQuote: string;
  priceTotal: string;
  priceEstimate: string;
  price: string;
  priceFree: string;
  priceLine: (pages: number, perPage: string) => string;
  priceUnconfirmed: string;
  perPage: string;
  success: { title: string; body: string; notOpened: string; link: string; another: string };
  labels: {
    name: string;
    namePlaceholder: string;
    document: string;
    documentPlaceholder: string;
    pages: string;
    pagesHint: string;
    deadline: string;
    comments: string;
    commentsPlaceholder: string;
    optional: string;
  };
  buttons: {
    payNow: (amount: string) => string;
    payNowPlain: string;
    opening: string;
    ask: string;
    sendWhatsApp: string;
    free: string;
  };
  note: {
    secure: string;
    afterUpload: string;
    afterWhatsApp: string;
    correction: string;
    accept: string;
    terms: string;
    and: string;
    refunds: string;
  };
}

export const QUOTE: Record<Lang, QuoteCopy> = {
  es: {
    included: {
      complete: "Traducción completa al inglés, sellos y firmas incluidos",
      certified: "Certificación del traductor firmada y fechada",
      pdfIn: (time) => `PDF listo en ${time}`,
      pdfPlain: "Entrega en PDF, lista para subir o imprimir",
    },
    errors: {
      name: "Escribe tu nombre para saber a quién responder.",
      documentType: "Elige el tipo de documento. Si no está en la lista, elige “Otro”.",
      pages: (max) => `Indica cuántas páginas tiene, entre 1 y ${max}.`,
      deadlinePast: "Esa fecha ya pasó. Elige hoy o una fecha futura.",
    },
    payError:
      "No pudimos abrir la página de pago. Intenta de nuevo en un momento o envíanos tu solicitud por WhatsApp.",
    eyebrowPay: "Tu pedido",
    eyebrowQuote: "Cotización",
    title: "Cuéntanos qué necesitas traducir.",
    introUpload: "Eliges el documento y las páginas, pagas en línea y, en la misma página, subes las fotos.",
    introPay: "Eliges el documento y las páginas, pagas en línea y nos mandas las fotos por WhatsApp.",
    introQuote: "Completas esto, se abre WhatsApp con tu solicitud escrita y ahí nos mandas las fotos del documento.",
    priceTotal: "Total a pagar",
    priceEstimate: "Precio estimado",
    price: "Precio",
    priceFree: "Cotización sin costo",
    priceLine: (pages, perPage) => `${pages} ${pages === 1 ? "página" : "páginas"} × ${perPage}.`,
    priceUnconfirmed: "Te confirmamos precio y plazo antes de empezar.",
    perPage: "página",
    success: {
      title: "Tu solicitud está lista en WhatsApp.",
      body: "Envía el mensaje y, en el mismo chat, las fotos de cada página del documento. Te respondemos con el precio y el plazo.",
      notOpened: "¿No se abrió WhatsApp?",
      link: "Ábrelo con este enlace",
      another: "Cotizar otro documento",
    },
    labels: {
      name: "Tu nombre",
      namePlaceholder: "Ej: Camila Rojas",
      document: "Tipo de documento",
      documentPlaceholder: "Elige un documento",
      pages: "Número de páginas",
      pagesHint: "Cada cara con texto cuenta como una página.",
      deadline: "¿Para cuándo lo necesitas?",
      comments: "Comentarios",
      commentsPlaceholder: "Ej: son dos actas de nacimiento, para una petición familiar.",
      optional: "(opcional)",
    },
    buttons: {
      payNow: (amount) => `Pagar ${amount} ahora`,
      payNowPlain: "Pagar ahora",
      opening: "Abriendo el pago…",
      ask: "Consultar por WhatsApp",
      sendWhatsApp: "Enviar por WhatsApp",
      free: "Sin costo y sin compromiso.",
    },
    note: {
      secure: "Pago seguro con Stripe: tarjeta, Apple Pay o Google Pay. Cobramos según las páginas que indicas y, después del pago,",
      afterUpload: "subes tu documento aquí mismo.",
      afterWhatsApp: "nos envías las fotos por WhatsApp.",
      correction: "Si la traducción tiene un error, la corregimos gratis.",
      accept: "Al pagar aceptas los",
      terms: "Términos del servicio",
      and: "y la",
      refunds: "Política de reembolsos",
    },
  },
  en: {
    included: {
      complete: "Complete English translation, seals and signatures included",
      certified: "Translator's certification, signed and dated",
      pdfIn: (time) => `PDF ready in ${time}`,
      pdfPlain: "PDF delivery, ready to upload or print",
    },
    errors: {
      name: "Enter your name so we know who to reply to.",
      documentType: "Choose the document type. If it's not on the list, choose “Other”.",
      pages: (max) => `Enter how many pages it has, between 1 and ${max}.`,
      deadlinePast: "That date has already passed. Choose today or a future date.",
    },
    payError:
      "We couldn't open the payment page. Try again in a moment, or send us your request on WhatsApp.",
    eyebrowPay: "Your order",
    eyebrowQuote: "Quote",
    title: "Tell us what you need translated.",
    introUpload: "You choose the document and pages, pay online and, on the same page, upload the photos.",
    introPay: "You choose the document and pages, pay online and send us the photos on WhatsApp.",
    introQuote: "You fill this in, WhatsApp opens with your request written out, and you send us the photos of the document there.",
    priceTotal: "Total to pay",
    priceEstimate: "Estimated price",
    price: "Price",
    priceFree: "Free quote",
    priceLine: (pages, perPage) => `${pages} ${pages === 1 ? "page" : "pages"} × ${perPage}.`,
    priceUnconfirmed: "We confirm the price and turnaround before we start.",
    perPage: "page",
    success: {
      title: "Your request is ready on WhatsApp.",
      body: "Send the message and, in the same chat, the photos of each page of the document. We'll reply with the price and turnaround.",
      notOpened: "Didn't WhatsApp open?",
      link: "Open it with this link",
      another: "Quote another document",
    },
    labels: {
      name: "Your name",
      namePlaceholder: "E.g.: Camila Rojas",
      document: "Document type",
      documentPlaceholder: "Choose a document",
      pages: "Number of pages",
      pagesHint: "Each side with text counts as one page.",
      deadline: "When do you need it?",
      comments: "Comments",
      commentsPlaceholder: "E.g.: two birth certificates, for a family petition.",
      optional: "(optional)",
    },
    buttons: {
      payNow: (amount) => `Pay ${amount} now`,
      payNowPlain: "Pay now",
      opening: "Opening payment…",
      ask: "Ask on WhatsApp",
      sendWhatsApp: "Send on WhatsApp",
      free: "Free and no obligation.",
    },
    note: {
      secure: "Secure payment with Stripe: card, Apple Pay or Google Pay. We charge according to the pages you indicate and, after payment,",
      afterUpload: "you upload your document right here.",
      afterWhatsApp: "you send us the photos on WhatsApp.",
      correction: "If the translation has an error, we correct it for free.",
      accept: "By paying you accept the",
      terms: "Terms of service",
      and: "and the",
      refunds: "Refund policy",
    },
  },
};
