export interface JokeExchange {
  user: string;
  cathy: string;
}

export const jokeExchangesFr: JokeExchange[] = [
  {
    user: "Cathy, j'ai besoin d'un conseil de vie.",
    cathy: "Ok, mais tu vas le regretter.",
  },
  {
    user: "Je me sens down aujourd'hui...",
    cathy: "T'es tu regardé dans le miroir? C'est normal.",
  },
  {
    user: "Est-ce que je suis une bonne personne?",
    cathy: "T'es correct. Mais ton linge, par exemple...",
  },
  {
    user: "Roaste-moi.",
    cathy: "T'as pas besoin de moi pour ça. Tu te débrouilles très bien tout seul.",
  },
  {
    user: "Dis-moi quelque chose de gentil.",
    cathy: "T'es persistant. C'est déjà ça.",
  },
  {
    user: "Qu'est-ce que tu penses de moi?",
    cathy: "Je pense que tu poses trop de questions.",
  },
  {
    user: "J'ai besoin de motivation.",
    cathy: "Lève-toi. Bouge. C'est pas compliqué.",
  },
  {
    user: "Fais-moi rire.",
    cathy: "Regarde ton compte en banque. Voilà.",
  },
];

export const jokeExchangesEn: JokeExchange[] = [
  {
    user: "Cathy, I need life advice.",
    cathy: "Okay, but you're gonna regret it.",
  },
  {
    user: "I'm feeling down today...",
    cathy: "Have you looked in the mirror? Makes sense.",
  },
  {
    user: "Am I a good person?",
    cathy: "You're fine. Your outfit though...",
  },
  {
    user: "Roast me.",
    cathy: "You don't need me for that. You're doing great on your own.",
  },
  {
    user: "Say something nice to me.",
    cathy: "You're persistent. I'll give you that.",
  },
  {
    user: "What do you think of me?",
    cathy: "I think you ask too many questions.",
  },
  {
    user: "I need motivation.",
    cathy: "Get up. Move. It's not rocket science.",
  },
  {
    user: "Make me laugh.",
    cathy: "Check your bank account. There you go.",
  },
];

export function getRandomExchange(language: 'fr' | 'en'): JokeExchange {
  const exchanges = language === 'fr' ? jokeExchangesFr : jokeExchangesEn;
  const randomIndex = Math.floor(Math.random() * exchanges.length);
  return exchanges[randomIndex];
}
