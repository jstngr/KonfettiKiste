import { logEvent } from "firebase/analytics";
import { getAnalyticsSafe } from "./firebase";

type EventParams = Record<string, string | number | boolean | null | undefined>;

export async function track(eventName: string, params?: EventParams) {
  const analytics = await getAnalyticsSafe();
  if (!analytics) return;
  logEvent(analytics, eventName, params);
}

export async function trackVisit() {
  await track("page_view", {
    page_location: window.location.href,
    page_path:
      window.location.pathname + window.location.search + window.location.hash,
    page_title: document.title,
    host: window.location.hostname, // nice for segmentation
  });
}
