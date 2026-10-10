"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { type Lang } from "@/i18n/config";
import { floatingWhatsAppUrl } from "@/lib/whatsapp";

// Pages with their own WhatsApp flow (the owner's panel and the post-payment
// page that hands the order over) don't get the button.
const HIDDEN_ON = ["/admin", "/pago-recibido", "/en/payment-received"];

const ARIA: Record<Lang, string> = {
  es: "Escribir por WhatsApp para preguntar antes de pagar",
  en: "Message us on WhatsApp to ask before you pay",
};

/**
 * Persistent "ask first" shortcut for visitors who'd rather talk than pay
 * online. It steps aside while the order form is on screen, where it would
 * cover the fields and the form already has its own WhatsApp button.
 *
 * `documentNames` maps a document page slug (in the page's language) to its name,
 * so the prefilled message can mention the document the visitor is looking at.
 */
export function FloatingWhatsApp({ lang, documentNames }: { lang: Lang; documentNames: Record<string, string> }) {
  const pathname = usePathname();
  // Keyed by path so a stale "form in view" from the previous page can't hide
  // the button after navigating to one without a form.
  const [formSeen, setFormSeen] = useState<{ path: string; inView: boolean }>({ path: "", inView: false });

  useEffect(() => {
    const form = document.getElementById("cotizar");
    if (!form || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFormSeen({ path: pathname, inView: entry.isIntersecting }),
      { threshold: 0.1 },
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, [pathname]);

  const formInView = formSeen.path === pathname && formSeen.inView;
  if (HIDDEN_ON.some((prefix) => pathname.startsWith(prefix)) || formInView) return null;

  const slug = pathname.startsWith("/traduccion/")
    ? pathname.split("/")[2]
    : pathname.startsWith("/en/translation/")
      ? pathname.split("/")[3]
      : undefined;
  const href = floatingWhatsAppUrl(slug ? documentNames[slug] : undefined, lang);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-source="floating"
      aria-label={ARIA[lang]}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105 active:scale-95 motion-reduce:transition-none sm:right-6"
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}
