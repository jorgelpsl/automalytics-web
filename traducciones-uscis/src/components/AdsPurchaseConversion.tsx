"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const WAIT_MS = 200;
const MAX_TRIES = 50;

// Reports one paid order to Google Ads. The order code is the transaction id,
// so Google drops repeats; the browser-side flag keeps reloads of the
// confirmation page from even sending them.
export function AdsPurchaseConversion({
  sendTo,
  value,
  transactionId,
}: {
  sendTo: string;
  value: number;
  transactionId: string;
}) {
  useEffect(() => {
    const flag = `certa-conversion-${transactionId}`;
    try {
      if (localStorage.getItem(flag)) return;
    } catch {
      // Storage blocked: Google's transaction-id dedupe still applies.
    }

    let tries = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    // The tag loads after hydration, so wait for it rather than race it.
    const send = () => {
      if (!window.gtag) {
        if (++tries < MAX_TRIES) timer = setTimeout(send, WAIT_MS);
        return;
      }
      window.gtag("event", "conversion", { send_to: sendTo, value, currency: "USD", transaction_id: transactionId });
      try {
        localStorage.setItem(flag, "1");
      } catch {}
    };
    send();
    return () => clearTimeout(timer);
  }, [sendTo, value, transactionId]);

  return null;
}
