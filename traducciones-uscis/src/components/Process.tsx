import { type Lang } from "@/i18n/config";
import { onlineOrdersEnabled } from "@/lib/features";

const COPY = {
  es: {
    eyebrow: "Cómo funciona",
    titleOnline: "Todo en línea, sin salir de tu casa.",
    titleWhatsApp: "Todo por WhatsApp, sin salir de tu casa.",
    delivery: {
      title: "Recibes el PDF certificado",
      body: "La traducción completa con la certificación firmada, lista para subir a tu trámite o imprimir.",
    },
    whatsapp: [
      {
        title: "Nos mandas el documento",
        body: "Una foto clara de cada página por WhatsApp, o el PDF si lo tienes escaneado.",
      },
      {
        title: "Te cotizamos",
        body: "Revisamos el documento y te confirmamos precio y plazo antes de empezar a traducir.",
      },
    ],
    online: [
      {
        title: "Eliges y pagas",
        body: "Eliges el documento y el número de páginas, y pagas con tarjeta, Apple Pay o Google Pay.",
      },
      {
        title: "Subes el documento",
        body: "Una foto clara de cada página desde el celular, o el PDF si lo tienes escaneado.",
      },
    ],
  },
  en: {
    eyebrow: "How it works",
    titleOnline: "All online, without leaving home.",
    titleWhatsApp: "All on WhatsApp, without leaving home.",
    delivery: {
      title: "You receive the certified PDF",
      body: "The complete translation with the signed certification, ready to upload to your filing or print.",
    },
    whatsapp: [
      {
        title: "You send us the document",
        body: "A clear photo of each page on WhatsApp, or the PDF if you have it scanned.",
      },
      {
        title: "We give you a quote",
        body: "We review the document and confirm the price and turnaround before we start translating.",
      },
    ],
    online: [
      {
        title: "Choose and pay",
        body: "You choose the document and the number of pages, and pay by card, Apple Pay or Google Pay.",
      },
      {
        title: "Upload the document",
        body: "A clear photo of each page from your phone, or the PDF if you have it scanned.",
      },
    ],
  },
} as const;

export function Process({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const online = onlineOrdersEnabled();
  const steps = [...(online ? copy.online : copy.whatsapp), copy.delivery];
  return (
    <section id="proceso" className="bg-ink text-paper">
      <div className="section">
        <div className="flex max-w-2xl flex-col gap-4">
          <p className="text-sm font-medium text-paper/70">{copy.eyebrow}</p>
          <h2 className="font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
            {online ? copy.titleOnline : copy.titleWhatsApp}
          </h2>
        </div>

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-4 border-t border-paper/20 pt-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-marker font-display text-lg font-semibold text-ink" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="leading-relaxed text-paper/75">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
