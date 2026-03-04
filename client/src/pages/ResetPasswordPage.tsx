import { FormEvent, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";

export default function ResetPasswordPage() {
  const [, setLocation] = useLocation();
  const { session } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setErrorMessage(error.message);
        return;
      }
      setSuccessMessage("Mot de passe mis à jour. Redirection...");
      setTimeout(() => {
        setLocation("/app");
      }, 700);
    } catch {
      setErrorMessage("Mise à jour impossible pour le moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canReset = Boolean(session);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-xl border border-border bg-card p-6 space-y-4"
        data-testid="reset-password-page"
      >
        <h1 className="text-2xl font-bold">Nouveau mot de passe</h1>
        <p className="text-sm text-muted-foreground">
          Choisis un nouveau mot de passe pour ton compte.
        </p>
        {!canReset ? (
          <p className="text-sm text-destructive">
            Session de récupération introuvable. Rouvre le lien reçu par email.
          </p>
        ) : null}
        <Input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
        {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
        {successMessage ? <p className="text-sm text-emerald-500">{successMessage}</p> : null}
        <Button className="w-full" type="submit" disabled={isSubmitting || !canReset}>
          {isSubmitting ? "Mise à jour..." : "Mettre à jour"}
        </Button>
      </form>
    </div>
  );
}
