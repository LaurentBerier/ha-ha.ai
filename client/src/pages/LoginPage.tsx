import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAuthCallbackUrl } from "@/lib/authRedirect";
import { isSupabaseConfigured, supabase, supabaseConfigError } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { session } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session) {
      setLocation("/app");
    }
  }, [session, setLocation]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isSupabaseConfigured) {
      setErrorMessage(supabaseConfigError);
      return;
    }
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErrorMessage(error.message);
        return;
      }
      setLocation("/app");
    } catch {
      setErrorMessage("Connexion impossible pour le moment.");
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
    const redirectTo = getAuthCallbackUrl();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo,
      },
    });
    if (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-xl border border-border bg-card p-6 space-y-4" data-testid="login-page">
        <h1 className="text-2xl font-bold">Se connecter</h1>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Connexion..." : "Se connecter"}
        </Button>
        <Button type="button" variant="secondary" className="w-full" onClick={() => void onApple()}>
          Sign in with Apple
        </Button>
        <p className="text-sm text-muted-foreground">
          Pas encore de compte? <Link href="/signup" className="underline">Créer un compte</Link>
        </p>
      </form>
    </div>
  );
}
