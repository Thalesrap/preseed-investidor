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
- **Sections**: Hero, Gabinete do Centauro (founder), Narrativa (pitch slides), Motor de Escala (ROI simulator with 4 sliders), Canteiro de Obras (YouTube embeds), The Ask (pie chart), Verified Badge & conversion, Footer
- **Design**: Glassmorphism "Lucidez" DNA — background #000022, borders #660066, IA in #FFFF00
- **Logo**: `/public/logo-sophia.png` (Cybernetic Owl, copied from `attached_assets/`)
- **Key files**:
  - `src/App.tsx` — main layout + navbar
  - `src/components/Hero.tsx` — hero section with animated logo
  - `src/components/GabineteCentauro.tsx` — founder profile
  - `src/components/NarrativeSection.tsx` — pitch narrative slides
  - `src/components/MotorEscala.tsx` — interactive ROI simulator (4 sliders)
  - `src/components/CanteiroObras.tsx` — YouTube video embeds
  - `src/components/TheAsk.tsx` — investment ask + Chart.js pie chart
  - `src/components/VerifiedBadge.tsx` — conversion section
  - `src/components/FloatingWhatsApp.tsx` — floating WhatsApp CTA
  - `src/components/Footer.tsx` — footer with logo
  - `src/index.css` — full Sophia DNA theme (glassmorphism, animations, custom sliders)

### API Server (`artifacts/api-server`)
- **Type**: Express 5 API
- **Preview path**: `/api`
- **Port**: 8080

### Canvas / Mockup Sandbox (`artifacts/mockup-sandbox`)
- **Type**: Design mockup sandbox
- **Preview path**: `/__mockup`
- **Port**: 8081

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/portal-sophia run dev` — run portal dev server

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
