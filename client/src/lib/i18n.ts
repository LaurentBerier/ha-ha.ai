export type Language = 'fr' | 'en';

export const copy = {
  fr: {
    nav: {
      logo: 'Ha-Ha.ai',
      howItWorks: 'Comment ça marche',
      features: 'Fonctionnalités',
      contact: 'Contact',
    },
    hero: {
      headline: 'Ha-Ha.ai',
      subheadline: 'Une IA d\'humour 100 % québécoise',
      description: 'Un assistant vocal qui comprend notre langue, notre accent et notre humour.',
      ctaPrimary: 'Rejoindre la liste d\'attente',
      ctaSecondary: 'Découvrir comment ça marche',
    },
    features: {
      title: 'Ce qui nous rend uniques',
      items: [
        {
          title: 'Assistant vocal québécois',
          description: 'Comprend l\'accent et les expressions d\'ici',
        },
        {
          title: 'Humour, roast et impro',
          description: 'Des réponses qui font rire, pas juste des infos',
        },
        {
          title: 'Une vraie personnalité',
          description: 'Pas un robot beige, une vraie présence',
        },
        {
          title: 'Références locales',
          description: 'Connaît notre culture et nos expressions',
        },
      ],
    },
    personality: {
      title: 'Cathy Gauthier',
      subtitle: 'La voix de Ha-Ha.ai',
      description: 'Authentique et sans filtre. Drôle et spontanée. Chaque interaction devient un moment. Son énergie fait qu\'on a envie de l\'entendre, même pour demander la météo.',
      traits: ['Authentique', 'Sans filtre', 'Drôle', 'Spontanée'],
    },
    examples: {
      title: 'Ce que Ha-Ha.ai peut faire',
      items: [
        {
          title: 'Mode blagues',
          description: 'Des jokes sur demande, adaptées à ton humeur',
        },
        {
          title: 'Mode Roast',
          description: 'Besoin de te faire brasser? Elle te dit tes quatre vérités',
        },
        {
          title: 'GPS sarcastique',
          description: 'Des directions avec commentaires. "T\'as encore manqué la sortie!"',
        },
        {
          title: 'Questions du quotidien',
          description: 'Météo, actualités et rappels avec une twist',
        },
      ],
    },
    whyItWorks: {
      title: 'Pourquoi ça va fonctionner',
      items: [
        {
          title: 'Impossible à copier',
          description: 'Notre langue, notre rythme, nos références',
        },
        {
          title: 'Connexion émotionnelle',
          description: 'Une technologie qui nous ressemble',
        },
        {
          title: 'Différenciation totale',
          description: 'La seule option avec du caractère',
        },
        {
          title: 'Marché naturel',
          description: '8,5 millions de Québécois qui veulent du contenu d\'ici',
        },
      ],
    },
    cta: {
      title: 'Le Québec mérite une IA qui lui ressemble',
      description: 'Sois parmi les premiers à découvrir Ha-Ha.ai',
      placeholder: 'Ton courriel',
      button: 'Être parmi les premiers',
      success: 'Merci! Tu es sur la liste.',
      error: 'Une erreur est survenue. Réessaie.',
    },
    footer: {
      copyright: '© 2026 Ha-Ha.ai. Tous droits réservés.',
      contact: 'Contact',
    },
  },
  en: {
    nav: {
      logo: 'Ha-Ha.ai',
      howItWorks: 'How it works',
      features: 'Features',
      contact: 'Contact',
    },
    hero: {
      headline: 'Ha-Ha.ai',
      subheadline: 'A 100% Quebec-born humorous AI',
      description: 'A voice assistant that understands language, culture, and local humor.',
      ctaPrimary: 'Join the waitlist',
      ctaSecondary: 'How it works',
    },
    features: {
      title: 'What makes us different',
      items: [
        {
          title: 'Quebec-born voice assistant',
          description: 'Understands local accent and expressions',
        },
        {
          title: 'Humor, roast, and improv',
          description: 'Responses that make you laugh, not just inform',
        },
        {
          title: 'A real personality',
          description: 'Not a bland robot, a real presence',
        },
        {
          title: 'Local references',
          description: 'Knows the culture and expressions',
        },
      ],
    },
    personality: {
      title: 'Cathy Gauthier',
      subtitle: 'The voice of Ha-Ha.ai',
      description: 'Authentic and unfiltered. Funny and spontaneous. Every interaction becomes a moment. Her energy makes you want to hear her, even just to ask about the weather.',
      traits: ['Authentic', 'Unfiltered', 'Funny', 'Spontaneous'],
    },
    examples: {
      title: 'What Ha-Ha.ai can do',
      items: [
        {
          title: 'Joke mode',
          description: 'Jokes on demand, adapted to your mood',
        },
        {
          title: 'Roast mode',
          description: 'Need a wake-up call? She tells it like it is',
        },
        {
          title: 'Sarcastic GPS',
          description: 'Directions with commentary. "Missed the exit again!"',
        },
        {
          title: 'Everyday questions',
          description: 'Weather, news, and reminders with attitude',
        },
      ],
    },
    whyItWorks: {
      title: 'Why it works',
      items: [
        {
          title: 'Hard to replicate',
          description: 'Our language, our rhythm, our references',
        },
        {
          title: 'Emotional connection',
          description: 'Technology that feels like home',
        },
        {
          title: 'Clear differentiation',
          description: 'The only option with real character',
        },
        {
          title: 'Natural market',
          description: '8.5 million Quebecers wanting local content',
        },
      ],
    },
    cta: {
      title: 'Quebec deserves an AI that sounds like home',
      description: 'Be among the first to discover Ha-Ha.ai',
      placeholder: 'Your email',
      button: 'Get early access',
      success: 'Thanks! You\'re on the list.',
      error: 'Something went wrong. Try again.',
    },
    footer: {
      copyright: '© 2026 Ha-Ha.ai. All rights reserved.',
      contact: 'Contact',
    },
  },
} as const;
