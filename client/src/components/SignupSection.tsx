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
    <section id="signup" className="py-12 sm:py-16 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${stageImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" data-testid="button-signup-cta">
            <Link href="/app">
              {t.button}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" data-testid="button-login-cta">
            <Link href="/app">{t.secondaryButton}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
