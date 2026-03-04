import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import LandingPage from "@/pages/LandingPage";
import AdminPage from "@/pages/AdminPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import AuthCallbackPage from "@/pages/AuthCallbackPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import OnboardingPage from "@/pages/OnboardingPage";
import AppHomePage from "@/pages/AppHomePage";
import NotFound from "@/pages/not-found";

function RequireSession({ children }: { children: JSX.Element }) {
  const { session, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !session) {
      setLocation("/login");
    }
  }, [loading, session, setLocation]);

  if (loading || !session) {
    return <div className="min-h-screen bg-background" />;
  }

  return children;
}

function RequireOnboarding({ children }: { children: JSX.Element }) {
  const { loading, profileLoading, session, userProfile } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (loading || profileLoading) {
      return;
    }
    if (!session) {
      setLocation("/login");
      return;
    }

    const done = userProfile?.onboardingCompleted || userProfile?.onboardingSkipped;
    if (!done) {
      setLocation("/onboarding");
    }
  }, [loading, profileLoading, session, setLocation, userProfile]);

  if (loading || profileLoading || !session) {
    return <div className="min-h-screen bg-background" />;
  }

  const done = userProfile?.onboardingCompleted || userProfile?.onboardingSkipped;
  if (!done) {
    return <div className="min-h-screen bg-background" />;
  }

  return children;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/reset-password" component={ResetPasswordPage} />
      <Route path="/auth/callback" component={AuthCallbackPage} />
      <Route path="/onboarding">
        {() => (
          <RequireSession>
            <OnboardingPage />
          </RequireSession>
        )}
      </Route>
      <Route path="/app">
        {() => (
          <RequireOnboarding>
            <AppHomePage />
          </RequireOnboarding>
        )}
      </Route>
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
