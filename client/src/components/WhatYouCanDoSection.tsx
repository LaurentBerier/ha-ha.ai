import { Badge } from '@/components/ui/badge';
import { type Language, copy } from '@/lib/i18n';
import {
  Flame,
  ImagePlus,
  MessageCircleMore,
  MessageSquareQuote,
  Sparkles,
  Stars,
  Wand2,
} from 'lucide-react';

interface WhatYouCanDoSectionProps {
  language: Language;
}

export function WhatYouCanDoSection({ language }: WhatYouCanDoSectionProps) {
  const t = copy[language].whatYouCanDo;
  const itemIcons = {
    'mets-moi-sur-le-grill': Flame,
    'generateur-de-meme': ImagePlus,
    'jugement-de-texto': MessageSquareQuote,
    'tarot-cathy': Stars,
    'message-personnalise': MessageCircleMore,
    'coach-de-vie': Wand2,
  } as const;
  const itemTagStyles = {
    'mets-moi-sur-le-grill':
      'bg-gradient-to-r from-red-500/20 to-orange-400/20 border-red-400/50 text-red-100 shadow-[0_0_18px_rgba(248,113,113,0.45)]',
    'generateur-de-meme':
      'bg-gradient-to-r from-fuchsia-500/20 to-pink-400/20 border-fuchsia-400/50 text-fuchsia-100 shadow-[0_0_18px_rgba(232,121,249,0.45)]',
    'jugement-de-texto':
      'bg-gradient-to-r from-cyan-500/20 to-sky-400/20 border-cyan-400/50 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.45)]',
    'coach-de-vie':
      'bg-gradient-to-r from-lime-500/20 to-emerald-400/20 border-lime-400/50 text-lime-100 shadow-[0_0_18px_rgba(163,230,53,0.4)]',
    'message-personnalise':
      'bg-gradient-to-r from-indigo-500/20 to-violet-400/20 border-indigo-400/50 text-indigo-100 shadow-[0_0_18px_rgba(129,140,248,0.45)]',
    'tarot-cathy':
      'bg-gradient-to-r from-amber-500/20 to-rose-400/20 border-amber-400/50 text-amber-100 shadow-[0_0_18px_rgba(251,191,36,0.45)]',
  } as const;

  return (
    <section id="features" className="py-14 sm:py-20 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-[8%] w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute -bottom-20 right-[10%] w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: '1.2s' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4"
          data-testid="text-whatyoucando-title"
        >
          {t.title}
        </h2>
        <p
          className="text-center text-muted-foreground max-w-3xl mx-auto mb-10"
          data-testid="text-whatyoucando-subtitle"
        >
          {t.sectionSubtitle}
        </p>

        <div className="relative rounded-[30px] border border-white/10 bg-card/35 backdrop-blur-xl p-5 sm:p-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-secondary/[0.08]" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {t.items.map((item, index) => {
              const ItemIcon = itemIcons[item.id as keyof typeof itemIcons] ?? Sparkles;

              return (
                <article
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-28px_rgba(255,80,80,0.45)]"
                  style={{ animationDelay: `${index * 80}ms` }}
                  data-testid={`card-feature-${item.id}`}
                >
                  <div className="pointer-events-none absolute -top-8 -right-8 w-24 h-24 rounded-full bg-secondary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-secondary/[0.08] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex items-center justify-between mb-4">
                    <Badge
                      variant="outline"
                      className={`bg-white/5 text-foreground/90 font-semibold tracking-wide ${itemTagStyles[item.id as keyof typeof itemTagStyles] ?? 'border-white/20'}`}
                    >
                      {item.tag}
                    </Badge>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <ItemIcon className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  <h4
                    className="relative z-10 text-lg font-bold mb-2 leading-tight"
                    data-testid={`text-feature-title-${item.id}`}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="relative z-10 text-sm text-muted-foreground leading-relaxed"
                    data-testid={`text-feature-description-${item.id}`}
                  >
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
