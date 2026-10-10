import { type Lang } from "@/i18n/config";

export interface DocumentGroup {
  title: string;
  titleEn: string;
  /** Spanish names: these are the values stored with an order and sent to checkout. */
  items: string[];
  /** The same items, in the same order, as shown on the English site. */
  itemsEn: string[];
}

export const DOCUMENT_GROUPS: DocumentGroup[] = [
  {
    title: "Registro civil",
    titleEn: "Civil registry",
    items: [
      "Acta o certificado de nacimiento",
      "Acta de matrimonio",
      "Sentencia o acta de divorcio",
      "Certificado de defunción",
      "Fe o acta de bautismo",
    ],
    itemsEn: [
      "Birth certificate",
      "Marriage certificate",
      "Divorce decree or certificate",
      "Death certificate",
      "Baptism certificate",
    ],
  },
  {
    title: "Antecedentes y trámites legales",
    titleEn: "Criminal records and legal documents",
    items: [
      "Certificado de antecedentes penales",
      "Sentencias y resoluciones judiciales",
      "Poderes notariales",
      "Cambio de nombre",
    ],
    itemsEn: [
      "Criminal record certificate",
      "Court judgments and rulings",
      "Notarized powers of attorney",
      "Name change",
    ],
  },
  {
    title: "Estudios y trabajo",
    titleEn: "Education and employment",
    items: [
      "Títulos y diplomas",
      "Certificados de notas",
      "Cartas de empleo",
      "Constancias de sueldo o ingresos",
    ],
    itemsEn: [
      "Degrees and diplomas",
      "Academic transcripts",
      "Employment letters",
      "Proof of salary or income",
    ],
  },
  {
    title: "Identidad y otros",
    titleEn: "Identity and other",
    items: [
      "Cédula o documento de identidad",
      "Licencia de conducir",
      "Registros de vacunación",
      "Certificados médicos",
    ],
    itemsEn: [
      "ID card or identity document",
      "Driver's license",
      "Vaccination records",
      "Medical certificates",
    ],
  },
];

/** What the order form offers, in the language of the page. The catch-all is last. */
export function documentOptions(lang: Lang): string[] {
  return [
    ...DOCUMENT_GROUPS.flatMap((group) => (lang === "en" ? group.itemsEn : group.items)),
    lang === "en" ? "Other" : "Otro",
  ];
}

/** The Spanish name stored with an order, for an option picked in either language. */
export function canonicalDocumentType(lang: Lang, option: string): string {
  if (lang === "es") return option;
  const english = documentOptions("en");
  const spanish = documentOptions("es");
  const index = english.indexOf(option);
  return index === -1 ? option : spanish[index];
}

/** The label to show for a stored (Spanish) document type. */
export function documentLabel(lang: Lang, spanishValue: string): string {
  if (lang === "es") return spanishValue;
  const index = documentOptions("es").indexOf(spanishValue);
  return index === -1 ? spanishValue : documentOptions("en")[index];
}
