import { useCallback, useEffect, useState } from "react";
import { type Language } from "@/lib/i18n";
import { jokeExchangesEn, jokeExchangesFr } from "@/lib/jokeExchanges";
import cellBgImage from "@assets/Cell_BG.png";

interface ChatSimulationProps {
  language: Language;
}

const userNames = [
  "Mario L.",
  "Stéphane G.",
  "Marie O.",
  "Jean-François T.",
  "Sophie B.",
  "Patrick R.",
];

export function ChatSimulation({ language }: ChatSimulationProps) {
  const [phase, setPhase] = useState<"idle" | "userTyping" | "userDone" | "cathyTyping" | "complete">("idle");
  const [exchangeIndex, setExchangeIndex] = useState(
    () => Math.floor(Math.random() * jokeExchangesFr.length),
  );
  const [userName, setUserName] = useState(
    () => userNames[Math.floor(Math.random() * userNames.length)],
  );
  const [userText, setUserText] = useState("");
  const [cathyText, setCathyText] = useState("");

  const exchanges = language === "fr" ? jokeExchangesFr : jokeExchangesEn;
  const exchange = exchanges[exchangeIndex];

  const typeText = useCallback(
    (
      fullText: string,
      setter: (value: string) => void,
      onComplete: () => void,
    ) => {
      let index = 0;
      const interval = setInterval(() => {
        index += 1;
        setter(fullText.slice(0, index));
        if (index >= fullText.length) {
          clearInterval(interval);
          onComplete();
        }
      }, 36);

      return () => clearInterval(interval);
    },
    [],
  );

  useEffect(() => {
    setPhase("idle");
    setUserText("");
    setCathyText("");

    const timer = setTimeout(() => {
      setPhase("userTyping");
    }, 500);

    return () => clearTimeout(timer);
  }, [language, exchangeIndex]);

  useEffect(() => {
    if (!exchange) {
      return;
    }

    if (phase === "userTyping") {
      return typeText(exchange.user, setUserText, () => {
        setTimeout(() => setPhase("userDone"), 300);
      });
    }

    if (phase === "userDone") {
      const timer = setTimeout(() => {
        setPhase("cathyTyping");
      }, 280);
      return () => clearTimeout(timer);
    }

    if (phase === "cathyTyping") {
      return typeText(exchange.cathy, setCathyText, () => {
        setPhase("complete");
      });
    }

    if (phase === "complete") {
      const timer = setTimeout(() => {
        setExchangeIndex((prev) => (prev + 1) % exchanges.length);
        setUserName(userNames[Math.floor(Math.random() * userNames.length)]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [exchange, exchanges.length, phase, typeText]);

  return (
    <div className="relative z-10" data-testid="img-chat-mobile-preview">
      <img
        src={cellBgImage}
        alt="Ha-Ha mobile preview"
        className="block w-full h-auto"
        loading="eager"
      />

      <div className="pointer-events-none absolute bottom-[14%] left-[8%] right-[8%]">
        {(phase === "userTyping" || phase === "userDone" || phase === "cathyTyping" || phase === "complete") && (
          <div className="mb-2 flex justify-end">
            <div className="max-w-[68%]">
              <p className="mb-1 text-right text-[clamp(9px,1.1vw,13px)] text-zinc-300">{userName}</p>
              <div className="rounded-2xl rounded-br-md bg-[#4188ff] px-3 py-2 text-[clamp(10px,1.4vw,17px)] text-white shadow-lg">
                {userText}
              </div>
            </div>
          </div>
        )}

        {(phase === "cathyTyping" || phase === "complete") && (
          <div className="flex justify-start">
            <div className="max-w-[74%] rounded-2xl rounded-bl-md bg-[#1f2028]/95 px-3 py-2 text-[clamp(10px,1.4vw,17px)] text-white shadow-lg">
              <p className="mb-1 text-[clamp(9px,1.1vw,13px)] text-zinc-300">Cathy IA Gauthier</p>
              <p>{cathyText}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
