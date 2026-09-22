"use client";

import { useState, type FormEvent } from "react";
import { SITE } from "@/data/site";

// No contact-form backend exists yet, so instead of a dead-end "submit"
// button, this composes the message into a real WhatsApp link and opens it
// — the same channel every other CTA in the app uses.
export function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = `Hola SensiPlayTime 👋 Soy ${name || "un cliente"}. ${message}`;
    const digits = SITE.whatsappNumber.replace(/\D/g, "");
    window.open(`https://wa.me/${digits}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-brand-dark">
        Tu nombre
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-brand-dark outline-none focus:border-brand-turquoise"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-brand-dark">
        Tu mensaje
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-brand-dark outline-none focus:border-brand-turquoise"
        />
      </label>
      <button
        type="submit"
        className="inline-flex w-fit items-center justify-center rounded-full bg-brand-turquoise px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#38b0a9]"
      >
        Enviar por WhatsApp
      </button>
    </form>
  );
}
