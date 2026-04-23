import { useState, lazy, Suspense } from 'react';
import { type Language } from '@/lib/i18n';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { Footer } from '@/components/Footer';
import brickBg from '@assets/Brick_BG_Tile_1776963604932.png';

const WhatItIsSection = lazy(() => import('@/components/WhatItIsSection').then(m => ({ default: m.WhatItIsSection })));
const WhatYouCanDoSection = lazy(() => import('@/components/WhatYouCanDoSection').then(m => ({ default: m.WhatYouCanDoSection })));
const PersonalitySection = lazy(() => import('@/components/PersonalitySection').then(m => ({ default: m.PersonalitySection })));
const SignupSection = lazy(() => import('@/components/SignupSection').then(m => ({ default: m.SignupSection })));

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const AnimatedBackground = lazy(() => import('@/components/AnimatedBackground').then(m => ({ default: m.AnimatedBackground })));

export default function LandingPage() {
  const [language, setLanguage] = useState<Language>('fr');

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* Brick wall background */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          backgroundImage: `url(${brickBg})`,
          backgroundSize: '600px auto',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center top',
        }}
        data-testid="bg-brick"
      />
      {/* Darkening overlay to keep the brick subtle */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none bg-black/70"
        style={{ zIndex: 0 }}
      />
      {/* Subtle moving light highlight to keep it alive */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none bg-haha-light"
        style={{ zIndex: 0 }}
      />
      {/* Vignette: darker at edges */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.9) 100%)',
        }}
      />
      {!isMobile && (
        <Suspense fallback={null}>
          <AnimatedBackground />
        </Suspense>
      )}
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="relative z-10">
        <HeroSection language={language} />
        <Suspense fallback={<div className="h-32" />}>
          <PersonalitySection language={language} />
          <WhatItIsSection language={language} />
          <WhatYouCanDoSection language={language} />
          <SignupSection language={language} />
        </Suspense>
      </main>

      <Footer language={language} />
    </div>
  );
}
