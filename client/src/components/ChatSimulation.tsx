import { useState, useEffect, useCallback } from 'react';
import { type Language } from '@/lib/i18n';
import { jokeExchangesFr, jokeExchangesEn } from '@/lib/jokeExchanges';
import { Video, Mic, MoreHorizontal, X, Send, Smile } from 'lucide-react';
import orbGif from "@assets/Orb_loop-ezgif.com-optimize.gif";

interface ChatSimulationProps {
  language: Language;
}

type AnimationPhase = 'idle' | 'userTyping' | 'userMessage' | 'cathyTyping' | 'cathyMessage' | 'complete';

const userNames = [
  'Mario L.',
  'Stéphane G.',
  'Marie O.',
  'Jean-François T.',
  'Sophie B.',
  'Patrick R.',
  'Isabelle M.',
  'Martin D.',
  'Nathalie C.',
  'Éric P.',
];

export function ChatSimulation({ language }: ChatSimulationProps) {
  const [exchangeIndex, setExchangeIndex] = useState(() => 
    Math.floor(Math.random() * jokeExchangesFr.length)
  );
  const [userName, setUserName] = useState(() => 
    userNames[Math.floor(Math.random() * userNames.length)]
  );
  const [phase, setPhase] = useState<AnimationPhase>('idle');
  const [userText, setUserText] = useState('');
  const [cathyText, setCathyText] = useState('');

  const exchanges = language === 'fr' ? jokeExchangesFr : jokeExchangesEn;
  const exchange = exchanges[exchangeIndex];

  useEffect(() => {
    setPhase('idle');
    setUserText('');
    setCathyText('');
    
    const startTimer = setTimeout(() => {
      setPhase('userTyping');
    }, 800);

    return () => clearTimeout(startTimer);
  }, [language, exchangeIndex]);

  const typeText = useCallback((
    fullText: string, 
    setter: (text: string) => void, 
    onComplete: () => void
  ) => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setter(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
        onComplete();
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!exchange) return;

    if (phase === 'userTyping') {
      const timer = setTimeout(() => {
        setPhase('userMessage');
      }, 600);
      return () => clearTimeout(timer);
    }

    if (phase === 'userMessage') {
      return typeText(exchange.user, setUserText, () => {
        setTimeout(() => setPhase('cathyTyping'), 400);
      });
    }

    if (phase === 'cathyTyping') {
      const timer = setTimeout(() => {
        setPhase('cathyMessage');
      }, 800);
      return () => clearTimeout(timer);
    }

    if (phase === 'cathyMessage') {
      return typeText(exchange.cathy, setCathyText, () => {
        setTimeout(() => setPhase('complete'), 500);
      });
    }

    if (phase === 'complete') {
      const loopTimer = setTimeout(() => {
        const nextIndex = (exchangeIndex + 1) % jokeExchangesFr.length;
        setExchangeIndex(nextIndex);
        setUserName(userNames[Math.floor(Math.random() * userNames.length)]);
      }, 4500);
      return () => clearTimeout(loopTimer);
    }
  }, [phase, exchange, typeText, exchangeIndex]);

  const isCathyTalking = phase === 'cathyTyping' || phase === 'cathyMessage';
  const placeholderText = language === 'fr' ? 'Envoie un message à Cathy...' : 'Send a message to Cathy...';

  return (
    <div className="w-full h-full flex flex-col bg-black rounded-[2rem] overflow-hidden">
      <div className="flex-shrink-0 pt-8 pb-4 flex items-center justify-center">
        <div 
          className="w-[180px] h-[180px] transition-transform duration-300"
          style={{ transform: isCathyTalking ? 'scale(1.1)' : 'scale(1)' }}
          data-testid="orb-gif"
        >
          <img 
            src={orbGif} 
            alt="AI Orb" 
            className="w-full h-full object-contain"
            loading="eager"
          />
        </div>
      </div>
      <div className="flex-1 px-4 py-2 space-y-3 overflow-hidden">
        {(phase === 'userMessage' || phase === 'cathyTyping' || phase === 'cathyMessage' || phase === 'complete') && userText && (
          <div className="flex flex-col items-end" data-testid="bubble-user">
            <span className="text-xs text-zinc-500 mb-1 mr-1" data-testid="text-user-name">{userName}</span>
            <div className="bg-blue-500 text-white px-4 py-2.5 rounded-2xl rounded-br-md max-w-[85%] text-sm">
              {userText}
            </div>
          </div>
        )}

        {phase === 'cathyTyping' && !cathyText && (
          <div className="flex flex-col items-start" data-testid="bubble-typing">
            <span className="text-xs text-zinc-500 mb-1 ml-1">Cathy IA Gauthier</span>
            <div className="bg-zinc-800 text-white px-4 py-2.5 rounded-2xl rounded-bl-md">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {(phase === 'cathyMessage' || phase === 'complete') && cathyText && (
          <div className="flex flex-col items-start" data-testid="bubble-cathy">
            <span className="text-xs text-zinc-500 mb-1 ml-1">Cathy IA Gauthier</span>
            <div className="bg-zinc-800 text-white px-4 py-2.5 rounded-2xl rounded-bl-md max-w-[85%] text-sm">
              {cathyText}
            </div>
          </div>
        )}
      </div>
      <div className="flex-shrink-0 px-4 pb-4 pt-2">
        <div className="flex items-center justify-center gap-4 mb-4">
          <button className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center" data-testid="button-chat-video">
            <Video className="w-5 h-5 text-white" />
          </button>
          <button className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center" data-testid="button-chat-mic">
            <Mic className="w-5 h-5 text-white" />
          </button>
          <button className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center" data-testid="button-chat-more">
            <MoreHorizontal className="w-5 h-5 text-white" />
          </button>
          <button className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center" data-testid="button-chat-close">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="flex items-center gap-2 bg-zinc-900 rounded-full px-4 py-2" data-testid="input-chat-fake">
          <Smile className="w-5 h-5 text-zinc-500" />
          <span className="flex-1 text-zinc-500 text-sm truncate" data-testid="text-chat-placeholder">{placeholderText}</span>
          <button data-testid="button-chat-send">
            <Send className="w-5 h-5 text-blue-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
