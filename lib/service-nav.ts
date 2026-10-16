import { serviceFilters, type ServiceCategory } from "@/content/site-data";

// Lets nav links (mega menu, mobile drawer) open The Menu on a specific category.
// Same page: a window event switches the tab instantly. Coming from another page
// (e.g. a blog post): the choice waits in sessionStorage for The Menu to pick up on mount.
export const SERVICE_EVENT = "bh:service";
const KEY = "bh-service";

export const categoryForLabel = (label: string) =>
  serviceFilters.find((f) => f.label === label)?.key;

export function selectService(key: ServiceCategory | undefined) {
  if (!key) return;
  try {
    sessionStorage.setItem(KEY, key);
  } catch {
    // storage blocked: same-page event below still works
  }
  window.dispatchEvent(new CustomEvent<ServiceCategory>(SERVICE_EVENT, { detail: key }));
}

export function takePendingService(): ServiceCategory | null {
  try {
    const v = sessionStorage.getItem(KEY) as ServiceCategory | null;
    sessionStorage.removeItem(KEY);
    return v && serviceFilters.some((f) => f.key === v) ? v : null;
  } catch {
    return null;
  }
}
