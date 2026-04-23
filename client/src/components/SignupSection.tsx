import { type Language, copy } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import stageImage from '@assets/image_1769047346055.png';

interface SignupSectionProps {
  language: Language;
}

export function SignupSection({ language }: SignupSectionProps) {
  const t = copy[language].cta;

  return (
    <section id="signup" className="py-16 sm:py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${stageImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" data-testid="text-cta-title">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8" data-testid="text-cta-description">
            {t.description}
          </p>
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto text-base px-8"
            data-testid="button-cta-try-now"
          >
            <Link href="/app">
              {t.button}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
