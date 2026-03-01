import { type Language, copy } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { ChatSimulation } from './ChatSimulation';

interface HeroSectionProps {
  language: Language;
}

export function HeroSection({ language }: HeroSectionProps) {
  const t = copy[language].hero;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 pb-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
                asChild
                size="lg"
                className="w-full sm:w-auto"
                data-testid="button-hero-cta-primary"
              >
                <Link href="/signup">
                  {t.ctaPrimary}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative flex justify-center">
            <div className="relative w-[280px] sm:w-[320px] md:w-[360px] h-[560px] sm:h-[640px] md:h-[720px]">
              <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/20 via-yellow-500/10 to-red-500/20 rounded-[3rem] blur-2xl" />
              
              <div className="relative w-full h-full bg-zinc-900 rounded-[2.5rem] border-4 border-zinc-800 shadow-2xl overflow-hidden">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10" />
                
                <div className="w-full h-full pt-4">
                  <ChatSimulation language={language} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
