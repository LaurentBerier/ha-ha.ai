import { type Language, copy } from '@/lib/i18n';
import { Mic, MessageCircle, Zap, Laugh, Volume2, Sparkles } from 'lucide-react';

interface WhatItIsSectionProps {
  language: Language;
}

export function WhatItIsSection({ language }: WhatItIsSectionProps) {
  const t = copy[language].whatItIs;

  const floatingIcons = [
    { Icon: Mic, delay: '0s', x: '10%', y: '20%' },
    { Icon: MessageCircle, delay: '1s', x: '85%', y: '15%' },
    { Icon: Laugh, delay: '2s', x: '5%', y: '70%' },
    { Icon: Volume2, delay: '0.5s', x: '90%', y: '65%' },
    { Icon: Zap, delay: '1.5s', x: '15%', y: '45%' },
    { Icon: Sparkles, delay: '2.5s', x: '80%', y: '40%' },
  ];

  return (
    <section id="what-it-is" className="py-12 sm:py-16 relative overflow-hidden">
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <div
          key={index}
          className="absolute opacity-20 text-primary animate-pulse hidden md:block"
          style={{
            left: x,
            top: y,
            animationDelay: delay,
            animationDuration: '3s',
          }}
        >
          <Icon className="w-8 h-8" />
        </div>
      ))}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-3xl blur-3xl" />
          
          <div className="relative bg-card/30 backdrop-blur-sm border border-border/50 rounded-3xl p-6 sm:p-8 md:p-10">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">
                  {language === 'fr' ? 'Nouvelle technologie' : 'New technology'}
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" data-testid="text-whatitis-title">
                {t.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-background/50 border border-border/30">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 animate-bounce" style={{ animationDuration: '2s' }}>
                  <Mic className="w-7 h-7 text-primary" />
                </div>
                <span className="font-semibold mb-1">{language === 'fr' ? 'Voix' : 'Voice'}</span>
                <span className="text-sm text-muted-foreground">{language === 'fr' ? 'Elle parle vraiment' : 'She actually talks'}</span>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-background/50 border border-border/30">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 animate-bounce" style={{ animationDuration: '2.3s', animationDelay: '0.3s' }}>
                  <MessageCircle className="w-7 h-7 text-primary" />
                </div>
                <span className="font-semibold mb-1">{language === 'fr' ? 'Texte' : 'Text'}</span>
                <span className="text-sm text-muted-foreground">{language === 'fr' ? 'Ou par message' : 'Or by message'}</span>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-background/50 border border-border/30">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 animate-bounce" style={{ animationDuration: '2.6s', animationDelay: '0.6s' }}>
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <span className="font-semibold mb-1">{language === 'fr' ? '24/7' : '24/7'}</span>
                <span className="text-sm text-muted-foreground">{language === 'fr' ? 'N\'importe quand' : 'Anytime'}</span>
              </div>
            </div>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-center" data-testid="text-whatitis-description">
              {t.description}
            </p>

            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 border-2 border-background" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-background" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-teal-500 border-2 border-background" />
                </div>
                <span>{language === 'fr' ? 'D\'autres humoristes arrivent bientôt' : 'More comedians coming soon'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
