import { type Language, copy } from '@/lib/i18n';
import { Badge } from '@/components/ui/badge';
import { Quote } from 'lucide-react';

interface PersonalitySectionProps {
  language: Language;
}

export function PersonalitySection({ language }: PersonalitySectionProps) {
  const t = copy[language].personality;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto lg:mx-0 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl blur-2xl" />
              <div className="relative bg-card rounded-2xl border border-border overflow-hidden h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 flex items-center justify-center">
                    <span className="text-5xl font-bold text-foreground">CG</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{t.title}</h3>
                  <p className="text-muted-foreground">{t.subtitle}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Quote className="w-5 h-5 text-primary" />
              </div>
              <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed">
                {t.description}
              </blockquote>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              {t.traits.map((trait, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-sm px-4 py-1"
                  data-testid={`badge-trait-${index}`}
                >
                  {trait}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
