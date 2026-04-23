import { type Language, copy } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mic, Sparkles, Flame } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

interface SignupSectionProps {
  language: Language;
}

export function SignupSection({ language }: SignupSectionProps) {
  const t = copy[language].cta;

  return (
    <section id="signup" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[28rem] h-[28rem] bg-primary/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[28rem] h-[28rem] bg-secondary/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow"
        style={{ animationDelay: '1.5s' }}
      />

      <motion.div
        className="absolute top-12 left-[12%] text-primary/40"
        animate={{ y: [0, -14, 0], rotate: [-8, 8, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <Mic className="w-10 h-10 sm:w-14 sm:h-14" />
      </motion.div>
      <motion.div
        className="absolute bottom-12 right-[12%] text-secondary/40"
        animate={{ y: [0, 14, 0], rotate: [8, -8, 8] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        aria-hidden
      >
        <Flame className="w-10 h-10 sm:w-14 sm:h-14" />
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-[18%] text-yellow-400/40"
        animate={{ y: [0, -10, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        aria-hidden
      >
        <Sparkles className="w-7 h-7 sm:w-9 sm:h-9" />
      </motion.div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl blur-lg opacity-40 animate-gradient" style={{ backgroundSize: '200% 200%' }} />

          <div className="relative bg-card/60 backdrop-blur-md border border-border/60 rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-foreground to-secondary bg-clip-text text-transparent animate-gradient"
              style={{ backgroundSize: '200% 200%' }}
              data-testid="text-cta-title"
            >
              {t.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-cta-description">
              {t.description}
            </p>
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto text-base px-8 h-12 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all"
              data-testid="button-cta-try-now"
            >
              <Link href="/app">
                {t.button}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
