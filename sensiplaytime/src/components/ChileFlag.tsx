export function ChileFlag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} role="img" aria-label="Bandera de Chile">
      <rect width="30" height="10" fill="#ffffff" />
      <rect y="10" width="30" height="10" fill="#D52B1E" />
      <rect width="10" height="10" fill="#0039A6" />
      <polygon
        points="5,2.2 6,5 8.8,5 6.6,6.7 7.4,9.4 5,7.7 2.6,9.4 3.4,6.7 1.2,5 4,5"
        fill="#ffffff"
      />
    </svg>
  );
}
