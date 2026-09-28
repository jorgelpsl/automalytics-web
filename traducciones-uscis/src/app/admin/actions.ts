"use server";

import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, ADMIN_SESSION_SECONDS, isAdmin, newSessionToken, passwordMatches } from "@/lib/admin-auth";
import { listOrderFiles } from "@/lib/documents";
import { adminEnabled } from "@/lib/features";
import { MAX_NOTES, MAX_PAGES } from "@/lib/order";
import { updateOrderRecord, type OrderEdits, type OrderStatus } from "@/lib/order-store";
import { orderFolder } from "@/lib/upload-rules";

export type ActionResult = { ok: true } | { ok: false; error: string };

const CODE_PATTERN = /^CT-[A-Z0-9]{6}$/;
const FAILED: ActionResult = { ok: false, error: "No se pudo guardar. Revisa tu conexión e intenta de nuevo." };

// Server actions are public endpoints; every one re-checks the session.
async function guard(code: string): Promise<ActionResult | null> {
  if (!adminEnabled() || !(await isAdmin())) return { ok: false, error: "Tu sesión expiró. Recarga la página y vuelve a entrar." };
  if (!CODE_PATTERN.test(code)) return { ok: false, error: "Pedido no válido." };
  return null;
}

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    // Slows down guessing without needing a rate-limit store.
    await new Promise((resolve) => setTimeout(resolve, 1500));
    redirect("/admin?error=1");
  }
  (await cookies()).set(ADMIN_COOKIE, newSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_SECONDS,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin");
}

export async function setOrderStatus(code: string, status: OrderStatus): Promise<ActionResult> {
  const denied = await guard(code);
  if (denied) return denied;
  if (status !== "en_proceso" && status !== "completado") return { ok: false, error: "Estado no válido." };
  try {
    await updateOrderRecord(code, (r) => ({
      ...r,
      status,
      completedAt: status === "completado" ? new Date().toISOString() : undefined,
    }));
  } catch (err) {
    console.error(err);
    return FAILED;
  }
  revalidatePath("/admin");
  return { ok: true };
}

export async function saveOrderEdits(code: string, formData: FormData): Promise<ActionResult> {
  const denied = await guard(code);
  if (denied) return denied;

  const text = (key: string) => String(formData.get(key) ?? "").trim();
  const edits: OrderEdits = {
    name: text("name"),
    email: text("email"),
    phone: text("phone"),
    documentType: text("documentType"),
    pages: Number(text("pages")),
    deadline: text("deadline"),
    notes: text("notes"),
  };
  if (!edits.name || edits.name.length > 100) return { ok: false, error: "Escribe el nombre del cliente (máximo 100 caracteres)." };
  if (edits.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(edits.email)) return { ok: false, error: "El correo no parece válido." };
  if (edits.phone!.length > 30) return { ok: false, error: "El teléfono es demasiado largo." };
  if (!edits.documentType || edits.documentType.length > 100) return { ok: false, error: "Elige el tipo de documento." };
  if (!Number.isInteger(edits.pages) || edits.pages! < 1 || edits.pages! > MAX_PAGES) {
    return { ok: false, error: `Las páginas deben ser un número entre 1 y ${MAX_PAGES}.` };
  }
  if (edits.deadline && !/^\d{4}-\d{2}-\d{2}$/.test(edits.deadline)) return { ok: false, error: "La fecha no es válida." };
  if (edits.notes!.length > MAX_NOTES) return { ok: false, error: `Los comentarios admiten hasta ${MAX_NOTES} caracteres.` };

  try {
    await updateOrderRecord(code, (r) => ({ ...r, edits }));
  } catch (err) {
    console.error(err);
    return FAILED;
  }
  revalidatePath("/admin");
  return { ok: true };
}

export async function deleteOrderDocument(code: string, pathname: string): Promise<ActionResult> {
  const denied = await guard(code);
  if (denied) return denied;
  if (!pathname.startsWith(orderFolder(code)) || pathname.includes("..")) return { ok: false, error: "Archivo no válido." };
  try {
    await del(pathname);
  } catch (err) {
    console.error(err);
    return { ok: false, error: "No se pudo quitar el archivo. Intenta de nuevo." };
  }
  revalidatePath("/admin");
  return { ok: true };
}

// Hides the order and deletes its documents. The Stripe payment stays as it
// is; refunds are done in Stripe.
export async function deleteOrder(code: string): Promise<ActionResult> {
  const denied = await guard(code);
  if (denied) return denied;
  try {
    await updateOrderRecord(code, (r) => ({ ...r, deleted: true }));
    const files = await listOrderFiles(code);
    if (files.length) await del(files.map((f) => f.pathname));
  } catch (err) {
    console.error(err);
    return { ok: false, error: "No se pudo eliminar el pedido. Intenta de nuevo." };
  }
  revalidatePath("/admin");
  return { ok: true };
}
