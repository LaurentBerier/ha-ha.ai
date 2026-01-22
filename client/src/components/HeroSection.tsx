import { type Language, copy } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import fleurDeLisImage from '@assets/image_1769047259460.png';

interface HeroSectionProps {
  language: Language;
}

export function HeroSection({ language }: HeroSectionProps) {
  const t = copy[language].hero;

  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFeatures = () => {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden lg:block">
        <img 
          src={fleurDeLisImage} 
          alt="" 
          className="w-[500px] h-auto"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
            {t.headline}
          </span>
        </h1>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-6">
          {t.subheadline}
        </h2>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          {t.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={scrollToWaitlist}
            className="w-full sm:w-auto"
            data-testid="button-hero-cta-primary"
          >
            {t.ctaPrimary}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToFeatures}
            className="w-full sm:w-auto"
            data-testid="button-hero-cta-secondary"
          >
            {t.ctaSecondary}
          </Button>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 opacity-50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">
              {language === 'fr' ? 'En développement' : 'In development'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
