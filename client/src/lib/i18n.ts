export type Language = 'fr' | 'en';

export const copy = {
  fr: {
    nav: {
      logo: 'Ha-Ha.ai',
      features: 'Ce que tu peux faire',
      contact: 'Contact',
    },
    hero: {
      headline: 'Cathy Gauthier, dans ta poche.',
      subheadline: '24/7. Sans filtre.',
      description: 'Ha-Ha.ai, c\'est un chatbot comique qui imite de vrais humoristes. Ça parle, ça réagit, ça te roast.',
      ctaPrimary: 'Accès anticipé',
      ctaSecondary: 'Comment ça marche',
      waitlistHeadline: 'Sois dans les premiers à te faire roaster.',
      waitlistDescription: 'Rejoins la liste de développement. Teste le chatbot avant tout le monde et aide-nous à façonner sa personnalité.',
    },
    whatItIs: {
      title: 'C\'est quoi Ha-Ha.ai?',
      description: 'Un chatbot qui parle comme une vraie humoriste. Par texte ou par voix, n\'importe quand. Pas un assistant beige. Pas un outil de productivité. Juste de l\'humour, du timing, et de l\'attitude.',
      orbHint: 'Touche l\'orbe. Elle réagit.',
    },
    whatYouCanDo: {
      title: 'Ce que tu peux faire',
      items: [
        {
          title: 'Demande un conseil. Regrette-le.',
          description: 'Elle va te répondre. Mais pas comme tu veux.',
        },
        {
          title: 'Fais-toi roaster sur demande.',
          description: 'T\'as besoin qu\'on te remette à ta place? C\'est gratuit.',
        },
        {
          title: 'Tue le temps avec une IA qui a de l\'attitude.',
          description: 'Pas de "Comment puis-je vous aider?" Juste du vrai contenu.',
        },
      ],
    },
    personality: {
      title: 'Cathy Gauthier',
      subtitle: 'La première voix de Ha-Ha.ai',
      description: 'Authentique. Sans filtre. Drôle même quand elle te dit non. Son énergie fait qu\'on a envie de l\'entendre, même pour demander la météo.',
      traits: ['Authentique', 'Sans filtre', 'Drôle', 'Spontanée'],
    },
    cta: {
      title: 'Fais partie des premiers.',
      description: 'Teste le chatbot en avant-première et aide-nous à bâtir quelque chose de drôle.',
      placeholder: 'Ton courriel',
      button: 'Rejoindre la liste',
      success: 'T\'es dedans. On te revient bientôt.',
      error: 'Oups. Réessaie.',
    },
    footer: {
      copyright: '© 2026 Ha-Ha.ai. Tous droits réservés.',
      contact: 'Contact',
      moreComingSoon: 'D\'autres humoristes s\'en viennent.',
    },
  },
  en: {
    nav: {
      logo: 'Ha-Ha.ai',
      features: 'What you can do',
      contact: 'Contact',
    },
    hero: {
      headline: 'Cathy Gauthier, in your pocket.',
      subheadline: '24/7. Unfiltered.',
      description: 'Ha-Ha.ai is a comic chatbot that imitates real stand-up comedians. It talks, reacts, and roasts you.',
      ctaPrimary: 'Get early access',
      ctaSecondary: 'How it works',
      waitlistHeadline: 'Be among the first to get roasted.',
      waitlistDescription: 'Join the dev waitlist. Test the chatbot before anyone else and help shape how it talks back.',
    },
    whatItIs: {
      title: 'What is Ha-Ha.ai?',
      description: 'A chatbot that talks like a real comedian. By text or voice, anytime. Not a bland assistant. Not a productivity tool. Just humor, timing, and attitude.',
      orbHint: 'Touch the orb. It reacts.',
    },
    whatYouCanDo: {
      title: 'What you can do',
      items: [
        {
          title: 'Ask for advice. Regret it.',
          description: 'She\'ll answer. Just not how you want.',
        },
        {
          title: 'Get roasted on demand.',
          description: 'Need to be put in your place? It\'s free.',
        },
        {
          title: 'Kill time with an AI that has attitude.',
          description: 'No "How may I help you?" Just real content.',
        },
      ],
    },
    personality: {
      title: 'Cathy Gauthier',
      subtitle: 'The first voice of Ha-Ha.ai',
      description: 'Authentic. Unfiltered. Funny even when she says no. Her energy makes you want to hear her, even just to ask about the weather.',
      traits: ['Authentic', 'Unfiltered', 'Funny', 'Spontaneous'],
    },
    cta: {
      title: 'Be among the first.',
      description: 'Test the chatbot early and help us build something funny.',
      placeholder: 'Your email',
      button: 'Join the waitlist',
      success: 'You\'re in. We\'ll be in touch.',
      error: 'Oops. Try again.',
    },
    footer: {
      copyright: '© 2026 Ha-Ha.ai. All rights reserved.',
      contact: 'Contact',
      moreComingSoon: 'More comedians coming soon.',
    },
  },
} as const;
