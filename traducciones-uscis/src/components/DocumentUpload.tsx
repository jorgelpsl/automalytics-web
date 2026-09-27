"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { AlertCircle, Check, Copy, FileText, LoaderCircle, RotateCcw, Upload } from "lucide-react";
import {
  ALLOWED_UPLOAD_TYPES,
  MAX_FILES_PER_ORDER,
  MAX_UPLOAD_BYTES,
  MAX_UPLOAD_MB,
  orderFolder,
  safeFileName,
} from "@/lib/upload-rules";

interface Item {
  id: string;
  name: string;
  size: number;
  status: "uploading" | "done" | "error";
  progress: number;
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

export function DocumentUpload({
  sessionId,
  orderCode,
  initialFiles,
  turnaround,
  whatsappUrl,
}: {
  sessionId: string;
  orderCode: string;
  initialFiles: { name: string; size: number }[];
  turnaround: string | null;
  whatsappUrl: string;
}) {
  const [items, setItems] = useState<Item[]>(() =>
    initialFiles.map((f, i) => ({ id: `stored-${i}`, name: f.name, size: f.size, status: "done", progress: 100 })),
  );
  const [notice, setNotice] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const patch = (id: string, changes: Partial<Item>) =>
    setItems((current) => current.map((item) => (item.id === id ? { ...item, ...changes } : item)));

  async function send(item: Item) {
    const file = item.file!;
    patch(item.id, { status: "uploading", progress: 0, error: undefined });
    try {
      await upload(`${orderFolder(orderCode)}${safeFileName(file.name)}`, file, {
        access: "private",
        handleUploadUrl: "/api/documents",
        clientPayload: JSON.stringify({ sessionId }),
        contentType: contentTypeOf(file) ?? undefined,
        multipart: file.size > 8 * 1024 * 1024,
        onUploadProgress: ({ percentage }) => patch(item.id, { progress: Math.round(percentage) }),
      });
      patch(item.id, { status: "done", progress: 100, file: undefined });
    } catch {
      patch(item.id, {
        status: "error",
        error: "No se pudo subir. Revisa tu conexión y vuelve a intentarlo.",
      });
    }
  }

  async function addFiles(fileList: FileList | null) {
    if (!fileList?.length) return;
    setNotice(null);
    const room = MAX_FILES_PER_ORDER - items.filter((i) => i.status !== "error").length;
    const accepted: Item[] = [];
    const rejected: string[] = [];

    for (const file of Array.from(fileList)) {
      if (!contentTypeOf(file)) rejected.push(`${file.name}: formato no admitido`);
      else if (file.size > MAX_UPLOAD_BYTES) rejected.push(`${file.name}: pesa más de ${MAX_UPLOAD_MB} MB`);
      else if (accepted.length >= room) rejected.push(`${file.name}: máximo ${MAX_FILES_PER_ORDER} archivos por pedido`);
      else
        accepted.push({
          id: `${Date.now()}-${accepted.length}-${file.name}`,
          name: file.name,
          size: file.size,
          status: "uploading",
          progress: 0,
          file,
        });
    }
    if (rejected.length) setNotice(`No subimos ${rejected.length === 1 ? "este archivo" : "estos archivos"}: ${rejected.join("; ")}.`);
    if (inputRef.current) inputRef.current.value = "";
    setItems((current) => [...current, ...accepted]);
    for (const item of accepted) await send(item);
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

  const done = items.filter((i) => i.status === "done").length;
  const busy = items.some((i) => i.status === "uploading");

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-2xl font-medium">Sube tu documento</h2>
        <p className="mt-2 leading-relaxed text-ink-soft">
          Una foto por cada página, con buena luz y sin cortar los bordes, o el PDF si lo tienes escaneado.
        </p>
      </div>

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
        <span className="text-lg font-medium text-ink">{done ? "Agregar más archivos" : "Elegir fotos o PDF"}</span>
        <span className="text-sm text-ink-muted">
          JPG, PNG, HEIC o PDF · hasta {MAX_UPLOAD_MB} MB cada uno · máximo {MAX_FILES_PER_ORDER} archivos
        </span>
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

      {notice && (
        <p role="alert" className="flex items-start gap-2 text-sm text-red-700">
          <AlertCircle size={17} aria-hidden="true" className="mt-0.5 shrink-0" />
          {notice}
        </p>
      )}

      {items.length > 0 && (
        <ul className="flex flex-col divide-y divide-line rounded-soft border border-line" aria-live="polite">
          {items.map((item) => (
            <li key={item.id} className="flex flex-col gap-2 px-4 py-3">
              <div className="flex items-center gap-3">
                <FileText size={18} aria-hidden="true" className="shrink-0 text-ink-muted" />
                <span className="min-w-0 flex-1 truncate text-[15px]">{item.name}</span>
                <span className="shrink-0 text-sm tabular-nums text-ink-muted">
                  {item.status === "uploading" ? `${item.progress}%` : formatSize(item.size)}
                </span>
                {item.status === "done" && (
                  <Check size={18} strokeWidth={2.6} className="shrink-0 text-ink" aria-label="Recibido" />
                )}
                {item.status === "uploading" && (
                  <LoaderCircle size={18} className="shrink-0 animate-spin text-ink-muted motion-reduce:animate-none" aria-label="Subiendo" />
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
                  <button
                    type="button"
                    onClick={() => void send(item)}
                    className="inline-flex min-h-[44px] items-center gap-1.5 font-medium text-ink underline underline-offset-4"
                  >
                    <RotateCcw size={15} aria-hidden="true" />
                    Reintentar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {done > 0 && !busy && (
        <p role="status" className="rounded-soft bg-marker/35 px-4 py-3 leading-relaxed text-ink">
          Recibimos {done} {done === 1 ? "archivo" : "archivos"}. Empezamos a traducir
          {turnaround ? ` y te enviamos el PDF en ${turnaround}` : ""}, al correo o WhatsApp que dejaste al pagar. Ya
          puedes cerrar esta página.
        </p>
      )}

      <div className="flex flex-col gap-2 border-t border-line pt-5 text-[15px] text-ink-soft">
        <p>
          ¿Lo subes más tarde? Guarda el enlace de esta página: aquí mismo puedes agregar archivos cuando quieras.
        </p>
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
