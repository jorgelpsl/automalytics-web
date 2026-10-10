"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gtagEvent } from "@/lib/gtag";

// Funnel steps that begin_checkout and purchase don't cover, so a visit that
// never pays shows where it stopped: saw the form, started it, or went to
// WhatsApp instead. Events carry the path only, never query strings.
export function FunnelTracking() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest("a");
      const href = link?.getAttribute("href") ?? "";
      if (href.includes("wa.me")) {
        gtagEvent("whatsapp_click", { page_path: pathname, source: link?.dataset.source ?? "page", language: document.documentElement.lang });
      } else if (href.includes("#cotizar") || href.includes("documento=")) {
        gtagEvent("buy_click", { page_path: pathname, language: document.documentElement.lang });
      }
    };
    document.addEventListener("click", onClick);

    const form = document.querySelector<HTMLElement>("#cotizar form");
    const onFirstFocus = () => gtagEvent("form_start", { page_path: pathname, language: document.documentElement.lang });
    form?.addEventListener("focusin", onFirstFocus, { once: true });

    let seen: IntersectionObserver | undefined;
    const section = document.getElementById("cotizar");
    if (section && "IntersectionObserver" in window) {
      seen = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          gtagEvent("form_view", { page_path: pathname, language: document.documentElement.lang });
          seen?.disconnect();
        },
        { threshold: 0.4 },
      );
      seen.observe(section);
    }

    return () => {
      document.removeEventListener("click", onClick);
      form?.removeEventListener("focusin", onFirstFocus);
      seen?.disconnect();
    };
  }, [pathname]);

  return null;
}
