export interface DocumentGroup {
  title: string;
  items: string[];
}

export const DOCUMENT_GROUPS: DocumentGroup[] = [
  {
    title: "Registro civil",
    items: [
      "Acta o certificado de nacimiento",
      "Acta de matrimonio",
      "Sentencia o acta de divorcio",
      "Certificado de defunción",
      "Libreta de familia",
    ],
  },
  {
    title: "Antecedentes y trámites legales",
    items: [
      "Certificado de antecedentes penales",
      "Sentencias y resoluciones judiciales",
      "Poderes notariales",
      "Cambio de nombre",
    ],
  },
  {
    title: "Estudios y trabajo",
    items: [
      "Títulos y diplomas",
      "Certificados de notas",
      "Cartas de empleo",
      "Certificados de cotizaciones",
    ],
  },
  {
    title: "Identidad y otros",
    items: [
      "Cédula de identidad",
      "Licencia de conducir",
      "Registros de vacunación",
      "Certificados médicos",
    ],
  },
];
