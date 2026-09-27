"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, MessageCircle } from "lucide-react";
import { SITE } from "@/data/site";
import { DOCUMENT_GROUPS } from "@/data/documents";
import { quoteWhatsAppUrl } from "@/lib/whatsapp";

const DOCUMENT_OPTIONS = [...DOCUMENT_GROUPS.flatMap((g) => g.items), "Otro"];
const MAX_PAGES = 200;

const INCLUDED = [
  "Traducción completa al inglés, sellos y firmas incluidos",
  "Certificación del traductor firmada y fechada",
  "Entrega en PDF, lista para subir o imprimir",
];

type Field = "name" | "documentType" | "pages" | "deadline";
type Errors = Partial<Record<Field, string>>;

function todayIso(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function formatDeadline(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });
}

export function Quote() {
  const [name, setName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [pages, setPages] = useState("1");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
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

  const pageCount = Number(pages);
  const validPages = Number.isInteger(pageCount) && pageCount >= 1 && pageCount <= MAX_PAGES;
  const estimate = SITE.pricePerPage && validPages ? SITE.pricePerPage * pageCount : null;

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = "Escribe tu nombre para saber a quién responder.";
    if (!documentType) next.documentType = "Elige el tipo de documento. Si no está en la lista, elige “Otro”.";
    if (!validPages) next.pages = `Indica cuántas páginas tiene, entre 1 y ${MAX_PAGES}.`;
    if (deadline && deadline < todayIso()) next.deadline = "Esa fecha ya pasó. Elige hoy o una fecha futura.";
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
    const url = quoteWhatsAppUrl({
      name: name.trim(),
      documentType,
      pages: pageCount,
      deadline: formatDeadline(deadline),
      notes,
    });
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  }

  function reset() {
    setName("");
    setDocumentType("");
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
      <div className="section grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <p className="eyebrow">Cotización</p>
          <h2 className="font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
            Cuéntanos qué necesitas traducir.
          </h2>
          <p className="leading-relaxed text-ink-soft">
            Completas esto, se abre WhatsApp con tu solicitud escrita y ahí nos mandas las fotos del documento.
          </p>
          <div className="rounded-card border border-line bg-paper-sheet p-6">
            <p className="text-sm font-medium text-ink-muted">{estimate ? "Precio estimado" : "Precio"}</p>
            <p className="mt-1 font-display text-3xl font-medium" aria-live="polite">
              {estimate ? `USD ${estimate}` : "Cotización sin costo"}
            </p>
            {estimate ? (
              <p className="mt-1 text-sm text-ink-muted">
                {pageCount} {pageCount === 1 ? "página" : "páginas"} × USD {SITE.pricePerPage}. Te confirmamos el total antes de empezar.
              </p>
            ) : (
              <p className="mt-1 text-sm text-ink-muted">Te confirmamos precio y plazo antes de empezar.</p>
            )}
            <ul className="mt-5 flex flex-col gap-2.5 border-t border-line pt-5 text-[15px] text-ink-soft">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check size={18} strokeWidth={2.4} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
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
              <h3 className="font-display text-3xl font-medium">Tu solicitud está lista en WhatsApp.</h3>
              <p className="leading-relaxed text-ink-soft">
                Envía el mensaje y, en el mismo chat, las fotos de cada página del documento. Te respondemos con el precio y
                el plazo.
              </p>
              <p className="text-ink-soft">
                ¿No se abrió WhatsApp?{" "}
                <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline underline-offset-4">
                  Ábrelo con este enlace
                </a>
                .
              </p>
              <button type="button" onClick={reset} className="btn-secondary mt-2 self-start">
                Cotizar otro documento
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="grid gap-6 rounded-card border border-line bg-paper-sheet p-6 sm:grid-cols-2 sm:p-10">
              <div className="sm:col-span-2">
                <label htmlFor="q-name" className="text-[15px] font-medium">
                  Tu nombre
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
                  placeholder="Ej: Camila Rojas"
                />
                {errors.name && (
                  <p id="q-name-error" className="mt-2 text-sm text-red-700">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="q-doc" className="text-[15px] font-medium">
                  Tipo de documento
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
                      Elige un documento
                    </option>
                    {DOCUMENT_OPTIONS.map((opt) => (
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
                  Número de páginas
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
                    Cada cara con texto cuenta como una página.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="q-deadline" className="text-[15px] font-medium">
                  ¿Para cuándo lo necesitas? <span className="font-normal text-ink-muted">(opcional)</span>
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
                  Comentarios <span className="font-normal text-ink-muted">(opcional)</span>
                </label>
                <textarea
                  id="q-notes"
                  name="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`${inputBase} border-ink/25 py-3`}
                  placeholder="Ej: son dos actas de nacimiento, para una petición familiar."
                />
              </div>

              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  <MessageCircle size={19} aria-hidden="true" />
                  Enviar por WhatsApp
                </button>
                <p className="text-sm text-ink-muted">Sin costo y sin compromiso.</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
