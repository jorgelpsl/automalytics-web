import { SITE } from "@/data/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="26" height="30" viewBox="0 0 26 30" aria-hidden="true" className="shrink-0">
        <path d="M1 1h16l8 8v20H1z" fill="#FFFFFF" stroke="#14213D" strokeWidth="2" strokeLinejoin="round" />
        <path d="M17 1v8h8" fill="none" stroke="#14213D" strokeWidth="2" strokeLinejoin="round" />
        <rect x="5" y="20" width="16" height="5" fill="#F5C24B" />
        <path d="M6 14.5l3 3 6-6.5" fill="none" stroke="#14213D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-display text-[1.35rem] font-semibold leading-none tracking-tight text-ink">
        {SITE.shortName}
        <span className="ml-1.5 font-body text-sm font-medium text-ink-muted">Traducciones</span>
      </span>
    </span>
  );
}
