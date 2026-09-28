"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { uploadPresigned } from "@vercel/blob/client";
import { FileText, LoaderCircle, Plus, X } from "lucide-react";
import { deleteOrderDocument } from "@/app/admin/actions";
import { countPdfPages } from "@/lib/pdf-pages";
import { MAX_UPLOAD_BYTES, MAX_UPLOAD_MB, contentTypeOf, formatFileSize, uploadPathname } from "@/lib/upload-rules";
import type { AdminFile } from "./types";

export function OrderFiles({ code, files }: { code: string; files: AdminFile[] }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function remove(pathname: string) {
    startTransition(async () => {
      setError(null);
      const result = await deleteOrderDocument(code, pathname);
      setConfirming(null);
      if (!result.ok) setError(result.error);
    });
  }

  async function add(fileList: FileList | null) {
    const chosen = Array.from(fileList ?? []);
    if (inputRef.current) inputRef.current.value = "";
    if (!chosen.length) return;
    setError(null);
    const failed: string[] = [];

    for (const [index, file] of chosen.entries()) {
      const type = contentTypeOf(file);
      if (!type || file.size > MAX_UPLOAD_BYTES) {
        failed.push(`${file.name} (${type ? `más de ${MAX_UPLOAD_MB} MB` : "formato no admitido"})`);
        continue;
      }
      const label = chosen.length > 1 ? `Subiendo ${index + 1} de ${chosen.length}` : "Subiendo";
      setProgress(`${label}…`);
      try {
        const pages = type === "application/pdf" ? await countPdfPages(file).catch(() => 1) : 1;
        await uploadPresigned(uploadPathname(code, file.name, pages), file, {
          access: "private",
          handleUploadUrl: "/api/admin/documents",
          contentType: type,
          onUploadProgress: ({ percentage }) => setProgress(`${label}… ${Math.round(percentage)}%`),
        });
      } catch {
        failed.push(file.name);
      }
    }

    setProgress(null);
    if (failed.length) setError(`No se pudo subir: ${failed.join(", ")}. Intenta de nuevo.`);
    router.refresh();
  }

  const busy = pending || progress !== null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-ink-muted">Documentos</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-soft px-2 text-sm font-medium text-ink hover:bg-paper-alt disabled:opacity-50"
        >
          <Plus size={16} aria-hidden="true" />
          Agregar documentos
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,application/pdf,.heic,.heif"
          onChange={(e) => void add(e.target.files)}
          className="sr-only"
          tabIndex={-1}
          aria-label={`Agregar documentos al pedido ${code}`}
        />
      </div>

      {files.length ? (
        <ul className="flex flex-col divide-y divide-line rounded-soft border border-line">
          {files.map((file) => (
            <li key={file.pathname} className="flex min-h-[48px] items-center gap-2 pl-3 pr-1">
              {confirming === file.pathname ? (
                <>
                  <span className="min-w-0 flex-1 truncate text-[15px]">¿Quitar {file.name}?</span>
                  <button
                    type="button"
                    onClick={() => remove(file.pathname)}
                    disabled={pending}
                    className="min-h-[44px] px-2 text-sm font-medium text-red-700 underline underline-offset-4"
                  >
                    {pending ? "Quitando…" : "Quitar"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirming(null)}
                    disabled={pending}
                    className="min-h-[44px] px-2 text-sm font-medium text-ink-soft underline underline-offset-4"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <a
                    href={`/api/admin/file?p=${encodeURIComponent(file.pathname)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-[44px] min-w-0 flex-1 items-center gap-3 py-1.5"
                  >
                    <FileText size={18} aria-hidden="true" className="shrink-0 text-ink-muted" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate group-hover:underline">{file.name}</span>
                      <span className="block text-sm tabular-nums text-ink-muted">
                        {file.pages} {file.pages === 1 ? "página" : "páginas"} · {formatFileSize(file.size)}
                      </span>
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setConfirming(file.pathname)}
                    disabled={busy}
                    aria-label={`Quitar ${file.name}`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-soft text-ink-muted hover:bg-paper-alt hover:text-ink disabled:opacity-40"
                  >
                    <X size={17} aria-hidden="true" />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[15px] leading-relaxed text-ink-soft">
          El cliente todavía no sube nada. Puede hacerlo desde el enlace de su confirmación de pago, o agrégalos tú si te
          los mandó por WhatsApp.
        </p>
      )}

      {progress && (
        <p className="flex items-center gap-2 text-sm text-ink-soft" aria-live="polite">
          <LoaderCircle size={16} aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
          {progress}
        </p>
      )}
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
