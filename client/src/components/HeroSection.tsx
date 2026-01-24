import { type Language, copy } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { InteractiveCloud } from './InteractiveCloud';
import phoneImage from '@assets/Cellphone_Trans_1769281442558.png';

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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                {t.headline}
              </span>
            </h1>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-6">
              {t.subheadline}
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
              {t.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
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

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-8 opacity-50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-muted-foreground">
                  {language === 'fr' ? 'En développement' : 'In development'}
                </span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="relative flex items-center justify-center">
              <div className="relative">
                <img 
                  src={phoneImage} 
                  alt="Ha-Ha.ai App" 
                  className="relative w-64 sm:w-80 md:w-96 h-auto z-10"
                  data-testid="img-phone-mockup"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20" style={{ top: '12%', bottom: '18%', left: '8%', right: '8%' }}>
                  <InteractiveCloud />
                </div>
              </div>

              <div className="absolute -right-4 sm:right-4 top-1/4 z-10 hidden md:block">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-xl blur-lg" />
                  <div className="relative bg-card border border-border rounded-xl p-3 shadow-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs text-muted-foreground ml-2">Ha-Ha.ai</span>
                    </div>
                    <div className="w-48 h-28 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                      <div className="text-center p-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-2 animate-pulse" />
                        <p className="text-xs text-muted-foreground">
                          {language === 'fr' ? 'Parlez-moi!' : 'Talk to me!'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -left-4 sm:left-4 bottom-1/4 z-10 hidden md:block">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl blur-lg" />
                  <div className="relative bg-card border border-border rounded-lg p-3 shadow-2xl max-w-[180px]">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium mb-1">Ha-Ha.ai</p>
                        <p className="text-xs text-muted-foreground">
                          {language === 'fr' 
                            ? "Pourquoi le WiFi est tombé? Parce qu'il avait une mauvaise connexion!" 
                            : "Why did WiFi break up? Bad connection!"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
