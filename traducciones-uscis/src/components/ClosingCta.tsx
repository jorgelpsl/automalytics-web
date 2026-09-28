import { MessageCircle } from "lucide-react";
import { onlineOrdersEnabled } from "@/lib/features";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

export function ClosingCta() {
  if (onlineOrdersEnabled()) {
    return (
      <section className="border-t border-line bg-paper-alt">
        <div className="section flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
            ¿Tienes el documento a mano? Paga en línea y <span className="marker">súbelo</span> desde el celular.
          </h2>
          <div className="flex w-full shrink-0 flex-col gap-3 md:w-auto">
            <a href="#cotizar" className="btn-primary">
              Comprar mi traducción
            </a>
            <a href={generalWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <MessageCircle size={19} aria-hidden="true" />
              Preguntar por WhatsApp
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
          ¿Tienes el documento a mano? Mándanos una <span className="marker">foto</span> y te cotizamos.
        </h2>
        <a href={generalWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary w-full shrink-0 md:w-auto">
          <MessageCircle size={19} aria-hidden="true" />
          Escribir por WhatsApp
        </a>
      </div>
    </section>
  );
}
