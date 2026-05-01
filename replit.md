# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Portal Oráculo de SophIA (`artifacts/portal-sophia`)
- **Type**: React + Vite web app
- **Preview path**: `/` (root)
- **Port**: 24691
- **Purpose**: Interactive investor pitch portal for Pre-Seed R$ 500k round
- **Stack**: React, Vite, Tailwind CSS, Chart.js, react-chartjs-2, Orbitron font
- **Design DNA**: Glassmorphism "Lucidez" — background #000022, borders #660066, "IA" suffix in #FFFF00 in section titles, animated owl logo, mobile-first, scroll animations
- **Logo**: `/public/logo-sophia.png` (Cybernetic Owl)
- **Founder photo**: `/public/centauro.png` (circular neon crop)

### Portal Sections
| Section | Component | Description |
|---|---|---|
| Hero | `Hero.tsx` | Full-screen landing with animated owl logo, headline, CTA |
| Gabinete do Centauro | `GabineteCentauro.tsx` | Founder profile: Thales Rodrigues Andrade Pires, circular photo, scrollable bio, LinkedIn `linkedin.com/in/thalexrapia/` |
| Narrativa | `NarrativeSection.tsx` | Pitch narrative slides explaining the problem/solution |
| Motor de Escala | `MotorEscala.tsx` | Interactive ROI simulator — 6 sliders (A–F) with CAC/Churn and gross profit formula |
| Canteiro de Obras | `CanteiroObras.tsx` | YouTube video embeds / demo |
| The Ask | `TheAsk.tsx` | Investment ask (R$ 500k) + Chart.js pie chart showing fund allocation |
| Verified Badge | `VerifiedBadge.tsx` | Credential badges 2×2 grid (Cisco, Hackers do Bem, NASA, Graduação IA – Univ. Franca), LinkedIn link |
| Contact Form | `ContactForm.tsx` | PostgreSQL-backed lead capture form (name, email, company, investment interest, message) |
| Footer | `Footer.tsx` | Footer with owl logo |
| Floating WhatsApp | `FloatingWhatsApp.tsx` | Sticky WhatsApp CTA button |

### Routes (portal-sophia)
- `/` — main portal (App.tsx)
- `/analytics` — analytics dashboard (AnalyticsDashboard.tsx) — protected
- `/oraculo` — password-protected admin panel (OracleAdmin.tsx) — password: stored as constant in component; access via 🔮 icon in navbar

### Key portal files
- `src/main.tsx` — route switching (/, /analytics, /oraculo)
- `src/App.tsx` — main layout + navbar (anchor links + 🔮 admin icon)
- `src/i18n/translations.ts` — bilingual PT/EN strings (type-enforced)
- `src/contexts/LanguageContext.tsx` — language toggle provider
- `src/pages/OracleAdmin.tsx` — admin panel: password gate + leads table + modal
- `src/pages/AnalyticsDashboard.tsx` — analytics events viewer
- `src/index.css` — full Sophia DNA theme (glassmorphism, animations, custom sliders)

---

### API Server (`artifacts/api-server`)
- **Type**: Express 5 API
- **Preview path**: `/api`
- **Port**: 8080

### API Routes
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | none | Health check |
| POST | `/api/leads` | none | Submit investor lead (stored in PostgreSQL) |
| GET | `/api/leads` | `x-admin-key` header | Fetch all leads (admin only) |
| POST | `/api/analytics/events` | none | Track analytics event |
| GET | `/api/analytics/events` | `x-admin-key` header | Fetch analytics events |

### API key
- Header: `x-admin-key`
- Value: stored as `ADMIN_KEY` constant in `artifacts/api-server/src/routes/leads.ts`

---

### Canvas / Mockup Sandbox (`artifacts/mockup-sandbox`)
- **Type**: Design mockup sandbox
- **Preview path**: `/__mockup`
- **Port**: 8081

---

## Database Schema (`lib/db/src/schema/`)
- `leadsTable` — investor leads: id, name, email, company, investmentInterest, message, createdAt
- `analyticsEventsTable` — page/CTA events: id, event, page, meta, createdAt

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/portal-sophia run dev` — run portal dev server

## Important Notes
- After any changes to `lib/db`, rebuild declarations: `cd lib/db && pnpm exec tsc -p tsconfig.json`
- After changes to `lib/api-client-react`, rebuild: `cd lib/api-client-react && pnpm exec tsc -p tsconfig.json`
- The API server must be **restarted** after any route changes (it bundles via esbuild on start)
- Portal preview is at root `/` — Vite is bound to 0.0.0.0 with `allowedHosts: true` for Replit proxy

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
