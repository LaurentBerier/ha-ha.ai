const gaMeasurementId =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim() ?? "";

const GA_SCRIPT_ID = "ga4-script";
let initialized = false;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function ensureGtag(): void {
  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args);
    };
  }
}

export function initializeAnalytics(): void {
  if (!gaMeasurementId || typeof window === "undefined") {
    return;
  }

  if (initialized) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  ensureGtag();

  if (!document.getElementById(GA_SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = GA_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
    document.head.appendChild(script);
  }

  const gtag = window.gtag;
  if (!gtag) {
    return;
  }

  gtag("js", new Date());
  gtag("config", gaMeasurementId, { send_page_view: false });
  initialized = true;
}

export function trackPageView(pagePath?: string): void {
  if (!gaMeasurementId || typeof window === "undefined") {
    return;
  }

  initializeAnalytics();

  const resolvedPath = pagePath ?? `${window.location.pathname}${window.location.search}`;

  window.gtag?.("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: resolvedPath,
  });
}
