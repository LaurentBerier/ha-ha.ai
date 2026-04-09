import { useState } from 'react';
import { type Language, copy } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import stageImage from '@assets/image_1769047346055.png';

interface SignupSectionProps {
  language: Language;
}

export function SignupSection({ language }: SignupSectionProps) {
  const t = copy[language].cta;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.status === 201) {
        setStatus('success');
        setEmail('');
      } else if (res.status === 200 && data.message === 'Already on waitlist') {
        setStatus('already');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const isSubmitted = status === 'success' || status === 'already';

  return (
    <section id="signup" className="py-12 sm:py-16 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${stageImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.description}
          </p>
        </div>

        {isSubmitted ? (
          <div className="flex flex-col items-center gap-3 text-center" data-testid="waitlist-confirmation">
            <CheckCircle className="w-10 h-10 text-green-500" />
            <p className="text-lg font-medium">
              {status === 'already' ? t.already : t.success}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder={t.placeholder}
              className="w-full sm:w-80 px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              data-testid="input-waitlist-email"
            />
            <Button
              type="submit"
              size="lg"
              disabled={status === 'loading'}
              data-testid="button-waitlist-submit"
            >
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {t.button}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-center text-red-500 mt-3" data-testid="text-waitlist-error">
            {t.error}
          </p>
        )}
      </div>
    </section>
  );
}
