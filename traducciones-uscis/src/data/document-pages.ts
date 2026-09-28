// One landing page per document people search for by name. Each carries
// what is specific to that document — when it's requested, what the
// translation must cover, how long it usually is — so no two pages are the
// same text with a different noun. Keep claims to what USCIS publishes;
// "suele" where it varies by country.

export interface DocumentPage {
  slug: string;
  /** Must match an option in the order form so the link can preselect it. */
  documentType: string;
  /** Lowercase noun phrase used inside sentences. */
  name: string;
  title: string;
  metaDescription: string;
  intro: string;
  whenNeeded: string[];
  whatWeTranslate: string[];
  typicalPages: { text: string; example: number };
  tips: string[];
  faq: { question: string; answer: string }[];
}

export const DOCUMENT_PAGES: DocumentPage[] = [
  {
    slug: "acta-de-nacimiento",
    documentType: "Acta o certificado de nacimiento",
    name: "acta de nacimiento",
    title: "Traducción certificada de acta de nacimiento para USCIS",
    metaDescription:
      "Traducción certificada al inglés de tu acta o certificado de nacimiento para USCIS: completa, con sellos y notas marginales, lista en 24 a 48 horas.",
    intro:
      "El acta de nacimiento es el documento que más se traduce para trámites de inmigración. Te entregamos la traducción completa al inglés con la certificación del traductor que exige USCIS.",
    whenNeeded: [
      "Para ajustar tu estatus a residente permanente (formulario I-485), que pide tu acta de nacimiento.",
      "Para pedir a un familiar (formulario I-130), cuando el parentesco se prueba con actas de nacimiento: padres e hijos, o hermanos.",
      "En otros trámites donde USCIS pide probar tu identidad, tu edad o tu filiación.",
    ],
    whatWeTranslate: [
      "Todo el texto del acta, incluidos los datos de los padres y de los abuelos si aparecen.",
      "Sellos, firmas, timbres y números de folio o de libro.",
      "Notas o anotaciones marginales, como reconocimientos o rectificaciones. USCIS pide la traducción completa, no un resumen.",
    ],
    typicalPages: {
      text: "La mayoría de las actas tienen una página. Si el reverso trae sellos, apostilla o anotaciones, cuenta como una página más.",
      example: 1,
    },
    tips: [
      "Usa el acta completa (también llamada de formato largo o íntegra), la que muestra los nombres de los padres.",
      "Fotografía también el reverso si tiene algo escrito o sellado.",
      "Revisa que se lean bien los números y las fechas: son lo primero que compara USCIS.",
    ],
    faq: [
      {
        question: "¿Sirve un acta de nacimiento reciente o una antigua?",
        answer:
          "Traducimos la que nos envíes. Qué versión aceptar lo define USCIS según tu trámite; si tienes dudas sobre qué documento presentar, consúltalo con quien te asesora en tu caso.",
      },
      {
        question: "Mi nombre aparece escrito distinto en otros documentos. ¿Lo corrigen?",
        answer:
          "Traducimos fielmente lo que dice el acta, aunque tenga un error. Podemos agregar una nota del traductor que señale la diferencia, pero no cambiamos el contenido del original.",
      },
    ],
  },
  {
    slug: "acta-de-matrimonio",
    documentType: "Acta de matrimonio",
    name: "acta de matrimonio",
    title: "Traducción certificada de acta de matrimonio para USCIS",
    metaDescription:
      "Traducción certificada al inglés de tu acta de matrimonio para peticiones familiares, residencia y ciudadanía ante USCIS. Completa, firmada y en 24 a 48 horas.",
    intro:
      "Si tu trámite depende de tu matrimonio, USCIS necesita el acta traducida completa al inglés. La traducimos con todos sus datos y la certificación del traductor.",
    whenNeeded: [
      "Para pedir a tu esposo o esposa (formulario I-130), donde el acta prueba que el matrimonio existe.",
      "Para ajustar tu estatus (I-485) cuando tu residencia se basa en el matrimonio.",
      "En la ciudadanía (N-400) si la solicitas por estar casado con un ciudadano estadounidense.",
    ],
    whatWeTranslate: [
      "Los datos de ambos contrayentes, de los testigos y de los padres cuando el acta los incluye.",
      "El régimen matrimonial y cualquier anotación posterior.",
      "Sellos, firmas, número de acta y datos de la oficina del registro civil.",
    ],
    typicalPages: {
      text: "Suele tener una o dos páginas. Algunas oficinas emiten el acta con anexos o reverso con anotaciones; cada cara con texto cuenta.",
      example: 2,
    },
    tips: [
      "Envía el acta completa, no un extracto, si tu registro civil emite ambas.",
      "Si hubo un divorcio anterior de alguno de los dos, probablemente también necesites traducir esa sentencia.",
      "Fotografía cada página por separado y de frente, sin sombras sobre los sellos.",
    ],
    faq: [
      {
        question: "¿También traducen el acta de matrimonio religioso?",
        answer:
          "Sí, traducimos cualquier documento en español. Si USCIS acepta un acta religiosa para tu caso es algo que depende de tu trámite y de lo que pida la agencia.",
      },
      {
        question: "El acta está a nombre de soltera de mi esposa. ¿Hay problema?",
        answer:
          "Traducimos los nombres tal como aparecen en el acta. La relación entre el nombre de soltera y el actual se explica con los propios documentos, no cambiando la traducción.",
      },
    ],
  },
  {
    slug: "sentencia-de-divorcio",
    documentType: "Sentencia o acta de divorcio",
    name: "sentencia de divorcio",
    title: "Traducción certificada de sentencia de divorcio para USCIS",
    metaDescription:
      "Traducción certificada al inglés de sentencias y actas de divorcio para probar ante USCIS que un matrimonio anterior terminó. Completa y en 24 a 48 horas.",
    intro:
      "Cuando alguno de los dos estuvo casado antes, USCIS pide probar que ese matrimonio terminó. Traducimos la sentencia o el acta de divorcio completa, con la certificación del traductor.",
    whenNeeded: [
      "En una petición por matrimonio (I-130), para probar que los matrimonios anteriores de cualquiera de los dos terminaron.",
      "En la residencia (I-485) y en la ciudadanía (N-400), cuando hay matrimonios anteriores.",
      "En otros trámites donde tu estado civil sea parte de la solicitud.",
    ],
    whatWeTranslate: [
      "La sentencia completa: considerandos, resolutivos y la declaración de que quedó firme o ejecutoriada.",
      "Acuerdos sobre bienes, pensión o custodia si forman parte del documento.",
      "Sellos del juzgado, firmas, números de expediente y la inscripción en el registro civil.",
    ],
    typicalPages: {
      text: "Varía mucho: un acta de divorcio del registro civil suele tener una página, pero una sentencia judicial puede tener de 2 a más de 10.",
      example: 4,
    },
    tips: [
      "Cuenta todas las páginas antes de pagar: en las sentencias es fácil olvidar anexos o el auto que la declara firme.",
      "Si tienes tanto la sentencia como el acta de divorcio, pregunta en tu trámite cuál necesitas; así no pagas páginas de más.",
      "Envía las páginas en orden y completas, incluidas las que solo tienen sellos.",
    ],
    faq: [
      {
        question: "Mi sentencia tiene muchas páginas. ¿Tengo que traducirla toda?",
        answer:
          "USCIS pide traducciones completas de los documentos que presentas, así que no traducimos extractos. Si solo necesitas probar que el divorcio ocurrió, confirma en tu caso si basta el acta de divorcio, que suele ser más corta.",
      },
      {
        question: "Tengo más páginas de las que pagué. ¿Qué hago?",
        answer:
          "Solo puedes subir las páginas pagadas. Paga las adicionales en un pedido nuevo y súbelas ahí; el precio por página baja desde 5 páginas.",
      },
    ],
  },
  {
    slug: "acta-de-defuncion",
    documentType: "Certificado de defunción",
    name: "acta de defunción",
    title: "Traducción certificada de acta de defunción para USCIS",
    metaDescription:
      "Traducción certificada al inglés de actas y certificados de defunción para trámites ante USCIS, como probar que un matrimonio anterior terminó. En 24 a 48 horas.",
    intro:
      "Un acta de defunción puede ser clave en tu trámite, por ejemplo para probar que un matrimonio anterior terminó. La traducimos completa al inglés, con la certificación del traductor.",
    whenNeeded: [
      "Para probar que un matrimonio anterior terminó por fallecimiento del cónyuge, en peticiones familiares, residencia o ciudadanía.",
      "En solicitudes de viudos o viudas de ciudadanos estadounidenses.",
      "En otros trámites donde el fallecimiento de un familiar sea parte de la evidencia.",
    ],
    whatWeTranslate: [
      "Los datos de la persona fallecida, la fecha, el lugar y la causa de defunción si aparece.",
      "Los datos del declarante, del médico certificante y de la inscripción en el registro civil.",
      "Sellos, firmas y anotaciones marginales.",
    ],
    typicalPages: {
      text: "La mayoría tiene una página; algunas incluyen un certificado médico adjunto que cuenta aparte.",
      example: 1,
    },
    tips: [
      "Si el acta viene con un certificado médico adjunto, inclúyelo solo si forma parte del documento que vas a presentar.",
      "Fotografía cada página de frente y completa, incluidos los bordes con sellos.",
    ],
    faq: [
      {
        question: "El acta tiene términos médicos. ¿Los traducen?",
        answer: "Sí. Traducimos todo el contenido, incluida la terminología médica, tal como aparece en el documento.",
      },
    ],
  },
  {
    slug: "antecedentes-penales",
    documentType: "Certificado de antecedentes penales",
    name: "certificado de antecedentes penales",
    title: "Traducción certificada de antecedentes penales para USCIS",
    metaDescription:
      "Traducción certificada al inglés de certificados de antecedentes penales y documentos judiciales para trámites migratorios. Completa, firmada y en 24 a 48 horas.",
    intro:
      "Los certificados de antecedentes y los documentos de tribunales se presentan en varios trámites migratorios. Si están en español, deben ir con una traducción completa y certificada al inglés.",
    whenNeeded: [
      "Cuando USCIS pide registros de policía o de tribunales sobre un arresto o un proceso judicial en otro país.",
      "En procesos de visa de inmigrante por consulado, donde el Centro Nacional de Visas (NVC) pide certificados de antecedentes de los países en que viviste.",
      "Cuando otra autoridad de inmigración te pide acreditar que no tienes antecedentes.",
    ],
    whatWeTranslate: [
      "El certificado completo, incluido el resultado, los datos de identificación y la vigencia.",
      "Códigos de verificación, folios y cualquier texto legal del documento.",
      "Sellos, firmas electrónicas o manuscritas y la apostilla si la tiene.",
    ],
    typicalPages: {
      text: "Un certificado de antecedentes suele tener una página; los documentos de tribunales pueden tener varias.",
      example: 1,
    },
    tips: [
      "Muchos certificados se emiten en línea con un código de verificación: asegúrate de que se lea completo en la foto o envía el PDF.",
      "Revisa la vigencia del certificado antes de traducirlo: algunas autoridades piden que sea reciente.",
    ],
    faq: [
      {
        question: "¿Pueden traducir un certificado que descargué en PDF?",
        answer: "Sí, y es lo mejor: sube el PDF tal como lo descargaste y lo traducimos completo, incluido el código de verificación.",
      },
    ],
  },
  {
    slug: "titulos-y-diplomas",
    documentType: "Títulos y diplomas",
    name: "título o diploma",
    title: "Traducción certificada de títulos y diplomas para USCIS",
    metaDescription:
      "Traducción certificada al inglés de títulos, diplomas y certificados de notas para peticiones de empleo y otros trámites ante USCIS. Lista en 24 a 48 horas.",
    intro:
      "Si tu trámite se basa en tus estudios o en tu profesión, tus títulos y certificados de notas deben ir traducidos completos al inglés, con la certificación del traductor.",
    whenNeeded: [
      "En peticiones basadas en empleo, donde tus títulos prueban la formación que exige el puesto.",
      "Cuando una agencia de evaluación de credenciales pide la traducción de tus estudios.",
      "En otros trámites donde tu formación académica sea parte de la evidencia.",
    ],
    whatWeTranslate: [
      "El título o diploma completo: nombre de la institución, grado, carrera, fechas y registros.",
      "Certificados de notas con todas las materias, calificaciones y escalas.",
      "Sellos, firmas, legalizaciones y apostillas.",
    ],
    typicalPages: {
      text: "Un diploma suele tener una página (dos si el reverso tiene registros o sellos). Los certificados de notas pueden tener varias.",
      example: 3,
    },
    tips: [
      "Traduce juntos el título y el certificado de notas si ambos van al mismo trámite: desde 5 páginas el precio por página baja.",
      "Si el título es grande, fotografíalo de frente y completo; no lo cortes para que quepa en la foto.",
    ],
    faq: [
      {
        question: "¿Traducen los nombres de las materias?",
        answer:
          "Sí. Traducimos el nombre de cada materia y dejamos las calificaciones tal como aparecen, con la escala del documento.",
      },
    ],
  },
];

export function findDocumentPage(slug: string): DocumentPage | undefined {
  return DOCUMENT_PAGES.find((page) => page.slug === slug);
}

export function documentPageFor(documentType: string): DocumentPage | undefined {
  return DOCUMENT_PAGES.find((page) => page.documentType === documentType);
}
