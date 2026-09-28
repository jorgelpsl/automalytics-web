declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export interface GtagItem {
  item_name: string;
  price: number;
  quantity: number;
}

// Sends to every Google tag destination configured on the page (Ads and
// Analytics). A no-op when the tag isn't set up or is blocked.
export function gtagEvent(name: string, params: Record<string, unknown>) {
  window.gtag?.("event", name, params);
}
