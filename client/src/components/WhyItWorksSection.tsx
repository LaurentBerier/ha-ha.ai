import { type Language, copy } from '@/lib/i18n';
import { Shield, Heart, Zap, Users } from 'lucide-react';

interface WhyItWorksSectionProps {
  language: Language;
}

const icons = [Shield, Heart, Zap, Users];

export function WhyItWorksSection({ language }: WhyItWorksSectionProps) {
  const t = copy[language].whyItWorks;

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="text-center group"
                data-testid={`section-why-${index}`}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
