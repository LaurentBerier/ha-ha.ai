import { type Language, copy } from '@/lib/i18n';

interface WhatItIsSectionProps {
  language: Language;
}

export function WhatItIsSection({ language }: WhatItIsSectionProps) {
  const t = copy[language].whatItIs;

  return (
    <section id="what-it-is" className="py-20 sm:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8" data-testid="text-whatitis-title">
          {t.title}
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto" data-testid="text-whatitis-description">
          {t.description}
        </p>
      </div>
    </section>
  );
}
