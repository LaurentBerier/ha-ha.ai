import { useEffect } from "react";
import { useLocation } from "wouter";
import { buildAppWebUrl, isAppWebBridgeConfigured } from "@/lib/appWebBridge";

export default function AppBridgePage() {
  const [location] = useLocation();
  const targetUrl = buildAppWebUrl(location);

  useEffect(() => {
    if (!targetUrl) {
      return;
    }
    window.location.replace(targetUrl);
  }, [targetUrl]);

  if (!isAppWebBridgeConfigured) {
    return (
      <div className="min-h-screen bg-background text-foreground grid place-items-center p-6">
        <div className="max-w-xl rounded-xl border border-border bg-card p-6">
          <h1 className="text-2xl font-bold mb-3">App web non configurée</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ajoute <code>VITE_HAHA_APP_WEB_URL</code> dans l&apos;environnement du site web pour
            rediriger vers l&apos;application React Native web du repo HAHA_app.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground grid place-items-center p-6">
      <div className="max-w-xl rounded-xl border border-border bg-card p-6">
        <h1 className="text-2xl font-bold mb-3">Ouverture de l&apos;application…</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Si la redirection ne démarre pas automatiquement, ouvre ce lien :
        </p>
        <a className="mt-3 inline-block text-primary underline break-all" href={targetUrl}>
          {targetUrl}
        </a>
      </div>
    </div>
  );
}
