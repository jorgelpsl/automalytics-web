"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// The Google tag's page location is pinned to a scrubbed URL (see
// SiteAnalytics), so it no longer notices in-app navigations by itself. This
// reports them, path only, after the first page view it already sent.
export function GooglePageViews({ analyticsId }: { analyticsId: string }) {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!window.gtag || pathname.startsWith("/admin")) return;
    const pageLocation = `${window.location.origin}${pathname}`;
    window.gtag("set", { page_location: pageLocation });
    window.gtag("event", "page_view", { send_to: analyticsId, page_location: pageLocation });
  }, [pathname, analyticsId]);

  return null;
}
