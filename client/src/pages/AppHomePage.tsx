import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function AppHomePage() {
  const { session, userProfile, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">Espace utilisateur</h1>
        <p className="text-muted-foreground">Connecté: {session?.user.email}</p>
        <p className="text-muted-foreground">
          Onboarding: {userProfile?.onboardingCompleted || userProfile?.onboardingSkipped ? "terminé" : "à compléter"}
        </p>
        <div className="flex gap-3">
          <Link href="/onboarding" className="underline">Modifier onboarding</Link>
          <Link href="/" className="underline">Retour landing</Link>
        </div>
        <Button variant="outline" onClick={() => void signOut()}>
          Se déconnecter
        </Button>
      </div>
    </div>
  );
}
