import { type Language, copy } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Laugh, Flame, Navigation, MessageCircle } from 'lucide-react';

interface ExamplesSectionProps {
  language: Language;
}

const icons = [Laugh, Flame, Navigation, MessageCircle];
const gradients = [
  'from-red-500/20 to-orange-500/20',
  'from-orange-500/20 to-yellow-500/20',
  'from-blue-500/20 to-cyan-500/20',
  'from-purple-500/20 to-pink-500/20',
];

export function ExamplesSection({ language }: ExamplesSectionProps) {
  const t = copy[language].examples;

  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.items.map((example, index) => {
            const Icon = icons[index];
            return (
              <Card
                key={index}
                className="p-8 hover-elevate transition-all duration-300 group"
                data-testid={`card-example-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-md bg-gradient-to-br ${gradients[index]} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{example.title}</h3>
                    <p className="text-muted-foreground">{example.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
