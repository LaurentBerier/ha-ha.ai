# Ha-Ha.ai Landing Page

## Overview
A stunning single-page bilingual landing page for Ha-Ha.ai, a Quebec-based humorous AI voice assistant featuring Cathy Gauthier as the first voice personality.

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
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Shadcn components
│   │   ├── AnimatedBackground.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── PersonalitySection.tsx
│   │   ├── ExamplesSection.tsx
│   │   ├── WhyItWorksSection.tsx
│   │   ├── WaitlistSection.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   ├── i18n.ts       # Translations (FR/EN)
│   │   └── queryClient.ts
│   ├── pages/
│   │   └── LandingPage.tsx
│   └── index.css         # Dark theme design tokens
server/
├── routes.ts             # API endpoints
├── storage.ts            # In-memory storage
└── index.ts              # Express server
shared/
└── schema.ts             # Zod schemas & types
```

## Key Features
1. **Bilingual Support**: French (default) and English via header toggle
2. **Dark Theme**: Black background with red/blue accent colors
3. **Animated Background**: Particle system with connecting lines
4. **Email Waitlist**: Form submission with backend storage
5. **Responsive Design**: Mobile-first, fully responsive

## API Endpoints
- `POST /api/waitlist` - Submit email to waitlist
- `GET /api/waitlist/count` - Get current waitlist count

## Color Scheme
- Background: Near black (#0a0a0a)
- Primary: Red (hsl 0 72% 51%)
- Secondary: Blue (hsl 220 70% 50%)
- Muted foreground for secondary text

## Running the Project
```bash
npm run dev
```
Server starts on port 5000, serving both API and frontend.

## Recent Changes
- January 2026: Initial landing page implementation
  - Dark theme with animated particle background
  - Bilingual i18n system (FR/EN)
  - All landing page sections complete
  - Email waitlist with form validation
  - E2E tested and verified
