// Recent lucide-react releases dropped brand/logo glyphs (Instagram, TikTok)
// from the core icon set. These two small outline marks fill that gap,
// matching the stroke weight of the surrounding Lucide icons so they read
// as part of the same icon system rather than a mismatched drop-in.

export function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.5 2h-3v13.2a2.8 2.8 0 1 1-2-2.68V9.4a5.8 5.8 0 1 0 5 5.75V8.9a7.6 7.6 0 0 0 4.5 1.46V7.36A4.6 4.6 0 0 1 16.5 2Z" />
    </svg>
  );
}
