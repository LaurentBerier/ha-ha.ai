import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const [, setLocation] = useLocation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const resolve = async () => {
      const currentUrl = window.location.href;
      if (currentUrl.includes("code=")) {
        const { error } = await supabase.auth.exchangeCodeForSession(currentUrl);
        if (error) {
          if (mounted) {
            setErrorMessage(error.message);
          }
          return;
        }
      }

      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session?.user.id) {
        if (mounted) {
          setErrorMessage(error?.message ?? "Session introuvable.");
        }
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed,onboarding_skipped")
        .eq("id", data.session.user.id)
        .maybeSingle();

      if (!mounted) {
        return;
      }

      const completed = profile?.onboarding_completed ?? false;
      const skipped = profile?.onboarding_skipped ?? false;
      setLocation(completed || skipped ? "/app" : "/onboarding");
    };

    void resolve();
    return () => {
      mounted = false;
    };
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="max-w-md text-center space-y-3">
        <p className="text-lg font-semibold">Validation du compte en cours...</p>
        {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
      </div>
    </div>
  );
}
