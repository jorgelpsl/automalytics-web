import Script from "next/script";
import { GooglePageViews } from "@/components/GooglePageViews";
import { SITE } from "@/data/site";

// Cookieless page views through Vercel Web Analytics, loaded as its plain
// script (no package needed). Before each event is sent, the owner's panel is
// dropped and URLs keep only utm_* parameters, so the Stripe session id on the
// payment confirmation page never leaves the browser. The script is served
// only once Analytics is enabled for the project in Vercel.
const QUEUE_AND_SCRUB = `
window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
window.va("beforeSend", function (event) {
  try {
    var url = new URL(event.url);
    if (url.pathname.indexOf("/admin") === 0) return null;
    Array.from(url.searchParams.keys()).forEach(function (key) {
      if (key.indexOf("utm_") !== 0) url.searchParams.delete(key);
    });
    return Object.assign({}, event, { url: url.toString() });
  } catch (e) {
    return null;
  }
});`;

// One Google tag serves Google Ads (to attribute paid orders to ad clicks) and
// Google Analytics. Every hit reports the page location without its query
// string except utm_* and the ad click ids, for the same reason as above, and
// the owner's panel is never tagged.
function googleTagSetup(ids: string[]) {
  return `
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
if (location.pathname.indexOf("/admin") !== 0) {
  var url = new URL(location.href);
  Array.from(url.searchParams.keys()).forEach(function (key) {
    if (key.indexOf("utm_") !== 0 && key !== "gclid" && key !== "gbraid" && key !== "wbraid") url.searchParams.delete(key);
  });
  window.gtag("js", new Date());
  window.gtag("set", { page_location: url.toString() });
  ${JSON.stringify(ids)}.forEach(function (id) { window.gtag("config", id); });
}`;
}

export function SiteAnalytics() {
  const googleIds = [SITE.googleAdsId, SITE.googleAnalyticsId].filter((id): id is string => Boolean(id));
  return (
    <>
      <Script id="vercel-analytics-queue" strategy="afterInteractive">
        {QUEUE_AND_SCRUB}
      </Script>
      <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      {googleIds.length > 0 && (
        <>
          {/* Loaded once the page is idle: the tag weighs ~400 KB of script and
              would otherwise compete with the page for the main thread. */}
          <Script id="google-tag-setup" strategy="lazyOnload">
            {googleTagSetup(googleIds)}
          </Script>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleIds[0]}`} strategy="lazyOnload" />
          {SITE.googleAnalyticsId && <GooglePageViews analyticsId={SITE.googleAnalyticsId} />}
        </>
      )}
    </>
  );
}
