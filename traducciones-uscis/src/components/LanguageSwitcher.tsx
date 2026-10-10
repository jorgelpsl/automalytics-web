"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Lang } from "@/i18n/config";
import { COMMON } from "@/i18n/copy/common";
import { counterpartPath } from "@/i18n/routes";

export const LANGUAGE_CHOICE_KEY = "certa-lang";

/**
 * ES | EN toggle in the header. Each option is a plain link to the same page in
 * that language, so it works without scripts and search engines can follow it.
 * Choosing a language is remembered so the suggestion banner stays quiet.
 */
export function LanguageSwitcher({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const copy = COMMON[lang].language;

  return (
    <div role="group" aria-label={copy.groupAria} className="flex rounded-soft border border-line p-0.5 text-[14px] font-medium">
      {(["es", "en"] as const).map((option) => {
        const active = option === lang;
        const label = copy[option];
        return active ? (
          <span
            key={option}
            aria-current="true"
            aria-label={label.aria}
            lang={option}
            className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-soft bg-ink px-2.5 text-paper"
          >
            {label.label}
          </span>
        ) : (
          <Link
            key={option}
            href={counterpartPath(pathname, option)}
            hrefLang={option}
            lang={option}
            aria-label={label.aria}
            onClick={() => {
              try {
                localStorage.setItem(LANGUAGE_CHOICE_KEY, option);
              } catch {
                // Private mode or blocked storage: the switch still works.
              }
            }}
            className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-soft px-2.5 text-ink-soft hover:bg-ink/[0.06] hover:text-ink"
          >
            {label.label}
          </Link>
        );
      })}
    </div>
  );
}
