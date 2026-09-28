import Script from "next/script";
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

// Google Ads tag, needed to attribute paid orders to ad clicks. The page
// location is reported without its query string except utm_* and gclid, for
// the same reason as above, and the owner's panel is never tagged.
function googleAdsSetup(id: string) {
  return `
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
if (location.pathname.indexOf("/admin") !== 0) {
  var url = new URL(location.href);
  Array.from(url.searchParams.keys()).forEach(function (key) {
    if (key.indexOf("utm_") !== 0 && key !== "gclid" && key !== "gbraid" && key !== "wbraid") url.searchParams.delete(key);
  });
  window.gtag("js", new Date());
  window.gtag("config", ${JSON.stringify(id)}, { page_location: url.toString() });
}`;
}

export function SiteAnalytics() {
  const adsId = SITE.googleAdsId;
  return (
    <>
      <Script id="vercel-analytics-queue" strategy="afterInteractive">
        {QUEUE_AND_SCRUB}
      </Script>
      <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      {adsId && (
        <>
          <Script id="google-ads-setup" strategy="afterInteractive">
            {googleAdsSetup(adsId)}
          </Script>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`} strategy="afterInteractive" />
        </>
      )}
    </>
  );
}
