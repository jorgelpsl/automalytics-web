import { MessageCircle } from "lucide-react";

export function WhatsAppButton({
  href,
  label = "Agendar por WhatsApp",
  variant = "solid",
  className = "",
}: {
  href: string;
  label?: string;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-soft px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5";
  const styles =
    variant === "solid"
      ? "bg-wine text-cream hover:bg-wine-deep"
      : "border border-wine/30 bg-transparent text-wine hover:bg-wine/5";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      <MessageCircle size={17} aria-hidden="true" />
      {label}
    </a>
  );
}
