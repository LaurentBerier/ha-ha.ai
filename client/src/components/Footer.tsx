import { type Language, copy } from '@/lib/i18n';

interface FooterProps {
  language: Language;
}

export function Footer({ language }: FooterProps) {
  const t = copy[language].footer;

  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-lg font-medium text-muted-foreground" data-testid="text-more-comedians">
            {t.moreComingSoon}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Ha-Ha.ai
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            {t.copyright}
          </p>

          <div className="flex items-center gap-4">
            <a
              href="mailto:cathy.gauthier@hotmail.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-contact"
            >
              {t.contact}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
