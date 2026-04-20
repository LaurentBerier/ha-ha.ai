import { Route, Switch, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import LandingPage from "@/pages/LandingPage";
import AdminPage from "@/pages/AdminPage";
import AppBridgePage from "@/pages/AppBridgePage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import PrivacyPolicyPageEn from "@/pages/PrivacyPolicyPageEn";
import NotFound from "@/pages/not-found";
import { trackPageView } from "@/lib/analytics";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/app" component={AppBridgePage} />
      <Route path="/app/chat/cathy-gauthier" component={AppBridgePage} />
      <Route path="/app/account" component={AppBridgePage} />
      <Route path="/app/account/edit-profile" component={AppBridgePage} />
      <Route path="/app/account/subscription" component={AppBridgePage} />
      <Route path="/login" component={AppBridgePage} />
      <Route path="/signup" component={AppBridgePage} />
      <Route path="/forgot-password" component={AppBridgePage} />
      <Route path="/reset-password" component={AppBridgePage} />
      <Route path="/auth/callback" component={AppBridgePage} />
      <Route path="/onboarding" component={AppBridgePage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/politique-confidentialite" component={PrivacyPolicyPage} />
      <Route path="/privacy-policy" component={PrivacyPolicyPageEn} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AnalyticsTracker() {
  const [location] = useLocation();

  useEffect(() => {
    const pagePath = `${location}${window.location.search}`;
    trackPageView(pagePath);
  }, [location]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AnalyticsTracker />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
