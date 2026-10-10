"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, CreditCard } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { SITE } from "@/data/site";
import { canonicalDocumentType, documentLabel, documentOptions } from "@/data/documents";
import { type Lang } from "@/i18n/config";
import { QUOTE } from "@/i18n/copy/quote";
import { ROUTES } from "@/i18n/routes";
import { gtagEvent } from "@/lib/gtag";
import { MAX_NOTES, MAX_PAGES, formatDeadline } from "@/lib/order";
import { PRICE_TIERS, estimateFor, formatUsd, tierFor, tierRange } from "@/lib/pricing";
import { quoteWhatsAppUrl } from "@/lib/whatsapp";

type Field = "name" | "documentType" | "pages" | "deadline";
type Action = "pay" | "whatsapp";
type Errors = Partial<Record<Field, string>>;

function todayIso(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function Quote({
  lang,
  paymentsEnabled,
  uploadAfterPayment,
  defaultDocumentType,
}: {
  lang: Lang;
  paymentsEnabled: boolean;
  uploadAfterPayment: boolean;
  /** Preselected document (its Spanish name), for pages about a single document type. */
  defaultDocumentType?: string;
}) {
  const t = QUOTE[lang];
  const options = documentOptions(lang);
  const turnaround = lang === "en" ? SITE.turnaroundEn : SITE.turnaround;
  const included = [t.included.complete, t.included.certified, turnaround ? t.included.pdfIn(turnaround) : t.included.pdfPlain];
  const initialDocument = defaultDocumentType ? documentLabel(lang, defaultDocumentType) : "";
  const [name, setName] = useState("");
  // What the select shows: the label in the page's language.
  const [documentType, setDocumentType] = useState(options.includes(initialDocument) ? initialDocument : "");
  const [pages, setPages] = useState("1");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const docRef = useRef<HTMLSelectElement>(null);
  const pagesRef = useRef<HTMLInputElement>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // The success card is much shorter than the form it replaces, so without
  // this the viewport is left below it and the confirmation goes unseen.
  useEffect(() => {
    if (sentUrl) successRef.current?.focus();
  }, [sentUrl]);

  // Arriving from a document page (/?documento=…#cotizar) preselects it. The
  // query only exists in the browser, so it's applied after hydration.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("documento");
    if (!requested) return;
    const label = documentLabel(lang, requested);
    if (!documentOptions(lang).includes(label)) return;
    const frame = requestAnimationFrame(() => setDocumentType(label));
    return () => cancelAnimationFrame(frame);
  }, [lang]);

  // Going back from Stripe restores this page from the back/forward cache
  // with the button still saying "Abriendo el pago…".
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setPaying(false);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  const pageCount = Number(pages);
  const validPages = Number.isInteger(pageCount) && pageCount >= 1 && pageCount <= MAX_PAGES;
  const activeTier = validPages ? tierFor(pageCount) : null;
  const estimate = validPages ? estimateFor(pageCount) : null;

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = t.errors.name;
    if (!documentType) next.documentType = t.errors.documentType;
    if (!validPages) next.pages = t.errors.pages(MAX_PAGES);
    if (deadline && deadline < todayIso()) next.deadline = t.errors.deadlinePast;
    return next;
  }

  async function startPayment() {
    setPaying(true);
    setPayError(null);
    // Orders and analytics always carry the Spanish name, in either language.
    const canonicalType = canonicalDocumentType(lang, documentType);
    if (estimate !== null) {
      gtagEvent("begin_checkout", {
        currency: "USD",
        value: estimate,
        language: lang,
        items: [{ item_name: canonicalType, price: estimate / pageCount, quantity: pageCount }],
      });
    }
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), documentType: canonicalType, pages: pageCount, deadline, notes, lang }),
      });
      const data = (await res.json().catch(() => ({}))) as { url?: string };
      if (!res.ok || !data.url) throw new Error(`checkout ${res.status}`);
      window.location.assign(data.url);
    } catch {
      setPaying(false);
      setPayError(t.payError);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const action: Action = paymentsEnabled && submitter?.value === "pay" ? "pay" : "whatsapp";
    const found = validate();
    setErrors(found);
    if (found.name) {
      nameRef.current?.focus();
      return;
    }
    if (found.documentType) {
      docRef.current?.focus();
      return;
    }
    if (found.pages) {
      pagesRef.current?.focus();
      return;
    }
    if (found.deadline) {
      deadlineRef.current?.focus();
      return;
    }
    if (action === "pay") {
      void startPayment();
      return;
    }
    const url = quoteWhatsAppUrl(
      {
        name: name.trim(),
        documentType,
        pages: pageCount,
        deadline: formatDeadline(deadline, lang),
        notes,
      },
      lang,
    );
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  }

  function reset() {
    setName("");
    setDocumentType(options.includes(initialDocument) ? initialDocument : "");
    setPages("1");
    setDeadline("");
    setNotes("");
    setErrors({});
    setSentUrl(null);
  }

  const inputBase =
    "mt-2 block min-h-[48px] w-full rounded-soft border bg-paper-sheet px-4 text-base text-ink placeholder:text-ink-muted/70 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";
  const borderFor = (f: Field) => (errors[f] ? "border-red-700" : "border-ink/25");

  return (
    <section id="cotizar" className="border-t border-line bg-paper-alt">
      <div className="section grid gap-12 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-6">
        <div className="flex flex-col gap-6 lg:col-span-4 lg:row-start-1">
          <p className="eyebrow">{paymentsEnabled ? t.eyebrowPay : t.eyebrowQuote}</p>
          <h2 className="font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
            {t.title}
          </h2>
          <p className="leading-relaxed text-ink-soft">
            {uploadAfterPayment ? t.introUpload : paymentsEnabled ? t.introPay : t.introQuote}
          </p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          {sentUrl ? (
            <div
              ref={successRef}
              role="status"
              tabIndex={-1}
              className="flex scroll-mt-24 flex-col gap-4 rounded-card border border-line bg-paper-sheet p-6 focus:outline-none sm:p-10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-marker text-ink">
                <Check size={24} strokeWidth={2.6} aria-hidden="true" />
              </span>
              <h3 className="font-display text-3xl font-medium">{t.success.title}</h3>
              <p className="leading-relaxed text-ink-soft">{t.success.body}</p>
              <p className="text-ink-soft">
                {t.success.notOpened}{" "}
                <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline underline-offset-4">
                  {t.success.link}
                </a>
                .
              </p>
              <button type="button" onClick={reset} className="btn-secondary mt-2 self-start">
                {t.success.another}
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="grid gap-6 rounded-card border border-line bg-paper-sheet p-6 sm:grid-cols-2 sm:p-10">
              <div className="sm:col-span-2">
                <label htmlFor="q-name" className="text-[15px] font-medium">
                  {t.labels.name}
                </label>
                <input
                  ref={nameRef}
                  id="q-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "q-name-error" : undefined}
                  className={`${inputBase} ${borderFor("name")}`}
                  placeholder={t.labels.namePlaceholder}
                />
                {errors.name && (
                  <p id="q-name-error" className="mt-2 text-sm text-red-700">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="q-doc" className="text-[15px] font-medium">
                  {t.labels.document}
                </label>
                <div className="relative">
                  <select
                    ref={docRef}
                    id="q-doc"
                    name="documentType"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    aria-invalid={Boolean(errors.documentType)}
                    aria-describedby={errors.documentType ? "q-doc-error" : undefined}
                    className={`${inputBase} ${borderFor("documentType")} appearance-none pr-12`}
                  >
                    <option value="" disabled>
                      {t.labels.documentPlaceholder}
                    </option>
                    {options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={20}
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-ink"
                  />
                </div>
                {errors.documentType && (
                  <p id="q-doc-error" className="mt-2 text-sm text-red-700">
                    {errors.documentType}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="q-pages" className="text-[15px] font-medium">
                  {t.labels.pages}
                </label>
                <input
                  ref={pagesRef}
                  id="q-pages"
                  name="pages"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={MAX_PAGES}
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  aria-invalid={Boolean(errors.pages)}
                  aria-describedby={errors.pages ? "q-pages-error" : "q-pages-hint"}
                  className={`${inputBase} ${borderFor("pages")}`}
                />
                {errors.pages ? (
                  <p id="q-pages-error" className="mt-2 text-sm text-red-700">
                    {errors.pages}
                  </p>
                ) : (
                  <p id="q-pages-hint" className="mt-2 text-sm text-ink-muted">
                    {t.labels.pagesHint}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="q-deadline" className="text-[15px] font-medium">
                  {t.labels.deadline} <span className="font-normal text-ink-muted">{t.labels.optional}</span>
                </label>
                <input
                  ref={deadlineRef}
                  id="q-deadline"
                  name="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  aria-invalid={Boolean(errors.deadline)}
                  aria-describedby={errors.deadline ? "q-deadline-error" : undefined}
                  className={`${inputBase} ${borderFor("deadline")}`}
                />
                {errors.deadline && (
                  <p id="q-deadline-error" className="mt-2 text-sm text-red-700">
                    {errors.deadline}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="q-notes" className="text-[15px] font-medium">
                  {t.labels.comments} <span className="font-normal text-ink-muted">{t.labels.optional}</span>
                </label>
                <textarea
                  id="q-notes"
                  name="notes"
                  rows={3}
                  maxLength={MAX_NOTES}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`${inputBase} border-ink/25 py-3`}
                  placeholder={t.labels.commentsPlaceholder}
                />
              </div>

              {paymentsEnabled ? (
                <div className="flex flex-col gap-4 sm:col-span-2">
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <button type="submit" name="action" value="pay" disabled={paying} className="btn-primary w-full sm:w-auto">
                      <CreditCard size={19} aria-hidden="true" />
                      {paying ? t.buttons.opening : estimate ? t.buttons.payNow(formatUsd(estimate)) : t.buttons.payNowPlain}
                    </button>
                    <button type="submit" name="action" value="whatsapp" disabled={paying} className="btn-secondary w-full sm:w-auto">
                      <WhatsAppIcon size={19} />
                      {t.buttons.ask}
                    </button>
                  </div>
                  {payError && (
                    <p role="alert" className="text-sm text-red-700">
                      {payError}
                    </p>
                  )}
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {t.note.secure} {uploadAfterPayment ? t.note.afterUpload : t.note.afterWhatsApp} {t.note.correction}{" "}
                    {t.note.accept}{" "}
                    <Link href={ROUTES.terms[lang]} className="underline underline-offset-4 hover:text-ink">
                      {t.note.terms}
                    </Link>{" "}
                    {t.note.and}{" "}
                    <Link href={ROUTES.refunds[lang]} className="underline underline-offset-4 hover:text-ink">
                      {t.note.refunds}
                    </Link>
                    .
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    <WhatsAppIcon size={19} />
                    {t.buttons.sendWhatsApp}
                  </button>
                  <p className="text-sm text-ink-muted">{t.buttons.free}</p>
                </div>
              )}
            </form>
          )}
        </div>

        <div className="rounded-card border border-line bg-paper-sheet p-6 lg:col-span-4 lg:row-start-2 lg:self-start">
          <p className="text-sm font-medium text-ink-muted">{estimate ? (paymentsEnabled ? t.priceTotal : t.priceEstimate) : t.price}</p>
          <p className="mt-1 font-display text-3xl font-medium" aria-live="polite">
            {estimate ? formatUsd(estimate) : t.priceFree}
          </p>
          {estimate ? (
            <p className="mt-1 text-sm text-ink-muted">
              {t.priceLine(pageCount, activeTier ? formatUsd(activeTier.perPage) : "")}
            </p>
          ) : (
            <p className="mt-1 text-sm text-ink-muted">{t.priceUnconfirmed}</p>
          )}
          {PRICE_TIERS.length > 1 && (
            <dl className="mt-5 flex flex-col border-t border-line pt-4 text-[15px]">
              {PRICE_TIERS.map((tier) => {
                const active = tier === activeTier;
                return (
                  <div
                    key={tier.minPages}
                    className={`flex items-baseline justify-between gap-4 rounded-soft px-2 py-1.5 tabular-nums ${
                      active ? "bg-marker/45 text-ink" : "text-ink-soft"
                    }`}
                  >
                    <dt className={active ? "font-medium" : ""}>{tierRange(tier, lang)}</dt>
                    <dd className={active ? "font-medium" : ""}>{formatUsd(tier.perPage)} / {t.perPage}</dd>
                  </div>
                );
              })}
            </dl>
          )}
          <ul className="mt-5 flex flex-col gap-2.5 border-t border-line pt-5 text-[15px] text-ink-soft">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check size={18} strokeWidth={2.4} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
