import { type Language, copy } from '@/lib/i18n';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Menu } from 'lucide-react';
import { useLocation } from 'wouter';
import logoImage from '@assets/logo-neon_NoText_BIG.png';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const t = copy[language];
  const { session, userProfile, loading, profileLoading, signOut } = useAuth();
  const [location, setLocation] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onboardingDone = userProfile?.onboardingCompleted || userProfile?.onboardingSkipped;
  const appHref = onboardingDone ? '/app' : '/onboarding';
  const showAppAccess = !loading && !profileLoading && Boolean(session);
  const authMenuLabel = session ? t.nav.signOut : location === '/login' ? t.nav.signUp : t.nav.signIn;
  const accountMenuItems = showAppAccess
    ? [
        { label: onboardingDone ? t.nav.openApp : t.nav.continueOnboarding, route: appHref },
        { label: t.nav.settings, route: '/app/account' },
        { label: t.nav.editProfile, route: '/app/account/edit-profile' },
        { label: t.nav.subscription, route: '/app/account/subscription' },
      ]
    : [];

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigate = (path: string) => {
    closeMenu();
    setLocation(path);
  };

  const handleAuthMenuAction = async () => {
    closeMenu();
    if (session) {
      try {
        await signOut();
      } finally {
        setLocation('/');
      }
      return;
    }

    if (location === '/login') {
      setLocation('/signup');
      return;
    }

    setLocation('/login');
  };

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#2a3a5d] bg-[#060d1f]/95 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 rounded-md px-1 py-1 text-left"
            aria-label={t.nav.logo}
            data-testid="header-home-button"
          >
            <img
              src={logoImage}
              alt="Ha-Ha.ai"
              className="h-8 w-8 rounded-md object-contain"
            />
            <span className="text-[23px] font-bold tracking-tight text-foreground">
              {t.nav.logo}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="flex h-10 w-11 items-center justify-center rounded-xl border border-[#1f2b40] bg-[#0b1220]"
            aria-label="Open account menu"
            data-testid="header-menu-button"
          >
            <Menu className="h-5 w-5 text-foreground" />
          </button>
        </div>
      </div>
      {isMenuOpen ? (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-transparent" onMouseDown={closeMenu} aria-hidden="true" />
          <div
            onMouseDown={(event) => event.stopPropagation()}
            className="absolute right-4 top-[72px] min-w-[260px] rounded-2xl border border-[#2a3a5d] bg-[#0b1426] p-2 shadow-[0_18px_36px_rgba(0,0,0,0.38)]"
          >
            <p className="px-3 pb-1 pt-1 text-xs font-bold uppercase tracking-wide text-[#9bb0ca]">{t.nav.account}</p>
            {accountMenuItems.map((item) => (
              <button
                key={item.route}
                type="button"
                onClick={() => navigate(item.route)}
                className="mt-1 w-full rounded-xl border border-[#263751] bg-[#07132a] px-4 py-3 text-left text-[17px] font-semibold text-foreground"
              >
                {item.label}
              </button>
            ))}

            <div className="my-2 h-px bg-[#27344d]" />

            <p className="px-3 pb-1 pt-1 text-xs font-bold uppercase tracking-wide text-[#9bb0ca]">{t.nav.preferences}</p>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onLanguageChange('fr')}
                className={`rounded-xl border px-3 py-2 text-sm font-semibold ${
                  language === 'fr'
                    ? 'border-[#4066ff] bg-[#11224c] text-foreground'
                    : 'border-[#263751] bg-[#07132a] text-[#c2cfde]'
                }`}
                data-testid="button-lang-fr"
              >
                {t.nav.languageFr}
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`rounded-xl border px-3 py-2 text-sm font-semibold ${
                  language === 'en'
                    ? 'border-[#4066ff] bg-[#11224c] text-foreground'
                    : 'border-[#263751] bg-[#07132a] text-[#c2cfde]'
                }`}
                data-testid="button-lang-en"
              >
                {t.nav.languageEn}
              </button>
            </div>

            <div className="my-2 h-px bg-[#27344d]" />
            <button
              type="button"
              onClick={() => void handleAuthMenuAction()}
              className={`w-full rounded-xl border px-4 py-3 text-left text-[17px] font-semibold ${
                session
                  ? 'border-[#ff6a7a]/70 bg-[#2a1020] text-[#ffd4d9]'
                  : 'border-[#263751] bg-[#07132a] text-foreground'
              }`}
              data-testid="account-menu-auth-action"
            >
              {authMenuLabel}
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
