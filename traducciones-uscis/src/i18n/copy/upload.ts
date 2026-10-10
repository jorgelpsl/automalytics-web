import { type Lang } from "@/i18n/config";

// Copy of the post-payment upload widget (a client component).

export interface UploadCopy {
  pages: (n: number) => string;
  window: (minutes: number) => string;
  uploadFailed: string;
  unsupported: (name: string) => string;
  tooBig: (name: string, mb: number) => string;
  alreadyFull: (name: string, paidPages: string) => string;
  tooManyPages: (name: string, pages: string, room: number) => string;
  notUploaded: (count: number, list: string) => string;
  locked: (name: string) => string;
  removeFailed: (name: string) => string;
  copyPrompt: string;
  title: string;
  progress: (done: number, paidPages: string) => string;
  instructions: (paidPages: string) => string;
  fullNotice: (paidPages: string, window: string) => string;
  addMissing: (left: number) => string;
  choose: string;
  formats: (mb: number) => string;
  morePages: string;
  payExtra: string;
  uploadThere: string;
  uploading: (percent: number) => string;
  received: string;
  remove: (name: string) => string;
  uploadingAria: string;
  removingAria: string;
  retry: string;
  discard: string;
  removeHint: (window: string) => string;
  writeUs: string;
  completeStatus: (paidPages: string, turnaround: string | null) => string;
  partialStatus: (done: number, paidPages: string, left: number) => string;
  later: string;
  copyLink: string;
  linkCopied: string;
  trouble: string;
  sendWhatsApp: string;
}

