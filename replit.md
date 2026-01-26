# Ha-Ha.ai Landing Page

## Overview
A stunning single-page bilingual landing page for Ha-Ha.ai, a Quebec-based comic voice and text chatbot that imitates real stand-up comedians. The first featured comedian is Cathy Gauthier.

## Product Definition
- **What it is**: A comic chatbot that talks, reacts, and roasts users using humor, tone, and timing inspired by real humorists
- **Target audience**: Fans of comedy, stand-up, and Quebec humor. Fans of Cathy Gauthier specifically.
- **Tone**: Funny, sharp, confident, slightly irreverent. Comedy first, AI second.

## Tech Stack
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Express.js with in-memory storage
- **Build**: Vite
- **Forms**: React Hook Form + Zod validation
- **State**: TanStack Query

## Project Structure
```
client/
├── src/
│   ├── components/
│   │   ├── ui/                    # Shadcn components
│   │   ├── AnimatedBackground.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx        # Hero with waitlist CTA
│   │   ├── WhatItIsSection.tsx    # Product explanation
│   │   ├── WhatYouCanDoSection.tsx # 3 playful examples
│   │   ├── PersonalitySection.tsx  # Cathy Gauthier feature
│   │   ├── ChatSimulation.tsx    # Interactive chat demo with typing animation
│   │   ├── GoldOrb.tsx           # Animated gold orb (canvas-based, mobile-optimized)
│   │   ├── WaitlistSection.tsx
│   │   └── Footer.tsx            # With "more comedians" teaser
│   ├── lib/
│   │   ├── i18n.ts               # Translations (FR/EN)
│   │   ├── jokeExchanges.ts      # FR/EN joke pairs for chat simulation
│   │   └── queryClient.ts
│   ├── pages/
│   │   └── LandingPage.tsx
│   └── index.css                 # Dark theme design tokens
server/
├── routes.ts                     # API endpoints
├── storage.ts                    # In-memory storage
└── index.ts                      # Express server
shared/
└── schema.ts                     # Zod schemas & types
```

## Key Features
1. **Bilingual Support**: French (default) and English via header toggle
2. **Dark Theme**: Black background with red/blue accent colors
3. **Interactive Chat Demo**: Gold orb + typing animation showing random joke exchanges
4. **Email Waitlist**: Prominent CTA with comedy-first copy
5. **Responsive Design**: Mobile-first, phone mockup scales 340px-480px

## Page Sections
1. **Hero**: Headline + waitlist CTA + phone with animated orb
2. **What It Is**: One paragraph explaining the product
3. **What You Can Do**: 3 playful examples with attitude
4. **Personality**: Cathy Gauthier feature
5. **Waitlist**: Email signup form
6. **Footer**: "More comedians coming soon" teaser

## API Endpoints
- `POST /api/waitlist` - Submit email to waitlist
- `GET /api/waitlist/count` - Get current waitlist count

## Color Scheme
- Background: Near black (#0a0a0a)
- Primary: Red (hsl 0 72% 51%)
- Secondary: Blue (hsl 220 70% 50%)
- Gold orb: Orange/gold tones (#f97316, #fb923c)

## Running the Project
```bash
npm run dev
```
Server starts on port 5000, serving both API and frontend.

## Recent Changes
- January 2026: Interactive chat simulation in hero
  - New ChatSimulation component with typing animation
  - Gold orb that scales when "talking"
  - 8 random FR/EN joke exchanges (jokeExchanges.ts)
  - Same exchange persists across language toggle
  - Mobile performance: 30fps, fewer particles on small screens
  
- January 2026: Content rewrite for comedy-first tone
  - New hero with prominent waitlist CTA
  - "What it is" and "What you can do" sections added
  - Removed corporate sections (Features, WhyItWorks)
  - Footer teaser about more comedians
