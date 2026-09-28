"use client";

import { useState, useTransition } from "react";
import { Check, MessageCircle, Pencil, RotateCcw, Trash2 } from "lucide-react";
import { deleteOrder, setOrderStatus } from "@/app/admin/actions";
import { formatDeadline } from "@/lib/order";
import { formatUsd } from "@/lib/pricing";
import { OrderEditForm } from "./OrderEditForm";
import { OrderFiles } from "./OrderFiles";
import type { AdminFile, AdminOrder } from "./types";

const dateTime = new Intl.DateTimeFormat("es", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/New_York",
});

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <dt className="text-ink-muted">{label}</dt>
      <dd className="min-w-0 break-words">{children}</dd>
    </>
  );
}

export function OrderCard({ order, files }: { order: AdminOrder; files: AdminFile[] }) {
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const uploaded = files.reduce((sum, f) => sum + f.pages, 0);
  const completed = order.status === "completado";
  const docsLabel =
    uploaded === 0 ? "Sin documentos" : uploaded >= order.pages ? "Documentos completos" : `${uploaded} de ${order.pages} páginas`;

  function run(action: () => Promise<{ ok: boolean; error?: string }>) {
    startTransition(async () => {
      setError(null);
      const result = await action();
      if (!result.ok) setError(result.error ?? "Algo salió mal. Intenta de nuevo.");
    });
  }

  return (
    <li className="flex flex-col gap-5 rounded-card border border-line bg-paper-sheet p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="font-display text-2xl font-medium">{order.code}</span>
        <span className="text-sm text-ink-muted">{dateTime.format(new Date(order.createdAt))}</span>
        <span
          className={`inline-flex items-center gap-1 rounded-soft px-2 py-0.5 text-sm font-medium ${
            completed ? "bg-ink text-paper" : "border border-ink/30 text-ink"
          }`}
        >
          {completed && <Check size={14} strokeWidth={2.6} aria-hidden="true" />}
          {completed ? "Completado" : "En proceso"}
        </span>
        <span
          className={`rounded-soft px-2 py-0.5 text-sm font-medium tabular-nums ${
            uploaded >= order.pages ? "bg-paper-alt text-ink-soft" : "bg-marker/60 text-ink"
          }`}
        >
          {docsLabel}
        </span>
        {order.edited && <span className="text-sm text-ink-muted">· Editado</span>}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {editing ? (
          <OrderEditForm order={order} onDone={() => setEditing(false)} />
        ) : (
          <dl className="grid grid-cols-[auto_1fr] content-start gap-x-5 gap-y-1.5 text-[15px] tabular-nums">
            <Detail label="Cliente">
              <span className="font-medium">{order.name}</span>
            </Detail>
            <Detail label="Documento">{order.documentType}</Detail>
            <Detail label="Páginas">
              {order.pages}
              {order.pagesPaid !== order.pages ? ` (pagó ${order.pagesPaid})` : ""} · {formatUsd(order.amountTotal)}
            </Detail>
            {order.deadline && <Detail label="Para el">{formatDeadline(order.deadline)}</Detail>}
            {order.notes && <Detail label="Comentarios">{order.notes}</Detail>}
            {order.email && (
              <Detail label="Correo">
                <a href={`mailto:${order.email}`} className="break-all underline underline-offset-4">
                  {order.email}
                </a>
              </Detail>
            )}
            {order.phone && (
              <Detail label="Teléfono">
                <a
                  href={`https://wa.me/${order.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 underline underline-offset-4"
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  {order.phone}
                </a>
              </Detail>
            )}
          </dl>
        )}
        <OrderFiles code={order.code} files={files} />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}

      {confirmDelete ? (
        <div className="flex flex-col gap-3 rounded-soft border border-red-700/30 p-4">
          <p className="text-[15px] leading-relaxed text-ink">
            ¿Eliminar el pedido {order.code}? Se borran sus {files.length ? `${files.length} documentos` : "datos del panel"} y el
            cliente ya no podrá subir archivos. <strong>El pago no se reembolsa:</strong> si corresponde, hazlo en Stripe.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => run(() => deleteOrder(order.code))}
              disabled={pending}
              className="btn-primary bg-red-700 hover:bg-red-800"
            >
              {pending ? "Eliminando…" : "Eliminar pedido"}
            </button>
            <button type="button" onClick={() => setConfirmDelete(false)} disabled={pending} className="btn-secondary">
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        !editing && (
          <div className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
            {completed ? (
              <button
                type="button"
                onClick={() => run(() => setOrderStatus(order.code, "en_proceso"))}
                disabled={pending}
                className="btn-secondary"
              >
                <RotateCcw size={17} aria-hidden="true" />
                Volver a en proceso
              </button>
            ) : (
              <button
                type="button"
                onClick={() => run(() => setOrderStatus(order.code, "completado"))}
                disabled={pending}
                className="btn-primary"
              >
                <Check size={17} aria-hidden="true" />
                {pending ? "Guardando…" : "Marcar como completado"}
              </button>
            )}
            <button type="button" onClick={() => setEditing(true)} disabled={pending} className="btn-secondary">
              <Pencil size={16} aria-hidden="true" />
              Editar
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              disabled={pending}
              className="ml-auto inline-flex min-h-[44px] items-center gap-1.5 px-2 text-sm font-medium text-red-700 hover:underline"
            >
              <Trash2 size={16} aria-hidden="true" />
              Eliminar
            </button>
          </div>
        )
      )}
    </li>
  );
}
