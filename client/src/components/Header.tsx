import { type Language, copy } from '@/lib/i18n';
import logoImage from '@assets/logo-neon_NoText_BIG.png';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const t = copy[language];

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <img src={logoImage} alt={t.nav.logo} className="h-10 w-10 rounded-md object-contain" />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`rounded-md border px-3 py-1.5 text-sm ${
                language === 'en'
                  ? 'border-[#4066ff] bg-[#11224c] text-foreground'
                  : 'border-[#263751] bg-[#07132a]/80 text-[#c2cfde]'
              }`}
              data-testid="button-lang-en"
            >
              English
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('fr')}
              className={`rounded-md border px-3 py-1.5 text-sm ${
                language === 'fr'
                  ? 'border-[#4066ff] bg-[#11224c] text-foreground'
                  : 'border-[#263751] bg-[#07132a]/80 text-[#c2cfde]'
              }`}
              data-testid="button-lang-fr"
            >
              Français
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
