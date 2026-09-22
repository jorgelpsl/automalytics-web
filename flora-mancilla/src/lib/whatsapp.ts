import { SITE } from "@/data/site";

function buildWhatsAppUrl(message: string): string {
  const digits = SITE.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function generalWhatsAppUrl(): string {
  return buildWhatsAppUrl("Hola Flora, me gustaría agendar una hora de terapia.");
}

export function bookingWhatsAppUrl(params: { dateLabel: string; timeLabel: string; name: string; note: string }): string {
  const { dateLabel, timeLabel, name, note } = params;
  const lines = [
    "Hola Flora, quiero agendar una hora:",
    `Fecha: ${dateLabel}`,
    `Hora: ${timeLabel}`,
    `Nombre: ${name}`,
  ];
  if (note.trim()) lines.push(`Motivo: ${note.trim()}`);
  return buildWhatsAppUrl(lines.join("\n"));
}
