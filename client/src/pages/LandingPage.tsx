import { useState, lazy, Suspense } from 'react';
import { type Language } from '@/lib/i18n';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { Footer } from '@/components/Footer';

const WhatItIsSection = lazy(() => import('@/components/WhatItIsSection').then(m => ({ default: m.WhatItIsSection })));
const WhatYouCanDoSection = lazy(() => import('@/components/WhatYouCanDoSection').then(m => ({ default: m.WhatYouCanDoSection })));
const PersonalitySection = lazy(() => import('@/components/PersonalitySection').then(m => ({ default: m.PersonalitySection })));
const WaitlistSection = lazy(() => import('@/components/WaitlistSection').then(m => ({ default: m.WaitlistSection })));

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const AnimatedBackground = lazy(() => import('@/components/AnimatedBackground').then(m => ({ default: m.AnimatedBackground })));

export default function LandingPage() {
  const [language, setLanguage] = useState<Language>('fr');

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {!isMobile && (
        <Suspense fallback={null}>
          <AnimatedBackground />
        </Suspense>
      )}
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="relative z-10">
        <HeroSection language={language} />
        <Suspense fallback={<div className="h-32" />}>
          <WhatItIsSection language={language} />
          <WhatYouCanDoSection language={language} />
          <PersonalitySection language={language} />
          <WaitlistSection language={language} />
        </Suspense>
      </main>

      <Footer language={language} />
    </div>
  );
}
