"use client";

import { useState, useTransition } from "react";
import { saveOrderEdits } from "@/app/admin/actions";
import { DOCUMENT_OPTIONS, MAX_NOTES, MAX_PAGES } from "@/lib/order";
import type { AdminOrder } from "./types";

const field =
  "mt-1.5 block min-h-[44px] w-full rounded-soft border border-ink/25 bg-paper-sheet px-3 text-base text-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";
const label = "text-sm font-medium text-ink-soft";

export function OrderEditForm({ order, onDone }: { order: AdminOrder; onDone: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const options = DOCUMENT_OPTIONS.includes(order.documentType) ? DOCUMENT_OPTIONS : [order.documentType, ...DOCUMENT_OPTIONS];
  const id = (name: string) => `${order.code}-${name}`;

  return (
    <form
      action={(formData) =>
        startTransition(async () => {
          setError(null);
          const result = await saveOrderEdits(order.code, formData);
          if (result.ok) onDone();
          else setError(result.error);
        })
      }
      className="grid gap-4 sm:grid-cols-2"
    >
      <div className="sm:col-span-2">
        <label htmlFor={id("name")} className={label}>Cliente</label>
        <input id={id("name")} name="name" defaultValue={order.name} required maxLength={100} className={field} />
      </div>
      <div>
        <label htmlFor={id("email")} className={label}>Correo</label>
        <input id={id("email")} name="email" type="email" defaultValue={order.email} className={field} />
      </div>
      <div>
        <label htmlFor={id("phone")} className={label}>Teléfono</label>
        <input id={id("phone")} name="phone" type="tel" defaultValue={order.phone} maxLength={30} className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={id("documentType")} className={label}>Documento</label>
        <select id={id("documentType")} name="documentType" defaultValue={order.documentType} className={field}>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={id("pages")} className={label}>Páginas</label>
        <input
          id={id("pages")}
          name="pages"
          type="number"
          inputMode="numeric"
          min={1}
          max={MAX_PAGES}
          defaultValue={order.pages}
          required
          aria-describedby={id("pages-hint")}
          className={field}
        />
        <p id={id("pages-hint")} className="mt-1.5 text-sm text-ink-muted">
          Es el máximo que el cliente puede subir. No cambia lo cobrado en Stripe
          {order.pagesPaid !== order.pages ? ` (pagó ${order.pagesPaid})` : ""}.
        </p>
      </div>
      <div>
        <label htmlFor={id("deadline")} className={label}>Para el</label>
        <input id={id("deadline")} name="deadline" type="date" defaultValue={order.deadline} className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={id("notes")} className={label}>Comentarios</label>
        <textarea id={id("notes")} name="notes" rows={3} maxLength={MAX_NOTES} defaultValue={order.notes} className={`${field} py-2`} />
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-700 sm:col-span-2">
          {error}
        </p>
      )}
      <div className="flex flex-wrap gap-3 sm:col-span-2">
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? "Guardando…" : "Guardar cambios"}
        </button>
        <button type="button" onClick={onDone} disabled={pending} className="btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  );
}
