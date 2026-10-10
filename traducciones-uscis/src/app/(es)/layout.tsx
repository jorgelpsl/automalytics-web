import type { Metadata, Viewport } from "next";
import "../globals.css";
import { SiteShell } from "@/components/SiteShell";
import { rootMetadata } from "@/lib/seo";

export const metadata: Metadata = rootMetadata("es");

export const viewport: Viewport = {
  themeColor: "#FAFAF7",
};

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="es">{children}</SiteShell>;
}
