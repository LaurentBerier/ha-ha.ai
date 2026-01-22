# Ha-Ha.ai Landing Page

## Overview

Ha-Ha.ai is a single-page bilingual landing page for a Quebec-based humorous AI voice assistant. The application showcases the product concept, collects waitlist signups, and supports both French (default) and English languages. The site features a dark theme with animated backgrounds and modern UI components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **State Management**: React Query for server state, React useState for local state
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Framework**: Express.js 5 running on Node.js
- **API Pattern**: RESTful endpoints under `/api/*`
- **Development**: Vite dev server with HMR proxied through Express
- **Production**: Static file serving from built assets

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Current Storage**: In-memory storage (`MemStorage` class) with interface for easy database swap
- **Database Ready**: Schema defined for PostgreSQL with `drizzle-kit push` command available

### Key Design Decisions

**Internationalization**: Simple object-based i18n system in `client/src/lib/i18n.ts` without external libraries. All text comes from translation objects, with French as default.

**Shared Schema**: Zod schemas defined in `shared/schema.ts` are used for both database models and API validation, ensuring type safety across the full stack.

**Component Structure**: Feature sections are modular components (HeroSection, FeaturesSection, etc.) that receive language prop for translations.

**API Design**: Two endpoints exist - POST `/api/waitlist` for signups and GET `/api/waitlist/count` for statistics.

## External Dependencies

### Third-Party Services
- **PostgreSQL**: Database (configured via `DATABASE_URL` environment variable)
- **Google Fonts**: Inter font family loaded via CDN

### Key NPM Packages
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm / drizzle-zod**: Database ORM and schema-to-Zod conversion
- **react-hook-form / @hookform/resolvers**: Form state management with Zod integration
- **Radix UI primitives**: Accessible UI component foundations
- **class-variance-authority / clsx / tailwind-merge**: Utility-first CSS composition

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string (required for database operations)