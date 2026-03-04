import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import {
  HOROSCOPE_OPTIONS,
  INTEREST_OPTIONS,
  RELATIONSHIP_OPTIONS,
  SEX_OPTIONS,
} from "@/lib/onboarding";
import type { HoroscopeSign, RelationshipStatus, Sex } from "@/types/UserProfile";

type Answers = {
  age: number | null;
  sex: Sex | null;
  relationshipStatus: RelationshipStatus | null;
  horoscopeSign: HoroscopeSign | null;
  interests: string[];
};

const TOTAL_STEPS = 5;

export default function OnboardingPage() {
  const [, setLocation] = useLocation();
  const { session, userProfile, profileLoading, refreshProfile } = useAuth();
  const [step, setStep] = useState(0);
  const [ageInput, setAgeInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answers>({
    age: null,
    sex: null,
    relationshipStatus: null,
    horoscopeSign: null,
    interests: [],
  });

  const progress = useMemo(() => `${Math.min(step + 1, TOTAL_STEPS)} / ${TOTAL_STEPS}`, [step]);

  const userId = session?.user.id;
  useEffect(() => {
    if (!userId) {
      setLocation("/login");
    }
  }, [setLocation, userId]);

  useEffect(() => {
    if (profileLoading) {
      return;
    }

    const done = userProfile?.onboardingCompleted || userProfile?.onboardingSkipped;
    if (done) {
      setLocation("/app");
    }
  }, [profileLoading, setLocation, userProfile]);

  if (!userId) {
    return null;
  }

  const save = async (patch: Partial<Answers> & { onboardingCompleted: boolean; onboardingSkipped: boolean }) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          age: patch.age,
          sex: patch.sex,
          relationship_status: patch.relationshipStatus,
          horoscope_sign: patch.horoscopeSign,
          interests: patch.interests,
          onboarding_completed: patch.onboardingCompleted,
          onboarding_skipped: patch.onboardingSkipped,
        })
        .eq("id", userId);

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      await refreshProfile();
      setLocation("/app");
    } catch {
      setErrorMessage("Impossible de sauvegarder pour le moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const skipAll = async () => {
    await save({ onboardingCompleted: false, onboardingSkipped: true });
  };

  const finish = async () => {
    await save({
      age: answers.age,
      sex: answers.sex,
      relationshipStatus: answers.relationshipStatus,
      horoscopeSign: answers.horoscopeSign,
      interests: answers.interests,
      onboardingCompleted: true,
      onboardingSkipped: false,
    });
  };

  const onAgeNext = () => {
    const parsed = Number.parseInt(ageInput, 10);
    const age = Number.isFinite(parsed) && parsed >= 13 && parsed <= 120 ? parsed : null;
    setAnswers((prev) => ({ ...prev, age }));
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-6 space-y-4" data-testid="onboarding-page">
        <p className="text-right text-sm text-muted-foreground">{progress}</p>
        <h1 className="text-2xl font-bold">Personnalisation</h1>
        {step === 0 ? (
          <p className="text-sm text-muted-foreground">
            Ces questions nous permettent de personnaliser ton expérience avec Cathy. Tes réponses ne seront jamais partagées avec des tiers.
          </p>
        ) : null}
        {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}

        {step === 0 ? (
          <div className="space-y-3">
            <p className="font-semibold">Quel est ton âge ?</p>
            <Input value={ageInput} onChange={(event) => setAgeInput(event.target.value)} placeholder="Ex: 28" />
            <Button onClick={onAgeNext} disabled={isSubmitting}>Continuer</Button>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="space-y-2">
            <p className="font-semibold">Comment tu te identifies ?</p>
            {SEX_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={answers.sex === option.value ? "default" : "outline"}
                className="mr-2 mb-2"
                onClick={() => {
                  setAnswers((prev) => ({ ...prev, sex: option.value }));
                  setStep(2);
                }}
                disabled={isSubmitting}
              >
                {option.label}
              </Button>
            ))}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-2">
            <p className="font-semibold">Ton statut amoureux ?</p>
            {RELATIONSHIP_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={answers.relationshipStatus === option.value ? "default" : "outline"}
                className="mr-2 mb-2"
                onClick={() => {
                  setAnswers((prev) => ({ ...prev, relationshipStatus: option.value }));
                  setStep(3);
                }}
                disabled={isSubmitting}
              >
                {option.label}
              </Button>
            ))}
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-2">
            <p className="font-semibold">Ton signe astrologique ?</p>
            {HOROSCOPE_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={answers.horoscopeSign === option.value ? "default" : "outline"}
                className="mr-2 mb-2"
                onClick={() => {
                  setAnswers((prev) => ({ ...prev, horoscopeSign: option.value }));
                  setStep(4);
                }}
                disabled={isSubmitting}
              >
                {option.label}
              </Button>
            ))}
          </div>
        ) : null}

        {step === 4 ? (
          <div className="space-y-3">
            <p className="font-semibold">Tes centres d'intérêt ?</p>
            <div>
              {INTEREST_OPTIONS.map((interest) => (
                <Button
                  key={interest}
                  variant={answers.interests.includes(interest) ? "default" : "outline"}
                  className="mr-2 mb-2"
                  onClick={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      interests: prev.interests.includes(interest)
                        ? prev.interests.filter((value) => value !== interest)
                        : [...prev.interests, interest],
                    }))
                  }
                  disabled={isSubmitting}
                >
                  {interest}
                </Button>
              ))}
            </div>
            <Button onClick={() => void finish()} disabled={isSubmitting}>
              {isSubmitting ? "Enregistrement..." : "Tout est prêt ! Bienvenue chez Ha-Ha."}
            </Button>
          </div>
        ) : null}

        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={() => {
              if (step < TOTAL_STEPS - 1) {
                setStep((value) => value + 1);
              }
            }}
            disabled={isSubmitting || step >= TOTAL_STEPS - 1}
          >
            Passer
          </Button>
          <Button variant="ghost" onClick={() => void skipAll()} disabled={isSubmitting}>
            Passer toutes les questions
          </Button>
        </div>
      </div>
    </div>
  );
}
