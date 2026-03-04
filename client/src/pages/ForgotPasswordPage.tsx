import { FormEvent, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getRecoveryCallbackUrl } from "@/lib/authRedirect";
import { isSupabaseConfigured, supabase, supabaseConfigError } from "@/lib/supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isSupabaseConfigured) {
      setErrorMessage(supabaseConfigError);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: getRecoveryCallbackUrl(),
      });
      if (error) {
        setErrorMessage(error.message);
        return;
      }
      setSuccessMessage("Email envoyé. Vérifie ta boîte de réception.");
    } catch {
      setErrorMessage("Envoi impossible pour le moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-xl border border-border bg-card p-6 space-y-4"
        data-testid="forgot-password-page"
      >
        <h1 className="text-2xl font-bold">Mot de passe oublié</h1>
        <p className="text-sm text-muted-foreground">
          Entre ton email pour recevoir un lien de réinitialisation.
        </p>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
        {successMessage ? <p className="text-sm text-emerald-500">{successMessage}</p> : null}
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Envoi..." : "Envoyer le lien"}
        </Button>
        <p className="text-sm text-muted-foreground">
          <Link href="/login" className="underline">Retour à la connexion</Link>
        </p>
      </form>
    </div>
  );
}
