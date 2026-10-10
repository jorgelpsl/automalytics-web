import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { SITE } from "@/data/site";
import { type Lang } from "@/i18n/config";
import { onlineOrdersEnabled } from "@/lib/features";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

const COPY = {
  es: {
    onlineBefore: "¿Tienes el documento a mano? Paga en línea y ",
    onlineMark: "súbelo",
    onlineAfter: " desde el celular.",
    onlineBody:
      "Eliges el documento y las páginas, pagas con tarjeta, Apple Pay o Google Pay, y subes una foto de cada página. Te entregamos el PDF con la traducción certificada",
    inTime: (time: string) => ` en ${time}`,
    buy: "Comprar mi traducción",
    ask: "Preguntar por WhatsApp",
    whatsappBefore: "¿Tienes el documento a mano? Mándanos una ",
    whatsappMark: "foto",
    whatsappAfter: " y te cotizamos.",
    write: "Escribir por WhatsApp",
  },
  en: {
    onlineBefore: "Got your document handy? Pay online and ",
    onlineMark: "upload it",
    onlineAfter: " from your phone.",
    onlineBody:
      "You choose the document and the pages, pay by card, Apple Pay or Google Pay, and upload a photo of each page. We deliver the PDF with the certified translation",
    inTime: (time: string) => ` in ${time}`,
    buy: "Order my translation",
    ask: "Ask on WhatsApp",
    whatsappBefore: "Got your document handy? Send us a ",
    whatsappMark: "photo",
    whatsappAfter: " and we'll quote you.",
    write: "Message us on WhatsApp",
  },
} as const;

export function ClosingCta({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const turnaround = lang === "en" ? SITE.turnaroundEn : SITE.turnaround;
  if (onlineOrdersEnabled()) {
    return (
      <section className="border-t border-line bg-paper-alt">
        <div className="section flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-2xl flex-col gap-4">
            <h2 className="font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
              {copy.onlineBefore}
              <span className="marker">{copy.onlineMark}</span>
              {copy.onlineAfter}
            </h2>
            <p className="text-lg leading-relaxed text-ink-soft">
              {copy.onlineBody}
              {turnaround ? copy.inTime(turnaround) : ""}.
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 md:w-auto">
            <a href="#cotizar" className="btn-primary">
              {copy.buy}
            </a>
            <a href={generalWhatsAppUrl(lang)} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <WhatsAppIcon size={19} />
              {copy.ask}
            </a>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="border-t border-line bg-paper-alt">
      <div className="section flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
          {copy.whatsappBefore}
          <span className="marker">{copy.whatsappMark}</span>
          {copy.whatsappAfter}
        </h2>
        <a href={generalWhatsAppUrl(lang)} target="_blank" rel="noopener noreferrer" className="btn-primary w-full shrink-0 md:w-auto">
          <WhatsAppIcon size={19} />
          {copy.write}
        </a>
      </div>
    </section>
  );
}
