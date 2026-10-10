import { notFound } from "next/navigation";

// Same as the Spanish catch-all, for unknown URLs under /en.
export default function UnmatchedEnglishPage() {
  notFound();
}
