"use client";

import { useEffect } from "react";
import { type GtagItem } from "@/lib/gtag";

const WAIT_MS = 200;
// The tag loads when the page goes idle; give it up to 30 s on slow phones.
const MAX_TRIES = 150;

// Reports one paid order to Google Ads (the "Purchase" conversion) and to
// Google Analytics (a purchase). The order code is the transaction id, so
// Google drops repeats; the browser-side flag keeps reloads of the
// confirmation page from even sending them.
export function PurchaseTracking({
  adsSendTo,
  analyticsId,
  value,
  transactionId,
  item,
}: {
  adsSendTo: string | null;
  analyticsId: string | null;
  value: number;
  transactionId: string;
  item: GtagItem;
}) {
  const { item_name, price, quantity } = item;

  useEffect(() => {
    const flag = `certa-conversion-${transactionId}`;
    try {
      if (localStorage.getItem(flag)) return;
    } catch {
      // Storage blocked: Google's transaction-id dedupe still applies.
    }

    let tries = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const send = () => {
      if (!window.gtag) {
        if (++tries < MAX_TRIES) timer = setTimeout(send, WAIT_MS);
        return;
      }
      if (adsSendTo) {
        window.gtag("event", "conversion", { send_to: adsSendTo, value, currency: "USD", transaction_id: transactionId });
      }
      if (analyticsId) {
        window.gtag("event", "purchase", {
          send_to: analyticsId,
          transaction_id: transactionId,
          value,
          currency: "USD",
          items: [{ item_name, price, quantity }],
        });
      }
      try {
        localStorage.setItem(flag, "1");
      } catch {}
    };
    send();
    return () => clearTimeout(timer);
  }, [adsSendTo, analyticsId, value, transactionId, item_name, price, quantity]);

  return null;
}