export const UPLOAD: Record<Lang, UploadCopy> = {
  es: {
    pages: (n) => `${n} ${n === 1 ? "página" : "páginas"}`,
    window: (m) => (m % 60 === 0 ? `${m / 60} ${m === 60 ? "hora" : "horas"}` : `${m} minutos`),
    uploadFailed: "No se pudo subir. Revisa tu conexión y vuelve a intentarlo.",
    unsupported: (name) => `${name}: formato no admitido`,
    tooBig: (name, mb) => `${name}: pesa más de ${mb} MB`,
    alreadyFull: (name, paid) => `${name}: ya completaste las ${paid} que pagaste`,
    tooManyPages: (name, pages, room) => `${name}: tiene ${pages} y te ${room === 1 ? "queda 1" : `quedan ${room}`}`,
    notUploaded: (count, list) => `No subimos ${count === 1 ? "este archivo" : "estos archivos"}: ${list}.`,
    locked: (name) => `${name} ya no se puede quitar desde aquí. Para cambiarlo, escríbenos por WhatsApp.`,
    removeFailed: (name) => `No pudimos quitar ${name}. Intenta de nuevo en un momento.`,
    copyPrompt: "Copia este enlace:",
    title: "Sube tu documento",
    progress: (done, paid) => `${done} de ${paid}`,
    instructions: (paid) =>
      `Una foto por cada página, con buena luz y sin cortar los bordes, o el PDF si lo tienes escaneado. Puedes subir hasta las ${paid} que pagaste.`,
    fullNotice: (paid, window) =>
      `Ya elegiste las ${paid} que pagaste. Si subiste algo por error, quítalo para liberar esa página (tienes ${window} desde que lo subiste).`,
    addMissing: (left) => `Agregar ${left === 1 ? "la página que falta" : `las ${left} páginas que faltan`}`,
    choose: "Elegir fotos o PDF",
    formats: (mb) => `JPG, PNG, HEIC o PDF · hasta ${mb} MB cada uno`,
    morePages: "¿Tu documento tiene más páginas?",
    payExtra: "Paga las páginas extra",
    uploadThere: "y súbelas en ese pedido.",
    uploading: (p) => `Subiendo… ${p}%`,
    received: "Recibido",
    remove: (name) => `Quitar ${name}`,
    uploadingAria: "Subiendo",
    removingAria: "Quitando",
    retry: "Reintentar",
    discard: "Descartar",
    removeHint: (window) => `Puedes quitar un archivo durante ${window} después de subirlo. Si necesitas cambiarlo más tarde,`,
    writeUs: "escríbenos por WhatsApp",
    completeStatus: (paid, turnaround) =>
      `Recibimos las ${paid}. Empezamos a traducir${
        turnaround ? ` y te enviamos el PDF en ${turnaround}` : ""
      }, al correo o WhatsApp que dejaste al pagar. Ya puedes cerrar esta página.`,
    partialStatus: (done, paid, left) =>
      `Recibimos ${done} de ${paid}. Sube ${left === 1 ? "la que falta" : `las ${left} que faltan`} para que empecemos a traducir.`,
    later: "¿Lo subes más tarde? Guarda el enlace de esta página: aquí mismo puedes agregar archivos cuando quieras.",
    copyLink: "Copiar enlace",
    linkCopied: "Enlace copiado",
    trouble: "¿Problemas para subirlos?",
    sendWhatsApp: "Envíalos por WhatsApp",
  },
  en: {
    pages: (n) => `${n} ${n === 1 ? "page" : "pages"}`,
    window: (m) => (m % 60 === 0 ? `${m / 60} ${m === 60 ? "hour" : "hours"}` : `${m} minutes`),
    uploadFailed: "Couldn't upload. Check your connection and try again.",
    unsupported: (name) => `${name}: unsupported format`,
    tooBig: (name, mb) => `${name}: larger than ${mb} MB`,
    alreadyFull: (name, paid) => `${name}: you've already filled the ${paid} you paid for`,
    tooManyPages: (name, pages, room) => `${name}: has ${pages} and you have ${room === 1 ? "1 left" : `${room} left`}`,
    notUploaded: (count, list) => `We didn't upload ${count === 1 ? "this file" : "these files"}: ${list}.`,
    locked: (name) => `${name} can no longer be removed from here. To change it, message us on WhatsApp.`,
    removeFailed: (name) => `We couldn't remove ${name}. Try again in a moment.`,
    copyPrompt: "Copy this link:",
    title: "Upload your document",
    progress: (done, paid) => `${done} of ${paid}`,
    instructions: (paid) =>
      `One photo per page, in good light and without cropping the edges, or the PDF if you have it scanned. You can upload up to the ${paid} you paid for.`,
    fullNotice: (paid, window) =>
      `You've already chosen the ${paid} you paid for. If you uploaded something by mistake, remove it to free up that page (you have ${window} from when you uploaded it).`,
    addMissing: (left) => `Add ${left === 1 ? "the missing page" : `the ${left} missing pages`}`,
    choose: "Choose photos or PDF",
    formats: (mb) => `JPG, PNG, HEIC or PDF · up to ${mb} MB each`,
    morePages: "Does your document have more pages?",
    payExtra: "Pay for the extra pages",
    uploadThere: "and upload them in that order.",
    uploading: (p) => `Uploading… ${p}%`,
    received: "Received",
    remove: (name) => `Remove ${name}`,
    uploadingAria: "Uploading",
    removingAria: "Removing",
    retry: "Retry",
    discard: "Discard",
    removeHint: (window) => `You can remove a file for ${window} after uploading it. If you need to change it later,`,
    writeUs: "message us on WhatsApp",
    completeStatus: (paid, turnaround) =>
      `We received all ${paid}. We'll start translating${
        turnaround ? ` and send you the PDF in ${turnaround}` : ""
      }, to the email or WhatsApp you left when paying. You can close this page now.`,
    partialStatus: (done, paid, left) =>
      `We received ${done} of ${paid}. Upload ${left === 1 ? "the missing one" : `the ${left} missing`} so we can start translating.`,
    later: "Uploading later? Save this page's link: you can add files right here whenever you want.",
    copyLink: "Copy link",
    linkCopied: "Link copied",
    trouble: "Trouble uploading?",
    sendWhatsApp: "Send them on WhatsApp",
  },
};
