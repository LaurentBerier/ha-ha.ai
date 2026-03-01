import { FormEvent, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isSupabaseConfigured, supabase, supabaseConfigError } from "@/lib/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isSupabaseConfigured) {
      setErrorMessage(supabaseConfigError);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectTo,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setSuccessMessage("Compte créé. Vérifie ton email pour confirmer ton compte.");
    } catch {
      setErrorMessage("Création du compte impossible pour le moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onApple = async () => {
    if (!isSupabaseConfigured) {
      setErrorMessage(supabaseConfigError);
      return;
    }
    setErrorMessage(null);
    const redirectTo = `${window.location.origin}/auth/callback`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: { redirectTo },
    });

    if (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-xl border border-border bg-card p-6 space-y-4" data-testid="signup-page">
        <h1 className="text-2xl font-bold">Créer un compte</h1>
        <Input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <Input type="password" placeholder="Mot de passe" value={password} onChange={(event) => setPassword(event.target.value)} required />
        <Input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
        {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
        {successMessage ? <p className="text-sm text-emerald-500">{successMessage}</p> : null}
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Création..." : "Créer mon compte"}
        </Button>
        <Button type="button" variant="secondary" className="w-full" onClick={() => void onApple()}>
          Sign in with Apple
        </Button>
        <p className="text-sm text-muted-foreground">
          Déjà un compte? <Link href="/login" className="underline">Se connecter</Link>
        </p>
      </form>
    </div>
  );
}
