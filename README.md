# Nattuvazhi (നാട്ടുവഴി) — The Living Culture Map of Kerala

Nattuvazhi is a community-informed, scholar-verified cultural discovery platform for Kerala. Discover sacred groves, ritual performing arts, master practitioners, traditional crafts, and upcoming cultural festivals.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Getting Started

First, install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pages & Structure
- `/` — Homepage (Hero, 4-step workflow, featured traditions, festivals, 14 districts)
- `/explore` — Split-screen directory (45%) & Kerala GIS Map (55%)
- `/culture/[slug]` — Cultural detail & oral history narrative
- `/events` & `/events/[slug]` — Cultural festival calendar & ritual schedules
- `/contribute` — Community submission form with live validation
- `/admin/login` & `/admin` — Curatorial moderation dashboard & review panel
