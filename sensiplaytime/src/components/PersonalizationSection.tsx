import { Check } from "lucide-react";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

const FEATURES = ["Nombres", "Colores", "Diseños únicos", "Regalos especiales"];

const EXAMPLE_TAGS = [
  { name: "SOFIA", color: "bg-brand-mint" },
  { name: "MATEO", color: "bg-brand-turquoise" },
  { name: "EMILIA", color: "bg-brand-coral" },
];

export function PersonalizationSection() {
  return (
    <div className="flex flex-col justify-between gap-6 rounded-brand bg-brand-lavender/30 p-6 sm:p-7">
      <div>
        <h3 className="font-heading text-2xl font-bold text-brand-dark">Hazlo tuyo</h3>
        <p className="mt-1 text-sm text-brand-dark/70">
          Productos personalizados para momentos especiales.
        </p>
        <ul className="mt-4 flex flex-col gap-2">
          {FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm font-medium text-brand-dark">
              <Check size={16} className="text-brand-turquoise" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
        <a
          href={generalWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center rounded-full bg-brand-turquoise px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#38b0a9]"
        >
          Quiero personalizar
        </a>
      </div>

      <div className="flex flex-wrap items-end justify-center gap-3" aria-hidden="true">
        {EXAMPLE_TAGS.map((tag) => (
          <div
            key={tag.name}
            className={`${tag.color} flex h-11 items-center rounded-xl px-4 text-sm font-bold tracking-wide text-white shadow-soft`}
          >
            {tag.name}
          </div>
        ))}
      </div>
    </div>
  );
}
