const numberFormatter = new Intl.NumberFormat("es-CL", {
  maximumFractionDigits: 0,
});

// Matches the "$4.990 CLP" style used throughout the brand brief rather
// than Intl's default currency format (which drops the "CLP" suffix).
export function formatCLP(amount: number): string {
  return `$${numberFormatter.format(amount)} CLP`;
}
