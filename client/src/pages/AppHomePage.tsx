import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function AppHomePage() {
  const { session, userProfile, signOut } = useAuth();
  const onboardingDone = userProfile?.onboardingCompleted || userProfile?.onboardingSkipped;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#090D16] text-[#F4F7FF] p-6">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#2F63FF]/25 blur-3xl" />
      <div className="pointer-events-none absolute top-12 -right-24 h-80 w-80 rounded-full bg-[#FF4D5E]/20 blur-3xl" />

      <div className="relative max-w-2xl mx-auto">
        <div className="rounded-3xl border border-[#27344D] bg-[#121826] p-7 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
          <p className="mb-2 text-sm font-semibold tracking-[0.16em] uppercase text-[#94A3B8]">Ha-Ha.ai</p>
          <h1 className="text-4xl font-extrabold leading-tight">Espace utilisateur</h1>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-[#27344D] bg-[#0B1220] px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-[#94A3B8]">Connecté</p>
              <p className="mt-1 text-lg font-medium text-[#F4F7FF] break-all">{session?.user.email}</p>
            </div>

            <div className="rounded-xl border border-[#27344D] bg-[#0B1220] px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-[#94A3B8]">Onboarding</p>
              <div className="mt-2 inline-flex items-center rounded-full border border-[#27344D] bg-[#111827] px-3 py-1">
                <span className={`h-2 w-2 rounded-full ${onboardingDone ? "bg-[#2F63FF]" : "bg-[#FF4D5E]"}`} />
                <span className="ml-2 text-sm font-semibold text-[#CBD5E1]">
                  {onboardingDone ? "terminé" : "à compléter"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-[#2F63FF] border border-[#2F63FF] text-white hover:bg-[#3A6EFF]"
            >
              <Link href="/onboarding">Modifier onboarding</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-[#27344D] text-[#CBD5E1] hover:bg-[#1A2436]"
            >
              <Link href="/">Retour landing</Link>
            </Button>
          </div>

          <div className="mt-5">
            <Button
              variant="outline"
              className="border-[#FF4D5E] text-[#FF4D5E] hover:bg-[#FF4D5E]/10"
              onClick={() => void signOut()}
            >
              Se déconnecter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
