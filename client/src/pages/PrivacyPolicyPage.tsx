import { Link } from "wouter";

interface PolicySection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

const sections: PolicySection[] = [
  {
    title: "1. Introduction",
    paragraphs: [
      "La présente politique de confidentialité décrit comment 9286721 CANADA INC. (ci-après « nous », « notre » ou « Ha-Ha.ai ») recueille, utilise, conserve et protège vos renseignements personnels lorsque vous utilisez l'application mobile Ha-Ha.ai et les services qui y sont liés.",
      "En utilisant Ha-Ha.ai, vous acceptez les pratiques décrites dans la présente politique. Si vous n'êtes pas d'accord avec ces pratiques, veuillez ne pas utiliser l'application.",
    ],
  },
  {
    title: "2. Responsable du traitement des renseignements personnels",
    paragraphs: [
      "Le responsable du traitement de vos renseignements personnels est :",
      "9286721 CANADA INC.",
      "Courriel : info@ha-ha.ai",
      "Responsable de la protection des renseignements personnels : Laurent Bernier",
    ],
  },
  {
    title: "3. Renseignements personnels recueillis",
    paragraphs: ["3.1 Renseignements que vous nous fournissez directement"],
    bullets: [
      "Adresse courriel et mot de passe lors de la création de votre compte",
      "Identifiant Apple (si vous utilisez la connexion via Apple Sign-In)",
      "Nom d'utilisateur ou pseudonyme (optionnel)",
      "Préférences de profil (langue, paramètres de l'application)",
      "Contenu de vos conversations avec les personnages IA dans l'application",
      "Images que vous partagez dans le chat (depuis votre bibliothèque ou votre caméra)",
    ],
  },
  {
    title: "3.2 Renseignements recueillis automatiquement",
    bullets: [
      "Données d'utilisation : fréquence d'utilisation, fonctionnalités utilisées, durée des sessions",
      "Données techniques : type d'appareil, version du système d'exploitation, version de l'application",
      "Données d'abonnement : type de forfait, dates de renouvellement, historique de paiement",
    ],
  },
  {
    title: "3.3 Données vocales",
    paragraphs: [
      "Lorsque vous utilisez le mode vocal, votre voix est captée par le microphone de votre appareil et convertie en texte (reconnaissance vocale). Ces enregistrements vocaux sont traités en temps réel et ne sont pas conservés sur nos serveurs. Seul le texte résultant de la conversion est utilisé pour générer une réponse.",
      "Les réponses vocales générées par l'application (synthèse vocale) utilisent des voix clonées d'artistes ayant donné leur consentement explicite. Aucune donnée biométrique de l'utilisateur n'est collectée, stockée ou analysée.",
    ],
  },
  {
    title: "4. Fins de la collecte et de l'utilisation",
    paragraphs: ["Nous utilisons vos renseignements personnels aux fins suivantes :"],
    bullets: [
      "Fournir, maintenir et améliorer les fonctionnalités de l'application",
      "Générer des réponses conversationnelles personnalisées avec les personnages IA",
      "Gérer votre compte, votre abonnement et vos accès aux fonctionnalités premium",
      "Synchroniser vos conversations entre vos appareils",
      "Appliquer les quotas d'utilisation liés à votre forfait",
      "Assurer la sécurité de l'application et prévenir les abus",
      "Respecter nos obligations légales",
    ],
  },
  {
    title: "5. Partage avec des tiers",
    paragraphs: [
      "Nous ne vendons pas vos renseignements personnels. Nous partageons certaines données avec les fournisseurs de services suivants, strictement dans le cadre du fonctionnement de l'application :",
      "5.1 Fournisseurs de services",
    ],
    bullets: [
      "Supabase (authentification, stockage de données, synchronisation) — hébergé aux États-Unis",
      "Anthropic (génération de texte IA) — hébergé aux États-Unis",
      "ElevenLabs (synthèse vocale) — hébergé aux États-Unis",
      "Stripe (traitement des paiements) — hébergé aux États-Unis",
      "RevenueCat (gestion des abonnements in-app) — hébergé aux États-Unis",
      "Apple (achats in-app et connexion via Apple Sign-In) — hébergé aux États-Unis",
    ],
  },
  {
    title: "5.2 Transfert hors du Québec",
    paragraphs: [
      "Certains de nos fournisseurs de services sont situés aux États-Unis. En utilisant Ha-Ha.ai, vous consentez au transfert de vos renseignements personnels hors du Québec, conformément aux exigences de la Loi 25. Nous nous assurons que ces fournisseurs offrent un niveau de protection adéquat de vos renseignements.",
    ],
  },
  {
    title: "6. Conservation des renseignements",
    bullets: [
      "Données de compte : conservées tant que votre compte est actif. Supprimées dans les 30 jours suivant la suppression de votre compte.",
      "Conversations : conservées tant que votre compte est actif, sauf si vous les supprimez manuellement.",
      "Données vocales (enregistrements) : non conservées. Traitées en temps réel et supprimées immédiatement.",
      "Données de paiement : conservées conformément aux obligations fiscales et légales applicables.",
      "Données d'utilisation : conservées sous forme agrégée et anonymisée après 12 mois.",
    ],
  },
  {
    title: "7. Vos droits",
    paragraphs: [
      "Conformément à la Loi sur la protection des renseignements personnels dans le secteur privé (Loi 25 du Québec), vous disposez des droits suivants :",
    ],
    bullets: [
      "Droit d'accès : obtenir une copie des renseignements personnels que nous détenons à votre sujet.",
      "Droit de rectification : demander la correction de renseignements inexacts ou incomplets.",
      "Droit de suppression : demander la suppression de vos renseignements personnels, sous réserve de nos obligations légales.",
      "Droit à la portabilité : obtenir vos renseignements dans un format structuré et couramment utilisé.",
      "Droit de retirer votre consentement : vous pouvez retirer votre consentement à tout moment. Le retrait du consentement n'affecte pas la légalité du traitement effectué avant le retrait.",
      "Droit de désindexation : demander que vos renseignements cessent d'être diffusés si les conditions légales sont remplies.",
    ],
  },
  {
    title: "Exercice de vos droits",
    paragraphs: [
      "Pour exercer vos droits, contactez-nous à info@ha-ha.ai. Nous répondrons dans un délai de 30 jours.",
    ],
  },
  {
    title: "8. Sécurité",
    paragraphs: [
      "Nous mettons en place des mesures de sécurité raisonnables pour protéger vos renseignements personnels, incluant :",
    ],
    bullets: [
      "Chiffrement des données en transit (TLS/HTTPS)",
      "Authentification sécurisée avec jetons JWT",
      "Stockage sécurisé des jetons d'authentification sur l'appareil",
      "Limitation du débit (rate limiting) sur les points d'accès API",
      "Validation des données côté serveur",
    ],
  },
  {
    title: "Incident de confidentialité",
    paragraphs: [
      "Aucun système n'est infaillible. En cas d'incident de confidentialité, nous vous aviserons dans les meilleurs délais, conformément à la Loi 25.",
    ],
  },
  {
    title: "9. Mineurs",
    paragraphs: [
      "Ha-Ha.ai n'est pas destinée aux personnes de moins de 13 ans. Nous ne recueillons pas sciemment des renseignements personnels de mineurs de moins de 13 ans. Si vous êtes parent ou tuteur et que vous croyez que votre enfant nous a fourni des renseignements personnels, veuillez nous contacter afin que nous puissions prendre les mesures nécessaires.",
      "Pour les utilisateurs âgés de 13 à 17 ans, le consentement du titulaire de l'autorité parentale est requis, conformément à la Loi 25.",
    ],
  },
  {
    title: "10. Technologies de suivi",
    paragraphs: [
      "L'application mobile Ha-Ha.ai n'utilise pas de cookies de navigation. Nous utilisons un stockage local sur votre appareil pour maintenir votre session et vos préférences. Ce stockage est strictement nécessaire au fonctionnement de l'application.",
    ],
  },
  {
    title: "11. Modifications à la présente politique",
    paragraphs: [
      "Nous pouvons modifier cette politique de temps à autre. En cas de modification importante, nous vous en aviserons par le biais de l'application ou par courriel. La date de dernière mise à jour est indiquée en haut de ce document.",
      "Votre utilisation continue de l'application après une modification constitue votre acceptation de la politique modifiée.",
    ],
  },
  {
    title: "12. Nous contacter",
    paragraphs: [
      "Pour toute question relative à la présente politique de confidentialité, à vos renseignements personnels, ou pour exercer vos droits, veuillez communiquer avec nous :",
      "9286721 CANADA INC.",
      "Courriel : info@ha-ha.ai",
      "Responsable de la protection des renseignements personnels : Laurent Bernier",
      "Si vous n'êtes pas satisfait(e) de notre réponse, vous pouvez déposer une plainte auprès de la Commission d'accès à l'information du Québec (CAI) : www.cai.gouv.qc.ca",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto w-full max-w-4xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Retour à l'accueil
          </Link>
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Politique de confidentialité</h1>
        <p className="mt-2 text-lg text-muted-foreground">Ha-Ha.ai</p>
        <p className="mt-1 text-sm text-muted-foreground">Dernière mise à jour : 2026-04-13</p>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="leading-7 text-foreground/90">
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="list-disc space-y-2 pl-6 text-foreground/90">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="leading-7">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
