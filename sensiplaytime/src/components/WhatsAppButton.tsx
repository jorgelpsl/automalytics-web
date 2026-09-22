import { MessageCircle } from "lucide-react";

export function WhatsAppButton({
  href,
  label = "Comprar por WhatsApp",
  variant = "solid",
  className = "",
}: {
  href: string;
  label?: string;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-turquoise";
  const styles =
    variant === "solid"
      ? "bg-brand-turquoise text-white hover:bg-[#38b0a9]"
      : "border border-slate-200 bg-white text-brand-dark hover:border-brand-turquoise";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      <MessageCircle size={18} aria-hidden="true" />
      {label}
    </a>
  );
}
