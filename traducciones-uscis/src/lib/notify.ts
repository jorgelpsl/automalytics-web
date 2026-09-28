// Server-only: emails the owner when a sale happens and when a client
// uploads documents, through Resend's REST API. Off until RESEND_API_KEY and
// NOTIFY_EMAIL exist. Resend's shared sender only delivers to the Resend
// account's own address, which is exactly who this goes to.
import { head, put } from "@vercel/blob";
import { SITE } from "@/data/site";
import { uploadsEnabled } from "@/lib/features";
import { formatDeadline } from "@/lib/order";
import { formatUsd } from "@/lib/pricing";
import type { PaidOrder } from "@/lib/stripe";

export function notificationsEnabled(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL) && uploadsEnabled();
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function orderTable(order: PaidOrder, extra: [string, string][] = []): string {
  const rows: [string, string][] = [
    ["Pedido", order.code],
    ["Cliente", order.name],
    ["Documento", order.documentType],
    ["Páginas pagadas", String(order.pages)],
    ["Total", formatUsd(order.amountTotal)],
    ...extra,
    ["Correo", order.email],
    ["Teléfono", order.phone],
    ["Para el", formatDeadline(order.deadline)],
    ["Comentarios", order.notes],
  ];
  return `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:15px">${rows
    .filter(([, value]) => value)
    .map(([label, value]) => `<tr><td style="color:#5B6478">${label}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`)
    .join("")}</table>`;
}

async function sendEmail(subject: string, html: string): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.NOTIFY_FROM ?? `${SITE.name} <onboarding@resend.dev>`,
      to: [process.env.NOTIFY_EMAIL],
      subject,
      html,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

// A tiny private marker per event makes each email go out once, even if the
// client reloads the confirmation page. Kept outside pedidos/ so it never
// shows up as a document.
async function once(marker: string, send: () => Promise<void>): Promise<void> {
  const pathname = `avisos/${marker}`;
  try {
    await head(pathname);
    return;
  } catch {
    // Not sent yet.
  }
  await send();
  await put(pathname, "1", { access: "private", addRandomSuffix: false, allowOverwrite: true, contentType: "text/plain" });
}

export async function notifySale(order: PaidOrder): Promise<void> {
  if (!notificationsEnabled()) return;
  await once(`${order.code}/venta`, () =>
    sendEmail(
      `Nueva venta ${order.code} · ${formatUsd(order.amountTotal)} · ${order.documentType}`,
      `<p style="font-family:Arial,sans-serif;font-size:16px">Pagaron un pedido en ${SITE.name}. Los documentos llegan cuando el cliente los suba; te avisamos también.</p>${orderTable(order)}<p><a href="${SITE.url}/admin">Ver pedidos</a></p>`,
    ),
  );
}

export async function notifyDocuments(order: PaidOrder, pagesUploaded: number, files: number): Promise<void> {
  if (!notificationsEnabled() || pagesUploaded === 0) return;
  await once(`${order.code}/documentos-${pagesUploaded}`, () =>
    sendEmail(
      `Documentos de ${order.code}: ${pagesUploaded} de ${order.pages} ${order.pages === 1 ? "página" : "páginas"}`,
      `<p style="font-family:Arial,sans-serif;font-size:16px">${escapeHtml(order.name)} subió sus documentos.</p>${orderTable(order, [
        ["Subido", `${pagesUploaded} de ${order.pages} páginas en ${files} ${files === 1 ? "archivo" : "archivos"}`],
      ])}<p><a href="${SITE.url}/admin">Abrir los documentos</a></p>`,
    ),
  );
}
