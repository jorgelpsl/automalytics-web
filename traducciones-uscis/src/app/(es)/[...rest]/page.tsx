import { notFound } from "next/navigation";

// Any URL that matches no page lands here, so the 404 renders inside the
// Spanish layout (header, footer, document list) instead of a bare page.
export default function UnmatchedPage() {
  notFound();
}
