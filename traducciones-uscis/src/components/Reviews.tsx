"use client";

import { useState } from "react";
import { REVIEWS, type Review } from "@/data/reviews";

type Lang = "es" | "en";

const COPY = {
  es: {
    title: "Lo que dicen quienes ya pidieron su traducción.",
    swipe: "Desliza para ver más →",
    listLabel: "Opiniones de clientes",
    customer: "Cliente de Certa",
    note: null,
  },
  en: {
    title: "What customers say after ordering their translation.",
    swipe: "Swipe to see more →",
    listLabel: "Customer reviews",
    customer: "Certa customer",
    note: "Translated from the original Spanish.",
  },
} as const;

// "Rebeca C." → "RC": the avatar only carries the initials the customer chose to show.
function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ReviewCard({ review, lang }: { review: Review; lang: Lang }) {
  const copy = COPY[lang];
  const document = lang === "en" ? review.documentEn : review.document;
  const disclosure = lang === "en" ? review.disclosureEn : review.disclosure;

  return (
    <li className="flex w-[84%] shrink-0 snap-center md:w-auto">
      <figure className="flex w-full flex-col rounded-card border border-line bg-paper-sheet p-6">
        <span aria-hidden="true" className="block h-7 font-display text-6xl leading-[0.9] text-marker">
          “
        </span>
        <blockquote lang={lang} className="mt-2 flex-1 text-[17px] leading-relaxed text-ink-soft">
          {lang === "en" ? review.textEn : review.text}
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-4">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-marker-soft text-sm font-medium text-ink"
          >
            {initials(review.name)}
          </span>
          <span lang={lang} className="text-[15px] leading-snug">
            <span className="block font-medium text-ink">{review.name}</span>
            <span className="block text-ink-muted">
              {copy.customer}
              {document ? ` · ${document}` : ""}
            </span>
            {disclosure && <span className="block text-ink-muted">{disclosure}</span>}
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

function LanguageToggle({ lang, onChange }: { lang: Lang; onChange: (lang: Lang) => void }) {
  const options: { value: Lang; label: string; aria: string }[] = [
    { value: "es", label: "Español", aria: "Ver las opiniones en español" },
    { value: "en", label: "English", aria: "Read the reviews in English" },
  ];
  return (
    <div
      role="group"
      aria-label="Idioma de las opiniones / Reviews language"
      className="flex w-fit gap-1 rounded-soft border border-line p-1"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          lang={option.value}
          aria-pressed={lang === option.value}
          aria-label={option.aria}
          onClick={() => onChange(option.value)}
          className={`min-h-[44px] rounded-soft px-4 text-[15px] font-medium transition-colors ${
            lang === option.value ? "bg-ink text-paper" : "text-ink-soft hover:bg-ink/[0.06]"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

// Opinions as plain quotes. No star rating and no review structured data: a
// handful of quotes isn't an aggregate score and shouldn't be presented as one.
// On phones the cards slide sideways, so four of them don't stack into a wall.
// The page loads in Spanish; the English text is a translation of the same words.
export function Reviews() {
  const [lang, setLang] = useState<Lang>("es");
  if (REVIEWS.length === 0) return null;
  const copy = COPY[lang];

  return (
    <section id="opiniones" aria-labelledby="opiniones-titulo" className="border-t border-line">
      <div className="section grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-4 lg:col-span-4">
          <h2
            id="opiniones-titulo"
            lang={lang}
            className="font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl"
          >
            {copy.title}
          </h2>
          <LanguageToggle lang={lang} onChange={setLang} />
          {copy.note && (
            <p lang={lang} className="text-sm text-ink-muted">
              {copy.note}
            </p>
          )}
          <p lang={lang} className="text-sm text-ink-muted md:hidden" aria-hidden="true">
            {copy.swipe}
          </p>
        </div>
        <div className="-mx-4 min-w-0 sm:-mx-6 md:mx-0 lg:col-span-8">
          <ul
            role="list"
            tabIndex={0}
            aria-label={copy.listLabel}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0"
          >
            {REVIEWS.map((review) => (
              <ReviewCard key={review.name} review={review} lang={lang} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
