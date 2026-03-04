import { type Language, copy } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'wouter';
import logoImage from '@assets/image_1769047272252.png';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const t = copy[language];
  const { session, userProfile, loading, profileLoading } = useAuth();
  const onboardingDone = userProfile?.onboardingCompleted || userProfile?.onboardingSkipped;
  const appHref = onboardingDone ? '/app' : '/onboarding';
  const appLabel = onboardingDone ? t.nav.openApp : t.nav.continueOnboarding;
  const showAppAccess = !loading && !profileLoading && Boolean(session);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-2">
            <img 
              src={logoImage} 
              alt="Ha-Ha.ai" 
              className="h-10 w-10 rounded-md object-cover"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t.nav.logo}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {showAppAccess ? (
              <Button asChild variant="outline" size="sm" data-testid="button-open-app">
                <Link href={appHref}>{appLabel}</Link>
              </Button>
            ) : null}

            <div className="flex items-center bg-muted rounded-md p-0.5">
              <Button
                variant={language === 'fr' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onLanguageChange('fr')}
                data-testid="button-lang-fr"
              >
                FR
              </Button>
              <Button
                variant={language === 'en' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onLanguageChange('en')}
                data-testid="button-lang-en"
              >
                EN
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
