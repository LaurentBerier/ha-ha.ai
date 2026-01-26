import { useState, useEffect, useCallback, useRef } from 'react';
import { type Language } from '@/lib/i18n';
import { jokeExchangesFr, jokeExchangesEn } from '@/lib/jokeExchanges';
import { GoldOrb } from './GoldOrb';
import { Video, Mic, MoreHorizontal, X, Send, Smile } from 'lucide-react';

interface ChatSimulationProps {
  language: Language;
}

type AnimationPhase = 'idle' | 'userTyping' | 'userMessage' | 'cathyTyping' | 'cathyMessage' | 'complete';

export function ChatSimulation({ language }: ChatSimulationProps) {
  const exchangeIndexRef = useRef<number>(-1);
  const [phase, setPhase] = useState<AnimationPhase>('idle');
  const [userText, setUserText] = useState('');
  const [cathyText, setCathyText] = useState('');

  if (exchangeIndexRef.current === -1) {
    exchangeIndexRef.current = Math.floor(Math.random() * jokeExchangesFr.length);
  }

  const exchanges = language === 'fr' ? jokeExchangesFr : jokeExchangesEn;
  const exchange = exchanges[exchangeIndexRef.current];

  useEffect(() => {
    setPhase('idle');
    setUserText('');
    setCathyText('');
    
    const startTimer = setTimeout(() => {
      setPhase('userTyping');
    }, 800);

    return () => clearTimeout(startTimer);
  }, [language]);

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
  }, [phase, exchange, typeText]);

  const isCathyTalking = phase === 'cathyTyping' || phase === 'cathyMessage';
  const placeholderText = language === 'fr' ? 'Envoie un message à Cathy...' : 'Send a message to Cathy...';

  return (
    <div className="w-full h-full flex flex-col bg-black rounded-[2rem] overflow-hidden">
      <div className="flex-shrink-0 pt-8 pb-4 flex items-center justify-center">
        <GoldOrb isTalking={isCathyTalking} />
      </div>

      <div className="flex-1 px-4 py-2 space-y-3 overflow-hidden">
        {(phase === 'userMessage' || phase === 'cathyTyping' || phase === 'cathyMessage' || phase === 'complete') && userText && (
          <div className="flex justify-end" data-testid="bubble-user">
            <div className="bg-blue-500 text-white px-4 py-2.5 rounded-2xl rounded-br-md max-w-[85%] text-sm">
              {userText}
            </div>
          </div>
        )}

        {phase === 'cathyTyping' && !cathyText && (
          <div className="flex justify-start" data-testid="bubble-typing">
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
          <div className="flex justify-start" data-testid="bubble-cathy">
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
