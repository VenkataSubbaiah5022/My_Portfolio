export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
export const CLARITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export const isAnalyticsEnabled = Boolean(GA_MEASUREMENT_ID || CLARITY_PROJECT_ID);
type GtagCommand = "config" | "event" | "js" | "set";

type Gtag = (
  command: GtagCommand,
  targetId: string | Date,
  config?: Record<string, string | number | boolean>,
) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (!isAnalyticsEnabled || !GA_MEASUREMENT_ID || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

export function trackOutboundClick(linkName: string, url: string, location: string) {
  trackEvent("outbound_click", {
    link_name: linkName,
    link_url: url,
    location,
  });
}

export function trackFileDownload(fileName: string, location: string) {
  trackEvent("file_download", {
    file_name: fileName,
    location,
  });
}

export function trackContactSubmit() {
  trackEvent("contact_form_submit", {
    form_name: "portfolio_contact",
  });
}

export function trackSectionView(sectionId: string) {
  trackEvent("section_view", {
    section_id: sectionId,
  });
}

export function trackNavClick(target: string, location: string) {
  trackEvent("nav_click", {
    nav_target: target,
    location,
  });
}
