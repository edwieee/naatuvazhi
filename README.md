# Nattuvazhi (നാട്ടുവഴി) — The Living Culture Map of Kerala

**ART//CODE Hackathon — Track 5: The Living Culture Map**

Nattuvazhi is a community-informed, scholar-verified cultural discovery platform and living spatial archive for Kerala. It maps sacred groves (*kavus*), nocturnal ritual performing arts (*Theyyam*, *Tholpavakoothu*, *Patayani*), master practitioners, craft guilds, and living festival calendars across all 14 Kerala districts.

---

## Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router) with React 19
- **Database & Auth**: Supabase Postgres with Row Level Security (RLS)
- **Styling**: Tailwind CSS with custom editorial design system (`#fcfcec`, `#692820`, `#aa3000`)
- **Data Access**: `@supabase/ssr` + Unified Resilient Data Access Layer (`src/lib/supabase/data-service.ts`)
- **Icons**: Lucide React

---

## Environment Configuration

Configure `.env.local` with your dedicated Supabase project credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://ccmdiokhunvhwdmvsvop.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key # optional for admin tasks
```

---

## Database Migrations & Schemas

The database schema and authentic seed data migrations are located in `supabase/migrations/`:

1. `20261108000000_nattuvazhi_core_schema.sql` — Core tables (`districts`, `categories`, `listings`, `events`, `sources`, `media`, `submissions`, `review_logs`, `homepage_config`), triggers, and RLS policies.
2. `20261108000001_seed_authentic_kerala_cultural_data.sql` — Authentic records from Kerala Folklore Academy monographs and gazetteers.

---

## Getting Started

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

---

## Key Platform Routes

- `/` — Homepage (Hero, living Theyyam halftone canvas, 6 cultural dimensions, featured traditions, festival row, 14 districts geographic registry).
- `/explore` — Cultural directory & interactive Kerala GIS Map synchronized with marker selection.
- `/culture/[slug]` — Cultural detail page with oral narratives, visitor protocols, photo gallery, and verifiable citations.
- `/events` & `/events/[slug]` — Living festival calendar, verified schedules, and Devaswom links.
- `/contribute` — Community accession form with instant tracking code.
- `/admin` — Complete Curator Content Management Portal (Submissions moderation, Listings CRUD, Event rescheduling & verification, Homepage copy management, Audit history).

---

## Architectural Documentation

- [`docs/COMPLETE_DATA_AUDIT.md`](docs/COMPLETE_DATA_AUDIT.md) — Complete audit of all components, fields, and tables.
- [`docs/DATABASE_SCHEMA.md`](docs/DATABASE_SCHEMA.md) — Relational schema architecture with ER diagrams and RLS matrices.
- [`docs/FRONTEND_DATA_MAPPING.md`](docs/FRONTEND_DATA_MAPPING.md) — Component-to-table data flow and caching model.
- [`docs/CONTENT_MANAGEMENT_GUIDE.md`](docs/CONTENT_MANAGEMENT_GUIDE.md) — Curator operational handbook.
- [`docs/DATA_IMPORT_GUIDE.md`](docs/DATA_IMPORT_GUIDE.md) — Ingestion protocols and schema formats.
- [`docs/SECURITY_PLAN.md`](docs/SECURITY_PLAN.md) — Row Level Security and storage policy specifications.
