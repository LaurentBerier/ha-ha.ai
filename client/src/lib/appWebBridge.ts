function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

export const appWebBaseUrl = trimTrailingSlash(
  (import.meta.env.VITE_HAHA_APP_WEB_URL as string | undefined)?.trim() ?? "",
);

export const isAppWebBridgeConfigured = appWebBaseUrl.length > 0;

export function buildAppWebUrl(currentPath: string): string {
  if (!isAppWebBridgeConfigured) {
    return "";
  }

  const targetPath =
    currentPath === "/app/account"
      ? "/settings"
      : currentPath === "/app/account/edit-profile"
        ? "/settings/edit-profile"
        : currentPath === "/app/account/subscription"
          ? "/settings/subscription"
          : currentPath === "/app/chat/cathy-gauthier"
            ? "/mode-select/cathy-gauthier"
            : "/";

  return `${appWebBaseUrl}${targetPath}`;
}
