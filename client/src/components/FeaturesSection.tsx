import { type Language, copy } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Mic, Laugh, User, MapPin } from 'lucide-react';

interface FeaturesSectionProps {
  language: Language;
}

const icons = [Mic, Laugh, User, MapPin];

export function FeaturesSection({ language }: FeaturesSectionProps) {
  const t = copy[language].features;

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.items.map((feature, index) => {
            const Icon = icons[index];
            return (
              <Card
                key={index}
                className="p-6 hover-elevate transition-all duration-300 group"
                data-testid={`card-feature-${index}`}
              >
                <div className="w-12 h-12 rounded-md bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
