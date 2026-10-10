"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { type Lang } from "@/i18n/config";
import { COMMON } from "@/i18n/copy/common";
import { counterpartPath } from "@/i18n/routes";
import { LANGUAGE_CHOICE_KEY } from "@/components/LanguageSwitcher";

const DISMISSED_KEY = "certa-lang-dismissed";

/** Whether any language the browser lists is `target` (or a regional variant). */
function browserSpeaks(target: Lang): boolean {
  return navigator.languages.some((tag) => tag.toLowerCase().split("-")[0] === target);
}

/**
 * A small, dismissible offer to switch language. It never redirects: many of the
 * people this site is for use English phones and still want the Spanish page,
 * and search engines crawl without a language. It only appears for English-only
 * browsers on a Spanish page (and the reverse), never for visitors who arrived
 * from an ad, who already chose the page they're on.
 */
export function LanguageSuggestion({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const target: Lang = lang === "es" ? "en" : "es";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let skip = false;
    try {
      skip = Boolean(localStorage.getItem(DISMISSED_KEY) || localStorage.getItem(LANGUAGE_CHOICE_KEY));
    } catch {
      // Storage blocked: fall through and show it once per page view.
    }
    const fromAd = /[?&](utm_|gclid|fbclid|gbraid|wbraid)/i.test(window.location.search);
    // Only suggest when the browser lists the other language and not this one.
    const wanted = browserSpeaks(target) && !browserSpeaks(lang);
    const timer = window.setTimeout(() => setVisible(!skip && !fromAd && wanted), 0);
    return () => window.clearTimeout(timer);
  }, [lang, target, pathname]);

  if (!visible || pathname.startsWith("/admin")) return null;

  const copy = COMMON[target].suggestion;

  function dismiss() {
    try {
      localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // Nothing to persist.
    }
    setVisible(false);
  }

  return (
    <div
      role="region"
      aria-label="Language / Idioma"
      lang={target}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 right-24 z-40 flex max-w-sm items-center gap-3 rounded-card border border-line bg-paper-sheet py-3 pl-4 pr-2 shadow-lg sm:left-6"
    >
      <p className="flex-1 text-[15px] leading-snug text-ink">
        {copy.text}{" "}
        <Link
          href={counterpartPath(pathname, target)}
          hrefLang={target}
          onClick={() => {
            try {
              localStorage.setItem(LANGUAGE_CHOICE_KEY, target);
            } catch {
              // Nothing to persist.
            }
          }}
          className="font-medium underline underline-offset-4"
        >
          {copy.action}
        </Link>
      </p>
      <button
        type="button"
        onClick={dismiss}
        aria-label={copy.dismiss}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-soft text-ink-muted hover:bg-ink/[0.06] hover:text-ink"
      >
        <X size={18} aria-hidden="true" />
      </button>
    </div>
  );
}
