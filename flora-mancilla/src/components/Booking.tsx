"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Clock } from "lucide-react";
import { bookingWhatsAppUrl } from "@/lib/whatsapp";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const TIME_SLOTS = ["09:00", "10:30", "12:00", "15:00", "16:30", "18:00"];

function nextBusinessDays(count: number): Date[] {
  const days: Date[] = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1);

  while (days.length < count) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) {
      days.push(new Date(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

const shortDateFormatter = new Intl.DateTimeFormat("es-CL", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

const longDateFormatter = new Intl.DateTimeFormat("es-CL", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

export function Booking() {
  const days = useMemo(() => nextBusinessDays(10), []);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  const canConfirm = Boolean(selectedDate && selectedTime && name.trim());

  const whatsappUrl = canConfirm
    ? bookingWhatsAppUrl({
        dateLabel: longDateFormatter.format(selectedDate as Date),
        timeLabel: selectedTime as string,
        name: name.trim(),
        note,
      })
    : "";

  return (
    <section id="agenda" className="bg-cream">
      <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-wine">
            Agenda tu hora
          </span>
          <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
            Elige un día y horario
          </h2>
          <p className="mt-4 text-ink/70">
            Propón un horario y te confirmo la hora por WhatsApp — ningún dato se guarda hasta que
            hablemos.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={120} className="mt-12 rounded-card border border-wine/12 bg-cream-alt p-6 shadow-soft sm:p-8">
          <div>
            <h3 className="flex items-center gap-2 font-display text-lg text-ink">
              <CalendarDays size={18} className="text-wine" aria-hidden="true" />
              Elige un día
            </h3>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Días disponibles">
              {days.map((day) => {
                const isSelected = selectedDate?.toDateString() === day.toDateString();
                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    onClick={() => setSelectedDate(day)}
                    aria-pressed={isSelected}
                    className={`flex min-w-[76px] shrink-0 flex-col items-center rounded-soft border px-3 py-2.5 text-sm capitalize transition-colors ${
                      isSelected
                        ? "border-wine bg-wine text-cream"
                        : "border-wine/20 bg-cream text-ink/80 hover:border-wine/50"
                    }`}
                  >
                    {shortDateFormatter.format(day)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="flex items-center gap-2 font-display text-lg text-ink">
              <Clock size={18} className="text-wine" aria-hidden="true" />
              Elige un horario
            </h3>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Horarios disponibles">
              {TIME_SLOTS.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    aria-pressed={isSelected}
                    className={`rounded-soft border px-4 py-2 text-sm transition-colors ${
                      isSelected
                        ? "border-wine bg-wine text-cream"
                        : "border-wine/20 bg-cream text-ink/80 hover:border-wine/50"
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm text-ink/80">
              Tu nombre
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="¿Cómo te llamas?"
                className="rounded-soft border border-wine/20 bg-cream px-3.5 py-2.5 text-ink placeholder:text-ink/40 focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/20"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm text-ink/80">
              Motivo de consulta (opcional)
              <input
                type="text"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Ej: ansiedad, autoestima..."
                className="rounded-soft border border-wine/20 bg-cream px-3.5 py-2.5 text-ink placeholder:text-ink/40 focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/20"
              />
            </label>
          </div>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            {canConfirm ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-soft bg-wine px-6 py-3 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5 sm:w-auto"
              >
                Confirmar por WhatsApp
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex w-full items-center justify-center gap-2 rounded-soft bg-wine/30 px-6 py-3 text-sm font-semibold text-cream/70 sm:w-auto"
              >
                Confirmar por WhatsApp
              </button>
            )}
            <p className="text-xs text-ink/50">Elige día, horario y tu nombre para continuar.</p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
