# Inspire - Motivational TO-DO List App

## Overview

Inspire is a premium, personalized TO-DO list application designed to motivate users through contextual engagement and beautiful design. The app adapts to individual user preferences, workflow styles, and goals, delivering intelligent motivational feedback and celebrating task completion with contextually relevant quotes and visual effects.

The application focuses on emotional resonance and progressive disclosure, ensuring users feel rewarded with every interaction while maintaining a clean, calming interface inspired by Apple HIG, Notion, and Linear design principles.

## Recent Changes (November 12, 2025)

- ✅ Implemented complete backend with Express.js API routes
- ✅ Created storage interface with in-memory implementation for user profiles and tasks
- ✅ Connected frontend to backend using React Query with proper cache invalidation
- ✅ Added error handling and userId validation on all mutations
- ✅ Fixed onboarding flow to wait for profile creation before proceeding
- ✅ Added accessibility improvements (DialogTitle for modals)
- ✅ Application is now fully functional with persistent data flow

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast HMR and optimized production builds
- Wouter for lightweight client-side routing

**UI Component System**
- Radix UI primitives for accessible, unstyled component foundations
- shadcn/ui design system (New York variant) for pre-styled, customizable components
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for type-safe component variants
- Custom CSS variables for theming (light/dark mode support)

**State Management**
- TanStack Query (React Query) for server state management, caching, and synchronization
- Local React state for UI interactions
- LocalStorage for persisting user preferences and session data

**Design System**
- Typography: Inter (UI), Playfair Display (display/quotes)
- Color system: HSL-based with CSS custom properties for themability
- Spacing scale: 4px-based system using Tailwind primitives
- Components follow "hover-elevate" and "active-elevate" interaction patterns

**Key Features**
- Multi-step onboarding flow with personalization questions
- Task creation with conversational, guided inputs
- Celebration modals with animated confetti effects
- Task filtering (all/active/completed)
- Theme switching (light/dark mode)

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for API endpoints
- ESM module system for modern JavaScript features
- Custom middleware for logging, request timing, and JSON body parsing

**API Structure**
- RESTful API design with resource-based endpoints
- `/api/profile` - User profile management (CRUD operations)
- `/api/tasks` - Task management with user-scoped queries
- Validation using Zod schemas derived from database schema

**Data Layer**
- In-memory storage implementation (MemStorage) for development
- Interface-based storage abstraction (IStorage) for easy database swapping
- Drizzle ORM configured for PostgreSQL (production-ready)
- Schema-driven validation using drizzle-zod

**Database Schema**
- `user_profiles` table: Stores occupation, workflow style, goals, motivation triggers, theme preferences
- `tasks` table: Stores task details, deadlines, categories, completion status, breakdown steps
- UUID primary keys with auto-generation
- Timestamp tracking for created/completed dates

**Development Experience**
- Vite middleware mode for seamless dev server integration
- Hot module replacement (HMR) for instant feedback
- Request/response logging with duration tracking
- Error overlay plugin for runtime error visibility

### External Dependencies

**UI & Styling**
- @radix-ui/* - Comprehensive set of accessible UI primitives (dialogs, dropdowns, tooltips, etc.)
- tailwindcss & autoprefixer - Utility-first CSS framework
- class-variance-authority - Type-safe variant management
- clsx & tailwind-merge - Conditional className utilities
- Google Fonts CDN - Inter and Playfair Display fonts

**Data & Validation**
- drizzle-orm - TypeScript ORM for SQL databases
- drizzle-zod - Automatic Zod schema generation from Drizzle schemas
- zod - Schema validation library
- @tanstack/react-query - Server state management

**Database**
- @neondatabase/serverless - Serverless PostgreSQL driver
- connect-pg-simple - PostgreSQL session store (configured but not actively used)

**Date Handling**
- date-fns - Modern date utility library for formatting and manipulation

**Development Tools**
- @replit/vite-plugin-* - Replit-specific development enhancements
- tsx - TypeScript execution engine
- esbuild - Fast JavaScript bundler for production builds

**Additional Features**
- embla-carousel-react - Touch-friendly carousel component
- cmdk - Command palette component
- @hookform/resolvers - Form validation integration
- react-hook-form - Performant form management (imported via resolvers)

### Architecture Decisions

**Why In-Memory Storage First?**
- Enables rapid prototyping and testing without database setup
- Interface-based design allows trivial swap to Drizzle ORM implementation
- Same API contract regardless of storage backend

**Why Drizzle ORM?**
- Type-safe queries with excellent TypeScript inference
- Schema-first design with automatic migration generation
- Lightweight with minimal runtime overhead
- Direct Zod schema generation reduces boilerplate

**Why TanStack Query?**
- Automatic caching and background refetching
- Optimistic updates for instant UI feedback
- Built-in loading and error states
- Reduces boilerplate compared to manual fetch management

**Why Radix UI + shadcn/ui?**
- Radix provides accessible, unstyled primitives (ARIA compliant)
- shadcn/ui adds beautiful styling while maintaining full customization
- Copy-paste component model eliminates dependency lock-in
- Comprehensive component coverage for complex UIs

**Why Vite?**
- Fastest development server with instant HMR
- Native ESM support for modern browser features
- Optimized production builds with code splitting
- Superior developer experience compared to webpack