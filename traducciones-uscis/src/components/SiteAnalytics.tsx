import Script from "next/script";

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

export function SiteAnalytics() {
  return (
    <>
      <Script id="vercel-analytics-queue" strategy="afterInteractive">
        {QUEUE_AND_SCRUB}
      </Script>
      <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
    </>
  );
}
