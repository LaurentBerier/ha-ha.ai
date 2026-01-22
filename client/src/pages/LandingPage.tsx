import { useState } from 'react';
import { type Language } from '@/lib/i18n';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { PersonalitySection } from '@/components/PersonalitySection';
import { ExamplesSection } from '@/components/ExamplesSection';
import { WhyItWorksSection } from '@/components/WhyItWorksSection';
import { WaitlistSection } from '@/components/WaitlistSection';
import { Footer } from '@/components/Footer';

export default function LandingPage() {
  const [language, setLanguage] = useState<Language>('fr');

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatedBackground />
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="relative z-10">
        <HeroSection language={language} />
        <FeaturesSection language={language} />
        <PersonalitySection language={language} />
        <ExamplesSection language={language} />
        <WhyItWorksSection language={language} />
        <WaitlistSection language={language} />
      </main>

      <Footer language={language} />
    </div>
  );
}
