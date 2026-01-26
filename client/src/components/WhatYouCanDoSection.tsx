import { type Language, copy } from '@/lib/i18n';
import { Sun, Brain, MessageSquare, HeartHandshake, Flame, Navigation } from 'lucide-react';

interface WhatYouCanDoSectionProps {
  language: Language;
}

export function WhatYouCanDoSection({ language }: WhatYouCanDoSectionProps) {
  const t = copy[language].whatYouCanDo;
  
  const icons = [Sun, Brain, MessageSquare, HeartHandshake, Flame, Navigation];

  return (
    <section id="features" className="py-12 sm:py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10" data-testid="text-whatyoucando-title">
          {t.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div 
                key={index} 
                className="relative group"
                data-testid={`card-feature-${index}`}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 h-full">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2" data-testid={`text-feature-title-${index}`}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground" data-testid={`text-feature-description-${index}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
