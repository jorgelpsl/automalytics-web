import type { Metadata, Viewport } from "next";
import "../globals.css";
import { SiteShell } from "@/components/SiteShell";
import { rootMetadata } from "@/lib/seo";

export const metadata: Metadata = rootMetadata("en");

export const viewport: Viewport = {
  themeColor: "#FAFAF7",
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="en">{children}</SiteShell>;
}
