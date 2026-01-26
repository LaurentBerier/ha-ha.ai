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
  const tOrb = copy[language].whatItIs;

  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 tracking-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                {t.headline}
              </span>
            </h1>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              {t.subheadline}
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10">
              {t.description}
            </p>

            <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 sm:p-8 mb-8 max-w-lg mx-auto lg:mx-0">
              <h3 className="text-xl sm:text-2xl font-bold mb-2" data-testid="text-waitlist-headline">
                {t.waitlistHeadline}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6" data-testid="text-waitlist-description">
                {t.waitlistDescription}
              </p>
              <Button
                size="lg"
                onClick={scrollToWaitlist}
                className="w-full sm:w-auto"
                data-testid="button-hero-cta-primary"
              >
                {t.ctaPrimary}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] mx-auto">
                <img 
                  src={phoneImage} 
                  alt="Ha-Ha.ai App" 
                  className="relative w-full h-auto z-10"
                  data-testid="img-phone-mockup"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20" style={{ top: '10%', bottom: '16%', left: '6%', right: '6%' }}>
                  <InteractiveCloud />
                </div>
              </div>
              
              <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-muted-foreground/70 italic" data-testid="text-orb-hint">
                {tOrb.orbHint}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
