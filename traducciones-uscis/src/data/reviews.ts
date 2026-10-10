// Customer opinions, published as the customers wrote them. Add one only with
// the customer's permission to publish it under this name, and keep the text
// word for word. Where the service was free or discounted in exchange for the
// opinion, set `disclosure` so the page says so.

export interface Review {
  name: string;
  /** Document translated, when the customer said which. */
  document?: string;
  documentEn?: string;
  text: string;
  /** English rendering of `text`, shown when the visitor switches language. */
  textEn: string;
  disclosure?: string;
  disclosureEn?: string;
}

export const REVIEWS: readonly Review[] = [
  {
    name: "Rebeca C.",
    text: "El proceso de traducción fue muy sencillo. Recibí mi documento dentro del plazo acordado y la atención fue excelente. Definitivamente volvería a utilizar el servicio.",
    textEn: "The translation process was very simple. I received my document within the agreed time and the service was excellent. I would definitely use the service again.",
  },
  {
    name: "Juan P.",
    document: "Acta de nacimiento",
    documentEn: "Birth certificate",
    text: "Solicité la traducción de mi acta de nacimiento al inglés. El proceso de pedido fue fácil y las instrucciones fueron claras.",
    textEn: "I requested the English translation of my birth certificate. The ordering process was easy and the instructions were clear.",
  },
  {
    name: "Maria D.",
    text: "Tenía algunas dudas antes de contratar la traducción y me ayudaron a entender el proceso. La comunicación fue clara y la experiencia resultó muy cómoda.",
    textEn: "I had some questions before hiring the translation and they helped me understand the process. The communication was clear and the experience was very comfortable.",
  },
  {
    name: "Daniel H.",
    text: "Necesitaba traducir documentos para mi trámite migratorio y quería un proceso claro. Me gustó poder conocer el precio y los pasos antes de realizar el pedido.",
    textEn: "I needed to translate documents for my immigration process and wanted a clear process. I liked being able to see the price and the steps before placing the order.",
  },
];
