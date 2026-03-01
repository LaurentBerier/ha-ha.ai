import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";
import type { UserProfile } from "@/types/UserProfile";

interface AuthContextValue {
  session: Session | null;
  loading: boolean;
  userProfile: UserProfile | null;
  refreshProfile: () => Promise<UserProfile | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function mapProfileRow(row: any): UserProfile {
  return {
    id: row.id,
    age: row.age ?? null,
    sex: row.sex ?? null,
    relationshipStatus: row.relationship_status ?? null,
    horoscopeSign: row.horoscope_sign ?? null,
    interests: Array.isArray(row.interests) ? row.interests : [],
    onboardingCompleted: row.onboarding_completed ?? false,
    onboardingSkipped: row.onboarding_skipped ?? false,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async (): Promise<UserProfile | null> => {
    if (!isSupabaseConfigured) {
      setUserProfile(null);
      return null;
    }

    const userId = session?.user.id;
    if (!userId) {
      setUserProfile(null);
      return null;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("id,age,sex,relationship_status,horoscope_sign,interests,onboarding_completed,onboarding_skipped")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    const profile = data ? mapProfileRow(data) : null;
    setUserProfile(profile);
    return profile;
  };

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      if (!isSupabaseConfigured) {
        setSession(null);
        setUserProfile(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.getSession();
      if (!mounted) {
        return;
      }

      if (error) {
        setSession(null);
        setUserProfile(null);
        setLoading(false);
        return;
      }

      setSession(data.session);
      setLoading(false);
    };

    void bootstrap();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) {
        return;
      }
      setSession(nextSession);
      if (!nextSession) {
        setUserProfile(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session?.user.id) {
      setUserProfile(null);
      return;
    }
    void refreshProfile();
  }, [session?.user.id]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      loading,
      userProfile,
      refreshProfile,
      signOut: async () => {
        await supabase.auth.signOut();
        setSession(null);
        setUserProfile(null);
      },
    }),
    [loading, session, userProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
