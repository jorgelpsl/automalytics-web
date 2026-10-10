// English text of the document pages, keyed by the Spanish slug that identifies
// each page. Same claims as the Spanish pages; "usually" where it varies.

import { type DocumentCopy } from "@/data/document-pages";

export const DOCUMENT_COPY_EN: Record<string, Omit<DocumentCopy, "slug">> = {
  "acta-de-nacimiento": {
    name: "birth certificate",
    title: "Certified Birth Certificate Translation for USCIS",
    metaTitle: "Birth Certificate Translation for USCIS | Certa",
    metaDescription:
      "Certified English translation of your birth certificate for USCIS: complete, with seals and marginal notes, ready in 24 to 48 hours.",
    intro:
      "The birth certificate is the document most often translated for immigration cases. We deliver the complete English translation with the translator's certification that USCIS requires.",
    whenNeeded: [
      "To adjust your status to permanent resident (Form I-485), which asks for your birth certificate.",
      "To petition for a relative (Form I-130), when the relationship is proven with birth certificates: parents and children, or siblings.",
      "In other cases where USCIS asks you to prove your identity, your age or your parentage.",
    ],
    whatWeTranslate: [
      "All the text on the certificate, including the parents' and grandparents' details when they appear.",
      "Seals, signatures, stamps, and folio or book numbers.",
      "Marginal notes or annotations, such as acknowledgments or corrections. USCIS requires the full translation, not a summary.",
    ],
    typicalPages:
      "Most birth certificates are one page. If the back has seals, an apostille or annotations, it counts as one more page.",
    tips: [
      "Use the full certificate (also called long form or unabridged), the one that shows the parents' names.",
      "Photograph the back too if anything is written or stamped on it.",
      "Check that numbers and dates are easy to read: they are the first thing USCIS compares.",
    ],
    faq: [
      {
        question: "Does a recent birth certificate work, or an old one?",
        answer:
          "We translate the one you send us. Which version to submit is up to USCIS, depending on your case; if you're unsure which document to submit, ask whoever is advising you on your case.",
      },
      {
        question: "My name is spelled differently on other documents. Will you fix it?",
        answer:
          "We translate exactly what the certificate says, even if it contains an error. We can add a translator's note pointing out the difference, but we don't change the content of the original.",
      },
    ],
  },
  "acta-de-matrimonio": {
    name: "marriage certificate",
    title: "Certified Marriage Certificate Translation for USCIS",
    metaTitle: "Marriage Certificate Translation for USCIS | Certa",
    metaDescription:
      "Certified English translation of your marriage certificate for family petitions, residency and citizenship with USCIS. Ready in 24 to 48 hours.",
    intro:
      "If your case depends on your marriage, USCIS needs the certificate translated in full into English. We translate it with all its details and the translator's certification.",
    whenNeeded: [
      "To petition for your husband or wife (Form I-130), where the certificate proves the marriage exists.",
      "To adjust your status (I-485) when your residency is based on marriage.",
      "In citizenship (N-400) if you apply as the spouse of a U.S. citizen.",
    ],
    whatWeTranslate: [
      "The details of both spouses, the witnesses and the parents when the certificate includes them.",
      "The marital property regime and any later annotation.",
      "Seals, signatures, certificate number and the civil registry office's details.",
    ],
    typicalPages:
      "It usually has one or two pages. Some offices issue the certificate with attachments or a back with annotations; every side with text counts.",
    tips: [
      "Send the full certificate, not an extract, if your civil registry issues both.",
      "If either of you was previously divorced, you will probably also need to translate that decree.",
      "Photograph each page separately and head-on, with no shadows over the seals.",
    ],
    faq: [
      {
        question: "Do you also translate religious marriage certificates?",
        answer:
          "Yes, we translate any document in Spanish. Whether USCIS accepts a religious certificate for your case depends on your application and on what the agency asks for.",
      },
      {
        question: "The certificate lists my wife under her maiden name. Is that a problem?",
        answer:
          "We translate names as they appear on the certificate. The link between a maiden name and the current one is shown by the documents themselves, not by changing the translation.",
      },
    ],
  },
  "sentencia-de-divorcio": {
    name: "divorce decree",
    title: "Certified Divorce Decree Translation for USCIS",
    metaTitle: "Divorce Decree Translation for USCIS | Certa",
    metaDescription:
      "Certified English translation of divorce decrees and certificates to prove to USCIS that a prior marriage ended. Complete, in 24 to 48 hours.",
    intro:
      "When either of you was married before, USCIS asks for proof that the marriage ended. We translate the complete divorce decree or certificate, with the translator's certification.",
    whenNeeded: [
      "In a marriage-based petition (I-130), to prove that either spouse's prior marriages ended.",
      "In residency (I-485) and citizenship (N-400), when there are prior marriages.",
      "In other cases where your marital status is part of the application.",
    ],
    whatWeTranslate: [
      "The complete decree: the findings, the ruling and the statement that it became final.",
      "Agreements on property, support or custody if they are part of the document.",
      "Court seals, signatures, case numbers and the civil registry entry.",
    ],
    typicalPages:
      "It varies a lot: a divorce certificate from the civil registry is usually one page, but a court decree can run from 2 to more than 10.",
    tips: [
      "Count every page before paying: with decrees it's easy to forget attachments or the order declaring it final.",
      "If you have both the decree and the divorce certificate, ask in your case which one you need so you don't pay for extra pages.",
      "Send the pages in order and complete, including the ones that only have seals.",
    ],
    faq: [
      {
        question: "My decree has many pages. Do I have to translate all of it?",
        answer:
          "USCIS requires full translations of the documents you submit, so we don't translate extracts. If you only need to prove the divorce took place, check in your case whether the divorce certificate is enough, which is usually shorter.",
      },
      {
        question: "I have more pages than I paid for. What do I do?",
        answer:
          "You can only upload the pages you paid for. Pay for the extra ones in a new order and upload them there; the per-page price drops from 5 pages.",
      },
    ],
  },
  "acta-de-defuncion": {
    name: "death certificate",
    title: "Certified Death Certificate Translation for USCIS",
    metaTitle: "Death Certificate Translation for USCIS | Certa",
    metaDescription:
      "Certified English translation of death certificates for USCIS, for example to prove a marriage ended. In 24 to 48 hours.",
    intro:
      "A death certificate can be key in your case, for example to prove that a prior marriage ended. We translate it in full into English, with the translator's certification.",
    whenNeeded: [
      "To prove that a prior marriage ended because a spouse died, in family petitions, residency or citizenship.",
      "In applications by widows and widowers of U.S. citizens.",
      "In other cases where a relative's death is part of the evidence.",
    ],
    whatWeTranslate: [
      "The deceased person's details, the date, the place and the cause of death if it appears.",
      "The informant's and the certifying physician's details, and the civil registry entry.",
      "Seals, signatures and marginal annotations.",
    ],
    typicalPages: "Most are one page; some include an attached medical certificate, which counts separately.",
    tips: [
      "If the certificate comes with an attached medical certificate, include it only if it is part of the document you are going to submit.",
      "Photograph each page head-on and complete, including the edges with seals.",
    ],
    faq: [
      {
        question: "The certificate contains medical terms. Do you translate them?",
        answer:
          "Yes. We translate all the content, including medical terminology, exactly as it appears in the document.",
      },
    ],
  },
  "antecedentes-penales": {
    name: "criminal record certificate",
    title: "Certified Criminal Record Certificate Translation for USCIS",
    metaTitle: "Criminal Record Translation for USCIS | Certa",
    metaDescription:
      "Certified English translation of criminal record certificates and court documents for immigration cases. Signed, in 24 to 48 hours.",
    intro:
      "Criminal record certificates and court documents are submitted in several immigration cases. If they are in Spanish, they must come with a complete, certified English translation.",
    whenNeeded: [
      "When USCIS asks for police or court records about an arrest or court proceeding in another country.",
      "In immigrant visa processing at a consulate, where the National Visa Center (NVC) asks for police certificates from the countries where you lived.",
      "When another immigration authority asks you to show that you have no criminal record.",
    ],
    whatWeTranslate: [
      "The full certificate, including the result, the identification details and the validity.",
      "Verification codes, folio numbers and any legal text in the document.",
      "Seals, electronic or handwritten signatures and the apostille if it has one.",
    ],
    typicalPages: "A criminal record certificate usually has one page; court documents can have several.",
    tips: [
      "Many certificates are issued online with a verification code: make sure it is fully readable in the photo, or send the PDF.",
      "Check the certificate's validity before translating it: some authorities require it to be recent.",
    ],
    faq: [
      {
        question: "Can you translate a certificate I downloaded as a PDF?",
        answer:
          "Yes, and that's best: upload the PDF exactly as you downloaded it and we translate it in full, including the verification code.",
      },
    ],
  },
  "titulos-y-diplomas": {
    name: "degree or diploma",
    title: "Certified Degree and Diploma Translation for USCIS",
    metaTitle: "Diploma and Degree Translation for USCIS | Certa",
    metaDescription:
      "Certified English translation of degrees, diplomas and transcripts for employment-based petitions and other USCIS cases. In 24 to 48 hours.",
    intro:
      "If your case is based on your studies or your profession, your degrees and transcripts must be translated in full into English, with the translator's certification.",
    whenNeeded: [
      "In employment-based petitions, where your degrees prove the education the position requires.",
      "When a credential evaluation agency asks for the translation of your studies.",
      "In other cases where your academic background is part of the evidence.",
    ],
    whatWeTranslate: [
      "The full degree or diploma: institution name, degree, major, dates and registrations.",
      "Transcripts with all subjects, grades and scales.",
      "Seals, signatures, legalizations and apostilles.",
    ],
    typicalPages:
      "A diploma usually has one page (two if the back has registrations or seals). Transcripts can have several.",
    tips: [
      "Translate the degree and the transcript together if both go to the same case: from 5 pages the per-page price drops.",
      "If the degree is large, photograph it head-on and complete; don't crop it to fit the photo.",
    ],
    faq: [
      {
        question: "Do you translate the names of the subjects?",
        answer:
          "Yes. We translate the name of each subject and leave the grades as they appear, with the document's scale.",
      },
    ],
  },
};
