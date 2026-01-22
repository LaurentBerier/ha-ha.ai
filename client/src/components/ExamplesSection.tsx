import { type Language, copy } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Laugh, Flame, Navigation, MessageCircle } from 'lucide-react';
import phoneImage from '@assets/image_1769047319135.png';

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {t.items.map((example, index) => {
              const Icon = icons[index];
              return (
                <Card
                  key={index}
                  className="p-6 hover-elevate transition-all duration-300 group"
                  data-testid={`card-example-${index}`}
                >
                  <div className={`w-12 h-12 rounded-md bg-gradient-to-br ${gradients[index]} flex items-center justify-center flex-shrink-0 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
                  <p className="text-sm text-muted-foreground">{example.description}</p>
                </Card>
              );
            })}
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl" />
              <img 
                src={phoneImage} 
                alt="Ha-Ha.ai App" 
                className="relative w-64 h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
