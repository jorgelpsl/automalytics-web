"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { uploadPresigned } from "@vercel/blob/client";
import { AlertCircle, Check, Copy, FileText, LoaderCircle, RotateCcw, Upload, X } from "lucide-react";
import { countPdfPages } from "@/lib/pdf-pages";
import { ALLOWED_UPLOAD_TYPES, MAX_UPLOAD_BYTES, MAX_UPLOAD_MB, uploadPathname } from "@/lib/upload-rules";

interface Item {
  id: string;
  name: string;
  size: number;
  pages: number;
  status: "uploading" | "done" | "error" | "removing";
  progress: number;
  pathname?: string;
  error?: string;
  file?: File;
}

// Some browsers report HEIC photos from iPhones with an empty type.
const TYPE_BY_EXTENSION: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  heic: "image/heic",
  heif: "image/heif",
  pdf: "application/pdf",
};

function contentTypeOf(file: File): string | null {
  if (ALLOWED_UPLOAD_TYPES.includes(file.type)) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return TYPE_BY_EXTENSION[ext] ?? null;
}

function formatSize(bytes: number): string {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

const pagesLabel = (n: number) => `${n} ${n === 1 ? "página" : "páginas"}`;

export function DocumentUpload({
  sessionId,
  orderCode,
  pagesPaid,
  initialFiles,
  turnaround,
  whatsappUrl,
}: {
  sessionId: string;
  orderCode: string;
  pagesPaid: number;
  initialFiles: { pathname: string; name: string; size: number; pages: number }[];
  turnaround: string | null;
  whatsappUrl: string;
}) {
  const [items, setItems] = useState<Item[]>(() =>
    initialFiles.map((f) => ({ id: f.pathname, ...f, status: "done", progress: 100 })),
  );
  const [notice, setNotice] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const patch = (id: string, changes: Partial<Item>) =>
    setItems((current) => current.map((item) => (item.id === id ? { ...item, ...changes } : item)));

  // Pages taken by files that are uploaded or on their way; failed ones don't count.
  const pagesUsed = items.filter((i) => i.status !== "error").reduce((sum, i) => sum + i.pages, 0);
  const pagesLeft = Math.max(0, pagesPaid - pagesUsed);
  const pagesDone = items.filter((i) => i.status === "done").reduce((sum, i) => sum + i.pages, 0);
  const busy = items.some((i) => i.status === "uploading" || i.status === "removing");
  const full = pagesLeft === 0;

  async function send(item: Item): Promise<boolean> {
    const file = item.file!;
    patch(item.id, { status: "uploading", progress: 0, error: undefined });
    try {
      const blob = await uploadPresigned(uploadPathname(orderCode, file.name, item.pages), file, {
        access: "private",
        handleUploadUrl: "/api/documents",
        clientPayload: JSON.stringify({ sessionId }),
        contentType: contentTypeOf(file) ?? undefined,
        onUploadProgress: ({ percentage }) => patch(item.id, { progress: Math.round(percentage) }),
      });
      patch(item.id, { status: "done", progress: 100, pathname: blob.pathname, file: undefined });
      return true;
    } catch {
      patch(item.id, { status: "error", error: "No se pudo subir. Revisa tu conexión y vuelve a intentarlo." });
      return false;
    }
  }

  function notifyOwner() {
    void fetch("/api/documents/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    }).catch(() => {});
  }

  async function addFiles(fileList: FileList | null) {
    if (!fileList?.length) return;
    setNotice(null);
    let room = pagesLeft;
    const accepted: Item[] = [];
    const rejected: string[] = [];

    for (const file of Array.from(fileList)) {
      const type = contentTypeOf(file);
      if (!type) {
        rejected.push(`${file.name}: formato no admitido`);
        continue;
      }
      if (file.size > MAX_UPLOAD_BYTES) {
        rejected.push(`${file.name}: pesa más de ${MAX_UPLOAD_MB} MB`);
        continue;
      }
      const pages = type === "application/pdf" ? await countPdfPages(file).catch(() => 1) : 1;
      if (pages > room) {
        rejected.push(
          room === 0
            ? `${file.name}: ya completaste las ${pagesLabel(pagesPaid)} que pagaste`
            : `${file.name}: tiene ${pagesLabel(pages)} y te ${room === 1 ? "queda 1" : `quedan ${room}`}`,
        );
        continue;
      }
      room -= pages;
      accepted.push({
        id: `${Date.now()}-${accepted.length}-${file.name}`,
        name: file.name,
        size: file.size,
        pages,
        status: "uploading",
        progress: 0,
        file,
      });
    }

    if (rejected.length) {
      setNotice(`No subimos ${rejected.length === 1 ? "este archivo" : "estos archivos"}: ${rejected.join("; ")}.`);
    }
    if (inputRef.current) inputRef.current.value = "";
    setItems((current) => [...current, ...accepted]);

    let anyUploaded = false;
    for (const item of accepted) anyUploaded = (await send(item)) || anyUploaded;
    if (anyUploaded) notifyOwner();
  }

  async function remove(item: Item) {
    if (!item.pathname) return;
    setNotice(null);
    patch(item.id, { status: "removing" });
    try {
      const res = await fetch("/api/documents/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, pathname: item.pathname }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setItems((current) => current.filter((i) => i.id !== item.id));
    } catch {
      patch(item.id, { status: "done" });
      setNotice(`No pudimos quitar ${item.name}. Intenta de nuevo en un momento.`);
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copia este enlace:", window.location.href);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="font-display text-2xl font-medium">Sube tu documento</h2>
          <p className="text-[15px] font-medium tabular-nums text-ink" aria-live="polite">
            {pagesDone} de {pagesLabel(pagesPaid)}
          </p>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-paper-alt" aria-hidden="true">
          <div
            className="h-full bg-ink transition-[width] motion-reduce:transition-none"
            style={{ width: `${Math.min(100, (pagesDone / pagesPaid) * 100)}%` }}
          />
        </div>
        <p className="leading-relaxed text-ink-soft">
          Una foto por cada página, con buena luz y sin cortar los bordes, o el PDF si lo tienes escaneado. Puedes subir
          hasta las {pagesLabel(pagesPaid)} que pagaste.
        </p>
      </div>

      {full ? (
        <p className="rounded-soft border border-line px-4 py-3 text-[15px] leading-relaxed text-ink-soft">
          Ya elegiste las {pagesLabel(pagesPaid)} que pagaste. Si subiste algo por error, quítalo para liberar esa página.
        </p>
      ) : (
        <label
          htmlFor="doc-files"
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            void addFiles(e.dataTransfer.files);
          }}
          className={`flex min-h-[148px] cursor-pointer flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed px-6 py-8 text-center transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink motion-reduce:transition-none ${
            dragging ? "border-ink bg-marker/25" : "border-ink/30 hover:border-ink/60 hover:bg-paper-alt"
          }`}
        >
          <Upload size={26} aria-hidden="true" className="text-ink" />
          <span className="text-lg font-medium text-ink">
            {pagesUsed ? `Agregar ${pagesLeft === 1 ? "la página que falta" : `las ${pagesLeft} páginas que faltan`}` : "Elegir fotos o PDF"}
          </span>
          <span className="text-sm text-ink-muted">JPG, PNG, HEIC o PDF · hasta {MAX_UPLOAD_MB} MB cada uno</span>
          <input
            ref={inputRef}
            id="doc-files"
            type="file"
            multiple
            accept="image/*,application/pdf,.heic,.heif"
            onChange={(e) => void addFiles(e.target.files)}
            className="sr-only"
          />
        </label>
      )}

      {notice && (
        <div role="alert" className="flex flex-col gap-1 text-sm text-red-700">
          <p className="flex items-start gap-2">
            <AlertCircle size={17} aria-hidden="true" className="mt-0.5 shrink-0" />
            {notice}
          </p>
          <p className="pl-6 text-ink-soft">
            ¿Tu documento tiene más páginas?{" "}
            <Link href="/#cotizar" className="font-medium text-ink underline underline-offset-4">
              Paga las páginas extra
            </Link>{" "}
            y súbelas en ese pedido.
          </p>
        </div>
      )}

      {items.length > 0 && (
        <ul className="flex flex-col divide-y divide-line rounded-soft border border-line">
          {items.map((item) => (
            <li key={item.id} className="flex flex-col gap-2 px-4 py-3">
              <div className="flex items-center gap-3">
                <FileText size={18} aria-hidden="true" className="shrink-0 text-ink-muted" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px]">{item.name}</span>
                  <span className="block text-sm tabular-nums text-ink-muted">
                    {item.status === "uploading" ? `Subiendo… ${item.progress}%` : `${pagesLabel(item.pages)} · ${formatSize(item.size)}`}
                  </span>
                </span>
                {item.status === "done" && (
                  <>
                    <Check size={18} strokeWidth={2.6} className="shrink-0 text-ink" aria-label="Recibido" />
                    {item.pathname && (
                      <button
                        type="button"
                        onClick={() => void remove(item)}
                        disabled={busy}
                        aria-label={`Quitar ${item.name}`}
                        className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-soft text-ink-muted hover:bg-paper-alt hover:text-ink disabled:opacity-40"
                      >
                        <X size={18} aria-hidden="true" />
                      </button>
                    )}
                  </>
                )}
                {(item.status === "uploading" || item.status === "removing") && (
                  <LoaderCircle
                    size={18}
                    className="shrink-0 animate-spin text-ink-muted motion-reduce:animate-none"
                    aria-label={item.status === "uploading" ? "Subiendo" : "Quitando"}
                  />
                )}
              </div>
              {item.status === "uploading" && (
                <div className="h-1 overflow-hidden rounded-full bg-paper-alt" aria-hidden="true">
                  <div className="h-full bg-ink transition-[width] motion-reduce:transition-none" style={{ width: `${item.progress}%` }} />
                </div>
              )}
              {item.status === "error" && (
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-red-700">
                  <span>{item.error}</span>
                  <span className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => void send(item).then((ok) => ok && notifyOwner())}
                      className="inline-flex min-h-[44px] items-center gap-1.5 font-medium text-ink underline underline-offset-4"
                    >
                      <RotateCcw size={15} aria-hidden="true" />
                      Reintentar
                    </button>
                    <button
                      type="button"
                      onClick={() => setItems((current) => current.filter((i) => i.id !== item.id))}
                      className="inline-flex min-h-[44px] items-center font-medium text-ink-soft underline underline-offset-4"
                    >
                      Descartar
                    </button>
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {pagesDone > 0 && !busy && (
        <p role="status" className="rounded-soft bg-marker/35 px-4 py-3 leading-relaxed text-ink">
          {pagesDone >= pagesPaid
            ? `Recibimos las ${pagesLabel(pagesPaid)}. Empezamos a traducir${
                turnaround ? ` y te enviamos el PDF en ${turnaround}` : ""
              }, al correo o WhatsApp que dejaste al pagar. Ya puedes cerrar esta página.`
            : `Recibimos ${pagesDone} de ${pagesLabel(pagesPaid)}. Sube ${
                pagesPaid - pagesDone === 1 ? "la que falta" : `las ${pagesPaid - pagesDone} que faltan`
              } para que empecemos a traducir.`}
        </p>
      )}

      <div className="flex flex-col gap-2 border-t border-line pt-5 text-[15px] text-ink-soft">
        <p>¿Lo subes más tarde? Guarda el enlace de esta página: aquí mismo puedes agregar archivos cuando quieras.</p>
        <button type="button" onClick={copyLink} className="btn-secondary self-start">
          {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
          {copied ? "Enlace copiado" : "Copiar enlace"}
        </button>
        <p className="mt-2">
          ¿Problemas para subirlos?{" "}
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline underline-offset-4">
            Envíalos por WhatsApp
          </a>
          .
        </p>
      </div>
    </div>
  );
}
