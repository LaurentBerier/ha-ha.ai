import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { isSupabaseConfigured, supabase, supabaseConfigError } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const [, setLocation] = useLocation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const resolve = async () => {
      if (!isSupabaseConfigured) {
        if (mounted) {
          setErrorMessage(supabaseConfigError);
        }
        return;
      }

      const url = new URL(window.location.href);
      const hashParams = new URLSearchParams(url.hash.replace(/^#/, ""));
      const code = url.searchParams.get("code");
      const tokenHash = url.searchParams.get("token_hash") ?? hashParams.get("token_hash");
      const otpTypeRaw = url.searchParams.get("type") ?? hashParams.get("type");
      const flow = url.searchParams.get("flow");

      const tryVerifyOtpFallback = async () => {
        if (!tokenHash || !otpTypeRaw) {
          return false;
        }

        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: otpTypeRaw as "signup" | "email" | "recovery" | "invite" | "magiclink" | "email_change",
        });

        if (error) {
          if (mounted) {
            setErrorMessage(error.message ?? "Erreur de validation.");
          }
          return false;
        }

        return true;
      };

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
        if (error) {
          const rawMessage = error.message ?? "Erreur de validation.";
          const isMissingVerifier = rawMessage.toLowerCase().includes("code verifier");

          if (isMissingVerifier) {
            const verified = await tryVerifyOtpFallback();
            if (!verified) {
              if (mounted) {
                setErrorMessage(
                  "Lien de confirmation ouvert sur un autre domaine/appareil. Rouvre le lien dans le même navigateur et le même domaine (www ou non-www) que lors de l'inscription."
                );
              }
              return;
            }
          } else {
            if (mounted) {
              setErrorMessage(rawMessage);
            }
            return;
          }
        }
      } else if (tokenHash && otpTypeRaw) {
        const verified = await tryVerifyOtpFallback();
        if (!verified) {
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

      const isRecoveryFlow = flow === "recovery" || otpTypeRaw === "recovery";
      if (isRecoveryFlow) {
        setLocation("/reset-password");
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
