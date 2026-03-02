export function getAuthCallbackUrl(): string {
  const configured = (import.meta.env.VITE_PUBLIC_SITE_URL ?? "").trim();
  const base = configured || window.location.origin;
  return `${base.replace(/\/$/, "")}/auth/callback`;
}
